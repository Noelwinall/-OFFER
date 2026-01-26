/**
 * Script to update tuitionMin/tuitionMax for private schools in schools_raw.ts
 * Run with: npx tsx scripts/update-private-tuition.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const tuitionUpdates: Record<string, { tuitionMin: number; tuitionMax: number }> = {
  // Original 14 schools
  "edb_210706000123": { tuitionMin: 86000, tuitionMax: 86000 },       // 拔萃女小學
  "edb_212326000123": { tuitionMin: 55000, tuitionMax: 55000 },       // 聖保祿學校（小學部）
  "edb_513350000123": { tuitionMin: 66400, tuitionMax: 66400 },       // 香港培正小學
  "edb_512516000123": { tuitionMin: 69000, tuitionMax: 69000 },       // 九龍塘學校（小學）
  "edb_575399000123": { tuitionMin: 63000, tuitionMax: 63000 },       // 民生書院小學
  "edb_517372000123": { tuitionMin: 92500, tuitionMax: 92500 },       // 聖士提反書院附屬小學
  "edb_575240000123": { tuitionMin: 57500, tuitionMax: 57500 },       // 高主教書院小學部
  "edb_591904000123": { tuitionMin: 55000, tuitionMax: 55000 },       // 聖類斯中學(小學部)
  "edb_210315000121": { tuitionMin: 53680, tuitionMax: 53680 },       // 嘉諾撒聖心學校私立部
  "edb_138177000123": { tuitionMin: 57800, tuitionMax: 59900 },       // 九龍禮賢學校
  "edb_534285000123": { tuitionMin: 116600, tuitionMax: 121000 },     // 激活英文小學
  "edb_132730000123": { tuitionMin: 43500, tuitionMax: 43500 },       // 蘇浙小學校
  "edb_514659000123": { tuitionMin: 59420, tuitionMax: 92840 },       // 崇真小學暨幼稚園
  "edb_212466000423": { tuitionMin: 78000, tuitionMax: 80000 },       // 聖若望英文書院（小學部）

  // New batch of schools
  "edb_210021000123": { tuitionMin: 51000, tuitionMax: 51000 },       // 聖嘉勒小學
  "edb_133566000123": { tuitionMin: 54900, tuitionMax: 54900 },       // 聖方濟各英文小學
  "edb_131350000123": { tuitionMin: 55000, tuitionMax: 55000 },       // 聖三一堂小學
  "edb_528617000123": { tuitionMin: 44000, tuitionMax: 44000 },       // 聖母小學
  "edb_588130000123": { tuitionMin: 47500, tuitionMax: 48500 },       // 德望小學暨幼稚園
  "edb_133442000123": { tuitionMin: 62350, tuitionMax: 62350 },       // 九龍塘宣道小學
  "edb_512273000223": { tuitionMin: 67200, tuitionMax: 67200 },       // 救恩學校
  "edb_594792000123": { tuitionMin: 63740, tuitionMax: 65650 },       // 九龍真光中學（小學部）
  "edb_324477000123": { tuitionMin: 62200, tuitionMax: 62200 },       // 香港培道小學
  "edb_211303000123": { tuitionMin: 53200, tuitionMax: 53200 },       // 聖若瑟英文小學
  "edb_513725000123": { tuitionMin: 117500, tuitionMax: 117500 },     // 香港復臨學校（小學）
  "edb_513725000133": { tuitionMin: 139000, tuitionMax: 139000 },     // 香港復臨學校（中學）
  "edb_151262000123": { tuitionMin: 73000, tuitionMax: 73000 },       // 基督教香港信義會啟信學校
  "edb_603600000123": { tuitionMin: 100309, tuitionMax: 100309 },     // 德萃小學
  "edb_130060000123": { tuitionMin: 100309, tuitionMax: 100309 },     // 漢師德萃學校
  "edb_553190000323": { tuitionMin: 221130, tuitionMax: 240320 },     // 弘立書院（小學）
  "edb_553190000333": { tuitionMin: 257400, tuitionMax: 268470 },     // 弘立書院（中學）
  "edb_543560000423": { tuitionMin: 99825, tuitionMax: 129789 },      // 保良局蔡繼有學校（小學）
  "edb_543560000433": { tuitionMin: 145453, tuitionMax: 146927 },     // 保良局蔡繼有學校（中學）
  "edb_570370000423": { tuitionMin: 223700, tuitionMax: 256700 },     // 港灣學校（小學）incl. capital levy
  "edb_570370000323": { tuitionMin: 223700, tuitionMax: 256700 },     // 港灣學校（小學）another campus
  "edb_570370000333": { tuitionMin: 223700, tuitionMax: 256700 },     // 港灣學校（中學）
  "edb_607819000123": { tuitionMin: 198000, tuitionMax: 198000 },     // 漢鼎書院（小學）
  "edb_607819000133": { tuitionMin: 208000, tuitionMax: 218000 },     // 漢鼎書院（中學）
  "edb_611751000123": { tuitionMin: 188000, tuitionMax: 223000 },     // 香港威雅學校（小學）incl. capital levy
  "edb_611751000133": { tuitionMin: 198000, tuitionMax: 233000 },     // 香港威雅學校（中學）incl. capital levy
  "edb_598062000123": { tuitionMin: 85800, tuitionMax: 85800 },       // 英藝英文小學
  "edb_132047000123": { tuitionMin: 60000, tuitionMax: 63650 },       // 香港真光中學附屬小學暨幼稚園

  // Third batch of schools
  "edb_325279000123": { tuitionMin: 140360, tuitionMax: 143660 },     // 啓思小學
  "edb_553867000323": { tuitionMin: 63000, tuitionMax: 63000 },       // 國際基督教優質音樂中學暨小學（小學）
  "edb_553867000333": { tuitionMin: 70000, tuitionMax: 70000 },       // 國際基督教優質音樂中學暨小學（中學）
  "edb_615137000133": { tuitionMin: 146443, tuitionMax: 181643 },     // 大光德萃書院
  "edb_216208000123": { tuitionMin: 35500, tuitionMax: 37000 },       // 地利亞英文小學暨幼稚園
  "edb_216232000123": { tuitionMin: 104500, tuitionMax: 104500 },     // 九龍塘方方樂趣英文小學
  "edb_517100000223": { tuitionMin: 72520, tuitionMax: 72520 },       // 啓基學校
  "edb_592188000123": { tuitionMin: 105000, tuitionMax: 137400 },     // 新會商會港青基信學校
  "edb_581259000123": { tuitionMin: 135000, tuitionMax: 135000 },     // 培生學校（小學）
  "edb_581259000133": { tuitionMin: 135000, tuitionMax: 135000 },     // 培生學校（中學）
  "edb_216224000123": { tuitionMin: 94985, tuitionMax: 94985 },       // 神召會德萃書院（小學部）
  "edb_324434000123": { tuitionMin: 44000, tuitionMax: 46000 },       // 德雅小學
  "edb_112720000123": { tuitionMin: 60000, tuitionMax: 75000 },       // 鄉師自然學校
  "edb_607290000123": { tuitionMin: 115600, tuitionMax: 119100 },     // 保良局建造商會學校

  // Fourth batch of schools
  "edb_589055000123": { tuitionMin: 144470, tuitionMax: 150985 },     // 中華基督教青年會基雋小學 (含capital levy)
  "edb_596140000123": { tuitionMin: 138000, tuitionMax: 147500 },     // 樹宏學校（小學）
  "edb_596140000233": { tuitionMin: 138000, tuitionMax: 147500 },     // 樹宏學校（中學）
  "edb_617334000123": { tuitionMin: 141120, tuitionMax: 166120 },     // 劍津英國學校（小學）含capital levy
  "edb_617334000223": { tuitionMin: 141120, tuitionMax: 166120 },     // 劍津英國學校（小學第二校舍）
  "edb_617334000133": { tuitionMin: 141120, tuitionMax: 166120 },     // 劍津英國學校（中學）
  "edb_617334000233": { tuitionMin: 141120, tuitionMax: 166120 },     // 劍津英國學校（中學第二校舍）
  "edb_622079000123": { tuitionMin: 146800, tuitionMax: 146800 },     // 安基司學校
  "edb_617393000123": { tuitionMin: 191510, tuitionMax: 191510 },     // 百卉九江書院
  "edb_623067000133": { tuitionMin: 202620, tuitionMax: 216920 },     // 聖道百卉書院
  "edb_608319000223": { tuitionMin: 141000, tuitionMax: 141000 },     // 香島華德福學校（小學）
  "edb_608319000233": { tuitionMin: 141000, tuitionMax: 141000 },     // 香島華德福學校（中學）
  "edb_579009000123": { tuitionMin: 89920, tuitionMax: 97060 },       // 銀礦灣學校
  "edb_571130000323": { tuitionMin: 305460, tuitionMax: 306000 },     // 愛培學校（自閉症專門）
  "edb_590371000223": { tuitionMin: 124190, tuitionMax: 124190 },     // 弘志學校
  "edb_608327000123": { tuitionMin: 68750, tuitionMax: 68750 },       // 示昕學校（小學）
  "edb_608327000133": { tuitionMin: 71280, tuitionMax: 71280 },       // 示昕學校（中學）
  "edb_619957000123": { tuitionMin: 336000, tuitionMax: 336000 },     // 奧柏學校（自閉症專門）
  "edb_620548000123": { tuitionMin: 143000, tuitionMax: 144000 },     // 花園華德福學校
  "edb_612820000133": { tuitionMin: 29940, tuitionMax: 29940 },       // 泰來書院
  "edb_621374000133": { tuitionMin: 148000, tuitionMax: 168000 },     // 香港紫荊書院
  "edb_627267000133": { tuitionMin: 198000, tuitionMax: 268000 },     // 香港威雅學校（九龍）含capital levy
  "edb_289515000123": { tuitionMin: 17600, tuitionMax: 35000 },       // California School（小學）
  "edb_289515000133": { tuitionMin: 35000, tuitionMax: 47850 },       // California School（中學）
  "edb_132730000223": { tuitionMin: 43500, tuitionMax: 54000 },       // 蘇浙小學校（北角分校）
  "edb_132730000121": { tuitionMin: 43500, tuitionMax: 54000 },       // 蘇浙小學校（另一校舍）
};

const filePath = path.join(__dirname, '../data/schools_raw.ts');
let content = fs.readFileSync(filePath, 'utf-8');

let updatedCount = 0;

for (const [id, tuition] of Object.entries(tuitionUpdates)) {
  // Pattern to find the school entry and update tuitionMin/tuitionMax
  const idPattern = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"tuitionMin":\\s*)\\d+`, 'g');
  const maxPattern = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"tuitionMax":\\s*)\\d+`, 'g');

  // Find if this ID exists in the file
  if (content.includes(`"id": "${id}"`)) {
    // Find the school block and update tuitionMin/tuitionMax
    const schoolBlockRegex = new RegExp(
      `("id":\\s*"${id}"[\\s\\S]*?"tuitionMin":\\s*)(\\d+)([\\s\\S]*?"tuitionMax":\\s*)(\\d+)`,
      'g'
    );

    const newContent = content.replace(schoolBlockRegex, (match, p1, oldMin, p3, oldMax) => {
      console.log(`Updating ${id}: tuitionMin ${oldMin} -> ${tuition.tuitionMin}, tuitionMax ${oldMax} -> ${tuition.tuitionMax}`);
      updatedCount++;
      return `${p1}${tuition.tuitionMin}${p3}${tuition.tuitionMax}`;
    });

    content = newContent;
  } else {
    console.log(`ID not found: ${id}`);
  }
}

fs.writeFileSync(filePath, content);
console.log(`\nUpdated ${updatedCount} school entries.`);
