import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  /** Membership tier: free or pro */
  membershipTier: mysqlEnum("membershipTier", ["free", "pro"]).default("free").notNull(),
  /** When the pro membership expires (null for free users) */
  membershipExpiresAt: timestamp("membershipExpiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================================
// AI Enhanced Brief Cache
// ============================================================================

/**
 * Persistent cache for AI-generated enhanced briefs.
 * Survives server restarts and works across multiple instances.
 */
export const aiEnhancedBriefCache = mysqlTable("ai_enhanced_brief_cache", {
  id: int("id").autoincrement().primaryKey(),
  /** Composite cache key: schoolId_preferencesHash_locale_modelVersion_promptVersion */
  cacheKey: varchar("cacheKey", { length: 255 }).notNull().unique(),
  /** The cached JSON response */
  responseJson: text("responseJson").notNull(),
  /** When this cache entry expires */
  expiresAt: timestamp("expiresAt").notNull(),
  /** When this entry was created */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AiEnhancedBriefCache = typeof aiEnhancedBriefCache.$inferSelect;
export type InsertAiEnhancedBriefCache = typeof aiEnhancedBriefCache.$inferInsert;

// ============================================================================
// AI Request Log (for quota tracking and analytics)
// ============================================================================

/**
 * Logs each AI enhanced brief request for quota tracking and analytics.
 */
export const aiRequestLog = mysqlTable("ai_request_log", {
  id: int("id").autoincrement().primaryKey(),
  /** User who made the request */
  userId: int("userId").notNull(),
  /** School ID requested */
  schoolId: varchar("schoolId", { length: 64 }).notNull(),
  /** Whether the response was served from cache */
  cacheHit: boolean("cacheHit").notNull(),
  /** Request mode (e.g., "enhanced") */
  mode: varchar("mode", { length: 32 }).notNull(),
  /** Model version used */
  modelVersion: varchar("modelVersion", { length: 64 }).notNull(),
  /** Prompt version used */
  promptVersion: varchar("promptVersion", { length: 64 }).notNull(),
  /** When the request was made */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AiRequestLog = typeof aiRequestLog.$inferSelect;
export type InsertAiRequestLog = typeof aiRequestLog.$inferInsert;

// ============================================================================
// AI Report Cache (for quiz-based reports)
// ============================================================================

/**
 * Persistent cache for AI-generated quiz reports (simple and pro versions).
 */
export const aiReportCache = mysqlTable("ai_report_cache", {
  id: int("id").autoincrement().primaryKey(),
  /** Cache key based on filters hash and report type */
  cacheKey: varchar("cacheKey", { length: 255 }).notNull().unique(),
  /** Report type: simple (free) or pro (paid) */
  reportType: mysqlEnum("reportType", ["simple", "pro"]).notNull(),
  /** The cached JSON report */
  responseJson: text("responseJson").notNull(),
  /** When this cache entry expires */
  expiresAt: timestamp("expiresAt").notNull(),
  /** When this entry was created */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AiReportCache = typeof aiReportCache.$inferSelect;
export type InsertAiReportCache = typeof aiReportCache.$inferInsert;
