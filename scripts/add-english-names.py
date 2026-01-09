import re

# 學校英文名稱和搜索關鍵字映射
SCHOOL_EN_NAMES = {
    "漢基國際學校": ("Chinese International School", ["CIS", "Chinese International", "漢基"]),
    "耀中國際學校": ("Yew Chung International School", ["YCIS", "Yew Chung", "耀中"]),
    "香港國際學校": ("Hong Kong International School", ["HKIS", "Hong Kong International"]),
    "香港學堂": ("Hong Kong Academy", ["HKA", "HK Academy"]),
    "香港斯坦福美國學校": ("Stamford American School Hong Kong", ["SAIS", "Stamford American"]),
    "思貝禮國際學校": ("Shrewsbury International School", ["Shrewsbury"]),
    "香港加拿大國際學校": ("Canadian International School of Hong Kong", ["CDNIS", "Canadian International"]),
    "啟歷學校": ("Kellett School", ["Kellett"]),
    "德瑞國際學校": ("German Swiss International School", ["GSIS", "German Swiss"]),
    "哈羅香港國際學校": ("Harrow International School Hong Kong", ["Harrow", "哈羅"]),
    "香港墨爾文國際學校": ("Malvern College Hong Kong", ["Malvern", "墨爾文"]),
    "香港諾德安達國際學校": ("Nord Anglia International School Hong Kong", ["NAIS", "Nord Anglia"]),
    "香港美國學校": ("American School Hong Kong", ["ASHK", "American School"]),
    "南島中學": ("South Island School", ["SIS", "South Island", "英基"]),
    "西島中學": ("West Island School", ["WIS", "West Island", "英基"]),
    "港島中學": ("Island School", ["Island School", "英基"]),
    "英皇佐治五世學校": ("King George V School", ["KGV", "King George", "英基"]),
    "沙田學院": ("Sha Tin College", ["STC", "Sha Tin College", "英基"]),
    "香港澳洲國際學校": ("Australian International School Hong Kong", ["AISHK", "Australian International"]),
    "新加坡國際學校": ("Singapore International School", ["SISHK", "Singapore International"]),
    "法國國際學校": ("French International School", ["FIS", "French International"]),
    "宣道國際學校": ("Christian Alliance International School", ["CAIS", "Christian Alliance"]),
    "基督教國際學校": ("International Christian School", ["ICS", "Christian School"]),
    "李寶椿聯合世界書院": ("Li Po Chun United World College", ["LPCUWC", "UWC", "李寶椿"]),
    # 直資學校
    "聖保羅男女中學": ("St. Paul's Co-educational College", ["SPCC", "St Paul's", "聖保羅"]),
    "拔萃男書院": ("Diocesan Boys' School", ["DBS", "Diocesan Boys", "男拔"]),
    "拔萃女書院": ("Diocesan Girls' School", ["DGS", "Diocesan Girls", "女拔"]),
    "聖保羅書院": ("St. Paul's College", ["SPC", "St Paul's College"]),
    "英華書院": ("Ying Wa College", ["Ying Wa", "英華"]),
    "協恩中學": ("Heep Yunn School", ["Heep Yunn", "協恩"]),
    "聖士提反書院": ("St. Stephen's College", ["SSC", "St Stephen's", "聖士提反"]),
    "保良局蔡繼有學校": ("Po Leung Kuk Choi Kai Yau School", ["CKY", "Choi Kai Yau", "蔡繼有"]),
    "港大同學會書院": ("HKUGA College", ["HKUGA", "港同"]),
    "優才書院": ("G.T. College", ["GT College", "優才"]),
    "培僑書院": ("Pui Kiu College", ["Pui Kiu", "培僑"]),
    "匯基書院": ("United Christian College", ["UCC", "匯基"]),
    "福建中學": ("Fukien Secondary School", ["Fukien", "福建"]),
    "漢華中學": ("Hon Wah College", ["Hon Wah", "漢華"]),
    "香港浸會大學附屬學校王錦輝中小學": ("HKBU Affiliated School Wong Kam Fai Secondary and Primary School", ["HKBUAS", "王錦輝", "浸大附屬"]),
    "德望學校": ("Good Hope School", ["Good Hope", "德望"]),
    # 私立學校
    "聖保祿學校": ("St. Paul's Convent School", ["SPCS", "St Paul's Convent", "聖保祿"]),
    "玫瑰崗學校": ("Rosaryhill School", ["Rosaryhill", "玫瑰崗"]),
    "高主教書院": ("Raimondi College", ["Raimondi", "高主教"]),
    "香港培正中學": ("Pui Ching Middle School", ["Pui Ching", "培正"]),
    "真光女書院": ("True Light Girls' College", ["True Light", "真光"]),
    "聖瑪加利女書院": ("St. Margaret's Girls' College", ["St Margaret's", "聖瑪加利"]),
    "聖類斯中學": ("St. Louis School", ["St Louis", "聖類斯"]),
    "民生書院": ("Munsang College", ["Munsang", "民生"]),
    # 資助學校
    "皇仁書院": ("Queen's College", ["QC", "Queen's College", "皇仁"]),
    "英皇書院": ("King's College", ["KC", "King's College", "英皇"]),
    "庇理羅士女子中學": ("Belilios Public School", ["Belilios", "庇理羅士"]),
    "喇沙書院": ("La Salle College", ["La Salle", "喇沙"]),
    "華仁書院（九龍）": ("Wah Yan College Kowloon", ["WYCK", "Wah Yan Kowloon", "九華"]),
    "華仁書院（香港）": ("Wah Yan College Hong Kong", ["WYCHK", "Wah Yan HK", "港華"]),
    "聖若瑟書院": ("St. Joseph's College", ["SJC", "St Joseph's", "聖若瑟"]),
    "嘉諾撒聖瑪利書院": ("St. Mary's Canossian College", ["SMCC", "St Mary's Canossian", "聖瑪利"]),
    "瑪利諾修院學校（中學部）": ("Maryknoll Convent School (Secondary Section)", ["MCS", "Maryknoll", "瑪利諾"]),
    "聖嘉勒女書院": ("St. Clare's Girls' School", ["St Clare's", "聖嘉勒"]),
    "聖公會林護紀念中學": ("SKH Lam Woo Memorial Secondary School", ["Lam Woo", "林護"]),
    "聖公會曾肇添中學": ("SKH Tsang Shiu Tim Secondary School", ["Tsang Shiu Tim", "曾肇添"]),
    "聖公會莫壽增會督中學": ("SKH Bishop Mok Sau Tseng Secondary School", ["Bishop Mok", "莫壽增"]),
    # 公立學校
    "香港華仁書院": ("Wah Yan College Hong Kong", ["WYCHK", "Wah Yan HK", "港華"]),
    "金文泰中學": ("Clementi Secondary School", ["Clementi", "金文泰"]),
    "筲箕灣官立中學": ("Shau Kei Wan Government Secondary School", ["SKWGSS", "筲官"]),
    "觀塘官立中學": ("Kwun Tong Government Secondary School", ["KTGSS", "觀官"]),
}

# 讀取原始文件
with open('/home/ubuntu/hk-edu-app/data/schools.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 為每個學校添加英文名稱和搜索關鍵字
for cn_name, (en_name, keywords) in SCHOOL_EN_NAMES.items():
    # 構建搜索關鍵字字符串
    keywords_str = ', '.join([f'"{k}"' for k in keywords])
    
    # 查找 name: "中文名" 並在其後添加 nameEn 和 searchKeywords
    pattern = rf'(name: "{re.escape(cn_name)}",)'
    replacement = rf'\1\n    nameEn: "{en_name}",\n    searchKeywords: [{keywords_str}],'
    content = re.sub(pattern, replacement, content)

# 為沒有匹配到的學校添加默認值
# 查找沒有 nameEn 的學校條目
pattern = r'(name: "([^"]+)",)\n(\s+category:)'
def add_default_en(match):
    full_match = match.group(0)
    name = match.group(2)
    if 'nameEn:' not in full_match:
        # 生成默認英文名（使用拼音或保持中文）
        return f'{match.group(1)}\n    nameEn: "{name}",\n    searchKeywords: [],\n{match.group(3)}'
    return full_match

content = re.sub(pattern, add_default_en, content)

# 寫回文件
with open('/home/ubuntu/hk-edu-app/data/schools.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! Added English names and search keywords to all schools.")
