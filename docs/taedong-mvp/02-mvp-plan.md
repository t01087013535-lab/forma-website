# 02 — 태동 홈페이지 MVP 계획

```
작성일 : 2026-04-22
기간   : 4일 스프린트 (Day 1 ~ Day 4)
선행   : 01-design-analysis.md
실행자 : Codex (디자인·구현)
검수   : Claude (게이트별 승인)
```

---

## 1. MVP 정의 (Definition of MVP)

> **"forma-website-two.vercel.app을 외부에 공유했을 때 부끄럽지 않은 상태"**
>
> = 더미 콘텐츠 0건 + 콘택트 폼 실제 동작 + 검색 노출 가능 + 모바일 정상 + 핵심 KPI 측정.

**MVP가 아닌 것**:
- `/insights` 블로그 콘텐츠 작성 (Phase 2)
- 다국어 (영어 페이지 분기)
- 결제·로그인·관리자 페이지
- A/B 테스트 인프라

---

## 2. 성공 기준 (Acceptance Criteria)

| KPI | 목표 | 측정 방법 |
|-----|------|----------|
| Lighthouse Performance | ≥ 85 (모바일) | `npx lighthouse https://forma-website-two.vercel.app --form-factor=mobile` |
| Lighthouse Accessibility | ≥ 95 | 동일 |
| Lighthouse SEO | ≥ 95 | 동일 |
| LCP | < 2.5s | Vercel Analytics / Lighthouse |
| CLS | < 0.1 | 동일 |
| 콘택트 폼 제출 → 수신 | 100% | 본인 이메일 테스트 5회 |
| 더미 텍스트 ("Project 02" 등) | **0건** | `grep -r "Project 0[2-5]" .` |
| 404 / 깨진 링크 | 0건 | `npx broken-link-checker` |
| 키보드 only 모든 인터랙션 | 통과 | 수동 테스트 |
| 자동 메모리 PII 누출 | 0건 | `git diff` 검토 |

---

## 3. 우선순위 매트릭스

```
   심각도 ↑
    P0 │ G2 콘택트백엔드   G1 포트폴리오 콘텐츠
       │ G3 SEO/메타
       │
    P1 │ G4 분석          G5 케이스스터디
       │ G7 모바일 QA     G8 접근성 실측
       │ G9 성능 예산     G11 env 정리
       │
    P2 │ G6 insights      G10 lucide ver
       │ G12 폼 통합
       └────────────────────────────→ 작업량
```

---

## 4. 4-Day Sprint Plan

### Day 1 — Foundations (P0 기반 공사)

| # | 작업 | 산출물 | 검수 게이트 |
|---|------|--------|----------|
| D1-1 | 환경 변수 정리 (`.env.example` + Vercel) | `.env.example`, Vercel env 동기화 | 시크릿 git 노출 0건 |
| D1-2 | 콘택트 폼 백엔드 결정 + 구현 (Resend 권장) | `app/api/contact/route.ts`, `lib/email.ts` | Postman 5회 성공 |
| D1-3 | 폼 입력 검증 (Zod) + reCAPTCHA v3 또는 honeypot | 검증 스키마 + 봇 차단 | 빈 값/SQLi/XSS 페이로드 거부 |
| D1-4 | `lucide-react` 버전 확인 + 정리 | `package.json` 정정 | `npm run build` 통과 |

**검수 게이트 1 (Day 1 종료)**: 콘택트 폼 실 전송 가능 + 빌드 그린

---

### Day 2 — Content (P0 콘텐츠 채움)

| # | 작업 | 산출물 | 검수 게이트 |
|---|------|--------|----------|
| D2-1 | `portfolio-data.ts` 더미 4건 → 실제 3건 + (1건 Coming Soon) | 업데이트된 데이터 + 썸네일 | "Project 02-05" grep 0건 |
| D2-2 | 케이스 스터디 1건 본문 작성 (`/work/sungbyuk`) | `lib/case-studies/sungbyuk.ts` 또는 MD | 페이지 렌더링 + LCP < 3s |
| D2-3 | OG 이미지 케이스별 검증 | `app/work/[slug]/opengraph-image.tsx` | OG Debugger 패스 |
| D2-4 | 카피 교정 (오타·일관성) | 모든 섹션 텍스트 | 한국어 문법/맞춤법 검수 |

**검수 게이트 2 (Day 2 종료)**: 더미 콘텐츠 0건 + Work 그리드 클릭 → 케이스 스터디 정상

---

### Day 3 — Discoverability (P0 SEO + P1 분석)

| # | 작업 | 산출물 | 검수 게이트 |
|---|------|--------|----------|
| D3-1 | `app/sitemap.ts` 생성 | 사이트맵 자동 생성 | `/sitemap.xml` 200 OK |
| D3-2 | `app/robots.ts` 생성 | robots.txt | `/robots.txt` 200 OK |
| D3-3 | per-page `generateMetadata` (title/description/og) | 각 페이지 메타 | View Source에서 메타 확인 |
| D3-4 | Organization + WebSite JSON-LD | `app/layout.tsx`에 schema injection | Schema.org Validator 통과 |
| D3-5 | Vercel Analytics + Speed Insights 활성화 | `@vercel/analytics` 통합 | Vercel 대시보드에 데이터 인입 |
| D3-6 | 콘택트 폼 제출 이벤트 트래킹 | `track('contact_submit')` | 이벤트 확인 |

**검수 게이트 3 (Day 3 종료)**: Lighthouse SEO ≥ 95 + Analytics 데이터 1건 이상 인입

---

### Day 4 — QA & Polish (P1 모바일·접근성·성능)

| # | 작업 | 산출물 | 검수 게이트 |
|---|------|--------|----------|
| D4-1 | 모바일 4지점 QA (360/414/768/1024) | 스크린샷 + 이슈 목록 | 가로 스크롤 0건, 터치 영역 ≥ 44px |
| D4-2 | axe-core 자동 스캔 + 수정 | 위반 0건 | `npx @axe-core/cli` |
| D4-3 | 키보드 only 전체 흐름 | 동영상 또는 체크리스트 | Tab 순서 논리적, 포커스 보임 |
| D4-4 | 번들 분석 + 동적 import 추가 | `npx @next/bundle-analyzer` 리포트 | 초기 JS < 250KB(gzip) |
| D4-5 | Three.js 조건부 로드 검증 | 모바일/저성능에서 fallback | reduced-motion·저사양 우회 OK |
| D4-6 | 깨진 링크 검사 | `broken-link-checker` 리포트 | 깨진 링크 0건 |

**검수 게이트 4 (Day 4 종료, MVP 완료)**: §2 KPI 표 전체 통과 + 프로덕션 promote

---

## 5. 리스크 / 가정

| 리스크 | 완화 |
|-------|------|
| Resend 무료 한도(3,000/월) 초과 | 한도 도달 시 Cloudflare Email Routing fallback |
| Three.js가 모바일 LCP 악화 | `ThreeHeroLazy`가 이미 동적 import — IntersectionObserver 트리거 검증 |
| Next.js 16 breaking change로 빌드 실패 | 모든 작업 전 `node_modules/next/dist/docs/` 확인 (AGENTS.md 강제) |
| 케이스 스터디 콘텐츠 부족 | 성벽종합건설 1건 우선, 나머지는 "Coming Soon" 카드로 표기 |
| 폼 봇 스팸 폭주 | honeypot + Resend rate limit + Vercel WAF |

---

## 6. 검수 사이클 (Codex ↔ Claude)

```
Codex 작업 단위 (1 게이트 = 1 PR)
   ↓
Claude 검수 (04-review-checklist.md 적용)
   ↓
PASS → 다음 게이트로
FAIL → 이슈 코멘트 + 수정 요청 (재검수)
```

PR 단위 권장:
- PR-1: D1 묶음 (Foundations)
- PR-2: D2 묶음 (Content)
- PR-3: D3 묶음 (Discoverability)
- PR-4: D4 묶음 (Polish)

---

## 7. 산출물 위치 합의

| 종류 | 경로 |
|------|------|
| 본 계획 | `docs/taedong-mvp/02-mvp-plan.md` |
| Codex 작업 명세 | `docs/taedong-mvp/03-codex-handoff.md` |
| 검수 체크리스트 | `docs/taedong-mvp/04-review-checklist.md` |
| 게이트별 검수 결과 | `docs/taedong-mvp/reviews/gate-{N}.md` (작업 후 생성) |
