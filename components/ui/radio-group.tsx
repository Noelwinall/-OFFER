import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selected: string | null;
  onSelect: (value: string) => void;
  title?: string;
}

export function RadioGroup({
  options,
  selected,
  onSelect,
  title,
}: RadioGroupProps) {
  const colors = useColors();

  const handleSelect = (value: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onSelect(value);
  };

  return (
    <View className="gap-2">
      {title && (
        <Text className="text-sm text-muted font-semibold">{title}</Text>
      )}
      {options.map((option) => {
        const isSelected = selected === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleSelect(option.value)}
            className="flex-row items-center py-2"
            accessible
            accessibilityLabel={option.label}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
          >
            <View
              className="w-6 h-6 rounded-full border-2 items-center justify-center mr-3"
              style={{
                borderColor: isSelected ? colors.primary : colors.border,
              }}
            >
              {isSelected && (
                <View
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
            </View>
            <Text
              className={`flex-1 ${
                isSelected ? "text-foreground font-medium" : "text-foreground"
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
