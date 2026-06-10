# Taedong Award-First Interactive Handoff

이 문서는 기존 전시형 랜딩 방향을 `내용 중심`에서 `데스크톱 어워드 우선 인터랙션 중심`으로 업그레이드하기 위한 전달본이다.

## Why the previous result likely felt weak

기존 프롬프트는 다음 성향이 강했다.

- 분위기와 콘셉트 설명은 충분했음
- 서사 구조는 정리되어 있었음
- 하지만 인터랙션이 `권장 사항`처럼 보였고 `필수 기능 명세`가 약했음
- 그래서 Claude Design이 안전한 박물관형 랜딩, 고급 패럴랙스 페이지, 에디토리얼 구성으로 빠졌을 가능성이 높음

즉, 문제는 방향성이 없어서가 아니라 `인터랙션 강제력이 부족했던 것`에 가깝다.

## New target

새 목표는 명확하다.

- `desktop-first`
- `award-style`
- `interaction-first`
- `space-transition-heavy`
- `not behind Awwwards reference sites in perceived ambition`

## What must feel stronger than before

다음은 이번 리비전에서 반드시 강화되어야 한다.

1. 첫 화면 진입감
2. 문이 열리는 장면의 임팩트
3. 방과 방 사이의 전이감
4. 마우스 움직임에 대한 공간 반응
5. 전시물의 깊이와 실재감
6. 네비게이션의 세계관 일치감

## Interaction baseline

최소 기준은 이렇다.

- 문 개폐 인터랙션
- 카메라 돌리 또는 카메라 드리프트
- 안개/빛/입자 기반 전이 효과
- 인터랙티브 커서
- 포인터 반응형 전시물
- 미니맵 또는 건축 도면형 네비게이션

이 중 2~3개만 들어가면 부족하다.  
핵심 기능 여러 개가 동시에 살아 있어야 어워드 계열 느낌이 난다.

## Existing codebase context

현재 구현은 이미 `Next.js App Router` 기반 랜딩으로 정리되어 있다.

- 홈 엔트리: `app/page.tsx`
- 랜딩 셸: `components/landing/TaedongLanding.tsx`
- 장면 데이터: `lib/taedong-exhibition.ts`
- 주요 장면:
  - `components/landing/TaedongPortalHero.tsx`
  - `components/landing/TaedongOriginHall.tsx`
  - `components/landing/TaedongAtelierHall.tsx`
  - `components/landing/TaedongCollectionHall.tsx`
  - `components/landing/TaedongFinaleHall.tsx`

현재 버전은 `전시형 서사 구조`와 `2.5D 공간감`까지는 올라와 있다.  
다음 단계는 이를 `award-first interaction system`으로 밀어 올리는 것이다.

## What Claude should focus on now

- 레이아웃보다 장면 반응
- 정보 구조보다 공간 전이
- 섹션 구성보다 입력 피드백
- 예쁜 비주얼보다 기억에 남는 조작감

## Primary prompt to use

이 리비전에서는 아래 파일의 프롬프트를 우선 사용한다.

- `docs/claude-design/2026-04-30-taedong-award-first-prompt.md`

## Short instruction for Claude

`이 작업은 고급 브랜드 랜딩이 아니라 데스크톱 어워드 우선 인터랙티브 경험 설계다. 기존 결과가 안전하고 밋밋했다면 실패로 보고, 문 개폐, 공간 전이, 포인터 반응, 깊이 레이어, 전시물 반응, 건축 도면형 네비게이션을 강하게 밀어붙여라.`
