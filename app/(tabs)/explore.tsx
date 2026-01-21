import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/hooks/use-auth";
import { getGoogleLoginUrl } from "@/constants/oauth";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      
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
              <IconSymbol name="person.fill" size={48} color="#00D9FF" />
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
                <IconSymbol name={item.icon as any} size={22} color="#00D9FF" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color="rgba(255,255,255,0.3)" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 32,
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(0, 217, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(0, 217, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  guestText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
    fontFamily: "NotoSerifSC-Bold",
  },
  guestSubtext: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 20,
    fontFamily: "NotoSerifSC-Regular",
  },
  loginButton: {
    backgroundColor: "#00D9FF",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    color: "#0F1629",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  logoutButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  menuSection: {
    gap: 12,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(0, 217, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
    fontFamily: "NotoSerifSC-Bold",
  },
  menuSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.5)",
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  settingsCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  settingText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  settingDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginHorizontal: 18,
  },
  versionText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
  },
});
