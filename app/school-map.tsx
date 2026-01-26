import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, Platform, Pressable, ScrollView, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FilterSheet } from "@/components/filter-sheet";
import { SchoolCard } from "@/components/school-card";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useState, useMemo, useEffect, useCallback, useContext, useRef } from "react";
import { SCHOOLS } from "@/data/schools";
import type { School, District18 } from "@/types/school";
import { DISTRICT_MAP_DATA, calculateAllDistrictStats, type DistrictStats } from "@/lib/district-map-data";
import { DISTRICT_POLYGONS } from "@/lib/district-polygons";
// 导入真实的香港18区 GeoJSON 数据
import HK_GEOJSON from "@/lib/hk.json";
import { FavoritesStorage } from "@/lib/storage";
import { FilterContext, hasActiveFilters } from "@/lib/filter-context";
import { filterSchools } from "@/lib/filter-logic";
import { schools as allSchools } from "@/data/schools";
import { groupSchoolsBySession, type GroupedSchool } from "@/lib/school-classification";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

// Conditionally import WebView only for native platforms
let WebView: any = null;
if (Platform.OS !== "web") {
  WebView = require("react-native-webview").WebView;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

// View modes for the map
type MapViewMode = "districts" | "filtered" | "favorites";

// 英文名到中文名的映射
const DISTRICT_EN_TO_ZH: Record<string, District18> = {
  "North": "北區",
  "Islands": "離島區",
  "Southern": "南區",
  "Central and Western": "中西區",
  "Wan Chai": "灣仔區",
  "Eastern": "東區",
  "Tsuen Wan": "荃灣區",
  "Tai Po": "大埔區",
  "Sha Tin": "沙田區",
  "Sai Kung": "西貢區",
  "Kwun Tong": "觀塘區",
  "Kowloon City": "九龍城區",
  "Yau Tsim Mong": "油尖旺區",
  "Sham Shui Po": "深水埗區",
  "Kwai Tsing": "葵青區",
  "Tuen Mun": "屯門區",
  "Yuen Long": "元朗區",
  "Wong Tai Sin": "黃大仙區",
};

// 地区所属区域
const DISTRICT_REGION: Record<string, "港島" | "九龍" | "新界"> = {
  "中西區": "港島", "灣仔區": "港島", "東區": "港島", "南區": "港島",
  "油尖旺區": "九龍", "深水埗區": "九龍", "九龍城區": "九龍", "黃大仙區": "九龍", "觀塘區": "九龍",
  "荃灣區": "新界", "葵青區": "新界", "屯門區": "新界", "元朗區": "新界", 
  "北區": "新界", "大埔區": "新界", "沙田區": "新界", "西貢區": "新界", "離島區": "新界",
};

// 插画风格颜色配置 - 新界绿色加深以提高可读性
const ILLUSTRATED_COLORS = {
  '新界': { fill: '#7BC89B', fillHover: '#5FB882', stroke: '#2D6A4F' },
  '九龍': { fill: '#DDA0DD', fillHover: '#D8A0D8', stroke: '#8B5A8B' },
  '港島': { fill: '#A8D8EA', fillHover: '#7EC8E3', stroke: '#2E86AB' },
};

// Generate Leaflet HTML for the map with dynamic pin support - 插画风格
function generateMapHTML(
  districtPolygons: typeof DISTRICT_POLYGONS,
  districtMapData: typeof DISTRICT_MAP_DATA,
  districtStats: Map<District18, DistrictStats>
): string {
  // 使用真实的香港18区 GeoJSON 数据
  const geojsonFeatures = HK_GEOJSON.features.map((feature: any) => {
    const nameZh = DISTRICT_EN_TO_ZH[feature.properties.name] || feature.properties.name;
    const region = DISTRICT_REGION[nameZh] || "新界";
    const stats = districtStats.get(nameZh as District18);
    const colors = ILLUSTRATED_COLORS[region as keyof typeof ILLUSTRATED_COLORS];
    
    return {
      ...feature,
      properties: {
        ...feature.properties,
        nameZh,
        region,
        fill: colors.fill,
        fillHover: colors.fillHover,
        stroke: colors.stroke,
        total: stats?.total || 0,
        kindergarten: stats?.kindergarten || 0,
        primary: stats?.primary || 0,
        secondary: stats?.secondary || 0,
        byCategory: stats?.byCategory || {},
      }
    };
  });

  const geojsonData = JSON.stringify({ type: "FeatureCollection", features: geojsonFeatures });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    #map { 
      width: 100%; 
      height: 100%; 
      background: linear-gradient(180deg, 
        #B8E4F0 0%, 
        #A8D8E8 15%,
        #8CCCE0 35%, 
        #6EBDD5 55%,
        #5BB0CA 75%,
        #4AA3BF 100%
      ) !important;
    }
    .leaflet-container { background: transparent !important; }
    .leaflet-control-zoom { display: none; }
    .leaflet-control-attribution { display: none; }
    .leaflet-tile-pane { display: none !important; }
    
    .district-label {
      background: rgba(255,255,255,0.92) !important;
      border: 2px solid currentColor !important;
      border-radius: 10px !important;
      padding: 3px 7px !important;
      font-weight: 700;
      font-size: 9px;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0,0,0,0.12);
      text-align: center;
    }
    .district-count {
      display: inline-block;
      padding: 1px 5px;
      border-radius: 6px;
      font-size: 9px;
      font-weight: 600;
      margin-left: 3px;
      background: currentColor;
    }
    .district-count-text {
      color: #FFFFFF;
    }
    .school-pin {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid #FFFFFF;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      color: #FFFFFF;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const geojsonData = ${geojsonData};
    let currentMode = 'districts';
    let schoolMarkers = [];
    let highlightedDistricts = new Set();
    let selectedDistrict = null;
    const polygonLayers = {};
    const labelLayers = {};
    const districtData = {};

    const map = L.map('map', {
      center: [22.36, 114.15],
      zoom: 10.8,
      zoomControl: false,
      attributionControl: false,
      minZoom: 10,
      maxZoom: 16,
    });

    function postToParent(data) {
      const msg = JSON.stringify(data);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(msg);
      } else {
        window.parent.postMessage(msg, '*');
      }
    }

    // 渲染地图
    geojsonData.features.forEach(feature => {
      const props = feature.properties;
      const districtId = props.nameZh;
      
      districtData[districtId] = {
        fill: props.fill,
        fillHover: props.fillHover,
        stroke: props.stroke,
        total: props.total,
        kindergarten: props.kindergarten,
        primary: props.primary,
        secondary: props.secondary,
        byCategory: props.byCategory,
        region: props.region,
      };
      
      // 转换坐标: GeoJSON [lng, lat] -> Leaflet [lat, lng]
      let coordinates;
      if (feature.geometry.type === 'Polygon') {
        coordinates = feature.geometry.coordinates[0].map(c => [c[1], c[0]]);
      } else if (feature.geometry.type === 'MultiPolygon') {
        coordinates = feature.geometry.coordinates.map(poly => 
          poly[0].map(c => [c[1], c[0]])
        );
      }
      
      const polygon = L.polygon(coordinates, {
        color: props.stroke,
        weight: 2,
        opacity: 1,
        fillColor: props.fill,
        fillOpacity: 0.9,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(map);
      
      polygonLayers[districtId] = polygon;
      
      // 计算中心点并添加标签
      const bounds = polygon.getBounds();
      const center = bounds.getCenter();
      
      const labelHtml = '<span style="color:' + props.stroke + '">' + 
        districtId.replace('區', '') + 
        '</span><span class="district-count" style="background:' + props.stroke + '"><span class="district-count-text">' + 
        props.total + '</span></span>';
      
      const label = L.divIcon({
        className: 'district-label',
        html: labelHtml,
        iconSize: null,
      });
      
      const labelMarker = L.marker(center, { icon: label, interactive: false, zIndexOffset: 1000 }).addTo(map);
      labelLayers[districtId] = labelMarker;
      
      // 交互事件
      polygon.on('mouseover', function() {
        if (currentMode === 'districts' && selectedDistrict !== districtId) {
          this.setStyle({ fillColor: props.fillHover, fillOpacity: 0.95, weight: 3 });
        }
        postToParent({
          type: 'hover',
          district: districtId,
          stats: {
            total: props.total,
            kindergarten: props.kindergarten,
            primary: props.primary,
            secondary: props.secondary,
            byCategory: props.byCategory,
          }
        });
      });
      
      polygon.on('mouseout', function() {
        if (currentMode === 'districts' && selectedDistrict !== districtId) {
          this.setStyle({ fillColor: props.fill, fillOpacity: 0.9, weight: 2 });
        }
        postToParent({ type: 'hoverEnd' });
      });
      
      polygon.on('click', function() {
        if (currentMode !== 'districts') return;
        
        // 重置之前选中的
        if (selectedDistrict && polygonLayers[selectedDistrict]) {
          const prevData = districtData[selectedDistrict];
          polygonLayers[selectedDistrict].setStyle({ 
            fillColor: prevData.fill, 
            fillOpacity: 0.9, 
            weight: 2 
          });
        }
        
        if (selectedDistrict === districtId) {
          postToParent({ type: 'deselect', district: districtId });
          selectedDistrict = null;
        } else {
          selectedDistrict = districtId;
          this.setStyle({ fillColor: props.stroke, fillOpacity: 0.85, weight: 4 });
          postToParent({
            type: 'tap',
            district: districtId,
            stats: {
              total: props.total,
              kindergarten: props.kindergarten,
              primary: props.primary,
              secondary: props.secondary,
              byCategory: props.byCategory,
            }
          });
        }
      });
    });
    
    // 调整视图以适应所有区
    const allPolygons = Object.values(polygonLayers);
    if (allPolygons.length > 0) {
      const group = L.featureGroup(allPolygons);
      map.fitBounds(group.getBounds().pad(0.05));
    }
    
    // 添加图例
    const legendDiv = L.control({ position: 'bottomleft' });
    legendDiv.onAdd = function() {
      const div = L.DomUtil.create('div');
      div.innerHTML = \`
        <div style="background:rgba(255,255,255,0.95);padding:10px 14px;border-radius:10px;font-size:11px;box-shadow:0 2px 8px rgba(0,0,0,0.1);margin:10px;border:1px solid rgba(45,90,79,0.1);">
          <div style="display:flex;gap:12px;align-items:center;">
            <div style="display:flex;align-items:center;gap:4px;">
              <div style="width:14px;height:14px;background:#98D8AA;border:2px solid #2D6A4F;border-radius:3px;"></div>
              <span style="color:#2D6A4F;font-weight:600;">新界</span>
            </div>
            <div style="display:flex;align-items:center;gap:4px;">
              <div style="width:14px;height:14px;background:#DDA0DD;border:2px solid #8B5A8B;border-radius:3px;"></div>
              <span style="color:#8B5A8B;font-weight:600;">九龍</span>
            </div>
            <div style="display:flex;align-items:center;gap:4px;">
              <div style="width:14px;height:14px;background:#A8D8EA;border:2px solid #2E86AB;border-radius:3px;"></div>
              <span style="color:#2E86AB;font-weight:600;">港島</span>
            </div>
          </div>
        </div>
      \`;
      return div;
    };
    legendDiv.addTo(map);

    // API to update map from React
    window.updateMapMode = function(mode, schools, districts) {
      currentMode = mode;
      highlightedDistricts = new Set(districts || []);

      // Clear existing school markers
      schoolMarkers.forEach(m => map.removeLayer(m));
      schoolMarkers = [];

      if (mode === 'districts') {
        // Show all districts normally
        Object.keys(polygonLayers).forEach(id => {
          const data = districtData[id];
          if (data) {
            polygonLayers[id].setStyle({
              fillColor: data.fill,
              fillOpacity: 0.9,
              weight: 2,
              opacity: 1,
            });
          }
          if (labelLayers[id]) labelLayers[id].setOpacity(1);
        });
        selectedDistrict = null;
      } else {
        // Filtered or favorites mode: dim non-highlighted districts
        Object.keys(polygonLayers).forEach(id => {
          const data = districtData[id];
          if (highlightedDistricts.has(id)) {
            polygonLayers[id].setStyle({
              fillColor: data ? data.fillHover : '#98D8AA',
              fillOpacity: 0.95,
              weight: 3,
              opacity: 1,
            });
            if (labelLayers[id]) labelLayers[id].setOpacity(1);
          } else {
            polygonLayers[id].setStyle({
              fillColor: data ? data.fill : '#98D8AA',
              fillOpacity: 0.3,
              weight: 1,
              opacity: 0.5,
            });
            if (labelLayers[id]) labelLayers[id].setOpacity(0.4);
          }
        });

        // Add school pins
        if (schools && schools.length > 0) {
          schools.forEach(school => {
            if (school.lat && school.lng) {
              const color = school.color || '#00D9FF';
              const pinIcon = L.divIcon({
                className: '',
                html: '<div class="school-pin" style="background-color:' + color + '"></div>',
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              });

              const marker = L.marker([school.lat, school.lng], { icon: pinIcon })
                .addTo(map)
                .on('click', function() {
                  postToParent({ type: 'schoolClick', schoolId: school.id });
                });

              schoolMarkers.push(marker);
            }
          });
        }
      }
    };

    window.resetToDistricts = function() {
      window.updateMapMode('districts', [], []);
      selectedDistrict = null;
    };

    // Listen for commands from React (for iframe)
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'eval' && event.data.script) {
        try {
          eval(event.data.script);
        } catch (e) {
          console.error('Map eval error:', e);
        }
      }
    });
  </script>
</body>
</html>
`;
}

export default function SchoolMapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/3f1b0cfb-5f1e-4361-b14d-4c50afb523e0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/school-map.tsx:321',message:'colors defined',data:{hasColors:!!colors,primary:colors?.primary},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const filterContext = useContext(FilterContext);
  const webViewRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Category colors for pins (some colors not in theme, keep as is) - moved inside component
  const CATEGORY_COLORS: Record<string, string> = {
    "公立": "#6B7280",
    "資助": "#22C55E",
    "直資": colors.warning,
    "私立": "#8B5CF6",
    "國際": colors.primary,
  };
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/3f1b0cfb-5f1e-4361-b14d-4c50afb523e0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/school-map.tsx:335',message:'CATEGORY_COLORS defined',data:{categoryColors:Object.keys(CATEGORY_COLORS)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  // View mode
  const [viewMode, setViewMode] = useState<MapViewMode>("districts");

  // District selection state
  const [selectedDistrict, setSelectedDistrict] = useState<District18 | null>(null);
  const [selectedStats, setSelectedStats] = useState<DistrictStats | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<District18 | null>(null);
  const [hoveredStats, setHoveredStats] = useState<DistrictStats | null>(null);

  // Filter sheet state
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [lockedDistrict, setLockedDistrict] = useState<District18 | null>(null);

  // Mobile sheet for district tap
  const [showMobileSheet, setShowMobileSheet] = useState(false);

  // Filtered schools
  const [filteredSchools, setFilteredSchools] = useState<GroupedSchool[]>([]);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);

  // Bottom sheet expanded state
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(false);

  // Calculate district stats
  const districtStats = useMemo(() => calculateAllDistrictStats(SCHOOLS), []);

  // Generate map HTML
  const mapHTML = useMemo(
    () => generateMapHTML(DISTRICT_POLYGONS, DISTRICT_MAP_DATA, districtStats),
    [districtStats]
  );

  // Blob URL for web iframe
  const mapBlobUrl = useMemo(() => {
    if (!isWeb) return null;
    const blob = new Blob([mapHTML], { type: "text/html" });
    return URL.createObjectURL(blob);
  }, [mapHTML]);

  useEffect(() => {
    return () => {
      if (mapBlobUrl) URL.revokeObjectURL(mapBlobUrl);
    };
  }, [mapBlobUrl]);

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await FavoritesStorage.getAll();
    setFavorites(favs);
  };

  // Get favorite schools with details
  const favoriteSchools = useMemo(() => {
    const schoolMap = new Map(SCHOOLS.map((s) => [s.id, s]));
    return favorites
      .map((id) => schoolMap.get(id))
      .filter((s): s is School => s !== undefined);
  }, [favorites]);

  // Schools to display (filtered or selected favorites)
  const displaySchools = useMemo(() => {
    if (viewMode === "filtered") return filteredSchools;
    if (viewMode === "favorites" && selectedFavorites.length > 0) {
      const schoolMap = new Map(SCHOOLS.map((s) => [s.id, s]));
      return selectedFavorites
        .map((id) => schoolMap.get(id))
        .filter((s): s is School => s !== undefined) as GroupedSchool[];
    }
    return [];
  }, [viewMode, filteredSchools, selectedFavorites]);

  // Get districts that contain display schools
  const highlightedDistricts = useMemo(() => {
    const districts = new Set<District18>();
    displaySchools.forEach((school) => {
      if (school.district18) districts.add(school.district18);
    });
    return Array.from(districts);
  }, [displaySchools]);

  // Update map when view mode or schools change
  useEffect(() => {
    if (viewMode === "districts") {
      sendMapCommand("resetToDistricts");
    } else {
      const schoolsForMap = displaySchools.map((s) => ({
        id: s.id,
        lat: s.latitude,
        lng: s.longitude,
        color: CATEGORY_COLORS[s.category] || colors.primary,
      }));
      sendMapCommand("updateMapMode", viewMode, schoolsForMap, highlightedDistricts);
    }
  }, [viewMode, displaySchools, highlightedDistricts]);

  // Send command to map
  const sendMapCommand = (command: string, ...args: any[]) => {
    const script = `window.${command}(${args.map((a) => JSON.stringify(a)).join(",")})`;
    if (isWeb && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "eval", script }, "*");
    } else if (webViewRef.current) {
      webViewRef.current.injectJavaScript(script + "; true;");
    }
  };

  // Handle map messages
  const handleMapMessage = useCallback((data: any) => {
    if (data.type === "hover") {
      setHoveredDistrict(data.district);
      setHoveredStats(data.stats);
    } else if (data.type === "hoverEnd") {
      setHoveredDistrict(null);
      setHoveredStats(null);
    } else if (data.type === "tap") {
      setSelectedDistrict(data.district);
      setSelectedStats(data.stats);
      setShowMobileSheet(true);
    } else if (data.type === "deselect") {
      // Second click on same district - close the popup
      setShowMobileSheet(false);
      setSelectedDistrict(null);
      setSelectedStats(null);
    } else if (data.type === "schoolClick") {
      router.push(`/school/${data.schoolId}` as any);
    }
  }, []);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      handleMapMessage(data);
    } catch (e) {}
  };

  useEffect(() => {
    if (!isWeb) return;
    const handleWindowMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data.type) handleMapMessage(data);
      } catch (e) {}
    };
    window.addEventListener("message", handleWindowMessage);
    return () => window.removeEventListener("message", handleWindowMessage);
  }, [handleMapMessage]);

  // Open filter sheet with district locked
  const openFiltersWithDistrict = (district: District18) => {
    if (filterContext) {
      filterContext.dispatch({ type: "CLEAR_DISTRICT18" });
      filterContext.dispatch({ type: "TOGGLE_DISTRICT18", payload: district });
    }
    setLockedDistrict(district);
    setShowFilterSheet(true);
    setShowMobileSheet(false);
  };

  // Handle filter apply
  const handleFilterApply = () => {
    if (!filterContext) return;

    // Get filtered results using the filter logic
    const results = filterSchools(allSchools, "", filterContext.state);
    const grouped = groupSchoolsBySession(results);

    setFilteredSchools(grouped);
    setViewMode("filtered");
    setShowFilterSheet(false);
    setLockedDistrict(null);
    setBottomSheetExpanded(true);

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  // Handle filter close (cancel)
  const handleFilterClose = () => {
    setShowFilterSheet(false);
    setLockedDistrict(null);
  };

  // Toggle favorite selection for map display
  const toggleFavoriteSelection = (schoolId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setSelectedFavorites((prev) => {
      const newSelection = prev.includes(schoolId)
        ? prev.filter((id) => id !== schoolId)
        : [...prev, schoolId];

      if (newSelection.length > 0) {
        setViewMode("favorites");
        setBottomSheetExpanded(true);
      } else {
        setViewMode("districts");
      }

      return newSelection;
    });
  };

  // Go back to districts view
  const handleGoBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setViewMode("districts");
    setFilteredSchools([]);
    setSelectedFavorites([]);
    setBottomSheetExpanded(false);
    if (filterContext) {
      filterContext.dispatch({ type: "RESET_FILTERS" });
    }
  };

  // Handle school card press
  const handleSchoolPress = (schoolId: string) => {
    router.push(`/school/${schoolId}` as any);
  };

  // Handle favorite toggle from card
  const handleFavoriteToggle = async (schoolId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await FavoritesStorage.toggle(schoolId);
    await loadFavorites();
  };

  // Render stats popover (web hover)
  const renderStatsPopover = () => {
    if (viewMode !== "districts" || !hoveredDistrict || !hoveredStats) return null;

    const districtInfo = DISTRICT_MAP_DATA.find((d) => d.id === hoveredDistrict);
    if (!districtInfo) return null;

    return (
      <View style={styles.popoverContainer}>
        <View style={[styles.popover, { borderColor: districtInfo.color }]}>
          <Text style={[styles.popoverTitle, { color: districtInfo.color }]}>
            {districtInfo.name}
          </Text>
          <View style={styles.popoverColumns}>
            {/* KG - 1/3 */}
            <View style={styles.popoverColumnLeft}>
              <Text style={styles.popoverLevelLabel}>幼稚園</Text>
              <Text style={styles.popoverLevelValue}>{hoveredStats.kindergarten}</Text>
            </View>
            {/* Pri+Sec - 2/3 */}
            <View style={styles.popoverColumnRight}>
              <View style={styles.popoverLevelRow}>
                <View style={styles.popoverLevelItem}>
                  <Text style={styles.popoverLevelLabel}>小學</Text>
                  <Text style={styles.popoverLevelValue}>{hoveredStats.primary}</Text>
                </View>
                <View style={styles.popoverLevelItem}>
                  <Text style={styles.popoverLevelLabel}>中學</Text>
                  <Text style={styles.popoverLevelValue}>{hoveredStats.secondary}</Text>
                </View>
              </View>
              {/* Category breakdown under Pri+Sec */}
              {hoveredStats.byCategory && Object.keys(hoveredStats.byCategory).length > 0 && (
                <View style={styles.popoverCategoryRow}>
                  {Object.entries(hoveredStats.byCategory)
                    .filter(([_, count]) => count > 0)
                    .map(([cat, count]) => (
                      <Text key={cat} style={styles.popoverCategoryText}>
                        {cat}: {count}
                      </Text>
                    ))}
                </View>
              )}
            </View>
          </View>
          <Text style={styles.popoverHint}>點擊以篩選</Text>
        </View>
      </View>
    );
  };

  // Render mobile district sheet
  const renderMobileSheet = () => {
    if (!showMobileSheet || !selectedDistrict || !selectedStats) return null;

    const districtInfo = DISTRICT_MAP_DATA.find((d) => d.id === selectedDistrict);
    if (!districtInfo) return null;

    return (
      <Modal
        visible={showMobileSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMobileSheet(false)}
      >
        <Pressable style={styles.sheetOverlay} onPress={() => setShowMobileSheet(false)}>
          <View style={styles.mobileSheet}>
            <View style={styles.sheetHandle} />
            <View style={[styles.sheetHeader, { borderBottomColor: districtInfo.color }]}>
              <Text style={[styles.sheetTitle, { color: districtInfo.color }]}>
                {districtInfo.name}
              </Text>
              <View style={[styles.sheetBadge, { backgroundColor: districtInfo.color }]}>
                <Text style={styles.sheetBadgeText}>{selectedStats.total} 所學校</Text>
              </View>
            </View>

            <View style={styles.sheetStatsColumns}>
              {/* KG - 1/3 */}
              <View style={styles.sheetStatsKG}>
                <Text style={styles.sheetStatLabel}>幼稚園</Text>
                <Text style={styles.sheetStatValue}>{selectedStats.kindergarten}</Text>
              </View>
              {/* Pri+Sec - 2/3 */}
              <View style={styles.sheetStatsPriSec}>
                <View style={styles.sheetStatsRow}>
                  <View style={styles.sheetStatItem}>
                    <Text style={styles.sheetStatLabel}>小學</Text>
                    <Text style={styles.sheetStatValue}>{selectedStats.primary}</Text>
                  </View>
                  <View style={styles.sheetStatItem}>
                    <Text style={styles.sheetStatLabel}>中學</Text>
                    <Text style={styles.sheetStatValue}>{selectedStats.secondary}</Text>
                  </View>
                </View>
                {/* Category breakdown under Pri+Sec */}
                {selectedStats.byCategory && Object.keys(selectedStats.byCategory).length > 0 && (
                  <View style={styles.sheetCategoryRow}>
                    {Object.entries(selectedStats.byCategory)
                      .filter(([_, count]) => count > 0)
                      .map(([cat, count]) => (
                        <Text key={cat} style={styles.sheetCategoryText}>{cat}: {count}</Text>
                      ))}
                  </View>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.sheetButton, { backgroundColor: districtInfo.color }]}
              onPress={() => openFiltersWithDistrict(selectedDistrict)}
              activeOpacity={0.85}
            >
              <Text style={styles.sheetButtonText}>篩選此區學校</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    );
  };

  // Render bottom sheet with school cards or favorites
  const renderBottomSheet = () => {
    const hasResults = displaySchools.length > 0;
    const sheetHeight = bottomSheetExpanded ? SCREEN_HEIGHT * 0.45 : 160;

    return (
      <View style={[styles.bottomSheet, { height: sheetHeight, paddingBottom: insets.bottom }]}>
        {/* Header */}
        <TouchableOpacity
          style={styles.bottomSheetHeader}
          onPress={() => setBottomSheetExpanded(!bottomSheetExpanded)}
          activeOpacity={0.8}
        >
          <View style={styles.bottomSheetHandle} />
          <View style={styles.bottomSheetTitleRow}>
            {viewMode === "filtered" && (
              <>
                <IconSymbol name="line.3.horizontal.decrease.circle.fill" size={18} color={colors.primary} />
                <Text style={styles.bottomSheetTitle}>
                  篩選結果（{displaySchools.length}）
                </Text>
              </>
            )}
            {viewMode === "favorites" && (
              <>
                <IconSymbol name="heart.fill" size={18} color={colors.error} />
                <Text style={styles.bottomSheetTitle}>
                  已選收藏（{selectedFavorites.length}）
                </Text>
              </>
            )}
            {viewMode === "districts" && (
              <>
                <IconSymbol name="heart" size={18} color={colors.primary} />
                <Text style={styles.bottomSheetTitle}>收藏列表</Text>
              </>
            )}
            <IconSymbol
              name={bottomSheetExpanded ? "chevron.down" : "chevron.up"}
              size={18}
              color={colors.foreground}
            />
          </View>
        </TouchableOpacity>

        {/* Content */}
        <ScrollView
          style={styles.bottomSheetContent}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Show school cards when filtered/favorites mode */}
          {(viewMode === "filtered" || viewMode === "favorites") && hasResults && (
            <View style={styles.schoolCardsContainer}>
              {displaySchools.slice(0, bottomSheetExpanded ? 20 : 3).map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  isFavorite={favorites.includes(school.id)}
                  onPress={() => handleSchoolPress(school.id)}
                  onFavoritePress={() => handleFavoriteToggle(school.id)}
                  sessions={(school as any).sessions}
                  showSessions={school.level === "幼稚園"}
                />
              ))}
              {!bottomSheetExpanded && displaySchools.length > 3 && (
                <Text style={styles.moreText}>還有 {displaySchools.length - 3} 所學校...</Text>
              )}
            </View>
          )}

          {/* Favorites section (when in districts mode) */}
          {viewMode === "districts" && (
            <View style={[styles.favoritesSection, { paddingHorizontal: Spacing.lg }]}>
              {favoriteSchools.length > 0 ? (
                <>
                  <Text style={styles.favoritesHint}>選擇收藏的學校以在地圖上顯示</Text>
                  {favoriteSchools.map((school) => {
                    const isSelected = selectedFavorites.includes(school.id);
                    return (
                      <TouchableOpacity
                        key={school.id}
                        style={[styles.favoriteItem, isSelected && styles.favoriteItemSelected]}
                        onPress={() => toggleFavoriteSelection(school.id)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.favoriteCheckbox, isSelected && styles.favoriteCheckboxSelected]}>
                          {isSelected && <IconSymbol name="checkmark" size={12} color={colors.background} />}
                        </View>
                        <View style={styles.favoriteInfo}>
                          <Text style={styles.favoriteName} numberOfLines={1}>{school.name}</Text>
                          <Text style={styles.favoriteMeta}>{school.district18}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </>
              ) : (
                <View style={styles.emptyFavorites}>
                  <IconSymbol name="heart" size={32} color={colors.muted + "33"} />
                  <Text style={styles.emptyFavoritesText}>收藏列表裡尚未有學校</Text>
                  <Text style={styles.emptyFavoritesHint}>瀏覽學校詳情時點擊愛心即可收藏</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  // Define styles inside component to access colors
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing.md,
      paddingBottom: 2,
      backgroundColor: colors.background,
      zIndex: 10,
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    resetButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: BorderRadius.lg,
      backgroundColor: colors.primary,
    },
    resetButtonText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.background,
      fontFamily: "NotoSerifSC-Regular",
    },
    headerTitle: {
      ...TypographyStyles.heading,
      fontSize: 16,
      color: colors.foreground,
    },
    instruction: {
      backgroundColor: colors.primary + "1A",
      marginHorizontal: Spacing.md,
      borderRadius: BorderRadius.sm,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginBottom: 2,
      borderWidth: 1,
      borderColor: colors.primary + "33",
    },
    instructionText: {
      ...TypographyStyles.caption,
      fontSize: 10,
      color: colors.primary,
      textAlign: "center",
      fontWeight: "500",
    },
    modeIndicator: {
      backgroundColor: colors.primary + "1A",
      marginHorizontal: Spacing.md,
      borderRadius: BorderRadius.sm,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginBottom: 2,
      borderWidth: 1,
      borderColor: colors.primary + "33",
    },
    modeIndicatorText: {
      ...TypographyStyles.caption,
      fontSize: 11,
      color: colors.primary,
      textAlign: "center",
      fontWeight: "500",
    },
    mapContainer: {
      marginHorizontal: 0,
      overflow: "hidden",
    },
    webView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    // Popover
    popoverContainer: {
      position: "absolute",
      top: 80,
      right: Spacing.lg,
      zIndex: 1000,
    },
    popover: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadiusPresets.card,
      padding: Spacing.md,
      minWidth: 160,
      borderWidth: 2,
    },
    popoverTitle: {
      ...TypographyStyles.heading,
      fontSize: 16,
      marginBottom: Spacing.sm,
    },
    popoverColumns: {
      flexDirection: "row",
    },
    popoverColumnLeft: {
      flex: 1,
      alignItems: "center",
      paddingRight: Spacing.sm,
      borderRightWidth: 1,
      borderRightColor: colors.border,
    },
    popoverColumnRight: {
      flex: 2,
      paddingLeft: Spacing.sm,
    },
    popoverLevelRow: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    popoverLevelItem: {
      alignItems: "center",
    },
    popoverLevelLabel: {
      ...TypographyStyles.caption,
      fontSize: 11,
      color: colors.muted,
      marginBottom: 2,
    },
    popoverLevelValue: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
    },
    popoverCategoryRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.sm,
      marginTop: Spacing.sm,
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    popoverCategoryText: {
      ...TypographyStyles.caption,
      fontSize: 11,
      color: colors.muted,
    },
    popoverHint: {
      ...TypographyStyles.caption,
      fontSize: 11,
      color: colors.muted,
      marginTop: Spacing.sm,
      textAlign: "center",
    },
    // Mobile sheet
    sheetOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "flex-end",
    },
    mobileSheet: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.md,
      paddingBottom: Spacing["2xl"],
    },
    sheetHandle: {
      width: 40,
      height: 4,
      backgroundColor: colors.border + "33",
      borderRadius: 2,
      alignSelf: "center",
      marginBottom: Spacing.lg,
    },
    sheetHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: Spacing.md,
      borderBottomWidth: 2,
      marginBottom: Spacing.lg,
    },
    sheetTitle: {
      ...TypographyStyles.heading,
      fontSize: 20,
    },
    sheetBadge: {
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.md,
    },
    sheetBadgeText: {
      ...TypographyStyles.caption,
      fontSize: 12,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.background,
    },
    sheetStatsColumns: {
      flexDirection: "row",
      marginBottom: Spacing.xl,
    },
    sheetStatsKG: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRightWidth: 1,
      borderRightColor: colors.border + "26",
      paddingRight: Spacing.lg,
    },
    sheetStatsPriSec: {
      flex: 2,
      paddingLeft: Spacing.lg,
    },
    sheetStatsRow: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    sheetCategoryRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.sm,
      marginTop: Spacing.sm,
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border + "80",
    },
    sheetCategoryText: {
      ...TypographyStyles.caption,
      fontSize: 11,
      color: colors.muted,
    },
    sheetStatItem: {
      alignItems: "center",
    },
    sheetStatLabel: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted,
      marginBottom: Spacing.xs,
    },
    sheetStatValue: {
      ...TypographyStyles.heading,
      fontSize: 24,
      color: colors.foreground,
    },
    sheetButton: {
      paddingVertical: Spacing.md,
      borderRadius: BorderRadiusPresets.button,
      alignItems: "center",
    },
    sheetButtonText: {
      ...TypographyStyles.body,
      fontSize: 15,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.background,
    },
    // Bottom sheet
    bottomSheet: {
      backgroundColor: colors.background + "FA",
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      borderTopWidth: 1,
      borderTopColor: colors.border + "80",
    },
    bottomSheetHeader: {
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.md,
      paddingHorizontal: Spacing.lg,
    },
    bottomSheetHandle: {
      width: 36,
      height: 4,
      backgroundColor: colors.border + "33",
      borderRadius: 2,
      alignSelf: "center",
      marginBottom: Spacing.md,
    },
    bottomSheetTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
    },
    bottomSheetTitle: {
      flex: 1,
      ...TypographyStyles.body,
      fontSize: 15,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
    },
    bottomSheetContent: {
      flex: 1,
    },
    schoolCardsContainer: {
      gap: 0,
    },
    moreText: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted + "66",
      textAlign: "center",
      marginTop: Spacing.sm,
      marginHorizontal: Spacing.lg,
    },
    // Favorites
    favoritesSection: {
      gap: Spacing.sm,
    },
    favoritesHint: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted,
      marginBottom: Spacing.sm,
    },
    favoriteItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface + "08",
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      gap: Spacing.md,
      borderWidth: 1,
      borderColor: "transparent",
    },
    favoriteItemSelected: {
      backgroundColor: colors.primary + "1A",
      borderColor: colors.primary + "4D",
    },
    favoriteCheckbox: {
      width: 22,
      height: 22,
      borderRadius: BorderRadius.sm,
      borderWidth: 2,
      borderColor: colors.border + "4D",
      justifyContent: "center",
      alignItems: "center",
    },
    favoriteCheckboxSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    favoriteInfo: {
      flex: 1,
    },
    favoriteName: {
      ...TypographyStyles.body,
      fontSize: 14,
      fontWeight: "500",
      color: colors.foreground,
    },
    favoriteMeta: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted,
      marginTop: 2,
    },
    emptyFavorites: {
      alignItems: "center",
      paddingVertical: Spacing["2xl"],
    },
    emptyFavoritesText: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.muted,
      marginTop: Spacing.md,
    },
    emptyFavoritesHint: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted + "4D",
      marginTop: Spacing.xs,
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Compact Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {viewMode === "districts" ? "選擇地區" : viewMode === "filtered" ? "篩選結果" : "收藏學校"}
        </Text>
        {viewMode !== "districts" ? (
          <TouchableOpacity onPress={handleGoBack} style={styles.resetButton} activeOpacity={0.7}>
            <IconSymbol name="map" size={16} color={colors.background} />
            <Text style={styles.resetButtonText}>返回地圖</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}
      </View>

      {/* Compact Instruction */}
      {viewMode === "districts" && (
        <View style={styles.instruction}>
          <Text style={styles.instructionText}>
            {isWeb ? "懸停查看統計，點擊進入篩選" : "點擊地區查看詳情，再點一次進入篩選"}
          </Text>
        </View>
      )}

      {/* Mode indicator */}
      {viewMode !== "districts" && (
        <View style={styles.modeIndicator}>
          <Text style={styles.modeIndicatorText}>
            顯示 {displaySchools.length} 所學校於 {highlightedDistricts.length} 個地區
          </Text>
        </View>
      )}

      {/* Map - full width, fill remaining space */}
      <View style={{ flex: 1 }}>
        {isWeb ? (
          <iframe
            ref={iframeRef as any}
            src={mapBlobUrl || undefined}
            style={{ width: "100%", height: "100%", border: "none", backgroundColor: "#FAF8F5" }}
          />
        ) : WebView ? (
          <WebView
            ref={webViewRef}
            source={{ html: mapHTML }}
            style={styles.webView}
            onMessage={handleWebViewMessage}
            scrollEnabled={false}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        ) : (
          <View style={styles.webView}>
            <Text style={{ color: colors.foreground, textAlign: "center", marginTop: 100 }}>
              地圖載入中...
            </Text>
          </View>
        )}
      </View>

      {/* Web hover popover */}
      {renderStatsPopover()}

      {/* Mobile district sheet */}
      {renderMobileSheet()}

      {/* Bottom sheet */}
      {renderBottomSheet()}

      {/* Filter sheet modal */}
      <FilterSheet
        visible={showFilterSheet}
        onClose={handleFilterClose}
        lockedDistrict={lockedDistrict}
        onApply={handleFilterApply}
      />
    </View>
  );
}
