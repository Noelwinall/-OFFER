/**
 * 插画风格香港地图 - 使用真实香港18区 GeoJSON 边界数据
 * Illustrated Hong Kong Map with Real GeoJSON Boundaries
 */

import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState, useEffect, useRef } from "react";
import { useColors } from "@/hooks/use-colors";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";
import type { District18 } from "@/types/school";

// 导入真实的香港18区 GeoJSON 数据
import HK_GEOJSON from "@/lib/hk.json";
// 导入香港全境轮廓数据
import HK_OUTLINE from "@/lib/hk-full-area.json";

const isWeb = Platform.OS === "web";

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

// 生成插画风格地图 HTML - 使用真实边界数据
function generateIllustratedMapHTML(): string {
  // 香港全境轮廓数据
  const outlineData = JSON.stringify(HK_OUTLINE);
  
  // 将真实 GeoJSON 数据转换并添加中文名和区域信息
  const geojsonData = JSON.stringify({
    type: "FeatureCollection",
    features: HK_GEOJSON.features.map((feature: any) => ({
      ...feature,
      properties: {
        ...feature.properties,
        nameZh: DISTRICT_EN_TO_ZH[feature.properties.name] || feature.properties.name,
        region: DISTRICT_REGION[DISTRICT_EN_TO_ZH[feature.properties.name] || ""] || "新界",
      }
    }))
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
    .leaflet-container { 
      background: transparent !important; 
    }
    .leaflet-control-zoom { display: none; }
    .leaflet-control-attribution { display: none; }
    .leaflet-tile-pane { display: none !important; }
    
    /* 海洋波浪装饰 */
    .wave-decoration {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.4;
    }
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
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    // 香港全境轮廓数据
    const outlineData = ${outlineData};
    // 内嵌的香港18区GeoJSON数据
    const geojsonData = ${geojsonData};
    
    // 插画风格颜色配置 - 新界绿色加深以提高可读性
    const ILLUSTRATED_COLORS = {
      '新界': { fill: '#7BC89B', fillHover: '#5FB882', stroke: '#2D6A4F' },
      '九龍': { fill: '#DDA0DD', fillHover: '#D8A0D8', stroke: '#8B5A8B' },
      '港島': { fill: '#A8D8EA', fillHover: '#7EC8E3', stroke: '#2E86AB' },
    };

    let selectedDistrict = null;
    const polygonLayers = {};
    const labelLayers = {};
    const districtColors = {};

    // 初始化地图
    const map = L.map('map', {
      center: [22.35, 114.10],
      zoom: 10.5,
      zoomControl: false,
      attributionControl: false,
      minZoom: 9,
      maxZoom: 14,
    });

    function postToParent(data) {
      const msg = JSON.stringify(data);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(msg);
      } else {
        window.parent.postMessage(msg, '*');
      }
    }

    // 直接使用内嵌的GeoJSON数据渲染地图
    function renderMap() {
      // 不再绘制香港全境轮廓底图（直接用各区填充即可）
      // 删除了大陆草图和香港底图层
      
      // 第二步：绘制各区（带边界线）
      geojsonData.features.forEach(feature => {
        const districtName = feature.properties.nameZh; // 使用中文名
        const region = feature.properties.region;
        const colors = ILLUSTRATED_COLORS[region];
        districtColors[districtName] = colors;
        
        // 转换坐标: GeoJSON [lng, lat] -> Leaflet [lat, lng]
        let coordinates;
        if (feature.geometry.type === 'Polygon') {
          coordinates = feature.geometry.coordinates[0].map(c => [c[1], c[0]]);
        } else if (feature.geometry.type === 'MultiPolygon') {
          coordinates = feature.geometry.coordinates.map(poly => 
            poly[0].map(c => [c[1], c[0]])
          );
        }
        
        // 创建多边形
        const polygon = L.polygon(coordinates, {
          color: colors.stroke,
          weight: 2,
          opacity: 1,
          fillColor: colors.fill,
          fillOpacity: 0.9,
          lineJoin: 'round',
          lineCap: 'round',
        }).addTo(map);
        
        polygonLayers[districtName] = polygon;
        
        // 计算中心点
        const bounds = polygon.getBounds();
        const center = bounds.getCenter();
        
        // 添加标签
        const label = L.divIcon({
          className: 'district-label',
          html: '<span style="color:' + colors.stroke + '">' + districtName.replace('區', '') + '</span>',
          iconSize: null,
        });
        const labelMarker = L.marker(center, { icon: label, interactive: false, zIndexOffset: 1000 }).addTo(map);
        labelLayers[districtName] = labelMarker;
        
        // 添加交互事件
        polygon.on('mouseover', function() {
          if (selectedDistrict !== districtName) {
            this.setStyle({ fillColor: colors.fillHover, fillOpacity: 0.95, weight: 3.5 });
          }
          postToParent({ type: 'hover', district: districtName, region: region });
        });
        
        polygon.on('mouseout', function() {
          if (selectedDistrict !== districtName) {
            this.setStyle({ fillColor: colors.fill, fillOpacity: 0.85, weight: 2.5 });
          }
          postToParent({ type: 'hoverEnd' });
        });
        
        polygon.on('click', function() {
          // 重置之前选中的
          if (selectedDistrict && polygonLayers[selectedDistrict]) {
            const prevColors = districtColors[selectedDistrict];
            polygonLayers[selectedDistrict].setStyle({ 
              fillColor: prevColors.fill, fillOpacity: 0.85, weight: 2.5 
            });
          }
          
          if (selectedDistrict === districtName) {
            selectedDistrict = null;
            postToParent({ type: 'deselect', district: districtName });
          } else {
            selectedDistrict = districtName;
            this.setStyle({ fillColor: colors.stroke, fillOpacity: 0.9, weight: 4 });
            postToParent({ type: 'select', district: districtName, region: region });
          }
        });
      });
      
      // 调整视图
      const allPolygons = Object.values(polygonLayers);
      if (allPolygons.length > 0) {
        const group = L.featureGroup(allPolygons);
        map.fitBounds(group.getBounds().pad(0.08));
      }
      
      // 添加海洋波浪装饰
      const waveOverlay = L.control({ position: 'topleft' });
      waveOverlay.onAdd = function() {
        const div = L.DomUtil.create('div');
        div.className = 'wave-decoration';
        div.innerHTML = \`
          <svg width="100%" height="100%" style="position:fixed;top:0;left:0;pointer-events:none;opacity:0.15;">
            <defs>
              <pattern id="wave" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q15 5, 30 10 T60 10" stroke="#fff" stroke-width="1.5" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave)"/>
          </svg>
        \`;
        return div;
      };
      waveOverlay.addTo(map);
      
      // 添加标题
      const titleDiv = L.control({ position: 'topleft' });
      titleDiv.onAdd = function() {
        const div = L.DomUtil.create('div');
        div.innerHTML = '<div style="background:rgba(255,255,255,0.95);padding:10px 16px;border-radius:10px;font-weight:bold;font-size:14px;color:#2D5A4F;box-shadow:0 3px 12px rgba(0,0,0,0.12);margin:12px;border:1px solid rgba(45,90,79,0.1);">🗺️ 香港十八區地圖</div>';
        return div;
      };
      titleDiv.addTo(map);
      
      // 添加图例
      const legendDiv = L.control({ position: 'bottomleft' });
      legendDiv.onAdd = function() {
        const div = L.DomUtil.create('div');
        div.innerHTML = \`
          <div style="background:rgba(255,255,255,0.95);padding:12px 16px;border-radius:10px;font-size:12px;box-shadow:0 3px 12px rgba(0,0,0,0.12);margin:12px;border:1px solid rgba(45,90,79,0.1);">
            <div style="font-weight:700;color:#2D5A4F;margin-bottom:8px;font-size:11px;">區域圖例</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <div style="display:flex;align-items:center;gap:6px;">
                <div style="width:16px;height:16px;background:#98D8AA;border:2px solid #2D6A4F;border-radius:3px;"></div>
                <span style="color:#2D6A4F;font-weight:600;">新界 New Territories</span>
              </div>
              <div style="display:flex;align-items:center;gap:6px;">
                <div style="width:16px;height:16px;background:#DDA0DD;border:2px solid #8B5A8B;border-radius:3px;"></div>
                <span style="color:#8B5A8B;font-weight:600;">九龍 Kowloon</span>
              </div>
              <div style="display:flex;align-items:center;gap:6px;">
                <div style="width:16px;height:16px;background:#A8D8EA;border:2px solid #2E86AB;border-radius:3px;"></div>
                <span style="color:#2E86AB;font-weight:600;">港島 Hong Kong Island</span>
              </div>
            </div>
          </div>
        \`;
        return div;
      };
      legendDiv.addTo(map);
      
      // 添加指南针装饰
      const compassDiv = L.control({ position: 'bottomright' });
      compassDiv.onAdd = function() {
        const div = L.DomUtil.create('div');
        div.innerHTML = \`
          <div style="background:rgba(255,255,255,0.9);width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.1);margin:12px;border:2px solid rgba(45,90,79,0.2);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 9H9.5L12 2Z" fill="#C44536"/>
              <path d="M12 22L9.5 15H14.5L12 22Z" fill="#2D5A4F"/>
              <circle cx="12" cy="12" r="2" fill="#2D5A4F"/>
              <text x="12" y="7" text-anchor="middle" font-size="5" font-weight="bold" fill="#C44536">N</text>
            </svg>
          </div>
        \`;
        return div;
      };
      compassDiv.addTo(map);
    }

    // 立即渲染地图
    renderMap();
  </script>
</body>
</html>
`;
}

export default function IllustratedMapScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mapBlobUrl, setMapBlobUrl] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District18 | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<District18 | null>(null);

  // 生成地图 HTML
  const mapHTML = generateIllustratedMapHTML();

  // Web 平台：创建 blob URL
  useEffect(() => {
    if (isWeb) {
      const blob = new Blob([mapHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setMapBlobUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [mapHTML]);

  // 处理来自地图的消息
  useEffect(() => {
    if (!isWeb) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "select") {
          setSelectedDistrict(data.district);
        } else if (data.type === "deselect") {
          setSelectedDistrict(null);
        } else if (data.type === "hover") {
          setHoveredDistrict(data.district);
        } else if (data.type === "hoverEnd") {
          setHoveredDistrict(null);
        }
      } catch (e) {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleViewSchools = () => {
    if (selectedDistrict) {
      router.push({
        pathname: "/(tabs)/search",
        params: { district: selectedDistrict },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm, backgroundColor: colors.background }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: colors.surface }]}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          插画风格地图
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {isWeb && mapBlobUrl && (
          <iframe
            ref={iframeRef}
            src={mapBlobUrl}
            style={{ 
              width: "100%", 
              height: "100%", 
              border: "none",
              borderRadius: 12,
            }}
          />
        )}
      </View>

      {/* Selected District Info */}
      {selectedDistrict && (
        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.infoHeader}>
            <Text style={[styles.infoLabel, { color: colors.muted }]}>已選擇地區</Text>
            <Text style={[styles.infoTitle, { color: colors.foreground }]}>{selectedDistrict}</Text>
          </View>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={handleViewSchools}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>查看學校列表</Text>
            <IconSymbol name="arrow.right" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Hover Info (Web only) */}
      {hoveredDistrict && !selectedDistrict && (
        <View style={[styles.hoverCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.hoverText, { color: colors.foreground }]}>
            {hoveredDistrict} - 點擊查看詳情
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    ...TypographyStyles.heading,
    fontSize: 18,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  infoCard: {
    position: "absolute",
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoHeader: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "NotoSerifSC-Bold",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  hoverCard: {
    position: "absolute",
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
  },
  hoverText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
