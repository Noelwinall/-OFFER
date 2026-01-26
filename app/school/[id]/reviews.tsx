import { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ReviewCard } from "@/components/review-card";
import { ReviewsStorage, type Review } from "@/lib/storage";
import { SCHOOLS } from "@/data/schools";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

// 評論標籤選項
const REVIEW_TAGS = ["教學質量好", "環境優美", "師資優秀", "課外活動豐富", "升學率高", "學費合理", "交通便利", "校風優良"];

export default function SchoolReviewsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [showAddModal, setShowAddModal] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  
  // 新評論表單
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const school = SCHOOLS.find((s) => s.id === id);

  useFocusEffect(
    useCallback(() => {
      loadReviews();
    }, [id])
  );

  const loadReviews = async () => {
    if (!id) return;
    const schoolReviews = await ReviewsStorage.getBySchool(id);
    const avgRating = await ReviewsStorage.getAverageRating(id);
    
    // 排序
    const sorted = [...schoolReviews].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.likes - a.likes;
    });
    
    setReviews(sorted);
    setAverageRating(avgRating);
  };

  useEffect(() => {
    loadReviews();
  }, [sortBy]);

  const handleLike = async (reviewId: string) => {
    await ReviewsStorage.toggleLike(reviewId);
    await loadReviews();
  };

  const handleSubmitReview = async () => {
    if (!id || !newContent.trim() || !newAuthor.trim()) return;
    
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    await ReviewsStorage.add({
      schoolId: id,
      authorName: newAuthor.trim(),
      rating: newRating,
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: selectedTags,
    });
    
    // 重置表單
    setNewRating(5);
    setNewTitle("");
    setNewContent("");
    setNewAuthor("");
    setSelectedTags([]);
    setShowAddModal(false);
    
    await loadReviews();
  };

  const toggleTag = (tag: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const renderStarSelector = () => (
    <View style={styles.starSelector}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => {
            if (Platform.OS !== "web") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            setNewRating(star);
          }}
          activeOpacity={0.7}
        >
          <IconSymbol
            name="star.fill"
            size={32}
            color={star <= newRating ? colors.warning : colors.muted + "33"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  // Define styles inside component to access colors
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.lg,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.surface + "1A",
      justifyContent: "center",
      alignItems: "center",
    },
    headerCenter: {
      flex: 1,
      alignItems: "center",
      marginHorizontal: Spacing.md,
    },
    headerTitle: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
    },
    headerSubtitle: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted,
      marginTop: 2,
    },
    addButton: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    statsBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "80",
    },
    ratingStats: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.md,
    },
    ratingDisplay: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
    },
    ratingValue: {
      ...TypographyStyles.heading,
      fontSize: 20,
      color: colors.foreground,
    },
    reviewCount: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted,
    },
    sortButtons: {
      flexDirection: "row",
      gap: Spacing.sm,
    },
    sortButton: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.surface + "14",
    },
    sortButtonActive: {
      backgroundColor: colors.primary + "33",
    },
    sortButtonText: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted,
    },
    sortButtonTextActive: {
      color: colors.primary,
      fontWeight: TypographyStyles.heading.fontWeight,
    },
    listContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.lg,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: Spacing["3xl"],
    },
    emptyTitle: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.muted,
      marginTop: Spacing.lg,
      marginBottom: Spacing.sm,
    },
    emptySubtitle: {
      ...TypographyStyles.small,
      fontSize: 14,
      color: colors.muted + "66",
      textAlign: "center",
      marginBottom: Spacing.xl,
    },
    emptyButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadiusPresets.button,
    },
    emptyButtonText: {
      ...TypographyStyles.body,
      fontSize: 14,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.background,
    },
    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      padding: Spacing.xl,
      maxHeight: "90%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Spacing.xl,
    },
    modalTitle: {
      ...TypographyStyles.heading,
      fontSize: 20,
      color: colors.foreground,
    },
    formSection: {
      marginBottom: Spacing.xl,
    },
    formLabel: {
      ...TypographyStyles.body,
      fontSize: 14,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground + "CC",
      marginBottom: Spacing.sm,
    },
    starSelector: {
      flexDirection: "row",
      gap: Spacing.sm,
    },
    input: {
      backgroundColor: colors.surface + "14",
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      ...TypographyStyles.body,
      fontSize: 15,
      color: colors.foreground,
      borderWidth: 1,
      borderColor: colors.border + "80",
    },
    textArea: {
      height: 120,
      paddingTop: Spacing.md,
    },
    charCount: {
      ...TypographyStyles.tiny,
      fontSize: 11,
      color: colors.muted + "66",
      textAlign: "right",
      marginTop: Spacing.xs,
    },
    tagsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.sm,
    },
    tagOption: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadiusPresets.buttonPill,
      backgroundColor: colors.surface + "14",
      borderWidth: 1,
      borderColor: colors.border + "80",
    },
    tagOptionSelected: {
      backgroundColor: colors.primary + "33",
      borderColor: colors.primary,
    },
    tagOptionText: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted,
    },
    tagOptionTextSelected: {
      color: colors.primary,
    },
    submitButton: {
      backgroundColor: colors.primary,
      paddingVertical: Spacing.lg,
      borderRadius: BorderRadiusPresets.card,
      marginTop: Spacing.sm,
    },
    submitButtonDisabled: {
      opacity: 0.5,
    },
    submitButtonText: {
      ...TypographyStyles.body,
      fontSize: 16,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.background,
      textAlign: "center",
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.background, colors.surface, colors.background]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <MaxWidthWrapper>
        <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.right" size={24} color={colors.foreground} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>家長心得</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>{school?.name || "學校評論"}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          style={styles.addButton}
          activeOpacity={0.7}
        >
          <IconSymbol name="pencil" size={20} color={colors.background} />
        </TouchableOpacity>
      </View>

      {/* 統計與排序 */}
      <View style={styles.statsBar}>
        <View style={styles.ratingStats}>
          <View style={styles.ratingDisplay}>
            <IconSymbol name="star.fill" size={20} color={colors.warning} />
            <Text style={styles.ratingValue}>{averageRating > 0 ? averageRating.toFixed(1) : "-"}</Text>
          </View>
          <Text style={styles.reviewCount}>{reviews.length} 則評論</Text>
        </View>
        
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === "latest" && styles.sortButtonActive]}
            onPress={() => setSortBy("latest")}
          >
            <Text style={[styles.sortButtonText, sortBy === "latest" && styles.sortButtonTextActive]}>
              最新
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === "popular" && styles.sortButtonActive]}
            onPress={() => setSortBy("popular")}
          >
            <Text style={[styles.sortButtonText, sortBy === "popular" && styles.sortButtonTextActive]}>
              最熱
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReviewCard review={item} onLike={handleLike} />
        )}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="message.fill" size={48} color={colors.muted + "33"} />
            <Text style={styles.emptyTitle}>暫無評論</Text>
            <Text style={styles.emptySubtitle}>
              成為第一個分享心得的家長吧！
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setShowAddModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.emptyButtonText}>撰寫評論</Text>
            </TouchableOpacity>
          </View>
        }
      />
      </MaxWidthWrapper>

      {/* 新增評論彈窗 */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 24 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>撰寫評論</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <IconSymbol name="xmark" size={24} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* 評分 */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>整體評分</Text>
                {renderStarSelector()}
              </View>

              {/* 暱稱 */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>您的暱稱</Text>
                <TextInput
                  style={styles.input}
                  placeholder="輸入暱稱"
                  placeholderTextColor={colors.muted + "66"}
                  value={newAuthor}
                  onChangeText={setNewAuthor}
                  maxLength={20}
                />
              </View>

              {/* 標題 */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>評論標題（選填）</Text>
                <TextInput
                  style={styles.input}
                  placeholder="一句話總結您的體驗"
                  placeholderTextColor={colors.muted + "66"}
                  value={newTitle}
                  onChangeText={setNewTitle}
                  maxLength={30}
                />
              </View>

              {/* 內容 */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>評論內容</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="分享您對這所學校的看法和經驗..."
                  placeholderTextColor={colors.muted + "66"}
                  value={newContent}
                  onChangeText={setNewContent}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  maxLength={500}
                />
                <Text style={styles.charCount}>{newContent.length}/500</Text>
              </View>

              {/* 標籤 */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>選擇標籤（選填）</Text>
                <View style={styles.tagsGrid}>
                  {REVIEW_TAGS.map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.tagOption,
                        selectedTags.includes(tag) && styles.tagOptionSelected,
                      ]}
                      onPress={() => toggleTag(tag)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.tagOptionText,
                          selectedTags.includes(tag) && styles.tagOptionTextSelected,
                        ]}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* 提交按鈕 */}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (!newContent.trim() || !newAuthor.trim()) && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmitReview}
                disabled={!newContent.trim() || !newAuthor.trim()}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>發布評論</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
