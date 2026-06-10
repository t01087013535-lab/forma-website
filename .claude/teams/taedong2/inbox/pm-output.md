# PM 산출물 — FORMA Round 4

## BLOCKER

- B1: `app/layout.tsx:29` — `og-image.jpg` 참조하나 `public/og-image.jpg` 없음. SNS OG 이미지 깨짐

## MAJOR

- M1: `WorkSection.tsx:105–118` — Coming Soon 카드: `#1e1e1e`, `#111`, `#141414`, `#1a1a1a`, `#2a2a2a`, `#222`, `#555` 하드코딩
- M2: `ContactSection.tsx:37,74` — `#888` 두 곳. `#0d0d0d` 배경 대비 3.9:1 → WCAG AA 미달
- M3: `ContactSection.tsx:50` — 헤딩 `#fff` 하드코딩
- M4: `Footer.tsx:13,16,26,38,43` — `#333 on #0d0d0d` 대비 1.7:1 완전 실패. `#555`, `#666`, `#fff` 하드코딩
- M5: `FloatingNav.tsx:99,110,158,169` — `text-[#6b6b6b]`, `hover:bg-[#333]`, `text-[#666]` CSS variable 미사용
- M6: `FloatingNav.tsx:108–113` — 데스크톱 CTA `<a>` focus-visible 없음
- M7: `globals.css:33–34` — `html { cursor: none }` 미디어 쿼리 밖 → 터치 기기 커서 숨김

## MINOR

- N1: `ServiceSection.tsx:80` — `bg-white` 하드코딩
- N2: `ServiceSection.tsx:57` — `rgba(192,169,106,0.25)` 하드코딩
- N3: `WorkSection.tsx:38` — 라이브 카드 `bg-white` 하드코딩
- N4: `GlassCard.tsx:15,19` — `rgba(255,255,255,0.55)` = `--color-glass`와 동일하나 변수 미사용
- N5: `HeroSection.tsx:79–80` — gold border/shadow 토큰 없음 (`rgba(192,169,106,0.3/0.15)`)
- N6: `StorySection.tsx:67` — 커넥터 `rgba(0,0,0,0.15)` 하드코딩
- N7: `FloatingNav.tsx:89` — 로고 `href="#"` → `href="#hero"` 명시 권장
- N8: `public/` — `file.svg`, `next.svg`, `window.svg`, `vercel.svg`, `globe.svg` 미사용 스캐폴딩 파일 잔존
- N9: `WorkSection.tsx:28` — `overflow-x-auto` 미디어 쿼리 없이 항상 적용
- N10: `ContactSection.tsx:30` — 배경 FORMA 텍스트 `--font-sans` → `--font-display` 정렬

## 추가 디자인 레퍼런스 적용 태스크

- D1: `FloatingNav` — `backdrop-blur-md` + `bg-black/50` + `border-white/5` 스타일 (레퍼런스 참조)
- D2: `WorkSection` — 벤토 그리드 카드 구조 개선 (레퍼런스: `bg-zinc-900/50 border border-white/5 rounded-3xl h-[320px]` 패턴)
- D3: `HeroSection` — 상태 배지 (pulse dot + "Available" 텍스트) 추가 고려
- D4: 전체 다크 섹션 배경색 `#09090b` 계열로 통일 (레퍼런스 `bg-[#09090b]`)

## 태스크 순서

T1: globals.css — cursor fix (M7) + 토큰 추가 (--color-dark-border, --color-dark-surface, --color-ink-inverted, --color-gold-border, --color-gold-glow)
T2: Footer.tsx — 색상 토큰 교체 (M4)
T3: ContactSection.tsx — 색상 교체 + 폰트 (M2, M3, N10)
T4: WorkSection.tsx — 다크 카드 토큰 교체 + 벤토 카드 구조 개선 (M1, N3, D2)
T5: FloatingNav.tsx — 색상 교체 + focus-visible + backdrop-blur (M5, M6, N7, D1)
T6: ServiceSection.tsx + GlassCard.tsx + StorySection.tsx + HeroSection.tsx — 잔여 토큰 (N1~N6)
T7: public/ — 미사용 SVG 확인 후 삭제 (N8) + og-image.jpg 생성 (B1)
