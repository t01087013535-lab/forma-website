# FORMA by Taedong — Claude Design 실험 프롬프트 3종

> 각 실험은 `claude.ai/design`에서 New project를 만든 뒤, 먼저 `CONTEXT.md`를 **Add context**로 첨부한 상태로 아래 프롬프트를 그대로 붙여넣어 실행합니다.

---

## 실험 1 — 서비스 상세 페이지 "/services"

**목적**: 기존 `ServiceSection.tsx`(홈 섹션)를 독립 페이지로 확장. 컨설팅 패키지 3종(기업 웹, 대시보드 SaaS, 유지보수)을 editorial 레이아웃으로 정리.

### 프롬프트
```
FORMA by Taedong 풀스택 웹 컨설팅 브랜드의 "/services" 상세 페이지를 만들어줘.

요구사항:
- 브랜드: Light Luxury Editorial (paper #f8f6f1 / ink #1a1c19 / gold-brown #675e3f)
- 폰트: Display는 Newsreader, 한국어 본문은 Pretendard, 강조는 Nanum Myeongjo
- 레이아웃: 좌측 sticky 컬럼 레이블(01/02/03) + 우측 스크롤 본문
- 3개 컨설팅 패키지를 수직 스크롤 섹션으로 차례대로 노출
  1) 기업 웹 리뉴얼 — 풀스택 Next.js + Supabase
  2) 대시보드 SaaS 구축 — 멀티 테넌트, 실시간 대시보드
  3) 유지보수·SRE — 월간 릴리즈·모니터링 계약
- 각 섹션에 기간/산출물/가격대 metadata 테이블 포함 (가격은 "문의"로 표기)
- CTA는 "상담 요청" 버튼 1개 — 기존 ContactModal 트리거 스타일 유지 (ink 배경 + paper 텍스트, 살짝 magnetic)
- 접근성: h1→h2→h3 순서, focus-visible 아웃라인, prefers-reduced-motion 대응
- Tailwind v4 유틸리티만 사용. 새 색상 토큰 만들지 말고 globals.css에 있는 @theme 변수만 사용.
- Three.js 사용 금지 (이 페이지는 타이포·여백 중심)

Export: Next.js 16 App Router용 `app/services/page.tsx` + 필요시 `components/sections/service/*` 분리.
```

### 검증 포인트
- [ ] h1이 `var(--text-h1)` clamp 스케일 맞음
- [ ] paper/ink 외 새 색상 없음
- [ ] Lenis 스크롤과 충돌하는 sticky 오버라이드 없음
- [ ] 기존 `MagneticButton` 재사용 혹은 동일한 시그니처 제공

---

## 실험 2 — 블로그/인사이트 허브 "/insights"

**목적**: 태동팀이 발행하는 기술 인사이트·케이스 스터디를 editorial 매거진처럼 노출. SEO + 영문·한국어 양방향 아티클 대응.

### 프롬프트
```
FORMA by Taedong의 인사이트 아카이브 페이지 "/insights"를 디자인해줘.

요구사항:
- 브랜드 일관성: paper/ink/gold-brown 팔레트, Newsreader(영문) + Pretendard(한국어)
- Hero: 큰 editorial 타이포 한 줄 "Notes on building the web, from error to form." 
  + 아래 서브헤드에 한국어 번역 "오류에서 설계로 — 태동의 작업 노트."
  + 그레인 오버레이는 이미 globals.css에 있으니 추가하지 말 것
- 아티클 그리드: 3열 × n행, 카드 없이 순수 타이포+얇은 디바이더(border-t rgba(26,28,25,0.08)) 구분
  - 각 아이템: 카테고리 태그(대문자 소형), 제목(h3, serif), 60자 리드, 날짜·저자
- 카테고리 필터 바: "전체 / 엔지니어링 / 케이스 스터디 / 팀 노트 / AI 에이전트" — 좌측 정렬, 선택 시 밑줄만
- 페이지네이션: Load more 버튼 1개 (MagneticButton 재사용)
- 최근 아티클 9개 목업 데이터로 채우고, 한국어/영문이 섞인 제목을 3:3:3 정도로 혼용
- 접근성: nav landmark, aria-current="page" 필터, reduced motion
- Tailwind v4 only. Next.js 16 App Router.

Export: `app/insights/page.tsx` + `components/insights/InsightGrid.tsx`, `InsightCard.tsx`, `CategoryFilter.tsx`
```

### 검증 포인트
- [ ] 카드 shadow/radius 남발 없음 — 얇은 디바이더만
- [ ] 한국어 제목 Pretendard + 영문 제목 Newsreader 자동 적용 (lang 분기)
- [ ] Load more 클릭 시 framer-motion stagger가 reduced motion에서 off

---

## 실험 3 — "/work/[slug]" 케이스 스터디 템플릿

**목적**: 기존 `WorkSection.tsx`(홈 섹션의 프로젝트 나열)를 상세 케이스 스터디 템플릿으로 확장. 클라이언트 1건당 하나의 긴 스크롤 페이지.

### 프롬프트
```
FORMA by Taedong의 클라이언트 프로젝트 케이스 스터디 상세 페이지 템플릿 "/work/[slug]"을 만들어줘.

요구사항:
- 상단 Hero: 클라이언트 로고 → 프로젝트 타이틀(Newsreader h1) → 한 줄 요약(Pretendard) → 메타(기간·역할·스택 태그)
- 섹션 순서:
  1) Challenge (문제 정의)
  2) Approach (접근)
  3) Outcome (지표·결과) — 숫자 카드 3개 (editorial, 카드 아닌 얇은 디바이더)
  4) Gallery — 이미지 6장 2열, 그레인 오버레이 호환 (이미지 opacity는 기본값)
  5) Handoff & Stack — 기술 스택 태그 클라우드
  6) Next / Prev 프로젝트 탐색 바
- 브랜드 팔레트 유지, 새로운 색 금지
- 이미지 비율은 4:5 / 16:9 혼합
- CTA: "비슷한 프로젝트를 의뢰하시려면" → ContactModal 트리거
- SEO: `generateMetadata` 패턴으로 title/description/og:image 동적 생성
- Tailwind v4, Next.js 16 App Router. 목업 데이터 1건 (클라이언트: "성벽" 건축 설계 프로젝트, 3D 렌더 6장) 포함.

Export: `app/work/[slug]/page.tsx` + `app/work/[slug]/opengraph-image.tsx` + `components/sections/work/*`.
```

### 검증 포인트
- [ ] `generateMetadata` 정상 동작 (Next.js 16 기준)
- [ ] Gallery 이미지 `next/image` 사용, `priority={false}` 기본
- [ ] Outcome 숫자 카드 애니메이션이 reduced motion에서 즉시 최종값 표시
- [ ] Next/Prev 바가 focus-visible로 탭 이동 가능

---

## 공통 주의

1. Claude Design 산출물은 **항상 staging 폴더**(`experiments/claude-design/<실험명>/`)에 먼저 export. 직접 `app/**` 덮어쓰기 금지.
2. export 후 `npm run lint && npm run build` 로컬 검증. 실패 시 CONTEXT.md 문서 보강 후 재생성.
3. "use client" 지시어가 생성 결과에 누락되면 CustomCursor·framer-motion 등과 충돌하므로 확인.
4. Three.js·GSAP이 생성 결과에 포함되면 이미 전역 초기화된 레이어와 이중 초기화되지 않는지 점검.
