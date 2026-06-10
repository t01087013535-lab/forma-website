# FORMA by Taedong — Claude Design Context Package

> 이 문서는 `claude.ai/design`의 **Add context**에 업로드하거나 붙여넣어 Claude Design이
> 태동 마케팅 웹사이트의 디자인 시스템을 그대로 적용한 산출물을 만들게 하기 위한 브리프입니다.

---

## 1. 브랜드 요약

- **브랜드명**: FORMA by Taedong
- **한줄 설명**: 기업과 사업체를 위한 풀스택 웹 컨설팅
- **태그라인**: 오류에서 설계로, 설계에서 완성으로
- **타겟**: 회사·사업체를 운영하며 풀스택 웹 컨설팅이 필요한 의사결정자
- **톤앤매너**: Light Luxury Editorial. Webflow 최상위 에이전시 미학 (Basement Studio, Aristide Benoist, Haus Studio 레벨).

## 2. 시각 시스템

### 색상 토큰 (출처: `app/globals.css`)

```
--color-ink:          #1a1c19   /* Primary foreground / dark */
--color-paper:        #f8f6f1   /* Primary background */
--color-paper-alt:    #f0ede7   /* Alt background */
--color-accent:       #675e3f   /* Gold-brown accent */
--color-secondary:    #675e3f
--color-muted:        #888888
--color-surface-low:  #ece9e3
--color-surface-high: #f8f6f1
--color-dark-bg:      #1a1c19   /* Contact section 전환부 */
--color-dark-text:    #f0f0eb
```

밝은 종이톤(paper)을 기본으로, gold-brown(#675e3f) 강조, contact section만 다크 톤 전환.

### 타이포그래피 스택

| 용도 | 폰트 | 비고 |
|------|------|------|
| Display/영문 | Newsreader → Cormorant Garamond → Playfair Display | 세리프, editorial monument |
| Sans(영문) | Inter | 300–600 |
| 한국어 본문 | Pretendard | Apple SD Gothic Neo fallback |
| 한국어 세리프 | Nanum Myeongjo / Noto Serif KR | 강조·헤드라인 |
| Mono | SF Mono, Fira Code |  |

유동 타이포 스케일 (`globals.css`):
- display: `clamp(56px, 9vw, 128px)`
- h1: `clamp(40px, 6vw, 80px)`
- h2: `clamp(28px, 4vw, 52px)`

### 모션/인터랙션 시그니처

- **Grain overlay** (`.grain-overlay`) — 전체 화면 4% opacity 필름 노이즈
- **Custom cursor** — body `cursor: none` + 커스텀 커서 컴포넌트
- **Lenis** 스무스 스크롤
- **Framer Motion** + **GSAP** 병행
- **Three.js** 히어로 제너러티브 캔버스
- `.clip-reveal` — 좌→우 클립패스 공개
- `.marquee-track` — 28s 무한 배너
- `.text-glow`, `.text-glow-gold` — 텍스트 글로우

### 기술 스택

- **Next.js 16 App Router** (Turbopack)
- **React 19**
- **Tailwind CSS v4** (PostCSS, `@theme` 토큰)
- **TypeScript 5**
- **Framer Motion 11**, **GSAP 3.14**, **Lenis 1.3**, **Three.js 0.183**
- 배포: Vercel (`forma-website-two.vercel.app`)

### 현재 페이지 구조 (`app/page.tsx`)

```
FloatingNav / ScrollProgress / SectionNav / ContactModal
↓
<main>
  ScrollReveal(subtle)  > HeroSection      (Three.js 히어로)
  ScrollReveal(medium)  > OriginSection    (태동 여정·오류→설계)
  ScrollReveal(medium)  > WorkSection      (작업물)
  ScrollReveal(medium)  > ValuesSection    (가치)
  ScrollReveal(medium)  > StorySection     (스토리)
  ScrollReveal(medium)  > ServiceSection   (서비스 상세)
  ScrollReveal(medium)  > ContactSection   (다크 전환 + 모달)
  Footer
</main>
```

## 3. 재사용 가능한 UI 컴포넌트 (`components/ui/`)

`GlassCard`, `MagneticButton`, `TiltCard`, `TextReveal`, `TaedongLogo`, `GenerativeCanvas`,
`CustomCursor`, `VideoBackground`, `ScrollProgress`, `SectionNav`, `ContactModal`, `LoadingOverlay`.

## 4. Claude Design에 바라는 원칙

1. **Tailwind v4 유틸리티**로 결과 출력 — `@theme` 토큰 이름 그대로 사용
2. **한국어 · 영문 혼용 타이포** — 영문 Newsreader, 한국어 Pretendard
3. **Editorial 여백** — 섹션 상하 padding 넉넉히, 좌측 컬럼 레이블 + 우측 본문 그리드
4. **모션은 subtle** — 화려한 3D 남발 금지, 이미 Three.js 히어로가 있으므로 신규 섹션은 타이포·클립리빌 중심
5. **컨트라스트 유지** — paper(#f8f6f1) / ink(#1a1c19) 대비 4.5:1 이상
6. **포커스 링** — `:focus-visible { outline: 1.5px solid rgba(26,28,25,0.40); outline-offset: 3px; }` 유지
7. **접근성** — `prefers-reduced-motion`, semantic HTML, 커서 none 시 대체 호버 피드백 필수

## 5. 금기

- 기존 브랜드 외 새 컬러 팔레트 도입 금지 (ink/paper/accent 외 추가 금지)
- 라운드 버튼 radius 과도하게 크게 설정 금지 (editorial 느낌 저하)
- Bootstrap·MUI·Chakra 스타일링 금지 — 순수 Tailwind v4
- 과도한 이모지/글래스모피즘 남발 금지 (Contact 외엔 밝은 편집 디자인)

## 6. Handoff

Claude Design에서 생성 → Claude Code Web으로 export → forma-website 레포의
`app/**` 혹은 `components/sections/**`로 PR 생성. 자세한 절차는 같은 폴더의
`HANDOFF.md` 참고.
