import React from "react";
import { View, Text, Pressable, StyleSheet, Platform, Linking } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Spacing } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";
import type { Level } from "@/types/school";

/**
 * Event type configuration with colors and icons
 */
const EVENT_TYPE_CONFIG: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  application_open: { label: "申請開放", color: "#10B981", icon: "📝" },
  application_close: { label: "申請截止", color: "#EF4444", icon: "⏰" },
  application_window: { label: "申請期間", color: "#F59E0B", icon: "📆" },
  deadline: { label: "截止日期", color: "#EF4444", icon: "⏰" },
  info_session: { label: "簡介會", color: "#7C3AED", icon: "📢" },
  interview: { label: "面試", color: "#F59E0B", icon: "🎤" },
  interview_window: { label: "面試期間", color: "#F59E0B", icon: "🎤" },
  interview_dates: { label: "面試日期", color: "#F59E0B", icon: "🎤" },
  interview_arrangement_release: { label: "面試安排公佈", color: "#06B6D4", icon: "📋" },
  results_release: { label: "放榜", color: "#00D9FF", icon: "📋" },
  results_release_latest: { label: "最遲放榜", color: "#00D9FF", icon: "📋" },
  result: { label: "放榜", color: "#00D9FF", icon: "📋" },
  registration_round1: { label: "第一輪註冊", color: "#8B5CF6", icon: "✍️" },
  registration_round2: { label: "第二輪註冊", color: "#8B5CF6", icon: "✍️" },
  centralized_registration: { label: "統一註冊", color: "#8B5CF6", icon: "✍️" },
  waitlist_reply: { label: "候補回覆", color: "#F97316", icon: "📩" },
  modify_data_window: { label: "資料修改期", color: "#6B7280", icon: "✏️" },
  rolling_admissions: { label: "全年收生", color: "#10B981", icon: "🔄" },
  rolling_applications: { label: "滾動申請", color: "#10B981", icon: "🔄" },
  admissions_page: { label: "招生資訊", color: "#6B7280", icon: "ℹ️" },
  admissions_portal: { label: "申請入口", color: "#6B7280", icon: "🔗" },
  admissions_notice: { label: "招生通知", color: "#6B7280", icon: "📢" },
  application_status: { label: "申請狀態", color: "#6B7280", icon: "ℹ️" },
  application_window_note: { label: "申請備註", color: "#6B7280", icon: "📝" },
  application_deadline_note: { label: "截止備註", color: "#6B7280", icon: "📝" },
  unknown: { label: "其他", color: "#6B7280", icon: "📌" },
};

interface DeadlineCardProps {
  id: number;
  schoolName: string;
  schoolNameEn?: string;
  schoolId?: string | null;
  eventType: string;
  startDate?: string | null;
  endDate?: string | null;
  notes?: string | null;
  sourceUrl?: string | null;
  stage?: string | null;
  appLevel?: Level | null;
  isRolling?: boolean;
  status?: "ok" | "needs_manual" | "fetch_error";
  onSchoolPress?: (schoolId: string) => void;
}

/**
 * Format date for display
 */
function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr + "T00:00:00");
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  } catch {
    return dateStr;
  }
}

/**
 * Format date range for display
 */
function formatDateRange(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  isRolling?: boolean
): string {
  if (isRolling) return "全年接受申請";
  if (!startDate && !endDate) return "日期待定";
  if (startDate === endDate || !endDate) return formatDate(startDate);
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export const DeadlineCard = React.memo(function DeadlineCard({
  id,
  schoolName,
  schoolNameEn,
  schoolId,
  eventType,
  startDate,
  endDate,
  notes,
  sourceUrl,
  stage,
  appLevel,
  isRolling,
  status = "ok",
  onSchoolPress,
}: DeadlineCardProps) {
  const colors = useColors();
  const router = useRouter();

  const config = EVENT_TYPE_CONFIG[eventType] || EVENT_TYPE_CONFIG.unknown;

  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (schoolId && onSchoolPress) {
      onSchoolPress(schoolId);
    } else if (schoolId) {
      router.push(`/school/${schoolId}`);
    }
  };

  const handleSourcePress = () => {
    if (sourceUrl) {
      Linking.openURL(sourceUrl);
    }
  };

  const isUnverified = status !== "ok";

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: isUnverified ? "#F59E0B" : colors.border,
          borderWidth: isUnverified ? 1.5 : 1,
        },
        pressed && styles.cardPressed,
      ]}
    >
      {/* Header: Event type badge + Date */}
      <View style={styles.header}>
        <View
          style={[styles.typeBadge, { backgroundColor: config.color + "20" }]}
        >
          <Text style={styles.typeIcon}>{config.icon}</Text>
          <Text style={[styles.typeLabel, { color: config.color }]}>
            {config.label}
          </Text>
        </View>
        <Text style={[styles.date, { color: colors.muted }]}>
          {formatDateRange(startDate, endDate, isRolling)}
        </Text>
      </View>

      {/* School name */}
      <Text style={[styles.schoolName, { color: colors.foreground }]}>
        {schoolName}
      </Text>
      {schoolNameEn && (
        <Text style={[styles.schoolNameEn, { color: colors.muted }]}>
          {schoolNameEn}
        </Text>
      )}

      {/* Stage tag */}
      {(stage || appLevel) && (
        <View style={styles.tagRow}>
          <View style={[styles.tag, { backgroundColor: colors.border }]}>
            <Text style={[styles.tagText, { color: colors.muted }]}>
              {appLevel || stage}
            </Text>
          </View>
        </View>
      )}

      {/* Notes */}
      {notes && (
        <Text
          style={[styles.notes, { color: colors.muted }]}
          numberOfLines={2}
        >
          {notes}
        </Text>
      )}

      {/* Unverified warning */}
      {isUnverified && (
        <View style={styles.warningRow}>
          <IconSymbol name="exclamationmark.triangle.fill" size={14} color="#F59E0B" />
          <Text style={styles.warningText}>
            {status === "needs_manual" ? "需要人工核實" : "資料獲取失敗"}
          </Text>
        </View>
      )}

      {/* Source link */}
      {sourceUrl && (
        <Pressable onPress={handleSourcePress} style={styles.sourceRow}>
          <IconSymbol name="link" size={12} color={colors.primary} />
          <Text
            style={[styles.sourceText, { color: colors.primary }]}
            numberOfLines={1}
          >
            查看來源
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadiusPresets.card,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  typeIcon: {
    fontSize: 12,
  },
  typeLabel: {
    ...TypographyStyles.small,
    fontWeight: "600",
  },
  date: {
    ...TypographyStyles.small,
  },
  schoolName: {
    ...TypographyStyles.body,
    fontWeight: "600",
    marginBottom: 2,
  },
  schoolNameEn: {
    ...TypographyStyles.small,
    marginBottom: Spacing.sm,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  tag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  tagText: {
    ...TypographyStyles.tiny,
  },
  notes: {
    ...TypographyStyles.small,
    marginTop: Spacing.sm,
    lineHeight: 18,
  },
  warningRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(245, 158, 11, 0.2)",
  },
  warningText: {
    ...TypographyStyles.small,
    color: "#F59E0B",
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: Spacing.sm,
  },
  sourceText: {
    ...TypographyStyles.tiny,
  },
});
