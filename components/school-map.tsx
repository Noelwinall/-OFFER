import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { IconSymbol } from "@/components/ui/icon-symbol";
import type { School, District } from "@/types/school";

interface SchoolMapProps {
  schools: School[];
  selectedDistrict?: District | "all";
  onSchoolSelect?: (school: School) => void;
  height?: number;
}

// 香港中心座標
const HK_CENTER = { lat: 22.3193, lng: 114.1694 };

// 各區中心座標
const DISTRICT_CENTERS: Record<District | "all", { lat: number; lng: number; zoom: number }> = {
  all: { lat: 22.3193, lng: 114.1694, zoom: 11 },
  港島: { lat: 22.2700, lng: 114.1800, zoom: 13 },
  九龍: { lat: 22.3200, lng: 114.1900, zoom: 13 },
  新界: { lat: 22.4200, lng: 114.1200, zoom: 11 },
};

// 學校類型顏色
const CATEGORY_COLORS: Record<string, string> = {
  國際: "#00D9FF",
  直資: "#F59E0B",
  私立: "#8B5CF6",
  資助: "#22C55E",
  公立: "#6B7280",
};

export function SchoolMap({ schools, selectedDistrict = "all", onSchoolSelect, height = 400 }: SchoolMapProps) {
  const webViewRef = useRef<WebView>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // 生成 Leaflet HTML
  const generateMapHTML = () => {
    const center = DISTRICT_CENTERS[selectedDistrict];
    const filteredSchools = selectedDistrict === "all" 
      ? schools 
      : schools.filter(s => s.district === selectedDistrict);

    const markers = filteredSchools.map(school => ({
      id: school.id,
      name: school.name,
      nameEn: school.nameEn,
      lat: school.latitude,
      lng: school.longitude,
      category: school.category,
      level: school.level,
      color: CATEGORY_COLORS[school.category] || "#6B7280",
    }));

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; }
    .custom-marker {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      color: white;
    }
    .leaflet-popup-content-wrapper {
      border-radius: 12px;
      padding: 0;
    }
    .leaflet-popup-content {
      margin: 0;
      min-width: 180px;
    }
    .popup-content {
      padding: 12px;
    }
    .popup-name {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 4px;
    }
    .popup-name-en {
      font-size: 11px;
      color: #666;
      margin-bottom: 8px;
    }
    .popup-tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .popup-tag {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 10px;
      background: #f0f0f0;
      color: #333;
    }
    .popup-btn {
      display: block;
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      background: #00D9FF;
      color: #2D2013;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const markers = ${JSON.stringify(markers)};
    const center = [${center.lat}, ${center.lng}];
    const zoom = ${center.zoom};
    
    const map = L.map('map', {
      zoomControl: false,
      attributionControl: false
    }).setView(center, zoom);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);
    
    // 添加縮放控制到右下角
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    
    // 創建標記
    const markerLayer = L.layerGroup().addTo(map);
    
    markers.forEach(m => {
      const icon = L.divIcon({
        className: 'custom-marker-wrapper',
        html: '<div class="custom-marker" style="background-color: ' + m.color + '">' + 
              m.level.charAt(0) + '</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
      });
      
      const marker = L.marker([m.lat, m.lng], { icon }).addTo(markerLayer);
      
      const popupContent = 
        '<div class="popup-content">' +
          '<div class="popup-name">' + m.name + '</div>' +
          '<div class="popup-name-en">' + m.nameEn + '</div>' +
          '<div class="popup-tags">' +
            '<span class="popup-tag" style="background: ' + m.color + '20; color: ' + m.color + '">' + m.category + '</span>' +
            '<span class="popup-tag">' + m.level + '</span>' +
          '</div>' +
          '<button class="popup-btn" onclick="selectSchool(\\'' + m.id + '\\')">查看詳情</button>' +
        '</div>';
      
      marker.bindPopup(popupContent, {
        closeButton: false,
        maxWidth: 220
      });
    });
    
    function selectSchool(id) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'select', id }));
    }
    
    // 通知 React Native 地圖已準備好
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ready' }));
    
    // 接收來自 React Native 的消息
    window.updateCenter = function(lat, lng, zoom) {
      map.setView([lat, lng], zoom, { animate: true });
    };
  </script>
</body>
</html>
    `;
  };

  // 處理 WebView 消息
  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "ready") {
        setIsMapReady(true);
      } else if (data.type === "select") {
        const school = schools.find(s => s.id === data.id);
        if (school) {
          setSelectedSchool(school);
          onSchoolSelect?.(school);
        }
      }
    } catch (e) {
      console.error("Error parsing WebView message:", e);
    }
  };

  // 當選擇的區域改變時更新地圖中心
  useEffect(() => {
    if (isMapReady && webViewRef.current) {
      const center = DISTRICT_CENTERS[selectedDistrict];
      webViewRef.current.injectJavaScript(`
        window.updateCenter(${center.lat}, ${center.lng}, ${center.zoom});
        true;
      `);
    }
  }, [selectedDistrict, isMapReady]);

  if (Platform.OS === "web") {
    // Web 平台直接使用 iframe
    return (
      <View style={[styles.container, { height }]}>
        <iframe
          srcDoc={generateMapHTML()}
          style={{ width: "100%", height: "100%", border: "none", borderRadius: 16 }}
          title="School Map"
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { height }]}>
      <WebView
        ref={webViewRef}
        source={{ html: generateMapHTML() }}
        style={styles.webview}
        onMessage={handleMessage}
        scrollEnabled={false}
        bounces={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>載入地圖中...</Text>
          </View>
        )}
      />
    </View>
  );
}

// 地圖圖例組件
export function MapLegend() {
  return (
    <View style={styles.legend}>
      <Text style={styles.legendTitle}>學校類型</Text>
      <View style={styles.legendItems}>
        {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
          <View key={category} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: color }]} />
            <Text style={styles.legendText}>{category}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#666",
    fontSize: 14,
  },
  legend: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  legendTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
});
