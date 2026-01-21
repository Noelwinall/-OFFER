export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",

  // Pro user beta allowlist (comma-separated user IDs or emails)
  proUserIds: process.env.PRO_USER_IDS ?? "",
  proEmails: process.env.PRO_EMAILS ?? "",

  // AI rate limiting (requests per window)
  aiRateLimitPerMinute: parseInt(process.env.AI_RATE_LIMIT_PER_MINUTE ?? "5", 10),
  aiRateLimitPerDay: parseInt(process.env.AI_RATE_LIMIT_PER_DAY ?? "50", 10),

  // Admin API Key for testing/admin access (bypasses OAuth)
  adminApiKey: process.env.ADMIN_API_KEY ?? "",
};
