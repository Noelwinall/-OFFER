/**
 * Typography Components - 统一文字样式组件
 * 提供预设的文字样式组件，确保全站字体一致性
 */

import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { TypographyStyles } from "@/constants/typography";
import { useColors } from "@/hooks/use-colors";

type TypographyVariant = "title" | "heading" | "body" | "caption" | "small" | "tiny";

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: "foreground" | "muted" | "primary" | "inherit";
  children: React.ReactNode;
}

/**
 * 基础 Typography 组件
 */
export function Typography({
  variant = "body",
  color = "foreground",
  style,
  children,
  ...props
}: TypographyProps) {
  const colors = useColors();
  
  const colorValue = 
    color === "foreground" ? colors.foreground :
    color === "muted" ? colors.muted :
    color === "primary" ? colors.primary :
    undefined;

  return (
    <Text
      style={[
        TypographyStyles[variant],
        colorValue ? { color: colorValue } : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

/**
 * 预设样式组件 - 方便使用
 */
export const Title = React.memo((props: Omit<TypographyProps, "variant">) => (
  <Typography variant="title" {...props} />
));

export const Heading = React.memo((props: Omit<TypographyProps, "variant">) => (
  <Typography variant="heading" {...props} />
));

export const Body = React.memo((props: Omit<TypographyProps, "variant">) => (
  <Typography variant="body" {...props} />
));

export const Caption = React.memo((props: Omit<TypographyProps, "variant">) => (
  <Typography variant="caption" {...props} />
));

export const Small = React.memo((props: Omit<TypographyProps, "variant">) => (
  <Typography variant="small" {...props} />
));

export const Tiny = React.memo((props: Omit<TypographyProps, "variant">) => (
  <Typography variant="tiny" {...props} />
));

// 设置显示名称以便调试
Title.displayName = "Typography.Title";
Heading.displayName = "Typography.Heading";
Body.displayName = "Typography.Body";
Caption.displayName = "Typography.Caption";
Small.displayName = "Typography.Small";
Tiny.displayName = "Typography.Tiny";
