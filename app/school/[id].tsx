import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert, Linking, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter, useLocalSearchParams } from "expo-router";
import { schools } from "@/data/schools";
import { FavoritesStorage, CompareStorage, ReviewsStorage } from "@/lib/storage";
import { isInternational } from "@/lib/international-schools";
import { isKindergarten } from "@/constants/session-grouping";
import { getKGNature, getKGNatureLabel, getKGNatureColor } from "@/constants/kg-nature";
import type { School, CurriculumV2, SchoolGender, SchoolRelationship, InstructionLanguage } from "@/types/school";
import { CURRICULUM_V2_LABELS, SCHOOL_GENDER_LABELS, SCHOOL_RELATIONSHIP_LABELS, DISTRICT18_TO_DISTRICT, INSTRUCTION_LANGUAGE_LABELS } from "@/types/school";
import { getCHSCData, type CHSCSchoolData } from "@/data/chsc-data";

/**
 * Tag color palette - harmonized colors (same as school-card)
 */
const TAG_COLORS = {
  level: "#6B7280",
  district: "#0D9488",
  schoolNet: "#6366F1",
  religion: "#8B5CF6",
  specialSchool: "#059669",
} as const;

/**
 * Category tag colors - matched to school-card getDisplayTypeColor
 */
const CATEGORY_COLORS: Record<string, string> = {
  "國際": "#00D9FF",
  "資助": "#6B5B95",
  "直資": "#E8756F",
  "私立": "#7C3AED",
  "公立": "#3B82F6",
};
import type { SchoolFees } from "@/types/fees";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  SCHOOL_TEXT,
  formatTuitionValue,
  getTuitionSourceNote,
  formatTuitionBands,
  formatMandatoryCharges,
} from "@/constants/school-text";
import { getSchoolFees } from "@/data/fees-2025-26";

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
    THROUGH_TRAIN: "#F59E0B",   // amber - 結龍學校
    AFFILIATED: "#10B981",      // emerald - 直屬學校
    LINKED: "#0EA5E9",          // sky blue - 聯繫學校
  };
  return colors[relationship] || "#6B7280";
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
 * 獲取授課語言顯示值
 * 使用 MOI 映射數據 (instructionLanguages)，與卡片/篩選器一致
 * 若無數據則顯示兜底文案
 */
function getLanguageDisplayValue(school: School): string {
  // 使用 instructionLanguages (MOI 映射)
  if (school.instructionLanguages && school.instructionLanguages.length > 0) {
    return school.instructionLanguages
      .map((lang) => INSTRUCTION_LANGUAGE_LABELS[lang] || lang)
      .join("、");
  }
  // 無 MOI 數據時顯示兜底
  return SCHOOL_TEXT.REFER_TO_SCHOOL_WEBSITE;
}

/**
 * 獲取相關學校資訊
 * 根據 relatedSchoolIds 返回學校名稱和 ID
 */
function getRelatedSchools(school: School): { id: string; name: string; level: string }[] {
  if (!school.relatedSchoolIds || school.relatedSchoolIds.length === 0) {
    return [];
  }
  return school.relatedSchoolIds
    .map((id) => {
      const relatedSchool = schools.find((s) => s.id === id);
      return relatedSchool ? { id: relatedSchool.id, name: relatedSchool.name, level: relatedSchool.level } : null;
    })
    .filter((s): s is { id: string; name: string; level: string } => s !== null);
}

/**
 * 獲取關係類型標題
 */
function getRelationshipTitle(relationship: SchoolRelationship): string {
  const titles: Record<SchoolRelationship, string> = {
    THROUGH_TRAIN: "一條龍學校",
    AFFILIATED: "直屬學校",
    LINKED: "聯繫學校",
  };
  return titles[relationship] || "相關學校";
}

/**
 * 獲取學校類型標籤顏色（與卡片一致）
 */
function getCategoryTagColor(school: School): string {
  if (isInternational(school)) return CATEGORY_COLORS["國際"];
  return CATEGORY_COLORS[school.category] || CATEGORY_COLORS["私立"];
}

/**
 * 判斷是否應顯示學費區塊
 * 規則：Gov/Aided 不顯示學費，DSS/Private/International 才顯示
 */
function shouldShowTuition(school: School): boolean {
  // Gov/Aided 不顯示學費
  if (school.category === "公立" || school.category === "資助") {
    return false;
  }
  return true;
}

/**
 * 獲取課程體系顯示列表
 * 規則：Gov/Aided 學校默認為 HK_LOCAL；其他學校使用 curriculumV2
 */
function getCurriculumDisplay(school: School): CurriculumV2[] {
  // Gov/Aided 學校默認為本地課程
  if (school.category === "公立" || school.category === "資助") {
    return ["HK_LOCAL"];
  }
  // 其他學校使用 curriculumV2
  return school.curriculumV2 || [];
}

export default function SchoolDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const [school, setSchool] = useState<School | null>(null);
  const [fees, setFees] = useState<SchoolFees | undefined>(undefined);
  const [chscData, setCHSCData] = useState<CHSCSchoolData | undefined>(undefined);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    loadSchool();
    loadFees();
    loadFavoriteStatus();
    loadCompareStatus();
    loadReviewStats();
  }, [params.id]);

  const loadSchool = () => {
    const found = schools.find((s) => s.id === params.id);
    setSchool(found || null);
    // Load CHSC data by school name
    if (found) {
      const chsc = getCHSCData(found.name);
      setCHSCData(chsc);
    }
  };

  const loadFees = () => {
    const schoolFees = getSchoolFees(params.id as string);
    setFees(schoolFees);
  };

  const loadFavoriteStatus = async () => {
    const status = await FavoritesStorage.isFavorite(params.id as string);
    setIsFavorite(status);
  };

  const loadCompareStatus = async () => {
    const status = await CompareStorage.isInCompare(params.id as string);
    setIsInCompare(status);
  };

  const loadReviewStats = async () => {
    const reviews = await ReviewsStorage.getBySchool(params.id as string);
    const avgRating = await ReviewsStorage.getAverageRating(params.id as string);
    setReviewCount(reviews.length);
    setAverageRating(avgRating);
  };

  const handleViewReviews = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(`/school/${params.id}/reviews`);
  };

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleFavoriteToggle = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await FavoritesStorage.toggle(params.id as string);
    await loadFavoriteStatus();
  };

  const handleAddToCompare = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (isInCompare) {
      await CompareStorage.remove(params.id as string);
      await loadCompareStatus();
      return;
    }

    const success = await CompareStorage.add(params.id as string);
    if (success) {
      await loadCompareStatus();
    } else {
      Alert.alert("提示", "對比列表已滿（最多 3 所學校）");
    }
  };

  const handleOpenWebsite = () => {
    if (school?.website) {
      Linking.openURL(school.website);
    }
  };

  /**
   * 處理申請連結點擊
   * 優先跳轉申請頁，否則跳轉官網首頁
   */
  const handleApplicationLink = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const url = school?.applicationLink || school?.website;
    if (url) {
      Linking.openURL(url);
    }
  };

  /**
   * 獲取申請按鈕狀態
   * - 有 applicationLink：正常跳轉，無提示
   * - 僅有 website：跳官網，顯示「（學校官網首頁）」
   * - 都沒有：按鈕置灰，顯示「（暫無連結）」
   */
  const getApplicationButtonState = () => {
    if (school?.applicationLink) {
      return { disabled: false, hint: null };
    }
    if (school?.website) {
      return { disabled: false, hint: "（學校官網首頁）" };
    }
    return { disabled: true, hint: "（暫無連結）" };
  };

  if (!school) {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
          locations={[0, 0.3, 0.7, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.container, { paddingTop: insets.top, justifyContent: "center", alignItems: "center" }]}>
          <Text style={styles.emptyText}>{SCHOOL_TEXT.SCHOOL_NOT_FOUND}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* 頂部導航 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>學校詳情</Text>
          <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteButton}>
            <IconSymbol
              name="heart.fill"
              size={24}
              color={isFavorite ? "#EF4444" : "rgba(255,255,255,0.5)"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* 學校名稱 */}
          <View style={styles.titleContainer}>
            <Text style={styles.schoolName}>{school.name}</Text>
            {school.nameEn && (
              <Text style={styles.schoolNameEn}>{school.nameEn}</Text>
            )}
            {/* 標籤 - 嚴格順序: 種類 → 學段 → 區域(18區) → 校網 → 男/女校 → 一條龍/直屬/聯繫 → 宗教 → 特殊學校 */}
            <View style={styles.tagRow}>
              {/* 1. 種類標籤：KG 用 nature，其他用 category - 顏色與卡片一致 */}
              {isKindergarten(school) ? (
                <View style={[styles.categoryTag, { backgroundColor: getKGNatureColor(getKGNature(school)!) }]}>
                  <Text style={styles.categoryTagTextWhite}>
                    {getKGNatureLabel(getKGNature(school)!)}
                  </Text>
                </View>
              ) : (
                <View style={[styles.categoryTag, { backgroundColor: getCategoryTagColor(school) }]}>
                  <Text style={styles.categoryTagTextWhite}>
                    {isInternational(school) ? "國際" : school.category}
                  </Text>
                </View>
              )}
              {/* 2. 學段標籤 */}
              <View style={[styles.levelTag, { backgroundColor: TAG_COLORS.level }]}>
                <Text style={styles.levelTagText}>{school.level}</Text>
              </View>
              {/* 3. 區域標籤 (18區格式) */}
              <View style={[styles.districtTag, { backgroundColor: TAG_COLORS.district }]}>
                <Text style={styles.districtTagText}>{formatDistrictDisplay(school)}</Text>
              </View>
              {/* 4. 校網標籤（只在小學有校網時顯示） */}
              {school.level === "小學" && school.schoolNet && (
                <View style={[styles.metadataTag, { backgroundColor: TAG_COLORS.schoolNet }]}>
                  <Text style={styles.metadataTagText}>校網：{school.schoolNet}</Text>
                </View>
              )}
              {/* 5. 學校性別標籤（男校/女校，MIXED 不顯示） */}
              {school.gender && school.gender !== "MIXED" && (
                <View style={[styles.genderTag, { backgroundColor: getGenderColor(school.gender) }]}>
                  <Text style={styles.genderTagText}>{SCHOOL_GENDER_LABELS[school.gender]}</Text>
                </View>
              )}
              {/* 6. 學校關係標籤（一條龍/直屬/聯繫） */}
              {school.relationship && (
                <View style={[styles.relationshipTag, { backgroundColor: getRelationshipColor(school.relationship) }]}>
                  <Text style={styles.relationshipTagText}>{SCHOOL_RELATIONSHIP_LABELS[school.relationship]}</Text>
                </View>
              )}
              {/* 7. 宗教標籤（只在有宗教時顯示） */}
              {school.religion && (
                <View style={[styles.metadataTag, { backgroundColor: TAG_COLORS.religion }]}>
                  <Text style={styles.metadataTagText}>{school.religion}</Text>
                </View>
              )}
              {/* 8. 特殊學校標籤 */}
              {school.isSpecialSchool && (
                <View style={[styles.metadataTag, { backgroundColor: TAG_COLORS.specialSchool }]}>
                  <Text style={styles.metadataTagText}>特殊學校</Text>
                </View>
              )}
            </View>
          </View>

          {/* 基本資訊 - 順序：類型 → 學段 → 地區 → 創校年份 → 校訓 → 授課語言 → 課程 → 學費 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{SCHOOL_TEXT.SECTION_BASIC_INFO}</Text>
            <View style={styles.infoGrid}>
              {/* 1. 學校類型 */}
              <InfoRow
                label={SCHOOL_TEXT.LABEL_CATEGORY}
                value={isKindergarten(school) ? getKGNatureLabel(getKGNature(school)!) : (isInternational(school) ? "國際" : school.category)}
              />
              {/* 2. 學段 */}
              <InfoRow label={SCHOOL_TEXT.LABEL_LEVEL} value={school.level} />
              {/* 3. 地區 */}
              <InfoRow label={SCHOOL_TEXT.LABEL_DISTRICT} value={school.district} />
              {/* 4. 創校年份 - from CHSC data, only render if available */}
              {chscData?.yearEstablished && (
                <InfoRow label="創校年份" value={chscData.yearEstablished} />
              )}
              {/* 5. 校訓 - from CHSC data, only render if available */}
              {chscData?.schoolMotto && (
                <InfoRow label="校訓" value={chscData.schoolMotto} />
              )}
              {/* 6. 授課語言（使用 MOI 映射數據）- only render if has data */}
              {school.instructionLanguages && school.instructionLanguages.length > 0 && (
                <InfoRow
                  label={SCHOOL_TEXT.LABEL_LANGUAGE}
                  value={getLanguageDisplayValue(school)}
                />
              )}
              {/* 7. 課程體系 - moved from standalone section, only render if has data */}
              {getCurriculumDisplay(school).length > 0 && (
                <View style={infoStyles.row}>
                  <Text style={infoStyles.label}>課程體系</Text>
                  <View style={styles.curriculumInlineContainer}>
                    {getCurriculumDisplay(school).map((curriculum) => (
                      <View
                        key={curriculum}
                        style={[styles.curriculumInlineBadge, { backgroundColor: getCurriculumColor(curriculum) }]}
                      >
                        <Text style={styles.curriculumInlineBadgeText}>{CURRICULUM_V2_LABELS[curriculum]}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              {/* 8. 學費 - 直資學校顯示原有學費；國際/私校在下方獨立區塊顯示；Gov/Aided不顯示 */}
              {shouldShowTuition(school) && school.category === "直資" && school.tuitionMin > 0 && school.tuitionMax > 0 && (
                <InfoRow
                  label={SCHOOL_TEXT.LABEL_TUITION}
                  value={formatTuitionValue(school.category, school.tuitionMin, school.tuitionMax)}
                />
              )}
            </View>
            {/* 直資學費來源說明 - R3-4 */}
            {shouldShowTuition(school) && school.category === "直資" && school.tuitionMin > 0 && school.tuitionMax > 0 && (
              <Text style={styles.tuitionSourceNote}>
                {getTuitionSourceNote(school.category, school.tuitionMin, school.tuitionMax)}
              </Text>
            )}
          </View>

          {/* 相關學校區塊（一條龍/直屬/聯繫學校） */}
          {school.relationship && school.relatedSchoolIds && school.relatedSchoolIds.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{getRelationshipTitle(school.relationship)}</Text>
              <View style={styles.relatedSchoolsContainer}>
                {getRelatedSchools(school).map((relatedSchool) => (
                  <TouchableOpacity
                    key={relatedSchool.id}
                    style={styles.relatedSchoolItem}
                    onPress={() => {
                      if (Platform.OS !== "web") {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
                      router.push(`/school/${relatedSchool.id}`);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.relatedSchoolInfo}>
                      <Text style={styles.relatedSchoolName}>{relatedSchool.name}</Text>
                      <Text style={styles.relatedSchoolLevel}>{relatedSchool.level}</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.4)" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          
          {/* R3-5: 學費區塊（國際/私校）- Gov/Aided不顯示 */}
          {shouldShowTuition(school) && (isInternational(school) || school.category === "私立") && (
            <FeesSection fees={fees} />
          )}

          {/* 聯絡方式 - 順序：電話 → 傳真 → 電郵 → 網站 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{SCHOOL_TEXT.SECTION_CONTACT}</Text>
            <View style={styles.infoGrid}>
              {/* 1. 電話 - from CHSC data, only render if available */}
              {chscData?.phone && (
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${chscData.phone}`)}>
                  <InfoRow label="電話" value={chscData.phone} isLink />
                </TouchableOpacity>
              )}
              {/* 2. 傳真 - from CHSC data, only render if available */}
              {chscData?.fax && (
                <InfoRow label="傳真" value={chscData.fax} />
              )}
              {/* 3. 電郵 - from CHSC data, only render if available */}
              {chscData?.email && (
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${chscData.email}`)}>
                  <InfoRow label="電郵" value={chscData.email} isLink />
                </TouchableOpacity>
              )}
              {/* 4. 網站 - from schools data */}
              {school.website && (
                <TouchableOpacity onPress={handleOpenWebsite}>
                  <InfoRow
                    label={SCHOOL_TEXT.LABEL_WEBSITE}
                    value={school.website}
                    isLink
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* 家長心得 */}
          <TouchableOpacity
            style={styles.reviewSection}
            onPress={handleViewReviews}
            activeOpacity={0.7}
          >
            <View style={styles.reviewHeader}>
              <Text style={styles.sectionTitle}>家長心得</Text>
              <View style={styles.reviewStats}>
                {averageRating > 0 && (
                  <View style={styles.ratingBadge}>
                    <IconSymbol name="star.fill" size={14} color="#F59E0B" />
                    <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
                  </View>
                )}
                <Text style={styles.reviewCountText}>
                  {reviewCount > 0 ? `${reviewCount} 則評論` : "暫無評論"}
                </Text>
                <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.4)" />
              </View>
            </View>
            <Text style={styles.reviewHint}>
              查看家長分享的申請經驗和學校評價
            </Text>
          </TouchableOpacity>



          {/* 免責聲明 */}
          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>{SCHOOL_TEXT.DATA_SOURCE}</Text>
            <Text style={styles.disclaimerText}>{SCHOOL_TEXT.DATA_DISCLAIMER}</Text>
          </View>
        </ScrollView>

        {/* 底部按鈕 */}
        <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            onPress={handleAddToCompare}
            style={styles.compareButton}
            activeOpacity={0.8}
          >
            <Text style={styles.compareButtonText}>
              {isInCompare ? "從對比中移除" : "加入對比"}
            </Text>
          </TouchableOpacity>
          <View style={styles.applyButtonContainer}>
            <TouchableOpacity
              onPress={handleApplicationLink}
              style={[
                styles.applyButton,
                getApplicationButtonState().disabled && styles.applyButtonDisabled
              ]}
              activeOpacity={0.8}
              disabled={getApplicationButtonState().disabled}
            >
              <IconSymbol
                name="safari"
                size={18}
                color={getApplicationButtonState().disabled ? "#8E8E93" : "#FFFFFF"}
              />
              <Text style={[
                styles.applyButtonText,
                getApplicationButtonState().disabled && styles.applyButtonTextDisabled
              ]}>
                申請連結
              </Text>
            </TouchableOpacity>
            {getApplicationButtonState().hint && (
              <Text style={styles.applyButtonHint}>
                {getApplicationButtonState().hint}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

function InfoRow({ label, value, isLink = false, isPending = false }: { label: string; value: string; isLink?: boolean; isPending?: boolean }) {
  const displayValue = isPending ? SCHOOL_TEXT.PENDING : value;
  return (
    <View style={infoStyles.row}>
      <Text style={infoStyles.label}>{label}</Text>
      <Text style={[infoStyles.value, isLink && infoStyles.link, isPending && infoStyles.pending]}>{displayValue}</Text>
    </View>
  );
}

/**
 * R3-5/R3-7: 費用區塊組件（國際/私校）
 * 閱讀順序：總體學費 → 學費明細 → 強制性費用（如有） → 小字說明 → 小字來源
 *
 * R3-8: 無費用數據時顯示「參考學校官網」
 */
function FeesSection({ fees }: { fees: SchoolFees | undefined }) {
  // 判斷是否有有效費用數據
  const hasValidFees = fees && fees.tuition && fees.tuition.bands && fees.tuition.bands.length > 0;

  // 無費用數據時的兜底處理：顯示「參考學校官網」
  if (!hasValidFees) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{SCHOOL_TEXT.SECTION_TUITION}</Text>
        <Text style={feeStyles.fallbackText}>{SCHOOL_TEXT.REFER_TO_SCHOOL_WEBSITE}</Text>
      </View>
    );
  }

  const tuitionBands = formatTuitionBands(fees?.tuition.bands);
  const mandatoryCharges = formatMandatoryCharges(fees?.mandatoryCharges);
  const hasSource = fees?.sourceNotes && fees.sourceNotes.length > 0;

  return (
    <View style={styles.section}>
      {/* 1. 總體學費標題 */}
      <Text style={styles.sectionTitle}>
        {SCHOOL_TEXT.OVERALL_TUITION_LABEL}
      </Text>

      {/* 2. 學費明細（按年級） */}
      <View style={styles.infoGrid}>
        {tuitionBands.map((band, index) => (
          <View key={index} style={feeStyles.bandRow}>
            <Text style={feeStyles.bandLabel}>{band.label}</Text>
            <Text style={[feeStyles.bandValue, band.value === SCHOOL_TEXT.TUITION_NOT_PUBLISHED && feeStyles.pending]}>
              {band.value}
            </Text>
          </View>
        ))}
      </View>

      {/* 3. 強制性費用（僅在有資料時顯示） */}
      {mandatoryCharges.length > 0 && (
        <View style={feeStyles.chargesSection}>
          <Text style={feeStyles.chargesTitle}>{SCHOOL_TEXT.SECTION_MANDATORY_CHARGES}</Text>
          <View style={feeStyles.chargesContainer}>
            {mandatoryCharges.map((charge, index) => (
              <View key={index} style={feeStyles.chargeItem}>
                <View style={feeStyles.chargeHeader}>
                  <Text style={feeStyles.chargeLabel}>{charge.label}</Text>
                  <Text style={feeStyles.chargeAmount}>{charge.amount}</Text>
                </View>
                <View style={feeStyles.chargeMeta}>
                  <View style={feeStyles.metaTag}>
                    <Text style={feeStyles.metaText}>{charge.refundable}</Text>
                  </View>
                  <View style={feeStyles.metaTag}>
                    <Text style={feeStyles.metaText}>{charge.frequency}</Text>
                  </View>
                </View>
                {charge.note && (
                  <Text style={feeStyles.chargeNote}>{charge.note}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 4. 小字說明 + 5. 小字來源 */}
      <View style={feeStyles.noteContainer}>
        <Text style={feeStyles.noteText}>{SCHOOL_TEXT.OVERALL_TUITION_NOTE}</Text>
        <Text style={feeStyles.noteText}>{SCHOOL_TEXT.OVERALL_TUITION_EXCLUDES}</Text>
        <Text style={feeStyles.sourceInline}>
          {hasSource ? "資料來源：學校官網（2025/26）" : "資料來源：待確認"}
        </Text>
      </View>
    </View>
  );
}

const feeStyles = StyleSheet.create({
  bandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  bandLabel: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
  },
  bandValue: {
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
    fontWeight: "500",
  },
  pending: {
    color: "rgba(255,255,255,0.4)",
    fontStyle: "italic",
  },
  chargesSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  chargesTitle: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  chargesContainer: {
    gap: 12,
  },
  chargeItem: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 12,
  },
  chargeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  chargeLabel: {
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  chargeAmount: {
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
    fontWeight: "600",
  },
  chargeMeta: {
    flexDirection: "row",
    gap: 8,
  },
  metaTag: {
    backgroundColor: "rgba(0,217,255,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  metaText: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 11,
  },
  chargeNote: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 12,
    marginTop: 8,
    fontStyle: "italic",
  },
  pendingText: {
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
    fontStyle: "italic",
  },
  noteContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  noteText: {
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 11,
    lineHeight: 16,
  },
  sourceInline: {
    color: "rgba(255,255,255,0.3)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 10,
    marginTop: 8,
  },
  fallbackText: {
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
    fontStyle: "italic",
  },
});

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  label: {
    width: 80,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
  },
  value: {
    flex: 1,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
  },
  link: {
    color: "#00D9FF",
    textDecorationLine: "underline",
  },
  pending: {
    color: "rgba(255,255,255,0.4)",
    fontStyle: "italic",
  },
});

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
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  schoolName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    lineHeight: 34,
    marginBottom: 4,
  },
  schoolNameEn: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  categoryTagTextWhite: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  internationalTag: {
    backgroundColor: "#00D9FF",
  },
  internationalTagText: {
    color: "#0F1629",
  },
  levelTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  levelTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  districtTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  districtTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  genderTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  genderTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  metadataTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  metadataTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  relationshipTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  relationshipTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  relatedSchoolsContainer: {
    gap: 8,
  },
  relatedSchoolItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,217,255,0.08)",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.15)",
  },
  relatedSchoolInfo: {
    flex: 1,
    marginRight: 8,
  },
  relatedSchoolName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 2,
  },
  relatedSchoolLevel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 12,
  },
  infoGrid: {
    gap: 4,
  },
  curriculumContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  curriculumBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  curriculumBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  curriculumInlineContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  curriculumInlineBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  curriculumInlineBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  tuitionSourceNote: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 8,
    fontStyle: "italic",
  },
  disclaimerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  disclaimerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "rgba(15, 22, 41, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  compareButton: {
    flex: 1,
    height: 52,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  compareButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  applyButton: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#00D9FF",
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1629",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  applyButtonContainer: {
    flex: 1,
  },
  applyButtonDisabled: {
    backgroundColor: "rgba(142, 142, 147, 0.3)",
    shadowOpacity: 0,
    elevation: 0,
  },
  applyButtonTextDisabled: {
    color: "#8E8E93",
  },
  applyButtonHint: {
    fontSize: 12,
    color: "#8E8E93",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 6,
  },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 16,
  },
  reviewSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(0,217,255,0.03)",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(245,158,11,0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#F59E0B",
  },
  reviewCountText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  reviewHint: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
});
