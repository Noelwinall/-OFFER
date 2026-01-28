import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle, Rect, Defs, RadialGradient, Stop, G, Line, Text as SvgText } from "react-native-svg";
import { useColors } from "@/hooks/use-colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type HeroStyle = "elegant" | "skyline" | "abstract" | "premium" | "infographic";

interface HomeHeroBackgroundProps {
  style?: HeroStyle;
  children: React.ReactNode;
}

/**
 * 🏛️ 首页专用 Hero Background
 * 大气、专业、令人印象深刻的背景设计
 */
export function HomeHeroBackground({
  style = "elegant",
  children,
}: HomeHeroBackgroundProps) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      {/* Background Layer */}
      {style === "elegant" && <ElegantBackground />}
      {style === "skyline" && <SkylineBackground />}
      {style === "abstract" && <AbstractBackground />}
      {style === "premium" && <PremiumBackground />}
      {style === "infographic" && <InfographicBackground />}

      {/* Content Layer */}
      <View style={styles.contentLayer}>{children}</View>
    </View>
  );
}

/**
 * Style 1: Elegant - 优雅光影渐变 + 大气设计图
 * 【推荐】最大气，类似高端教育品牌
 * 核心设计图：抽象的知识树/成长阶梯/学术殿堂
 */
function ElegantBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 统一底色 - Ivy League Cream */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FAF8F5" }]} />

      {/* 深色蒙层渐变 - 从上到下逐渐透明 */}
      <LinearGradient
        colors={["rgba(15, 22, 41, 0.92)", "rgba(30, 58, 95, 0.85)", "rgba(44, 74, 110, 0.7)", "rgba(30, 58, 95, 0.4)", "rgba(250, 248, 245, 0)"]}
        locations={[0, 0.3, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* SVG 设计图层 - 大气视觉元素 */}
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          {/* 柔和光晕 */}
          <RadialGradient id="glow1" cx="30%" cy="15%">
            <Stop offset="0%" stopColor="#D4B896" stopOpacity="0.2" />
            <Stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="glow2" cx="70%" cy="85%">
            <Stop offset="0%" stopColor="#8B7355" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#8B7355" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 背景光晕 */}
        <Circle cx={SCREEN_WIDTH * 0.3} cy={SCREEN_HEIGHT * 0.15} r="280" fill="url(#glow1)" />
        <Circle cx={SCREEN_WIDTH * 0.7} cy={SCREEN_HEIGHT * 0.85} r="200" fill="url(#glow2)" />

        {/* 🎓 核心设计图：抽象知识阶梯/成长之路 */}
        <G opacity="0.12">
          {/* 阶梯式上升图案 - 象征教育进阶 */}
          {/* 第一级台阶 */}
          <Rect
            x={SCREEN_WIDTH * 0.65}
            y={SCREEN_HEIGHT * 0.75}
            width="120"
            height="8"
            fill="#D4B896"
            rx="4"
          />
          {/* 第二级台阶 */}
          <Rect
            x={SCREEN_WIDTH * 0.7}
            y={SCREEN_HEIGHT * 0.68}
            width="100"
            height="8"
            fill="#D4B896"
            rx="4"
          />
          {/* 第三级台阶 */}
          <Rect
            x={SCREEN_WIDTH * 0.75}
            y={SCREEN_HEIGHT * 0.61}
            width="80"
            height="8"
            fill="#D4B896"
            rx="4"
          />
          {/* 第四级台阶 */}
          <Rect
            x={SCREEN_WIDTH * 0.8}
            y={SCREEN_HEIGHT * 0.54}
            width="60"
            height="8"
            fill="#D4B896"
            rx="4"
          />
        </G>

        {/* 🏛️ 抽象学术殿堂柱子 - 左侧装饰 */}
        <G opacity="0.08">
          <Rect x="40" y={SCREEN_HEIGHT * 0.6} width="6" height={SCREEN_HEIGHT * 0.3} fill="#8B7355" rx="3" />
          <Rect x="70" y={SCREEN_HEIGHT * 0.55} width="6" height={SCREEN_HEIGHT * 0.35} fill="#8B7355" rx="3" />
          <Rect x="100" y={SCREEN_HEIGHT * 0.6} width="6" height={SCREEN_HEIGHT * 0.3} fill="#8B7355" rx="3" />
          
          {/* 柱顶装饰 */}
          <Rect x="30" y={SCREEN_HEIGHT * 0.58} width="90" height="4" fill="#D4B896" rx="2" />
        </G>

        {/* 📚 抽象书本堆叠 - 右下角 */}
        <G opacity="0.1">
          {/* 书本 1 */}
          <Rect
            x={SCREEN_WIDTH - 180}
            y={SCREEN_HEIGHT * 0.8}
            width="140"
            height="18"
            fill="#D4B896"
            rx="3"
          />
          <Line
            x1={SCREEN_WIDTH - 180}
            y1={SCREEN_HEIGHT * 0.8 + 2}
            x2={SCREEN_WIDTH - 40}
            y2={SCREEN_HEIGHT * 0.8 + 2}
            stroke="#8B7355"
            strokeWidth="1"
            opacity="0.3"
          />
          
          {/* 书本 2 */}
          <Rect
            x={SCREEN_WIDTH - 170}
            y={SCREEN_HEIGHT * 0.84}
            width="130"
            height="16"
            fill="#8B7355"
            rx="3"
          />
          
          {/* 书本 3 */}
          <Rect
            x={SCREEN_WIDTH - 160}
            y={SCREEN_HEIGHT * 0.88}
            width="120"
            height="14"
            fill="#D4B896"
            rx="3"
          />
        </G>

        {/* ⭐ 成就之星 - 顶部点缀 */}
        <G opacity="0.15">
          {/* 大星星 */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.85} ${SCREEN_HEIGHT * 0.12} 
                L ${SCREEN_WIDTH * 0.86} ${SCREEN_HEIGHT * 0.14}
                L ${SCREEN_WIDTH * 0.88} ${SCREEN_HEIGHT * 0.14}
                L ${SCREEN_WIDTH * 0.865} ${SCREEN_HEIGHT * 0.155}
                L ${SCREEN_WIDTH * 0.875} ${SCREEN_HEIGHT * 0.175}
                L ${SCREEN_WIDTH * 0.85} ${SCREEN_HEIGHT * 0.16}
                L ${SCREEN_WIDTH * 0.825} ${SCREEN_HEIGHT * 0.175}
                L ${SCREEN_WIDTH * 0.835} ${SCREEN_HEIGHT * 0.155}
                L ${SCREEN_WIDTH * 0.82} ${SCREEN_HEIGHT * 0.14}
                L ${SCREEN_WIDTH * 0.84} ${SCREEN_HEIGHT * 0.14} Z`}
            fill="#D4B896"
          />
          
          {/* 小星星点缀 */}
          <Circle cx={SCREEN_WIDTH * 0.75} cy={SCREEN_HEIGHT * 0.1} r="3" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.92} cy={SCREEN_HEIGHT * 0.15} r="2" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.88} cy={SCREEN_HEIGHT * 0.08} r="2.5" fill="#8B7355" />
        </G>

        {/* 🔗 连接线 - 象征知识网络 */}
        <G opacity="0.06">
          <Line
            x1={SCREEN_WIDTH * 0.2}
            y1={SCREEN_HEIGHT * 0.3}
            x2={SCREEN_WIDTH * 0.4}
            y2={SCREEN_HEIGHT * 0.25}
            stroke="#D4B896"
            strokeWidth="1.5"
            strokeDasharray="5,5"
          />
          <Line
            x1={SCREEN_WIDTH * 0.4}
            y1={SCREEN_HEIGHT * 0.25}
            x2={SCREEN_WIDTH * 0.6}
            y2={SCREEN_HEIGHT * 0.3}
            stroke="#D4B896"
            strokeWidth="1.5"
            strokeDasharray="5,5"
          />
          <Circle cx={SCREEN_WIDTH * 0.2} cy={SCREEN_HEIGHT * 0.3} r="4" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.4} cy={SCREEN_HEIGHT * 0.25} r="4" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.6} cy={SCREEN_HEIGHT * 0.3} r="4" fill="#D4B896" />
        </G>

        {/* 精致线条装饰 - 右上角 */}
        <G opacity="0.08">
          <Line
            x1={SCREEN_WIDTH * 0.75}
            y1="60"
            x2={SCREEN_WIDTH - 40}
            y2="60"
            stroke="#D4B896"
            strokeWidth="1"
          />
          <Line
            x1={SCREEN_WIDTH * 0.8}
            y1="80"
            x2={SCREEN_WIDTH - 40}
            y2="80"
            stroke="#8B7355"
            strokeWidth="0.5"
          />
        </G>

        {/* 精致线条装饰 - 左下角 */}
        <G opacity="0.06">
          <Line
            x1="40"
            y1={SCREEN_HEIGHT - 100}
            x2={SCREEN_WIDTH * 0.25}
            y2={SCREEN_HEIGHT - 100}
            stroke="#8B7355"
            strokeWidth="1"
          />
          <Line
            x1="40"
            y1={SCREEN_HEIGHT - 120}
            x2={SCREEN_WIDTH * 0.2}
            y2={SCREEN_HEIGHT - 120}
            stroke="#8B7355"
            strokeWidth="0.5"
          />
        </G>
      </Svg>
    </View>
  );
}

/**
 * Style 2: Skyline - 香港天际线剪影 + 教育元素
 * 本地化特色，有城市感，统一底色方案
 */
function SkylineBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 统一底色 - Ivy League Cream */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FAF8F5" }]} />

      {/* 深色蒙层渐变 - 夜空效果 */}
      <LinearGradient
        colors={["rgba(10, 14, 26, 0.95)", "rgba(30, 58, 95, 0.88)", "rgba(44, 74, 110, 0.75)", "rgba(30, 58, 95, 0.45)", "rgba(250, 248, 245, 0)"]}
        locations={[0, 0.35, 0.6, 0.85, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="moonGlow" cx="50%" cy="20%">
            <Stop offset="0%" stopColor="#D4B896" stopOpacity="0.25" />
            <Stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 月亮光晕（象征希望/未来） */}
        <Circle cx={SCREEN_WIDTH * 0.8} cy={SCREEN_HEIGHT * 0.15} r="200" fill="url(#moonGlow)" />
        <Circle cx={SCREEN_WIDTH * 0.8} cy={SCREEN_HEIGHT * 0.15} r="35" fill="#D4B896" opacity="0.35" />

        {/* 抽象城市剪影 - 底部 */}
        <G opacity="0.18">
          {/* 建筑物剪影 - 简化但大气 */}
          <Rect x="0" y={SCREEN_HEIGHT * 0.75} width="80" height={SCREEN_HEIGHT * 0.25} fill="#8B7355" />
          <Rect x="100" y={SCREEN_HEIGHT * 0.68} width="60" height={SCREEN_HEIGHT * 0.32} fill="#8B7355" />
          <Rect x="180" y={SCREEN_HEIGHT * 0.72} width="90" height={SCREEN_HEIGHT * 0.28} fill="#8B7355" />
          <Rect x="290" y={SCREEN_HEIGHT * 0.65} width="70" height={SCREEN_HEIGHT * 0.35} fill="#8B7355" />
          
          {/* 右侧建筑群 */}
          <Rect x={SCREEN_WIDTH - 100} y={SCREEN_HEIGHT * 0.7} width="100" height={SCREEN_HEIGHT * 0.3} fill="#8B7355" />
          <Rect x={SCREEN_WIDTH - 220} y={SCREEN_HEIGHT * 0.73} width="80" height={SCREEN_HEIGHT * 0.27} fill="#8B7355" />
        </G>

        {/* 星星点缀（象征梦想） */}
        <G opacity="0.7">
          <Circle cx={SCREEN_WIDTH * 0.2} cy={SCREEN_HEIGHT * 0.1} r="2" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.35} cy={SCREEN_HEIGHT * 0.15} r="1.5" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.15} cy={SCREEN_HEIGHT * 0.25} r="1.8" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.6} cy={SCREEN_HEIGHT * 0.08} r="1.5" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.45} cy={SCREEN_HEIGHT * 0.12} r="1.2" fill="#D4B896" />
          <Circle cx={SCREEN_WIDTH * 0.25} cy={SCREEN_HEIGHT * 0.18} r="1" fill="#8B7355" />
          <Circle cx={SCREEN_WIDTH * 0.55} cy={SCREEN_HEIGHT * 0.22} r="1.3" fill="#8B7355" />
        </G>
      </Svg>
    </View>
  );
}

/**
 * Style 3: Abstract - 现代抽象艺术
 * 大胆配色，视觉冲击力强，统一底色方案
 */
function AbstractBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 统一底色 - Ivy League Cream */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FAF8F5" }]} />

      {/* 深色蒙层渐变 - 抽象艺术感 */}
      <LinearGradient
        colors={["rgba(30, 58, 95, 0.9)", "rgba(44, 82, 130, 0.82)", "rgba(30, 58, 95, 0.65)", "rgba(250, 248, 245, 0.3)", "rgba(250, 248, 245, 0)"]}
        locations={[0, 0.3, 0.55, 0.8, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="abstractGlow1" cx="50%" cy="50%">
            <Stop offset="0%" stopColor="#D4B896" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 大型抽象图形 */}
        <Circle cx={SCREEN_WIDTH * 0.2} cy={SCREEN_HEIGHT * 0.3} r="220" fill="url(#abstractGlow1)" />
        
        {/* 流动曲线 */}
        <Path
          d={`M 0 ${SCREEN_HEIGHT * 0.4} Q ${SCREEN_WIDTH * 0.5} ${SCREEN_HEIGHT * 0.5}, ${SCREEN_WIDTH} ${SCREEN_HEIGHT * 0.45}`}
          fill="none"
          stroke="#D4B896"
          strokeWidth="2.5"
          opacity="0.18"
        />
        <Path
          d={`M 0 ${SCREEN_HEIGHT * 0.45} Q ${SCREEN_WIDTH * 0.5} ${SCREEN_HEIGHT * 0.55}, ${SCREEN_WIDTH} ${SCREEN_HEIGHT * 0.5}`}
          fill="none"
          stroke="#8B7355"
          strokeWidth="2"
          opacity="0.15"
        />

        {/* 几何碎片 */}
        <G opacity="0.12">
          <Rect
            x={SCREEN_WIDTH * 0.72}
            y={SCREEN_HEIGHT * 0.18}
            width="100"
            height="100"
            fill="#D4B896"
            rotation="45"
            origin={`${SCREEN_WIDTH * 0.77}, ${SCREEN_HEIGHT * 0.23}`}
          />
        </G>
      </Svg>
    </View>
  );
}

/**
 * Style 4: Premium - 奢华质感
 * 类似高端名片或奢侈品牌网站，统一底色方案
 */
function PremiumBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 统一底色 - Ivy League Cream */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FAF8F5" }]} />

      {/* 深色蒙层渐变 - 极简优雅 */}
      <LinearGradient
        colors={["rgba(26, 35, 49, 0.88)", "rgba(30, 58, 95, 0.75)", "rgba(26, 35, 49, 0.6)", "rgba(250, 248, 245, 0.2)", "rgba(250, 248, 245, 0)"]}
        locations={[0, 0.35, 0.6, 0.85, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        {/* 纸张纹理效果（极微妙） */}
        <Defs>
          <RadialGradient id="premiumGlow" cx="50%" cy="25%">
            <Stop offset="0%" stopColor="#D4B896" stopOpacity="0.12" />
            <Stop offset="100%" stopColor="#D4B896" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 中心光晕 */}
        <Circle cx={SCREEN_WIDTH * 0.5} cy={SCREEN_HEIGHT * 0.25} r="350" fill="url(#premiumGlow)" />

        {/* 极简线框装饰 */}
        <G opacity="0.15">
          {/* 顶部边框 */}
          <Line x1="40" y1="50" x2={SCREEN_WIDTH - 40} y2="50" stroke="#D4B896" strokeWidth="1.5" />
          
          {/* 角落装饰 - 左上 */}
          <Line x1="40" y1="50" x2="40" y2="110" stroke="#D4B896" strokeWidth="1.5" />
          <Line x1="40" y1="50" x2="100" y2="50" stroke="#D4B896" strokeWidth="1.5" />
          
          {/* 角落装饰 - 右下 */}
          <Line x1={SCREEN_WIDTH - 40} y1={SCREEN_HEIGHT - 120} x2={SCREEN_WIDTH - 40} y2={SCREEN_HEIGHT - 180} stroke="#8B7355" strokeWidth="1.5" />
          <Line x1={SCREEN_WIDTH - 40} y1={SCREEN_HEIGHT - 120} x2={SCREEN_WIDTH - 100} y2={SCREEN_HEIGHT - 120} stroke="#8B7355" strokeWidth="1.5" />
        </G>

        {/* 品牌标记（抽象学士帽图案） */}
        <G opacity="0.08">
          <Path
            d={`M ${SCREEN_WIDTH * 0.5 - 45} ${SCREEN_HEIGHT * 0.85} 
                L ${SCREEN_WIDTH * 0.5} ${SCREEN_HEIGHT * 0.8} 
                L ${SCREEN_WIDTH * 0.5 + 45} ${SCREEN_HEIGHT * 0.85} 
                L ${SCREEN_WIDTH * 0.5} ${SCREEN_HEIGHT * 0.88} Z`}
            fill="#D4B896"
          />
          <Rect
            x={SCREEN_WIDTH * 0.5 - 2.5}
            y={SCREEN_HEIGHT * 0.88}
            width="5"
            height="35"
            fill="#D4B896"
          />
        </G>
      </Svg>
    </View>
  );
}

/**
 * Style 5: Infographic - 信息图表风格
 * 使用 Gemini 生成的香港教育主题插画背景
 */
function InfographicBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 统一底色 - Ivy League Cream */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FAF8F5" }]} />

      {/* 背景图片 - 香港教育主题插画 */}
      <Image
        source={require("@/assets/images/home-hero-bg.png")}
        style={[StyleSheet.absoluteFill, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]}
        resizeMode="cover"
      />
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
