import { View, Platform, StyleSheet } from "react-native";
import type { ViewProps } from "react-native";

const isWeb = Platform.OS === "web";

interface MaxWidthWrapperProps extends ViewProps {
  /**
   * If true, the wrapper will not apply max-width constraint (full width).
   * Use this for pages like Map that need full-width layout.
   */
  fullBleed?: boolean;
  /**
   * Custom max width in pixels. Default: 1024 (max-w-5xl equivalent)
   */
  maxWidth?: number;
  /**
   * Horizontal padding. Default: 16
   */
  horizontalPadding?: number;
  children: React.ReactNode;
}

/**
 * MaxWidthWrapper - Prevents ultra-wide layouts on large desktop screens.
 *
 * - Applies max-width constraint and centers content on Web
 * - No effect on mobile (React Native)
 * - Use fullBleed prop to opt-out for pages that need full width (e.g., Map)
 *
 * Default: max-width: 1024px (max-w-5xl equivalent), centered with mx-auto, 16px horizontal padding
 */
export function MaxWidthWrapper({
  fullBleed = false,
  maxWidth = 1024,
  horizontalPadding = 16,
  children,
  style,
  ...props
}: MaxWidthWrapperProps) {
  // No constraint for fullBleed or non-web platforms
  if (fullBleed || !isWeb) {
    return (
      <View style={[styles.base, style]} {...props}>
        {children}
      </View>
    );
  }

  // Web: constrained width, centered
  return (
    <View
      style={[
        styles.base,
        {
          maxWidth,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

/**
 * Higher-order component to wrap a page with MaxWidthWrapper.
 * Use this to easily add max-width constraint to any screen.
 *
 * @example
 * export default withMaxWidth(MyScreen);
 * export default withMaxWidth(MyScreen, { fullBleed: true }); // for map page
 */
export function withMaxWidth<P extends object>(
  Component: React.ComponentType<P>,
  wrapperProps?: Omit<MaxWidthWrapperProps, "children">
) {
  return function WrappedComponent(props: P) {
    return (
      <MaxWidthWrapper {...wrapperProps}>
        <Component {...props} />
      </MaxWidthWrapper>
    );
  };
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    width: "100%",
  },
});
