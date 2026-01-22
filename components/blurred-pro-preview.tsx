import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { calculateMatchScore } from "@/lib/recommendation";
import type { QuizFilters, School } from "@/types/school";
import * as Haptics from "expo-haptics";

interface BlurredProPreviewProps {
  schools: School[];
  filters: QuizFilters;
  onUpgrade: () => void;
  onBack: () => void;
}

export function BlurredProPreview({
  schools,
  filters,
  onUpgrade,
  onBack,
}: BlurredProPreviewProps) {
  const insets = useSafeAreaInsets();

  const handleUpgrade = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onUpgrade();
  };

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onBack();
  };

  // Sample preview content
  const previewSchool = schools[0];
  const previewMatchScore = previewSchool
    ? calculateMatchScore(previewSchool, filters)
    : 0;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>深度报告</Text>
            <View style={styles.proBadgeHeader}>
              <Text style={styles.proBadgeHeaderText}>PRO</Text>
            </View>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Preview Content */}
        <View style={styles.previewContainer}>
          {/* Executive Summary Preview (visible) */}
          <View style={styles.summarySection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="doc.text.fill" size={18} color="#00D9FF" />
              <Text style={styles.sectionTitle}>總體建議</Text>
            </View>
            <Text style={styles.previewText}>
              根據您的需求分析，我們為您篩選了 {schools.length} 所符合條件的學校。
              您的首選應該考慮課程設置、地理位置和學費預算等因素...
            </Text>
          </View>

          {/* First School Preview (partially visible) */}
          {previewSchool && (
            <View style={styles.schoolPreview}>
              <View style={styles.schoolHeader}>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchScore}>{previewMatchScore}%</Text>
                </View>
                <Text style={styles.schoolName} numberOfLines={1}>
                  {previewSchool.name}
                </Text>
              </View>
              <Text style={styles.analysisPreview}>
                這所學校在課程設置和教學環境方面非常符合您的需求。特別是在...
              </Text>
            </View>
          )}

          {/* Blurred Content */}
          <View style={styles.blurredSection}>
            {Platform.OS !== "web" ? (
              <BlurView intensity={20} style={styles.blurView}>
                <View style={styles.blurContent}>
                  {/* Fake content to blur */}
                  {schools.slice(1, 4).map((school, index) => (
                    <View key={school.id} style={styles.fakeCard}>
                      <View style={styles.fakeBadge} />
                      <View style={styles.fakeTitle} />
                      <View style={styles.fakeText} />
                      <View style={styles.fakeTextShort} />
                    </View>
                  ))}

                  {/* Strategy section fake */}
                  <View style={styles.fakeSection}>
                    <View style={styles.fakeSectionTitle} />
                    <View style={styles.fakeText} />
                    <View style={styles.fakeText} />
                  </View>

                  {/* Action plan fake */}
                  <View style={styles.fakeSection}>
                    <View style={styles.fakeSectionTitle} />
                    {[1, 2, 3, 4].map((i) => (
                      <View key={i} style={styles.fakeActionItem}>
                        <View style={styles.fakeActionStep} />
                        <View style={styles.fakeActionText} />
                      </View>
                    ))}
                  </View>
                </View>
              </BlurView>
            ) : (
              <View style={[styles.blurView, styles.webBlur]}>
                <View style={styles.blurContent}>
                  {schools.slice(1, 4).map((school) => (
                    <View key={school.id} style={styles.fakeCard}>
                      <View style={styles.fakeBadge} />
                      <View style={styles.fakeTitle} />
                      <View style={styles.fakeText} />
                      <View style={styles.fakeTextShort} />
                    </View>
                  ))}
                  <View style={styles.fakeSection}>
                    <View style={styles.fakeSectionTitle} />
                    <View style={styles.fakeText} />
                    <View style={styles.fakeText} />
                  </View>
                </View>
              </View>
            )}

            {/* Upgrade Overlay */}
            <View style={styles.upgradeOverlay}>
              <View style={styles.upgradeCard}>
                <View style={styles.lockIcon}>
                  <IconSymbol name="lock.fill" size={32} color="#7C3AED" />
                </View>
                <Text style={styles.upgradeTitle}>解鎖完整報告</Text>
                <Text style={styles.upgradeDescription}>
                  升級至 Pro 會員，獲取完整的個人化分析、申請策略和行動計劃
                </Text>

                <View style={styles.featureList}>
                  <View style={styles.featureItem}>
                    <IconSymbol name="checkmark.circle.fill" size={18} color="#10B981" />
                    <Text style={styles.featureText}>每所學校的深度分析</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="checkmark.circle.fill" size={18} color="#10B981" />
                    <Text style={styles.featureText}>優缺點對比和申請建議</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="checkmark.circle.fill" size={18} color="#10B981" />
                    <Text style={styles.featureText}>申請策略和時間規劃</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <IconSymbol name="checkmark.circle.fill" size={18} color="#10B981" />
                    <Text style={styles.featureText}>具體行動計劃清單</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleUpgrade}
                  style={styles.upgradeButton}
                  activeOpacity={0.85}
                >
                  <LinearGradient
                    colors={["#7C3AED", "#5B21B6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.upgradeButtonGradient}
                  >
                    <IconSymbol name="sparkles" size={18} color="#FFFFFF" />
                    <Text style={styles.upgradeButtonText}>升級至 Pro</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  proBadgeHeader: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  proBadgeHeaderText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  previewContainer: {
    flex: 1,
  },
  summarySection: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "rgba(0,217,255,0.08)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.2)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  previewText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 22,
    fontFamily: "NotoSerifSC-Regular",
  },
  schoolPreview: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  schoolHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  matchBadge: {
    backgroundColor: "rgba(0,217,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchScore: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00D9FF",
  },
  schoolName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    fontFamily: "NotoSerifSC-Regular",
  },
  analysisPreview: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 22,
    fontFamily: "NotoSerifSC-Regular",
  },
  blurredSection: {
    flex: 1,
    marginTop: 16,
    position: "relative",
  },
  blurView: {
    flex: 1,
    overflow: "hidden",
  },
  webBlur: {
    backgroundColor: "rgba(15, 22, 41, 0.8)",
  },
  blurContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    opacity: 0.3,
  },
  fakeCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  fakeBadge: {
    width: 60,
    height: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    marginBottom: 12,
  },
  fakeTitle: {
    width: "70%",
    height: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    marginBottom: 12,
  },
  fakeText: {
    width: "100%",
    height: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 4,
    marginBottom: 8,
  },
  fakeTextShort: {
    width: "60%",
    height: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 4,
  },
  fakeSection: {
    marginTop: 16,
  },
  fakeSectionTitle: {
    width: 120,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    marginBottom: 16,
  },
  fakeActionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  fakeActionStep: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  fakeActionText: {
    flex: 1,
    height: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 4,
  },
  upgradeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  upgradeCard: {
    backgroundColor: "rgba(26, 39, 68, 0.98)",
    borderRadius: 24,
    padding: 28,
    width: "100%",
    maxWidth: 360,
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.3)",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  lockIcon: {
    alignSelf: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(124, 58, 237, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  upgradeTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 10,
  },
  upgradeDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 24,
  },
  featureList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    fontFamily: "NotoSerifSC-Regular",
  },
  upgradeButton: {
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  upgradeButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 10,
  },
  upgradeButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
});
