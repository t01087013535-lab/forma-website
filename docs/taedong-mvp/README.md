# 태동 홈페이지 MVP — 작업 패키지

```
대상 사이트 : https://forma-website-two.vercel.app
저장소     : ~/forma-website
시작일     : 2026-04-22
```

## 문서 순서

| # | 파일 | 작성 | 역할 |
|---|------|------|------|
| 01 | [design-analysis.md](./01-design-analysis.md) | Claude | Forma 배포본 + 코드 디자인 분석 / 갭 G1–G12 |
| 02 | [mvp-plan.md](./02-mvp-plan.md) | Claude | 4-Day Sprint Plan / KPI / 게이트 정의 |
| 03 | [codex-handoff.md](./03-codex-handoff.md) | Claude → Codex | 게이트별 작업 명세 / 컨벤션 / 코드 예시 |
| 04 | [review-checklist.md](./04-review-checklist.md) | Claude | 검수 체크리스트 / 증거 수집 명령 |
| - | reviews/ | Claude (작업 후) | 게이트별 검수 보고 (gate-1.md ~ gate-4.md) |

## 역할 분담

```
Codex CLI → 디자인 / 구현 / PR 생성
Claude    → 분석 / 계획 / 검수 / 게이트 승인
사용자    → PR 머지 / 프로덕션 promote 결정
```

## 진행 흐름

```
[01·02 분석·계획 완료]   ← 현재 위치
        ↓
Codex가 03 명세 받아 PR-1 (Day 1) 작성
        ↓
Claude가 04 체크리스트로 검수 → reviews/gate-1.md
        ↓
PASS → PR-2 (Day 2) … 반복
        ↓
Gate 4 PASS = MVP 완료
```

## 시작 명령 (Codex)

```
1. cat docs/taedong-mvp/01-design-analysis.md  # 컨텍스트 흡수
2. cat docs/taedong-mvp/03-codex-handoff.md    # 작업 명세 확인
3. PR-1 D1-1부터 작업 → PR 생성 → Claude 핑
```
