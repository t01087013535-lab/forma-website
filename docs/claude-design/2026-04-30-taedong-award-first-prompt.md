# Claude Design Prompt v2 — Taedong Award-First Interactive Landing

태동 메인 홈페이지 전체를 대체하는 `desktop-first award-style interactive landing page`를 디자인한다.

이번 결과물의 우선순위는 `내용 전달`이 아니라 `인터랙션 임팩트`다.  
사용자는 이 사이트를 보며 "정보를 읽었다"보다 "브랜드 공간을 직접 조작하고 통과했다"는 감각을 느껴야 한다.

## Absolute priorities

1. `Desktop award-first`
2. `Interaction before content`
3. `Spatial transitions before static sections`
4. `Awwwards-level visual ambition`
5. `No safe SaaS layout`

## Core concept

콘셉트는 `고대 그리스 전시관을 미래적으로 재해석한 인터랙티브 브랜드 공간`이다.

사용자는 페이지를 스크롤하는 것이 아니라:

- 거대한 문을 열고 입장하고
- 회랑을 따라 이동하고
- 전시물을 가까이서 반응시키고
- 다음 공간으로 전이되며
- 마지막 돔 공간에서 브랜드 선언과 마주해야 한다

이 경험은 정적인 패럴랙스가 아니라 `실제 공간을 탐험하는 듯한 전개`여야 한다.

## Hard interaction requirements

다음 기능은 반드시 포함한다. 빠지면 안 된다.

1. `Portal door opening`
   첫 화면에서 거대한 석재 문이 스크롤에 따라 실제로 갈라지며 열려야 한다.

2. `Camera dolly / camera drift`
   각 섹션 전환 시 카메라가 살짝 전진하거나 좌우로 이동하는 느낌이 있어야 한다.

3. `Room-to-room transition effect`
   단순 섹션 스크롤 금지. 안개, 빛, 셰이더 왜곡, 석재 와이프, 입자 전환 등 공간 전이 장면이 필요하다.

4. `Interactive cursor system`
   기본 포인터 금지. 커서는 빛점, 횃불, 조각 반응원 같은 존재로 작동해야 한다.

5. `Object reaction`
   전시물, 석판, 조각상 파편, 프레임이 마우스 접근 또는 스크롤 속도에 반응해야 한다.

6. `Depth-rich parallax`
   전경, 중경, 배경이 분리되어 실제 깊이감이 느껴져야 한다.

7. `Exhibition minimap or architectural navigation`
   현재 위치를 단순 도트 네비가 아니라 전시관 도면, 회랑 지도, 구조 평면처럼 보여줘야 한다.

## Signature features that should make it feel award-worthy

- 실시간 배경 왜곡 또는 유체감 있는 안개 반응
- 섹션 진입 시 오브젝트 인스펙션 또는 확대 연출
- 스크롤 속도에 따라 먼지, 빛, 흔들림이 달라지는 반응
- 헤드라인이 평면 텍스트가 아니라 공간 안에서 출현하는 방식
- 체류 시간 또는 특정 포인터 움직임에 반응하는 작은 이스터에그

## Scene structure

### Scene 1 — The Portal

- 석재 문, 빛기둥, 먼지 입자, 깊은 그림자
- 사용자가 스크롤하면 문이 열리고 안쪽 공간이 드러난다
- 첫 장면은 `와, 시작부터 다르다`는 인상을 만들어야 한다

### Scene 2 — The Origin Hall

- 4개의 브랜드 철학 전시물
- 각 전시물은 포인터에 따라 반응하거나 기울어야 한다
- 석판/기둥/부조처럼 느껴져야 하며 단순 카드 UI처럼 보여선 안 된다

### Scene 3 — The Atelier

- 태동의 역량을 전시품으로 변환
- 브랜드 웹, 시스템 설계, 제품 구축, 운영 자동화가 각각 다른 재질과 깊이감을 가진 오브젝트로 연출되어야 한다

### Scene 4 — The Collection Gallery

- 포트폴리오는 작품 패널 또는 떠 있는 프레임으로 표현
- 카드 그리드 금지
- 작품 하나하나가 공간 안에서 전시되는 방식이어야 한다

### Scene 5 — The Dome Finale

- 개방된 돔, 빛의 원형 파장, 잔향 같은 느낌
- 브랜드 문장은 크게 남고 CTA는 절제되어야 한다
- 마지막 장면은 정보보다 기억을 남겨야 한다

## Visual direction

- 고대 그리스 건축을 그대로 복원하는 것이 아니라 `luxury futuristic museum architecture`처럼 재해석
- 재질: marble, limestone, obsidian, oxidized bronze, dim gold, aegean blue light
- 평평한 배경 금지
- 안개, 광선, 실루엣, 먼지, 그림자, 반사, 깊이 레이어 적극 사용
- 과도하게 게임 UI처럼 보이지 않게 하고, 품격 있고 조용한 긴장감 유지

## Typography direction

- 제목: 조형감 있는 high-contrast serif
- 본문: 정제된 현대 산세리프
- 숫자/레이블: 건축 도면 같은 느낌의 모노 또는 엔지니어링 계열
- 텍스트 자체도 공간의 일부처럼 보여야 한다

## Strict anti-patterns

다음은 절대 피한다.

- 평범한 히어로 + 카드 섹션 + CTA 버튼 조합
- 스타트업 SaaS 랜딩처럼 보이는 블록 구조
- 그냥 예쁜 패럴랙스 수준에서 끝나는 구성
- 안전한 베이지톤 브랜드 페이지
- 인터랙션 설명만 있고 실제 공간 반응이 없는 디자인
- 모바일 기준으로 지나치게 타협해서 데스크톱 임팩트가 죽는 결과

## Output requirements

반드시 아래를 포함한다.

1. 데스크톱 기준 전체 랜딩 시안
2. 각 장면별 공간 설명
3. 스크롤/포인터/전환 인터랙션 설명
4. 어떤 요소가 왜 어워드급 임팩트를 만드는지 설명
5. 모바일 축약 전략

## Working stance

이 작업은 `예쁜 브랜드 페이지`를 만드는 일이 아니다.  
이 작업은 `태동의 메인 페이지를 Awwwards/CSSDA 레벨의 인터랙티브 브랜드 경험으로 끌어올리는 작업`이다.

디자인 결과는 안전하면 실패다.  
장면 전환, 포인터 반응, 깊이감, 전이 효과가 충분히 과감해야 한다.
