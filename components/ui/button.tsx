/**
 * Button Component - 统一按钮组件
 * 提供多种变体和尺寸，自动使用主题颜色和 Typography 系统
 */

import React from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Typography } from "@/components/ui/typography";
import { useColors } from "@/hooks/use-colors";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { ShadowPresets, getPrimaryShadow } from "@/constants/shadows";
import { TypographyStyles } from "@/constants/typography";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  fullWidth?: boolean;
}

/**
 * 统一按钮组件
 */
export function Button({
  variant = "primary",
  size = "md",
  children,
  disabled,
  style,
  textStyle,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const colors = useColors();

  // 根据变体获取样式
  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case "primary":
        return {
          container: {
            backgroundColor: disabled ? colors.muted + "33" : colors.primary,
            ...(disabled ? {} : getPrimaryShadow(colors.primary)),
          },
          text: {
            color: disabled ? colors.muted : getContrastColor(colors.primary),
          },
        };
      case "secondary":
        return {
          container: {
            backgroundColor: "transparent",
            borderWidth: 1.5,
            borderColor: disabled ? colors.muted + "66" : colors.primary,
          },
          text: {
            color: disabled ? colors.muted : colors.primary,
          },
        };
      case "tertiary":
        return {
          container: {
            backgroundColor: disabled ? "transparent" : colors.surface + "CC",
            borderWidth: 1,
            borderColor: disabled ? colors.border : colors.border + "80",
          },
          text: {
            color: disabled ? colors.muted : colors.foreground,
          },
        };
      case "ghost":
        return {
          container: {
            backgroundColor: "transparent",
          },
          text: {
            color: disabled ? colors.muted : colors.foreground,
          },
        };
      default:
        return {
          container: {},
          text: {},
        };
    }
  };

  // 根据尺寸获取样式
  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case "sm":
        return {
          container: {
            paddingVertical: Spacing.sm,
            paddingHorizontal: Spacing.md,
            borderRadius: BorderRadiusPresets.button,
          },
          text: {
            ...TypographyStyles.caption,
          },
        };
      case "md":
        return {
          container: {
            paddingVertical: SpacingPresets.buttonPaddingVertical,
            paddingHorizontal: SpacingPresets.buttonPaddingHorizontal,
            borderRadius: BorderRadiusPresets.button,
          },
          text: {
            ...TypographyStyles.body,
            fontWeight: TypographyStyles.heading.fontWeight,
          },
        };
      case "lg":
        return {
          container: {
            paddingVertical: Spacing.lg,
            paddingHorizontal: Spacing.xl,
            borderRadius: BorderRadiusPresets.buttonLarge,
          },
          text: {
            ...TypographyStyles.heading,
          },
        };
      default:
        return {
          container: {},
          text: {},
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const containerStyle: ViewStyle = {
    ...sizeStyles.container,
    ...variantStyles.container,
    ...(fullWidth ? { width: "100%" } : {}),
    alignItems: "center",
    justifyContent: "center",
  };

  const textStyleFinal: TextStyle = {
    ...sizeStyles.text,
    ...variantStyles.text,
    textAlign: "center",
  };

  // 简单的对比色计算（用于主按钮）
  function getContrastColor(bgColor: string): string {
    // 对于主色 #0a7ea4，使用深色文字
    if (bgColor === "#0a7ea4" || bgColor.includes("#0a7ea4")) {
      return "#FFFFFF";
    }
    // 默认返回白色
    return "#FFFFFF";
  }

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {typeof children === "string" ? (
        <Typography
          variant={size === "sm" ? "caption" : size === "lg" ? "heading" : "body"}
          style={[textStyleFinal, textStyle]}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

/**
 * 预设按钮组件 - 方便使用
 */
export const PrimaryButton = React.memo((props: Omit<ButtonProps, "variant">) => (
  <Button variant="primary" {...props} />
));

export const SecondaryButton = React.memo((props: Omit<ButtonProps, "variant">) => (
  <Button variant="secondary" {...props} />
));

export const TertiaryButton = React.memo((props: Omit<ButtonProps, "variant">) => (
  <Button variant="tertiary" {...props} />
));

export const GhostButton = React.memo((props: Omit<ButtonProps, "variant">) => (
  <Button variant="ghost" {...props} />
));

PrimaryButton.displayName = "Button.Primary";
SecondaryButton.displayName = "Button.Secondary";
TertiaryButton.displayName = "Button.Tertiary";
GhostButton.displayName = "Button.Ghost";
