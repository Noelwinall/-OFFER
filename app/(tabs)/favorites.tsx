import { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SchoolCard } from "@/components/school-card";
import { useRouter } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage, CompareStorage, FavoriteGroupsStorage, DEFAULT_GROUPS, type FavoriteGroup } from "@/lib/storage";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";

// 分組顏色選項
const GROUP_COLORS = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#00D9FF"];

export default function FavoritesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      
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
              <IconSymbol name="plus.circle.fill" size={24} color="#00D9FF" />
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
          data={favoriteSchools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <SchoolCard
                school={item}
                isFavorite={true}
                onPress={() => handleSchoolPress(item.id)}
                onFavoritePress={() => handleFavoriteToggle(item.id)}
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
                <IconSymbol name="chevron.right" size={12} color="rgba(255,255,255,0.5)" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: compareList.length > 0 ? 160 : 100 }}
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
        />

        {compareList.length > 0 && (
          <View style={styles.compareContainer}>
            <TouchableOpacity
              onPress={handleCompare}
              style={styles.compareButton}
              activeOpacity={0.8}
            >
              <Text style={styles.compareButtonText}>
                對比學校 ({compareList.length}/3)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            資訊基於公開資料整理，僅供參考，以學校官方為準
          </Text>
        </View>
      </View>

      {/* 新增分組彈窗 */}
      <Modal
        visible={showAddGroupModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddGroupModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>新增分組</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="輸入分組名稱"
              placeholderTextColor="rgba(255,255,255,0.4)"
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
                style={[styles.modalConfirmButton, !newGroupName.trim() && styles.modalButtonDisabled]}
                onPress={handleAddGroup}
                disabled={!newGroupName.trim()}
              >
                <Text style={styles.modalConfirmText}>確定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 移動到分組彈窗 */}
      <Modal
        visible={showMoveModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMoveModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.moveModalContent}>
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
          </View>
        </View>
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
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  addGroupButton: {
    padding: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 4,
  },
  groupTabsContainer: {
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
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
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginRight: 8,
  },
  groupTabActive: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  groupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  groupTabText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
  },
  groupCount: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
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
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
  },
  schoolGroupTagText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "rgba(255,255,255,0.4)",
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
    backgroundColor: "rgba(15, 22, 41, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  compareButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  compareButtonText: {
    color: "#0F1629",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  disclaimerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "rgba(15, 22, 41, 0.9)",
  },
  disclaimerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
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
    backgroundColor: "#1a2744",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "NotoSerifSC-Bold",
  },
  modalInput: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
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
    borderColor: "#FFFFFF",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  modalCancelText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#00D9FF",
  },
  modalButtonDisabled: {
    opacity: 0.5,
  },
  modalConfirmText: {
    color: "#0F1629",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  // Move modal styles
  moveModalContent: {
    width: "100%",
    backgroundColor: "#1a2744",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    position: "absolute",
    bottom: 0,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
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
    borderBottomColor: "rgba(255,255,255,0.08)",
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
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  moveModalCancel: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  moveModalCancelText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
