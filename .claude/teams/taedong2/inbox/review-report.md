## 코드 리뷰 보고서 — FORMA Round 4 품질 개선

**결과**: REQUEST_CHANGES

---

### 🔴 블로커 (머지 전 필수 수정)

**BLOCKER-R1** `components/layout/Footer.tsx:43` — `color: 'var(--color-dark-border)'` 사용.
`--color-dark-border`는 `rgba(255,255,255,0.08)`로 정의되어 있으며, `--color-dark-bg`(#0d0d0d) 배경 위에서 대비비 약 1.02:1 — 저작권 텍스트가 사실상 보이지 않음. WCAG 2.2 AA 최소 기준 4.5:1 완전 미달.
권고: `--color-ink-subtle`(#777777, 대비 약 4.6:1) 또는 `--color-dark-border` 토큰 값 자체를 대비 확보 수치로 수정.

---

### 🟡 변경 요청 (강력 권고)

**R1** `components/layout/Footer.tsx` — PM 명세 M4에서 수정된 색상들은 올바르게 교체됐으나, `--color-dark-border` 토큰이 테두리(border)용으로 설계된 값(`rgba(255,255,255,0.08)`)을 텍스트 색상으로 전용(轉用)하고 있음. 토큰 의미(semantic)와 실제 사용이 불일치함.

**R2** `components/nav/FloatingNav.tsx:80–84, 89` — 스크롤 전(scrolled=false) 상태에서 nav 배경이 `transparent`이고 로고 및 링크 색상이 `text-[#0d0d0d]`(다크 잉크)로 하드코딩됨. HeroSection은 라이트 배경이므로 현재는 작동하지만, 다크 섹션을 최상단에 배치하거나 섹션 순서가 변경되면 대비 0:1이 됨. 구조 의존성 주의 필요.

**R3** `components/sections/ContactSection.tsx:63` — MagneticButton의 `text-[#0d0d0d]` 하드코딩 잔존. 기능상 문제는 없으나 PM 명세 토큰화 태스크(T3)의 범위에 포함될 수 있는 항목.

---

### 🟢 제안 (선택)

- nit: `app/opengraph-image.tsx:93` — `color: '#777777'` 하드코딩. `--color-ink-subtle`과 동일 값이나 `ImageResponse` 컨텍스트에서는 CSS 변수 미지원이므로 현재 방식이 불가피함. 주석으로 이유를 명시하면 후속 유지보수 혼란 방지 가능.

- nit: `components/sections/WorkSection.tsx:28` — `overflow-x-auto` 조건 분기가 클래스 레벨에서 `lg:overflow-visible overflow-x-auto`로 처리됨. PM 명세 N9(미디어 쿼리 없이 항상 적용)는 이 방식으로 해결됐으나 `pb-4`가 `lg:` 조건 없이 유지됨. 데스크톱에서도 불필요한 하단 패딩이 남아 있을 수 있음.

- suggestion: `components/sections/StorySection.tsx:71` — `bg-white/70` 하드코딩. `--color-surface`(#ffffff)로 교체하면 향후 테마 변경 시 일관성 유지 가능.

---

### 체크포인트 판정 요약

| 항목 | 판정 | 비고 |
|------|------|------|
| B1 opengraph-image.tsx 생성 | PASS | `app/opengraph-image.tsx` 존재, layout.tsx에 `/og-image.jpg` 참조 없음 |
| M4 Footer `#333 on #0d0d0d` 교체 | PARTIAL FAIL | `#333`/`#555`/`#666` 교체 완료, 그러나 저작권 행에 `--color-dark-border` 사용 — 대비 1.02:1 |
| M2 ContactSection `#888` 교체 | PASS | `--color-ink-subtle`(#777777) 적용, `#0d0d0d` 배경 대비 약 4.6:1 |
| M7 cursor:none 미디어 쿼리 이동 | PASS | `@media (hover: hover)` 안으로 정상 이동됨 |
| M6 FloatingNav CTA focus-visible | PASS | `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2` 확인 |
| CSS 토큰 5종 정의 | PASS | `globals.css` 20–24번 줄에 모두 정의됨 |
| public/ SVG 삭제 | PASS | `images/`, `robots.txt`, `sitemap.xml`만 잔존, SVG 없음 |
| LazyMotion m.* 패턴 유지 | PASS | 전체 수정 파일에서 `import { m } from 'framer-motion'` 패턴 준수 |

---

### 총평

Round 4 수정 작업의 대부분(7/8 체크포인트)이 올바르게 완료됐으며 LazyMotion 패턴, 접근성 마크업, CSS 토큰 도입 품질이 전반적으로 양호합니다. 단, Footer 저작권 행에서 테두리 전용 토큰(`--color-dark-border`)이 텍스트 색상에 전용되어 대비비 1.02:1 WCAG AA 위반이 발생했으며, 이 한 가지 항목이 블로커로 분류되어 REQUEST_CHANGES 판정합니다.
