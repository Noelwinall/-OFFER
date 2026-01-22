/**
 * 18-District Map Data
 * Contains district coordinates, colors, and stats calculation helpers
 */

import type { District18, SchoolCategory, Level, School } from "@/types/school";
import { isInternational } from "@/lib/international-schools";

/**
 * District center coordinates for map display
 * These are approximate center points for each district
 */
export interface DistrictMapInfo {
  id: District18;
  name: string;
  region: "港島" | "九龍" | "新界";
  lat: number;
  lng: number;
  color: string;
}

/**
 * 18 Districts of Hong Kong with coordinates and colors
 */
export const DISTRICT_MAP_DATA: DistrictMapInfo[] = [
  // 港島 (Hong Kong Island) - 4 districts
  { id: "中西區", name: "中西區", region: "港島", lat: 22.2869, lng: 114.1504, color: "#00D9FF" },
  { id: "東區", name: "東區", region: "港島", lat: 22.2842, lng: 114.2246, color: "#00B8D9" },
  { id: "南區", name: "南區", region: "港島", lat: 22.2429, lng: 114.1559, color: "#00A3BF" },
  { id: "灣仔區", name: "灣仔區", region: "港島", lat: 22.2783, lng: 114.1747, color: "#0090A6" },

  // 九龍 (Kowloon) - 5 districts
  { id: "九龍城區", name: "九龍城區", region: "九龍", lat: 22.3282, lng: 114.1916, color: "#7C3AED" },
  { id: "觀塘區", name: "觀塘區", region: "九龍", lat: 22.3119, lng: 114.2262, color: "#6D28D9" },
  { id: "深水埗區", name: "深水埗區", region: "九龍", lat: 22.3308, lng: 114.1624, color: "#5B21B6" },
  { id: "黃大仙區", name: "黃大仙區", region: "九龍", lat: 22.3427, lng: 114.1932, color: "#4C1D95" },
  { id: "油尖旺區", name: "油尖旺區", region: "九龍", lat: 22.3117, lng: 114.1694, color: "#8B5CF6" },

  // 新界 (New Territories) - 9 districts
  { id: "離島區", name: "離島區", region: "新界", lat: 22.2617, lng: 113.9456, color: "#10B981" },
  { id: "葵青區", name: "葵青區", region: "新界", lat: 22.3547, lng: 114.1269, color: "#059669" },
  { id: "北區", name: "北區", region: "新界", lat: 22.4941, lng: 114.1386, color: "#047857" },
  { id: "西貢區", name: "西貢區", region: "新界", lat: 22.3829, lng: 114.2701, color: "#065F46" },
  { id: "沙田區", name: "沙田區", region: "新界", lat: 22.3823, lng: 114.1951, color: "#34D399" },
  { id: "大埔區", name: "大埔區", region: "新界", lat: 22.4513, lng: 114.1686, color: "#6EE7B7" },
  { id: "荃灣區", name: "荃灣區", region: "新界", lat: 22.3707, lng: 114.1138, color: "#A7F3D0" },
  { id: "屯門區", name: "屯門區", region: "新界", lat: 22.3908, lng: 113.9727, color: "#D1FAE5" },
  { id: "元朗區", name: "元朗區", region: "新界", lat: 22.4445, lng: 114.0222, color: "#ECFDF5" },
];

/**
 * Get district info by ID
 */
export function getDistrictInfo(districtId: District18): DistrictMapInfo | undefined {
  return DISTRICT_MAP_DATA.find((d) => d.id === districtId);
}

/**
 * District stats for display
 */
export interface DistrictStats {
  total: number;
  kindergarten: number;
  primary: number;
  secondary: number;
  byCategory: Record<SchoolCategory, number>;
}

/**
 * Calculate stats for a specific district
 */
export function calculateDistrictStats(schools: School[], district18: District18): DistrictStats {
  const districtSchools = schools.filter((s) => s.district18 === district18);

  const stats: DistrictStats = {
    total: districtSchools.length,
    kindergarten: 0,
    primary: 0,
    secondary: 0,
    byCategory: {
      "公立": 0,
      "資助": 0,
      "直資": 0,
      "私立": 0,
      "國際": 0,
    },
  };

  districtSchools.forEach((school) => {
    // Count by level
    if (school.level === "幼稚園") stats.kindergarten++;
    else if (school.level === "小學") stats.primary++;
    else if (school.level === "中學") stats.secondary++;

    // Skip kindergartens for category breakdown (only count primary/secondary)
    if (school.level === "幼稚園") return;

    // Count by category - use isInternational() for 國際 (consistent with filter logic)
    const schoolIsInternational = isInternational(school);

    if (schoolIsInternational) {
      // International schools count under 國際, not their original category
      stats.byCategory["國際"]++;
    } else if (stats.byCategory[school.category] !== undefined) {
      // Non-international schools use their category field
      stats.byCategory[school.category]++;
    }
  });

  return stats;
}

/**
 * Calculate stats for all 18 districts
 */
export function calculateAllDistrictStats(schools: School[]): Map<District18, DistrictStats> {
  const statsMap = new Map<District18, DistrictStats>();

  DISTRICT_MAP_DATA.forEach((district) => {
    statsMap.set(district.id, calculateDistrictStats(schools, district.id));
  });

  return statsMap;
}

/**
 * Region colors for grouping
 */
export const REGION_COLORS = {
  "港島": "#00D9FF",
  "九龍": "#7C3AED",
  "新界": "#10B981",
} as const;

/**
 * Get districts by region
 */
export function getDistrictsByRegion(region: "港島" | "九龍" | "新界"): DistrictMapInfo[] {
  return DISTRICT_MAP_DATA.filter((d) => d.region === region);
}
