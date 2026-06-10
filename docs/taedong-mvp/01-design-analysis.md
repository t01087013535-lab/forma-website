# 01 — Forma 디자인 분석 보고서

```
작성일   : 2026-04-22
대상     : forma-website (배포: https://forma-website-two.vercel.app)
저장소   : ~/forma-website (Next.js 16 + React 19)
분석자   : Claude (검수 담당)
다음 단계 : 02-mvp-plan.md → 03-codex-handoff.md
```

---

## 1. 한 줄 요약

> **디자인 시스템과 페이지 골조는 90% 완성. MVP는 디자인이 아니라 "콘텐츠·백엔드·SEO·QA"의 빈칸을 채우는 작업이다.**

근거: `app/page.tsx`에 8개 섹션이 모두 마운트되어 있고(`HeroSection` ~ `ContactSection`), Three.js·GSAP·Framer·Lenis 인터랙션이 동작하며 Vercel 자동 배포 파이프라인까지 구축됨(`bbc151b`).

---

## 2. 브랜드 / 컨셉

| 항목 | 값 | 출처 |
|------|----|------|
| 브랜드 | FORMA by Taedong | `app/page.tsx`, 배포본 헤더 |
| 한국어 헤드라인 | **"비전에 형태를."** | `HeroSection.tsx:38-39` (스크램블 애니메이션) |
| 서브 카피 | "풀스택 웹 컨설팅 스튜디오" | `HeroSection.tsx:164` |
| 본문 카피 | "아이디어는 형태를 얻는 순간 현실이 됩니다." | `HeroSection.tsx:177-178` |
| 어원 | Latin "Forma" → 형태/형상 | 배포본 The Name 섹션 (`OriginSection`) |
| 설립 | EST. 2024 | `HeroSection.tsx:255` |
| 콘택트 | hello@forma.kr · Seoul, Korea | `ContactSection.tsx:7` |

---

## 3. 정보 구조 (IA)

```
HomePage (app/page.tsx)
├── LoadingOverlay      — 진입 페이드
├── FloatingNav         — Work / Story / Service / Contact
├── ScrollProgress      — 상단 진행 바
├── SectionNav          — 섹션 점프
├── ContactModal        — 전역 모달 (open-contact-modal 이벤트)
└── main
    ├── Hero            — FORMA + 스크램블 + Three.js 배경
    ├── Origin          — "The Name — FORMA" (어원/철학)
    ├── Work            — Selected Creations (벤토 그리드 4칸)
    ├── Values          — Beyond the Surface (가치 4개)
    ├── Story           — FORMA Studio 서사
    ├── Service         — UI/UX · Full-Stack · Consulting (3패널)
    └── Contact         — 다크 섹션 + 폼

추가 라우트:
  /services       — 서비스 상세
  /insights       — 인사이트 그리드
  /work/[slug]    — 케이스 스터디
```

---

## 4. 디자인 시스템 추출

### 4.1 타이포그래피
- **세리프(헤드라인/감성)**: `var(--font-newsreader)` italic, weight 300
- **한국어 본문**: `var(--font-korean-serif)` weight 800
- **모노(라벨/메타)**: `var(--font-mono)` 10px, letter-spacing 0.4em, uppercase
- **본문 영문**: Inter (package.json 기준 next/font Geist 대신 커스텀)

### 4.2 컬러 토큰 (`globals.css` 기반 추정)
| 토큰 | 값 | 용도 |
|------|----|------|
| `#1a1c19` | 잉크 | 헤드라인 |
| `var(--color-paper)` | 베이지 페이퍼 | 배경 |
| `var(--color-accent)` / `#675e3f` | 골드 브론즈 | 강조/링크 |
| `var(--color-ink)` | 다크 잉크 | Contact 섹션 다크 모드 |
| `rgba(26,28,25,0.07~0.45)` | 알파 그레이 | 보더/메타 텍스트 |

### 4.3 인터랙션 패턴
- **스크램블 텍스트**: `useScramble` 훅 (Hero 헤드라인)
- **패럴랙스**: `useScroll + useTransform` (logoY/contentY)
- **Magnetic Button**: 마우스 추적 자석 효과
- **Custom Cursor**: `cursor-none` + `CustomCursor.tsx`
- **Lenis Smooth Scroll**: `LenisProvider`로 전역 적용
- **Three.js Hero 배경**: `ThreeHeroLazy` 동적 로드
- **`prefers-reduced-motion` 완전 대응**: 모든 모션이 분기 처리됨

### 4.4 레이아웃 그리드
- 컨테이너: `max-w-[1400px]` (Service/Contact), `max-w-[1600px]` (Work)
- 컬럼: 12 col grid
- 패딩: `px-6 md:px-16` 표준
- 벤토 그리드: 8/4/4/8 비율 + aspect ratio 변주 (16:9, 3:4, 1:1)

---

## 5. 기술 스택 정합성

| 레이어 | 선택 | 평가 |
|-------|------|------|
| Framework | Next.js 16.2.1 | ✅ 최신. **AGENTS.md 경고**: training data와 다름, `node_modules/next/dist/docs/` 참조 필수 |
| React | 19.2.4 | ✅ |
| 스타일 | Tailwind v4 + `@tailwindcss/postcss` | ✅ |
| 모션 | framer-motion 11 + gsap 3.14 | ✅ 중복이지만 용도 분리(F-M=리액트, GSAP=고성능) |
| 3D | three 0.183 | ⚠️ 번들 크기 모니터 필요 |
| 스크롤 | lenis 1.3 | ✅ |
| 아이콘 | lucide-react 1.6 | ⚠️ 1.6은 비정상적으로 낮은 버전 — 확인 필요 |
| 배포 | Vercel (`prj_s13IPyHagjTItAGSy3wcc7sGtoGG`) | ✅ |

---

## 6. 강점 (그대로 유지)

1. **희소한 한국어 모더니즘 톤**: 한영 혼용 + 세리프 italic + Latin 어원 → 차별화 강함
2. **인터랙션 완성도**: 스크램블·패럴랙스·매그네틱·커스텀커서·Lenis 5종 모두 `prefers-reduced-motion` 분기됨 (접근성 기본기 우수)
3. **구조 분리**: `sections/` `ui/` `layout/` `nav/` `three/` 가 명확히 분리, 컴포넌트 재사용성 높음
4. **확장 라우트 준비됨**: `/work/[slug]`, `/insights`, `/services` 골조 존재

---

## 7. 갭 분석 (MVP 작업 대상)

| # | 영역 | 현재 상태 | 갭 | 심각도 |
|---|------|----------|----|------|
| G1 | 포트폴리오 콘텐츠 | `portfolio-data.ts`에 실제 1건(성벽종합건설), 더미 4건(Project 02–05) | 실제 케이스 스터디 3–4건 추가 | **P0** |
| G2 | 콘택트 폼 백엔드 | `ContactSection.handleSubmit`이 `setSubmitted(true)`만 호출 | 실제 전송(Resend/Formspree/Supabase) + 검증 + 봇 차단 | **P0** |
| G3 | SEO / 메타 | `opengraph-image.tsx`만 존재. `sitemap.ts`/`robots.ts`/JSON-LD 미확인 | 사이트맵, robots, Organization JSON-LD, per-page metadata | **P0** |
| G4 | 분석 (Analytics) | GA4 / PostHog / Vercel Analytics 통합 흔적 없음 | 최소 1개 통합 + 이벤트 정의 | P1 |
| G5 | `/work/[slug]` 케이스 스터디 | 라우트만 존재, 슬러그 데이터 미확인 | 1–2건 본문 작성 (성벽종합건설 우선) | P1 |
| G6 | `/insights` 콘텐츠 | InsightCard/Grid 컴포넌트 존재, 실제 글 미확인 | MVP는 비활성 또는 "Coming Soon" | P2 |
| G7 | 모바일 반응형 검증 | 코드상 `md:` 분기는 있으나 실기 미확인 | 360/768/1024/1440 4지점 QA | P1 |
| G8 | 접근성 실측 | `aria-label`·`prefers-reduced-motion` 코드 우수, axe/Lighthouse 점수 미측정 | 자동 스캔 + 키보드 only 통과 | P1 |
| G9 | 성능 예산 | Three.js·GSAP·Lenis 동시 로드 → 번들/LCP 미측정 | LCP < 2.5s, JS < 250KB(gzip), CLS < 0.1 | P1 |
| G10 | `lucide-react@1.6` | 비정상 낮은 버전 가능성 | 버전 확인 후 최신화 또는 고정 사유 명시 | P2 |
| G11 | 환경 변수 표면 | `NEXT_PUBLIC_CONTACT_EMAIL`만 사용 중 | `.env.example` 정리 + Vercel env 동기화 | P1 |
| G12 | 콘택트 모달 ↔ 섹션 폼 | 두 개 폼이 별도 존재 → 데이터/검증 중복 가능성 | 단일 핸들러로 통합 | P2 |

---

## 8. 디자인 톤 일치 검증 (태동 브랜드 합치성)

태동2.0 CLAUDE.md의 두 프로젝트 정의:
1. **NEXUS** — 멀티플랫폼 분석 SaaS (B2B 제품)
2. **태동 웹사이트** — 팀/서비스 소개 마케팅

→ Forma 사이트는 **"태동 웹사이트"의 독립 브랜드(FORMA by Taedong)**로 포지셔닝됨. 클라이언트 프로젝트(성벽·NEXUS·기타) 사례를 보여주는 **에이전시/스튜디오 홍보 사이트**의 성격.

✅ 톤 일치: "풀스택 웹 컨설팅 스튜디오" 카피와 태동 운영 보고서(`taedong-vault/태동 운영/`)의 방향 일치

⚠️ 검토 필요: NEXUS는 별도 도메인/사이트로 운영되어야 하는지, Forma 내 케이스 스터디로 들어가야 하는지 결정 필요

---

## 9. 다음 단계

→ `02-mvp-plan.md`: G1–G12를 우선순위별 스프린트로 패키징
→ `03-codex-handoff.md`: Codex가 받을 작업 명세 + 코드 예시
→ `04-review-checklist.md`: Claude(검수)가 사용할 게이트 체크리스트
