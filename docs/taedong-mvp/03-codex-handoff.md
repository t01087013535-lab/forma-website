# 03 — Codex 핸드오프 명세

```
대상   : Codex CLI (디자인·구현 담당)
선행   : 01-design-analysis.md, 02-mvp-plan.md
형식   : 작업 단위 = 1 게이트 = 1 PR
검수자 : Claude (이 디렉터리의 04-review-checklist.md 적용)
```

---

## 0. 시작 전 필독

1. **AGENTS.md 강제 규칙**: Next.js 16은 training data와 다름. 어떤 코드도 작성 전 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 읽을 것.
2. **CLAUDE.md (전역) 강제 규칙**:
   - Named export only (App Router의 page/layout/error/loading은 예외 → `export { Foo as default }` 패턴)
   - 파일 ≤ 300줄, 함수 ≤ 50줄
   - 매직 넘버 금지 → `lib/constants.ts`로 추출
   - `catch (e) {}` 금지
   - 시크릿/PII git 커밋 금지
3. **외과 수술식 수정**: `Edit` 도구로 최소 범위만 변경. `Write`는 신규 파일 한정.
4. **PRAV 루프**: Plan → Research → Act → Validate. 가정으로 코드 작성 금지.

---

## 1. PR-1 — Foundations (Day 1)

### 1.1 작업 목록

#### [D1-1] 환경 변수 정리
- 신규 파일: `.env.example`
  ```env
  # Public (브라우저 노출 가능)
  NEXT_PUBLIC_CONTACT_EMAIL=hello@forma.kr
  NEXT_PUBLIC_SITE_URL=https://forma-website-two.vercel.app

  # Server only (Vercel Project Settings에 등록)
  RESEND_API_KEY=
  CONTACT_NOTIFICATION_EMAIL=hello@forma.kr
  RECAPTCHA_SECRET_KEY=
  ```
- Vercel `vercel env pull` 후 동기화 확인
- `.gitignore`에 `.env*` 포함되어 있는지 검증 (이미 있을 가능성 높음)

#### [D1-2] 콘택트 폼 백엔드 (Resend)
- 신규: `app/api/contact/route.ts`
  - `POST` 핸들러, `runtime = 'nodejs'`
  - Zod로 입력 검증
  - Resend SDK로 hello@forma.kr에 알림 메일
  - 200/400/422/429/500 상태 코드 반환 (전역 api-design.md 준수)
- 신규: `lib/email/contact-template.ts` — HTML/text 메일 템플릿
- 수정: `components/sections/ContactSection.tsx`
  - `handleSubmit`이 `fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })` 호출
  - 성공 시 setSubmitted(true), 실패 시 에러 표시
  - 로딩 상태 추가
- 수정: `components/ui/ContactModal.tsx` — 동일 핸들러 또는 공유 훅으로 통합
- 신규: `lib/contact/schema.ts` — Zod 스키마 (서버/클라이언트 공유)

#### [D1-3] 입력 검증 + 봇 차단
- Zod 스키마: name(2~50), email(format), service(enum), budget(enum), message(10~2000)
- Honeypot 필드 (`<input name="website" hidden>`) — 채워지면 200 반환 후 폐기
- IP 기반 rate limit: Vercel Edge Config 또는 Upstash Redis (선택)

#### [D1-4] lucide-react 버전 확인
```bash
cd ~/forma-website
npm view lucide-react version  # 최신 확인
npm install lucide-react@latest
npm run build
```
- 사용처 grep: `grep -r "from 'lucide-react'" components/ app/`
- import 변화 없으면 버전만 갱신, 변화 있으면 최소 수정

### 1.2 게이트 1 통과 기준
- [ ] `npm run build` 통과
- [ ] `npm run lint` 통과
- [ ] 본인 이메일로 5회 테스트 성공
- [ ] 빈/악성 페이로드 5종 거부 확인 (SQLi, XSS, 빈값, 초장문, 잘못된 이메일)
- [ ] git diff에 시크릿 0건

---

## 2. PR-2 — Content (Day 2)

### 2.1 작업 목록

#### [D2-1] portfolio-data 실제 콘텐츠
- 수정: `lib/portfolio-data.ts`
  ```ts
  // 실제 케이스 3건 + 1건 Coming Soon (총 4건 — 벤토 그리드 슬롯 일치)
  export const portfolioItems: PortfolioItem[] = [
    { index: '01', name: '성벽종합건설', nameEn: 'Sungbyuk Construction',
      url: 'https://sungbyuk.vercel.app',
      tags: ['Next.js 16', 'Tailwind v4', 'Vercel'],
      thumbnail: '/work/sungbyuk-thumb.webp', isLive: true },
    // 02, 03 — 사용자(min)가 결정한 실제 케이스 입력
    { index: '04', name: 'Coming Soon', tags: [], isLive: false },
  ]
  ```
- 썸네일: `public/work/{slug}-thumb.webp` (1600x900, < 200KB)
- "Project 02-05" 문자열 grep 0건 확인

#### [D2-2] 케이스 스터디 1건 (성벽종합건설)
- `app/work/[slug]/page.tsx`가 슬러그를 받는 구조 확인 후 데이터 모듈화
- 신규: `lib/case-studies/sungbyuk.ts`
  ```ts
  export const sungbyukCaseStudy = {
    slug: 'sungbyuk',
    hero: { title, subtitle, period, role, stack },
    narrative: [{ heading, body }, ...],
    gallery: [{ src, alt, caption }, ...],
    outcome: { metrics: [{ label, value }, ...] },
  }
  ```
- 컴포넌트는 기존 `WorkHero`, `WorkNarrative`, `WorkGallery`, `WorkOutcome` 재사용

#### [D2-3] OG 이미지 케이스별
- `app/work/[slug]/opengraph-image.tsx` 동적 OG 구현 (Next 16 ImageResponse API 확인 필수)
- 폴백: 사이트 기본 OG

#### [D2-4] 카피 교정
- 모든 섹션 텍스트 한국어 맞춤법 1회 통독
- 한영 혼용 일관성 (예: 모든 섹션 라벨이 영문 mono인지)
- 의심 케이스: `OriginSection.tsx`, `StorySection.tsx`, `ValuesSection.tsx`

### 2.2 게이트 2 통과 기준
- [ ] `grep -r "Project 0[2-5]" .` → 0건
- [ ] `/work/sungbyuk` 200 OK 렌더링
- [ ] OG Debugger (https://www.opengraph.xyz/) 통과
- [ ] 한국어 오타 0건

---

## 3. PR-3 — Discoverability (Day 3)

### 3.1 작업 목록

#### [D3-1~2] sitemap + robots
- 신규: `app/sitemap.ts`
  ```ts
  import type { MetadataRoute } from 'next'

  export default function sitemap(): MetadataRoute.Sitemap {
    const base = process.env.NEXT_PUBLIC_SITE_URL!
    return [
      { url: base, lastModified: new Date(), priority: 1.0 },
      { url: `${base}/services`, priority: 0.8 },
      { url: `${base}/work/sungbyuk`, priority: 0.7 },
      // ...
    ]
  }
  ```
- 신규: `app/robots.ts` — 프로덕션만 허용

#### [D3-3] per-page metadata
- 각 라우트 page.tsx에 `export const metadata` 또는 `generateMetadata`
- title 패턴: `{페이지} — FORMA Studio`
- description: 80~160자, 키워드 자연 포함

#### [D3-4] JSON-LD
- `app/layout.tsx`에 `<script type="application/ld+json">` Organization + WebSite
- `app/work/[slug]/page.tsx`에 CreativeWork 또는 Article

#### [D3-5] Vercel Analytics + Speed Insights
- `npm install @vercel/analytics @vercel/speed-insights`
- `app/layout.tsx`에 `<Analytics />`, `<SpeedInsights />` 추가
- Next.js 16 호환 import 경로 확인 (AGENTS.md 강제)

#### [D3-6] 이벤트 트래킹
- `lib/analytics/events.ts` — 이벤트 키 상수
- 추적 이벤트: `contact_submit_attempt`, `contact_submit_success`, `cta_start_journey`, `work_card_click`

### 3.2 게이트 3 통과 기준
- [ ] `/sitemap.xml` 200 + 모든 라우트 포함
- [ ] `/robots.txt` 200
- [ ] Lighthouse SEO ≥ 95
- [ ] Schema.org Validator 통과
- [ ] Vercel Analytics 대시보드에 1건 이상 인입

---

## 4. PR-4 — QA & Polish (Day 4)

### 4.1 작업 목록

#### [D4-1] 모바일 QA
- Chrome DevTools 또는 BrowserStack에서 360/414/768/1024 4지점
- 가로 스크롤 0건, 터치 영역 ≥ 44px, 햄버거 메뉴 동작

#### [D4-2] axe-core
- `npx @axe-core/cli https://forma-website-two.vercel.app --tags wcag2a,wcag2aa`
- 위반 0건까지 수정

#### [D4-3] 키보드 only
- Tab 순서 논리적, focus-visible 모든 인터랙션, ESC로 모달 닫힘

#### [D4-4] 번들 분석
- `next.config.ts`에 `@next/bundle-analyzer` 추가 또는 일회성 실행
- 큰 chunk 식별 → 동적 import 후보 결정
- Three.js, GSAP는 이미 lazy 가능성 높음 — 검증

#### [D4-5] Three.js 조건부 로드
- `ThreeHeroLazy`가 IntersectionObserver로 동작하는지 확인
- `prefers-reduced-motion`에서 정적 이미지 fallback
- 모바일 width < 768에서 비활성 옵션 검토

#### [D4-6] 깨진 링크
- `npx broken-link-checker https://forma-website-two.vercel.app -ro`

### 4.2 게이트 4 통과 기준 (MVP 완료)
- [ ] `02-mvp-plan.md §2` KPI 표 전체 통과
- [ ] `npm run build && npm run lint` 그린
- [ ] Vercel 프로덕션 promote
- [ ] 검수 보고서 `reviews/gate-4.md` 작성

---

## 5. 작업 컨벤션 요약

```
Branch    : feature/mvp-d{N}-{slug}    예: feature/mvp-d1-contact-backend
Commit    : <type>(scope): <subject>   예: feat(taedong-web): add resend contact api
Co-author : Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
PR title  : [MVP D{N}] <한 문장 요약>
PR body   : ## 변경 / ## 검증 / ## 검수 게이트 / ## 스크린샷 (UI 변화 시)
```

scope: `taedong-web` (CLAUDE.md 정의)

---

## 6. 막힐 때

1. Next.js 16 API 의문 → `node_modules/next/dist/docs/` 또는 `context7 query-docs`
2. Vercel 배포 실패 → `vercel logs` + `docs/taedong-mvp/reviews/` 에 로그 첨부
3. 디자인 결정 모호 → 본 문서 §1 디자인 시스템에 답이 없으면 Claude(검수)에 핑

---

## 7. Codex가 받을 한 줄 요약

> **PR-1 D1-1부터 순서대로 진행. 게이트별로 PR 분리. 모든 PR은 04-review-checklist.md를 통과해야 머지된다.**
