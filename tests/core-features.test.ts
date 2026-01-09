import { describe, it, expect } from "vitest";
import { SCHOOLS } from "../data/schools";
import { getSortedRecommendations, calculateMatchScore } from "../lib/recommendation";
import type { QuizFilters } from "../types/school";

describe("HK Edu App - Core Features", () => {
  describe("School Data", () => {
    it("should have valid school data", () => {
      expect(SCHOOLS.length).toBeGreaterThan(0);
      
      SCHOOLS.forEach((school) => {
        expect(school.id).toBeDefined();
        expect(school.name).toBeDefined();
        expect(school.category).toBeDefined();
        expect(school.district).toBeDefined();
        expect(school.level).toBeDefined();
        expect(school.tuitionMin).toBeGreaterThanOrEqual(0);
        expect(school.tuitionMax).toBeGreaterThanOrEqual(school.tuitionMin);
        expect(school.curriculum).toBeInstanceOf(Array);
        expect(school.highlights).toBeInstanceOf(Array);
        expect(school.highlights.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Recommendation Algorithm", () => {
    it("should filter schools by level", () => {
      const filters: QuizFilters = { level: "幼稚園" };
      const results = getSortedRecommendations(SCHOOLS, filters);
      
      results.forEach((school) => {
        expect(school.level).toBe("幼稚園");
      });
    });

    it("should filter schools by district", () => {
      const filters: QuizFilters = { district: "港島" };
      const results = getSortedRecommendations(SCHOOLS, filters);
      
      results.forEach((school) => {
        expect(school.district).toBe("港島");
      });
    });

    it("should filter schools by tuition range", () => {
      const filters: QuizFilters = {
        tuitionRange: { min: 0, max: 50000 },
      };
      const results = getSortedRecommendations(SCHOOLS, filters);
      
      results.forEach((school) => {
        // School tuition range should overlap with filter range
        const hasOverlap =
          school.tuitionMin <= 50000 && school.tuitionMax >= 0;
        expect(hasOverlap).toBe(true);
      });
    });

    it("should filter schools by category", () => {
      const filters: QuizFilters = { category: "國際學校" };
      const results = getSortedRecommendations(SCHOOLS, filters);
      
      results.forEach((school) => {
        expect(school.category).toBe("國際學校");
      });
    });

    it("should filter schools by curriculum", () => {
      const filters: QuizFilters = { curriculum: "IB" };
      const results = getSortedRecommendations(SCHOOLS, filters);
      
      results.forEach((school) => {
        expect(school.curriculum).toContain("IB");
      });
    });

    it("should apply multiple filters correctly", () => {
      const filters: QuizFilters = {
        level: "小學",
        district: "九龍",
        category: "直資學校",
      };
      const results = getSortedRecommendations(SCHOOLS, filters);
      
      results.forEach((school) => {
        expect(school.level).toBe("小學");
        expect(school.district).toBe("九龍");
        expect(school.category).toBe("直資學校");
      });
    });

    it("should calculate match scores correctly", () => {
      const school = SCHOOLS[0];
      const filters: QuizFilters = {
        level: school.level,
        district: school.district,
        category: school.category,
      };
      
      const score = calculateMatchScore(school, filters);
      expect(score).toBeGreaterThan(0);
    });

    it("should sort results by match score", () => {
      const filters: QuizFilters = { level: "小學" };
      const results = getSortedRecommendations(SCHOOLS, filters);
      
      // Check if results are sorted in descending order by score
      for (let i = 0; i < results.length - 1; i++) {
        const scoreA = calculateMatchScore(results[i], filters);
        const scoreB = calculateMatchScore(results[i + 1], filters);
        expect(scoreA).toBeGreaterThanOrEqual(scoreB);
      }
    });
  });

  describe("Data Integrity", () => {
    it("should have unique school IDs", () => {
      const ids = SCHOOLS.map((school) => school.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have valid contact information", () => {
      SCHOOLS.forEach((school) => {
        expect(school.address).toBeDefined();
        expect(school.phone).toBeDefined();
        expect(school.website).toBeDefined();
        expect(school.website).toMatch(/^https?:\/\//);
      });
    });

    it("should have valid application information", () => {
      SCHOOLS.forEach((school) => {
        expect(school.applicationMaterials).toBeInstanceOf(Array);
        expect(school.applicationMaterials.length).toBeGreaterThan(0);
        expect(school.applicationLink).toBeDefined();
        expect(school.applicationLink).toMatch(/^https?:\/\//);
      });
    });
  });
});
