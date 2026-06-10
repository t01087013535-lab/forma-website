export type InsightCategory = 'all' | 'engineering' | 'case-study' | 'team-notes' | 'agents'

export interface InsightArticle {
  slug: string
  category: Exclude<InsightCategory, 'all'>
  title: string
  lang: 'ko' | 'en'
  lede: string
  author: string
  date: string // ISO
}

export const categoryLabels: Record<InsightCategory, string> = {
  all: '전체',
  engineering: '엔지니어링',
  'case-study': '케이스 스터디',
  'team-notes': '팀 노트',
  agents: 'AI 에이전트',
}

export const insightArticles: InsightArticle[] = [
  {
    slug: 'from-error-to-form',
    category: 'team-notes',
    title: '오류에서 설계로 — 실패를 자산으로 바꾼 1년',
    lang: 'ko',
    lede: '태동이 수백 번의 오류를 기록하며 만든 내부 스킬 체계. 팀이 학습을 멈추지 않는 방식.',
    author: 'Min Lee',
    date: '2026-04-02',
  },
  {
    slug: 'next-16-cache-components',
    category: 'engineering',
    title: 'Next.js 16 Cache Components in production',
    lang: 'en',
    lede: 'Lessons from shipping three marketing sites on the new Cache Components model — what finally clicked.',
    author: 'Min Lee',
    date: '2026-03-27',
  },
  {
    slug: 'langgraph-1-1-patterns',
    category: 'agents',
    title: 'LangGraph 1.1 — 에이전트 설계 패턴 3가지',
    lang: 'ko',
    lede: '재귀·분기·승인. 실제 프로덕션 그래프에서 반복 등장한 패턴들을 정리했다.',
    author: 'Sam Park',
    date: '2026-03-20',
  },
  {
    slug: 'sungbyuk-case-study',
    category: 'case-study',
    title: 'Sungbyuk: a cathedral, a 3D model, and one render pipeline',
    lang: 'en',
    lede: 'How a rhino3dm + Krea render pipeline replaced two weeks of manual visualization for a church commission.',
    author: 'Jordan Kim',
    date: '2026-03-14',
  },
  {
    slug: 'pretendard-newsreader-mix',
    category: 'engineering',
    title: 'Pretendard + Newsreader — 혼용 타이포 그리드 만들기',
    lang: 'ko',
    lede: '한국어와 영문이 같은 페이지에서 서로를 방해하지 않는 타이포 스케일을 설계하는 법.',
    author: 'Jamie Cho',
    date: '2026-03-08',
  },
  {
    slug: 'nexus-onboarding',
    category: 'case-study',
    title: 'NEXUS 온보딩 — 첫 30일을 설계하다',
    lang: 'ko',
    lede: '멀티플랫폼 기술 분석 SaaS의 첫 30일 리텐션 곡선을 올리기 위해 우리가 버린 기능들.',
    author: 'Taylor Han',
    date: '2026-02-28',
  },
  {
    slug: 'subagent-driven-dev',
    category: 'agents',
    title: 'Subagent-driven development, six months in',
    lang: 'en',
    lede: 'What works, what breaks, and the hand-off format that kept our multi-agent team honest.',
    author: 'Riley Oh',
    date: '2026-02-20',
  },
  {
    slug: 'team-operating-system',
    category: 'team-notes',
    title: '작은 팀을 위한 운영체제 — PRAV 루프',
    lang: 'ko',
    lede: 'Plan / Research / Act / Validate. 네 단계 루프로 팀의 기본기를 다지는 법.',
    author: 'Min Lee',
    date: '2026-02-12',
  },
  {
    slug: 'three-js-budget',
    category: 'engineering',
    title: 'A performance budget for Three.js marketing hero',
    lang: 'en',
    lede: 'Keeping the hero under 180 KB JS while still earning a real "wow" on first paint.',
    author: 'Blake Yoon',
    date: '2026-02-04',
  },
]
