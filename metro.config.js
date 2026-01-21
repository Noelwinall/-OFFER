const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Only use forceWriteFileSystem in development - causes Metro SHA-1 errors on CI
const isDev = process.env.NODE_ENV !== "production";

module.exports = withNativeWind(config, {
  input: "./global.css",
  // Force write CSS to file system instead of virtual modules
  // This fixes iOS styling issues in development mode
  // Disabled in production builds to avoid Metro SHA-1 cache errors
  forceWriteFileSystem: isDev,
});
