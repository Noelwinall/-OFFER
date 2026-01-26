import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle, Rect, Defs, RadialGradient, Stop, G, Polygon } from "react-native-svg";
import { useColors } from "@/hooks/use-colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type IconDesignStyle = "minimal" | "balanced" | "single-focus" | "geometric";

interface HomeHeroIconsProps {
  style?: IconDesignStyle;
  children: React.ReactNode;
}

/**
 * 🎓 首页图标设计背景
 * 基于教育主题图标，但更克制、更大气
 */
export function HomeHeroIcons({
  style = "balanced",
  children,
}: HomeHeroIconsProps) {
  return (
    <View style={styles.container}>
      {/* Background Layer */}
      {style === "minimal" && <MinimalIconsBackground />}
      {style === "balanced" && <BalancedIconsBackground />}
      {style === "single-focus" && <SingleFocusBackground />}
      {style === "geometric" && <GeometricIconsBackground />}

      {/* Content Layer */}
      <View style={styles.contentLayer}>{children}</View>
    </View>
  );
}

/**
 * Option A: 极简版 - 只有 2-3 个核心图标
 * 【推荐】最克制，不会太乱
 */
function MinimalIconsBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 统一底色 */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FAF8F5" }]} />

      {/* 深色蒙层 */}
      <LinearGradient
        colors={["rgba(15, 22, 41, 0.92)", "rgba(30, 58, 95, 0.85)", "rgba(44, 74, 110, 0.7)", "rgba(30, 58, 95, 0.4)", "rgba(250, 248, 245, 0)"]}
        locations={[0, 0.3, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          {/* 图标发光效果 */}
          <RadialGradient id="iconGlow" cx="50%" cy="50%">
            <Stop offset="0%" stopColor="#D4B896" stopOpacity="0.4" />
            <Stop offset="50%" stopColor="#D4B896" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 图标 1: 毕业帽（右上角）- 大而显眼 */}
        <G opacity="0.25">
          <Circle cx={SCREEN_WIDTH * 0.8} cy={SCREEN_HEIGHT * 0.18} r="100" fill="url(#iconGlow)" />
          
          {/* 帽子顶部 */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.68} ${SCREEN_HEIGHT * 0.18}
                L ${SCREEN_WIDTH * 0.8} ${SCREEN_HEIGHT * 0.14}
                L ${SCREEN_WIDTH * 0.92} ${SCREEN_HEIGHT * 0.18}
                L ${SCREEN_WIDTH * 0.8} ${SCREEN_HEIGHT * 0.21}
                Z`}
            fill="none"
            stroke="#D4B896"
            strokeWidth="2.5"
          />
          
          {/* 帽檐 */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.66} ${SCREEN_HEIGHT * 0.205}
                Q ${SCREEN_WIDTH * 0.8} ${SCREEN_HEIGHT * 0.225},
                  ${SCREEN_WIDTH * 0.94} ${SCREEN_HEIGHT * 0.205}`}
            fill="none"
            stroke="#D4B896"
            strokeWidth="2"
          />
          
          {/* 流苏 */}
          <Rect
            x={SCREEN_WIDTH * 0.8 - 1}
            y={SCREEN_HEIGHT * 0.14}
            width="2"
            height="25"
            fill="#D4B896"
          />
          <Circle cx={SCREEN_WIDTH * 0.8} cy={SCREEN_HEIGHT * 0.14 - 6} r="3" fill="#D4B896" />
        </G>

        {/* 图标 2: 学校建筑（左下角）- 简化版 */}
        <G opacity="0.2">
          <Circle cx={SCREEN_WIDTH * 0.2} cy={SCREEN_HEIGHT * 0.75} r="90" fill="url(#iconGlow)" />
          
          {/* 建筑主体 */}
          <Rect
            x={SCREEN_WIDTH * 0.14}
            y={SCREEN_HEIGHT * 0.72}
            width="60"
            height="50"
            fill="none"
            stroke="#D4B896"
            strokeWidth="2.5"
            rx="2"
          />
          
          {/* 屋顶 */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.12} ${SCREEN_HEIGHT * 0.72}
                L ${SCREEN_WIDTH * 0.17} ${SCREEN_HEIGHT * 0.68}
                L ${SCREEN_WIDTH * 0.22} ${SCREEN_HEIGHT * 0.72}
                Z`}
            fill="none"
            stroke="#D4B896"
            strokeWidth="2"
          />
          
          {/* 门 */}
          <Rect
            x={SCREEN_WIDTH * 0.16}
            y={SCREEN_HEIGHT * 0.76}
            width="12"
            height="18"
            fill="none"
            stroke="#D4B896"
            strokeWidth="1.5"
          />
        </G>

        {/* 星光点缀 - 极少量 */}
        <G opacity="0.4">
          <Circle cx={SCREEN_WIDTH * 0.3} cy={SCREEN_HEIGHT * 0.15} r="2" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.65} cy={SCREEN_HEIGHT * 0.3} r="1.5" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.85} cy={SCREEN_HEIGHT * 0.65} r="2" fill="#8B7355" />
        </G>
      </Svg>
    </View>
  );
}

/**
 * Option B: 平衡版 - 4-5 个图标，布局合理
 * 适中的视觉密度
 */
function BalancedIconsBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 统一底色 */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FAF8F5" }]} />

      {/* 深色蒙层 */}
      <LinearGradient
        colors={["rgba(15, 22, 41, 0.92)", "rgba(30, 58, 95, 0.85)", "rgba(44, 74, 110, 0.7)", "rgba(30, 58, 95, 0.4)", "rgba(250, 248, 245, 0)"]}
        locations={[0, 0.3, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="iconGlow2" cx="50%" cy="50%">
            <Stop offset="0%" stopColor="#D4B896" stopOpacity="0.35" />
            <Stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 图标 1: 毕业帽（右上）*/}
        <G opacity="0.22">
          <Circle cx={SCREEN_WIDTH * 0.85} cy={SCREEN_HEIGHT * 0.15} r="70" fill="url(#iconGlow2)" />
          <Path
            d={`M ${SCREEN_WIDTH * 0.77} ${SCREEN_HEIGHT * 0.15}
                L ${SCREEN_WIDTH * 0.85} ${SCREEN_HEIGHT * 0.12}
                L ${SCREEN_WIDTH * 0.93} ${SCREEN_HEIGHT * 0.15}
                L ${SCREEN_WIDTH * 0.85} ${SCREEN_HEIGHT * 0.17}
                Z`}
            fill="none"
            stroke="#D4B896"
            strokeWidth="2"
          />
          <Path
            d={`M ${SCREEN_WIDTH * 0.76} ${SCREEN_HEIGHT * 0.17}
                Q ${SCREEN_WIDTH * 0.85} ${SCREEN_HEIGHT * 0.185},
                  ${SCREEN_WIDTH * 0.94} ${SCREEN_HEIGHT * 0.17}`}
            fill="none"
            stroke="#D4B896"
            strokeWidth="1.8"
          />
        </G>

        {/* 图标 2: 书本（左上）*/}
        <G opacity="0.18">
          <Circle cx={SCREEN_WIDTH * 0.15} cy={SCREEN_HEIGHT * 0.2} r="60" fill="url(#iconGlow2)" />
          <Rect
            x={SCREEN_WIDTH * 0.1}
            y={SCREEN_HEIGHT * 0.18}
            width="40"
            height="30"
            fill="none"
            stroke="#D4B896"
            strokeWidth="2"
            rx="2"
          />
          <Path
            d={`M ${SCREEN_WIDTH * 0.13} ${SCREEN_HEIGHT * 0.18}
                L ${SCREEN_WIDTH * 0.13} ${SCREEN_HEIGHT * 0.23}`}
            stroke="#D4B896"
            strokeWidth="1.5"
          />
        </G>

        {/* 图标 3: 学校建筑（左下）*/}
        <G opacity="0.2">
          <Circle cx={SCREEN_WIDTH * 0.18} cy={SCREEN_HEIGHT * 0.78} r="75" fill="url(#iconGlow2)" />
          <Rect
            x={SCREEN_WIDTH * 0.13}
            y={SCREEN_HEIGHT * 0.75}
            width="50"
            height="40"
            fill="none"
            stroke="#D4B896"
            strokeWidth="2"
            rx="2"
          />
          <Path
            d={`M ${SCREEN_WIDTH * 0.11} ${SCREEN_HEIGHT * 0.75}
                L ${SCREEN_WIDTH * 0.155} ${SCREEN_HEIGHT * 0.72}
                L ${SCREEN_WIDTH * 0.2} ${SCREEN_HEIGHT * 0.75}
                Z`}
            fill="none"
            stroke="#D4B896"
            strokeWidth="1.8"
          />
        </G>

        {/* 图标 4: 文凭卷轴（右下）*/}
        <G opacity="0.18">
          <Circle cx={SCREEN_WIDTH * 0.82} cy={SCREEN_HEIGHT * 0.82} r="65" fill="url(#iconGlow2)" />
          <Rect
            x={SCREEN_WIDTH * 0.78}
            y={SCREEN_HEIGHT * 0.8}
            width="35"
            height="8"
            fill="none"
            stroke="#D4B896"
            strokeWidth="2"
            rx="4"
          />
          <Path
            d={`M ${SCREEN_WIDTH * 0.805} ${SCREEN_HEIGHT * 0.795}
                L ${SCREEN_WIDTH * 0.795} ${SCREEN_HEIGHT * 0.81}
                M ${SCREEN_WIDTH * 0.805} ${SCREEN_HEIGHT * 0.81}
                L ${SCREEN_WIDTH * 0.795} ${SCREEN_HEIGHT * 0.795}`}
            stroke="#D4B896"
            strokeWidth="1.5"
          />
        </G>

        {/* 星光点缀 - 少量 */}
        <G opacity="0.35">
          <Circle cx={SCREEN_WIDTH * 0.25} cy={SCREEN_HEIGHT * 0.12} r="1.8" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.5} cy={SCREEN_HEIGHT * 0.25} r="1.5" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.7} cy={SCREEN_HEIGHT * 0.35} r="2" fill="#8B7355" />
          <Circle cx={SCREEN_WIDTH * 0.4} cy={SCREEN_HEIGHT * 0.7} r="1.5" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.6} cy={SCREEN_HEIGHT * 0.85} r="1.8" fill="#8B7355" />
        </G>
      </Svg>
    </View>
  );
}

/**
 * Option C: 单一焦点 - 一个大图标作为视觉中心
 * 最大气，最简洁
 */
function SingleFocusBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 统一底色 */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FAF8F5" }]} />

      {/* 深色蒙层 */}
      <LinearGradient
        colors={["rgba(15, 22, 41, 0.92)", "rgba(30, 58, 95, 0.85)", "rgba(44, 74, 110, 0.7)", "rgba(30, 58, 95, 0.4)", "rgba(250, 248, 245, 0)"]}
        locations={[0, 0.3, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="centerGlow" cx="50%" cy="50%">
            <Stop offset="0%" stopColor="#D4B896" stopOpacity="0.25" />
            <Stop offset="50%" stopColor="#D4B896" stopOpacity="0.12" />
            <Stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 超大毕业帽 - 中心偏上 */}
        <G opacity="0.15">
          <Circle cx={SCREEN_WIDTH * 0.5} cy={SCREEN_HEIGHT * 0.3} r="200" fill="url(#centerGlow)" />
          
          {/* 帽子顶部 - 放大版 */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.3} ${SCREEN_HEIGHT * 0.3}
                L ${SCREEN_WIDTH * 0.5} ${SCREEN_HEIGHT * 0.22}
                L ${SCREEN_WIDTH * 0.7} ${SCREEN_HEIGHT * 0.3}
                L ${SCREEN_WIDTH * 0.5} ${SCREEN_HEIGHT * 0.35}
                Z`}
            fill="none"
            stroke="#D4B896"
            strokeWidth="3"
          />
          
          {/* 帽檐 */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.25} ${SCREEN_HEIGHT * 0.36}
                Q ${SCREEN_WIDTH * 0.5} ${SCREEN_HEIGHT * 0.4},
                  ${SCREEN_WIDTH * 0.75} ${SCREEN_HEIGHT * 0.36}`}
            fill="none"
            stroke="#D4B896"
            strokeWidth="2.5"
          />
          
          {/* 流苏 */}
          <Rect
            x={SCREEN_WIDTH * 0.5 - 1.5}
            y={SCREEN_HEIGHT * 0.22}
            width="3"
            height="40"
            fill="#D4B896"
          />
          <Circle cx={SCREEN_WIDTH * 0.5} cy={SCREEN_HEIGHT * 0.22 - 10} r="5" fill="#D4B896" />
        </G>

        {/* 微妙的星光 - 极少 */}
        <G opacity="0.3">
          <Circle cx={SCREEN_WIDTH * 0.2} cy={SCREEN_HEIGHT * 0.15} r="2" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.8} cy={SCREEN_HEIGHT * 0.2} r="2" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.3} cy={SCREEN_HEIGHT * 0.65} r="1.5" fill="#8B7355" />
        </G>
      </Svg>
    </View>
  );
}

/**
 * Option D: 几何抽象 - 抽象化的教育元素
 * 最现代，避免具象图标
 */
function GeometricIconsBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 统一底色 */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FAF8F5" }]} />

      {/* 深色蒙层 */}
      <LinearGradient
        colors={["rgba(15, 22, 41, 0.92)", "rgba(30, 58, 95, 0.85)", "rgba(44, 74, 110, 0.7)", "rgba(30, 58, 95, 0.4)", "rgba(250, 248, 245, 0)"]}
        locations={[0, 0.3, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="geoGlow" cx="50%" cy="50%">
            <Stop offset="0%" stopColor="#D4B896" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 抽象三角形 - 象征知识金字塔（右上）*/}
        <G opacity="0.2">
          <Circle cx={SCREEN_WIDTH * 0.8} cy={SCREEN_HEIGHT * 0.18} r="80" fill="url(#geoGlow)" />
          <Path
            d={`M ${SCREEN_WIDTH * 0.8} ${SCREEN_HEIGHT * 0.12}
                L ${SCREEN_WIDTH * 0.88} ${SCREEN_HEIGHT * 0.24}
                L ${SCREEN_WIDTH * 0.72} ${SCREEN_HEIGHT * 0.24}
                Z`}
            fill="none"
            stroke="#D4B896"
            strokeWidth="2.5"
          />
        </G>

        {/* 抽象圆环 - 象征完整教育（左上）*/}
        <G opacity="0.18">
          <Circle cx={SCREEN_WIDTH * 0.2} cy={SCREEN_HEIGHT * 0.22} r="70" fill="url(#geoGlow)" />
          <Circle
            cx={SCREEN_WIDTH * 0.2}
            cy={SCREEN_HEIGHT * 0.22}
            r="30"
            fill="none"
            stroke="#D4B896"
            strokeWidth="2.5"
          />
          <Circle
            cx={SCREEN_WIDTH * 0.2}
            cy={SCREEN_HEIGHT * 0.22}
            r="20"
            fill="none"
            stroke="#D4B896"
            strokeWidth="1.5"
          />
        </G>

        {/* 抽象方形 - 象征基础（左下）*/}
        <G opacity="0.2">
          <Circle cx={SCREEN_WIDTH * 0.2} cy={SCREEN_HEIGHT * 0.78} r="75" fill="url(#geoGlow)" />
          <Rect
            x={SCREEN_WIDTH * 0.17}
            y={SCREEN_HEIGHT * 0.75}
            width="35"
            height="35"
            fill="none"
            stroke="#D4B896"
            strokeWidth="2.5"
            rx="4"
          />
        </G>

        {/* 抽象星形 - 象征成就（右下）*/}
        <G opacity="0.18">
          <Circle cx={SCREEN_WIDTH * 0.82} cy={SCREEN_HEIGHT * 0.8} r="70" fill="url(#geoGlow)" />
          <Polygon
            points={`
              ${SCREEN_WIDTH * 0.82},${SCREEN_HEIGHT * 0.75}
              ${SCREEN_WIDTH * 0.84},${SCREEN_HEIGHT * 0.79}
              ${SCREEN_WIDTH * 0.88},${SCREEN_HEIGHT * 0.8}
              ${SCREEN_WIDTH * 0.85},${SCREEN_HEIGHT * 0.82}
              ${SCREEN_WIDTH * 0.86},${SCREEN_HEIGHT * 0.86}
              ${SCREEN_WIDTH * 0.82},${SCREEN_HEIGHT * 0.84}
              ${SCREEN_WIDTH * 0.78},${SCREEN_HEIGHT * 0.86}
              ${SCREEN_WIDTH * 0.79},${SCREEN_HEIGHT * 0.82}
              ${SCREEN_WIDTH * 0.76},${SCREEN_HEIGHT * 0.8}
              ${SCREEN_WIDTH * 0.8},${SCREEN_HEIGHT * 0.79}
            `}
            fill="none"
            stroke="#D4B896"
            strokeWidth="2"
          />
        </G>

        {/* 微妙的点缀 */}
        <G opacity="0.3">
          <Circle cx={SCREEN_WIDTH * 0.5} cy={SCREEN_HEIGHT * 0.15} r="2" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.45} cy={SCREEN_HEIGHT * 0.5} r="1.5" fill="#8B7355" />
          <Circle cx={SCREEN_WIDTH * 0.55} cy={SCREEN_HEIGHT * 0.85} r="2" fill="#D4B896" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  contentLayer: {
    flex: 1,
    zIndex: 1,
  },
});
