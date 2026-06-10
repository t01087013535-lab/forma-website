# Taedong Exhibition Landing Codebase Summary

이 프로젝트는 `Next.js App Router` 기반의 태동 메인 랜딩 코드베이스다.  
현재 홈(`/`)은 기존 FORMA 소개 페이지가 아니라, `고대 그리스 전시관` 콘셉트의 전시형 브랜드 랜딩으로 교체되어 있다.

## 1. 핵심 구조

- 홈 엔트리: `app/page.tsx`
- 메인 랜딩 셸: `components/landing/TaedongLanding.tsx`
- 랜딩 데이터 모델: `lib/taedong-exhibition.ts`
- 홈 전용 스타일 보강: `app/globals.css`

즉, 홈 화면은 `app/page.tsx`에서 `TaedongLanding`을 렌더링하고, 실제 섹션 내용과 순서는 `lib/taedong-exhibition.ts`의 데이터와 `components/landing/*` 컴포넌트들이 담당한다.

## 2. 랜딩 섹션 구성

홈 랜딩은 5개의 전시실로 나뉜다.

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

## 3. 데이터와 콘텐츠 위치

랜드िंग의 텍스트, 섹션 순서, 네비게이션 라벨, 전시물 목록, 역량 패널, 사례 데이터는 모두 `lib/taedong-exhibition.ts`에 모여 있다.

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

## 4. 인터랙션 방식

이 랜딩은 `풀 3D`가 아니라 `절충형 2.5D 전시 랜딩` 구조다.

- 스무스 스크롤: `components/layout/LenisProvider.tsx`
- 스크롤 진행 바: `components/ui/ScrollProgress.tsx`
- 섹션별 장면 전환: 각 `components/landing/*` 안의 `framer-motion`

주요 특징:

- `sticky` 섹션을 활용해 한 화면 안에서 공간이 움직이는 느낌을 준다.
- 강한 3D 엔진 의존 대신 `Framer Motion + CSS gradient + blur + transform`으로 공간감을 만든다.
- 모바일에서도 유지 가능하도록 과도한 WebGL 의존을 피했다.

## 5. 스타일 방향

전역 스타일은 `app/globals.css`를 사용한다.  
홈 전용 질감 보강용으로 `.taedong-noise` 클래스가 추가되어 있다.

컬러와 무드는 대체로 다음 계열을 따른다.

- `obsidian black`
- `marble sand`
- `oxidized bronze`
- `aegean blue`

랜딩 컴포넌트 내부에서는 Tailwind 유틸리티와 inline gradient를 조합해 장면별 분위기를 만든다.

## 6. 수정 우선순위 가이드

### 장면 카피를 바꾸고 싶을 때

먼저 `lib/taedong-exhibition.ts`를 수정한다.

### 섹션 레이아웃이나 비주얼을 바꾸고 싶을 때

해당 `components/landing/*.tsx` 파일을 수정한다.

### 홈 페이지 메타데이터를 바꾸고 싶을 때

`app/page.tsx`를 수정한다.

### 전체 배경 질감이나 공통 스타일을 바꾸고 싶을 때

`app/globals.css`를 수정한다.

## 7. 관련 문서

- 디자인 스펙: `docs/superpowers/specs/2026-04-27-taedong-exhibition-landing-design.md`
- Claude Design 프롬프트: `docs/claude-design/2026-04-27-taedong-exhibition-landing-prompt.md`
- 구현 계획: `/Users/min/.codex/plans/2026-04-27-taedong-exhibition-landing-plan.md`

## 8. 검증

기본 구조 검증 테스트:

```bash
node --experimental-strip-types --test tests/lib/taedong-exhibition.test.ts
```

프로덕션 빌드 검증:

```bash
npm run build
```

현재 기준으로 두 검증은 모두 통과하는 상태다.
