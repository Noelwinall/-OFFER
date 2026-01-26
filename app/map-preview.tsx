/**
 * 重定向到插画地图页面
 */

import { Redirect } from "expo-router";

export default function MapPreviewScreen() {
  return <Redirect href="/illustrated-map" />;
}
