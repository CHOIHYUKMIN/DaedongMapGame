# 캐릭터 레이어 파일 가이드

## 폴더 구조

```
images/characters/
├── base/                    # 기본 캐릭터 (10개)
│   ├── ch_10m_base.png
│   ├── ch_10f_base.png
│   ├── ch_20m_base.png
│   ├── ch_20f_base.png
│   ├── ch_30m_base.png
│   ├── ch_30f_base.png
│   ├── ch_40m_base.png
│   ├── ch_40f_base.png
│   ├── ch_60m_base.png
│   └── ch_60f_base.png
│
└── costumes/
    ├── heads/               # 모자, 헤어 액세서리
    │   ├── hat_cap_01.png
    │   ├── hat_crown_01.png
    │   └── hairband_01.png
    │
    ├── tops/                # 상의
    │   ├── top_tshirt_basic.png
    │   ├── top_jacket_casual.png
    │   └── top_jacket_luxury.png
    │
    ├── bottoms/             # 하의
    │   ├── bottom_jeans_basic.png
    │   └── bottom_pants_suit.png
    │
    ├── bags/                # 가방
    │   ├── bag_backpack_basic.png
    │   ├── bag_backpack_luxury.png
    │   └── bag_shoulder_01.png
    │
    ├── accessories/         # 액세서리
    │   ├── acc_glasses_01.png
    │   ├── acc_necklace_01.png
    │   └── acc_earring_01.png
    │
    └── special/             # 특수 효과
        ├── wings_angel.png
        ├── aura_gold.png
        └── sparkle_star.png
```

## 파일 규격

- **형식:** PNG (투명 배경)
- **크기:** 512x512px
- **중심점:** (256, 256)
- **용량:** 각 100KB 이하 권장

## 작업 완료 시

파일을 위 폴더에 넣고 알려주세요!

---

## 🎨 코스튬 시스템 구현 상태

### ✅ 완료된 기능
- **시스템 설계**: 6개 카테고리, 레이어 기반 합성
- **데이터 구조**: CostumeData.csv (17종 코스튬)
- **핵심 로직**: costume.js (잠금 해제, 장착, 스탯 보너스)
- **UI**: costume-ui.js, costume.css (프리뷰, 카테고리, 상세 모달)
- **통합**: 인벤토리에서 "🎨 캐릭터 꾸미기" 버튼 추가

### 🔄 진행 중
- **에셋 생성**: 하이브리드 방식 (AI + 무료 에셋)
  - ✅ heads/hat_cap_01.png (AI 생성 완료)
  - 🔜 나머지 이미지 (플레이스홀더 → 실제 이미지)

### 📋 다음 단계
1. **에셋 완성**: 각 카테고리별 샘플 이미지 추가
2. **테스트**: 레이어 합성, 잠금 해제, 스탯 적용
3. **게임 통합**: 레벨업/지역클리어 시 자동 잠금 해제
4. **향상**: 애니메이션 효과, 사운드 추가

### 💡 샘플 코스튬 아이템
- **레벨 보상**: 기본 야구모자(Lv5), 후드티(Lv15), 기본 백팩(Lv5)
- **지역 보상**: 명품 백팩(강남구), 배달 조끼(강남구)
- **아이템 보상**: 요리사 모자(왕족발), 왕관(왕갈비)
