import { describe, it, expect } from "vitest";
import { School } from "../types/school";

// 測試學校數據
describe("Phase 33: 2100 所學校數據", () => {
  it("應該有約 2100 所學校", async () => {
    const { schools } = await import("../data/schools");
    expect(schools.length).toBeGreaterThanOrEqual(2000);
    expect(schools.length).toBeLessThanOrEqual(2200);
  });

  it("每所學校都應該有英文名稱", async () => {
    const { schools } = await import("../data/schools");
    const schoolsWithoutEnglishName = schools.filter(
      (s: School) => !s.nameEn || s.nameEn.trim() === ""
    );
    expect(schoolsWithoutEnglishName.length).toBe(0);
  });

  it("每所學校都應該有搜索關鍵字", async () => {
    const { schools } = await import("../data/schools");
    const schoolsWithoutKeywords = schools.filter(
      (s: School) => !s.searchKeywords || s.searchKeywords.length === 0
    );
    expect(schoolsWithoutKeywords.length).toBe(0);
  });

  it("每所學校都應該有地理座標", async () => {
    const { schools } = await import("../data/schools");
    const schoolsWithoutCoords = schools.filter(
      (s: School) => !s.latitude || !s.longitude
    );
    expect(schoolsWithoutCoords.length).toBe(0);
  });

  it("應該包含幼稚園", async () => {
    const { schools } = await import("../data/schools");
    const kindergartens = schools.filter((s: School) => s.level === "幼稚園");
    expect(kindergartens.length).toBeGreaterThan(900);
  });

  it("應該包含小學", async () => {
    const { schools } = await import("../data/schools");
    const primarySchools = schools.filter((s: School) => s.level === "小學");
    expect(primarySchools.length).toBeGreaterThan(500);
  });

  it("應該包含中學", async () => {
    const { schools } = await import("../data/schools");
    const secondarySchools = schools.filter((s: School) => s.level === "中學");
    expect(secondarySchools.length).toBeGreaterThan(400);
  });

  it("應該包含各種學校類型", async () => {
    const { schools } = await import("../data/schools");
    const types = new Set(schools.map((s: School) => s.type));
    expect(types.has("國際學校")).toBe(true);
    expect(types.has("直資學校")).toBe(true);
    expect(types.has("私立學校")).toBe(true);
    expect(types.has("資助學校")).toBe(true);
    expect(types.has("官立學校")).toBe(true);
  });

  it("應該包含港島、九龍、新界三個區域", async () => {
    const { schools } = await import("../data/schools");
    const regions = new Set(schools.map((s: School) => s.region));
    expect(regions.has("港島")).toBe(true);
    expect(regions.has("九龍")).toBe(true);
    expect(regions.has("新界")).toBe(true);
  });

  it("每所學校都應該有申請連結", async () => {
    const { schools } = await import("../data/schools");
    const schoolsWithoutLink = schools.filter(
      (s: School) => !s.applicationLink || s.applicationLink.trim() === ""
    );
    expect(schoolsWithoutLink.length).toBe(0);
  });

  it("國際學校應該有較高學費", async () => {
    const { schools } = await import("../data/schools");
    const internationalSchools = schools.filter(
      (s: School) => s.type === "國際學校"
    );
    const avgTuition =
      internationalSchools.reduce((sum: number, s: School) => sum + s.tuition, 0) /
      internationalSchools.length;
    expect(avgTuition).toBeGreaterThan(100000);
  });

  it("官立學校應該免學費或低學費", async () => {
    const { schools } = await import("../data/schools");
    const governmentSchools = schools.filter(
      (s: School) => s.type === "官立學校"
    );
    const freeSchools = governmentSchools.filter((s: School) => s.tuition === 0);
    expect(freeSchools.length).toBe(governmentSchools.length);
  });
});
