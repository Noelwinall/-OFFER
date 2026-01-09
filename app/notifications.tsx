import { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform, StyleSheet, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { NotificationsStorage, type Notification, type NotificationSettings } from "@/lib/storage";

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    remind7Days: true,
    remind3Days: true,
    remind1Day: true,
  });
  const [showSettings, setShowSettings] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const [notifs, settingsData] = await Promise.all([
      NotificationsStorage.getAll(),
      NotificationsStorage.getSettings(),
    ]);
    // 按時間倒序排列
    setNotifications(notifs.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
    setSettings(settingsData);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await NotificationsStorage.markAsRead(notificationId);
    await loadData();
  };

  const handleMarkAllAsRead = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    await NotificationsStorage.markAllAsRead();
    await loadData();
  };

  const handleDelete = async (notificationId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    await NotificationsStorage.delete(notificationId);
    await loadData();
  };

  const handleSettingChange = async (key: keyof NotificationSettings, value: boolean) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await NotificationsStorage.updateSettings({ [key]: value });
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "今天";
    if (days === 1) return "昨天";
    if (days < 7) return `${days} 天前`;
    return date.toLocaleDateString("zh-TW", { month: "short", day: "numeric" });
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "deadline_1d":
        return { icon: "bell.badge.fill" as const, color: "#EF4444" };
      case "deadline_3d":
        return { icon: "bell.fill" as const, color: "#F59E0B" };
      case "deadline_7d":
        return { icon: "bell.fill" as const, color: "#10B981" };
      default:
        return { icon: "bell.fill" as const, color: "#00D9FF" };
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const renderNotification = ({ item }: { item: Notification }) => {
    const { icon, color } = getNotificationIcon(item.type);
    
    return (
      <TouchableOpacity
        style={[styles.notificationCard, !item.isRead && styles.notificationUnread]}
        onPress={() => handleMarkAsRead(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.notificationIcon, { backgroundColor: `${color}20` }]}>
          <IconSymbol name={icon} size={20} color={color} />
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.notificationBody} numberOfLines={2}>{item.body}</Text>
          <Text style={styles.notificationTime}>{formatDate(item.createdAt)}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="xmark" size={16} color="rgba(255,255,255,0.4)" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.headerTitle}>通知中心</Text>
        <TouchableOpacity
          onPress={() => setShowSettings(!showSettings)}
          style={styles.settingsButton}
          activeOpacity={0.7}
        >
          <IconSymbol name="slider.horizontal.3" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {showSettings ? (
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsTitle}>通知設置</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>啟用通知</Text>
              <Text style={styles.settingDesc}>開啟後將收到申請截止提醒</Text>
            </View>
            <Switch
              value={settings.enabled}
              onValueChange={(value) => handleSettingChange("enabled", value)}
              trackColor={{ false: "rgba(255,255,255,0.2)", true: "#00D9FF" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.settingItem, !settings.enabled && styles.settingDisabled]}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>提前 7 天提醒</Text>
            </View>
            <Switch
              value={settings.remind7Days}
              onValueChange={(value) => handleSettingChange("remind7Days", value)}
              trackColor={{ false: "rgba(255,255,255,0.2)", true: "#10B981" }}
              thumbColor="#FFFFFF"
              disabled={!settings.enabled}
            />
          </View>

          <View style={[styles.settingItem, !settings.enabled && styles.settingDisabled]}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>提前 3 天提醒</Text>
            </View>
            <Switch
              value={settings.remind3Days}
              onValueChange={(value) => handleSettingChange("remind3Days", value)}
              trackColor={{ false: "rgba(255,255,255,0.2)", true: "#F59E0B" }}
              thumbColor="#FFFFFF"
              disabled={!settings.enabled}
            />
          </View>

          <View style={[styles.settingItem, !settings.enabled && styles.settingDisabled]}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>提前 1 天提醒</Text>
              <Text style={styles.settingDesc}>最後提醒，避免錯過截止日期</Text>
            </View>
            <Switch
              value={settings.remind1Day}
              onValueChange={(value) => handleSettingChange("remind1Day", value)}
              trackColor={{ false: "rgba(255,255,255,0.2)", true: "#EF4444" }}
              thumbColor="#FFFFFF"
              disabled={!settings.enabled}
            />
          </View>
        </View>
      ) : (
        <>
          {/* 統計與操作 */}
          <View style={styles.statsBar}>
            <Text style={styles.statsText}>
              {unreadCount > 0 ? `${unreadCount} 條未讀通知` : "沒有未讀通知"}
            </Text>
            {unreadCount > 0 && (
              <TouchableOpacity onPress={handleMarkAllAsRead}>
                <Text style={styles.markAllText}>全部已讀</Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <IconSymbol name="bell.fill" size={48} color="rgba(255,255,255,0.2)" />
                <Text style={styles.emptyTitle}>暫無通知</Text>
                <Text style={styles.emptySubtitle}>
                  收藏學校後，我們會在申請截止前提醒您
                </Text>
              </View>
            }
          />
        </>
      )}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
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
  statsText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
  },
  markAllText: {
    fontSize: 14,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 12,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  notificationUnread: {
    backgroundColor: "rgba(0, 217, 255, 0.08)",
    borderColor: "rgba(0, 217, 255, 0.2)",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 18,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
  },
  deleteButton: {
    padding: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
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
    paddingHorizontal: 40,
    fontFamily: "NotoSerifSC-Regular",
  },
  // Settings styles
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 20,
    fontFamily: "NotoSerifSC-Bold",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  settingDisabled: {
    opacity: 0.5,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  settingDesc: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
    fontFamily: "NotoSerifSC-Regular",
  },
});
