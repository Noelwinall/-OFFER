import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";
import { DeadlineCard } from "@/components/deadline-card";
import { getApiBaseUrl } from "@/constants/oauth";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";
import type { Level } from "@/types/school";

// Stage filter options
const STAGE_OPTIONS: { label: string; value: Level | null }[] = [
  { label: "全部", value: null },
  { label: "幼稚園", value: "幼稚園" },
  { label: "小學", value: "小學" },
  { label: "中學", value: "中學" },
];

export default function DeadlinesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  // Stage filter
  const [selectedStage, setSelectedStage] = useState<Level | null>(null);

  // Collapsed sections
  const [pendingExpanded, setPendingExpanded] = useState(false);
  const [expiredExpanded, setExpiredExpanded] = useState(false);

  // Fetch deadlines
  const {
    data: deadlinesData,
    isLoading: deadlinesLoading,
    refetch: refetchDeadlines,
    isRefetching,
  } = trpc.deadline.getDeadlines.useQuery(
    {
      stage: selectedStage || undefined,
      includeExpired: true,
      includeUnverified: true,
    },
    {
      enabled: isAuthenticated,
    }
  );

  // Fetch tracked schools for display
  const { data: trackedSchools } = trpc.deadline.getTrackedSchools.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const handleStageSelect = (stage: Level | null) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedStage(stage);
  };

  const handleSchoolPress = (schoolId: string) => {
    router.push(`/school/${schoolId}`);
  };

  const handleRefresh = useCallback(() => {
    refetchDeadlines();
  }, [refetchDeadlines]);

  const handleLoginPress = () => {
    // Redirect to login
    const apiBaseUrl = getApiBaseUrl();
    const loginUrl = `${apiBaseUrl}/api/oauth/login`;
    if (Platform.OS === "web") {
      window.location.href = loginUrl;
    } else {
      router.push("/");
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <LinearGradient colors={[colors.background, colors.surface]} style={styles.container}>
        <View style={[styles.loadingContainer, { paddingTop: insets.top + 60 }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.muted }]}>載入中...</Text>
        </View>
      </LinearGradient>
    );
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return (
      <LinearGradient colors={[colors.background, colors.surface]} style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>截止日期追蹤</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.emptyContainer}>
          <IconSymbol name="lock.fill" size={48} color={colors.muted} />
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>需要登入</Text>
          <Text style={[styles.emptyText, { color: colors.muted }]}>
            登入後即可追蹤學校的重要日期，
            {"\n"}包括申請截止、面試及放榜日期。
          </Text>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handleLoginPress}
          >
            <Text style={styles.loginButtonText}>立即登入</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const hasTrackedSchools = (trackedSchools?.length || 0) > 0;
  const upcoming = deadlinesData?.upcoming || [];
  const pending = deadlinesData?.pending || [];
  const expired = deadlinesData?.expired || [];

  return (
    <LinearGradient colors={[colors.background, colors.surface]} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>截止日期追蹤</Text>
        <View style={styles.headerRight}>
          {hasTrackedSchools && (
            <View style={[styles.countBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.countBadgeText}>{trackedSchools?.length}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Stage Filter Pills */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {STAGE_OPTIONS.map((option) => {
            const isSelected = selectedStage === option.value;
            return (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => handleStageSelect(option.value)}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    { color: isSelected ? "#FAF8F5" : colors.foreground },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <MaxWidthWrapper>
          {/* No tracked schools */}
          {!hasTrackedSchools && (
            <View style={styles.emptyStateCard}>
              <IconSymbol name="bell.badge" size={40} color={colors.muted} />
              <Text style={[styles.emptyStateTitle, { color: colors.foreground }]}>
                尚未追蹤任何學校
              </Text>
              <Text style={[styles.emptyStateText, { color: colors.muted }]}>
                在學校詳情頁面點擊「追蹤日期」按鈕，
                {"\n"}即可在此查看該校的重要日期。
              </Text>
              <TouchableOpacity
                style={[styles.browseButton, { borderColor: colors.primary }]}
                onPress={() => router.push("/(tabs)/search")}
              >
                <Text style={[styles.browseButtonText, { color: colors.primary }]}>
                  瀏覽學校
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Tracked schools summary */}
          {hasTrackedSchools && (
            <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.summaryTitle, { color: colors.foreground }]}>
                正在追蹤 {trackedSchools?.length} 間學校
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.trackedSchoolsRow}>
                  {trackedSchools?.slice(0, 5).map((item) => (
                    <TouchableOpacity
                      key={item.schoolId}
                      style={[styles.trackedSchoolChip, { backgroundColor: colors.border }]}
                      onPress={() => handleSchoolPress(item.schoolId)}
                    >
                      <Text style={[styles.trackedSchoolText, { color: colors.foreground }]} numberOfLines={1}>
                        {item.school?.name || item.schoolId}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {(trackedSchools?.length || 0) > 5 && (
                    <View style={[styles.trackedSchoolChip, { backgroundColor: colors.border }]}>
                      <Text style={[styles.trackedSchoolText, { color: colors.muted }]}>
                        +{(trackedSchools?.length || 0) - 5}
                      </Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Loading state */}
          {deadlinesLoading && hasTrackedSchools && (
            <View style={styles.loadingSection}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={[styles.loadingSectionText, { color: colors.muted }]}>
                載入截止日期...
              </Text>
            </View>
          )}

          {/* Upcoming Events */}
          {!deadlinesLoading && hasTrackedSchools && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                  即將到來
                </Text>
                <View style={[styles.sectionCount, { backgroundColor: colors.primary + "20" }]}>
                  <Text style={[styles.sectionCountText, { color: colors.primary }]}>
                    {upcoming.length}
                  </Text>
                </View>
              </View>

              {upcoming.length === 0 ? (
                <View style={[styles.emptySection, { borderColor: colors.border }]}>
                  <Text style={[styles.emptySectionText, { color: colors.muted }]}>
                    {selectedStage
                      ? `暫無${selectedStage}的即將到來事件`
                      : "暫無即將到來的事件"}
                  </Text>
                </View>
              ) : (
                upcoming.map((deadline) => (
                  <DeadlineCard
                    key={deadline.id}
                    id={deadline.id}
                    schoolName={deadline.school?.name || deadline.schoolNameZh || deadline.schoolNameEn}
                    schoolNameEn={deadline.schoolNameEn}
                    schoolId={deadline.schoolId}
                    eventType={deadline.eventType}
                    startDate={deadline.startDate}
                    endDate={deadline.endDate}
                    notes={deadline.notes}
                    sourceUrl={deadline.sourceUrl}
                    stage={deadline.stage}
                    appLevel={deadline.appLevel}
                    isRolling={deadline.isRolling}
                    status={deadline.status}
                    onSchoolPress={handleSchoolPress}
                  />
                ))
              )}

              {/* Pending Verification Section (Collapsed) */}
              {pending.length > 0 && (
                <View style={styles.collapsibleSection}>
                  <TouchableOpacity
                    style={[styles.collapsibleHeader, { borderColor: colors.border }]}
                    onPress={() => setPendingExpanded(!pendingExpanded)}
                  >
                    <View style={styles.collapsibleHeaderLeft}>
                      <IconSymbol
                        name="exclamationmark.triangle.fill"
                        size={16}
                        color="#F59E0B"
                      />
                      <Text style={[styles.collapsibleTitle, { color: colors.foreground }]}>
                        待核實
                      </Text>
                      <View style={[styles.sectionCount, { backgroundColor: "#F59E0B20" }]}>
                        <Text style={[styles.sectionCountText, { color: "#F59E0B" }]}>
                          {pending.length}
                        </Text>
                      </View>
                    </View>
                    <IconSymbol
                      name={pendingExpanded ? "chevron.up" : "chevron.down"}
                      size={16}
                      color={colors.muted}
                    />
                  </TouchableOpacity>

                  {pendingExpanded && (
                    <View style={styles.collapsibleContent}>
                      {pending.map((deadline) => (
                        <DeadlineCard
                          key={deadline.id}
                          id={deadline.id}
                          schoolName={deadline.school?.name || deadline.schoolNameZh || deadline.schoolNameEn}
                          schoolNameEn={deadline.schoolNameEn}
                          schoolId={deadline.schoolId}
                          eventType={deadline.eventType}
                          startDate={deadline.startDate}
                          endDate={deadline.endDate}
                          notes={deadline.notes}
                          sourceUrl={deadline.sourceUrl}
                          stage={deadline.stage}
                          appLevel={deadline.appLevel}
                          isRolling={deadline.isRolling}
                          status={deadline.status}
                          onSchoolPress={handleSchoolPress}
                        />
                      ))}
                    </View>
                  )}
                </View>
              )}

              {/* Expired Section (Collapsed) */}
              {expired.length > 0 && (
                <View style={styles.collapsibleSection}>
                  <TouchableOpacity
                    style={[styles.collapsibleHeader, { borderColor: colors.border }]}
                    onPress={() => setExpiredExpanded(!expiredExpanded)}
                  >
                    <View style={styles.collapsibleHeaderLeft}>
                      <IconSymbol name="clock.arrow.circlepath" size={16} color={colors.muted} />
                      <Text style={[styles.collapsibleTitle, { color: colors.foreground }]}>
                        已過期
                      </Text>
                      <View style={[styles.sectionCount, { backgroundColor: colors.border }]}>
                        <Text style={[styles.sectionCountText, { color: colors.muted }]}>
                          {expired.length}
                        </Text>
                      </View>
                    </View>
                    <IconSymbol
                      name={expiredExpanded ? "chevron.up" : "chevron.down"}
                      size={16}
                      color={colors.muted}
                    />
                  </TouchableOpacity>

                  {expiredExpanded && (
                    <View style={styles.collapsibleContent}>
                      {expired.map((deadline) => (
                        <DeadlineCard
                          key={deadline.id}
                          id={deadline.id}
                          schoolName={deadline.school?.name || deadline.schoolNameZh || deadline.schoolNameEn}
                          schoolNameEn={deadline.schoolNameEn}
                          schoolId={deadline.schoolId}
                          eventType={deadline.eventType}
                          startDate={deadline.startDate}
                          endDate={deadline.endDate}
                          notes={deadline.notes}
                          sourceUrl={deadline.sourceUrl}
                          stage={deadline.stage}
                          appLevel={deadline.appLevel}
                          isRolling={deadline.isRolling}
                          status={deadline.status}
                          onSchoolPress={handleSchoolPress}
                        />
                      ))}
                    </View>
                  )}
                </View>
              )}
            </>
          )}
        </MaxWidthWrapper>
      </ScrollView>
    </LinearGradient>
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    ...TypographyStyles.title,
  },
  headerRight: {
    width: 40,
    alignItems: "flex-end",
  },
  countBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  countBadgeText: {
    ...TypographyStyles.small,
    fontWeight: "700",
    color: "#FAF8F5",
  },
  filterContainer: {
    paddingBottom: Spacing.md,
  },
  filterScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterPill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadiusPresets.buttonPill,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  filterPillText: {
    ...TypographyStyles.caption,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    ...TypographyStyles.body,
    marginTop: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    ...TypographyStyles.title,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    ...TypographyStyles.body,
    textAlign: "center",
    lineHeight: 24,
  },
  loginButton: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing["2xl"],
    paddingVertical: Spacing.md,
    borderRadius: BorderRadiusPresets.button,
  },
  loginButtonText: {
    ...TypographyStyles.body,
    fontWeight: "700",
    color: "#FAF8F5",
  },
  emptyStateCard: {
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
  },
  emptyStateTitle: {
    ...TypographyStyles.heading,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyStateText: {
    ...TypographyStyles.body,
    textAlign: "center",
    lineHeight: 24,
  },
  browseButton: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadiusPresets.button,
    borderWidth: 1,
  },
  browseButtonText: {
    ...TypographyStyles.body,
    fontWeight: "600",
  },
  summaryCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadiusPresets.card,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  summaryTitle: {
    ...TypographyStyles.caption,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  trackedSchoolsRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  trackedSchoolChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    maxWidth: 120,
  },
  trackedSchoolText: {
    ...TypographyStyles.small,
  },
  loadingSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.xl,
  },
  loadingSectionText: {
    ...TypographyStyles.body,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...TypographyStyles.heading,
  },
  sectionCount: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  sectionCountText: {
    ...TypographyStyles.small,
    fontWeight: "700",
  },
  emptySection: {
    padding: Spacing.xl,
    borderRadius: BorderRadiusPresets.card,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  emptySectionText: {
    ...TypographyStyles.body,
    textAlign: "center",
  },
  collapsibleSection: {
    marginTop: Spacing.xl,
  },
  collapsibleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadiusPresets.card,
    borderWidth: 1,
  },
  collapsibleHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  collapsibleTitle: {
    ...TypographyStyles.body,
    fontWeight: "600",
  },
  collapsibleContent: {
    marginTop: Spacing.md,
  },
});
