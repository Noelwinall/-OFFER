/**
 * Generate through-train / affiliated / linked school mapping
 *
 * Sources: through_train schools.docx (extracted data)
 * Output: through_train_mapping_v1.csv, through_train_needs_review_v1.csv
 */

const fs = require('fs');
const path = require('path');

// Raw data from through_train schools.docx
const throughTrainData = [
  // Through-train schools (47 total from document)
  { type: "THROUGH_TRAIN", primary: "新會商會學校", secondary: "新會商會陳白沙紀念中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "佛教黃焯菴小學", secondary: "佛教黃鳳翎中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "中華基督教會灣仔堂基道小學(九龍城)", secondary: "中華基督教會基道中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "天神嘉諾撒學校", secondary: "嘉諾撒聖瑪利書院", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "嘉諾撒聖瑪利學校", secondary: "嘉諾撒聖瑪利書院", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "港九街坊婦女會孫方中小學", secondary: "港九街坊婦女會孫方中書院", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "西貢崇真天主教學校(小學部)", secondary: "西貢崇真天主教學校(中學部)", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "香海正覺蓮社佛教黃藻森學校", secondary: "香海正覺蓮社佛教正覺中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "天水圍循道衞理小學", secondary: "天水圍循道衞理中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "金巴崙長老會耀道小學", secondary: "金巴崙長老會耀道中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "順德聯誼總會伍冕端小學", secondary: "順德聯誼總會翁祐中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "伊利沙伯中學舊生會小學", secondary: "伊利沙伯中學舊生會中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "伊利沙伯中學舊生會小學", secondary: "伊利沙伯中學舊生會湯國華中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "伊利沙伯中學舊生會小學分校", secondary: "伊利沙伯中學舊生會中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "伊利沙伯中學舊生會小學分校", secondary: "伊利沙伯中學舊生會湯國華中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "東涌天主教學校", secondary: "東涌天主教學校", source: "EDB" }, // same school pri+sec
  { type: "THROUGH_TRAIN", primary: "香港教育工作者聯會黃楚標學校", secondary: "香港教育工作者聯會黃楚標中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "嗇色園主辦可譽中學暨可譽小學", secondary: "嗇色園主辦可譽中學暨可譽小學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "靈糧堂秀德小學", secondary: "靈糧堂怡文中學", source: "EDB" },
  { type: "THROUGH_TRAIN", primary: "拔萃男書院附屬小學", secondary: "拔萃男書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "基督教香港信義會宏信書院", secondary: "基督教香港信義會宏信書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "保良局陸慶濤小學", secondary: "保良局羅氏基金中學", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "香港華人基督教聯會真道書院", secondary: "香港華人基督教聯會真道書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "播道書院", secondary: "播道書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "優才(楊殷有娣)書院", secondary: "優才(楊殷有娣)書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "浸大附屬學校王錦輝中小學", secondary: "浸大附屬學校王錦輝中小學", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "培僑書院", secondary: "培僑書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "港大同學會小學", secondary: "港大同學會書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "漢華中學(小學部)", secondary: "漢華中學", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "聖保羅男女中學附屬小學", secondary: "聖保羅男女中學", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "英華小學", secondary: "英華書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "聖瑪加利男女英文中小學", secondary: "聖瑪加利男女英文中小學", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "地利亞(閩僑)英文小學", secondary: "地利亞修女紀念學校(百老匯)", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "福建中學附屬學校", secondary: "福建中學", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "弘立書院", secondary: "弘立書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "漢鼎書院", secondary: "漢鼎書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "滬江維多利亞學校", secondary: "滬江維多利亞學校", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "拔萃女小學", secondary: "拔萃女書院", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "保良局蔡繼有學校", secondary: "保良局蔡繼有學校", source: "CHSC" },
  { type: "THROUGH_TRAIN", primary: "國際基督教優質音樂中學暨小學", secondary: "國際基督教優質音樂中學暨小學", source: "CHSC" },

  // Affiliated schools (29 pairs)
  { type: "AFFILIATED", primary: "嘉諾撒聖心學校", secondary: "嘉諾撒聖心書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖士提反女子中學附屬小學", secondary: "聖士提反女子中學", source: "CHSC" },
  { type: "AFFILIATED", primary: "嘉諾撒聖心學校私立部", secondary: "嘉諾撒聖心書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖嘉勒小學", secondary: "聖嘉勒女書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖類斯中學(小學部)", secondary: "聖類斯中學", source: "CHSC" },
  { type: "AFFILIATED", primary: "番禺會所華仁小學", secondary: "香港華仁書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "慈幼學校", secondary: "慈幼英文學校", source: "CHSC" },
  { type: "AFFILIATED", primary: "香港仔聖伯多祿天主教小學", secondary: "聖伯多祿中學", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖伯多祿天主教小學", secondary: "聖伯多祿中學", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖保羅書院小學", secondary: "聖保羅書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖士提反書院附屬小學", secondary: "聖士提反書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "瑪利曼小學", secondary: "瑪利曼中學", source: "CHSC" },
  { type: "AFFILIATED", primary: "嘉諾撒聖方濟各學校", secondary: "嘉諾撒聖方濟各書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖若瑟小學", secondary: "聖若瑟書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖保祿天主教小學", secondary: "聖保祿中學", source: "CHSC" },
  { type: "AFFILIATED", primary: "高主教書院小學部", secondary: "高主教書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖保祿學校(小學部)", secondary: "聖保祿學校", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖羅撒學校", secondary: "聖羅撒書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "嘉諾撒聖家學校", secondary: "嘉諾撒聖家書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "嘉諾撒聖家學校(九龍塘)", secondary: "嘉諾撒聖家書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "喇沙小學", secondary: "喇沙書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "瑪利諾修院學校(小學部)", secondary: "瑪利諾修院學校(中學部)", source: "CHSC" },
  { type: "AFFILIATED", primary: "民生書院小學", secondary: "民生書院", source: "CHSC" },
  { type: "AFFILIATED", primary: "香港培正小學", secondary: "香港培正中學", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖若瑟英文小學", secondary: "聖若瑟英文中學", source: "CHSC" },
  { type: "AFFILIATED", primary: "瑪利諾神父教會學校(小學部)", secondary: "瑪利諾神父教會學校", source: "CHSC" },
  { type: "AFFILIATED", primary: "天主教伍華小學", secondary: "天主教伍華中學", source: "CHSC" },
  { type: "AFFILIATED", primary: "聖母小學", secondary: "聖母書院", source: "CHSC" },

  // Linked schools (major ones - there are 150+ pairs but many are government schools)
  { type: "LINKED", primary: "李陞小學", secondary: "英皇書院", source: "CHSC" },
  { type: "LINKED", primary: "般咸道官立小學", secondary: "英皇書院", source: "CHSC" },
  { type: "LINKED", primary: "香港南區官立小學", secondary: "英皇書院", source: "CHSC" },
  { type: "LINKED", primary: "香島道官立小學", secondary: "英皇書院", source: "CHSC" },
  { type: "LINKED", primary: "李陞小學", secondary: "庇理羅士女子中學", source: "CHSC" },
  { type: "LINKED", primary: "般咸道官立小學", secondary: "庇理羅士女子中學", source: "CHSC" },
  { type: "LINKED", primary: "香港南區官立小學", secondary: "庇理羅士女子中學", source: "CHSC" },
  { type: "LINKED", primary: "香島道官立小學", secondary: "庇理羅士女子中學", source: "CHSC" },
  { type: "LINKED", primary: "軒尼詩道官立小學(上午)", secondary: "庇理羅士女子中學", source: "CHSC" },
  { type: "LINKED", primary: "軒尼詩道官立小學(下午)", secondary: "庇理羅士女子中學", source: "CHSC" },
  { type: "LINKED", primary: "軒尼詩道官立小學(上午)", secondary: "皇仁書院", source: "CHSC" },
  { type: "LINKED", primary: "軒尼詩道官立小學(下午)", secondary: "皇仁書院", source: "CHSC" },
  { type: "LINKED", primary: "愛秩序灣官立小學", secondary: "皇仁書院", source: "CHSC" },
  { type: "LINKED", primary: "香港嘉諾撒學校", secondary: "嘉諾撒書院", source: "CHSC" },
  { type: "LINKED", primary: "玫瑰崗學校(小學部)", secondary: "玫瑰崗學校", source: "CHSC" },
  { type: "LINKED", primary: "香港真光中學(小學部)", secondary: "香港真光中學", source: "CHSC" },
  { type: "LINKED", primary: "嘉諾撒培德學校", secondary: "嘉諾撒培德書院", source: "CHSC" },
  { type: "LINKED", primary: "馬頭涌官立小學", secondary: "何文田官立中學", source: "CHSC" },
  { type: "LINKED", primary: "農圃道官立小學", secondary: "何文田官立中學", source: "CHSC" },
  { type: "LINKED", primary: "九龍塘官立小學", secondary: "何文田官立中學", source: "CHSC" },
  { type: "LINKED", primary: "馬頭涌官立小學", secondary: "伊利沙伯中學", source: "CHSC" },
  { type: "LINKED", primary: "農圃道官立小學", secondary: "伊利沙伯中學", source: "CHSC" },
  { type: "LINKED", primary: "九龍塘官立小學", secondary: "伊利沙伯中學", source: "CHSC" },
  { type: "LINKED", primary: "香港培道小學", secondary: "香港培道中學", source: "CHSC" },
  { type: "LINKED", primary: "九龍真光中學(小學部)", secondary: "九龍真光中學", source: "CHSC" },
  { type: "LINKED", primary: "聖三一堂小學", secondary: "聖公會聖三一堂中學", source: "CHSC" },
  { type: "LINKED", primary: "德信學校", secondary: "德信中學", source: "CHSC" },
  { type: "LINKED", primary: "培基小學", secondary: "香港神託會培基書院", source: "CHSC" },
  { type: "LINKED", primary: "浸信會呂明才小學", secondary: "浸信會呂明才中學", source: "CHSC" },
  { type: "LINKED", primary: "浸信會沙田圍呂明才小學", secondary: "浸信會呂明才中學", source: "CHSC" },
  { type: "LINKED", primary: "聖母無玷聖心學校", secondary: "聖母無玷聖心書院", source: "CHSC" },
  { type: "LINKED", primary: "沙田崇真學校", secondary: "馬鞍山崇真中學", source: "CHSC" },
  { type: "LINKED", primary: "救恩學校", secondary: "匯基書院(東九龍)", source: "CHSC" },
  { type: "LINKED", primary: "神召第一小學暨幼稚園", secondary: "匯基書院(東九龍)", source: "CHSC" },
  { type: "LINKED", primary: "路德會呂祥光小學", secondary: "路德會呂祥光中學", source: "CHSC" },
  // ... many more linked schools (government schools mostly)
];

// Read schools_raw.ts to get all school names and IDs
const schoolsContent = fs.readFileSync(path.join(__dirname, '../data/schools_raw.ts'), 'utf-8');

// Build name to ID mapping
const schoolMatches = schoolsContent.match(/\{[^{}]*"id"[^{}]*\}/g) || [];
const nameToId = {};
const idToSchool = {};

for (const match of schoolMatches) {
  const idMatch = match.match(/"id":\s*"([^"]+)"/);
  const nameMatch = match.match(/"name":\s*"([^"]+)"/);
  const levelMatch = match.match(/"level":\s*"([^"]+)"/);
  const nameEnMatch = match.match(/"nameEn":\s*"([^"]+)"/);

  if (idMatch && nameMatch) {
    const id = idMatch[1];
    const name = nameMatch[1];
    const level = levelMatch ? levelMatch[1] : '';
    const nameEn = nameEnMatch ? nameEnMatch[1] : '';

    // Store by name for lookup
    if (!nameToId[name]) nameToId[name] = [];
    nameToId[name].push({ id, level, nameEn });

    // Store by ID for reverse lookup
    idToSchool[id] = { name, level, nameEn };
  }
}

// Function to find school ID by name
function findSchoolId(name, expectedLevel) {
  // Normalize name
  const normalizedName = name
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .replace(/\s+/g, '')
    .trim();

  // Try exact match first
  for (const [schoolName, schools] of Object.entries(nameToId)) {
    const normalizedSchoolName = schoolName
      .replace(/（/g, '(')
      .replace(/）/g, ')')
      .replace(/\s+/g, '')
      .trim();

    if (normalizedSchoolName === normalizedName) {
      // Filter by level if specified
      if (expectedLevel) {
        const filtered = schools.filter(s => s.level === expectedLevel);
        if (filtered.length === 1) return { id: filtered[0].id, confidence: 'HIGH' };
        if (filtered.length > 1) return { id: filtered[0].id, confidence: 'LOW', note: 'multiple_matches' };
      }
      if (schools.length === 1) return { id: schools[0].id, confidence: 'HIGH' };
      // If multiple matches, try to pick by level hint
      const primary = schools.find(s => s.level === '小學');
      const secondary = schools.find(s => s.level === '中學');
      if (expectedLevel === '小學' && primary) return { id: primary.id, confidence: 'HIGH' };
      if (expectedLevel === '中學' && secondary) return { id: secondary.id, confidence: 'HIGH' };
      return { id: schools[0].id, confidence: 'LOW', note: 'multiple_matches' };
    }
  }

  // Try partial match
  for (const [schoolName, schools] of Object.entries(nameToId)) {
    const normalizedSchoolName = schoolName
      .replace(/（/g, '(')
      .replace(/）/g, ')')
      .replace(/\s+/g, '')
      .trim();

    if (normalizedSchoolName.includes(normalizedName) || normalizedName.includes(normalizedSchoolName)) {
      if (expectedLevel) {
        const filtered = schools.filter(s => s.level === expectedLevel);
        if (filtered.length === 1) return { id: filtered[0].id, confidence: 'MEDIUM' };
      }
      if (schools.length === 1) return { id: schools[0].id, confidence: 'MEDIUM' };
    }
  }

  return null;
}

// Process all relationships
const mappings = [];
const needsReview = [];
const processedPairs = new Set();

for (const rel of throughTrainData) {
  const pairKey = `${rel.type}|${rel.primary}|${rel.secondary}`;
  if (processedPairs.has(pairKey)) continue;
  processedPairs.add(pairKey);

  const primaryResult = findSchoolId(rel.primary, '小學');
  const secondaryResult = findSchoolId(rel.secondary, '中學');

  if (!primaryResult || !secondaryResult) {
    needsReview.push({
      school_id: primaryResult?.id || '',
      stage: 'PRIMARY',
      school_name_zh: rel.primary,
      school_name_en: '',
      relation_type: rel.type,
      reason: !primaryResult ? 'primary_not_found' : 'secondary_not_found'
    });
    if (!secondaryResult) {
      needsReview.push({
        school_id: secondaryResult?.id || '',
        stage: 'SECONDARY',
        school_name_zh: rel.secondary,
        school_name_en: '',
        relation_type: rel.type,
        reason: 'secondary_not_found'
      });
    }
    continue;
  }

  // Add primary -> secondary mapping
  mappings.push({
    school_id: primaryResult.id,
    stage: 'PRIMARY',
    relation_type: rel.type,
    related_school_ids: secondaryResult.id,
    confidence: primaryResult.confidence === 'HIGH' && secondaryResult.confidence === 'HIGH' ? 'HIGH' : 'LOW',
    source: rel.source === 'EDB' ? 'through_train_EDB' : 'through_train_CHSC',
    notes: ''
  });

  // Add secondary -> primary mapping (reverse)
  mappings.push({
    school_id: secondaryResult.id,
    stage: 'SECONDARY',
    relation_type: rel.type,
    related_school_ids: primaryResult.id,
    confidence: primaryResult.confidence === 'HIGH' && secondaryResult.confidence === 'HIGH' ? 'HIGH' : 'LOW',
    source: rel.source === 'EDB' ? 'through_train_EDB' : 'through_train_CHSC',
    notes: ''
  });
}

// Consolidate mappings - group related_school_ids for same school
const consolidatedMap = {};
for (const m of mappings) {
  const key = `${m.school_id}|${m.stage}|${m.relation_type}`;
  if (!consolidatedMap[key]) {
    consolidatedMap[key] = { ...m, related_school_ids: [m.related_school_ids] };
  } else {
    if (!consolidatedMap[key].related_school_ids.includes(m.related_school_ids)) {
      consolidatedMap[key].related_school_ids.push(m.related_school_ids);
    }
  }
}

const finalMappings = Object.values(consolidatedMap).map(m => ({
  ...m,
  related_school_ids: m.related_school_ids.join('|')
}));

// Write mapping CSV
const mappingCsv = 'school_id,stage,relation_type,related_school_ids,confidence,source,notes\n' +
  finalMappings.map(m =>
    `${m.school_id},${m.stage},${m.relation_type},${m.related_school_ids},${m.confidence},${m.source},${m.notes}`
  ).join('\n');

fs.writeFileSync(path.join(__dirname, '../data/through_train_mapping_v1.csv'), mappingCsv);

// Write needs review CSV
const reviewCsv = 'school_id,stage,school_name_zh,school_name_en,relation_type,reason\n' +
  needsReview.map(r =>
    `${r.school_id},${r.stage},${r.school_name_zh},${r.school_name_en},${r.relation_type},${r.reason}`
  ).join('\n');

fs.writeFileSync(path.join(__dirname, '../data/through_train_needs_review_v1.csv'), reviewCsv);

// Summary
console.log('=== THROUGH-TRAIN MAPPING SUMMARY ===\n');
console.log('Total relationships processed:', throughTrainData.length);
console.log('Final mappings generated:', finalMappings.length);
console.log('Needs review:', needsReview.length);

const byType = {};
for (const m of finalMappings) {
  byType[m.relation_type] = (byType[m.relation_type] || 0) + 1;
}
console.log('\nBy type:');
for (const [type, count] of Object.entries(byType)) {
  console.log(`  ${type}: ${count}`);
}

// Show sample mappings
console.log('\n=== SAMPLE MAPPINGS ===\n');
for (const m of finalMappings.slice(0, 10)) {
  const school = idToSchool[m.school_id];
  const relatedNames = m.related_school_ids.split('|').map(id => idToSchool[id]?.name || id).join(', ');
  console.log(`${school?.name || m.school_id} (${m.stage})`);
  console.log(`  Type: ${m.relation_type}`);
  console.log(`  Related: ${relatedNames}`);
  console.log('');
}
