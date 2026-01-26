import { boolean, date, int, mysqlEnum, mysqlTable, text, timestamp, unique, varchar } from "drizzle-orm/mysql-core";

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

// ============================================================================
// Deadline Tracker Tables
// ============================================================================

/**
 * School deadlines/events imported from CSV seed data.
 * Stores all deadline events with school matching.
 */
export const schoolDeadlines = mysqlTable("school_deadlines", {
  id: int("id").autoincrement().primaryKey(),
  /** English name from CSV (used for matching) */
  schoolNameEn: varchar("schoolNameEn", { length: 255 }).notNull(),
  /** Chinese name from CSV (optional) */
  schoolNameZh: varchar("schoolNameZh", { length: 255 }),
  /** Matched school ID from SCHOOLS data (null if unmatched) */
  schoolId: varchar("schoolId", { length: 64 }),
  /** Category from CSV: KG, Intl, DSS, etc. */
  category: varchar("category", { length: 64 }),
  /** Stage from CSV: K1, Primary, Secondary 1, etc. */
  stage: varchar("stage", { length: 64 }),
  /** Academic year: e.g., 2026-2027 */
  academicYear: varchar("academicYear", { length: 16 }).notNull(),
  /** Event type from CSV: application_open, deadline, interview, etc. */
  eventType: varchar("eventType", { length: 64 }).notNull(),
  /** Start date of the event (nullable for rolling/TBD) */
  startDate: date("startDate"),
  /** End date of the event (nullable) */
  endDate: date("endDate"),
  /** Whether this is a rolling deadline */
  isRolling: boolean("isRolling").default(false),
  /** Source URL for verification */
  sourceUrl: text("sourceUrl"),
  /** Additional notes from CSV */
  notes: text("notes"),
  /** Data quality status: ok, needs_manual, fetch_error */
  status: mysqlEnum("status", ["ok", "needs_manual", "fetch_error"]).default("ok"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SchoolDeadline = typeof schoolDeadlines.$inferSelect;
export type InsertSchoolDeadline = typeof schoolDeadlines.$inferInsert;

/**
 * User-tracked schools for deadline notifications.
 * Links users to schools they want to track.
 */
export const userTrackedSchools = mysqlTable("user_tracked_schools", {
  id: int("id").autoincrement().primaryKey(),
  /** User ID (references users table) */
  userId: int("userId").notNull(),
  /** School ID from SCHOOLS data */
  schoolId: varchar("schoolId", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [
  unique("user_school_unique").on(table.userId, table.schoolId),
]);

export type UserTrackedSchool = typeof userTrackedSchools.$inferSelect;
export type InsertUserTrackedSchool = typeof userTrackedSchools.$inferInsert;

/**
 * Log of schools from CSV that couldn't be matched to SCHOOLS data.
 * Useful for debugging and manual review.
 */
export const unmatchedSchoolsLog = mysqlTable("unmatched_schools_log", {
  id: int("id").autoincrement().primaryKey(),
  /** English name that couldn't be matched */
  schoolNameEn: varchar("schoolNameEn", { length: 255 }).notNull(),
  /** Chinese name (if available) */
  schoolNameZh: varchar("schoolNameZh", { length: 255 }),
  /** Source file this came from */
  sourceFile: varchar("sourceFile", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UnmatchedSchoolLog = typeof unmatchedSchoolsLog.$inferSelect;
export type InsertUnmatchedSchoolLog = typeof unmatchedSchoolsLog.$inferInsert;
