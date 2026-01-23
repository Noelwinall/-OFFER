import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, Platform, Pressable, ScrollView, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FilterSheet } from "@/components/filter-sheet";
import { SchoolCard } from "@/components/school-card";
import { useState, useMemo, useEffect, useCallback, useContext, useRef } from "react";
import { SCHOOLS } from "@/data/schools";
import type { School, District18 } from "@/types/school";
import { DISTRICT_MAP_DATA, calculateAllDistrictStats, type DistrictStats } from "@/lib/district-map-data";
import { DISTRICT_POLYGONS } from "@/lib/district-polygons";
import { FavoritesStorage } from "@/lib/storage";
import { FilterContext, hasActiveFilters } from "@/lib/filter-context";
import { filterSchools } from "@/lib/filter-logic";
import { schools as allSchools } from "@/data/schools";
import { groupSchoolsBySession, type GroupedSchool } from "@/lib/school-classification";
import * as Haptics from "expo-haptics";

// Conditionally import WebView only for native platforms
let WebView: any = null;
if (Platform.OS !== "web") {
  WebView = require("react-native-webview").WebView;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

// View modes for the map
type MapViewMode = "districts" | "filtered" | "favorites";

// Category colors for pins
const CATEGORY_COLORS: Record<string, string> = {
  "公立": "#6B7280",
  "資助": "#22C55E",
  "直資": "#F59E0B",
  "私立": "#8B5CF6",
  "國際": "#00D9FF",
};

// Generate Leaflet HTML for the map with dynamic pin support
function generateMapHTML(
  districtPolygons: typeof DISTRICT_POLYGONS,
  districtMapData: typeof DISTRICT_MAP_DATA,
  districtStats: Map<District18, DistrictStats>
): string {
  const polygonData = districtPolygons.map((polygon) => {
    const info = districtMapData.find((d) => d.id === polygon.id);
    const stats = districtStats.get(polygon.id);
    return {
      id: polygon.id,
      coordinates: polygon.coordinates.map(([lng, lat]) => [lat, lng]),
      color: info?.color || "#00D9FF",
      total: stats?.total || 0,
      kindergarten: stats?.kindergarten || 0,
      primary: stats?.primary || 0,
      secondary: stats?.secondary || 0,
      byCategory: stats?.byCategory || {},
    };
  });

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
    #map { width: 100%; height: 100%; background: #0F1629; }
    .leaflet-container { background: #0F1629 !important; }
    .leaflet-control-zoom { display: none; }
    .leaflet-control-attribution { display: none; }
    .district-label {
      background: none !important;
      border: none !important;
      box-shadow: none !important;
      font-weight: 700;
      font-size: 11px;
      color: #FFFFFF;
      text-shadow: 0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5);
      white-space: nowrap;
      pointer-events: none;
    }
    .district-count {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 600;
      margin-left: 4px;
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
    const polygonData = ${JSON.stringify(polygonData)};
    let currentMode = 'districts';
    let schoolMarkers = [];
    let highlightedDistricts = new Set();

    const map = L.map('map', {
      center: [22.35, 114.15],
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
      minZoom: 10,
      maxZoom: 16,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    let selectedDistrict = null;
    const polygonLayers = {};
    const labelLayers = {};

    function postToParent(data) {
      const msg = JSON.stringify(data);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(msg);
      } else {
        window.parent.postMessage(msg, '*');
      }
    }

    // Create polygons
    polygonData.forEach(district => {
      const polygon = L.polygon(district.coordinates, {
        color: district.color,
        weight: 2,
        opacity: 0.8,
        fillColor: district.color,
        fillOpacity: 0.25,
      }).addTo(map);

      polygonLayers[district.id] = polygon;

      const bounds = polygon.getBounds();
      const center = bounds.getCenter();

      const labelHtml = '<span>' + district.id.replace('區', '') + '</span>' +
        '<span class="district-count" style="background:' + district.color + ';color:#0F1629;">' +
        district.total + '</span>';

      const label = L.divIcon({
        className: 'district-label',
        html: labelHtml,
        iconSize: null,
      });

      const labelMarker = L.marker(center, { icon: label, interactive: false }).addTo(map);
      labelLayers[district.id] = labelMarker;

      polygon.on('mouseover', function() {
        if (currentMode === 'districts' && selectedDistrict !== district.id) {
          this.setStyle({ fillOpacity: 0.45, weight: 3 });
        }
        postToParent({
          type: 'hover',
          district: district.id,
          stats: {
            total: district.total,
            kindergarten: district.kindergarten,
            primary: district.primary,
            secondary: district.secondary,
            byCategory: district.byCategory,
          }
        });
      });

      polygon.on('mouseout', function() {
        if (currentMode === 'districts' && selectedDistrict !== district.id) {
          this.setStyle({ fillOpacity: 0.25, weight: 2 });
        }
        postToParent({ type: 'hoverEnd' });
      });

      polygon.on('click', function() {
        if (currentMode !== 'districts') return;

        if (selectedDistrict && polygonLayers[selectedDistrict]) {
          polygonLayers[selectedDistrict].setStyle({ fillOpacity: 0.25, weight: 2 });
        }

        if (selectedDistrict === district.id) {
          // Second click on same district - just deselect
          postToParent({ type: 'deselect', district: district.id });
          selectedDistrict = null;
        } else {
          selectedDistrict = district.id;
          this.setStyle({ fillOpacity: 0.5, weight: 4 });
          postToParent({
            type: 'tap',
            district: district.id,
            stats: {
              total: district.total,
              kindergarten: district.kindergarten,
              primary: district.primary,
              secondary: district.secondary,
              byCategory: district.byCategory,
            }
          });
        }
      });
    });

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
          const info = polygonData.find(d => d.id === id);
          polygonLayers[id].setStyle({
            fillOpacity: 0.25,
            weight: 2,
            opacity: 0.8,
          });
          if (labelLayers[id]) labelLayers[id].setOpacity(1);
        });
      } else {
        // Filtered or favorites mode: dim non-highlighted districts
        Object.keys(polygonLayers).forEach(id => {
          if (highlightedDistricts.has(id)) {
            polygonLayers[id].setStyle({
              fillOpacity: 0.4,
              weight: 3,
              opacity: 1,
            });
            if (labelLayers[id]) labelLayers[id].setOpacity(1);
          } else {
            polygonLayers[id].setStyle({
              fillOpacity: 0.08,
              weight: 1,
              opacity: 0.3,
            });
            if (labelLayers[id]) labelLayers[id].setOpacity(0.3);
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
  const filterContext = useContext(FilterContext);
  const webViewRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
        color: CATEGORY_COLORS[s.category] || "#00D9FF",
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
                <IconSymbol name="line.3.horizontal.decrease.circle.fill" size={18} color="#00D9FF" />
                <Text style={styles.bottomSheetTitle}>
                  篩選結果（{displaySchools.length}）
                </Text>
              </>
            )}
            {viewMode === "favorites" && (
              <>
                <IconSymbol name="heart.fill" size={18} color="#EF4444" />
                <Text style={styles.bottomSheetTitle}>
                  已選收藏（{selectedFavorites.length}）
                </Text>
              </>
            )}
            {viewMode === "districts" && (
              <>
                <IconSymbol name="heart" size={18} color="#00D9FF" />
                <Text style={styles.bottomSheetTitle}>收藏列表</Text>
              </>
            )}
            <IconSymbol
              name={bottomSheetExpanded ? "chevron.down" : "chevron.up"}
              size={16}
              color="rgba(255,255,255,0.5)"
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
            <View style={[styles.favoritesSection, { paddingHorizontal: 16 }]}>
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
                          {isSelected && <IconSymbol name="checkmark" size={12} color="#0F1629" />}
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
                  <IconSymbol name="heart" size={32} color="rgba(255,255,255,0.2)" />
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

  return (
    <View style={{ flex: 1, backgroundColor: "#0F1629" }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {viewMode === "districts" ? "選擇地區" : viewMode === "filtered" ? "篩選結果" : "收藏學校"}
        </Text>
        {viewMode !== "districts" ? (
          <TouchableOpacity onPress={handleGoBack} style={styles.resetButton} activeOpacity={0.7}>
            <IconSymbol name="arrow.counterclockwise" size={20} color="#00D9FF" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* Instruction */}
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

      {/* Map */}
      <View style={[styles.mapContainer, { flex: viewMode === "districts" ? 1 : 0.55 }]}>
        {isWeb ? (
          <iframe
            ref={iframeRef as any}
            src={mapBlobUrl || undefined}
            style={{ width: "100%", height: "100%", border: "none", backgroundColor: "#0F1629" }}
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
            <Text style={{ color: "#FFFFFF", textAlign: "center", marginTop: 100 }}>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#0F1629",
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,217,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  instruction: {
    backgroundColor: "rgba(0,217,255,0.1)",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.2)",
  },
  instructionText: {
    fontSize: 12,
    color: "#00D9FF",
    textAlign: "center",
    fontWeight: "500",
  },
  modeIndicator: {
    backgroundColor: "rgba(0,217,255,0.1)",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.2)",
  },
  modeIndicatorText: {
    fontSize: 12,
    color: "#00D9FF",
    textAlign: "center",
    fontWeight: "500",
  },
  mapContainer: {
    marginHorizontal: 0,
    overflow: "hidden",
  },
  webView: {
    flex: 1,
    backgroundColor: "#0F1629",
  },
  // Popover
  popoverContainer: {
    position: "absolute",
    top: 120,
    right: 16,
    zIndex: 1000,
  },
  popover: {
    backgroundColor: "rgba(15, 22, 41, 0.95)",
    borderRadius: 16,
    padding: 14,
    minWidth: 160,
    borderWidth: 2,
  },
  popoverTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  popoverColumns: {
    flexDirection: "row",
  },
  popoverColumnLeft: {
    flex: 1,
    alignItems: "center",
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.15)",
  },
  popoverColumnRight: {
    flex: 2,
    paddingLeft: 10,
  },
  popoverLevelRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  popoverLevelItem: {
    alignItems: "center",
  },
  popoverLevelLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 2,
  },
  popoverLevelValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  popoverCategoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  popoverCategoryText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
  },
  popoverHint: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    marginTop: 10,
    textAlign: "center",
  },
  // Mobile sheet
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  mobileSheet: {
    backgroundColor: "#1a2744",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 2,
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  sheetBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sheetBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F1629",
  },
  sheetStatsColumns: {
    flexDirection: "row",
    marginBottom: 20,
  },
  sheetStatsKG: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.15)",
    paddingRight: 16,
  },
  sheetStatsPriSec: {
    flex: 2,
    paddingLeft: 16,
  },
  sheetStatsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sheetCategoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  sheetCategoryText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
  },
  sheetStatItem: {
    alignItems: "center",
  },
  sheetStatLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
  },
  sheetStatValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sheetButton: {
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: "center",
  },
  sheetButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F1629",
  },
  // Bottom sheet
  bottomSheet: {
    backgroundColor: "rgba(15, 22, 41, 0.98)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  bottomSheetHeader: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  bottomSheetHandle: {
    width: 36,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  bottomSheetTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bottomSheetTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomSheetContent: {
    flex: 1,
  },
  schoolCardsContainer: {
    gap: 0,
  },
  moreText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginTop: 8,
    marginHorizontal: 16,
  },
  // Favorites
  favoritesSection: {
    gap: 8,
  },
  favoritesHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 8,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  favoriteItemSelected: {
    backgroundColor: "rgba(0,217,255,0.1)",
    borderColor: "rgba(0,217,255,0.3)",
  },
  favoriteCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteCheckboxSelected: {
    backgroundColor: "#00D9FF",
    borderColor: "#00D9FF",
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  favoriteMeta: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 2,
  },
  emptyFavorites: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyFavoritesText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    marginTop: 12,
  },
  emptyFavoritesHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    marginTop: 4,
  },
});
