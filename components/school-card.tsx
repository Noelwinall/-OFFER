import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { isInternational } from "@/lib/international-schools";
import { SCHOOL_TEXT, formatTuitionDisplay, formatOverallTuition, hasValidFeesData } from "@/constants/school-text";
import { getSchoolFees } from "@/data/fees-2025-26";
import type { School, CurriculumV2, SchoolGender, SchoolRelationship } from "@/types/school";
import { CURRICULUM_V2_LABELS, SCHOOL_GENDER_LABELS, SCHOOL_RELATIONSHIP_LABELS, DISTRICT18_TO_DISTRICT } from "@/types/school";
import { type SessionType, SESSION_LABELS, SESSION_COLORS, isKindergarten } from "@/constants/session-grouping";
import { getKGNature, getKGNatureLabel, getKGNatureColor } from "@/constants/kg-nature";
import * as Haptics from "expo-haptics";

/**
 * Tag color palette - harmonized colors
 * Avoids repetition and ensures visual distinction
 */
const TAG_COLORS = {
  // Level tag - neutral gray
  level: "#6B7280",
  // District tag - teal (distinct from gray level)
  district: "#0D9488",
  // School net - indigo
  schoolNet: "#6366F1",
  // Religion - purple
  religion: "#8B5CF6",
  // Special school - emerald
  specialSchool: "#059669",
} as const;

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

      {/* 學校標籤 - 嚴格順序: 種類 → 學段 → 區域(18區) → 校網 → 男/女校 → 一條龍/直屬/聯繫 → 宗教 → 特殊學校 */}
      <View className="flex-row items-center flex-wrap gap-1">
        {/* 1. 種類標籤：KG 用 nature，其他用 category - 字體大小與其他標籤一致 */}
        {isKindergarten(school) ? (
          <View
            style={[styles.categoryTag, { backgroundColor: getKGNatureColor(getKGNature(school)!) }]}
          >
            <Text style={styles.categoryText}>
              {getKGNatureLabel(getKGNature(school)!)}
            </Text>
          </View>
        ) : (
          <View
            style={[styles.categoryTag, { backgroundColor: getDisplayTypeColor(school) }]}
          >
            <Text style={styles.categoryText}>
              {getDisplayType(school)}
            </Text>
          </View>
        )}
        {/* 2. 學段標籤 */}
        <View style={[styles.levelTag, { backgroundColor: TAG_COLORS.level }]}>
          <Text style={styles.levelText}>{school.level}</Text>
        </View>
        {/* 3. 區域標籤 (18區格式: 九龍-油尖旺區) */}
        <View style={[styles.districtTag, { backgroundColor: TAG_COLORS.district }]}>
          <Text style={styles.districtText}>{formatDistrictDisplay(school)}</Text>
        </View>
        {/* 4. 校網標籤（只在小學有校網時顯示） */}
        {school.level === "小學" && school.schoolNet && (
          <View style={[styles.metadataTag, { backgroundColor: TAG_COLORS.schoolNet }]}>
            <Text style={styles.metadataText}>校網：{school.schoolNet}</Text>
          </View>
        )}
        {/* 5. 學校性別標籤（男校/女校，MIXED 不顯示） */}
        {school.gender && school.gender !== "MIXED" && (
          <View style={[styles.genderTag, { backgroundColor: getGenderColor(school.gender) }]}>
            <Text style={styles.genderText}>{SCHOOL_GENDER_LABELS[school.gender]}</Text>
          </View>
        )}
        {/* 6. 學校關係標籤（一條龍/直屬/聯繫） */}
        {school.relationship && (
          <View style={[styles.relationshipTag, { backgroundColor: getRelationshipColor(school.relationship) }]}>
            <Text style={styles.relationshipText}>{SCHOOL_RELATIONSHIP_LABELS[school.relationship]}</Text>
          </View>
        )}
        {/* 7. 宗教標籤（只在有宗教時顯示） */}
        {school.religion && (
          <View style={[styles.metadataTag, { backgroundColor: TAG_COLORS.religion }]}>
            <Text style={styles.metadataText}>{school.religion}</Text>
          </View>
        )}
        {/* 8. 特殊學校標籤 */}
        {school.isSpecialSchool && (
          <View style={[styles.metadataTag, { backgroundColor: TAG_COLORS.specialSchool }]}>
            <Text style={styles.metadataText}>特殊學校</Text>
          </View>
        )}
        {/* 班別標籤（僅幼稚園顯示：上午班/下午班/全天；小學不顯示） */}
        {showSessions && sessions && sessions.length > 0 && sessions.map((session) => (
          <View
            key={session}
            style={[styles.sessionTag, { backgroundColor: SESSION_COLORS[session] }]}
          >
            <Text style={styles.sessionText}>{SESSION_LABELS[session]}</Text>
          </View>
        ))}
      </View>

      {/* 學費資訊 - 只在有數據時顯示，無數據不渲染 */}
      {hasTuitionData(school) && (
        <Text className="text-xs text-muted mt-2">
          {getTuitionDisplayText(school)}
        </Text>
      )}
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
 * 格式化區域顯示 (18區格式)
 * 例: "九龍-油尖旺區", "新界-沙田區", "港島-中西區"
 */
function formatDistrictDisplay(school: School): string {
  if (school.district18) {
    return `${school.district}-${school.district18}`;
  }
  return school.district;
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
 * 根據學校性別返回對應顏色
 */
function getGenderColor(gender: SchoolGender): string {
  const colors: Record<SchoolGender, string> = {
    BOYS: "#3B82F6",    // blue
    GIRLS: "#EC4899",   // pink
    MIXED: "#6B7280",   // gray (not used in display)
  };
  return colors[gender] || "#6B7280";
}

/**
 * 根據學校關係類型返回對應顏色
 */
function getRelationshipColor(relationship: SchoolRelationship): string {
  const colors: Record<SchoolRelationship, string> = {
    THROUGH_TRAIN: "#F97316", // orange - 一條龍
    AFFILIATED: "#0EA5E9",    // sky blue - 直屬
    LINKED: "#14B8A6",        // teal - 聯繫
  };
  return colors[relationship] || "#6B7280";
}

/**
 * 檢查學校是否有有效學費數據
 * 用於決定是否顯示學費行（無數據時不顯示，而非顯示佔位符）
 * 規則：Gov/Aided 不顯示學費，DSS/Private/International 才顯示
 */
function hasTuitionData(school: School): boolean {
  // 資助/公立學校：不顯示學費（即使有數據）
  if (school.category === "資助" || school.category === "公立") {
    return false;
  }
  // 直資學校：檢查是否有有效學費範圍
  if (school.category === "直資") {
    return school.tuitionMin > 0 || school.tuitionMax > 0;
  }
  // 國際/私校：檢查費用結構是否有有效數據
  if (isInternational(school) || school.category === "私立") {
    const fees = getSchoolFees(school.id);
    return hasValidFeesData(fees);
  }
  return false;
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
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  levelTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  districtTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  districtText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
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
  genderTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  genderText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  metadataTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  metadataText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  relationshipTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  relationshipText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
