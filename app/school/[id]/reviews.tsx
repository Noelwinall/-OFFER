import { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ReviewCard } from "@/components/review-card";
import { ReviewsStorage, type Review } from "@/lib/storage";
import { SCHOOLS } from "@/data/schools";

// 評論標籤選項
const REVIEW_TAGS = ["教學質量好", "環境優美", "師資優秀", "課外活動豐富", "升學率高", "學費合理", "交通便利", "校風優良"];

export default function SchoolReviewsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  
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
            color={star <= newRating ? "#F59E0B" : "rgba(255,255,255,0.2)"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.right" size={24} color="#FFFFFF" style={{ transform: [{ rotate: "180deg" }] }} />
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
          <IconSymbol name="pencil" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 統計與排序 */}
      <View style={styles.statsBar}>
        <View style={styles.ratingStats}>
          <View style={styles.ratingDisplay}>
            <IconSymbol name="star.fill" size={20} color="#F59E0B" />
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
            <IconSymbol name="message.fill" size={48} color="rgba(255,255,255,0.2)" />
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
                <IconSymbol name="xmark" size={24} color="rgba(255,255,255,0.6)" />
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
                  placeholderTextColor="rgba(255,255,255,0.4)"
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
                  placeholderTextColor="rgba(255,255,255,0.4)"
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
                  placeholderTextColor="rgba(255,255,255,0.4)"
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00D9FF",
    justifyContent: "center",
    alignItems: "center",
  },
  statsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  ratingStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ratingDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  reviewCount: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  sortButtons: {
    flexDirection: "row",
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  sortButtonActive: {
    backgroundColor: "rgba(0,217,255,0.2)",
  },
  sortButtonText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
  },
  sortButtonTextActive: {
    color: "#00D9FF",
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "NotoSerifSC-Bold",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "NotoSerifSC-Regular",
  },
  emptyButton: {
    backgroundColor: "#00D9FF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F1629",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1a2744",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
    marginBottom: 10,
    fontFamily: "NotoSerifSC-Regular",
  },
  starSelector: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  charCount: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    textAlign: "right",
    marginTop: 6,
  },
  tagsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  tagOptionSelected: {
    backgroundColor: "rgba(0,217,255,0.2)",
    borderColor: "#00D9FF",
  },
  tagOptionText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
  },
  tagOptionTextSelected: {
    color: "#00D9FF",
  },
  submitButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1629",
    textAlign: "center",
  },
});
