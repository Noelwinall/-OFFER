import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { RangeSlider } from "@/components/ui/range-slider";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { useFilter } from "@/lib/filter-context";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
}

const TUITION_MIN = 0;
const TUITION_MAX = 500000;

const CURRICULUM_OPTIONS = [
  { label: "IB 課程", value: "IB" as const },
  { label: "DSE 課程", value: "DSE" as const },
  { label: "IGCSE 課程", value: "IGCSE" as const },
  { label: "A-Level 課程", value: "A-Level" as const },
];

const LANGUAGE_OPTIONS = [
  { label: "全英文", value: "全英文" as const },
  { label: "以中文為主", value: "以中文為主" as const },
  { label: "中英雙語", value: "中英雙語" as const },
];

const CATEGORY_OPTIONS = [
  { label: "國際學校", value: "國際" as const },
  { label: "資助學校", value: "資助" as const },
  { label: "直資學校", value: "直資" as const },
  { label: "私立學校", value: "私立" as const },
  { label: "公立學校", value: "公立" as const },
];

const DISTRICT_OPTIONS = [
  { label: "港島", value: "港島" as const },
  { label: "九龍", value: "九龍" as const },
  { label: "新界", value: "新界" as const },
];

export function FilterSheet({ visible, onClose }: FilterSheetProps) {
  const colors = useColors();
  const { state, dispatch } = useFilter();
  const [localMinTuition, setLocalMinTuition] = useState(
    state.tuitionRange?.min ?? TUITION_MIN
  );
  const [localMaxTuition, setLocalMaxTuition] = useState(
    state.tuitionRange?.max ?? TUITION_MAX
  );

  const handleApplyFilters = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    dispatch({
      type: "SET_TUITION_RANGE",
      payload: { min: localMinTuition, max: localMaxTuition },
    });
    onClose();
  };

  const handleResetFilters = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    dispatch({ type: "RESET_FILTERS" });
    setLocalMinTuition(TUITION_MIN);
    setLocalMaxTuition(TUITION_MAX);
  };

  const handleClose = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <View
          className="flex-1 mt-auto bg-background rounded-t-3xl"
          style={{ maxHeight: "85%" }}
        >
          {/* 標題欄 */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
            <Text className="text-xl font-bold text-foreground">進階篩選</Text>
            <TouchableOpacity onPress={handleClose} hitSlop={8}>
              <IconSymbol name="xmark" size={24} color={colors.foreground} />
            </TouchableOpacity>
          </View>

          {/* 篩選選項 */}
          <ScrollView
            className="flex-1 px-6 py-4"
            showsVerticalScrollIndicator={false}
          >
            {/* 學費範圍 */}
            <View className="mb-6">
              <Text className="text-base font-semibold text-foreground mb-3">
                💰 學費範圍
              </Text>
              <RangeSlider
                min={TUITION_MIN}
                max={TUITION_MAX}
                step={10000}
                minValue={localMinTuition}
                maxValue={localMaxTuition}
                onMinChange={setLocalMinTuition}
                onMaxChange={setLocalMaxTuition}
                formatLabel={(v) => {
                  if (v === TUITION_MAX) return "不限";
                  return `${(v / 10000).toFixed(0)}萬`;
                }}
              />
            </View>

            {/* 課程體系 */}
            <View className="mb-6 pb-4 border-b border-border">
              <CheckboxGroup
                title="🎓 課程體系"
                options={CURRICULUM_OPTIONS}
                selected={state.curriculum}
                onToggle={(value) =>
                  dispatch({ type: "TOGGLE_CURRICULUM", payload: value as any })
                }
              />
            </View>

            {/* 教學語言 */}
            <View className="mb-6 pb-4 border-b border-border">
              <RadioGroup
                title="🌐 教學語言"
                options={LANGUAGE_OPTIONS}
                selected={state.language}
                onSelect={(value) =>
                  dispatch({ type: "SET_LANGUAGE", payload: value as any })
                }
              />
            </View>

            {/* 學校類型 */}
            <View className="mb-6 pb-4 border-b border-border">
              <CheckboxGroup
                title="🏫 學校類型"
                options={CATEGORY_OPTIONS}
                selected={state.category}
                onToggle={(value) =>
                  dispatch({ type: "TOGGLE_CATEGORY", payload: value as any })
                }
              />
            </View>

            {/* 地區 */}
            <View className="mb-6">
              <CheckboxGroup
                title="📍 地區"
                options={DISTRICT_OPTIONS}
                selected={state.district}
                onToggle={(value) =>
                  dispatch({ type: "TOGGLE_DISTRICT", payload: value as any })
                }
              />
            </View>
          </ScrollView>

          {/* 底部按鈕 */}
          <View className="px-6 py-4 border-t border-border gap-3">
            <TouchableOpacity
              onPress={handleResetFilters}
              className="bg-surface py-3 rounded-xl border border-border active:opacity-70"
            >
              <Text className="text-foreground text-base font-medium text-center">
                重置篩選
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleApplyFilters}
              className="bg-primary py-3 rounded-xl active:opacity-80"
            >
              <Text className="text-white text-base font-semibold text-center">
                套用篩選
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
