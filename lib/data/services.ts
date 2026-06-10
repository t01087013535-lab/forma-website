export interface ServicePackage {
  id: string
  index: string
  kicker: string
  title: string
  subtitle: string
  summary: string
  deliverables: string[]
  timeline: string
  stack: string[]
  priceNote: string
}

export const servicePackages: ServicePackage[] = [
  {
    id: 'enterprise-web',
    index: '01',
    kicker: 'Consulting · Build',
    title: '기업 웹 리뉴얼',
    subtitle: 'Enterprise Web Renewal',
    summary:
      '낡은 코퍼레이트 사이트를 브랜드 아이덴티티와 검색·전환 지표 모두를 끌어올리는 풀스택 Next.js 플랫폼으로 재설계합니다.',
    deliverables: [
      '브랜드·정보구조 재정의 워크숍 (2회)',
      'Figma 디자인 시스템 + Tailwind v4 토큰',
      'Next.js 16 App Router 기반 구현',
      'CMS 연동 (Supabase / Contentful 선택)',
      'Core Web Vitals 90+ 튜닝',
    ],
    timeline: '6–10주',
    stack: ['Next.js 16', 'Tailwind v4', 'Supabase', 'Vercel'],
    priceNote: '문의',
  },
  {
    id: 'dashboard-saas',
    index: '02',
    kicker: 'Product · Platform',
    title: '대시보드 SaaS 구축',
    subtitle: 'Multi-tenant Dashboard SaaS',
    summary:
      '데이터·운영 지표를 실시간으로 확인하고 팀 단위로 협업하는 멀티 테넌트 SaaS를 설계부터 배포까지 담당합니다.',
    deliverables: [
      'Auth·Org·Role 모델 설계 (Supabase RLS)',
      'LangGraph 기반 에이전트 워크플로우(선택)',
      '실시간 스트리밍 UI (SSE / Realtime)',
      'Stripe 구독·사용량 과금 연동',
      'Playwright 회귀 테스트 세트',
    ],
    timeline: '10–16주',
    stack: ['Next.js 16', 'FastAPI', 'Supabase', 'Stripe', 'LangGraph'],
    priceNote: '문의',
  },
  {
    id: 'sre-retainer',
    index: '03',
    kicker: 'Operate · Scale',
    title: '유지보수 · SRE 계약',
    subtitle: 'Monthly SRE Retainer',
    summary:
      '런칭 이후에도 월간 릴리즈·모니터링·장애 대응을 함께 합니다. SLO를 수치로 합의하고 그 안에서 사이트를 지킵니다.',
    deliverables: [
      '월간 릴리즈 1~2회 (기능 개선 포함)',
      '에러 추적 (Sentry) + 분석 (PostHog) 세팅',
      'Uptime / Core Web Vitals 대시보드',
      '온콜 응대 (평일 9–19시, 응답 2시간)',
      '분기별 아키텍처 리뷰 보고서',
    ],
    timeline: '월간 리테이너',
    stack: ['Vercel', 'Sentry', 'PostHog', 'GitHub Actions'],
    priceNote: '문의',
  },
]
