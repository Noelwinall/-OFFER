/**
 * EnhancedBriefModal Component
 *
 * Modal/sheet that displays enhanced AI analysis for a single school.
 * - Pro users: Generate and display enhanced brief
 * - Free users: Should be redirected to Paywall before this opens
 *
 * Used for per-school on-demand enhanced analysis (not batch generation).
 */

import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
  Animated,
  Dimensions,
} from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { canGenerateEnhanced } from "@/lib/services/briefs";
import type { EnhancedBrief, KGBriefPreferences, UserPlan } from "@/lib/services/briefs";
import { FilterContext } from "@/lib/filter-context";
import { trpc } from "@/lib/trpc";
import * as Haptics from "expo-haptics";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface EnhancedBriefModalProps {
  visible: boolean;
  onClose: () => void;
  schoolId: string;
  schoolName: string;
  userPlan: UserPlan;
  onUpgradePress?: () => void;
}

export function EnhancedBriefModal({
  visible,
  onClose,
  schoolId,
  schoolName,
  userPlan,
  onUpgradePress,
}: EnhancedBriefModalProps) {
  const filterContext = useContext(FilterContext);
  const [brief, setBrief] = useState<EnhancedBrief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT));

  // tRPC mutation for enhanced brief
  const enhancedBriefMutation = trpc.ai.kg.enhancedBrief.useMutation({
    onSuccess: (data) => {
      setBrief(data);
      setError(null);
    },
    onError: (err) => {
      console.error("Enhanced brief error:", err);
      if (err.data?.code === "FORBIDDEN") {
        setError("UPGRADE_REQUIRED");
      } else if (err.data?.code === "NOT_FOUND") {
        setError("School not found");
      } else if (err.data?.code === "TOO_MANY_REQUESTS") {
        setError("RATE_LIMITED");
      } else {
        setError("Failed to generate brief");
      }
    },
  });

  const isLoading = enhancedBriefMutation.isPending;

  // Extract preferences from filter context
  const getPreferences = useCallback((): KGBriefPreferences => {
    if (!filterContext) return {};

    const { state } = filterContext;
    return {
      sessions: state.kgSession.length > 0 ? state.kgSession : undefined,
      curriculumCategory: state.kgCurriculumCategory.length > 0 ? state.kgCurriculumCategory : undefined,
      curriculumType: state.kgCurriculumType.length > 0 ? state.kgCurriculumType : undefined,
      languageEnv: state.kgLanguageEnv.length > 0 ? state.kgLanguageEnv : undefined,
      pedagogy: state.kgPedagogy.length > 0 ? state.kgPedagogy : undefined,
      districts: state.district18.length > 0 ? state.district18 : undefined,
    };
  }, [filterContext]);

  // Generate enhanced brief via tRPC
  const generateBrief = useCallback(async () => {
    setError(null);
    setBrief(null);

    // Check quota first (client-side gate)
    const quota = canGenerateEnhanced(userPlan);
    if (!quota.allowed) {
      setError("UPGRADE_REQUIRED");
      return;
    }

    const preferences = getPreferences();
    enhancedBriefMutation.mutate({
      schoolId,
      preferences: Object.keys(preferences).length > 0 ? preferences : undefined,
      locale: "zh-TW",
    });
  }, [schoolId, userPlan, getPreferences, enhancedBriefMutation]);

  // Animate modal in/out
  useEffect(() => {
    if (visible) {
      generateBrief();
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim, generateBrief]);

  // Handle close
  const handleClose = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onClose();
  };

  // Handle upgrade press
  const handleUpgradePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onClose();
    onUpgradePress?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.proBadge}>
                <IconSymbol name="star.fill" size={10} color="#F59E0B" />
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
              <Text style={styles.headerTitle}>增强版分析</Text>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <IconSymbol name="xmark" size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            {isLoading ? (
              // Loading skeleton
              <View style={styles.skeletonContainer}>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonSection}>
                  <View style={styles.skeletonLine} />
                  <View style={[styles.skeletonLine, styles.skeletonLineLong]} />
                  <View style={styles.skeletonLine} />
                  <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
                </View>
                <View style={styles.skeletonSection}>
                  <View style={styles.skeletonLine} />
                  <View style={[styles.skeletonLine, styles.skeletonLineLong]} />
                </View>
              </View>
            ) : error === "UPGRADE_REQUIRED" ? (
              // Upgrade required (should not happen if flow is correct)
              <View style={styles.upgradeContainer}>
                <View style={styles.upgradeIcon}>
                  <IconSymbol name="lock.fill" size={32} color="#F59E0B" />
                </View>
                <Text style={styles.upgradeTitle}>升級至 Pro</Text>
                <Text style={styles.upgradeText}>
                  增强版分析為 Pro 專屬功能{"\n"}
                  解鎖深度學校分析報告
                </Text>
                <TouchableOpacity
                  style={styles.upgradeButton}
                  onPress={handleUpgradePress}
                  activeOpacity={0.8}
                >
                  <Text style={styles.upgradeButtonText}>了解 Pro</Text>
                </TouchableOpacity>
              </View>
            ) : error === "RATE_LIMITED" ? (
              // Rate limited
              <View style={styles.errorContainer}>
                <IconSymbol name="clock.badge.exclamationmark" size={32} color="#F59E0B" />
                <Text style={styles.errorText}>請求太頻繁，請稍後再試</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={generateBrief}
                >
                  <Text style={styles.retryButtonText}>重試</Text>
                </TouchableOpacity>
              </View>
            ) : error ? (
              // Generic error
              <View style={styles.errorContainer}>
                <IconSymbol name="exclamationmark.circle" size={32} color="#EF4444" />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={generateBrief}
                >
                  <Text style={styles.retryButtonText}>重試</Text>
                </TouchableOpacity>
              </View>
            ) : brief ? (
              // Enhanced brief content
              <View style={styles.briefContainer}>
                {/* School Name / Title */}
                <Text style={styles.briefTitle}>{brief.title}</Text>

                {/* One-liner Summary */}
                {brief.one_liner && (
                  <Text style={styles.oneLiner}>{brief.one_liner}</Text>
                )}

                {/* Grounded Highlights Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <IconSymbol name="checkmark.circle.fill" size={16} color="#10B981" />
                    <Text style={styles.sectionTitle}>分析重點</Text>
                  </View>
                  <View style={styles.bulletList}>
                    {brief.grounded_highlights.map((highlight, i) => (
                      <View key={i} style={styles.bulletItem}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>
                          {typeof highlight === "string" ? highlight : highlight.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Watch Out Section */}
                {brief.watch_out.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <IconSymbol name="exclamationmark.triangle.fill" size={16} color="#F59E0B" />
                      <Text style={styles.sectionTitleWarning}>留意事項</Text>
                    </View>
                    <View style={styles.bulletList}>
                      {brief.watch_out.map((item, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bulletDotWarning}>•</Text>
                          <Text style={styles.bulletTextWarning}>
                            {typeof item === "string" ? item : item.text}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* To Verify Section */}
                {brief.to_verify.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <IconSymbol name="checklist" size={16} color="#3B82F6" />
                      <Text style={styles.sectionTitleVerify}>建議查證</Text>
                    </View>
                    <View style={styles.bulletList}>
                      {brief.to_verify.map((item, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bulletDotVerify}>☐</Text>
                          <Text style={styles.bulletTextVerify}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* Citations placeholder */}
                {brief.citations && brief.citations.length > 0 && (
                  <View style={styles.citationsSection}>
                    <Text style={styles.citationsTitle}>參考資料</Text>
                    {brief.citations.map((citation, i) => (
                      <Text key={i} style={styles.citationText}>
                        {i + 1}. {citation}
                      </Text>
                    ))}
                  </View>
                )}

                {/* Cache indicator */}
                {brief.fromCache && (
                  <View style={styles.cacheIndicator}>
                    <IconSymbol name="clock.arrow.circlepath" size={10} color="rgba(255,255,255,0.3)" />
                    <Text style={styles.cacheText}>已緩存</Text>
                  </View>
                )}

                {/* Disclaimer */}
                <View style={styles.disclaimer}>
                  <IconSymbol name="info.circle" size={12} color="rgba(255,255,255,0.3)" />
                  <Text style={styles.disclaimerText}>
                    以上分析由 AI 根據學校公開資料生成，僅供參考。
                  </Text>
                </View>
              </View>
            ) : null}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    backgroundColor: "#1a2744",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.85,
    minHeight: SCREEN_HEIGHT * 0.5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  proBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#F59E0B",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  // Brief content styles
  briefContainer: {},
  briefTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 8,
    lineHeight: 28,
  },
  oneLiner: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 20,
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#10B981",
    fontFamily: "NotoSerifSC-Regular",
  },
  sectionTitleWarning: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F59E0B",
    fontFamily: "NotoSerifSC-Regular",
  },
  sectionTitleVerify: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3B82F6",
    fontFamily: "NotoSerifSC-Regular",
  },
  bulletList: {
    paddingLeft: 4,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletDot: {
    fontSize: 14,
    color: "#10B981",
    marginRight: 10,
    marginTop: 2,
  },
  bulletDotWarning: {
    fontSize: 14,
    color: "#F59E0B",
    marginRight: 10,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 22,
  },
  bulletTextWarning: {
    flex: 1,
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 22,
  },
  bulletDotVerify: {
    fontSize: 14,
    color: "#3B82F6",
    marginRight: 10,
    marginTop: 2,
  },
  bulletTextVerify: {
    flex: 1,
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 22,
  },
  citationsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  citationsTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.5)",
    marginBottom: 8,
  },
  citationText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    lineHeight: 16,
    marginBottom: 4,
  },
  cacheIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 12,
    opacity: 0.5,
  },
  cacheText: {
    fontSize: 10,
    color: "rgba(255,255,255,0.3)",
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    fontFamily: "NotoSerifSC-Regular",
  },
  // Skeleton styles
  skeletonContainer: {
    opacity: 0.7,
  },
  skeletonTitle: {
    height: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 6,
    marginBottom: 20,
    width: "70%",
  },
  skeletonSection: {
    marginBottom: 20,
  },
  skeletonLine: {
    height: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonLineLong: {
    width: "90%",
  },
  skeletonLineShort: {
    width: "60%",
  },
  // Upgrade styles
  upgradeContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  upgradeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  upgradeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 8,
  },
  upgradeText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  upgradeButton: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  upgradeButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000000",
    fontFamily: "NotoSerifSC-Bold",
  },
  // Error styles
  errorContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 12,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
});
