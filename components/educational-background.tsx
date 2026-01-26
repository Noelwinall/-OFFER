import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Rect, Path, G, Defs, Pattern, Line } from "react-native-svg";
import { useColors } from "@/hooks/use-colors";

type BackgroundPattern = "books" | "geometric" | "dots" | "minimal" | "campus";

interface EducationalBackgroundProps {
  pattern?: BackgroundPattern;
  children: React.ReactNode;
}

/**
 * 🎓 Educational Background Component
 * Provides subtle, elegant background patterns for the Ivy League theme
 */
export function EducationalBackground({
  pattern = "geometric",
  children,
}: EducationalBackgroundProps) {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Background Pattern Layer */}
      <View style={styles.patternLayer}>
        {pattern === "books" && <BooksPattern />}
        {pattern === "geometric" && <GeometricPattern />}
        {pattern === "dots" && <DotsPattern />}
        {pattern === "minimal" && <MinimalPattern />}
        {pattern === "campus" && <CampusPattern />}
      </View>

      {/* Content Layer */}
      <View style={styles.contentLayer}>{children}</View>
    </View>
  );
}

/**
 * Pattern 1: Books - Subtle book shapes scattered
 */
function BooksPattern() {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern
          id="booksPattern"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          {/* Book 1 */}
          <Rect x="20" y="30" width="30" height="40" fill="#E8E2D5" opacity="0.15" rx="2" />
          <Rect x="21" y="31" width="28" height="2" fill="#D4B896" opacity="0.2" />
          
          {/* Book 2 */}
          <Rect x="140" y="90" width="25" height="35" fill="#E8E2D5" opacity="0.12" rx="2" />
          <Rect x="141" y="91" width="23" height="2" fill="#D4B896" opacity="0.18" />
          
          {/* Book 3 - tilted */}
          <G rotation="-15" origin="80, 160">
            <Rect x="70" y="150" width="28" height="38" fill="#E8E2D5" opacity="0.1" rx="2" />
          </G>
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#booksPattern)" />
    </Svg>
  );
}

/**
 * Pattern 2: Geometric - Clean geometric shapes (recommended)
 */
function GeometricPattern() {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern
          id="geometricPattern"
          x="0"
          y="0"
          width="300"
          height="300"
          patternUnits="userSpaceOnUse"
        >
          {/* Large circle */}
          <Circle cx="250" cy="50" r="80" fill="none" stroke="#E8E2D5" strokeWidth="1" opacity="0.15" />
          
          {/* Small circles */}
          <Circle cx="50" cy="120" r="30" fill="none" stroke="#D4B896" strokeWidth="1" opacity="0.12" />
          <Circle cx="180" cy="200" r="40" fill="none" stroke="#E8E2D5" strokeWidth="1" opacity="0.1" />
          
          {/* Triangles (education = knowledge pyramid) */}
          <Path
            d="M 100 180 L 120 140 L 140 180 Z"
            fill="none"
            stroke="#8B7355"
            strokeWidth="1"
            opacity="0.08"
          />
          
          {/* Small dots for texture */}
          <Circle cx="30" cy="30" r="2" fill="#D4B896" opacity="0.15" />
          <Circle cx="160" cy="80" r="2" fill="#D4B896" opacity="0.12" />
          <Circle cx="90" cy="260" r="2" fill="#E8E2D5" opacity="0.15" />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#geometricPattern)" />
    </Svg>
  );
}

/**
 * Pattern 3: Dots - Subtle dot grid (most minimal)
 */
function DotsPattern() {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern
          id="dotsPattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <Circle cx="20" cy="20" r="1.5" fill="#D4B896" opacity="0.15" />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#dotsPattern)" />
    </Svg>
  );
}

/**
 * Pattern 4: Minimal - Very subtle lines
 */
function MinimalPattern() {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern
          id="minimalPattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <Line x1="0" y1="50" x2="100" y2="50" stroke="#E8E2D5" strokeWidth="1" opacity="0.08" />
          <Line x1="50" y1="0" x2="50" y2="100" stroke="#E8E2D5" strokeWidth="1" opacity="0.08" />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#minimalPattern)" />
    </Svg>
  );
}

/**
 * Pattern 5: Campus - Abstract building silhouettes
 */
function CampusPattern() {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern
          id="campusPattern"
          x="0"
          y="0"
          width="400"
          height="300"
          patternUnits="userSpaceOnUse"
        >
          {/* Building 1 */}
          <Rect x="50" y="180" width="60" height="100" fill="#E8E2D5" opacity="0.08" />
          <Rect x="65" y="195" width="10" height="15" fill="#D4B896" opacity="0.1" />
          <Rect x="85" y="195" width="10" height="15" fill="#D4B896" opacity="0.1" />
          
          {/* Building 2 - taller */}
          <Rect x="250" y="140" width="50" height="140" fill="#E8E2D5" opacity="0.06" />
          <Circle cx="275" cy="160" r="8" fill="#D4B896" opacity="0.08" />
          
          {/* Graduation cap symbol */}
          <Path
            d="M 150 80 L 180 70 L 210 80 L 180 90 Z"
            fill="#8B7355"
            opacity="0.06"
          />
          <Rect x="178" y="80" width="4" height="30" fill="#8B7355" opacity="0.06" />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#campusPattern)" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  patternLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  contentLayer: {
    flex: 1,
    zIndex: 1,
  },
});
