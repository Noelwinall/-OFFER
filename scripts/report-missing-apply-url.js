/**
 * Missing Application URL Report Script
 *
 * 用途：統計缺失申請頁 URL 的學校清單
 * 運行：node scripts/report-missing-apply-url.js
 *
 * 輸出：
 * 1. 總學校數、存在申請頁URL數量、缺失數量、缺失比例
 * 2. 缺失清單（前 50 條）：id | 中文名 | 英文名 | 官網URL
 */

const fs = require("fs");
const path = require("path");

// ============================================
// 讀取數據
// ============================================

const schoolsPath = path.join(__dirname, "../data/schools.ts");
const schoolsContent = fs.readFileSync(schoolsPath, "utf-8");

/**
 * 提取學校基本信息（包含 applicationLink 和 website）
 */
function extractSchools() {
  const schools = [];

  // 匹配每個學校對象塊
  const schoolBlockRegex = /\{\s*"id":\s*"([^"]+)"[\s\S]*?(?=\n  \{|\n\];)/g;
  let blockMatch;

  while ((blockMatch = schoolBlockRegex.exec(schoolsContent)) !== null) {
    const block = blockMatch[0];
    const id = blockMatch[1];

    // 提取各欄位
    const nameMatch = block.match(/"name":\s*"([^"]+)"/);
    const nameEnMatch = block.match(/"nameEn":\s*"([^"]+)"/);
    const websiteMatch = block.match(/"website":\s*"([^"]*)"/);
    const applicationLinkMatch = block.match(/"applicationLink":\s*"([^"]*)"/);

    if (nameMatch) {
      schools.push({
        id,
        name: nameMatch[1],
        nameEn: nameEnMatch ? nameEnMatch[1] : "",
        website: websiteMatch ? websiteMatch[1] : "",
        applicationLink: applicationLinkMatch ? applicationLinkMatch[1] : "",
      });
    }
  }

  return schools;
}

// ============================================
// 主程序
// ============================================

console.log("=".repeat(60));
console.log("  缺失申請頁 URL 報告");
console.log("=".repeat(60));
console.log();

const schools = extractSchools();

// 統計
const totalCount = schools.length;
const hasApplyUrlCount = schools.filter(s => s.applicationLink && s.applicationLink.trim() !== "").length;
const missingApplyUrlCount = totalCount - hasApplyUrlCount;
const missingRate = ((missingApplyUrlCount / totalCount) * 100).toFixed(2);

console.log("【統計摘要】");
console.log(`  總學校數量：${totalCount}`);
console.log(`  存在申請頁 URL：${hasApplyUrlCount}`);
console.log(`  缺失申請頁 URL：${missingApplyUrlCount}`);
console.log(`  缺失比例：${missingRate}%`);
console.log();

// 缺失清單
const missingSchools = schools.filter(s => !s.applicationLink || s.applicationLink.trim() === "");

console.log("【缺失申請頁 URL 清單（前 50 條）】");
console.log("-".repeat(100));
console.log(
  "ID".padEnd(25) +
  "中文名".padEnd(30) +
  "英文名".padEnd(25) +
  "官網URL"
);
console.log("-".repeat(100));

const displayList = missingSchools.slice(0, 50);
displayList.forEach(s => {
  const id = s.id.substring(0, 23).padEnd(25);
  const name = s.name.substring(0, 15).padEnd(18);
  const nameEn = (s.nameEn || "-").substring(0, 23).padEnd(25);
  const website = s.website || "（無）";
  console.log(`${id}${name}${nameEn}${website}`);
});

console.log("-".repeat(100));
console.log(`顯示 ${displayList.length} / ${missingApplyUrlCount} 條`);
console.log();
console.log("報告完成。");
