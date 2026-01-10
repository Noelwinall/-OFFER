#!/usr/bin/env python3
"""
為 500 所學校生成香港各區的地理座標
"""

import re
import random

# 香港各區的經緯度範圍（真實座標）
DISTRICT_COORDS = {
    "港島": {
        "中西區": {"lat": (22.2800, 22.2900), "lng": (114.1400, 114.1600)},
        "灣仔": {"lat": (22.2750, 22.2850), "lng": (114.1700, 114.1900)},
        "東區": {"lat": (22.2700, 22.2900), "lng": (114.2100, 114.2500)},
        "南區": {"lat": (22.2300, 22.2600), "lng": (114.1500, 114.2200)},
    },
    "九龍": {
        "油尖旺": {"lat": (22.3000, 22.3200), "lng": (114.1600, 114.1800)},
        "深水埗": {"lat": (22.3200, 22.3400), "lng": (114.1500, 114.1700)},
        "九龍城": {"lat": (22.3250, 22.3450), "lng": (114.1800, 114.2000)},
        "黃大仙": {"lat": (22.3350, 22.3550), "lng": (114.1900, 114.2100)},
        "觀塘": {"lat": (22.3100, 22.3300), "lng": (114.2100, 114.2400)},
    },
    "新界": {
        "荃灣": {"lat": (22.3600, 22.3900), "lng": (114.1000, 114.1300)},
        "屯門": {"lat": (22.3800, 22.4200), "lng": (113.9500, 114.0000)},
        "元朗": {"lat": (22.4300, 22.4700), "lng": (113.9800, 114.0500)},
        "北區": {"lat": (22.4800, 22.5300), "lng": (114.1200, 114.1800)},
        "大埔": {"lat": (22.4400, 22.4800), "lng": (114.1500, 114.2000)},
        "沙田": {"lat": (22.3700, 22.4200), "lng": (114.1700, 114.2200)},
        "西貢": {"lat": (22.3700, 22.4200), "lng": (114.2500, 114.3200)},
        "葵青": {"lat": (22.3400, 22.3700), "lng": (114.1100, 114.1500)},
        "離島": {"lat": (22.2500, 22.3000), "lng": (113.9000, 114.0500)},
    },
}

def get_random_coords(district: str) -> tuple:
    """根據地區生成隨機座標"""
    if district not in DISTRICT_COORDS:
        # 預設使用九龍中心
        return (22.3200, 114.1800)
    
    # 隨機選擇該區的一個子區域
    sub_districts = DISTRICT_COORDS[district]
    sub_district = random.choice(list(sub_districts.keys()))
    coords = sub_districts[sub_district]
    
    # 在範圍內生成隨機座標
    lat = random.uniform(coords["lat"][0], coords["lat"][1])
    lng = random.uniform(coords["lng"][0], coords["lng"][1])
    
    return (round(lat, 6), round(lng, 6))

def main():
    # 讀取現有學校數據
    with open("/home/ubuntu/hk-edu-app/data/schools.ts", "r", encoding="utf-8") as f:
        content = f.read()
    
    # 找到所有學校對象並添加座標
    # 匹配 applicationLink: "..." 後面的 } 或 },
    pattern = r'(applicationLink:\s*"[^"]*")\s*(\})'
    
    def add_coords(match):
        app_link = match.group(1)
        closing = match.group(2)
        
        # 從上下文中提取 district
        # 向前搜索找到 district
        start = match.start()
        context = content[max(0, start-500):start]
        district_match = re.search(r'district:\s*"([^"]*)"', context)
        district = district_match.group(1) if district_match else "九龍"
        
        lat, lng = get_random_coords(district)
        return f'{app_link},\n    latitude: {lat},\n    longitude: {lng},\n  {closing}'
    
    new_content = re.sub(pattern, add_coords, content)
    
    # 寫回文件
    with open("/home/ubuntu/hk-edu-app/data/schools.ts", "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print("已為所有學校添加地理座標")

if __name__ == "__main__":
    main()
