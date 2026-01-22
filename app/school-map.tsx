import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, Platform, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState, useMemo, useEffect, useCallback, useContext, useRef } from "react";
import { SCHOOLS } from "@/data/schools";
import type { School, District18 } from "@/types/school";
import { DISTRICT_MAP_DATA, calculateAllDistrictStats, REGION_COLORS, type DistrictStats, type DistrictMapInfo } from "@/lib/district-map-data";
import { DISTRICT_POLYGONS } from "@/lib/district-polygons";
import { MapSetStorage } from "@/lib/storage";
import { FilterContext } from "@/lib/filter-context";

// Conditionally import WebView only for native platforms
let WebView: any = null;
if (Platform.OS !== "web") {
  WebView = require("react-native-webview").WebView;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

// Category display order and colors
const CATEGORY_ORDER: Array<{ key: string; label: string; color: string }> = [
  { key: "公立", label: "公立", color: "#6B7280" },
  { key: "資助", label: "資助", color: "#22C55E" },
  { key: "直資", label: "直資", color: "#F59E0B" },
  { key: "私立", label: "私立", color: "#8B5CF6" },
  { key: "國際", label: "國際", color: "#00D9FF" },
];

// Generate Leaflet HTML for the map
function generateMapHTML(
  districtPolygons: typeof DISTRICT_POLYGONS,
  districtMapData: typeof DISTRICT_MAP_DATA,
  districtStats: Map<District18, DistrictStats>
): string {
  // Build polygon data with colors and stats
  const polygonData = districtPolygons.map((polygon) => {
    const info = districtMapData.find((d) => d.id === polygon.id);
    const stats = districtStats.get(polygon.id);
    return {
      id: polygon.id,
      coordinates: polygon.coordinates.map(([lng, lat]) => [lat, lng]), // Leaflet uses [lat, lng]
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
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const polygonData = ${JSON.stringify(polygonData)};

    // Initialize map centered on Hong Kong
    const map = L.map('map', {
      center: [22.35, 114.15],
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
      minZoom: 10,
      maxZoom: 14,
    });

    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Track selected/hovered district
    let selectedDistrict = null;
    let hoveredDistrict = null;
    const polygonLayers = {};

    // Create polygon for each district
    polygonData.forEach(district => {
      const polygon = L.polygon(district.coordinates, {
        color: district.color,
        weight: 2,
        opacity: 0.8,
        fillColor: district.color,
        fillOpacity: 0.25,
      }).addTo(map);

      polygonLayers[district.id] = polygon;

      // Add label at center
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

      L.marker(center, { icon: label, interactive: false }).addTo(map);

      // Helper to post message to parent (works for both iframe and WebView)
      function postToParent(data) {
        const msg = JSON.stringify(data);
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(msg);
        } else {
          window.parent.postMessage(msg, '*');
        }
      }

      // Mouse events
      polygon.on('mouseover', function() {
        if (selectedDistrict !== district.id) {
          this.setStyle({ fillOpacity: 0.45, weight: 3 });
        }
        hoveredDistrict = district.id;
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
        if (selectedDistrict !== district.id) {
          this.setStyle({ fillOpacity: 0.25, weight: 2 });
        }
        hoveredDistrict = null;
        postToParent({ type: 'hoverEnd' });
      });

      polygon.on('click', function() {
        // Reset previous selection
        if (selectedDistrict && polygonLayers[selectedDistrict]) {
          polygonLayers[selectedDistrict].setStyle({ fillOpacity: 0.25, weight: 2 });
        }

        if (selectedDistrict === district.id) {
          // Second tap - open filters
          postToParent({
            type: 'select',
            district: district.id
          });
          selectedDistrict = null;
        } else {
          // First tap - highlight
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

  // Selected district state (for mobile tap interaction)
  const [selectedDistrict, setSelectedDistrict] = useState<District18 | null>(null);
  const [selectedStats, setSelectedStats] = useState<DistrictStats | null>(null);
  // Hovered district (for web hover interaction)
  const [hoveredDistrict, setHoveredDistrict] = useState<District18 | null>(null);
  const [hoveredStats, setHoveredStats] = useState<DistrictStats | null>(null);
  // Mobile bottom sheet visibility
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  // Last results for bottom panel
  const [lastQAIds, setLastQAIds] = useState<string[]>([]);
  const [lastFilterIds, setLastFilterIds] = useState<string[]>([]);
  // Show bottom panel
  const [showBottomPanel, setShowBottomPanel] = useState(false);

  // Calculate all district stats on mount
  const districtStats = useMemo(() => calculateAllDistrictStats(SCHOOLS), []);

  // Generate map HTML
  const mapHTML = useMemo(
    () => generateMapHTML(DISTRICT_POLYGONS, DISTRICT_MAP_DATA, districtStats),
    [districtStats]
  );

  // Generate blob URL for iframe on web
  const mapBlobUrl = useMemo(() => {
    if (!isWeb) return null;
    const blob = new Blob([mapHTML], { type: "text/html" });
    return URL.createObjectURL(blob);
  }, [mapHTML]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (mapBlobUrl) {
        URL.revokeObjectURL(mapBlobUrl);
      }
    };
  }, [mapBlobUrl]);

  // Load last results on mount
  useEffect(() => {
    loadLastResults();
  }, []);

  const loadLastResults = async () => {
    const [qaResult, filterResult] = await Promise.all([
      MapSetStorage.getQAResult(),
      MapSetStorage.getFiltersResult(),
    ]);
    setLastQAIds(qaResult.ids);
    setLastFilterIds(filterResult.ids);
  };

  // Get schools from IDs
  const getSchoolsFromIds = useCallback((ids: string[], limit: number = 5): School[] => {
    const schoolMap = new Map(SCHOOLS.map((s) => [s.id, s]));
    return ids
      .map((id) => schoolMap.get(id))
      .filter((s): s is School => s !== undefined)
      .slice(0, limit);
  }, []);

  const lastQASchools = useMemo(() => getSchoolsFromIds(lastQAIds, 5), [lastQAIds, getSchoolsFromIds]);
  const lastFilterSchools = useMemo(() => getSchoolsFromIds(lastFilterIds, 5), [lastFilterIds, getSchoolsFromIds]);

  // Handle map messages (shared logic for both WebView and iframe)
  const handleMapMessage = useCallback((data: any) => {
    if (data.type === "hover") {
      setHoveredDistrict(data.district);
      setHoveredStats(data.stats);
    } else if (data.type === "hoverEnd") {
      setHoveredDistrict(null);
      setHoveredStats(null);
    } else if (data.type === "tap") {
      // Mobile: first tap shows sheet
      setSelectedDistrict(data.district);
      setSelectedStats(data.stats);
      setShowMobileSheet(true);
    } else if (data.type === "select") {
      // Web: direct click or Mobile: second tap
      openFiltersWithDistrict(data.district);
    }
  }, []);

  // Handle WebView messages (native)
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      handleMapMessage(data);
    } catch (e) {
      // Ignore parse errors
    }
  };

  // Listen for iframe messages on web
  useEffect(() => {
    if (!isWeb) return;

    const handleWindowMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data.type) {
          handleMapMessage(data);
        }
      } catch (e) {
        // Ignore parse errors
      }
    };

    window.addEventListener("message", handleWindowMessage);
    return () => window.removeEventListener("message", handleWindowMessage);
  }, [handleMapMessage]);

  // Open filters with district pre-selected
  const openFiltersWithDistrict = (district: District18) => {
    // Set district in filter context
    if (filterContext) {
      filterContext.dispatch({ type: "CLEAR_DISTRICT18" });
      filterContext.dispatch({ type: "TOGGLE_DISTRICT18", payload: district });
    }
    // Navigate to search with filter sheet
    router.push({
      pathname: "/(tabs)/search",
      params: { openFilter: "true", lockedDistrict: district },
    } as any);
  };

  // Navigate to Q&A
  const handleGoToQA = () => {
    router.push("/quiz" as any);
  };

  // Navigate to filters
  const handleGoToFilters = () => {
    router.push("/(tabs)/search" as any);
  };

  // Render stats popover (web hover)
  const renderStatsPopover = () => {
    if (!hoveredDistrict || !hoveredStats) return null;

    const districtInfo = DISTRICT_MAP_DATA.find((d) => d.id === hoveredDistrict);
    if (!districtInfo) return null;

    return (
      <View style={styles.popoverContainer}>
        <View style={[styles.popover, { borderColor: districtInfo.color }]}>
          <Text style={[styles.popoverTitle, { color: districtInfo.color }]}>
            {districtInfo.name}
          </Text>

          {/* Two column layout: KG (1/3) on left, Primary+Secondary (2/3) with breakdown on right */}
          <View style={styles.popoverColumns}>
            {/* Left: Kindergarten only (1/3) */}
            <View style={styles.popoverColumnLeft}>
              <Text style={styles.popoverLevelLabel}>幼稚園</Text>
              <Text style={styles.popoverLevelValue}>{hoveredStats.kindergarten}</Text>
            </View>

            {/* Right: Primary + Secondary with category breakdown (2/3) */}
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
              <View style={styles.popoverDivider} />
              <Text style={styles.popoverCategoryStat}>公立：{hoveredStats.byCategory?.["公立"] || 0}　資助：{hoveredStats.byCategory?.["資助"] || 0}　直資：{hoveredStats.byCategory?.["直資"] || 0}</Text>
              <Text style={styles.popoverCategoryStat}>私立：{hoveredStats.byCategory?.["私立"] || 0}　國際：{hoveredStats.byCategory?.["國際"] || 0}</Text>
            </View>
          </View>

          <Text style={styles.popoverHint}>點擊以篩選</Text>
        </View>
      </View>
    );
  };

  // Render mobile bottom sheet
  const renderMobileSheet = () => {
    if (!showMobileSheet || !selectedDistrict || !selectedStats) return null;

    const districtInfo = DISTRICT_MAP_DATA.find((d) => d.id === selectedDistrict);
    if (!districtInfo) return null;

    return (
      <Modal
        visible={showMobileSheet}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowMobileSheet(false);
          setSelectedDistrict(null);
        }}
      >
        <Pressable
          style={styles.sheetOverlay}
          onPress={() => {
            setShowMobileSheet(false);
            setSelectedDistrict(null);
          }}
        >
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

            {/* Two column layout: KG (1/3) on left, Primary+Secondary (2/3) with breakdown on right */}
            <View style={styles.sheetTwoColumns}>
              {/* Left: Kindergarten only (1/3) */}
              <View style={styles.sheetColumnLeft}>
                <Text style={styles.sheetLevelLabel}>幼稚園</Text>
                <Text style={styles.sheetLevelValue}>{selectedStats.kindergarten}</Text>
              </View>

              {/* Right: Primary + Secondary with category breakdown (2/3) */}
              <View style={styles.sheetColumnRight}>
                <View style={styles.sheetLevelRow}>
                  <View style={styles.sheetLevelItem}>
                    <Text style={styles.sheetLevelLabel}>小學</Text>
                    <Text style={styles.sheetLevelValue}>{selectedStats.primary}</Text>
                  </View>
                  <View style={styles.sheetLevelItem}>
                    <Text style={styles.sheetLevelLabel}>中學</Text>
                    <Text style={styles.sheetLevelValue}>{selectedStats.secondary}</Text>
                  </View>
                </View>

                <View style={styles.sheetCategoryGrid}>
                  {CATEGORY_ORDER.map((cat) => (
                    <View key={cat.key} style={styles.sheetCategoryItem}>
                      <View style={[styles.sheetCategoryDot, { backgroundColor: cat.color }]} />
                      <Text style={styles.sheetCategoryLabel}>{cat.label}</Text>
                      <Text style={styles.sheetCategoryCount}>
                        {selectedStats.byCategory?.[cat.key as keyof typeof selectedStats.byCategory] || 0}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.sheetButton, { backgroundColor: districtInfo.color }]}
              onPress={() => {
                setShowMobileSheet(false);
                openFiltersWithDistrict(selectedDistrict);
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.sheetButtonText}>篩選此區學校</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    );
  };

  // Render bottom split panel
  const renderBottomPanel = () => (
    <View style={[styles.bottomPanel, { paddingBottom: insets.bottom + 12 }]}>
      <TouchableOpacity
        style={styles.bottomPanelHeader}
        onPress={() => setShowBottomPanel(!showBottomPanel)}
        activeOpacity={0.7}
      >
        <Text style={styles.bottomPanelTitle}>上次結果</Text>
        <IconSymbol
          name={showBottomPanel ? "chevron.down" : "chevron.up"}
          size={18}
          color="rgba(255,255,255,0.6)"
        />
      </TouchableOpacity>

      {showBottomPanel && (
        <View style={styles.bottomPanelContent}>
          {/* Left column: Q&A results */}
          <View style={styles.bottomPanelColumn}>
            <Text style={styles.columnTitle}>上次 Q&A 結果</Text>
            {lastQASchools.length > 0 ? (
              <>
                {lastQASchools.map((school) => (
                  <TouchableOpacity
                    key={school.id}
                    style={styles.miniSchoolItem}
                    onPress={() => router.push(`/school/${school.id}` as any)}
                  >
                    <Text style={styles.miniSchoolName} numberOfLines={1}>
                      {school.name}
                    </Text>
                  </TouchableOpacity>
                ))}
                {lastQAIds.length > 5 && (
                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={() => router.push("/recommendation" as any)}
                  >
                    <Text style={styles.viewAllText}>查看全部 {lastQAIds.length} 所 →</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View style={styles.emptyColumn}>
                <Text style={styles.emptyText}>未有結果</Text>
                <TouchableOpacity style={styles.columnCTA} onPress={handleGoToQA}>
                  <Text style={styles.columnCTAText}>去問答選校</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Right column: Filters results */}
          <View style={styles.bottomPanelColumn}>
            <Text style={styles.columnTitle}>上次篩選結果</Text>
            {lastFilterSchools.length > 0 ? (
              <>
                {lastFilterSchools.map((school) => (
                  <TouchableOpacity
                    key={school.id}
                    style={styles.miniSchoolItem}
                    onPress={() => router.push(`/school/${school.id}` as any)}
                  >
                    <Text style={styles.miniSchoolName} numberOfLines={1}>
                      {school.name}
                    </Text>
                  </TouchableOpacity>
                ))}
                {lastFilterIds.length > 5 && (
                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={handleGoToFilters}
                  >
                    <Text style={styles.viewAllText}>查看全部 {lastFilterIds.length} 所 →</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View style={styles.emptyColumn}>
                <Text style={styles.emptyText}>未有結果</Text>
                <TouchableOpacity style={styles.columnCTA} onPress={handleGoToFilters}>
                  <Text style={styles.columnCTAText}>去條件篩選學校</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#0F1629" }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.right" size={24} color="#FFFFFF" style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>選擇地區</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Instruction */}
      <View style={styles.instruction}>
        <Text style={styles.instructionText}>
          {isWeb ? "懸停查看統計，點擊進入篩選" : "點擊地區查看詳情，再點一次進入篩選"}
        </Text>
      </View>

      {/* Map - iframe for web, WebView for native */}
      <View style={styles.mapContainer}>
        {isWeb ? (
          <iframe
            ref={iframeRef as any}
            src={mapBlobUrl || undefined}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              backgroundColor: "#0F1629",
            }}
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

      {/* Mobile bottom sheet */}
      {renderMobileSheet()}

      {/* Bottom panel */}
      {renderBottomPanel()}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  instruction: {
    backgroundColor: "rgba(0,217,255,0.1)",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.2)",
  },
  instructionText: {
    fontSize: 13,
    color: "#00D9FF",
    textAlign: "center",
    fontWeight: "500",
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 0,
    overflow: "hidden",
  },
  webView: {
    flex: 1,
    backgroundColor: "#0F1629",
  },
  // Popover styles (web)
  popoverContainer: {
    position: "absolute",
    top: 140,
    right: 20,
    zIndex: 1000,
  },
  popover: {
    backgroundColor: "rgba(15, 22, 41, 0.95)",
    borderRadius: 16,
    padding: 16,
    minWidth: 180,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  popoverTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  popoverStat: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 6,
    fontWeight: "500",
  },
  popoverColumns: {
    flexDirection: "row",
  },
  popoverColumnLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.15)",
  },
  popoverColumnRight: {
    flex: 2,
    paddingLeft: 12,
  },
  popoverLevelRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  popoverLevelItem: {
    alignItems: "center",
  },
  popoverLevelLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 2,
  },
  popoverLevelValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  popoverCategoryStat: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 2,
    textAlign: "center",
  },
  popoverDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 6,
  },
  popoverHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    marginTop: 12,
    textAlign: "center",
  },
  // Mobile sheet styles
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
    paddingBottom: 40,
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
    paddingBottom: 16,
    borderBottomWidth: 2,
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  sheetBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sheetBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F1629",
  },
  sheetTwoColumns: {
    flexDirection: "row",
    marginBottom: 20,
  },
  sheetColumnLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.15)",
  },
  sheetColumnRight: {
    flex: 2,
    paddingLeft: 16,
  },
  sheetLevelRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  sheetLevelItem: {
    alignItems: "center",
  },
  sheetLevelLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
  },
  sheetLevelValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sheetStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  sheetStatRow: {
    alignItems: "center",
  },
  sheetStatLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
  },
  sheetStatValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sheetCategoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center",
  },
  sheetCategoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
  },
  sheetCategoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sheetCategoryLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  sheetCategoryCount: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
  },
  sheetButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  sheetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1629",
  },
  // Bottom panel styles
  bottomPanel: {
    backgroundColor: "rgba(15, 22, 41, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  bottomPanelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  bottomPanelTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomPanelContent: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 8,
  },
  bottomPanelColumn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 12,
  },
  columnTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
    marginBottom: 10,
  },
  miniSchoolItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  miniSchoolName: {
    fontSize: 13,
    color: "#FFFFFF",
  },
  viewAllButton: {
    paddingTop: 10,
  },
  viewAllText: {
    fontSize: 12,
    color: "#00D9FF",
    fontWeight: "500",
  },
  emptyColumn: {
    alignItems: "center",
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 12,
  },
  columnCTA: {
    backgroundColor: "rgba(0,217,255,0.15)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.3)",
  },
  columnCTAText: {
    fontSize: 13,
    color: "#00D9FF",
    fontWeight: "600",
  },
});
