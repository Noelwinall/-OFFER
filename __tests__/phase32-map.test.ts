import { describe, it, expect } from "vitest";

// 測試學校數據的座標
describe("School Coordinates", () => {
  it("should have latitude and longitude for all schools", { timeout: 15000 }, async () => {
    const { SCHOOLS } = await import("../data/schools");
    
    SCHOOLS.forEach((school) => {
      expect(school.latitude).toBeDefined();
      expect(school.longitude).toBeDefined();
      expect(typeof school.latitude).toBe("number");
      expect(typeof school.longitude).toBe("number");
    });
  });

  it("should have valid Hong Kong coordinates", async () => {
    const { SCHOOLS } = await import("../data/schools");
    
    // 香港的經緯度範圍
    const HK_LAT_MIN = 22.15;
    const HK_LAT_MAX = 22.56;
    const HK_LNG_MIN = 113.83;
    const HK_LNG_MAX = 114.43;
    
    SCHOOLS.forEach((school) => {
      expect(school.latitude).toBeGreaterThanOrEqual(HK_LAT_MIN);
      expect(school.latitude).toBeLessThanOrEqual(HK_LAT_MAX);
      expect(school.longitude).toBeGreaterThanOrEqual(HK_LNG_MIN);
      expect(school.longitude).toBeLessThanOrEqual(HK_LNG_MAX);
    });
  });

  it("should have coordinates matching district", async () => {
    const { SCHOOLS } = await import("../data/schools");
    
    // 各區大致經緯度範圍
    const DISTRICT_RANGES = {
      "港島": { lat: [22.20, 22.32], lng: [114.10, 114.28] },
      "九龍": { lat: [22.28, 22.36], lng: [114.14, 114.25] },
      "新界": { lat: [22.25, 22.55], lng: [113.88, 114.35] },
    };
    
    // 抽樣檢查每個區的學校
    const sampleSize = 10;
    const districts = ["港島", "九龍", "新界"] as const;
    
    districts.forEach((district) => {
      const schoolsInDistrict = SCHOOLS.filter(s => s.district === district).slice(0, sampleSize);
      const range = DISTRICT_RANGES[district];
      
      schoolsInDistrict.forEach((school) => {
        expect(school.latitude).toBeGreaterThanOrEqual(range.lat[0]);
        expect(school.latitude).toBeLessThanOrEqual(range.lat[1]);
        expect(school.longitude).toBeGreaterThanOrEqual(range.lng[0]);
        expect(school.longitude).toBeLessThanOrEqual(range.lng[1]);
      });
    });
  });
});

// 測試學校類型分佈
describe("School Type Distribution", () => {
  it("should have all 500 schools", async () => {
    const { SCHOOLS } = await import("../data/schools");
    expect(SCHOOLS.length).toBe(500);
  });

  it("should have schools in all three districts", async () => {
    const { SCHOOLS } = await import("../data/schools");
    
    const hongKongIsland = SCHOOLS.filter(s => s.district === "港島");
    const kowloon = SCHOOLS.filter(s => s.district === "九龍");
    const newTerritories = SCHOOLS.filter(s => s.district === "新界");
    
    expect(hongKongIsland.length).toBeGreaterThan(0);
    expect(kowloon.length).toBeGreaterThan(0);
    expect(newTerritories.length).toBeGreaterThan(0);
    
    // 總數應該等於 500
    expect(hongKongIsland.length + kowloon.length + newTerritories.length).toBe(500);
  });

  it("should have all five school categories", async () => {
    const { SCHOOLS } = await import("../data/schools");
    
    const categories = new Set(SCHOOLS.map(s => s.category));
    expect(categories.has("國際")).toBe(true);
    expect(categories.has("直資")).toBe(true);
    expect(categories.has("私立")).toBe(true);
    expect(categories.has("資助")).toBe(true);
    expect(categories.has("公立")).toBe(true);
  });
});

// 測試 School 類型定義
describe("School Type Definition", () => {
  it("should include latitude and longitude in School type", async () => {
    const { SCHOOLS } = await import("../data/schools");
    
    const firstSchool = SCHOOLS[0];
    
    // 檢查所有必要欄位
    expect(firstSchool).toHaveProperty("id");
    expect(firstSchool).toHaveProperty("name");
    expect(firstSchool).toHaveProperty("nameEn");
    expect(firstSchool).toHaveProperty("category");
    expect(firstSchool).toHaveProperty("district");
    expect(firstSchool).toHaveProperty("level");
    expect(firstSchool).toHaveProperty("latitude");
    expect(firstSchool).toHaveProperty("longitude");
    expect(firstSchool).toHaveProperty("applicationLink");
  });
});
