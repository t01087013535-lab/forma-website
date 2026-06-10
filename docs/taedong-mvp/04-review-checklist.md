# 04 — 검수 체크리스트 (Claude 전용)

```
역할     : Claude가 Codex의 PR을 게이트별로 검수
원칙     : Evidence before assertion (증거 없이 통과 판정 금지)
산출물   : reviews/gate-{N}.md 에 PASS / FAIL + 근거
결정     : FAIL 1개라도 있으면 PR reject
```

---

## 0. 모든 PR 공통 검수 (Pre-flight)

| # | 항목 | 통과 기준 | 검증 명령 |
|---|------|----------|----------|
| C0.1 | 빌드 | exit code 0 | `cd ~/forma-website && npm run build` |
| C0.2 | 린트 | error 0건 | `npm run lint` |
| C0.3 | 타입 | error 0건 | `npx tsc --noEmit` |
| C0.4 | 시크릿 누출 | 0건 | `git diff main...HEAD \| grep -iE "api[_-]?key\|secret\|token\|password"` |
| C0.5 | 파일 길이 | ≤ 300줄/파일 | `find . -name "*.tsx" -not -path "*/node_modules/*" -exec wc -l {} + \| awk '$1>300'` |
| C0.6 | named export 준수 | App Router 예외 외 default 금지 | `grep -rn "export default" app components` 후 page/layout/error/loading만 허용 |
| C0.7 | 빈 catch | 0건 | `grep -rn "catch.*{}" app components lib` |
| C0.8 | console.log 잔존 | 0건 (개발용 제외 기준 합의) | `grep -rn "console.log" app components lib` |
| C0.9 | TODO/FIXME 신규 | 추적 이슈 링크 동반만 허용 | `git diff main...HEAD \| grep -E "^\+.*(TODO\|FIXME)"` |

---

## 1. Gate 1 — Foundations (PR-1)

### 1.1 콘택트 폼 백엔드
- [ ] `app/api/contact/route.ts` 존재
- [ ] Zod 스키마로 입력 검증 (서버/클라이언트 공유)
- [ ] Resend 호출 성공 시 200, 검증 실패 422, 서버 오류 500
- [ ] HTML/text 메일 모두 포함
- [ ] honeypot 필드 동작 (채워진 요청은 200 반환 후 폐기)

**증거 수집 명령**:
```bash
# 1. 정상 요청
curl -X POST https://forma-website-two.vercel.app/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"테스트","email":"t@example.com","service":"design","budget":"5m_10m","message":"검수용 메시지입니다."}'

# 2. 빈 값 (422 기대)
curl -X POST .../api/contact -H 'Content-Type: application/json' -d '{}'

# 3. SQLi
curl ... -d '{"name":"test","email":"a@b.c\\x27 OR 1=1--","service":"design","budget":"5m_10m","message":"x"}'

# 4. XSS
curl ... -d '{"name":"<script>alert(1)</script>","email":"a@b.c","service":"design","budget":"5m_10m","message":"x"}'

# 5. honeypot 채움
curl ... -d '{"name":"bot","email":"b@b.c","service":"design","budget":"5m_10m","message":"x","website":"http://spam.com"}'
```
**판정**: 5개 모두 기대 응답 + 본인 이메일에 1번만 도착

### 1.2 환경 변수
- [ ] `.env.example` 신규 존재 + 모든 사용 키 명시
- [ ] `git ls-files` 결과에 `.env`/`.env.local` 없음
- [ ] Vercel Project env에 server-only 키 등록 확인 (`vercel env ls`)

### 1.3 lucide-react
- [ ] `npm view lucide-react version` 결과와 `package.json` 일치 또는 의도적 고정 사유 PR 본문에 명시
- [ ] 빌드 통과

---

## 2. Gate 2 — Content (PR-2)

### 2.1 더미 콘텐츠 제거
```bash
# 통과 기준: 0건
grep -rn "Project 0[2-5]" --include="*.ts" --include="*.tsx" .
grep -rn "Lorem ipsum\|TBD\|placeholder" --include="*.ts" --include="*.tsx" .
```

### 2.2 케이스 스터디
- [ ] `/work/sungbyuk` 200 OK
- [ ] WorkHero / WorkNarrative / WorkGallery / WorkOutcome 모두 의미 있는 콘텐츠
- [ ] 이미지 next/image 사용 + alt 채움
- [ ] LCP < 3s (Lighthouse 모바일)

### 2.3 OG
- [ ] https://www.opengraph.xyz/url/{인코딩한URL} 통과
- [ ] 이미지 1200x630, < 1MB

### 2.4 카피
- [ ] 한국어 맞춤법 (의심 키워드 grep): "되요" "안되" "바램" "어떻해" → 0건
- [ ] 한영 혼용 일관성: 모든 섹션 eyebrow가 mono uppercase 영문

---

## 3. Gate 3 — Discoverability (PR-3)

### 3.1 SEO 인프라
```bash
curl -I https://forma-website-two.vercel.app/sitemap.xml   # 200 + xml
curl -I https://forma-website-two.vercel.app/robots.txt    # 200 + text
curl -s https://forma-website-two.vercel.app/sitemap.xml | grep -c "<url>"  # 라우트 수와 일치
```

### 3.2 메타데이터
- [ ] 각 페이지 View Source에서 `<title>` `<meta name="description">` `<meta property="og:*">` 채워짐
- [ ] title 길이 30~70자, description 80~160자

### 3.3 Schema.org
- [ ] https://validator.schema.org/ 에 URL 입력 → 에러 0건
- [ ] Organization, WebSite, CreativeWork(케이스 스터디) 검출

### 3.4 Lighthouse
```bash
npx lighthouse https://forma-website-two.vercel.app \
  --form-factor=mobile --output=json --output-path=./lighthouse-mvp.json
jq '.categories | {perf:.performance.score, a11y:.accessibility.score, seo:.seo.score, bp:."best-practices".score}' lighthouse-mvp.json
```
**통과**: perf ≥ 0.85, a11y ≥ 0.95, seo ≥ 0.95, best-practices ≥ 0.95

### 3.5 Analytics
- [ ] `view-source` 에 `_vercel/insights` 또는 `va.vercel-scripts.com` 호출
- [ ] Vercel Analytics 대시보드 1건 이상 페이지뷰
- [ ] 콘택트 폼 제출 시 `contact_submit_success` 이벤트 트리거

---

## 4. Gate 4 — QA & Polish (PR-4) = MVP 완료

### 4.1 모바일 QA
- [ ] 360 / 414 / 768 / 1024 4지점 스크린샷 첨부 (PR 본문)
- [ ] 가로 스크롤 0건 (`document.documentElement.scrollWidth === window.innerWidth`)
- [ ] 모든 터치 타깃 ≥ 44x44px

### 4.2 접근성
```bash
npx @axe-core/cli https://forma-website-two.vercel.app \
  --tags wcag2a,wcag2aa,wcag21a,wcag21aa --exit
```
**통과**: violations 0건. incomplete는 수동 확인 후 PR 본문에 판단 근거 명시

- [ ] 키보드 only: Tab → Hero CTA → Nav → Work cards → Service CTA → Contact 필드 → Submit 모두 도달
- [ ] focus-visible 윤곽선 명확 (대비 ≥ 3:1)
- [ ] ESC가 ContactModal 닫음

### 4.3 성능
```bash
npx lighthouse https://forma-website-two.vercel.app \
  --form-factor=mobile --throttling-method=simulate \
  --only-categories=performance --output=json
```
**통과**:
- LCP < 2500ms
- CLS < 0.1
- TBT < 300ms
- 초기 JS (Network 탭, gzip) < 250KB

### 4.4 깨진 링크
```bash
npx broken-link-checker https://forma-website-two.vercel.app -ro \
  | tee broken-links.log
grep -c "BROKEN" broken-links.log  # 0
```

### 4.5 Three.js fallback
- [ ] `prefers-reduced-motion: reduce` 시뮬레이트 → 정적 fallback
- [ ] 모바일 width < 768 → 부하 감소 또는 비활성화
- [ ] DevTools Network throttling "Slow 4G"에서 페이지 인터랙티브 < 5s

---

## 5. 검수 보고서 템플릿

각 게이트 통과/실패 시 `docs/taedong-mvp/reviews/gate-{N}.md` 신규 작성:

```markdown
# Gate {N} 검수 보고

- 검수일 : YYYY-MM-DD HH:MM
- PR     : #{번호} ({브랜치})
- 검수자 : Claude
- 결과   : ✅ PASS / ❌ FAIL

## 통과 항목
- [x] C0.1 빌드 — `npm run build` exit 0 (로그: ...)
- [x] ...

## 실패 항목 (있는 경우)
- [ ] C2.1 더미 grep — `Project 03` 1건 발견 (`lib/portfolio-data.ts:23`)
  → 수정 요청 후 재검수

## 증거 (명령 + 출력 요약)
```bash
$ npm run build
✓ Compiled successfully
```

## 다음 게이트
PASS → Gate {N+1} 진행
FAIL → 위 실패 항목 수정 후 재요청
```

---

## 6. 검수자(Claude)의 행동 규칙

1. **증거 없이 PASS 금지**: 통과 항목마다 명령 출력 또는 파일 라인 인용
2. **외부 도구 호출 시 캐시 의심**: Lighthouse·OG Debugger는 `?nocache=$(date +%s)` 등으로 강제 갱신
3. **부분 통과 ≠ 통과**: 5개 항목 중 4개 통과는 FAIL
4. **재검수 시에도 처음부터**: 이전 회차 PASS 항목도 다시 확인 (회귀 방지)
5. **수정 권고는 구체적**: "X 부분 X 라인을 Y로 변경" 형식. "전반적으로 개선" 금지
6. **PR 머지 권한 없음**: PASS 보고만, 머지는 사용자(min) 결정
