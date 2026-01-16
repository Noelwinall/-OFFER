import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { isInternational } from "@/lib/international-schools";
import { SCHOOL_TEXT, formatTuitionDisplay, formatOverallTuition, hasValidFeesData } from "@/constants/school-text";
import { getSchoolFees } from "@/data/fees-2025-26";
import type { School, CurriculumV2 } from "@/types/school";
import { CURRICULUM_V2_LABELS } from "@/types/school";
import { type SessionType, SESSION_LABELS, SESSION_COLORS, isKindergarten } from "@/constants/session-grouping";
import { getKGNature, getKGNatureLabel, getKGNatureColor } from "@/constants/kg-nature";
import * as Haptics from "expo-haptics";

interface SchoolCardProps {
  school: School;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
  /** 班別標籤（聚合後的 AM/PM/WD） */
  sessions?: SessionType[];
  /** 是否顯示 session 標籤（幼稚園=true, 小學=false） */
  showSessions?: boolean;
}

/**
 * 統一學校卡片組件
 * 用於所有學校列表展示場景
 * v0 字段: name/nameEn/category/level/district
 */
export const SchoolCard = React.memo(function SchoolCard({
  school,
  isFavorite = false,
  onPress,
  onFavoritePress,
  sessions,
  showSessions = true,
}: SchoolCardProps) {
  const colors = useColors();

  const handleFavoritePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onFavoritePress?.();
  };

  const handleCardPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.();
  };

  return (
    <Pressable
      onPress={handleCardPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && styles.cardPressed,
      ]}
    >
      {/* 學校名稱與收藏按鈕 */}
      <View className="flex-row items-start justify-between mb-1">
        <View className="flex-1 mr-2">
          <Text
            className="text-lg font-bold text-foreground"
            numberOfLines={2}
          >
            {school.name}
          </Text>
          {school.nameEn && (
            <Text
              className="text-xs text-muted mt-0.5"
              numberOfLines={1}
            >
              {school.nameEn}
            </Text>
          )}
        </View>
        <Pressable
          onPress={handleFavoritePress}
          hitSlop={8}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
        >
          <IconSymbol
            name="heart.fill"
            size={24}
            color={isFavorite ? "#EF4444" : colors.muted}
          />
        </Pressable>
      </View>

      {/* 學校類型標籤 - 幼稚園顯示 School Nature，其他顯示 category */}
      <View className="flex-row items-center flex-wrap gap-1">
        {/* 類型標籤：KG 用 nature，其他用 category */}
        {isKindergarten(school) ? (
          <View
            className="px-2 py-1 rounded"
            style={{ backgroundColor: getKGNatureColor(getKGNature(school)!) }}
          >
            <Text className="text-xs font-semibold text-white">
              {getKGNatureLabel(getKGNature(school)!)}
            </Text>
          </View>
        ) : (
          <View
            className="px-2 py-1 rounded"
            style={{ backgroundColor: getDisplayTypeColor(school) }}
          >
            <Text className="text-xs font-semibold text-white">
              {getDisplayType(school)}
            </Text>
          </View>
        )}
        <View className="px-2 py-1 rounded bg-gray-600/30">
          <Text className="text-xs text-muted">{school.level}</Text>
        </View>
        <View className="px-2 py-1 rounded bg-gray-600/30">
          <Text className="text-xs text-muted">{school.district}</Text>
        </View>
        {/* 班別標籤（僅幼稚園顯示：上午班/下午班/全天；小學不顯示） */}
        {showSessions && sessions && sessions.length > 0 && sessions.map((session) => (
          <View
            key={session}
            style={[styles.sessionTag, { backgroundColor: SESSION_COLORS[session] }]}
          >
            <Text style={styles.sessionText}>{SESSION_LABELS[session]}</Text>
          </View>
        ))}
        {/* 課程標籤 V2（Primary/Secondary only） */}
        {school.curriculumV2 && school.curriculumV2.length > 0 && school.curriculumV2.map((curriculum) => (
          <View
            key={curriculum}
            style={[styles.curriculumTag, { backgroundColor: getCurriculumColor(curriculum) }]}
          >
            <Text style={styles.curriculumText}>{CURRICULUM_V2_LABELS[curriculum]}</Text>
          </View>
        ))}
      </View>

      {/* 學費資訊 - R3-4 (DSS) + R3-5 (國際/私校) */}
      <Text className="text-xs text-muted mt-2">
        {getTuitionDisplayText(school)}
      </Text>
    </Pressable>
  );
}, (prev, next) =>
  prev.school.id === next.school.id &&
  prev.isFavorite === next.isFavorite &&
  JSON.stringify(prev.sessions) === JSON.stringify(next.sessions) &&
  prev.showSessions === next.showSessions
);

/**
 * 獲取學校顯示類型（國際學校優先）
 */
function getDisplayType(school: School): string {
  return isInternational(school) ? "國際" : school.category;
}

/**
 * 根據學校顯示類型返回對應顏色
 */
function getDisplayTypeColor(school: School): string {
  const colors: Record<string, string> = {
    國際: "#00D9FF",
    資助: "#6B5B95",
    直資: "#E8756F",
    私立: "#7C3AED",
    公立: "#3B82F6",
  };
  const displayType = getDisplayType(school);
  return colors[displayType] || colors["私立"];
}

/**
 * 根據課程類型返回對應顏色
 */
function getCurriculumColor(curriculum: CurriculumV2): string {
  const colors: Record<CurriculumV2, string> = {
    HK_LOCAL: "#10B981",    // green
    IB: "#F59E0B",          // amber
    BRITISH: "#3B82F6",     // blue
    AMERICAN: "#EF4444",    // red
    CANADIAN: "#DC2626",    // red darker
    AUSTRALIAN: "#059669",  // emerald
    OTHER_INTL: "#8B5CF6",  // violet
    DUAL_TRACK: "#EC4899",  // pink
  };
  return colors[curriculum] || "#6B7280";
}

/**
 * 獲取學費顯示文字
 * R3-4: 直資學校顯示 DSS 學費
 * R3-5: 國際/私校顯示總體學費（若有數據）
 * R3-8: 國際/私校無數據時顯示「參考學校官網」
 */
function getTuitionDisplayText(school: School): string {
  // 直資學校：使用原有 DSS 邏輯
  if (school.category === "直資") {
    return formatTuitionDisplay(school.category, school.tuitionMin, school.tuitionMax);
  }

  // 國際/私校：嘗試使用 R3-5 費用結構
  if (isInternational(school) || school.category === "私立") {
    const fees = getSchoolFees(school.id);
    // 無有效費用數據時顯示兜底文案
    if (!hasValidFeesData(fees)) {
      return SCHOOL_TEXT.REFER_TO_SCHOOL_WEBSITE;
    }
    return formatOverallTuition(fees);
  }

  // 其他類型：顯示待確認
  return formatTuitionDisplay(school.category, school.tuitionMin, school.tuitionMax);
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.85,
  },
  sessionTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sessionText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  curriculumTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  curriculumText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
