import { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform, StyleSheet, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { NotificationsStorage, type Notification, type NotificationSettings } from "@/lib/storage";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
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
        return { icon: "bell.badge.fill" as const, color: colors.error };
      case "deadline_3d":
        return { icon: "bell.fill" as const, color: colors.warning };
      case "deadline_7d":
        return { icon: "bell.fill" as const, color: colors.success };
      default:
        return { icon: "bell.fill" as const, color: colors.primary };
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
    headerTitle: {
      ...TypographyStyles.heading,
      fontSize: 20,
      color: colors.foreground,
      letterSpacing: 1,
    },
    settingsButton: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.surface + "1A",
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
    statsText: {
      ...TypographyStyles.small,
      color: colors.muted,
    },
    markAllText: {
      ...TypographyStyles.small,
      color: colors.primary,
    },
    listContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.md,
      gap: Spacing.md,
    },
    notificationCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: colors.surface + "0D",
      borderRadius: BorderRadiusPresets.card,
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: colors.border + "14",
    },
    notificationUnread: {
      backgroundColor: colors.primary + "14",
      borderColor: colors.primary + "33",
    },
    notificationIcon: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.full,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.md,
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      ...TypographyStyles.body,
      fontSize: 15,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
      marginBottom: Spacing.xs,
    },
    notificationBody: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted,
      lineHeight: 18,
      marginBottom: Spacing.xs,
    },
    notificationTime: {
      ...TypographyStyles.tiny,
      fontSize: 11,
      color: colors.muted + "66",
    },
    deleteButton: {
      padding: Spacing.xs,
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
      color: colors.muted + "66",
      textAlign: "center",
      paddingHorizontal: Spacing["2xl"],
    },
    // Settings styles
    settingsContainer: {
      flex: 1,
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.md,
    },
    settingsTitle: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
      marginBottom: Spacing.xl,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "14",
    },
    settingDisabled: {
      opacity: 0.5,
    },
    settingInfo: {
      flex: 1,
      marginRight: Spacing.lg,
    },
    settingLabel: {
      ...TypographyStyles.body,
      fontSize: 16,
      color: colors.foreground,
    },
    settingDesc: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted,
      marginTop: Spacing.xs,
    },
  });

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
          <IconSymbol name="xmark" size={16} color={colors.muted + "99"} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.headerTitle}>通知中心</Text>
        <TouchableOpacity
          onPress={() => setShowSettings(!showSettings)}
          style={styles.settingsButton}
          activeOpacity={0.7}
        >
          <IconSymbol name="slider.horizontal.3" size={22} color={colors.foreground} />
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
              trackColor={{ false: colors.border + "80", true: colors.primary }}
              thumbColor={colors.foreground}
            />
          </View>

          <View style={[styles.settingItem, !settings.enabled && styles.settingDisabled]}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>提前 7 天提醒</Text>
            </View>
            <Switch
              value={settings.remind7Days}
              onValueChange={(value) => handleSettingChange("remind7Days", value)}
              trackColor={{ false: colors.border + "80", true: colors.success }}
              thumbColor={colors.foreground}
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
              trackColor={{ false: colors.border + "80", true: colors.warning }}
              thumbColor={colors.foreground}
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
              trackColor={{ false: colors.border + "80", true: colors.error }}
              thumbColor={colors.foreground}
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
                <IconSymbol name="bell.fill" size={48} color={colors.muted + "33"} />
                <Text style={styles.emptyTitle}>暫無通知</Text>
                <Text style={styles.emptySubtitle}>
                  收藏學校後，我們會在申請截止前提醒您
                </Text>
              </View>
            }
          />
        </>
      )}
      </MaxWidthWrapper>
    </View>
  );
}
