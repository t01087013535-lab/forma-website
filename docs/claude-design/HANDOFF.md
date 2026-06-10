# Claude Design → forma-website 핸드오프 절차

## 0. 전제

- Claude 계정: `t01087013535@gmail.com` (Pro 구독) — Claude Design research preview 접근 가능
- 레포: `t01087013535-lab/forma-website` (main)
- 현재 로컬 working tree: `/Users/min/forma-website`

---

## 1. Claude Design 프로젝트 셋업

1. Chrome(Pro 계정 로그인 상태)에서 `https://claude.ai/design` 열기
2. **New project** → 이름: `forma-website-experiments`
3. **Add context** 클릭 후 아래 3개를 업로드 또는 붙여넣기
   - `docs/claude-design/CONTEXT.md` (브랜드·토큰·컴포넌트 인벤토리)
   - `app/globals.css` (@theme 토큰 원본)
   - `package.json` (의존성 버전 확인용)
4. (선택) GitHub 레포 연결이 가능하면 `t01087013535-lab/forma-website` main 브랜치 연결. 안 될 경우 3번으로 충분.

## 2. 실험 실행

`docs/claude-design/EXPERIMENTS.md`의 실험 1 → 2 → 3 순서로 프롬프트 붙여넣기.
각 실험당 결과물을 Claude Design의 **Export** → "Handoff to Claude Code Web" 혹은 ZIP 다운로드.

## 3. 로컬 staging 반영

ZIP 받은 경우:
```bash
cd /Users/min/forma-website
mkdir -p experiments/claude-design/services      # 실험 1
unzip ~/Downloads/claude-design-services.zip -d experiments/claude-design/services
```

Claude Code Web 핸드오프를 쓰는 경우:
- Claude Code Web이 자동으로 forma-website 레포에 PR 생성
- 브랜치명 규칙 요구: `experiment/claude-design/<실험-슬러그>` (예: `experiment/claude-design/services`)

## 4. 검증 (로컬)

```bash
cd /Users/min/forma-website
npm install                 # 새 의존성 있을 경우
npm run lint
npm run build
npm run dev                 # http://localhost:3000 에서 실제 렌더링 확인
```

EXPERIMENTS.md 각 실험의 "검증 포인트" 체크리스트를 모두 통과해야 승인.

## 5. PR 머지 규칙

- 승인 리뷰: pm, reviewer 1명씩 (CLAUDE.md 팀 구조)
- 커밋 스코프: `feat(taedong-web): ...` (CLAUDE.md 커밋 컨벤션)
- 머지 전략: **squash merge** (forma-website main)
- 머지 직후 Vercel 자동 배포 → 프리뷰 URL에서 시각 회귀 확인

## 6. 롤백

실험이 실패해도 `experiments/claude-design/**`에만 머물러 있으므로 main을 건드리지 않음.
App Router 페이지로 승격될 때만 `app/**`로 이동 — 이때 문제가 생기면 `git revert <squash-sha>`.

## 7. 생성물 품질 기준 (승인 체크)

- [ ] Tailwind v4 `@theme` 토큰만 사용 — 새 hex 리터럴 금지
- [ ] `use client` 지시어가 필요한 곳에 모두 있음 (framer-motion·three 사용 컴포넌트)
- [ ] `prefers-reduced-motion` 분기 포함
- [ ] focus-visible 아웃라인 유지
- [ ] 기존 `components/ui/*`(`MagneticButton`, `TextReveal` 등) 재사용 시 동일한 import 경로
- [ ] h1→h6 시맨틱 순서 유지, 랜드마크 태그 사용
- [ ] Lighthouse Performance ≥ 90, Accessibility = 100 유지

## 8. 트러블슈팅

| 증상 | 원인 | 대응 |
|------|------|------|
| Claude Design 결과물에 `styled-components`/`MUI` import 있음 | 프롬프트에서 Tailwind v4 강제 누락 | CONTEXT.md §4 원칙 보강 후 재생성 |
| 커스텀 커서가 새 페이지에서 꺼짐 | `<body cursor: none>`과 새 섹션의 `cursor: pointer` 충돌 | 해당 요소에 `cursor: none`/`CustomCursor` hover 상태 추가 |
| 빌드 실패 — Next.js 16 API 불일치 | Claude Design이 구 App Router 패턴 생성 | `node_modules/next/dist/docs/`의 16 버전 변경 사항 읽고 prompt 보강 |
| Three.js 중복 초기화 | 새 페이지에서 WebGL context 또 생성 | 히어로 외엔 Three.js 쓰지 말 것. 프롬프트에 금지 조항 확인 |
