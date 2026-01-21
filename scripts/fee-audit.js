/**
 * Fee Data Audit Script
 *
 * 用途：費用數據自檢，給開發者工程安心感
 * 運行：node scripts/fee-audit.js
 *
 * 檢查項目：
 * 1. tuition / mandatory fee 負數
 * 2. tuition_min > tuition_max 異常
 * 3. currency 非 HKD
 * 4. 其他明顯不合理的費用異常
 */

const fs = require("fs");
const path = require("path");

// ============================================
// 讀取數據
// ============================================

const schoolsPath = path.join(__dirname, "../data/schools.ts");
const feesPath = path.join(__dirname, "../data/fees-2025-26.ts");

const schoolsContent = fs.readFileSync(schoolsPath, "utf-8");
const feesContent = fs.readFileSync(feesPath, "utf-8");

// 提取學校基本信息
function extractSchools() {
  const schools = [];
  const regex = /\{\s*"id":\s*"([^"]+)"[^}]*?"name":\s*"([^"]+)"[^}]*?"category":\s*"([^"]+)"[^}]*?"tuitionMin":\s*(\d+)[^}]*?"tuitionMax":\s*(\d+)/gs;
  let match;
  while ((match = regex.exec(schoolsContent)) !== null) {
    schools.push({
      id: match[1],
      name: match[2],
      category: match[3],
      tuitionMin: parseInt(match[4], 10),
      tuitionMax: parseInt(match[5], 10),
    });
  }
  return schools;
}

// 提取費用數據
function extractFees() {
  const fees = {};

  // 匹配每個學校的費用塊
  const schoolBlockRegex = /"(edb_[^"]+)":\s*\{[\s\S]*?schoolYear[\s\S]*?(?=\n  "edb_|\n\};)/g;
  let blockMatch;

  while ((blockMatch = schoolBlockRegex.exec(feesContent)) !== null) {
    const schoolId = blockMatch[1];
    const block = blockMatch[0];

    const feeData = {
      schoolId,
      tuitionCurrency: null,
      tuitionBands: [],
      mandatoryCharges: [],
    };

    // 提取 tuition currency
    const currencyMatch = block.match(/tuition:\s*\{[\s\S]*?currency:\s*"([^"]+)"/);
    if (currencyMatch) {
      feeData.tuitionCurrency = currencyMatch[1];
    }

    // 提取 tuition bands
    const bandRegex = /\{\s*label:\s*"([^"]+)",\s*amountMin:\s*(-?\d+),\s*amountMax:\s*(-?\d+)\s*\}/g;
    let bandMatch;
    while ((bandMatch = bandRegex.exec(block)) !== null) {
      feeData.tuitionBands.push({
        label: bandMatch[1],
        amountMin: parseInt(bandMatch[2], 10),
        amountMax: parseInt(bandMatch[3], 10),
      });
    }

    // 提取 mandatory charges
    const chargeRegex = /type:\s*"([^"]+)"[\s\S]*?amountMin:\s*(-?\d+)[\s\S]*?amountMax:\s*(-?\d+)[\s\S]*?currency:\s*"([^"]+)"/g;
    let chargeMatch;
    while ((chargeMatch = chargeRegex.exec(block)) !== null) {
      feeData.mandatoryCharges.push({
        type: chargeMatch[1],
        amountMin: parseInt(chargeMatch[2], 10),
        amountMax: parseInt(chargeMatch[3], 10),
        currency: chargeMatch[4],
      });
    }

    fees[schoolId] = feeData;
  }

  return fees;
}

// ============================================
// 審計檢查
// ============================================

const anomalies = [];

function addAnomaly(schoolId, schoolName, type, details) {
  anomalies.push({ schoolId, schoolName, type, details });
}

function runAudit() {
  const schools = extractSchools();
  const fees = extractFees();

  console.log("=".repeat(60));
  console.log("Fee Data Audit Report");
  console.log("=".repeat(60));
  console.log(`Generated: ${new Date().toISOString()}`);
  console.log(`Schools in data/schools.ts: ${schools.length}`);
  console.log(`Fee entries in data/fees-2025-26.ts: ${Object.keys(fees).length}`);
  console.log("=".repeat(60));
  console.log();

  // 1. 檢查 schools.ts 中的 DSS 學校 tuition 異常
  console.log("【1】Checking DSS schools (data/schools.ts)...");
  const dssSchools = schools.filter(s => s.category === "直資");

  for (const school of dssSchools) {
    // 負數檢查
    if (school.tuitionMin < 0) {
      addAnomaly(school.id, school.name, "NEGATIVE_TUITION_MIN", `tuitionMin = ${school.tuitionMin}`);
    }
    if (school.tuitionMax < 0) {
      addAnomaly(school.id, school.name, "NEGATIVE_TUITION_MAX", `tuitionMax = ${school.tuitionMax}`);
    }
    // min > max 檢查
    if (school.tuitionMin > school.tuitionMax && school.tuitionMin > 0 && school.tuitionMax > 0) {
      addAnomaly(school.id, school.name, "MIN_EXCEEDS_MAX", `tuitionMin(${school.tuitionMin}) > tuitionMax(${school.tuitionMax})`);
    }
    // 異常高值檢查 (> 50萬)
    if (school.tuitionMax > 500000) {
      addAnomaly(school.id, school.name, "UNUSUALLY_HIGH", `tuitionMax = HK$${school.tuitionMax.toLocaleString()}`);
    }
  }
  console.log(`  Checked ${dssSchools.length} DSS schools`);
  console.log();

  // 2. 檢查 fees-2025-26.ts 中的費用異常
  console.log("【2】Checking international/private school fees (data/fees-2025-26.ts)...");

  for (const [schoolId, feeData] of Object.entries(fees)) {
    const school = schools.find(s => s.id === schoolId);
    const schoolName = school?.name || schoolId;

    // 2a. Currency 檢查
    if (feeData.tuitionCurrency && feeData.tuitionCurrency !== "HKD") {
      addAnomaly(schoolId, schoolName, "NON_HKD_TUITION", `currency = ${feeData.tuitionCurrency}`);
    }

    // 2b. Tuition bands 檢查
    for (const band of feeData.tuitionBands) {
      if (band.amountMin < 0) {
        addAnomaly(schoolId, schoolName, "NEGATIVE_TUITION_BAND_MIN", `${band.label}: amountMin = ${band.amountMin}`);
      }
      if (band.amountMax < 0) {
        addAnomaly(schoolId, schoolName, "NEGATIVE_TUITION_BAND_MAX", `${band.label}: amountMax = ${band.amountMax}`);
      }
      if (band.amountMin > band.amountMax && band.amountMin > 0 && band.amountMax > 0) {
        addAnomaly(schoolId, schoolName, "BAND_MIN_EXCEEDS_MAX", `${band.label}: min(${band.amountMin}) > max(${band.amountMax})`);
      }
      if (band.amountMax > 500000) {
        addAnomaly(schoolId, schoolName, "UNUSUALLY_HIGH_BAND", `${band.label}: HK$${band.amountMax.toLocaleString()}`);
      }
    }

    // 2c. Mandatory charges 檢查
    for (const charge of feeData.mandatoryCharges) {
      if (charge.currency !== "HKD") {
        addAnomaly(schoolId, schoolName, "NON_HKD_CHARGE", `${charge.type}: currency = ${charge.currency}`);
      }
      if (charge.amountMin < 0) {
        addAnomaly(schoolId, schoolName, "NEGATIVE_CHARGE_MIN", `${charge.type}: amountMin = ${charge.amountMin}`);
      }
      if (charge.amountMax < 0) {
        addAnomaly(schoolId, schoolName, "NEGATIVE_CHARGE_MAX", `${charge.type}: amountMax = ${charge.amountMax}`);
      }
      if (charge.amountMin > charge.amountMax && charge.amountMin > 0 && charge.amountMax > 0) {
        addAnomaly(schoolId, schoolName, "CHARGE_MIN_EXCEEDS_MAX", `${charge.type}: min(${charge.amountMin}) > max(${charge.amountMax})`);
      }
      if (charge.amountMax > 200000) {
        addAnomaly(schoolId, schoolName, "UNUSUALLY_HIGH_CHARGE", `${charge.type}: HK$${charge.amountMax.toLocaleString()}`);
      }
    }
  }
  console.log(`  Checked ${Object.keys(fees).length} fee entries`);
  console.log();

  // 3. 輸出結果
  console.log("=".repeat(60));
  console.log("AUDIT RESULTS");
  console.log("=".repeat(60));

  if (anomalies.length === 0) {
    console.log();
    console.log("✅ No anomalies found");
    console.log();
  } else {
    console.log();
    console.log(`⚠️  Found ${anomalies.length} anomalie(s):`);
    console.log();

    for (const a of anomalies) {
      console.log(`  School: ${a.schoolName}`);
      console.log(`  ID: ${a.schoolId}`);
      console.log(`  Type: ${a.type}`);
      console.log(`  Details: ${a.details}`);
      console.log("-".repeat(40));
    }
  }

  console.log();
  console.log("=".repeat(60));
  console.log("Audit complete.");
  console.log("=".repeat(60));

  // Exit code
  process.exit(anomalies.length > 0 ? 1 : 0);
}

// ============================================
// 執行
// ============================================
runAudit();
