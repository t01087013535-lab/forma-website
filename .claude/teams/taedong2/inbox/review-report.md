## 코드 리뷰 보고서 — FORMA 웹사이트 디자인 리빌딩 (전체 7개 파일)

**결과**: REQUEST_CHANGES
**리뷰어**: 감사관리실 독립 인스턴스
**리뷰일**: 2026-03-25

---

### 검토 파일
- `app/globals.css`
- `components/nav/FloatingNav.tsx`
- `components/sections/HeroSection.tsx`
- `components/sections/WorkSection.tsx`
- `components/sections/ServiceSection.tsx`
- `components/sections/StorySection.tsx`
- `components/layout/Footer.tsx`

---

### 핵심 체크포인트 결과

| 항목 | 상태 | 비고 |
|------|------|------|
| LazyMotion 패턴 (`m.*`) | PASS | 전 파일 `motion.*` 0건, `m.*` 패턴 정상 |
| useReducedMotion 유지 | PARTIAL | WorkSection initial/whileInView 분기 누락 (아래 상세) |
| WorkSection bento 12-col | PASS | col-span-8/4/6/6 정상 적용 |
| ServiceSection 화이트 섹션 | PASS | `bg-white text-black rounded-[48px] mx-4 mb-4` 정상 |
| HeroSection 배지 | PASS | `text-blue-400 font-mono tracking-widest` 존재 |
| globals.css 변수 | PASS | `--color-dark-bg: #050505`, `--color-ink: #ededed` 정상 |
| 접근성 텍스트 대비 | PASS | text-black/text-zinc-600 on white 대비 충족 |
| TypeScript 오류 | PASS | frontend-done.md tsc --noEmit 0 오류 확인 |

---

### 🟡 변경 요청 (강력 권고)

**1. `WorkSection.tsx:49-50, 100-101, 122-123, 144-145` — `initial/whileInView` 블록에 `prefersReduced` 분기 없음**

모든 bento 카드의 `whileHover`는 `prefersReduced ? 0 : -10` 분기가 있어 올바르지만,
같은 카드의 `initial/whileInView`는 조건 없이 `{ opacity: 0, y: 20 }` / `{ opacity: 1, y: 0 }` 고정 사용.

`prefers-reduced-motion` 사용자는 `globals.css`의 CSS 레벨 억제(`animation-duration: 0.01ms`)에만 의존하게 된다.
Framer Motion의 JS 애니메이션은 CSS 미디어 쿼리 억제 대상이 아니므로, y축 이동 애니메이션이 실행될 수 있다.
HeroSection·StorySection은 `prefersReduced` 분기가 `initial`에도 적용되어 있어 WorkSection만 일관성이 깨짐.

권고: `initial` 및 `whileInView`에 동일한 패턴 적용.
```tsx
// 수정 전
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}

// 수정 후
initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
```

**2. `StorySection.tsx:51-58` — `m.p` (서브카피) `initial/transition` 에 `prefersReduced` 분기 없음**

```tsx
// 현재: prefersReduced 분기 없음
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.6, delay: 0.3 }}
```
opacity만 변경하므로 WCAG 2.3.3(모션 억제) 위반 수준은 아니지만, delay 0.3이 잔류하여
reduced motion 사용자에게 의도치 않은 지연을 줄 수 있다. transition에 `prefersReduced ? { duration: 0.01 } : ...` 분기 권고.

---

### 🟢 제안 (선택)

**suggestion: `FloatingNav.tsx:64-66` — `animate={{ y: 0 }}` 고정**

`initial`은 `prefersReduced`로 분기되지만 `animate`의 `y: 0`은 두 경우 모두 동일하게 유지.
`prefersReduced` 시 `initial={{ opacity: 0 }}`으로 y를 생략하므로 framer-motion이 y 초기값을 0으로 처리하여 실질적으로 문제없음.
단, 명시적으로 `animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}`으로 통일하면 의도가 더 명확해짐.

**nit: `WorkSection.tsx:18-20` — `cardBase` 상수를 파일 상단으로 이동 권고**

현재 함수 본문 내에 선언되어 있어 매 렌더마다 문자열이 재생성됨. 모듈 스코프 상수로 이동하면 불필요한 재할당을 제거.

**nit: `Footer.tsx:22-28` — href 배열과 label 배열 병렬 관리**

`(['#work', ...] as const).map((href, i) => (['WORK', ...] as const)[i])` 패턴은 인덱스 의존으로 순서 변경 시 버그 위험.
`{ href, label }` 객체 배열 하나로 통합 권고 (FloatingNav의 `navLinks` 패턴 참고).

**nit: `globals.css:47-50` — `cursor: none !important` 전체 적용**

`hover: hover` 미디어 쿼리로 터치 기기 제외는 올바름. 단, `*` 선택자에 `cursor: none !important` 적용은
서드파티 UI 라이브러리(예: shadcn Tooltip, Dialog)의 커서 스타일을 완전히 덮어쓰므로
접근성 보조 장치 사용자(스위치 접근성, 트래킹 커서 소프트웨어)에게 예상치 못한 동작이 발생할 수 있음.
선택자 범위를 `html, body`로 제한하고 나머지는 커스텀 컴포넌트에서 관리하는 방식 검토 권고.

---

### 총평

LazyMotion `m.*` 패턴, bento 12-col 그리드, 화이트 섹션 색상 전환, HeroSection 배지, CSS 변수, TypeScript 무오류 등 핵심 요구사항은 모두 충족됐다. WorkSection의 `initial/whileInView` 에 `prefersReduced` 분기가 누락된 것이 글로벌 rule(`prefers-reduced-motion` 준수)과 동일 컴포넌트 내 `whileHover` 분기 패턴에 비해 일관성이 깨져 있어 수정을 요청한다. 나머지 제안 사항은 코드 품질 개선이며 머지 블로커는 아니다.
