import { describe, it, expect } from "vitest";

// 測試學校數據
describe("Phase 30: 500 所學校數據", () => {
  it("應該有 500 所學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    expect(SCHOOLS.length).toBe(500);
  });

  it("每所學校都應該有英文名稱", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const schoolsWithoutEnglishName = SCHOOLS.filter(
      (s) => !s.nameEn || s.nameEn.trim() === ""
    );
    expect(schoolsWithoutEnglishName.length).toBe(0);
  });

  it("每所學校都應該有搜索關鍵字", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const schoolsWithoutKeywords = SCHOOLS.filter(
      (s) => !s.searchKeywords || s.searchKeywords.length === 0
    );
    expect(schoolsWithoutKeywords.length).toBe(0);
  });

  it("每所學校都應該有申請連結", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const schoolsWithoutApplicationLink = SCHOOLS.filter(
      (s) => !s.applicationLink || s.applicationLink.trim() === ""
    );
    expect(schoolsWithoutApplicationLink.length).toBe(0);
  });

  it("應該包含國際學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const internationalSchools = SCHOOLS.filter((s) => s.category === "國際");
    expect(internationalSchools.length).toBeGreaterThan(50);
  });

  it("應該包含直資學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const dssSchools = SCHOOLS.filter((s) => s.category === "直資");
    expect(dssSchools.length).toBeGreaterThan(30);
  });

  it("應該包含私立學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const privateSchools = SCHOOLS.filter((s) => s.category === "私立");
    expect(privateSchools.length).toBeGreaterThan(50);
  });

  it("應該包含資助學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const aidedSchools = SCHOOLS.filter((s) => s.category === "資助");
    expect(aidedSchools.length).toBeGreaterThan(100);
  });

  it("應該包含公立學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const governmentSchools = SCHOOLS.filter((s) => s.category === "公立");
    expect(governmentSchools.length).toBeGreaterThan(30);
  });

  it("應該包含幼稚園、小學和中學", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const kindergartens = SCHOOLS.filter((s) => s.level === "幼稚園");
    const primarySchools = SCHOOLS.filter((s) => s.level === "小學");
    const secondarySchools = SCHOOLS.filter((s) => s.level === "中學");
    
    expect(kindergartens.length).toBeGreaterThan(50);
    expect(primarySchools.length).toBeGreaterThan(100);
    expect(secondarySchools.length).toBeGreaterThan(150);
  });

  it("應該可以搜索 ESF 學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const esfSchools = SCHOOLS.filter((s) =>
      s.searchKeywords.some((k) => k.toLowerCase().includes("esf"))
    );
    expect(esfSchools.length).toBeGreaterThan(10);
  });

  it("應該可以搜索 YCIS 學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const ycisSchools = SCHOOLS.filter((s) =>
      s.searchKeywords.some((k) => k.toLowerCase().includes("ycis"))
    );
    expect(ycisSchools.length).toBeGreaterThan(0);
  });

  it("應該可以搜索 SPCC 學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const spccSchools = SCHOOLS.filter((s) =>
      s.searchKeywords.some((k) => k.toLowerCase().includes("spcc"))
    );
    expect(spccSchools.length).toBeGreaterThan(0);
  });

  it("應該可以搜索 DBS 學校", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const dbsSchools = SCHOOLS.filter((s) =>
      s.searchKeywords.some((k) => k.toLowerCase().includes("dbs"))
    );
    expect(dbsSchools.length).toBeGreaterThan(0);
  });
});

// 測試申請連結格式
describe("Phase 31: 申請連結功能", () => {
  it("所有申請連結都應該是有效的 URL 格式", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const invalidLinks = SCHOOLS.filter((s) => {
      try {
        new URL(s.applicationLink);
        return false;
      } catch {
        return true;
      }
    });
    expect(invalidLinks.length).toBe(0);
  });

  it("所有網站連結都應該是有效的 URL 格式", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const invalidWebsites = SCHOOLS.filter((s) => {
      try {
        new URL(s.website);
        return false;
      } catch {
        return true;
      }
    });
    expect(invalidWebsites.length).toBe(0);
  });

  it("申請連結應該包含 admissions 路徑", async () => {
    const { SCHOOLS } = await import("../data/schools");
    const linksWithAdmissions = SCHOOLS.filter((s) =>
      s.applicationLink.toLowerCase().includes("admissions")
    );
    // 大部分學校的申請連結應該包含 admissions
    expect(linksWithAdmissions.length).toBeGreaterThan(400);
  });
});
