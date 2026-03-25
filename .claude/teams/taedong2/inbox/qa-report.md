## QA 보고서 — reduced-motion 접근성 패치 (2차) — 2026-03-25

### 판정: PASS

---

### 검증 항목별 결과

| # | 항목 | 결과 | 상세 |
|---|------|------|------|
| 1 | `npm run build` | PASS | Compiled successfully in 1169ms, 정적 페이지 4/4 생성 완료, 경고 없음 |
| 2 | `npx tsc --noEmit` | PASS | TypeScript 오류 0개 |
| 3 | `useReducedMotion` — TextReveal.tsx | PASS | line 2 import, line 12 호출 확인 |
| 4 | `useReducedMotion` — GlassCard.tsx | PASS | line 2 import, line 12 호출 확인 |
| 5 | `useReducedMotion` — FloatingNav.tsx | PASS | line 3 import, line 12 호출 확인 |
| 6 | `useReducedMotion` — HeroSection.tsx | PASS | line 3 import, line 15 호출 확인 |
| 7 | `useReducedMotion` — StorySection.tsx | PASS | line 3 import, line 25 호출 확인 |
| 8 | `--color-bg-alt` — globals.css | PASS | line 17 정의 확인 (`#ede9e3`) |
| 9 | `--color-ink-subtle` — globals.css | PASS | line 18 정의 확인 (`#777777`) |
| 10 | `--color-gold-subtle` — globals.css | PASS | line 19 정의 확인 (`rgba(192, 169, 106, 0.08)`) |
| 11 | `focus-visible:ring-2` — MagneticButton.tsx (a 분기, line 46) | PASS | `focus-visible:ring-2 focus-visible:ring-[#0d0d0d] focus-visible:ring-offset-2` |
| 12 | `focus-visible:ring-2` — MagneticButton.tsx (div 분기, line 58) | PASS | 동일 클래스 적용 확인 |

총 검증 항목: 12개 / 통과: 12개 / 실패: 0개

---

### 발견된 이슈

없음.

---

### 비고

- 이번 변경은 CSS variable 추가, `useReducedMotion` 분기, 키보드 포커스 링 적용으로 구성된 순수 접근성 패치.
- `useReducedMotion`은 framer-motion 내장 훅으로 별도 유닛 테스트 불필요.
- 신규 비즈니스 로직 없으므로 커버리지 감소 없음.

---

### 권고사항 (P3 — 비필수)

- Playwright E2E에 `page.emulateMedia({ reducedMotion: 'reduce' })` 설정 후 Hero/Story 섹션 스냅샷 테스트 추가 검토.
- BLOCKER 없음. 배포 진행 가능.
