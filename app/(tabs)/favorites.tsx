import { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform, StyleSheet, Modal, TextInput, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SchoolCard } from "@/components/school-card";
import { useRouter } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage, CompareStorage, FavoriteGroupsStorage, DEFAULT_GROUPS, type FavoriteGroup } from "@/lib/storage";
import { groupSchoolsBySession, type GroupedSchool } from "@/lib/school-classification";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { Typography } from "@/components/ui/typography";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

// 分組顏色選項
// Note: GROUP_COLORS includes primary color as fallback, but we'll use colors.primary dynamically
const GROUP_COLORS = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];

export default function FavoritesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteSchools, setFavoriteSchools] = useState<School[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [groups, setGroups] = useState<FavoriteGroup[]>(DEFAULT_GROUPS);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("all");
  const [schoolGroupMappings, setSchoolGroupMappings] = useState<Record<string, string>>({});
  
  // 新增分組彈窗
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupColor, setNewGroupColor] = useState(GROUP_COLORS[0]);
  
  // 移動學校到分組彈窗
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const [favs, list, groupList, mappings] = await Promise.all([
      FavoritesStorage.getAll(),
      CompareStorage.getAll(),
      FavoriteGroupsStorage.getGroups(),
      FavoriteGroupsStorage.getSchoolMappings(),
    ]);
    
    setFavorites(favs);
    setCompareList(list);
    setGroups(groupList);
    
    // 轉換映射為 Record
    const mappingRecord: Record<string, string> = {};
    mappings.forEach((m) => {
      mappingRecord[m.schoolId] = m.groupId;
    });
    setSchoolGroupMappings(mappingRecord);
    
    // 根據選中的分組篩選學校
    filterSchoolsByGroup(favs, selectedGroupId, mappingRecord);
  };

  const filterSchoolsByGroup = (favs: string[], groupId: string, mappings: Record<string, string>) => {
    let filteredIds: string[];
    if (groupId === "all") {
      filteredIds = favs;
    } else {
      filteredIds = favs.filter((id) => mappings[id] === groupId);
    }
    const schools = SCHOOLS.filter((school) => filteredIds.includes(school.id));
    setFavoriteSchools(schools);
  };

  const handleGroupSelect = (groupId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedGroupId(groupId);
    filterSchoolsByGroup(favorites, groupId, schoolGroupMappings);
  };

  // 合併幼稚園/小學同校不同班別（AM/PM/WD）
  const displayFavorites = useMemo(() => {
    return groupSchoolsBySession(favoriteSchools);
  }, [favoriteSchools]);

  const handleFavoriteToggle = async (schoolId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await FavoritesStorage.toggle(schoolId);
    await loadData();
  };

  const handleSchoolPress = (schoolId: string) => {
    router.push(`/school/${schoolId}`);
  };

  const handleCompare = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/compare");
  };

  const handleAddGroup = async () => {
    if (!newGroupName.trim()) return;
    
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    await FavoriteGroupsStorage.addGroup({
      name: newGroupName.trim(),
      color: newGroupColor,
      icon: "folder.fill",
    });
    
    setNewGroupName("");
    setNewGroupColor(GROUP_COLORS[0]);
    setShowAddGroupModal(false);
    await loadData();
  };

  const handleMoveToGroup = async (groupId: string) => {
    if (!selectedSchoolId) return;
    
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    await FavoriteGroupsStorage.setSchoolGroup(selectedSchoolId, groupId);
    setShowMoveModal(false);
    setSelectedSchoolId(null);
    await loadData();
  };

  const openMoveModal = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    setShowMoveModal(true);
  };

  const getGroupCount = (groupId: string): number => {
    if (groupId === "all") return favorites.length;
    return favorites.filter((id) => schoolGroupMappings[id] === groupId).length;
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.background, colors.surface, colors.background]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <MaxWidthWrapper>
        <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* 頁面標題 */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>我的收藏</Text>
            <TouchableOpacity
              onPress={() => setShowAddGroupModal(true)}
              style={styles.addGroupButton}
              activeOpacity={0.7}
            >
              <IconSymbol name="plus.circle.fill" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>
            已收藏 {favorites.length} 所學校
          </Text>
        </View>

        {/* 分組標籤 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.groupTabsContainer}
          contentContainerStyle={styles.groupTabsContent}
        >
          {groups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={[
                styles.groupTab,
                selectedGroupId === group.id && styles.groupTabActive,
                selectedGroupId === group.id && { borderColor: group.color },
              ]}
              onPress={() => handleGroupSelect(group.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.groupDot, { backgroundColor: group.color }]} />
              <Text
                style={[
                  styles.groupTabText,
                  selectedGroupId === group.id && { color: group.color },
                ]}
              >
                {group.name}
              </Text>
              <Text style={styles.groupCount}>{getGroupCount(group.id)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={displayFavorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <SchoolCard
                school={item}
                isFavorite={true}
                onPress={() => handleSchoolPress(item.id)}
                onFavoritePress={() => handleFavoriteToggle(item.id)}
                sessions={item.__sessions}
                showSessions={item.__showSessions}
              />
              {/* 分組標籤 */}
              <TouchableOpacity
                style={styles.schoolGroupTag}
                onPress={() => openMoveModal(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.schoolGroupTagText}>
                  {schoolGroupMappings[item.id]
                    ? groups.find((g) => g.id === schoolGroupMappings[item.id])?.name || "未分組"
                    : "未分組"}
                </Text>
                <IconSymbol name="chevron.right" size={12} color={colors.muted + "80"} />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: compareList.length > 0 ? 160 : 120 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                {selectedGroupId === "all" ? "尚未收藏任何學校" : "此分組尚無學校"}
              </Text>
              <Text style={styles.emptySubtitle}>
                {selectedGroupId === "all"
                  ? "在學校卡片上點擊愛心圖標即可收藏"
                  : "點擊學校卡片下方的分組標籤可移動學校"}
              </Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.listFooterDisclaimer}>
              <Text style={styles.disclaimerText}>
                資訊基於公開資料整理，僅供參考，以學校官方為準
              </Text>
            </View>
          }
        />

        {compareList.length > 0 && (
          <View style={styles.compareContainer}>
            <TouchableOpacity
              onPress={handleCompare}
              style={[styles.compareButton, { backgroundColor: colors.primary, shadowColor: colors.primary }]}
              activeOpacity={0.8}
            >
              <Text style={styles.compareButtonText}>
                對比學校 ({compareList.length}/3)
              </Text>
            </TouchableOpacity>
          </View>
        )}
        </View>
      </MaxWidthWrapper>

      {/* 新增分組彈窗 */}
      <Modal
        visible={showAddGroupModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddGroupModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowAddGroupModal(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>新增分組</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="輸入分組名稱"
              placeholderTextColor={colors.muted + "66"}
              value={newGroupName}
              onChangeText={setNewGroupName}
              maxLength={10}
            />
            
            <Text style={styles.modalLabel}>選擇顏色</Text>
            <View style={styles.colorOptions}>
              {GROUP_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    newGroupColor === color && styles.colorOptionSelected,
                  ]}
                  onPress={() => setNewGroupColor(color)}
                />
              ))}
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowAddGroupModal(false)}
              >
                <Text style={styles.modalCancelText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalConfirmButton,
                  { backgroundColor: colors.primary },
                  !newGroupName.trim() && styles.modalButtonDisabled
                ]}
                onPress={handleAddGroup}
                disabled={!newGroupName.trim()}
              >
                <Text style={styles.modalConfirmText}>確定</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* 移動到分組彈窗 */}
      <Modal
        visible={showMoveModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMoveModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowMoveModal(false)}>
          <Pressable style={styles.moveModalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>移動到分組</Text>
            
            <ScrollView style={styles.groupList}>
              {groups.filter((g) => g.id !== "all").map((group) => (
                <TouchableOpacity
                  key={group.id}
                  style={styles.groupListItem}
                  onPress={() => handleMoveToGroup(group.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.groupListDot, { backgroundColor: group.color }]} />
                  <Text style={styles.groupListText}>{group.name}</Text>
                  {selectedSchoolId && schoolGroupMappings[selectedSchoolId] === group.id && (
                    <IconSymbol name="checkmark.circle.fill" size={20} color="#10B981" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.moveModalCancel}
              onPress={() => setShowMoveModal(false)}
            >
              <Text style={styles.moveModalCancelText}>取消</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    ...TypographyStyles.title,
    fontSize: 28,
    color: "#2D2013",
    letterSpacing: 1,
  },
  addGroupButton: {
    padding: 4,
  },
  headerSubtitle: {
    ...TypographyStyles.caption,
    color: "#706B5E",
    marginTop: Spacing.xs,
  },
  groupTabsContainer: {
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E2D5",
  },
  groupTabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  groupTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF9F0",
    borderWidth: 1,
    borderColor: "#E8E2D5",
    marginRight: 8,
  },
  groupTabActive: {
    backgroundColor: "#F5F1E8",
  },
  groupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  groupTabText: {
    fontSize: 13,
    color: "#2D2013",
    fontFamily: "NotoSerifSC-Regular",
  },
  groupCount: {
    fontSize: 11,
    color: "#706B5E",
    marginLeft: 6,
  },
  schoolGroupTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: -8,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#FFF9F0",
    borderRadius: 12,
  },
  schoolGroupTagText: {
    fontSize: 11,
    color: "#706B5E",
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    color: "#706B5E",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#8B8578",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 13,
    paddingHorizontal: 40,
  },
  compareContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "rgba(250, 248, 245, 0.98)",
    borderTopWidth: 1,
    borderTopColor: "#E8E2D5",
  },
  compareButton: {
    // backgroundColor and shadowColor will be set dynamically
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadiusPresets.card,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  compareButtonText: {
    color: "#FAF8F5",
    ...TypographyStyles.body,
    fontWeight: TypographyStyles.heading.fontWeight,
    textAlign: "center",
    letterSpacing: 1,
  },
  listFooterDisclaimer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginTop: 16,
  },
  disclaimerText: {
    fontSize: 11,
    color: "#8B8578",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFF9F0",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E8E2D5",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2D2013",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "NotoSerifSC-Bold",
  },
  modalInput: {
    backgroundColor: "#FAF8F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#2D2013",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E8E2D5",
  },
  modalLabel: {
    fontSize: 14,
    color: "#706B5E",
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorOptionSelected: {
    borderColor: "#2D2013",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#E8E2D5",
  },
  modalCancelText: {
    color: "#706B5E",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: SpacingPresets.buttonPaddingVertical,
    borderRadius: BorderRadiusPresets.button,
    // backgroundColor will be set dynamically
  },
  modalButtonDisabled: {
    opacity: 0.5,
  },
  modalConfirmText: {
    color: "#FAF8F5",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  // Move modal styles
  moveModalContent: {
    width: "100%",
    backgroundColor: "#FFF9F0",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    position: "absolute",
    bottom: 0,
    borderWidth: 1,
    borderColor: "#E8E2D5",
  },
  groupList: {
    maxHeight: 300,
    marginBottom: 16,
  },
  groupListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E2D5",
  },
  groupListDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  groupListText: {
    flex: 1,
    fontSize: 16,
    color: "#2D2013",
    fontFamily: "NotoSerifSC-Regular",
  },
  moveModalCancel: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#E8E2D5",
  },
  moveModalCancelText: {
    color: "#706B5E",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
