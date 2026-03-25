## 코드 리뷰 보고서 — FORMA Round 3 (prefers-reduced-motion + CSS variable)
**결과**: APPROVE

---

### 검토 일자
2026-03-25 (최종 재검토: 2026-03-25)

### 검토 대상 (최초)
- `components/ui/TextReveal.tsx` (T1)
- `components/ui/GlassCard.tsx` (T2)
- `components/nav/FloatingNav.tsx` (T3)
- `components/sections/HeroSection.tsx` (T4 + T7)
- `components/ui/MagneticButton.tsx` (T5)
- `app/globals.css` (T6)
- `components/sections/StorySection.tsx` (T8)
- `components/ui/CustomCursor.tsx` (T9)

### 재검토 대상 (Round 3 Follow-up)
- `components/sections/HeroSection.tsx` — BLOCKER-1 수정 확인
- `components/sections/StorySection.tsx` — REQUEST-4 수정 확인

---

### 재검토 체크리스트

| # | 확인 항목 | 결과 |
|---|-----------|------|
| 1 | `HeroSection.tsx:78` — `var(--color-gold-subtle)` 적용 여부 | PASS |
| 2 | `HeroSection.tsx:79` — border에 `/* gold border — no token */` 주석 존재 | PASS |
| 3 | `HeroSection.tsx:80` — boxShadow에 `/* gold shadow — no token */` 주석 존재 | PASS |
| 4 | `StorySection.tsx` — `useReducedMotion` import 존재 | PASS |
| 5 | `StorySection.tsx:53` — `m.ol variants` reduced 분기 (`prefersReduced ? { hidden: {}, visible: {} } : stagger(0.1)`) | PASS |
| 6 | `StorySection.tsx:62` — `m.li variants` reduced 분기 (`prefersReduced ? reducedFadeUp : fadeUp`) | PASS |
| 7 | 빌드 결과 — TypeScript 오류 없음, Static pages 4/4 생성 | PASS |

---

### 이전 블로커/변경 요청 최종 상태

#### BLOCKER-1 — RESOLVED
- `HeroSection.tsx:78` `background: 'var(--color-gold-subtle)'` 적용 확인.
- `HeroSection.tsx:79` border, `HeroSection.tsx:80` boxShadow는 대응 토큰이 없어 하드코딩 유지하되 `/* gold border — no token */`, `/* gold shadow — no token */` 주석으로 의도 명시. 허용 처리.

#### REQUEST-4 — RESOLVED
- `StorySection.tsx:3` `useReducedMotion` import 확인.
- `StorySection.tsx:7` `reducedFadeUp` import 확인.
- `m.ol variants` — `prefersReduced ? { hidden: {}, visible: {} } : stagger(0.1)` 분기로 reduced 시 stagger 무효화 확인.
- `m.li variants` — `prefersReduced ? reducedFadeUp : fadeUp` 분기로 y 이동 제거 및 즉시 opacity 전환 확인.

---

### 이전 변경 요청 (REQUEST-1 ~ REQUEST-3) — 별도 수정 불필요 처리

REQUEST-1 (useReducedMotion null 처리), REQUEST-2 (willChange 분기), REQUEST-3 (GlassCard transition 분기)는 이번 재검토 범위 외. 오케스트레이터 지시에 따라 SUGGESTION 수준으로 격하 처리하며 머지를 블로킹하지 않음.

---

### 제안 (선택, 미해결 잔여 사항)

- nit: `FloatingNav.tsx` `transition={{ duration: 0.01 }}` 패턴 — `duration: 0`이 의미상 더 명확.
- suggestion: `HeroSection.tsx` geo 오브젝트 3개 `willChange: 'transform'` — prefersReduced 시 `willChange: 'auto'` 분기 권고.
- suggestion: `GlassCard.tsx` `transition={{ duration: 0.2 }}` — prefersReduced 시 `duration: 0` 분기 권고.
- suggestion: `CustomCursor.tsx` `background: hovered ? 'rgba(255,255,255,0.9)' : 'var(--color-ink)'` — framer-motion이 CSS variable 색상 보간을 지원하지 않아 색상이 점프 전환됨. 명시적 주석 추가 권고.

---

### 확인된 항목 체크리스트 (최종)

#### useReducedMotion() 분기 적용
- [x] T1: TextReveal.tsx
- [x] T2: GlassCard.tsx
- [x] T3: FloatingNav.tsx
- [x] T4: HeroSection.tsx — 4개 마운트 animate 블록 + geo parallax 분기
- [x] T5: MagneticButton.tsx
- [x] T8: StorySection.tsx — `m.ol variants` / `m.li variants` 분기 적용 (REQUEST-4 해결)

#### CSS variable
- [x] `--color-gold-subtle` — HeroSection.tsx:78 geo3 background 적용 (BLOCKER-1 해결)
- [x] `--color-bg-alt` — StorySection.tsx 배경
- [x] `--color-ink`, `--color-ink-muted`, `--color-ink-subtle`, `--color-border` — 각 컴포넌트 적용

#### 빌드 검증
- [x] TypeScript `tsc --noEmit` Exit Code 0
- [x] `npm run build` 성공 (Turbopack 1361ms), Static pages 4/4 생성

---

### 총평

BLOCKER-1(geo3 CSS variable 치환)과 REQUEST-4(StorySection reduced-motion 분기)가 모두 정확히 수정되었으며 빌드도 통과한다. 잔여 SUGGESTION 항목들은 기능 오류를 유발하지 않으므로 머지 전 수정 불필요로 처리하며, 이 리포지토리는 APPROVE 판정을 받는다.
