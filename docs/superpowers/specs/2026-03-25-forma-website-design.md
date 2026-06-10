# FORMA by Taedong — 웹사이트 디자인 스펙 v2

**날짜:** 2026-03-25
**상태:** APPROVED
**브랜드:** FORMA by Taedong
**목적:** 풀스택 웹 컨설팅 서비스 소개 마케팅 웹사이트

---

## 1. 브랜드 포지셔닝

### 이름

**FORMA** — 라틴어 _forma_(형태·아름다움)에서 유래. 추상적인 비전을 실제 웹으로 구현한다는 컨설팅의 본질을 담음.

### 핵심 메시지

> "오류에서 설계로, 설계에서 완성으로"

수백 번의 오류와 실패를 체계적으로 기록하고 스킬화해 완전한 풀스택 개발 플랫폼으로 전환한 여정. 그 기술로 기업/사업체의 웹 풀스택 컨설팅을 제공한다.

### 타겟

회사·사업체를 운영하며 웹페이지 풀스택 컨설팅이 필요한 의사결정자.

---

## 2. 디자인 시스템

### 디자인 방향

**Webflow 최고급 에이전시 미학** — Basement Studio, Aristide Benoist, Haus Studio급 퀄리티.
A(Sculptural White) + B(Glass Architecture SaaS) + C(Editorial Monument Typography) 혼합.

**디자인 도구 활용 (MCP):**

- **Stitch** (`mcp__stitch__*`) — 각 섹션 UI 초안 자동 생성. 섹션별 프롬프트로 고품질 컴포넌트 생성 후 DESIGN.md 토큰 추출
- **Paper** (`mcp__paper__*`) — `get_jsx`, `get_screenshot`, `update_styles` 로 스타일 세부 조정. 주당 100콜 무료 티어 주의
- **Antigravity** (`mcp__antigravity__*`) — 브라우저에서 실제 렌더링 확인 및 인터랙션 반복 테스트

### 컬러 팔레트

```css
--color-bg: #f7f5f2; /* 크림 화이트 — 기본 배경 */
--color-surface: #ffffff; /* 카드·컴포넌트 */
--color-ink: #0d0d0d; /* 주 텍스트 (대비 17:1) */
--color-ink-muted: #6b6b6b; /* 보조 텍스트 (대비 4.6:1) */
--color-gold: #c0a96a; /* 포인트 — 골드 */
--color-gold-dim: rgba(192, 169, 106, 0.15);
--color-glass: rgba(255, 255, 255, 0.55);
--color-border: rgba(0, 0, 0, 0.07);
--color-dark-bg: #0d0d0d; /* Contact 섹션 다크 배경 */
```

### 타이포그래피

```css
/* 한국어 — Pretendard (Google Fonts CDN) */
--font-korean: "Pretendard", "Apple SD Gothic Neo", sans-serif;

/* 영문 세리프 Display (Playfair Display — Google Fonts, Didot 대체) */
--font-display: "Playfair Display", Georgia, serif;

/* 영문 Sans (시스템 폰트) */
--font-sans: -apple-system, "Helvetica Neue", sans-serif;

/* 모노 레이블 */
--font-mono: "SF Mono", "Fira Code", monospace;

/* 스케일 */
--text-display: clamp(56px, 9vw, 112px); /* Hero 헤드라인 */
--text-h1: clamp(36px, 5.5vw, 64px);
--text-h2: clamp(26px, 3.5vw, 44px);
--text-body: 16px;
--text-label: 11px; /* letter-spacing: 3-4px, uppercase */
```

### 공간·레이아웃

```
Max-width: 1400px, centered
Section padding: clamp(80px, 12vw, 160px) top/bottom
Column grid: 12-column, gap 24px
Border-radius: 16px(카드), 999px(pill 버튼), 24px(대형 카드)
```

### 반응형 브레이크포인트

| 이름 | 범위       | 주요 변화                                                        |
| ---- | ---------- | ---------------------------------------------------------------- |
| sm   | < 640px    | 네비 링크 숨김 (로고+CTA만), 타임라인 세로 전환, 서비스 카드 1열 |
| md   | 640–1024px | 포트폴리오 3열, 서비스 카드 2열                                  |
| lg   | ≥ 1024px   | 풀 레이아웃 — 포트폴리오 5열, 서비스 3열                         |

---

## 3. 애니메이션 시스템 (Webflow급 인터랙션)

**라이브러리:** Framer Motion 11 + Lenis (smooth scroll)

### 핵심 인터랙션

1. **텍스트 리빌** — 스크롤 진입 시 줄 단위 마스크 reveal (`overflow: hidden` + `y: 100%→0`)
2. **패럴랙스** — Hero 3D 오브젝트가 스크롤에 따라 시차 이동 (`useScroll` + `useTransform`)
3. **글래스 네비** — 스크롤 20px 이상: `backdrop-blur` 0→20px, bg opacity 0→0.55
4. **마그네틱 버튼** — CTA 버튼 마우스 근접 시 자석 효과 (`mousemove` + `x/y transform`)
5. **카드 틸트** — 포트폴리오 카드 마우스 포지션 기반 3D tilt (`rotateX/Y ±8deg`)
6. **카운터 애니** — 스탯 숫자 0→N 카운트업 (`useMotionValue` + `useSpring`)
7. **커스텀 커서** — 16px 원형, 요소 호버 시 48px 확장 + 블렌드모드 `mix-blend-mode: difference`
8. **섹션 스태거** — 각 섹션 첫 진입 시 자식 요소 stagger: 0.1s

### 성능

```tsx
// LazyMotion 적용 (번들 최소화)
// layout.tsx 루트에서:
import { LazyMotion, domAnimation } from "framer-motion";
<LazyMotion features={domAnimation}>...</LazyMotion>;

// 모든 섹션 컴포넌트에서 motion.* → m.* 사용
import { m } from "framer-motion";
<m.div animate={{ opacity: 1 }} />;

// will-change: transform — 연속 애니메이션 요소만 적용
// (커스텀 커서, 패럴랙스 오브젝트)
// onAnimationComplete 후 제거
```

### prefers-reduced-motion

```tsx
// lib/animations.ts
export const motionConfig = {
  transition: { duration: prefersReducedMotion ? 0 : 0.6 },
};
// 모든 variants에 동일 패턴 적용
```

---

## 4. 페이지 구조 및 컴포넌트

### 4.1 고정 네비게이션 (FloatingNav)

```
레이아웃: 화면 상단 고정, 좌우 여백 32px, z-index: 100
형태: 글래스모피즘 pill (border-radius: 999px)
      backdrop-filter: blur(20px), bg: rgba(255,255,255,0.55)
      border: 1px solid rgba(255,255,255,0.85)
      box-shadow: 0 4px 30px rgba(0,0,0,0.06)
내용: FORMA.(좌) · Work·Story·Service(중, sm에서 숨김) · "프로젝트 문의 →"(우, 다크 pill 버튼)
동작: 스크롤 0→20px = 투명, 20px 이상 = 글래스 활성화
```

### 4.2 히어로 섹션 (HeroSection)

```
레이아웃: min-height: 100vh, 크림 배경 (#f7f5f2)
          패딩: 140px top (네비 여백 포함)

3D 기하학 오브젝트:
  [geo-1] 280×280px rounded square (border-radius: 40px)
          위치: top: -60px, right: -60px
          transform: rotate(18deg) perspective(800px) rotateX(18deg) rotateY(-18deg)
          배경: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(235,230,220,0.4))
          border: 1px solid rgba(0,0,0,0.07)
          box-shadow: 0 30px 80px rgba(0,0,0,0.06)
          패럴랙스: 스크롤 시 y: 0→-80px

  [geo-2] 200×200px sphere (border-radius: 50%)
          위치: bottom: -80px, left: -60px
          transform: perspective(600px) rotateX(25deg) rotateY(10deg)
          배경: linear-gradient(135deg, rgba(255,255,255,0.7), rgba(230,225,215,0.2))
          패럴랙스: 스크롤 시 y: 0→-40px

  [geo-3] 72×72px small square (border-radius: 14px)
          위치: top: 220px, right: 160px
          border: 1px solid rgba(192,169,106,0.3)
          배경: rgba(192,169,106,0.08)
          transform: rotate(12deg) perspective(400px) rotateX(20deg) rotateY(-10deg)
          패럴랙스: 스크롤 시 y: 0→-120px (가장 빠름)

타이포그래피:
  키커: "FULL-STACK WEB CONSULTING" (font-mono, 11px, letter-spacing 4px, color: #888)
  L1:   "오류에서" — Pretendard 900, display size, color: #0d0d0d
  L2:   "설계로"   — -webkit-text-stroke: 2px #0d0d0d, color: transparent (outline)
  L3:   "완성으로" — color: #c0a96a (골드)
  서브: "수백 번의 실패가 쌓여 하나의 기술이 됐습니다.\n그 기술로 당신의 비즈니스를 웹에 새겨드립니다."
        (16px, color: #6b6b6b, max-width: 440px)

글래스 스탯 카드 3개 (좌측 하단):
  backdrop-filter: blur(16px), bg: rgba(255,255,255,0.6)
  border: 1px solid rgba(255,255,255,0.8)
  [5+]      label: PROJECTS
  [100%]    label: VERCEL DEPLOY
  [0 → ∞]  label: ERROR TO SKILL

CTA:
  Primary: "포트폴리오 보기" (outline 버튼, #0d0d0d border)
  Secondary: "프로젝트 문의 →" (fill 버튼, #0d0d0d bg, 마그네틱 효과)
```

### 4.3 포트폴리오 섹션 (WorkSection)

```
섹션 카피: "Vercel 위에 새긴 다섯 개의 증명"
레이아웃:
  - lg (≥1024px): 5열 그리드, gap: 16px
  - sm (<640px): 가로 스크롤 (scroll-snap, overflow-x: auto)

PortfolioItem 타입:
  type PortfolioItem = {
    index: string        // "01"
    name: string         // "성벽종합건설"
    nameEn?: string      // "Sungbyuk Construction"
    url?: string         // "https://sungbyuk.vercel.app" (undefined = placeholder)
    tags: string[]       // ["Next.js", "Tailwind", "Vercel"]
    thumbnail?: string   // "/images/portfolio/sungbyuk.jpg" (없으면 색상 배경)
    isLive: boolean
  }

데이터 (lib/portfolio-data.ts):
  [01] 성벽종합건설 | url: "https://sungbyuk.vercel.app" | tags: ["Next.js","Tailwind v4","Vercel"] | isLive: true | thumbnail: "/images/portfolio/sungbyuk.jpg"
  [02~05] isLive: false, url: undefined, tags: []

카드 구성:
  Live 카드: 썸네일 or 크림 배경, 골드 "LIVE" 뱃지, 프로젝트명, 태그 행, 링크 아이콘
  Placeholder 카드: 어두운 배경(#1a1a1a), 자물쇠 아이콘, "준비 중", 인덱스 번호
카드 인터랙션: mousemove → rotateX/Y ±8deg 3D tilt + 호버 시 골드 테두리

썸네일: public/images/portfolio/sungbyuk.jpg
  → sungbyuk 프로젝트 스크린샷 (next/image, 800×600, object-fit: cover)
  → 없을 경우 크림 그라디언트 배경으로 대체
```

### 4.4 서사 섹션 (StorySection)

```
배경: #ede9e3 (크림보다 살짝 어두워 섹션 구분)
헤드라인: "모든 오류가 우리의 교과서였다"
서브카피: 수백 번의 실패를 기록하고 체계화해, 하나의 완성된 플랫폼으로 전환한 여정

5단계 타임라인:
  lg: 가로 배치 (flex-row)
  sm: 세로 배치 (flex-col)

  [1] 🔥 첫 프로젝트 — "무수한 오류와 마주침"
  [2] 📋 오류 기록   — "실패를 체계적으로 정리"
  [3] ⚙️ 패턴 발견  — "반복 문제 → 해결 공식화"
  [4] 🧰 스킬화     — "해결책을 재사용 가능한 도구로"
  [5] ✦  FORMA     — "완전한 개발 플랫폼 완성"

각 스텝 스태거 딜레이: 0, 0.1, 0.2, 0.3, 0.4s
연결 화살표 (→): lg에서만 표시
```

### 4.5 서비스 섹션 (ServiceSection)

```
헤드라인: "웹의 처음부터 끝까지,\n하나의 팀이 책임집니다"
3개 서비스 카드 (글래스모피즘, 동일한 height):
  [1] 기획·디자인
      "사용자 경험 설계와 브랜드 정체성을 함께 만듭니다"
      아이콘: Pencil (lucide)
  [2] 풀스택 개발
      "Next.js · FastAPI · Supabase — 처음부터 끝까지 직접 구축합니다"
      아이콘: Code2 (lucide)
  [3] 배포·운영 컨설팅
      "Vercel 배포, 성능 최적화, 지속적인 개선을 함께합니다"
      아이콘: Rocket (lucide)

하단 기술 태그 행:
  Next.js · React 19 · Tailwind v4 · TypeScript · Supabase · FastAPI · Vercel
```

### 4.6 문의 섹션 (ContactSection)

```
배경: #0d0d0d (다크 — 마지막 섹션 극적 대비, 크림 섹션들과 완전 반전)
헤드라인 (대형): "당신의 비전에\n형태를 부여할\n준비가 됐습니다"
  → Playfair Display italic, display 사이즈, color: #fff

[폼 없음 — 의도적 설계]
연락 방식:
  - CTA 버튼 (마그네틱): "프로젝트 시작하기 →" → mailto 링크 (실제 이메일은 구현 시 환경변수로 관리)
  - 보조: 이메일 직접 표시 (환경변수 NEXT_PUBLIC_CONTACT_EMAIL)
  - 보조: 카카오 오픈채팅 (환경변수 NEXT_PUBLIC_KAKAO_URL)

장식: 화이트 스트로크 텍스트 "FORMA" 배경에 크게 (opacity 0.03)
```

### 4.7 푸터 (Footer)

```
내용: FORMA by Taedong · © 2026 · All rights reserved
배경: #0d0d0d (ContactSection 이어짐)
top border: 1px solid rgba(255,255,255,0.05)
```

---

## 5. 기술 스택

```
프레임워크:  Next.js 16 (App Router) + React 19
스타일:     Tailwind CSS v4 + CSS custom properties
애니메이션: Framer Motion 11 + Lenis (smooth scroll)
타입:       TypeScript strict mode
아이콘:     lucide-react
폰트:       Pretendard (Korean, CDN) + Playfair Display (Google Fonts) + Inter (Google Fonts)
이미지:     next/image (WebP 자동 변환)
배포:       Vercel
```

---

## 6. 파일 구조

```
forma-website/
├── app/
│   ├── layout.tsx            # 루트 레이아웃, Lenis + LazyMotion provider, 폰트
│   ├── page.tsx              # 홈 페이지 (섹션 조합)
│   └── globals.css           # 디자인 토큰 CSS 변수, 기본 리셋
├── components/
│   ├── nav/
│   │   └── FloatingNav.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── WorkSection.tsx
│   │   ├── StorySection.tsx
│   │   ├── ServiceSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── GlassCard.tsx       # 글래스모피즘 공통 카드
│   │   ├── MagneticButton.tsx  # 마그네틱 효과 버튼
│   │   ├── TiltCard.tsx        # 마우스 포지션 3D tilt 래퍼
│   │   ├── TextReveal.tsx      # 스크롤 트리거 줄 단위 reveal
│   │   └── CustomCursor.tsx    # 커스텀 커서 (클라이언트 전용)
│   └── layout/
│       └── Footer.tsx
├── lib/
│   ├── animations.ts           # Framer Motion variants 공통 + motionConfig
│   └── portfolio-data.ts       # PortfolioItem[] 데이터
└── public/
    └── images/
        └── portfolio/
            └── sungbyuk.jpg    # 성벽건설 썸네일 스크린샷
```

---

## 7. 접근성 (WCAG 2.2 AA)

- 색상 대비: 크림(#f7f5f2) + ink(#0d0d0d) = 17:1, muted(#6b6b6b) + 배경 = 4.6:1
- `prefers-reduced-motion` 전체 애니메이션 비활성화 (duration: 0)
- 시맨틱 HTML: `<nav>`, `<main>`, `<section aria-label="...">`, `<h1>` 단일
- 키보드 네비게이션 완전 지원, 포커스 링 visible
- 커스텀 커서: 기본 커서 숨김 시 `pointer-events: none` + 키보드 사용자 영향 없음
- 터치 타겟 최소 44×44px (모바일 CTA 버튼)

---

## 8. 성능 목표

- Lighthouse Performance: 90+
- LCP < 2.5s (Hero 폰트 preload)
- CLS < 0.1 (이미지 dimensions 명시, 폰트 display: swap)
- `will-change: transform` — 커스텀 커서·패럴랙스 오브젝트만, `onAnimationComplete` 후 제거

---

## 9. 디자인 툴 MCP 활용 계획

### Stitch 프롬프트 예시 (섹션별 초안 생성)

```
"HeroSection: FORMA 웹 컨설팅 히어로.
스타일: 크림 배경(#f7f5f2), 골드 포인트(#c0a96a), 다크 잉크(#0d0d0d)
포함: 대형 스트로크 타이포그래피, CSS 3D 기하학 오브젝트, 글래스모피즘 스탯 카드, 플로팅 글래스 네비
기술: Next.js 16, Tailwind v4, Framer Motion, Pretendard + Playfair Display
접근성: WCAG 2.2 AA"
```

### Paper 활용 순서

1. Stitch 초안 생성 후 `get_screenshot` 으로 렌더링 확인
2. `update_styles` 로 색상/간격 미세 조정
3. `get_jsx` 로 최종 JSX 추출 → Next.js 컴포넌트로 변환
4. **콜 예산 관리**: 섹션당 최대 8콜, 총 5섹션 = 40콜 이내 목표 (무료 티어 100콜)

### Antigravity 활용

- 각 섹션 구현 후 브라우저 자동 열기 → 인터랙션 (hover, scroll) 실제 확인
- 마그네틱 버튼·카드 tilt 동작 검증
- 모바일 375px 뷰포트 에뮬레이션 확인

---

## 10. 수용 기준 (Acceptance Criteria)

### 기능

- [ ] 5개 섹션 모두 렌더링 (성벽건설 실제 카드 + 4개 플레이스홀더)
- [ ] 글래스모피즘 네비게이션 스크롤 진입/퇴장 동작
- [ ] Hero 3D 오브젝트 3개 패럴랙스 스크롤 (속도 차이 있음)
- [ ] 텍스트 리빌 애니메이션 (스크롤 트리거)
- [ ] 포트폴리오 카드 3D tilt 인터랙션
- [ ] 서사 타임라인 스태거 애니메이션
- [ ] 마그네틱 CTA 버튼 (Contact 섹션)
- [ ] 스탯 숫자 카운트업

### 접근성·성능

- [ ] `prefers-reduced-motion` 동작 확인
- [ ] 키보드 Tab 네비게이션 전체 플로우
- [ ] Lighthouse Performance ≥ 90

### 배포

- [ ] Vercel 배포 완료 + 퍼블릭 URL 보고
- [ ] 환경변수 NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_KAKAO_URL Vercel 대시보드 설정
