import { describe, it, expect } from "vitest";

// 模擬學校數據
const mockSchools = [
  {
    id: "int-001",
    name: "漢基國際學校",
    nameEn: "Chinese International School",
    searchKeywords: ["CIS", "Chinese International", "漢基"],
    category: "國際" as const,
    district: "港島" as const,
    level: "中學" as const,
    tuitionMin: 250000,
    tuitionMax: 273400,
    curriculum: ["IB"],
    language: "全英文" as const,
    highlights: ["提供完整 IB 課程體系"],
    address: "北角寶馬山校園徑1號",
    phone: "+852 2510 7288",
    website: "https://www.cis.edu.hk",
    applicationMaterials: ["申請表"],
    applicationLink: "https://www.cis.edu.hk/admissions",
  },
  {
    id: "int-002",
    name: "耀中國際學校",
    nameEn: "Yew Chung International School",
    searchKeywords: ["YCIS", "Yew Chung", "耀中"],
    category: "國際" as const,
    district: "九龍" as const,
    level: "中學" as const,
    tuitionMin: 230000,
    tuitionMax: 260220,
    curriculum: ["IB"],
    language: "全英文" as const,
    highlights: ["提供 IB 課程體系"],
    address: "九龍塘沙福道2號",
    phone: "+852 2338 7106",
    website: "https://www.ycis-hk.com",
    applicationMaterials: ["申請表"],
    applicationLink: "https://www.ycis-hk.com/admissions",
  },
  {
    id: "dss-001",
    name: "聖保羅男女中學",
    nameEn: "St. Paul's Co-educational College",
    searchKeywords: ["SPCC", "St Paul's", "聖保羅"],
    category: "直資" as const,
    district: "港島" as const,
    level: "中學" as const,
    tuitionMin: 63000,
    tuitionMax: 63000,
    curriculum: ["DSE", "IB"],
    language: "中英雙語" as const,
    highlights: ["香港頂尖直資學校"],
    address: "麥當勞道33號",
    phone: "+852 2523 1187",
    website: "https://www.spcc.edu.hk",
    applicationMaterials: ["申請表"],
    applicationLink: "https://www.spcc.edu.hk/admissions",
  },
];

describe("Phase 29: 修復問答選校 + 新增英文名稱", () => {
  describe("學校數據結構", () => {
    it("所有學校都有英文名稱", () => {
      mockSchools.forEach((school) => {
        expect(school.nameEn).toBeDefined();
        expect(school.nameEn.length).toBeGreaterThan(0);
      });
    });

    it("所有學校都有搜索關鍵字", () => {
      mockSchools.forEach((school) => {
        expect(school.searchKeywords).toBeDefined();
        expect(Array.isArray(school.searchKeywords)).toBe(true);
      });
    });

    it("搜索關鍵字包含常用簡稱", () => {
      const cisSchool = mockSchools.find((s) => s.id === "int-001");
      expect(cisSchool?.searchKeywords).toContain("CIS");

      const ycisSchool = mockSchools.find((s) => s.id === "int-002");
      expect(ycisSchool?.searchKeywords).toContain("YCIS");

      const spccSchool = mockSchools.find((s) => s.id === "dss-001");
      expect(spccSchool?.searchKeywords).toContain("SPCC");
    });
  });

  describe("搜索邏輯", () => {
    // 模擬搜索函數
    function searchSchools(schools: typeof mockSchools, query: string) {
      const q = query.toLowerCase();
      return schools.filter(
        (school) =>
          school.name.toLowerCase().includes(q) ||
          school.nameEn.toLowerCase().includes(q) ||
          school.searchKeywords.some((kw) => kw.toLowerCase().includes(q))
      );
    }

    it("可以用中文名稱搜索", () => {
      const results = searchSchools(mockSchools, "漢基");
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("int-001");
    });

    it("可以用英文名稱搜索", () => {
      const results = searchSchools(mockSchools, "Chinese International");
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("int-001");
    });

    it("可以用英文簡稱搜索 (CIS)", () => {
      const results = searchSchools(mockSchools, "CIS");
      // CIS 也會匹配 YCIS，所以有 2 個結果
      expect(results.length).toBe(2);
      expect(results.some(r => r.id === "int-001")).toBe(true);
    });

    it("可以用英文簡稱搜索 (YCIS)", () => {
      const results = searchSchools(mockSchools, "YCIS");
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("int-002");
    });

    it("可以用英文簡稱搜索 (SPCC)", () => {
      const results = searchSchools(mockSchools, "SPCC");
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("dss-001");
    });

    it("搜索不區分大小寫", () => {
      const results1 = searchSchools(mockSchools, "ycis");
      const results2 = searchSchools(mockSchools, "YCIS");
      const results3 = searchSchools(mockSchools, "Ycis");
      expect(results1.length).toBe(1);
      expect(results2.length).toBe(1);
      expect(results3.length).toBe(1);
    });
  });

  describe("推薦邏輯改進", () => {
    // 模擬推薦函數
    function getRecommendedSchools(
      schools: typeof mockSchools,
      filters: { level?: string; district?: string; category?: string }
    ) {
      return schools.filter((school) => {
        if (filters.level && school.level !== filters.level) return false;
        if (filters.district && school.district !== filters.district)
          return false;
        if (filters.category && school.category !== filters.category)
          return false;
        return true;
      });
    }

    function getSortedRecommendations(
      schools: typeof mockSchools,
      filters: { level?: string; district?: string; category?: string }
    ) {
      let results = getRecommendedSchools(schools, filters);

      // 如果精確匹配為0，放寬條件
      if (results.length === 0) {
        // 只保留學段和地區
        results = getRecommendedSchools(schools, {
          level: filters.level,
          district: filters.district,
        });
      }

      if (results.length === 0 && filters.level) {
        // 只保留學段
        results = getRecommendedSchools(schools, { level: filters.level });
      }

      if (results.length === 0) {
        // 返回所有學校
        results = [...schools];
      }

      return results;
    }

    it("精確匹配有結果時返回匹配結果", () => {
      const results = getSortedRecommendations(mockSchools, {
        level: "中學",
        district: "港島",
        category: "國際",
      });
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("int-001");
    });

    it("精確匹配無結果時放寬條件", () => {
      // 沒有「港島」的「資助」中學
      const results = getSortedRecommendations(mockSchools, {
        level: "中學",
        district: "港島",
        category: "資助",
      });
      // 應該放寬到只匹配學段和地區
      expect(results.length).toBeGreaterThan(0);
    });

    it("完全無匹配時返回所有學校", () => {
      const results = getSortedRecommendations(mockSchools, {
        level: "幼稚園",
        district: "新界",
        category: "公立",
      });
      expect(results.length).toBe(mockSchools.length);
    });
  });

  describe("匹配度計算", () => {
    function calculateMatchScore(
      school: (typeof mockSchools)[0],
      filters: { level?: string; district?: string; category?: string }
    ) {
      let score = 0;
      let maxScore = 0;

      if (filters.level) {
        maxScore += 25;
        if (school.level === filters.level) score += 25;
      }

      if (filters.district) {
        maxScore += 20;
        if (school.district === filters.district) score += 20;
      }

      if (filters.category) {
        maxScore += 18;
        if (school.category === filters.category) score += 18;
      }

      return maxScore > 0 ? Math.round((score / maxScore) * 100) : 100;
    }

    it("完全匹配返回100分", () => {
      const score = calculateMatchScore(mockSchools[0], {
        level: "中學",
        district: "港島",
        category: "國際",
      });
      expect(score).toBe(100);
    });

    it("部分匹配返回相應分數", () => {
      const score = calculateMatchScore(mockSchools[0], {
        level: "中學",
        district: "港島",
        category: "直資", // 不匹配
      });
      expect(score).toBeLessThan(100);
      expect(score).toBeGreaterThan(0);
    });

    it("完全不匹配返回0分", () => {
      const score = calculateMatchScore(mockSchools[0], {
        level: "小學",
        district: "新界",
        category: "資助",
      });
      expect(score).toBe(0);
    });
  });
});
