import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";

// 申請時間線數據（示範數據）
const DEADLINES = [
  {
    id: "1",
    month: "9月",
    period: "2025年9月",
    events: [
      {
        title: "國際學校早期申請開始",
        description: "大部分國際學校開放下學年入學申請",
        schools: ["漢基國際學校", "香港國際學校", "德瑞國際學校"],
        type: "application_open",
        urgent: false,
      },
      {
        title: "直資學校簡介會",
        description: "多間直資學校舉辦入學簡介會",
        schools: ["聖保羅男女中學", "拔萃男書院", "拔萃女書院"],
        type: "info_session",
        urgent: false,
      },
    ],
  },
  {
    id: "2",
    month: "10月",
    period: "2025年10月",
    events: [
      {
        title: "小一自行分配學位申請",
        description: "官立及資助小學自行分配學位申請期",
        schools: ["所有官立及資助小學"],
        type: "deadline",
        urgent: true,
      },
      {
        title: "國際學校第一輪截止",
        description: "部分國際學校第一輪申請截止",
        schools: ["英基學校協會", "加拿大國際學校"],
        type: "deadline",
        urgent: true,
      },
    ],
  },
  {
    id: "3",
    month: "11月",
    period: "2025年11月",
    events: [
      {
        title: "直資學校申請截止",
        description: "大部分直資學校申請截止日期",
        schools: ["聖保羅男女中學", "拔萃男書院", "協恩中學"],
        type: "deadline",
        urgent: true,
      },
      {
        title: "私立學校面試",
        description: "私立學校開始進行入學面試",
        schools: ["弘立書院", "保良局蔡繼有學校"],
        type: "interview",
        urgent: false,
      },
    ],
  },
  {
    id: "4",
    month: "12月",
    period: "2025年12月",
    events: [
      {
        title: "小一統一派位選校",
        description: "填寫小一統一派位選校表格",
        schools: ["所有官立及資助小學"],
        type: "deadline",
        urgent: true,
      },
      {
        title: "國際學校面試期",
        description: "國際學校進行入學評估及面試",
        schools: ["漢基國際學校", "香港國際學校"],
        type: "interview",
        urgent: false,
      },
    ],
  },
  {
    id: "5",
    month: "1月",
    period: "2026年1月",
    events: [
      {
        title: "直資學校放榜",
        description: "直資學校公佈錄取結果",
        schools: ["聖保羅男女中學", "拔萃男書院", "拔萃女書院"],
        type: "result",
        urgent: false,
      },
      {
        title: "國際學校第二輪申請",
        description: "部分國際學校開放第二輪申請",
        schools: ["耀中國際學校", "弘立書院"],
        type: "application_open",
        urgent: false,
      },
    ],
  },
  {
    id: "6",
    month: "6月",
    period: "2026年6月",
    events: [
      {
        title: "小一統一派位結果公佈",
        description: "教育局公佈小一統一派位結果",
        schools: ["所有官立及資助小學"],
        type: "result",
        urgent: true,
      },
    ],
  },
];

const EVENT_TYPE_CONFIG = {
  application_open: { label: "申請開放", color: "#10B981", icon: "📝" },
  deadline: { label: "截止日期", color: "#EF4444", icon: "⏰" },
  info_session: { label: "簡介會", color: "#7C3AED", icon: "📢" },
  interview: { label: "面試期", color: "#F59E0B", icon: "🎤" },
  result: { label: "放榜", color: "#00D9FF", icon: "📋" },
};

export default function DeadlinesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expandedMonth, setExpandedMonth] = useState<string | null>("2");

  const toggleMonth = (monthId: string) => {
    setExpandedMonth(expandedMonth === monthId ? null : monthId);
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
        <Text style={styles.headerTitle}>申請截止別錯過！</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 說明卡片 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📅</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>2025-2026 學年申請時間線</Text>
            <Text style={styles.infoText}>
              以下為香港各類學校的重要申請日期，請提前做好準備
            </Text>
          </View>
        </View>

        {/* 時間線 */}
        <View style={styles.timeline}>
          {DEADLINES.map((month, index) => {
            const isExpanded = expandedMonth === month.id;
            const hasUrgent = month.events.some(e => e.urgent);

            return (
              <View key={month.id} style={styles.timelineItem}>
                {/* 時間線連接線 */}
                {index < DEADLINES.length - 1 && (
                  <View style={styles.timelineConnector} />
                )}

                {/* 月份節點 */}
                <TouchableOpacity
                  style={styles.monthHeader}
                  onPress={() => toggleMonth(month.id)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.monthDot,
                    hasUrgent && styles.monthDotUrgent,
                  ]}>
                    <Text style={styles.monthDotText}>{month.month}</Text>
                  </View>
                  <View style={styles.monthInfo}>
                    <Text style={styles.monthPeriod}>{month.period}</Text>
                    <Text style={styles.monthEventCount}>
                      {month.events.length} 個重要事項
                      {hasUrgent && " · 有截止日期"}
                    </Text>
                  </View>
                  <Text style={styles.expandIcon}>{isExpanded ? "▼" : "▶"}</Text>
                </TouchableOpacity>

                {/* 展開的事件列表 */}
                {isExpanded && (
                  <View style={styles.eventList}>
                    {month.events.map((event, eventIndex) => {
                      const typeConfig = EVENT_TYPE_CONFIG[event.type as keyof typeof EVENT_TYPE_CONFIG];
                      
                      return (
                        <View key={eventIndex} style={styles.eventCard}>
                          <View style={styles.eventHeader}>
                            <Text style={styles.eventIcon}>{typeConfig.icon}</Text>
                            <View style={[styles.eventTypeBadge, { backgroundColor: `${typeConfig.color}20` }]}>
                              <Text style={[styles.eventTypeText, { color: typeConfig.color }]}>
                                {typeConfig.label}
                              </Text>
                            </View>
                            {event.urgent && (
                              <View style={styles.urgentBadge}>
                                <Text style={styles.urgentText}>緊急</Text>
                              </View>
                            )}
                          </View>
                          <Text style={styles.eventTitle}>{event.title}</Text>
                          <Text style={styles.eventDescription}>{event.description}</Text>
                          <View style={styles.eventSchools}>
                            <Text style={styles.eventSchoolsLabel}>相關學校：</Text>
                            <Text style={styles.eventSchoolsList}>
                              {event.schools.join("、")}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* 提示 */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            以上日期僅供參考，實際日期請以各學校官方公佈為準。建議提前 1-2 個月開始準備申請材料。
          </Text>
        </View>
      </ScrollView>
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
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "rgba(0,217,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.2)",
  },
  infoIcon: {
    fontSize: 28,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 18,
  },
  timeline: {
    position: "relative",
  },
  timelineItem: {
    position: "relative",
    marginBottom: 8,
  },
  timelineConnector: {
    position: "absolute",
    left: 35,
    top: 56,
    bottom: -8,
    width: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },
  monthDot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,217,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  monthDotUrgent: {
    backgroundColor: "rgba(239,68,68,0.2)",
  },
  monthDotText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Bold",
  },
  monthInfo: {
    flex: 1,
  },
  monthPeriod: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 2,
  },
  monthEventCount: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
  expandIcon: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  eventList: {
    marginLeft: 60,
    marginTop: 12,
    gap: 12,
  },
  eventCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  eventIcon: {
    fontSize: 16,
  },
  eventTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  eventTypeText: {
    fontSize: 11,
    fontWeight: "500",
    fontFamily: "NotoSerifSC-Regular",
  },
  urgentBadge: {
    backgroundColor: "rgba(239,68,68,0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#EF4444",
    fontFamily: "NotoSerifSC-Bold",
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 18,
    marginBottom: 8,
  },
  eventSchools: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  eventSchoolsLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
  },
  eventSchoolsList: {
    flex: 1,
    fontSize: 12,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(245,158,11,0.1)",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginTop: 16,
  },
  tipIcon: {
    fontSize: 16,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 18,
  },
});
