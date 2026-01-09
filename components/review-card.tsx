import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import type { Review } from "@/lib/storage";

interface ReviewCardProps {
  review: Review;
  onLike: (reviewId: string) => void;
}

export function ReviewCard({ review, onLike }: ReviewCardProps) {
  const handleLike = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onLike(review.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <IconSymbol
            key={star}
            name="star.fill"
            size={14}
            color={star <= rating ? "#F59E0B" : "rgba(255,255,255,0.2)"}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      {/* 頭部：作者和評分 */}
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{review.authorName.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.authorName}>{review.authorName}</Text>
            <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
          </View>
        </View>
        {renderStars(review.rating)}
      </View>

      {/* 標題 */}
      {review.title && (
        <Text style={styles.title}>{review.title}</Text>
      )}

      {/* 內容 */}
      <Text style={styles.content}>{review.content}</Text>

      {/* 標籤 */}
      {review.tags && review.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {review.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 底部：點讚 */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={handleLike}
          activeOpacity={0.7}
        >
          <IconSymbol
            name={review.isLiked ? "hand.thumbsup.fill" : "hand.thumbsup"}
            size={18}
            color={review.isLiked ? "#00D9FF" : "rgba(255,255,255,0.5)"}
          />
          <Text style={[styles.likeCount, review.isLiked && styles.likeCountActive]}>
            {review.likes > 0 ? review.likes : "讚"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,217,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00D9FF",
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  date: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    marginTop: 2,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  tag: {
    backgroundColor: "rgba(0,217,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  likeCount: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
  likeCountActive: {
    color: "#00D9FF",
  },
});
