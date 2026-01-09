import { View, Text, TouchableOpacity } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  formatLabel?: (value: number) => string;
}

/**
 * 簡化版 RangeSlider - 使用按鈕增減而非拖動
 * 適合移動應用程式，避免複雜的手勢處理
 */
export function RangeSlider({
  min,
  max,
  step = 10000,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  formatLabel = (v) => `${(v / 10000).toFixed(0)}萬`,
}: RangeSliderProps) {
  const colors = useColors();

  const handleMinDecrease = () => {
    const newValue = Math.max(min, minValue - step);
    onMinChange(newValue);
  };

  const handleMinIncrease = () => {
    const newValue = Math.min(maxValue - step, minValue + step);
    onMinChange(newValue);
  };

  const handleMaxDecrease = () => {
    const newValue = Math.max(minValue + step, maxValue - step);
    onMaxChange(newValue);
  };

  const handleMaxIncrease = () => {
    const newValue = Math.min(max, maxValue + step);
    onMaxChange(newValue);
  };

  return (
    <View className="gap-4">
      {/* 顯示當前範圍 */}
      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-foreground font-semibold">
          {formatLabel(minValue)}
        </Text>
        <Text className="text-xs text-muted">至</Text>
        <Text className="text-sm text-foreground font-semibold">
          {formatLabel(maxValue)}
        </Text>
      </View>

      {/* 最小值控制 */}
      <View>
        <Text className="text-xs text-muted mb-2">最低預算</Text>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={handleMinDecrease}
            disabled={minValue <= min}
            className="w-10 h-10 rounded-lg border border-border items-center justify-center active:opacity-70"
            style={{ opacity: minValue <= min ? 0.5 : 1 }}
          >
            <Text className="text-lg text-foreground">−</Text>
          </TouchableOpacity>
          <View className="flex-1 h-8 bg-surface rounded-lg border border-border items-center justify-center">
            <Text className="text-sm text-foreground font-semibold">
              {formatLabel(minValue)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleMinIncrease}
            disabled={minValue >= maxValue - step}
            className="w-10 h-10 rounded-lg border border-border items-center justify-center active:opacity-70"
            style={{ opacity: minValue >= maxValue - step ? 0.5 : 1 }}
          >
            <Text className="text-lg text-foreground">+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 最大值控制 */}
      <View>
        <Text className="text-xs text-muted mb-2">最高預算</Text>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={handleMaxDecrease}
            disabled={maxValue <= minValue + step}
            className="w-10 h-10 rounded-lg border border-border items-center justify-center active:opacity-70"
            style={{ opacity: maxValue <= minValue + step ? 0.5 : 1 }}
          >
            <Text className="text-lg text-foreground">−</Text>
          </TouchableOpacity>
          <View className="flex-1 h-8 bg-surface rounded-lg border border-border items-center justify-center">
            <Text className="text-sm text-foreground font-semibold">
              {formatLabel(maxValue)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleMaxIncrease}
            disabled={maxValue >= max}
            className="w-10 h-10 rounded-lg border border-border items-center justify-center active:opacity-70"
            style={{ opacity: maxValue >= max ? 0.5 : 1 }}
          >
            <Text className="text-lg text-foreground">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
