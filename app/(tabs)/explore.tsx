import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/hooks/use-auth";
import { getGoogleLoginUrl } from "@/constants/oauth";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const handleLogin = () => {
    if (Platform.OS === "web") {
      // Redirect to Google OAuth
      window.location.href = getGoogleLoginUrl();
    }
  };

  const menuItems = [
    { icon: "heart.fill", title: "我的收藏", subtitle: "查看已收藏的學校", onPress: () => router.push("/(tabs)/favorites") },
    { icon: "star.fill", title: "對比記錄", subtitle: "查看學校對比歷史", onPress: () => router.push("/compare") },
    { icon: "magnifyingglass", title: "瀏覽記錄", subtitle: "最近瀏覽的學校", onPress: () => {} },
  ];

  // Define styles inside component to access colors
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.xl,
      paddingBottom: Spacing["3xl"],
    },
    pageTitle: {
      ...TypographyStyles.title,
      fontSize: 32,
      color: colors.foreground,
      marginBottom: Spacing["2xl"],
      letterSpacing: 1,
    },
    profileSection: {
      alignItems: "center",
      marginBottom: Spacing["2xl"],
    },
    avatarContainer: {
      marginBottom: Spacing.lg,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.primary + "1A",
      borderWidth: 2,
      borderColor: colors.primary + "4D",
      justifyContent: "center",
      alignItems: "center",
    },
    guestText: {
      ...TypographyStyles.heading,
      fontSize: 20,
      color: colors.foreground,
      marginBottom: Spacing.xs,
    },
    guestSubtext: {
      ...TypographyStyles.small,
      fontSize: 14,
      color: colors.muted,
      marginBottom: Spacing.xl,
    },
    loginButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing["2xl"],
      paddingVertical: Spacing.md,
      borderRadius: BorderRadiusPresets.button,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    loginButtonText: {
      color: colors.background,
      ...TypographyStyles.body,
      fontSize: 16,
      fontWeight: TypographyStyles.heading.fontWeight,
      letterSpacing: 1,
    },
    logoutButton: {
      backgroundColor: colors.surface + "1A",
      paddingHorizontal: Spacing["2xl"],
      paddingVertical: Spacing.md,
      borderRadius: BorderRadiusPresets.button,
      borderWidth: 1,
      borderColor: colors.border + "33",
    },
    logoutButtonText: {
      color: colors.foreground,
      ...TypographyStyles.body,
      fontSize: 16,
      fontWeight: TypographyStyles.heading.fontWeight,
      letterSpacing: 1,
    },
    menuSection: {
      gap: Spacing.md,
      marginBottom: Spacing["2xl"],
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface + "0D",
      borderRadius: BorderRadiusPresets.card,
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: colors.border + "14",
    },
    menuIconContainer: {
      width: 44,
      height: 44,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.primary + "1A",
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.md,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuTitle: {
      ...TypographyStyles.body,
      fontSize: 16,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
      marginBottom: 2,
    },
    menuSubtitle: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted,
    },
    settingsSection: {
      marginBottom: Spacing["2xl"],
    },
    sectionTitle: {
      ...TypographyStyles.caption,
      fontSize: 14,
      fontWeight: "500",
      color: colors.muted,
      marginBottom: Spacing.md,
      marginLeft: Spacing.xs,
      letterSpacing: 1,
    },
    settingsCard: {
      backgroundColor: colors.surface + "0D",
      borderRadius: BorderRadiusPresets.card,
      borderWidth: 1,
      borderColor: colors.border + "14",
      overflow: "hidden",
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.md + 2,
    },
    settingText: {
      ...TypographyStyles.body,
      fontSize: 15,
      color: colors.foreground,
    },
    settingDivider: {
      height: 1,
      backgroundColor: colors.border + "0F",
      marginHorizontal: Spacing.md + 2,
    },
    versionText: {
      ...TypographyStyles.tiny,
      fontSize: 12,
      color: colors.muted + "4D",
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
        <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { paddingTop: insets.top + 20 }]}
      >
        {/* 頁面標題 */}
        <Text style={styles.pageTitle}>我的</Text>

        {/* 用戶頭像區域 */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <IconSymbol name="person.fill" size={48} color={colors.primary} />
            </View>
          </View>

          {loading ? (
            <>
              <Text style={styles.guestText}>載入中...</Text>
              <Text style={styles.guestSubtext}>正在檢查登入狀態</Text>
            </>
          ) : isAuthenticated && user ? (
            <>
              <Text style={styles.guestText}>{user.name || "用戶"}</Text>
              <Text style={styles.guestSubtext}>{user.email || "已登入"}</Text>

              <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={logout}>
                <Text style={styles.logoutButtonText}>登出</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.guestText}>訪客用戶</Text>
              <Text style={styles.guestSubtext}>登入後可同步收藏與瀏覽記錄</Text>

              <TouchableOpacity style={styles.loginButton} activeOpacity={0.8} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>使用 Google 登入</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* 功能菜單 */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                <IconSymbol name={item.icon as any} size={22} color={colors.primary} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.muted + "4D"} />
            </TouchableOpacity>
          ))}
        </View>

        {/* 設置區域 */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>設置</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <Text style={styles.settingText}>關於我們</Text>
              <IconSymbol name="chevron.right" size={18} color="rgba(255,255,255,0.3)" />
            </TouchableOpacity>
            <View style={styles.settingDivider} />
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <Text style={styles.settingText}>使用條款</Text>
              <IconSymbol name="chevron.right" size={18} color="rgba(255,255,255,0.3)" />
            </TouchableOpacity>
            <View style={styles.settingDivider} />
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <Text style={styles.settingText}>隱私政策</Text>
              <IconSymbol name="chevron.right" size={18} color="rgba(255,255,255,0.3)" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 版本信息 */}
        <Text style={styles.versionText}>有OFFER v1.0.0</Text>
        </ScrollView>
      </MaxWidthWrapper>
    </View>
  );
}
