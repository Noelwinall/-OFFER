import { View, Text, TouchableOpacity, Platform } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selected: string[];
  onToggle: (value: string) => void;
  title?: string;
}

export function CheckboxGroup({
  options,
  selected,
  onToggle,
  title,
}: CheckboxGroupProps) {
  const colors = useColors();

  const handleToggle = (value: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onToggle(value);
  };

  return (
    <View className="gap-2">
      {title && (
        <Text className="text-sm text-muted font-semibold">{title}</Text>
      )}
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleToggle(option.value)}
            className="flex-row items-center py-2"
            accessible
            accessibilityLabel={option.label}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isSelected }}
          >
            <View
              className="w-6 h-6 rounded border-2 items-center justify-center mr-3"
              style={{
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: isSelected ? colors.primary : "transparent",
              }}
            >
              {isSelected && (
                <IconSymbol
                  name="checkmark"
                  size={16}
                  color={colors.background}
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
