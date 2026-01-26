/**
 * Deadline Router
 *
 * Provides endpoints for the Deadline Tracker feature:
 * - Track/untrack schools
 * - Get tracked schools
 * - Get deadlines for tracked schools with filters
 * - Calendar export (JSON for future ICS generation)
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and, or, gte, lte, inArray, isNull, sql } from "drizzle-orm";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { schoolDeadlines, userTrackedSchools } from "../drizzle/schema";
import { SCHOOLS } from "../data/schools";
import type { Level } from "../types/school";

// ============================================================================
// Constants
// ============================================================================

/**
 * Map CSV stage values to app Level type
 * This allows filtering by the app's standard stages
 */
const STAGE_MAPPING: Record<string, Level> = {
  // Kindergarten
  "K1": "幼稚園",
  "KG": "幼稚園",
  "Nursery": "幼稚園",
  "Pre-Nursery": "幼稚園",
  "PN": "幼稚園",

  // Primary
  "Primary": "小學",
  "Grade 1": "小學",
  "Grade 2": "小學",
  "Grade 3": "小學",
  "Grade 4": "小學",
  "Grade 5": "小學",
  "Grade 6": "小學",
  "Year 1": "小學",
  "Year 2": "小學",
  "Year 3": "小學",
  "Year 4": "小學",
  "Year 5": "小學",
  "Year 6": "小學",
  "Primary Foundation Year": "小學",

  // Secondary
  "Secondary": "中學",
  "Secondary 1 (F1)": "中學",
  "Secondary 1 (S1)": "中學",
  "Form 1 (S1)": "中學",
  "Form 1 (F1)": "中學",
  "Grade 7 (F.1)": "中學",
  "S.1": "中學",
  "F1": "中學",
  "S1": "中學",
  "New S1": "中學",
  "Grade 7": "中學",
  "Grade 8": "中學",
  "Grade 9": "中學",
  "Grade 10": "中學",
  "Grade 11": "中學",
  "Grade 12": "中學",
  "Year 7": "中學",
  "Year 8": "中學",
  "Year 9": "中學",
  "Year 10": "中學",
  "Year 11": "中學",
  "Year 12": "中學",
  "Year 13": "中學",
  "Grade 2-5 / Grade 6-11": "中學",
  "Grade 2-11": "中學",
  "Grade 3-11": "中學",
};

/**
 * Get the app Level for a CSV stage value
 * Returns null for mixed/unknown stages
 */
function getAppLevel(csvStage: string | null): Level | null {
  if (!csvStage) return null;
  return STAGE_MAPPING[csvStage] || null;
}

/**
 * Check if a CSV stage matches the requested app Level
 */
function matchesStage(csvStage: string | null, requestedLevel: Level): boolean {
  if (!csvStage) return false;

  // Direct mapping
  const mappedLevel = STAGE_MAPPING[csvStage];
  if (mappedLevel === requestedLevel) return true;

  // Handle mixed stages (e.g., "K-Grade 12", "Primary/Secondary")
  const lowerStage = csvStage.toLowerCase();

  if (requestedLevel === "幼稚園") {
    return lowerStage.includes("kg") || lowerStage.includes("nursery") || lowerStage.includes("k-");
  }
  if (requestedLevel === "小學") {
    return lowerStage.includes("primary") || (lowerStage.includes("grade") && /grade [1-6]/.test(lowerStage));
  }
  if (requestedLevel === "中學") {
    return lowerStage.includes("secondary") || lowerStage.includes("form") ||
      (lowerStage.includes("grade") && /grade ([7-9]|1[0-2])/.test(lowerStage)) ||
      (lowerStage.includes("year") && /year ([7-9]|1[0-3])/.test(lowerStage));
  }

  return false;
}

// ============================================================================
// Input Schemas
// ============================================================================

const schoolIdSchema = z.object({
  schoolId: z.string().min(1),
});

const getDeadlinesInputSchema = z.object({
  stage: z.enum(["幼稚園", "小學", "中學"]).optional(),
  includeExpired: z.boolean().default(false),
  includeUnverified: z.boolean().default(true),
});

// ============================================================================
// Router
// ============================================================================

export const deadlineRouter = router({
  /**
   * Get list of schools tracked by the current user
   */
  getTrackedSchools: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    const tracked = await db
      .select()
      .from(userTrackedSchools)
      .where(eq(userTrackedSchools.userId, ctx.user.id));

    // Enrich with school details
    const trackedWithDetails = tracked.map((t) => {
      const school = SCHOOLS.find((s) => s.id === t.schoolId);
      return {
        ...t,
        school: school
          ? {
              id: school.id,
              name: school.name,
              nameEn: school.nameEn,
              level: school.level,
              category: school.category,
              district18: school.district18,
            }
          : null,
      };
    });

    return trackedWithDetails;
  }),

  /**
   * Check if a specific school is tracked by the current user
   */
  isTracked: protectedProcedure
    .input(schoolIdSchema)
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return false;

      const result = await db
        .select()
        .from(userTrackedSchools)
        .where(
          and(
            eq(userTrackedSchools.userId, ctx.user.id),
            eq(userTrackedSchools.schoolId, input.schoolId)
          )
        )
        .limit(1);

      return result.length > 0;
    }),

  /**
   * Track a school for deadline notifications
   */
  trackSchool: protectedProcedure
    .input(schoolIdSchema)
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Verify school exists
      const school = SCHOOLS.find((s) => s.id === input.schoolId);
      if (!school) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "School not found",
        });
      }

      try {
        await db.insert(userTrackedSchools).values({
          userId: ctx.user.id,
          schoolId: input.schoolId,
        });
        return { success: true, message: "School tracked successfully" };
      } catch (error: unknown) {
        // Handle duplicate (already tracked)
        if (error instanceof Error && error.message.includes("Duplicate")) {
          return { success: true, message: "School already tracked" };
        }
        throw error;
      }
    }),

  /**
   * Untrack a school
   */
  untrackSchool: protectedProcedure
    .input(schoolIdSchema)
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      await db
        .delete(userTrackedSchools)
        .where(
          and(
            eq(userTrackedSchools.userId, ctx.user.id),
            eq(userTrackedSchools.schoolId, input.schoolId)
          )
        );

      return { success: true, message: "School untracked successfully" };
    }),

  /**
   * Get deadlines for tracked schools
   */
  getDeadlines: protectedProcedure
    .input(getDeadlinesInputSchema)
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Get tracked school IDs
      const tracked = await db
        .select({ schoolId: userTrackedSchools.schoolId })
        .from(userTrackedSchools)
        .where(eq(userTrackedSchools.userId, ctx.user.id));

      if (tracked.length === 0) {
        return {
          upcoming: [],
          pending: [],
          expired: [],
          trackedCount: 0,
        };
      }

      const trackedIds = tracked.map((t) => t.schoolId);

      // Get all deadlines for tracked schools
      const allDeadlines = await db
        .select()
        .from(schoolDeadlines)
        .where(inArray(schoolDeadlines.schoolId, trackedIds));

      // Get today's date for filtering
      const today = new Date().toISOString().split("T")[0];

      // Filter and categorize
      let deadlines = allDeadlines;

      // Apply stage filter if specified
      if (input.stage) {
        deadlines = deadlines.filter((d) => matchesStage(d.stage, input.stage!));
      }

      // Categorize into upcoming, pending verification, and expired
      const upcoming: typeof deadlines = [];
      const pending: typeof deadlines = [];
      const expired: typeof deadlines = [];

      for (const deadline of deadlines) {
        const isVerified = deadline.status === "ok";
        const startDate = deadline.startDate;
        const endDate = deadline.endDate;

        // Determine if event is in the future
        // An event is upcoming if: startDate >= today OR endDate >= today OR (both null and isRolling)
        const isFuture =
          (startDate && startDate >= today) ||
          (endDate && endDate >= today) ||
          (deadline.isRolling && !startDate && !endDate);

        if (!isVerified && input.includeUnverified) {
          pending.push(deadline);
        } else if (isVerified) {
          if (isFuture) {
            upcoming.push(deadline);
          } else if (input.includeExpired) {
            expired.push(deadline);
          }
        }
      }

      // Sort by start date (nulls last)
      const sortByDate = (a: typeof deadlines[0], b: typeof deadlines[0]) => {
        if (!a.startDate && !b.startDate) return 0;
        if (!a.startDate) return 1;
        if (!b.startDate) return -1;
        return a.startDate.localeCompare(b.startDate);
      };

      upcoming.sort(sortByDate);
      pending.sort(sortByDate);
      expired.sort(sortByDate);

      // Enrich with school details
      const enrichDeadline = (d: typeof deadlines[0]) => {
        const school = SCHOOLS.find((s) => s.id === d.schoolId);
        return {
          ...d,
          school: school
            ? {
                id: school.id,
                name: school.name,
                nameEn: school.nameEn,
                level: school.level,
              }
            : null,
          appLevel: getAppLevel(d.stage),
        };
      };

      return {
        upcoming: upcoming.map(enrichDeadline),
        pending: pending.map(enrichDeadline),
        expired: expired.map(enrichDeadline),
        trackedCount: tracked.length,
      };
    }),

  /**
   * Get deadlines in a structured format for calendar export
   * Prepares data that can later be converted to ICS format
   */
  getCalendarExport: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    // Get tracked school IDs
    const tracked = await db
      .select({ schoolId: userTrackedSchools.schoolId })
      .from(userTrackedSchools)
      .where(eq(userTrackedSchools.userId, ctx.user.id));

    if (tracked.length === 0) {
      return { events: [] };
    }

    const trackedIds = tracked.map((t) => t.schoolId);

    // Get verified deadlines with dates
    const deadlines = await db
      .select()
      .from(schoolDeadlines)
      .where(
        and(
          inArray(schoolDeadlines.schoolId, trackedIds),
          eq(schoolDeadlines.status, "ok")
        )
      );

    // Format for calendar export
    const events = deadlines
      .filter((d) => d.startDate) // Only include events with dates
      .map((d) => {
        const school = SCHOOLS.find((s) => s.id === d.schoolId);
        return {
          id: `deadline-${d.id}`,
          title: `${school?.name || d.schoolNameZh || d.schoolNameEn} - ${d.eventType}`,
          description: d.notes || "",
          startDate: d.startDate,
          endDate: d.endDate || d.startDate,
          isAllDay: true,
          schoolId: d.schoolId,
          schoolName: school?.name || d.schoolNameZh || d.schoolNameEn,
          eventType: d.eventType,
          sourceUrl: d.sourceUrl,
        };
      });

    return { events };
  }),

  /**
   * Get count of deadlines for tracked schools (for badge display)
   */
  getUpcomingCount: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { count: 0 };

    // Get tracked school IDs
    const tracked = await db
      .select({ schoolId: userTrackedSchools.schoolId })
      .from(userTrackedSchools)
      .where(eq(userTrackedSchools.userId, ctx.user.id));

    if (tracked.length === 0) return { count: 0 };

    const trackedIds = tracked.map((t) => t.schoolId);
    const today = new Date().toISOString().split("T")[0];

    // Count upcoming verified deadlines
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(schoolDeadlines)
      .where(
        and(
          inArray(schoolDeadlines.schoolId, trackedIds),
          eq(schoolDeadlines.status, "ok"),
          or(
            gte(schoolDeadlines.startDate, today),
            gte(schoolDeadlines.endDate, today)
          )
        )
      );

    return { count: result[0]?.count || 0 };
  }),
});
