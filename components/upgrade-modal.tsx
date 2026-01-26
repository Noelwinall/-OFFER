import { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface UpgradeModalProps {
  visible: boolean;
  onClose: () => void;
}

export function UpgradeModal({ visible, onClose }: UpgradeModalProps) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          stiffness: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onClose();
  };

  const handleUpgrade = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    // TODO: Implement payment flow
    // For now, just close the modal
    console.log("Upgrade clicked - payment flow to be implemented");
    onClose();
  };

  const features = [
    {
      icon: "doc.text.magnifyingglass",
      title: "深度學校分析",
      description: "每所學校的個人化分析、優缺點對比",
    },
    {
      icon: "flag.fill",
      title: "申請策略",
      description: "首選推薦、備選學校、時間規劃",
    },
    {
      icon: "checklist",
      title: "行動計劃",
      description: "具體步驟指引，優先級排序",
    },
    {
      icon: "sparkles",
      title: "AI 深度報告",
      description: "無限次數生成個人化報告",
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={handleClose}
          activeOpacity={1}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: slideAnim }],
            paddingBottom: insets.bottom + 20,
          },
        ]}
      >
        <LinearGradient
          colors={["#FAF8F5", "#FFF9F0", "#FAF8F5"]}
          style={StyleSheet.absoluteFill}
        />

        {/* Handle */}
        <View style={styles.handle} />

        {/* Close Button */}
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="xmark" size={20} color="#706B5E" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={["#7C3AED", "#5B21B6"]}
              style={styles.iconGradient}
            >
              <IconSymbol name="crown.fill" size={36} color="#FFFFFF" />
            </LinearGradient>
          </View>
          <Text style={styles.title}>升級至 Pro</Text>
          <Text style={styles.subtitle}>
            解鎖完整的 AI 深度報告和申請攻略
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <IconSymbol name={feature.icon as any} size={22} color="#7C3AED" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Pricing */}
        <View style={styles.pricingContainer}>
          <View style={styles.pricingCard}>
            <Text style={styles.pricingLabel}>Pro 會員</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceSymbol}>HK$</Text>
              <Text style={styles.priceAmount}>38</Text>
              <Text style={styles.pricePeriod}>/月</Text>
            </View>
            <Text style={styles.pricingNote}>首月試用 HK$18</Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
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
              <Text style={styles.upgradeButtonText}>立即升級</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleClose} style={styles.laterButton}>
            <Text style={styles.laterButtonText}>稍後再說</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          訂閱後可隨時取消。查看我們的服務條款和隱私政策。
        </Text>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    maxHeight: SCREEN_HEIGHT * 0.9,
    overflow: "hidden",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E8E2D5",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E2D5",
    borderRadius: 16,
    zIndex: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 28,
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D2013",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#706B5E",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
  },
  features: {
    marginBottom: 28,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(124, 58, 237, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D2013",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 3,
  },
  featureDescription: {
    fontSize: 13,
    color: "#706B5E",
    fontFamily: "NotoSerifSC-Regular",
  },
  pricingContainer: {
    marginBottom: 24,
  },
  pricingCard: {
    backgroundColor: "rgba(124, 58, 237, 0.12)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.3)",
    alignItems: "center",
  },
  pricingLabel: {
    fontSize: 14,
    color: "#7C3AED",
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "NotoSerifSC-Regular",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceSymbol: {
    fontSize: 18,
    color: "#2D2013",
    fontWeight: "600",
    marginRight: 2,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: "700",
    color: "#2D2013",
  },
  pricePeriod: {
    fontSize: 16,
    color: "#706B5E",
    marginLeft: 4,
  },
  pricingNote: {
    fontSize: 13,
    color: "#10B981",
    marginTop: 8,
    fontFamily: "NotoSerifSC-Regular",
  },
  ctaContainer: {
    gap: 12,
    marginBottom: 16,
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
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FAF8F5",
    fontFamily: "NotoSerifSC-Regular",
  },
  laterButton: {
    paddingVertical: 14,
    alignItems: "center",
  },
  laterButtonText: {
    fontSize: 15,
    color: "#706B5E",
    fontFamily: "NotoSerifSC-Regular",
  },
  terms: {
    fontSize: 11,
    color: "#8B7355",
    textAlign: "center",
    lineHeight: 16,
    fontFamily: "NotoSerifSC-Regular",
  },
});
