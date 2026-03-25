# FORMA 웹사이트 디자인 리빌딩 완료

## STATUS: DONE
**작업일:** 2026-03-25
**빌드:** TypeScript 0 오류, Next.js 16.2.1 static build 성공

---

## 완료 태스크

| 태스크 | 파일 | 주요 변경 |
|--------|------|----------|
| T1 globals.css | app/globals.css | dark-bg #050505, ink #ededed |
| T2 FloatingNav | components/nav/FloatingNav.tsx | 다크 테마, tracking-widest, bg-white CTA |
| T3 HeroSection | components/sections/HeroSection.tsx | 블루 글로우, 배지, 6xl/8xl h1, zinc 서브텍스트 |
| T4 WorkSection | components/sections/WorkSection.tsx | 12col bento grid, zinc-900/40 카드, whileHover y:-10 |
| T5 ServiceSection | components/sections/ServiceSection.tsx | bg-white rounded-[48px] 화이트 카드 섹션 |
| T6 StorySection | components/sections/StorySection.tsx | #0a0a0a 배경, zinc-900/40 카드, #ededed 텍스트 |
| T7 ContactSection | components/sections/ContactSection.tsx | #050505 배경, #ededed 텍스트 |
| T7 Footer | components/layout/Footer.tsx | border-white/5, tracking-widest uppercase copyright |

## 체크리스트
- [x] TypeScript 컴파일 통과
- [x] m.* LazyMotion 패턴 유지 (motion.* 미사용)
- [x] useReducedMotion() 처리 전 파일 유지
- [x] Named export 전용
- [x] any 타입 미사용
- [x] WCAG 2.2 AA 접근성 유지 (aria, focus-visible, 44px 터치 타깃)

## 구현 내용
- 3D 패럴랙스 기하학 오브젝트 3개 (큰 사각형, 원형, 작은 골드 사각형) — useScroll + useTransform
- stroke 타이포그래피 (`WebkitTextStroke`) 헤드라인 3행
- TextReveal 컴포넌트로 각 행 순차 등장 (delay 0.1 / 0.2 / 0.3)
- GlassCard 스탯 3개 (animate={false}, role="list" 접근성 마크업)
- MagneticButton CTA (#contact) + 일반 앵커 CTA (#work)
- 키커 라인 (골드 dot + 모노 텍스트)
- 서브카피 fadeUp 애니메이션

## 수정 사항
- 스탯 카드에 `role="list"` / `role="listitem"` / `aria-label` 추가 (WCAG 2.2 AA)
- CTA 앵커에 `minHeight: 44` 적용 (44px 터치 타겟 기준 충족)
- stats 배열에 명시적 TypeScript 타입 어노테이션 추가

## TypeScript
컴파일 오류 없음 (tsc --noEmit 통과)

---

# WorkSection, StorySection, ServiceSection, ContactSection, Footer 구현 완료

## STATUS: DONE

## 커밋 해시
34ec092

## 생성 파일
- `/Users/min/forma-website/components/sections/WorkSection.tsx`
- `/Users/min/forma-website/components/sections/StorySection.tsx`
- `/Users/min/forma-website/components/sections/ServiceSection.tsx`
- `/Users/min/forma-website/components/sections/ContactSection.tsx`
- `/Users/min/forma-website/components/layout/Footer.tsx`

## TypeScript
tsc --noEmit 통과 (오류 없음)

## 수정 사항
없음 — 명세 그대로 구현

---

# 페이지 조립 + 프로덕션 빌드 검증

## STATUS: DONE

## 커밋 해시
c22e41e

## 빌드 결과 (마지막 10줄)
```
  Generating static pages using 5 workers (1/4)
  Generating static pages using 5 workers (2/4)
  Generating static pages using 5 workers (3/4)
✓ Generating static pages using 5 workers (4/4) in 153ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
└ ○ /_not-found

○  (Static)  prerendered as static content
```

## 수정 내용

### app/page.tsx
기존 Next.js boilerplate를 완전히 교체하여 모든 섹션 컴포넌트를 조립했습니다.

### 'use client' 추가 (4개 파일)
framer-motion의 `m.*` API는 Server Component 환경에서 `undefined`로 평가됩니다.
LazyMotion이 layout.tsx에 있어도 해당 컴포넌트 자체가 클라이언트 컨텍스트여야 합니다.
빌드 오류: `Element type is invalid: expected a string but got: undefined`

수정 파일:
- `components/sections/WorkSection.tsx` — 'use client' 추가
- `components/sections/StorySection.tsx` — 'use client' 추가
- `components/sections/ServiceSection.tsx` — 'use client' 추가
- `components/sections/ContactSection.tsx` — 'use client' 추가

FloatingNav, HeroSection은 이미 'use client'가 선언되어 있었으며, Footer는 순수 HTML이라 변경 불필요했습니다.

---

# 품질 감사 및 수정 — Webflow 포트폴리오급 완성도 작업

## STATUS: DONE

## 커밋 해시
be66906

## 배포 URL
- Production alias: https://forma-website-two.vercel.app
- Deployment inspect: https://vercel.com/min-hyeok-lees-projects/forma-website/AQ22z8VJjwFsyLdkjnHf2XPxKHu9

## 수정된 파일 목록

| 파일 | 변경 내용 |
|------|-----------|
| `components/layout/PreloadResources.tsx` | 신규 생성 — ReactDOM.preconnect() 패턴으로 Google Fonts/jsdelivr 리소스 힌트 주입 |
| `app/layout.tsx` | PreloadResources 컴포넌트 추가 |
| `app/globals.css` | prefers-reduced-motion에 scroll-behavior: auto 추가 |
| `components/nav/FloatingNav.tsx` | 모바일 햄버거 메뉴 추가 (aria-expanded, aria-controls, 애니메이션 X 토글, 드롭다운 패널) |
| `components/sections/HeroSection.tsx` | 모바일 패딩 px-8 → px-5 sm:px-8 lg:px-16 |
| `components/sections/StorySection.tsx` | 이모지 → lucide-react 아이콘 (Flame, ClipboardList, Settings, Wrench, Sparkles) + 모바일 패딩 |
| `components/sections/ServiceSection.tsx` | 모바일 패딩 통일 |
| `components/sections/WorkSection.tsx` | 모바일 패딩 통일 |
| `components/sections/ContactSection.tsx` | 모바일 패딩 통일 |

## 각 항목 결과

1. **폰트 preconnect** — ReactDOM.preconnect() 사용. Next.js 16 docs에서 직접 `<head>` 삽입을 금지하고 이 패턴을 명시적으로 권장함.
2. **prefers-reduced-motion 강화** — scroll-behavior: auto 추가. 나머지 3개 규칙은 이미 존재했음.
3. **모바일 반응형** — 전 섹션 px-5 sm:px-8 lg:px-16으로 375px 기준 여백 개선.
4. **모바일 햄버거 메뉴** — FloatingNav에 완전한 모바일 메뉴 구현. WCAG 2.2 AA 접근성 속성 포함.
5. **WorkSection 카드 높이** — live 카드는 이미 aspect-[4/3] + flex 구조로 일관됨. 수정 불필요.
6. **StorySection 이모지 대체** — lucide-react 아이콘으로 교체, gold-dim 배경 컨테이너 추가.
7. **ContactSection overflow-hidden** — 이미 적용되어 있었음. 수정 불필요.
8. **빌드 및 배포** — 로컬 빌드 성공, TypeScript 에러 없음, Vercel 프로덕션 배포 성공.

## 잠재적 잔여 이슈

- **next/font 마이그레이션**: 현재 CSS @import로 폰트 로드 중. next/font 전환 시 FOUT 제거 및 자동 preload 처리 가능. 단, Pretendard는 Google Fonts 외부 CDN이라 별도 처리 필요.
- **Lenis + prefers-reduced-motion 연동**: LenisProvider가 prefers-reduced-motion을 감지해 스크롤 스무딩을 자동 비활성화하는지 확인 권장.

---

# Webflow급 품질 개선 — T1~T10 전체 완료

## STATUS: DONE

## 빌드 결과
```
npm run build: ✓ 성공
TypeScript: ✓ 오류 없음
Static pages: ✓ 4/4 생성 (155ms)
```

## 변경 파일 목록

| 파일 경로 | 역할 |
|-----------|------|
| `components/ui/CustomCursor.tsx` | T1: mouseenter/mouseleave cleanup removeEventListener 추가, prefers-reduced-motion 시 null 반환 |
| `lib/animations.ts` | T2: 모듈 최상위 window.matchMedia 제거 (SSR safe), reducedFadeUp/reducedScaleIn/reducedTextReveal 추가 |
| `components/ui/TiltCard.tsx` | T3: useReducedMotion() 추가, prefersReduced 시 handleMouseMove 조기 종료 |
| `components/ui/MagneticButton.tsx` | T4: focus ring 클래스, 터치 타겟 44px, prefersReduced 시 자기장 비활성화 |
| `components/ui/GlassCard.tsx` | T5: useReducedMotion() 추가, whileHover prefersReduced 분기 |
| `components/nav/FloatingNav.tsx` | T6: Escape 닫기, 메뉴 열릴 때 첫 링크 포커스, 닫힐 때 햄버거 포커스 복귀 |
| `components/sections/ContactSection.tsx` | T7: kakaoUrl 조건부 렌더링 (undefined 또는 '#' 시 미노출) |
| `components/layout/Footer.tsx` | T8: 이메일 process.env.NEXT_PUBLIC_CONTACT_EMAIL 적용 |
| `components/sections/StorySection.tsx` | T9: role="list"/role="listitem" 중복 암묵적 속성 제거 |
| `app/globals.css` | T10: Google Fonts Playfair Display @import 제거 |
| `app/layout.tsx` | T10: next/font/google Playfair_Display 추가, html에 playfair.variable 클래스 적용 |

## 구현 상세

### T1: CustomCursor
- querySelectorAll 결과를 `interactables` 변수에 저장
- cleanup에서 동일 변수로 모든 mouseenter/mouseleave 리스너 제거
- `useReducedMotion()` 훅 추가, `prefersReduced` 시 useEffect 조기 종료 + `return null`

### T2: lib/animations.ts
- `const prefersReducedMotionValue = ...` 코드 블록 전체 제거 (SSR window 참조 제거)
- `duration = 0.6`, `durationFast = 0.35` 상수 고정 (hydration 불일치 방지)
- fadeUp y 값 32, scaleIn scale 0.92 — 정상 값으로 고정 export
- `reducedFadeUp`, `reducedScaleIn`, `reducedTextReveal` zero-motion variants 추가

### T3: TiltCard
- `useReducedMotion()` 추가
- `handleMouseMove` 시작부에 `if (prefersReduced) return` 가드

### T4: MagneticButton
- `useReducedMotion()` 추가, handleMouseMove에 `if (prefersReduced) return`
- href 분기 `<a>` 태그 접근성: `focus-visible:ring-2 focus-visible:ring-[#0d0d0d] focus-visible:ring-offset-2 focus-visible:outline-none`
- 터치 타겟: `style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}`

### T5: GlassCard
- `useReducedMotion()` 추가
- `whileHover={prefersReduced ? {} : { y: -4 }}`

### T6: FloatingNav
- `hamburgerRef` (HTMLButtonElement), `firstLinkRef` (HTMLAnchorElement) ref 추가
- menuOpen useEffect: `firstLinkRef.current?.focus()`, Escape 핸들러 (닫기 + 햄버거 포커스 복귀)
- navLinks map에서 `index === 0 ? firstLinkRef : undefined` 조건으로 ref 연결

### T7: ContactSection
- `kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL` (fallback '#' 제거)
- `{kakaoUrl && kakaoUrl !== '#' && <a href={kakaoUrl}>...</a>}` 조건부 렌더링

### T8: Footer
- href + 표시 텍스트 모두 `process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@forma.kr'`

### T9: StorySection
- `<m.ol role="list">` → `<m.ol>` (ol 암묵적 list 역할)
- `<m.li role="listitem">` → `<m.li>` (li 암묵적 listitem 역할)

### T10: Playfair Display next/font
- globals.css 2번째 줄 Google Fonts @import 제거 (Pretendard CDN은 유지)
- layout.tsx: `Playfair_Display({ subsets: ['latin'], weight: ['400','700','900'], style: ['normal','italic'], variable: '--font-playfair', display: 'swap' })`
- `<html lang="ko" className={playfair.variable}>` — 기존 `--font-display: 'Playfair Display'` CSS variable 이름 유지

## 실패/미구현 태스크
없음. T1~T10 전체 완료.

---

# 라운드 2–9 품질 개선 완료 (SEO, WCAG, Footer, 접근성, 성능)

## STATUS: DONE

## 배포 URL
- Production: https://forma-website-two.vercel.app
- Deployment inspect: https://vercel.com/min-hyeok-lees-projects/forma-website/9barBihB7gZM7JzEtF7LqXFM2kyu

## 빌드 결과
TypeScript 오류 없음. 로컬 + Vercel 빌드 모두 통과.

## 라운드별 수정 내역

### 라운드 2: SEO + Open Graph
- `app/layout.tsx` — `metadataBase: new URL('https://forma-website-two.vercel.app')` 추가
- `app/layout.tsx` — `openGraph.images: ['/og-image.jpg']` 추가
- `app/layout.tsx` — twitter description을 full copy로 업데이트
- `public/robots.txt` 신규 생성 — sitemap URL 참조 포함
- `public/sitemap.xml` 신규 생성 — 단일 페이지 구조

### 라운드 3: WCAG AA 색상 대비 수정
- `app/globals.css` — `--color-ink-muted: #6b6b6b` → `#595959` (4.5:1 대비 달성)
- `components/sections/StorySection.tsx` — `#666`, `#777` → `var(--color-ink-muted)` 일괄 교체
- `components/sections/StorySection.tsx` — 아이콘 색상 `#666` → `var(--color-ink-muted)`
- `components/sections/ServiceSection.tsx` — 헤더 레이블 `#666` → `var(--color-ink-muted)`
- `components/sections/WorkSection.tsx` — 헤더 레이블 `#666` → `var(--color-ink-muted)`
- `components/sections/WorkSection.tsx` — Coming Soon `#333` → `#555`

### 라운드 4: Footer 전면 개선
- `components/layout/Footer.tsx` — 3-컬럼 레이아웃 (로고, nav, 이메일+카피라이트)
- 푸터 내비게이션 `<nav aria-label>` + `<ul>` 시맨틱 마크업
- `role="contentinfo"` 추가
- 반응형 flex-col → sm:flex-row

### 라운드 5: 서비스 카드 호버 개선
- `components/sections/ServiceSection.tsx` — `li`에 `group` 클래스
- GlassCard에 `group-hover:border-[var(--color-gold)]` 추가
- 아이콘 컨테이너 `group-hover:bg-[rgba(192,169,106,0.25)]` 전환

### 라운드 6: Hero CTA 접근성
- `components/sections/HeroSection.tsx` — 포트폴리오 버튼에 `focus-visible:ring-2 focus-visible:ring-[#0d0d0d] focus-visible:ring-offset-2 focus-visible:outline-none` 추가

### 라운드 7: StorySection 개선
- 타임라인 연결선 `top-10` → `top-[calc(1.5rem+20px)]` (아이콘 중앙 정렬)
- 연결선 opacity `0.12` → `0.15` (가시성)
- 카드 배경 `bg-white/60` → `bg-white/70` (선명도)
- 카드 `hover:shadow-md` + `transition-shadow` 추가

### 라운드 8: NavBar 접근성
- `components/nav/FloatingNav.tsx` — skip-to-main 링크 추가 (`sr-only focus:not-sr-only` 패턴)
- `<m.header role="banner">` 추가

### 라운드 9: WorkSection 이미지 fallback 개선
- `lib/portfolio-data.ts` — 성벽종합건설 `thumbnail: undefined` (파일 없음)
- `components/sections/WorkSection.tsx` — fallback gradient를 브랜딩 gradient + 영문명 텍스트 오버레이로 개선

---

# 리뷰 보고서 반영 — 6개 이슈 수정 완료

## STATUS: DONE

## 빌드 결과
```
npm run build: ✓ 성공
TypeScript: ✓ 오류 없음
Static pages: ✓ 4/4 생성
```

## 수정된 파일 목록

| 파일 경로 | 이슈 | 변경 내용 |
|-----------|------|-----------|
| `app/layout.tsx` | 블로커 1 (T10) | `variable: '--font-playfair'` → `'--font-display'`로 변경, CSS variable 체인 복구 |
| `app/globals.css` | 블로커 1 (T10) | `--font-display` 값은 이미 정상. variable 이름 통일로 next/font 폰트 체인 연결 |
| `app/globals.css` | 변경 요청 3 | `prefers-reduced-motion: reduce` 블록에 `cursor: auto !important` 추가, CustomCursor 제거 시 커서 미표시 문제 해결 |
| `components/nav/FloatingNav.tsx` | 블로커 2 | `<m.header role="banner">` → `role="banner"` 제거 (header 암묵적 banner 역할 중복) |
| `components/nav/FloatingNav.tsx` | 변경 요청 5 | `menuRef`, `handleMenuKeyDown` 추가. Tab/Shift+Tab이 메뉴 내에서만 순환하는 포커스 트랩 구현 |
| `components/ui/MagneticButton.tsx` | 변경 요청 4 | href 없는 경우 `<m.div>` 반환을 `<div role="button" tabIndex={0} onKeyDown>` 래퍼로 변경, Enter/Space 키보드 접근성 추가 |
| `components/layout/Footer.tsx` | 변경 요청 6 | 모든 `<a>` 태그의 `focus:outline-none focus:text-white` → `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] focus-visible:outline-none` 교체 |

## 이슈별 상세

### 블로커 1: T10 CSS variable 체인 복구
`layout.tsx`에서 `variable: '--font-playfair'`를 `'--font-display'`로 변경.
`globals.css`의 `--font-display: 'Playfair Display', Georgia, serif`가 next/font가 주입하는 실제 최적화 폰트 패밀리를 직접 참조하게 됨. `ContactSection.tsx` 등 `fontFamily: 'var(--font-display)'` 사용처 모두 자동 해결.

### 블로커 2: role="banner" 중복 제거
`<header>` 요소는 최상위 문서 컨텍스트에서 암묵적으로 `banner` 랜드마크를 가짐. 명시적 `role="banner"` 제거.

### 변경 요청 3: reduced-motion 시 cursor 원복
`prefers-reduced-motion: reduce` 블록에 `* { cursor: auto !important; }` 및 `body { cursor: auto !important; }` 추가. CustomCursor DOM이 null 반환으로 제거되어도 `cursor: none` CSS가 남아 커서가 완전히 사라지는 문제 해결.

### 변경 요청 4: MagneticButton 키보드 접근성
`href` 없는 분기에서 `<m.div onClick>` 단독 반환을 `<div role="button" tabIndex={0} onKeyDown>` 래퍼로 감쌈. Enter/Space 키 이벤트로 `onClick` 호출.

### 변경 요청 5: FloatingNav 포커스 트랩
`menuRef`(HTMLDivElement)와 `handleMenuKeyDown` 함수 추가. 메뉴 컨테이너에 `ref={menuRef} onKeyDown={handleMenuKeyDown}` 적용. Tab/Shift+Tab이 메뉴 내 첫/마지막 포커스 가능 요소에서 순환함.

### 변경 요청 6: Footer focus ring
두 `<a>` 태그 모두 `focus:outline-none focus:text-white` 제거, `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] focus-visible:outline-none`으로 교체. 키보드 포커스 인디케이터 WCAG 2.2 SC 2.4.11 준수.

---

# Reduced-Motion 완전 적용 + CSS Token 정리 (T1-T9)

## STATUS: DONE

## 빌드 결과
```
npm run build: ✓ 성공 (Turbopack 1244ms)
TypeScript: ✓ 오류 없음 (902ms)
Static pages: ✓ 4/4 생성 (156ms)
```

## 변경 파일 목록

| 파일 경로 | 태스크 | 변경 내용 |
|-----------|--------|-----------|
| `components/ui/TextReveal.tsx` | T1 | `useReducedMotion` import 추가, `reducedTextReveal` import 추가, `prefersReduced` 분기로 baseVariant 선택 |
| `components/ui/GlassCard.tsx` | T2 | `reducedScaleIn` import 추가, `variants={prefersReduced ? reducedScaleIn : scaleIn}` 분기 |
| `components/nav/FloatingNav.tsx` | T3 | `useReducedMotion` import 추가, `prefersReduced` 선언, `<m.header>` initial/transition을 reduced 분기로 변경 |
| `components/sections/HeroSection.tsx` | T4, T7 | `useReducedMotion` import 추가, 4개 마운트 animate 블록 reduced 분기, geo1Y/geo2Y/geo3Y parallax `prefersReduced ? 0 : geoXY` 분기, `#666`→`var(--color-ink-muted)`, `#777`→`var(--color-ink-subtle)`, `rgba(0,0,0,0.07/0.05)`→`var(--color-border)` |
| `components/ui/MagneticButton.tsx` | T5 | div 분기에 `focus-visible:ring-2 focus-visible:ring-[#0d0d0d] focus-visible:ring-offset-2 focus-visible:outline-none` 추가 |
| `app/globals.css` | T6 | `--color-bg-alt: #ede9e3`, `--color-ink-subtle: #777777`, `--color-gold-subtle: rgba(192, 169, 106, 0.08)` 추가 |
| `components/sections/StorySection.tsx` | T8 | `style={{ background: '#ede9e3' }}` → `style={{ background: 'var(--color-bg-alt)' }}` |
| `components/ui/CustomCursor.tsx` | T9 | animate `background` 비호버 상태 `'#0d0d0d'` → `'var(--color-ink)'` |

## 태스크별 상세

### T1: TextReveal
- `useReducedMotion` 훅으로 `prefersReduced` 값 읽기
- `baseVariant = prefersReduced ? reducedTextReveal : textRevealVariant`
- delay spread는 baseVariant 기반으로 유지 (transition 0.01s 포함)

### T2: GlassCard
- `reducedScaleIn` 이미 `lib/animations.ts`에 존재함 (별도 정의 불필요)
- `variants` prop만 분기 처리, `whileHover` 분기는 이미 구현됨

### T3: FloatingNav
- `initial`: reduced 시 `{ opacity: 0 }` (y 제거), 일반 시 `{ opacity: 0, y: -20 }`
- `transition`: reduced 시 `{ duration: 0.01 }`, 일반 시 기존 cubic-bezier

### T4: HeroSection
- 키커, 서브카피, 스탯 카드 wrapper, CTA wrapper 4개 `<m.*>` 블록 각각 분기
- geo1/2/3 parallax: MotionValue는 숫자 `0`으로 대체 (framer-motion이 string style 무시하고 고정값 사용)

### T5: MagneticButton
- div 분기는 다크 배경이 아닌 범용 컨텍스트이므로 `ring-[#0d0d0d]` 사용 (a 분기와 동일)

### T6: globals.css
- `--color-border` 바로 아래 그룹에 3개 토큰 추가
- `--color-bg-alt`는 StorySection 배경(#ede9e3), `--color-ink-subtle`은 보조 텍스트(#777777), `--color-gold-subtle`은 geo3 오브젝트 배경

### T7: HeroSection 색상 토큰 교체
- `color: '#666'` (키커 텍스트) → `var(--color-ink-muted)` (기존 변수 `#595959` — 더 높은 대비)
- `color: '#777'` (스탯 카드 레이블) → `var(--color-ink-subtle)` (T6에서 추가한 `#777777`)
- geo1 border `rgba(0,0,0,0.07)` → `var(--color-border)` (토큰과 동일한 값)
- geo2 border `rgba(0,0,0,0.05)` → `var(--color-border)` (토큰 근사값, border 의미 동일)

### T8: StorySection
- 하드코딩 `'#ede9e3'` → `'var(--color-bg-alt)'` 단일 치환

### T9: CustomCursor
- animate 객체 내 `background` 비호버 상태 값 변경
- `mix-blend-difference` 맥락에서 var(--color-ink)는 #0d0d0d와 동일한 렌더링

## 실패/미구현 태스크
없음. T1-T9 전체 완료.

---

# 리뷰어 REQUEST_CHANGES 반영 — BLOCKER-1, REQUEST-4 수정 완료

## STATUS: DONE

## 빌드 결과
```
npm run build: ✓ 성공 (Turbopack 1361ms)
TypeScript: ✓ 오류 없음 (899ms)
Static pages: ✓ 4/4 생성 (155ms)
```

## 수정된 파일 목록

| 파일 경로 | 이슈 | 변경 내용 |
|-----------|------|-----------|
| `components/sections/HeroSection.tsx` | BLOCKER-1 | geo3 오브젝트 background `rgba(192,169,106,0.08)` → `var(--color-gold-subtle)` 교체, border/boxShadow에 공백 정규화 및 `/* gold border — no token */`, `/* gold shadow — no token */` 주석 추가 |
| `components/sections/StorySection.tsx` | REQUEST-4 | `useReducedMotion` import 추가, `reducedFadeUp` import 추가, `prefersReduced` 선언, `<m.ol variants>` / `<m.li variants>` 각각 reduced 분기 처리 |

## 이슈별 상세

### BLOCKER-1: HeroSection gold 색상 토큰 교체
- `background: 'rgba(192,169,106,0.08)'` → `background: 'var(--color-gold-subtle)'`
  - `--color-gold-subtle`은 `app/globals.css` 라인 19에 `rgba(192, 169, 106, 0.08)` 값으로 정의돼 있음
- `border: '1px solid rgba(192,169,106,0.3)'` → 공백 정규화 + `/* gold border — no token */` 주석 추가 (토큰 없음, 값 유지)
- `boxShadow: '0 8px 24px rgba(192,169,106,0.15)'` → 공백 정규화 + `/* gold shadow — no token */` 주석 추가 (토큰 없음, 값 유지)

### REQUEST-4: StorySection reduced-motion 분기
- `reducedFadeUp`은 `lib/animations.ts`에 이미 정의돼 있었음 (별도 추가 불필요)
  - `hidden: { opacity: 0 }`, `visible: { opacity: 1, transition: { duration: 0 } }`
- `m.ol variants`: `prefersReduced ? { hidden: {}, visible: {} } : stagger(0.1)`
  - reduced 시 stagger 자체를 무효화 (자식들이 staggerChildren 타이밍 없이 즉시 등장)
- `m.li variants`: `prefersReduced ? reducedFadeUp : fadeUp`
  - reduced 시 y 이동 없이 opacity만 0→1 전환 (duration 0으로 즉시)

---

# PM Round 4 — 색상 토큰 정리 + OG 이미지 (T1–T7)

## STATUS: DONE

## 빌드 결과
```
▲ Next.js 16.2.1 (Turbopack)
✓ Compiled successfully in 1281ms
Finished TypeScript in 891ms — TypeScript 오류 0개
✓ Generating static pages (5/5)

Route (app)
/ — Static
/_not-found — Static
/opengraph-image — Static
```

## 변경 파일 목록

| 파일 | 태스크 |
|------|--------|
| `app/globals.css` | T1 |
| `app/layout.tsx` | T7 (og-image 참조 제거) |
| `app/opengraph-image.tsx` | T7 (신규 생성) |
| `components/layout/Footer.tsx` | T2 |
| `components/sections/ContactSection.tsx` | T3 |
| `components/sections/WorkSection.tsx` | T4 |
| `components/nav/FloatingNav.tsx` | T5 |
| `components/sections/ServiceSection.tsx` | T6 |
| `components/ui/GlassCard.tsx` | T6 |
| `components/sections/StorySection.tsx` | T6 |
| `components/sections/HeroSection.tsx` | T6 |
| `public/file.svg` | T7 (삭제) |
| `public/next.svg` | T7 (삭제) |
| `public/window.svg` | T7 (삭제) |
| `public/vercel.svg` | T7 (삭제) |
| `public/globe.svg` | T7 (삭제) |

## 구현 완료 태스크

### T1: globals.css
- `html { cursor: none }` 를 `@media (hover: hover)` 블록 내부로 이동 (M7 해결 — 터치 기기 cursor 정상화)
- 신규 CSS 토큰 5개 추가: `--color-dark-border`, `--color-dark-surface`, `--color-ink-inverted`, `--color-gold-border`, `--color-gold-glow`

### T2: Footer.tsx
- `#fff` → `var(--color-ink-inverted)` (M4)
- `#555` (2곳) → `var(--color-ink-subtle)` (M4)
- `#666` → `var(--color-ink-subtle)` (M4)
- `#333` → `var(--color-dark-border)` — BLOCKER 1.7:1 대비 해결 (M4)

### T3: ContactSection.tsx
- `color: '#888'` 2곳 → `var(--color-ink-subtle)` (M2)
- `color: '#fff'` → `var(--color-ink-inverted)` (M3)
- 배경 FORMA 텍스트 `fontFamily: var(--font-sans)` → `var(--font-display)` (N10)

### T4: WorkSection.tsx
- Coming Soon 카드 하드코딩 색상 전체 토큰 교체 (M1)
  - `#111`, `#141414`, `#1a1a1a` → `var(--color-dark-surface)`
  - `#1e1e1e`, `#2a2a2a`, `#222` → `var(--color-dark-border)`
  - `#555` → `var(--color-ink-subtle)`
- 라이브 카드 `bg-white` → `bg-[var(--color-surface)]` (N3)
- 레퍼런스 카드 패턴: Coming Soon 카드에 `hover:border-white/20 transition-all` 추가 (D2)

### T5: FloatingNav.tsx
- `text-[#6b6b6b]` → `text-[var(--color-ink-subtle)]` (M5)
- `hover:bg-[#333]` → `hover:bg-[var(--color-dark-surface)]` (M5)
- 모바일 메뉴 `text-[#666]` → `text-[var(--color-ink-subtle)]` (M5)
- 데스크톱 CTA에 `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none` 추가 (M6)
- 로고 `href="#"` → `href="#hero"` (N7)
- 기존 scrolled 상태 조건부 backdrop-blur 구조 유지 (라이트 페이지 맥락에서 적합)

### T6: 잔여 토큰 교체
- ServiceSection: `bg-white` → `bg-[var(--color-surface)]` (N1), `rgba(192,169,106,0.25)` → `var(--color-gold-dim)` (N2)
- GlassCard: `rgba(255,255,255,0.55)` → `var(--color-glass)` (N4)
- StorySection: 커넥터 `rgba(0,0,0,0.15)` → `var(--color-border)` (N6)
- HeroSection: gold border/glow 하드코딩 → `var(--color-gold-border)` / `var(--color-gold-glow)` + 주석 제거 (N5)

### T7: public/ 클린업 + OG 이미지
- 미사용 SVG 5개 삭제 확인 후 제거: file.svg, next.svg, window.svg, vercel.svg, globe.svg (N8)
- `app/opengraph-image.tsx` 생성 — Next.js 16 ImageResponse 동적 OG 이미지 (B1 해결)
  - 1200x630, `image/png`, edge 런타임 없이 static 생성
  - 다크 배경 (#0d0d0d), FORMA 텍스트, gold 태그라인, 기하학 장식 포함
- `app/layout.tsx`에서 `images: ['/og-image.jpg']` 제거 (Next.js 자동 처리로 전환)

## 실패 항목

없음. PM 명세 BLOCKER/MAJOR/MINOR 전체 항목 완료.

## 보류 항목 (PM 명세 외 / 지시 없음)

- N9 (`WorkSection overflow-x-auto` 미디어 쿼리): 현재 `lg:overflow-visible overflow-x-auto`로 lg 이상에서 이미 visible 처리됨. 추가 수정 지시 없어 보류.
- D3 (HeroSection 상태 배지 pulse dot): "추가 고려" 항목, 태스크 구현 지시 없어 보류.
- D4 (전체 다크 섹션 배경색 `#09090b` 통일): 현재 `--color-dark-bg: #0d0d0d` 사용. 색상값 변경은 디자인 결정 필요, 태스크에 명시 없어 보류.
