# Taedong Exhibition Landing Final Handoff

이 문서는 `태동 메인 홈페이지 전시형 랜딩` 작업을 다른 AI 에이전트나 디자이너에게 한 번에 넘기기 위한 최종 전달본이다.  
디자인 프롬프트, 코드베이스 구조, 현재 구현 상태, 수정 우선순위, 백엔드 범위를 하나로 합쳐 정리했다.

---

## 1. 프로젝트 목표

태동 메인 홈페이지 전체를 기존 소개형 웹사이트가 아니라 `고대 그리스 전시관` 콘셉트의 몰입형 브랜드 랜딩으로 교체한다.

핵심 목표는 전환보다 `브랜드 인지도 형성`이다.

- 사용자는 페이지를 보고 태동을 일반 제작사가 아니라 `감각과 구조를 함께 다루는 팀`으로 기억해야 한다.
- 스크롤은 단순한 페이지 이동이 아니라 `전시실을 실제로 걸어다니는 감각`이어야 한다.
- 초반은 강한 세계관 몰입, 중반 이후는 태동의 실제 철학과 작업물을 전시물처럼 해석해 연결한다.

---

## 2. Claude용 핵심 프롬프트

아래 프롬프트를 그대로 붙여 넣으면 된다.

```md
태동 메인 홈페이지 전체를 대체하는 몰입형 랜딩 페이지를 디자인한다.

핵심 목표는 전환보다 `브랜드 인지도 형성`이다. 사용자는 페이지를 본 뒤 태동을 단순 제작사가 아니라 `감각과 구조를 함께 다루는 팀`으로 기억해야 한다.

콘셉트는 `고대 그리스 전시관`이다. 사용자는 거대한 석재 문과 빛기둥 사이로 전시관에 입장하고, 아래로 스크롤할수록 다른 전시실로 이동한다. 단순 패럴랙스 페이지가 아니라 실제 전시 공간을 천천히 걸으며 작품과 공간을 만나는 듯한 감각이 필요하다.

구조는 `혼합형`이다.

- 초반 2개 구간은 세계관 몰입형으로 매우 강하게 연출한다.
- 중반부터는 태동의 실제 철학, 서비스, 작업물, 브랜드 메시지를 전시물처럼 해석해 자연스럽게 연결한다.

인터랙션 강도는 `절충형`이다.

- 인트로와 핵심 1~2개 구간만 강한 3D 공간감을 준다.
- 나머지는 성능 안정적인 시네마틱 2.5D 스크롤 기반으로 설계한다.
- 모바일에서는 3D 강도를 줄이되 장면의 상징성과 레이아웃 완성도는 유지한다.

반드시 포함할 장면:

1. 거대한 석재 문과 빛기둥 사이로 전시관에 입장하는 인트로
2. 태동의 철학을 4개의 전시물처럼 보여주는 기원의 홀
3. 태동의 역량을 조각, 석판, 진열대, 빛나는 텍스트 전시처럼 해석한 제작의 방
4. 포트폴리오를 작품 컬렉션처럼 감상하는 사례 갤러리
5. 마지막에 넓은 돔 공간 또는 개방된 회랑에서 브랜드 선언으로 마무리하는 피날레

비주얼 방향:

- 고대 그리스 건축의 기둥, 회랑, 석재, 돔, 청동, 조각상 파편을 현대적으로 재해석
- 역사 재현물이 아니라 럭셔리하고 미래적인 전시 공간처럼 보여야 함
- 색상은 `marble white`, `limestone sand`, `obsidian black`, `oxidized bronze`, `aegean blue`
- 평면적인 흰 배경 금지
- 안개, 빛, 먼지, 그림자, 공간 원근을 적극적으로 사용
- 게임 UI처럼 보이지 않게 하고, 박물관 수준의 고요한 품격 유지

타이포그래피 방향:

- 제목은 조형감 있는 세리프
- 본문은 정제된 현대 산세리프
- 카피는 짧고 선언적이며 브랜드 문장처럼 보여야 한다

콘텐츠 원칙:

- 사용자는 전시를 보듯 태동을 경험해야 한다
- 서비스 설명을 단순 리스트처럼 나열하지 않는다
- CTA는 공격적으로 두지 않고 마지막에만 절제해서 배치한다
- 브랜드 몰입을 깨는 과도한 버튼, 카드 UI, SaaS 대시보드 느낌은 피한다

출력물은 다음을 포함해야 한다:

- 전체 랜딩 페이지 비주얼 시안
- 섹션별 장면 설명
- 스크롤 시 어떤 장면 전환이 일어나는지 설명
- 데스크톱과 모바일에서 각각 어떻게 변형되는지 설명
```

---

## 3. 코드베이스 요약

이 프로젝트는 `Next.js App Router` 기반의 태동 메인 랜딩 코드베이스다.  
현재 홈(`/`)은 기존 FORMA 소개 페이지가 아니라, `고대 그리스 전시관` 콘셉트의 전시형 브랜드 랜딩으로 교체되어 있다.

### 핵심 구조

- 홈 엔트리: `app/page.tsx`
- 메인 랜딩 셸: `components/landing/TaedongLanding.tsx`
- 랜딩 데이터 모델: `lib/taedong-exhibition.ts`
- 홈 전용 스타일 보강: `app/globals.css`

즉, 홈 화면은 `app/page.tsx`에서 `TaedongLanding`을 렌더링하고, 실제 섹션 내용과 순서는 `lib/taedong-exhibition.ts`의 데이터와 `components/landing/*` 컴포넌트들이 담당한다.

### 랜딩 섹션 구성

1. `portal`  
   입장 인트로. 거대한 석재 문, 빛기둥, 어두운 회랑 분위기를 담당한다.  
   파일: `components/landing/TaedongPortalHero.tsx`

2. `origin`  
   태동의 철학을 4개의 전시물처럼 보여주는 기원의 홀.  
   파일: `components/landing/TaedongOriginHall.tsx`

3. `atelier`  
   태동의 역량을 전시품처럼 해석해 보여주는 제작의 방.  
   파일: `components/landing/TaedongAtelierHall.tsx`

4. `gallery`  
   대표 사례를 작품 컬렉션처럼 보여주는 갤러리.  
   파일: `components/landing/TaedongCollectionHall.tsx`

5. `finale`  
   브랜드 선언과 절제된 CTA로 마무리하는 피날레.  
   파일: `components/landing/TaedongFinaleHall.tsx`

### 데이터와 콘텐츠 위치

랜드딩의 텍스트, 섹션 순서, 네비게이션 라벨, 전시물 목록, 역량 패널, 사례 데이터는 모두 `lib/taedong-exhibition.ts`에 모여 있다.

이 파일 안에는 다음이 들어 있다.

- `buildExhibitionRooms()`  
  전체 전시실 순서와 각 방의 메타데이터를 반환한다.

- `buildExhibitionNavigation()`  
  우측/상단 네비게이션에 쓰이는 섹션 앵커 데이터를 만든다.

- `exhibitionPillars`  
  Origin Hall에서 사용하는 4개 철학 전시물 데이터

- `capabilityPanels`  
  Atelier에서 사용하는 역량 카드 데이터

- `collectionWorks`  
  Gallery에서 사용하는 대표 사례 데이터

즉, 디자인 문구나 구조를 바꾸고 싶으면 가장 먼저 이 파일을 보면 된다.

---

## 4. 인터랙션 방식

이 랜딩은 `풀 3D`가 아니라 `절충형 2.5D 전시 랜딩` 구조다.

- 스무스 스크롤: `components/layout/LenisProvider.tsx`
- 스크롤 진행 바: `components/ui/ScrollProgress.tsx`
- 섹션별 장면 전환: 각 `components/landing/*` 안의 `framer-motion`

주요 특징:

- `sticky` 섹션을 활용해 한 화면 안에서 공간이 움직이는 느낌을 준다.
- 강한 3D 엔진 의존 대신 `Framer Motion + CSS gradient + blur + transform`으로 공간감을 만든다.
- 모바일에서도 유지 가능하도록 과도한 WebGL 의존을 피했다.

---

## 5. 프론트엔드 수정 우선순위

### 장면 카피를 바꾸고 싶을 때

먼저 `lib/taedong-exhibition.ts`를 수정한다.

### 섹션 레이아웃이나 비주얼을 바꾸고 싶을 때

해당 `components/landing/*.tsx` 파일을 수정한다.

### 홈 페이지 메타데이터를 바꾸고 싶을 때

`app/page.tsx`를 수정한다.

### 전체 배경 질감이나 공통 스타일을 바꾸고 싶을 때

`app/globals.css`를 수정한다.

---

## 6. 백엔드 범위 메모

현재 이 작업은 `브랜드 랜딩 프론트엔드` 중심 구현이다.  
즉, 별도의 API 서버, CMS, 데이터베이스, 인증, 문의 폼 백엔드 로직은 이번 범위에 포함되어 있지 않다.

현재 상태:

- CTA는 공격적인 폼 제출이 아니라 `브랜드 문의` 수준의 절제된 진입점이다.
- 메인 랜딩은 콘텐츠 표현과 서사 경험에 집중한다.
- 추후 실제 문의 수집, 리드 저장, CRM 연동이 필요하면 그때 별도 백엔드 범위를 설계하면 된다.

백엔드가 나중에 추가된다면 추천 우선순위:

1. 브랜드 문의용 API endpoint
2. 관리자 없이도 수정 가능한 lightweight CMS 또는 content source
3. 포트폴리오/전시실 콘텐츠 관리 구조
4. 분석 이벤트와 스크롤 인터랙션 성과 측정

---

## 7. 현재 구현 상태

이미 구현된 상태:

- 홈(`/`)이 전시형 랜딩으로 교체됨
- 5개 전시실 구조 구현 완료
- 전시실 네비게이션 구현 완료
- 전시 데이터 모델 분리 완료
- Claude Design 전달용 문서 분리 완료
- 구조 검증 테스트 작성 완료

미구현 또는 후속 가능 영역:

- 실제 브랜드 카피 세밀화
- 사례 데이터 실서비스 기준 정리
- WebGL 강화 버전 또는 고급 카메라 연출
- 브랜드 문의용 실제 백엔드 연결

---

## 8. 관련 문서 경로

- 디자인 스펙: `docs/superpowers/specs/2026-04-27-taedong-exhibition-landing-design.md`
- Claude Design 프롬프트: `docs/claude-design/2026-04-27-taedong-exhibition-landing-prompt.md`
- 코드베이스 요약: `docs/claude-design/2026-04-27-taedong-exhibition-codebase-summary.md`
- 최종 전달본: `docs/claude-design/2026-04-28-taedong-exhibition-final-handoff.md`
- 구현 계획: `/Users/min/.codex/plans/2026-04-27-taedong-exhibition-landing-plan.md`

---

## 9. 검증

기본 구조 검증 테스트:

```bash
node --experimental-strip-types --test tests/lib/taedong-exhibition.test.ts
```

프로덕션 빌드 검증:

```bash
npm run build
```

현재 기준으로 두 검증은 모두 통과한 상태다.

---

## 10. Claude에게 바로 전달할 때 붙일 한 줄 요약

`태동 메인 홈페이지를 고대 그리스 전시관처럼 스크롤하며 이동하는 몰입형 랜딩으로 재구성한 상태이며, 현재 코드는 Next.js App Router 기반 프론트엔드 랜딩 구현까지 완료되어 있고, 디자인/카피/장면 고도화를 위한 후속 작업만 남아 있다.`
