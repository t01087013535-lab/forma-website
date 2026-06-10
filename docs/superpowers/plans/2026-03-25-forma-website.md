# FORMA Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** FORMA by Taedong 마케팅 웹사이트 — 풀스택 웹 컨설팅 소개 5섹션 싱글페이지 사이트를 Vercel에 배포한다.

**Architecture:** Next.js 16 App Router 기반 순수 정적 마케팅 사이트. 서버 사이드 데이터 없음 — 포트폴리오 데이터는 `lib/portfolio-data.ts` 정적 파일. Framer Motion LazyMotion + Lenis로 Webflow급 스크롤 인터랙션 구현. Stitch MCP로 섹션 UI 초안 생성, Paper MCP로 스타일 조정, Antigravity MCP로 브라우저 검증.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion 11, Lenis, Pretendard + Playfair Display, lucide-react, Vercel

---

## 파일 맵 (생성할 전체 파일)

```
forma-website/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃: 폰트, Lenis, LazyMotion, CustomCursor
│   ├── page.tsx                    # 홈: 섹션 조합
│   └── globals.css                 # CSS 변수 토큰 + 리셋
├── components/
│   ├── nav/FloatingNav.tsx         # 글래스모피즘 고정 네비
│   ├── sections/
│   │   ├── HeroSection.tsx         # 히어로: 3D 오브젝트, 스트로크 타이포, 스탯
│   │   ├── WorkSection.tsx         # 포트폴리오: 5카드 그리드/스크롤
│   │   ├── StorySection.tsx        # 서사: 5단계 타임라인
│   │   ├── ServiceSection.tsx      # 서비스: 3 글래스 카드
│   │   └── ContactSection.tsx      # 문의: 다크, 마그네틱 CTA
│   ├── ui/
│   │   ├── GlassCard.tsx           # 글래스모피즘 래퍼
│   │   ├── MagneticButton.tsx      # 마그네틱 효과 버튼
│   │   ├── TiltCard.tsx            # 마우스 포지션 3D tilt 래퍼
│   │   ├── TextReveal.tsx          # 스크롤 트리거 줄 단위 reveal
│   │   └── CustomCursor.tsx        # 커스텀 커서 (클라이언트)
│   └── layout/Footer.tsx           # 다크 푸터
├── lib/
│   ├── animations.ts               # Framer Motion variants + motionConfig
│   └── portfolio-data.ts           # PortfolioItem[] 정적 데이터
└── public/images/portfolio/
    └── sungbyuk.jpg                # 성벽건설 스크린샷 (Task 1에서 캡처)
```

---

## Task 0: 프로젝트 스캐폴딩

**Files:**

- Create: `forma-website/` (프로젝트 루트)
- Create: `forma-website/package.json` 등 (Next.js init)

- [ ] **Step 1: Next.js 프로젝트 생성**

```bash
cd /Users/min
npx create-next-app@latest forma-website \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
cd forma-website
```

- [ ] **Step 2: 추가 의존성 설치**

```bash
npm install framer-motion@11 lenis lucide-react
npm install --save-dev @types/node
```

- [ ] **Step 3: 폰트 패키지 설치**

```bash
npm install @next/font
```

- [ ] **Step 4: .gitignore 확인 + Git 초기화**

```bash
git init
git add .
git commit -m "chore: initial Next.js 16 scaffold

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

- [ ] **Step 5: TypeScript 컴파일 확인**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

---

## Task 1: 포트폴리오 썸네일 캡처

**Files:**

- Create: `public/images/portfolio/sungbyuk.jpg`

- [ ] **Step 1: Antigravity MCP로 성벽건설 사이트 스크린샷 캡처**

Antigravity MCP (`mcp__antigravity__*`) 사용:

- URL: `https://sungbyuk.vercel.app`
- 뷰포트: 1280×800
- 저장: `public/images/portfolio/sungbyuk.jpg`

Antigravity MCP 미사용 시 대안:

```bash
mkdir -p public/images/portfolio
# Chrome DevTools로 https://sungbyuk.vercel.app 캡처 후 수동 저장
# OR: 플레이스홀더로 크림 그라디언트 배경 사용 (WorkSection에서 자동 처리)
```

- [ ] **Step 2: 이미지 확인**

```bash
ls -la public/images/portfolio/
```

Expected: `sungbyuk.jpg` 존재

---

## Task 2: 디자인 토큰 + 글로벌 스타일

**Files:**

- Modify: `app/globals.css`

- [ ] **Step 1: globals.css 교체**

`app/globals.css` 전체를 아래로 교체:

```css
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Inter:wght@400;500&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #f7f5f2;
  --color-surface: #ffffff;
  --color-ink: #0d0d0d;
  --color-ink-muted: #6b6b6b;
  --color-gold: #c0a96a;
  --color-gold-dim: rgba(192, 169, 106, 0.15);
  --color-glass: rgba(255, 255, 255, 0.55);
  --color-border: rgba(0, 0, 0, 0.07);
  --color-dark-bg: #0d0d0d;

  --font-korean: "Pretendard", "Apple SD Gothic Neo", sans-serif;
  --font-display: "Playfair Display", Georgia, serif;
  --font-sans: -apple-system, "Helvetica Neue", sans-serif;
  --font-mono: "SF Mono", "Fira Code", monospace;

  --text-display: clamp(56px, 9vw, 112px);
  --text-h1: clamp(36px, 5.5vw, 64px);
  --text-h2: clamp(26px, 3.5vw, 44px);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  cursor: none;
} /* 커스텀 커서 — CustomCursor 컴포넌트에서 관리 */

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-korean);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* 커스텀 커서 숨김 (모바일 제외) */
@media (hover: hover) {
  * {
    cursor: none !important;
  }
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: TypeScript 확인**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 3: 커밋**

```bash
git add app/globals.css
git commit -m "feat: design tokens and global styles

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 3: 애니메이션 유틸 + 포트폴리오 데이터

**Files:**

- Create: `lib/animations.ts`
- Create: `lib/portfolio-data.ts`

- [ ] **Step 1: `lib/animations.ts` 작성**

```typescript
// lib/animations.ts
export const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const duration = prefersReducedMotion ? 0 : 0.6;
const durationFast = prefersReducedMotion ? 0 : 0.35;

export const fadeUp = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = (staggerChildren = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren: 0.1 } },
});

export const textRevealVariant = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
};

export const viewportConfig = { once: true, margin: "-80px" };
```

- [ ] **Step 2: `lib/portfolio-data.ts` 작성**

```typescript
// lib/portfolio-data.ts
export type PortfolioItem = {
  index: string;
  name: string;
  nameEn?: string;
  url?: string;
  tags: string[];
  thumbnail?: string;
  isLive: boolean;
};

export const portfolioItems: PortfolioItem[] = [
  {
    index: "01",
    name: "성벽종합건설",
    nameEn: "Sungbyuk Construction",
    url: "https://sungbyuk.vercel.app",
    tags: ["Next.js 16", "Tailwind v4", "Vercel"],
    thumbnail: "/images/portfolio/sungbyuk.jpg",
    isLive: true,
  },
  { index: "02", name: "Project 02", tags: [], isLive: false },
  { index: "03", name: "Project 03", tags: [], isLive: false },
  { index: "04", name: "Project 04", tags: [], isLive: false },
  { index: "05", name: "Project 05", tags: [], isLive: false },
];
```

- [ ] **Step 3: TypeScript 확인 + 커밋**

```bash
npx tsc --noEmit
git add lib/
git commit -m "feat: animation utils and portfolio data

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 4: UI 프리미티브 컴포넌트

**Files:**

- Create: `components/ui/GlassCard.tsx`
- Create: `components/ui/MagneticButton.tsx`
- Create: `components/ui/TiltCard.tsx`
- Create: `components/ui/TextReveal.tsx`
- Create: `components/ui/CustomCursor.tsx`

- [ ] **Step 1: `GlassCard.tsx`**

```tsx
// components/ui/GlassCard.tsx
"use client";
import { m } from "framer-motion";
import { scaleIn, viewportConfig } from "@/lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GlassCard({
  children,
  className = "",
  animate = true,
}: GlassCardProps) {
  const style: React.CSSProperties = {
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.85)",
    boxShadow:
      "0 4px 30px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
    borderRadius: "16px",
  };
  if (!animate)
    return (
      <div style={style} className={className}>
        {children}
      </div>
    );
  return (
    <m.div
      style={style}
      className={className}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {children}
    </m.div>
  );
}
```

- [ ] **Step 2: `MagneticButton.tsx`**

```tsx
// components/ui/MagneticButton.tsx
"use client";
import { useRef, useState } from "react";
import { m } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPos({ x, y });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const inner = (
    <m.div
      ref={ref}
      className={className}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </m.div>
  );

  if (href) return <a href={href}>{inner}</a>;
  return inner;
}
```

- [ ] **Step 3: `TiltCard.tsx`**

```tsx
// components/ui/TiltCard.tsx
"use client";
import { useRef, useState } from "react";
import { m } from "framer-motion";

export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 ~ 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 8, rotateY: x * 8 });
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 });
  }

  return (
    <m.div
      ref={ref}
      className={className}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </m.div>
  );
}
```

- [ ] **Step 4: `TextReveal.tsx`**

```tsx
// components/ui/TextReveal.tsx
"use client";
import { m } from "framer-motion";
import { textRevealVariant, viewportConfig } from "@/lib/animations";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "span",
}: TextRevealProps) {
  return (
    <span style={{ display: "block", overflow: "hidden" }}>
      <m.span
        className={className}
        style={{ display: "block" }}
        variants={{
          ...textRevealVariant,
          visible: {
            ...textRevealVariant.visible,
            transition: {
              ...(textRevealVariant.visible as { transition: object })
                .transition,
              delay,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {children}
      </m.span>
    </span>
  );
}
```

- [ ] **Step 5: `CustomCursor.tsx`**

```tsx
// components/ui/CustomCursor.tsx
"use client";
import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    function onEnter() {
      setHovered(true);
    }
    function onLeave() {
      setHovered(false);
    }
    window.addEventListener("mousemove", onMove);
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY]);

  return (
    <m.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovered ? 48 : 16,
        height: hovered ? 48 : 16,
        background: hovered ? "rgba(255,255,255,0.9)" : "#0d0d0d",
        borderRadius: "50%",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}
```

- [ ] **Step 6: TypeScript 확인 + 커밋**

```bash
npx tsc --noEmit
git add components/ui/
git commit -m "feat: UI primitives (GlassCard, MagneticButton, TiltCard, TextReveal, CustomCursor)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 5: 루트 레이아웃 (Lenis + LazyMotion + 폰트)

**Files:**

- Modify: `app/layout.tsx`

- [ ] **Step 1: LenisProvider 생성**

`components/layout/LenisProvider.tsx` 생성:

```tsx
// components/layout/LenisProvider.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 2: `app/layout.tsx` 교체**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { LazyMotion, domAnimation } from "framer-motion";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "FORMA by Taedong — 풀스택 웹 컨설팅",
  description:
    "오류에서 설계로, 설계에서 완성으로. 기업과 사업체를 위한 풀스택 웹 컨설팅.",
  openGraph: {
    title: "FORMA by Taedong",
    description: "풀스택 웹 컨설팅 — 기획부터 배포까지",
    siteName: "FORMA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <LazyMotion features={domAnimation}>
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </LazyMotion>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: 빌드 확인**

```bash
npm run build
```

Expected: 빌드 성공, 오류 없음

- [ ] **Step 4: 커밋**

```bash
git add app/layout.tsx components/layout/
git commit -m "feat: root layout with Lenis smooth scroll and LazyMotion

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 6: FloatingNav

**Files:**

- Create: `components/nav/FloatingNav.tsx`

- [ ] **Step 1: Stitch MCP로 초안 생성**

Stitch MCP (`mcp__stitch__*`) 사용:

```
"FloatingNav: FORMA 웹사이트 고정 글래스모피즘 네비게이션.
스타일: 크림 배경(#f7f5f2), pill 형태(border-radius:999px), 글래스모피즘(backdrop-blur:20px, bg:rgba(255,255,255,0.55))
포함 요소: 좌측 'FORMA.' 로고(골드 점), 중앙 Work·Story·Service 링크, 우측 '프로젝트 문의 →' 다크 pill CTA 버튼
동작: 스크롤 20px 이상에서 글래스 활성화 (스크롤 0에서는 투명)
기술: Next.js 16, Tailwind v4, Framer Motion
접근성: WCAG 2.2 AA, 키보드 nav"
```

- [ ] **Step 2: Paper MCP로 스타일 세부 조정**

`mcp__paper__get_screenshot` → 렌더링 확인
`mcp__paper__update_styles` → 필요 시 색상/간격 조정
`mcp__paper__get_jsx` → JSX 추출

- [ ] **Step 3: JSX를 Next.js 컴포넌트로 변환**

`components/nav/FloatingNav.tsx` 작성 (Stitch/Paper 결과 또는 아래 기준):

```tsx
// components/nav/FloatingNav.tsx
"use client";
import { useEffect, useState } from "react";
import { m } from "framer-motion";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#story", label: "Story" },
  { href: "#service", label: "Service" },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <m.header
      className="fixed top-0 left-0 right-0 z-50 px-8 pt-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-6 py-3 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(255,255,255,0.55)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          border: scrolled
            ? "1px solid rgba(255,255,255,0.85)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.06)" : "none",
        }}
        aria-label="주 네비게이션"
      >
        {/* 로고 */}
        <a
          href="#"
          className="text-[11px] font-bold tracking-[4px] text-[#0d0d0d]"
        >
          FORMA<span style={{ color: "var(--color-gold)" }}>.</span>
        </a>

        {/* 링크 (sm 숨김) */}
        <ul className="hidden gap-7 md:flex" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-[11px] font-medium tracking-[2px] text-[#6b6b6b] transition-colors hover:text-[#0d0d0d]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="rounded-full bg-[#0d0d0d] px-5 py-2.5 text-[10px] font-bold tracking-[2px] text-white transition-opacity hover:opacity-75"
        >
          프로젝트 문의 →
        </a>
      </nav>
    </m.header>
  );
}
```

- [ ] **Step 4: Antigravity로 브라우저 검증**

Antigravity MCP로 `http://localhost:3000` 열기 → 스크롤 동작 확인

- [ ] **Step 5: TypeScript 확인 + 커밋**

```bash
npx tsc --noEmit
git add components/nav/
git commit -m "feat: FloatingNav with glassmorphism scroll effect

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 7: HeroSection

**Files:**

- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Stitch MCP로 히어로 초안 생성**

```
"HeroSection: FORMA 풀스택 웹 컨설팅 히어로.
스타일: 크림 배경(#f7f5f2), 골드 포인트(#c0a96a), 다크 잉크(#0d0d0d), min-height:100vh
포함:
  - 키커 레이블: 'FULL-STACK WEB CONSULTING' (모노, letter-spacing:4px)
  - 대형 헤드라인 3줄: '오류에서'(solid), '설계로'(-webkit-text-stroke outline), '완성으로'(골드)
  - 서브카피: '수백 번의 실패가 쌓여 하나의 기술이 됐습니다.'
  - CSS 3D 기하학 오브젝트 3개 (rounded square, sphere, small square) 우측 배경 장식
  - 글래스모피즘 스탯 카드 3개: 5+ Projects, 100% Vercel, Error→Skill
  - CTA 버튼 2개: outline + fill
기술: Next.js 16, Tailwind v4, Framer Motion, Pretendard
접근성: WCAG 2.2 AA"
```

- [ ] **Step 2: Paper MCP로 스타일 조정**

`get_screenshot` → 확인
`update_styles` → 헤드라인 크기, 골드 색상, 3D 오브젝트 위치 조정
`get_jsx` → 추출

- [ ] **Step 3: `HeroSection.tsx` 작성 (Stitch 결과 반영)**

```tsx
// components/sections/HeroSection.tsx
"use client";
import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { TextReveal } from "@/components/ui/TextReveal";

const stats = [
  { value: "5+", label: "PROJECTS" },
  { value: "100%", label: "VERCEL DEPLOY" },
  { value: "0→∞", label: "ERROR TO SKILL" },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 패럴랙스 각도 (오브젝트별 속도 다르게)
  const geo1Y = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const geo2Y = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const geo3Y = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen overflow-hidden pt-40 pb-24"
      style={{ background: "var(--color-bg)" }}
      aria-label="히어로"
    >
      {/* 3D 기하학 오브젝트 */}
      <m.div
        className="pointer-events-none absolute -top-16 -right-16"
        style={{ y: geo1Y, willChange: "transform" }}
      >
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: 40,
            transform:
              "rotate(18deg) perspective(800px) rotateX(18deg) rotateY(-18deg)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(235,230,220,0.4))",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.06)",
          }}
        />
      </m.div>

      <m.div
        className="pointer-events-none absolute -bottom-20 -left-16"
        style={{ y: geo2Y, willChange: "transform" }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            transform: "perspective(600px) rotateX(25deg) rotateY(10deg)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(230,225,215,0.2))",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        />
      </m.div>

      <m.div
        className="pointer-events-none absolute"
        style={{ top: 220, right: 160, y: geo3Y, willChange: "transform" }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 14,
            transform:
              "rotate(12deg) perspective(400px) rotateX(20deg) rotateY(-10deg)",
            background: "rgba(192,169,106,0.08)",
            border: "1px solid rgba(192,169,106,0.3)",
            boxShadow: "0 8px 24px rgba(192,169,106,0.15)",
          }}
        />
      </m.div>

      {/* 콘텐츠 */}
      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-16">
        {/* 키커 */}
        <m.div
          className="mb-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-gold)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 4,
              color: "#888",
              fontWeight: 600,
            }}
          >
            FULL-STACK WEB CONSULTING
          </span>
        </m.div>

        {/* 헤드라인 */}
        <h1
          className="mb-8"
          style={{
            fontSize: "var(--text-display)",
            lineHeight: 0.92,
            fontWeight: 900,
            letterSpacing: "-0.04em",
          }}
        >
          <TextReveal delay={0.1}>오류에서</TextReveal>
          <TextReveal delay={0.2}>
            <span
              style={{ WebkitTextStroke: "2px #0d0d0d", color: "transparent" }}
            >
              설계로
            </span>
          </TextReveal>
          <TextReveal delay={0.3}>
            <span style={{ color: "var(--color-gold)" }}>완성으로</span>
          </TextReveal>
        </h1>

        {/* 서브카피 */}
        <m.p
          className="mb-12 max-w-[440px] text-[16px] leading-[1.7]"
          style={{ color: "var(--color-ink-muted)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          수백 번의 실패가 쌓여 하나의 기술이 됐습니다.
          <br />그 기술로 당신의 비즈니스를 웹에 새겨드립니다.
        </m.p>

        {/* 스탯 카드 */}
        <m.div
          className="mb-14 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {stats.map(({ value, label }) => (
            <GlassCard key={label} animate={false} className="px-5 py-3.5">
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  color: "var(--color-ink)",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: 2,
                  color: "#999",
                  marginTop: 2,
                }}
              >
                {label}
              </div>
            </GlassCard>
          ))}
        </m.div>

        {/* CTA */}
        <m.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="#work"
            className="rounded-full border border-[#0d0d0d] px-7 py-3.5 text-[13px] font-semibold tracking-[1px] text-[#0d0d0d] transition-all hover:bg-[#0d0d0d] hover:text-white"
          >
            포트폴리오 보기
          </a>
          <MagneticButton
            href="#contact"
            className="rounded-full bg-[#0d0d0d] px-7 py-3.5 text-[13px] font-semibold tracking-[1px] text-white"
          >
            프로젝트 문의 →
          </MagneticButton>
        </m.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Antigravity로 인터랙션 검증**

Antigravity MCP로 로컬 실행 확인:

- 3D 오브젝트 스크롤 패럴랙스 동작 확인
- 텍스트 리빌 애니메이션 확인
- 마그네틱 버튼 호버 효과 확인

- [ ] **Step 5: 커밋**

```bash
npx tsc --noEmit
git add components/sections/HeroSection.tsx
git commit -m "feat: HeroSection with 3D parallax and text reveal

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 8: WorkSection (포트폴리오)

**Files:**

- Create: `components/sections/WorkSection.tsx`

- [ ] **Step 1: Stitch MCP로 포트폴리오 카드 초안 생성**

```
"WorkSection: FORMA 포트폴리오 섹션.
스타일: 크림 배경, 섹션 카피 '다섯 개의 증명', 5개 카드 그리드
카드 종류:
  - Live 카드: 썸네일 이미지, 골드 'LIVE' 뱃지, 프로젝트명, 기술 태그, 외부 링크 아이콘, 3D tilt 호버
  - Placeholder 카드: 다크 배경(#1a1a1a), 자물쇠 아이콘, '준비 중', 인덱스 번호
기술: Next.js 16, Tailwind v4, next/image"
```

- [ ] **Step 2: `WorkSection.tsx` 작성**

```tsx
// components/sections/WorkSection.tsx
import Image from "next/image";
import { m } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { portfolioItems } from "@/lib/portfolio-data";
import { stagger, fadeUp, viewportConfig } from "@/lib/animations";

export function WorkSection() {
  return (
    <section
      id="work"
      className="py-[clamp(80px,12vw,160px)]"
      style={{ background: "var(--color-bg)" }}
      aria-label="포트폴리오"
    >
      <div className="mx-auto max-w-[1400px] px-8 lg:px-16">
        {/* 헤더 */}
        <div className="mb-16">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 4,
              color: "#888",
              marginBottom: 16,
            }}
          >
            WORK
          </p>
          <h2
            style={{
              fontSize: "var(--text-h1)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            <TextReveal>Vercel 위에 새긴</TextReveal>
            <TextReveal delay={0.1}>
              <span
                style={{
                  WebkitTextStroke: "1.5px #0d0d0d",
                  color: "transparent",
                }}
              >
                다섯 개의 증명
              </span>
            </TextReveal>
          </h2>
        </div>

        {/* 카드 그리드 */}
        <m.ul
          className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 overflow-x-auto pb-4 lg:overflow-visible"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          role="list"
        >
          {portfolioItems.map((item) => (
            <m.li key={item.index} variants={fadeUp} role="listitem">
              {item.isLive ? (
                <TiltCard className="group relative overflow-hidden rounded-2xl bg-white border border-[rgba(0,0,0,0.07)] transition-all duration-300 hover:border-[var(--color-gold)] hover:shadow-xl">
                  {/* 썸네일 */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg)]">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 33vw, 20vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #f7f5f2, #ede9e3)",
                        }}
                      />
                    )}
                    {/* LIVE 뱃지 */}
                    <span
                      className="absolute top-3 left-3 rounded-full border border-[rgba(192,169,106,0.4)] bg-[rgba(192,169,106,0.1)] px-3 py-1 text-[9px] font-bold tracking-[2px]"
                      style={{ color: "var(--color-gold)" }}
                    >
                      LIVE
                    </span>
                  </div>
                  {/* 정보 */}
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <span
                        className="text-[11px] font-bold tracking-[1px]"
                        style={{ color: "var(--color-ink)" }}
                      >
                        {item.name}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.name} 사이트 방문`}
                      >
                        <ExternalLink
                          size={14}
                          style={{ color: "var(--color-ink-muted)" }}
                          className="transition-colors hover:text-[var(--color-ink)]"
                        />
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[var(--color-bg)] px-2.5 py-0.5 text-[9px] font-semibold tracking-[1px]"
                          style={{ color: "var(--color-ink-muted)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-[#2a2a2a] bg-[#141414]">
                  <Lock
                    size={20}
                    style={{ color: "#333", marginBottom: 12 }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: 3,
                      color: "#333",
                    }}
                  >
                    {item.index}
                  </span>
                  <span style={{ fontSize: 11, color: "#444", marginTop: 4 }}>
                    준비 중
                  </span>
                </div>
              )}
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Antigravity로 카드 tilt + 호버 검증**

- [ ] **Step 4: 커밋**

```bash
npx tsc --noEmit
git add components/sections/WorkSection.tsx
git commit -m "feat: WorkSection with portfolio cards and tilt interaction

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 9: StorySection (서사)

**Files:**

- Create: `components/sections/StorySection.tsx`

- [ ] **Step 1: Stitch MCP로 타임라인 초안**

```
"StorySection: FORMA 태동 서사 섹션.
스타일: 크림 어두운 배경(#ede9e3), 헤드라인 '모든 오류가 우리의 교과서였다'
포함: 5단계 가로 타임라인 (첫프로젝트→오류기록→패턴발견→스킬화→FORMA), 각 스텝 아이콘+제목+설명, 화살표 연결
기술: Next.js 16, Tailwind v4, Framer Motion stagger 애니메이션"
```

- [ ] **Step 2: `StorySection.tsx` 작성**

```tsx
// components/sections/StorySection.tsx
import { m } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { stagger, fadeUp, viewportConfig } from "@/lib/animations";

const steps = [
  { icon: "🔥", title: "첫 프로젝트", desc: "무수한 오류와\n마주침" },
  { icon: "📋", title: "오류 기록", desc: "실패를 체계적으로\n정리" },
  { icon: "⚙️", title: "패턴 발견", desc: "반복 문제 →\n해결 공식화" },
  { icon: "🧰", title: "스킬화", desc: "해결책을\n재사용 도구로" },
  { icon: "✦", title: "FORMA", desc: "완전한 개발\n플랫폼 완성", isLast: true },
];

export function StorySection() {
  return (
    <section
      id="story"
      className="py-[clamp(80px,12vw,160px)]"
      style={{ background: "#ede9e3" }}
      aria-label="우리의 서사"
    >
      <div className="mx-auto max-w-[1400px] px-8 lg:px-16">
        {/* 헤더 */}
        <div className="mb-20">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 4,
              color: "#888",
              marginBottom: 16,
            }}
          >
            STORY
          </p>
          <h2
            style={{
              fontSize: "var(--text-h1)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            <TextReveal>모든 오류가</TextReveal>
            <TextReveal delay={0.1}>우리의 교과서였다</TextReveal>
          </h2>
          <m.p
            className="mt-6 max-w-[480px] text-[16px] leading-[1.7]"
            style={{ color: "var(--color-ink-muted)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            프로젝트마다 쌓아온 수백 번의 실패를 기록하고 체계화했습니다. 그
            과정이 쌓여 하나의 완성된 개발 플랫폼이 됐습니다.
          </m.p>
        </div>

        {/* 타임라인 */}
        <m.ol
          className="flex flex-col gap-6 lg:flex-row lg:gap-0"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          role="list"
        >
          {steps.map((step, i) => (
            <m.li
              key={step.title}
              className="relative flex flex-1 flex-col"
              variants={fadeUp}
              role="listitem"
            >
              {/* 연결선 (lg에서만) */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-10 left-[calc(50%+28px)] right-0 hidden h-px lg:block"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.12), transparent)",
                  }}
                />
              )}
              <div className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white/60 p-6 mx-0 lg:mx-3 backdrop-blur-sm">
                <div className="mb-4 text-3xl" aria-hidden="true">
                  {step.icon}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: 3,
                    color: "#999",
                    marginBottom: 6,
                  }}
                >
                  0{i + 1}
                </p>
                <h3
                  className="mb-2 text-[15px] font-bold"
                  style={{
                    color: step.isLast
                      ? "var(--color-gold)"
                      : "var(--color-ink)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="whitespace-pre-line text-[13px] leading-[1.6]"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  {step.desc}
                </p>
              </div>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
npx tsc --noEmit
git add components/sections/StorySection.tsx
git commit -m "feat: StorySection with staggered timeline animation

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 10: ServiceSection

**Files:**

- Create: `components/sections/ServiceSection.tsx`

- [ ] **Step 1: Stitch MCP로 서비스 카드 초안**

```
"ServiceSection: FORMA 서비스 소개 섹션.
스타일: 크림 배경, 헤드라인 '웹의 처음부터 끝까지 하나의 팀이 책임집니다'
포함: 3개 글래스모피즘 서비스 카드(기획/개발/배포), lucide 아이콘, 하단 기술 스택 태그 행
기술: Next.js 16, Tailwind v4, lucide-react, Framer Motion"
```

- [ ] **Step 2: `ServiceSection.tsx` 작성**

```tsx
// components/sections/ServiceSection.tsx
import { m } from "framer-motion";
import { Pencil, Code2, Rocket } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { stagger, viewportConfig } from "@/lib/animations";

const services = [
  {
    icon: Pencil,
    title: "기획·디자인",
    desc: "사용자 경험 설계와 브랜드 정체성을 함께 만듭니다. 전략부터 UI까지 일관된 비전으로.",
  },
  {
    icon: Code2,
    title: "풀스택 개발",
    desc: "Next.js · FastAPI · Supabase — 처음부터 끝까지 직접 구축합니다. 추가 비용 없이.",
  },
  {
    icon: Rocket,
    title: "배포·운영 컨설팅",
    desc: "Vercel 배포, 성능 최적화, 지속적인 개선. 런칭 이후에도 함께합니다.",
  },
];

const techTags = [
  "Next.js",
  "React 19",
  "Tailwind v4",
  "TypeScript",
  "Supabase",
  "FastAPI",
  "Vercel",
];

export function ServiceSection() {
  return (
    <section
      id="service"
      className="py-[clamp(80px,12vw,160px)]"
      style={{ background: "var(--color-bg)" }}
      aria-label="서비스"
    >
      <div className="mx-auto max-w-[1400px] px-8 lg:px-16">
        <div className="mb-16">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 4,
              color: "#888",
              marginBottom: 16,
            }}
          >
            SERVICE
          </p>
          <h2
            style={{
              fontSize: "var(--text-h1)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            <TextReveal>웹의 처음부터 끝까지,</TextReveal>
            <TextReveal delay={0.1}>
              <span
                style={{
                  WebkitTextStroke: "1.5px #0d0d0d",
                  color: "transparent",
                }}
              >
                하나의 팀이 책임집니다
              </span>
            </TextReveal>
          </h2>
        </div>

        <m.ul
          className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          role="list"
        >
          {services.map(({ icon: Icon, title, desc }) => (
            <li key={title} role="listitem">
              <GlassCard className="flex h-full flex-col p-8">
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-gold-dim)" }}
                >
                  <Icon
                    size={22}
                    style={{ color: "var(--color-gold)" }}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className="mb-3 text-[17px] font-bold"
                  style={{ color: "var(--color-ink)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[14px] leading-[1.7]"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  {desc}
                </p>
              </GlassCard>
            </li>
          ))}
        </m.ul>

        {/* 기술 스택 태그 */}
        <m.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          aria-label="사용 기술 스택"
        >
          {techTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(0,0,0,0.1)] bg-white px-4 py-1.5 text-[11px] font-semibold tracking-[1px]"
              style={{ color: "var(--color-ink-muted)" }}
            >
              {tag}
            </span>
          ))}
        </m.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
npx tsc --noEmit
git add components/sections/ServiceSection.tsx
git commit -m "feat: ServiceSection with glass cards and tech stack tags

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 11: ContactSection + Footer

**Files:**

- Create: `components/sections/ContactSection.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Stitch MCP로 Contact 다크 섹션 초안**

```
"ContactSection: FORMA 문의 섹션.
스타일: 순수 다크 배경(#0d0d0d), 화이트 대형 타이포그래피, 극적 대비
포함: 대형 Playfair Display italic 헤드라인 '당신의 비전에 형태를 부여할 준비가 됐습니다',
  마그네틱 CTA 버튼, 배경에 반투명 'FORMA' 스트로크 텍스트, 이메일·카카오 링크
기술: Next.js 16, Tailwind v4, Framer Motion magnetic effect"
```

- [ ] **Step 2: `ContactSection.tsx` 작성**

```tsx
// components/sections/ContactSection.tsx
import { m } from "framer-motion";
import { Mail } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@forma.kr";
const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL ?? "#";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-[clamp(100px,16vw,200px)]"
      style={{ background: "var(--color-dark-bg)" }}
      aria-label="프로젝트 문의"
    >
      {/* 배경 스트로크 텍스트 */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden="true"
        style={{
          fontSize: "clamp(120px, 22vw, 280px)",
          fontWeight: 900,
          letterSpacing: "-0.06em",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          color: "transparent",
          lineHeight: 1,
          fontFamily: "var(--font-sans)",
        }}
      >
        FORMA
      </div>

      <div className="relative mx-auto max-w-[1400px] px-8 lg:px-16">
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: 4,
            color: "#555",
            marginBottom: 24,
          }}
        >
          CONTACT
        </p>

        <h2
          className="mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "var(--text-h1)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#fff",
          }}
        >
          <TextReveal>당신의 비전에</TextReveal>
          <TextReveal delay={0.1}>형태를 부여할</TextReveal>
          <TextReveal delay={0.2}>
            <span style={{ color: "var(--color-gold)" }}>준비가 됐습니다</span>
          </TextReveal>
        </h2>

        <div className="flex flex-wrap items-center gap-6">
          <MagneticButton
            href={`mailto:${email}`}
            className="rounded-full bg-white px-8 py-4 text-[13px] font-bold tracking-[1px] text-[#0d0d0d] transition-opacity hover:opacity-80"
          >
            프로젝트 시작하기 →
          </MagneticButton>

          <a
            href={kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] tracking-[1px]"
            style={{ color: "#555" }}
          >
            <Mail size={16} aria-hidden="true" />
            {email}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `Footer.tsx` 작성**

```tsx
// components/layout/Footer.tsx
export function Footer() {
  return (
    <footer
      className="py-8 text-center"
      style={{
        background: "var(--color-dark-bg)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: 2,
        color: "#333",
      }}
    >
      FORMA by Taedong · © 2026 · All rights reserved
    </footer>
  );
}
```

- [ ] **Step 4: 커밋**

```bash
npx tsc --noEmit
git add components/sections/ContactSection.tsx components/layout/Footer.tsx
git commit -m "feat: ContactSection dark CTA and Footer

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 12: 페이지 조립 + 최종 검증

**Files:**

- Modify: `app/page.tsx`

- [ ] **Step 1: `page.tsx` 조립**

```tsx
// app/page.tsx
import { FloatingNav } from "@/components/nav/FloatingNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { StorySection } from "@/components/sections/StorySection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <FloatingNav />
      <main>
        <HeroSection />
        <WorkSection />
        <StorySection />
        <ServiceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Antigravity로 전체 페이지 종합 검증**

Antigravity MCP로 브라우저 실행:

- 전체 스크롤 플로우 확인 (Hero → Work → Story → Service → Contact)
- 모바일 375px 뷰포트 에뮬레이션
- 네비게이션 링크 앵커 이동
- 커스텀 커서 동작

- [ ] **Step 3: 프로덕션 빌드 + Lighthouse**

```bash
npm run build
npm run start
# 브라우저에서 Lighthouse 실행 → Performance ≥ 90 확인
```

- [ ] **Step 4: 최종 커밋**

```bash
git add app/page.tsx
git commit -m "feat: assemble full page — FORMA website complete

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 13: Vercel 배포

- [ ] **Step 1: GitHub 리포 생성 + 푸시**

```bash
gh repo create taedonggroup/forma-website --public
git remote add origin https://github.com/taedonggroup/forma-website.git
git push -u origin main
```

- [ ] **Step 2: Vercel 프로젝트 연결**

```bash
vercel --cwd /Users/min/forma-website
# 프롬프트: Taedong 팀 선택, forma-website 이름, 기본 설정 확인
```

- [ ] **Step 3: 환경변수 설정**

```bash
vercel env add NEXT_PUBLIC_CONTACT_EMAIL production
# 입력: 실제 이메일 주소

vercel env add NEXT_PUBLIC_KAKAO_URL production
# 입력: 카카오 오픈채팅 URL
```

- [ ] **Step 4: 프로덕션 배포**

```bash
vercel --prod
```

Expected: `https://forma-website.vercel.app` 또는 커스텀 URL 출력

- [ ] **Step 5: 배포 URL 보고**

배포 완료 URL을 사용자에게 보고.
