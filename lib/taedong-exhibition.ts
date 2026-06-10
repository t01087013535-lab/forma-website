export type ExhibitionExperience = 'immersive' | 'content'

export type ExhibitionRoomId =
  | 'portal'
  | 'origin'
  | 'atelier'
  | 'gallery'
  | 'finale'

export type ExhibitionRoom = {
  id: ExhibitionRoomId
  label: string
  navLabel: string
  eyebrow: string
  title: string
  lede: string
  description: string
  experience: ExhibitionExperience
  accent: string
  artifactLabel: string
  artifacts: string[]
  hasPrimaryCta: boolean
}

export type ExhibitionPillar = {
  title: string
  metric: string
  body: string
}

export type CapabilityPanel = {
  title: string
  body: string
  material: string
  details: string[]
}

export type CollectionWork = {
  title: string
  subtitle: string
  outcome: string
  body: string
  tags: string[]
}

const roomBlueprints: ExhibitionRoom[] = [
  {
    id: 'portal',
    label: 'Propylaea',
    navLabel: 'Propylaea',
    eyebrow: 'Entrance Sequence',
    title: '태동은 시대를 번역해 공간으로 세운다.',
    lede: '거대한 석재 문을 지나며 브랜드의 첫 장면을 만나는 입장 구간.',
    description:
      '스크롤이 곧 전진이 되도록 설계된 인트로. 방문자는 단순히 홈페이지를 보는 것이 아니라 태동의 전시관에 들어간다.',
    experience: 'immersive',
    accent: 'Aegean Blue',
    artifactLabel: 'Portal Signals',
    artifacts: ['Brand Memory', 'Spatial Scroll', 'Quiet Monumentality'],
    hasPrimaryCta: false,
  },
  {
    id: 'origin',
    label: 'Origin Hall',
    navLabel: 'Origin Hall',
    eyebrow: 'Origin Hall',
    title: '전략과 설계와 구축과 운영이 하나의 문법이 된다.',
    lede: '태동의 철학을 4개의 전시물로 해석하는 기원의 홀.',
    description:
      '서비스 소개를 나열하지 않고, 태동이 어떤 방식으로 문제를 구조화하는지 전시 해설처럼 보여준다.',
    experience: 'immersive',
    accent: 'Marble White',
    artifactLabel: 'Foundations',
    artifacts: ['Strategy', 'Structure', 'Build', 'Operation'],
    hasPrimaryCta: false,
  },
  {
    id: 'atelier',
    label: 'Atelier',
    navLabel: 'Atelier',
    eyebrow: 'Making Chamber',
    title: '태동의 역량은 기능 목록이 아니라 제작의 풍경이다.',
    lede: '브랜드 웹, 제품 구축, 시스템 설계, 운영 자동화를 조각 전시처럼 배치하는 방.',
    description:
      '중반부터는 실제 역량을 전시품처럼 번역한다. 브랜드 세계관을 유지하면서도 현실적인 신뢰를 쌓는 구간이다.',
    experience: 'content',
    accent: 'Oxidized Bronze',
    artifactLabel: 'Craft Surfaces',
    artifacts: ['Brand Sites', 'Product Systems', 'Agentic Ops', 'Launch Cadence'],
    hasPrimaryCta: false,
  },
  {
    id: 'gallery',
    label: 'Collection',
    navLabel: 'Collection',
    eyebrow: 'Collection Gallery',
    title: '작업물은 포트폴리오가 아니라 증명된 장면들로 전시된다.',
    lede: '대표 사례를 하나의 컬렉션처럼 감상하는 갤러리.',
    description:
      '카드형 그리드 대신 작품 패널이 전면으로 떠오르는 방식으로 처리해, 사례 탐색조차 브랜드 경험의 일부가 되게 한다.',
    experience: 'content',
    accent: 'Obsidian Black',
    artifactLabel: 'Featured Works',
    artifacts: ['Marketing', 'Operations', 'Launch', 'Identity'],
    hasPrimaryCta: false,
  },
  {
    id: 'finale',
    label: 'Finale',
    navLabel: 'Finale',
    eyebrow: 'Dome Finale',
    title: '기억에 남는 브랜드는 설명보다 장면을 남긴다.',
    lede: '개방된 돔 공간에서 태동의 선언으로 마무리하는 피날레.',
    description:
      '전환 버튼을 과도하게 밀지 않고, 브랜드의 문장을 가장 크게 남기는 마지막 공간. 문의는 절제된 형태로만 제시한다.',
    experience: 'content',
    accent: 'Luminous Gold',
    artifactLabel: 'Final Resonance',
    artifacts: ['Brand Recall', 'Selective CTA', 'Quiet Confidence'],
    hasPrimaryCta: true,
  },
]

export const exhibitionPillars: ExhibitionPillar[] = [
  {
    title: '전략',
    metric: '01',
    body: '브랜드의 방향과 문제의 우선순위를 먼저 정리해, 멋보다 구조가 앞서도록 만든다.',
  },
  {
    title: '설계',
    metric: '02',
    body: '정보 구조와 사용자 흐름을 시각 언어와 함께 설계해, 경험 전체가 하나의 리듬을 갖게 한다.',
  },
  {
    title: '구축',
    metric: '03',
    body: 'Next.js 기반 구현과 인터랙션을 통해 개념을 실제 성능과 동작으로 완성한다.',
  },
  {
    title: '운영',
    metric: '04',
    body: '배포 이후의 운영 자동화와 개선 루프까지 연결해 일회성 결과물로 끝나지 않게 한다.',
  },
]

export const capabilityPanels: CapabilityPanel[] = [
  {
    title: 'Brand Web',
    body: '기억에 남는 인상과 명확한 메시지를 동시에 만드는 브랜드 사이트 설계.',
    material: 'Limestone',
    details: ['Narrative landing', 'Motion system', 'Responsive polish'],
  },
  {
    title: 'Product Build',
    body: '실사용 제품의 복잡도를 감당하는 구조 설계와 화면 구현.',
    material: 'Bronze Frame',
    details: ['App router', 'Type-safe UI', 'Composable sections'],
  },
  {
    title: 'System Design',
    body: '브랜드와 서비스가 함께 자라도록 데이터, 운영, 인터페이스를 연결한다.',
    material: 'Obsidian Slab',
    details: ['Architecture map', 'Shared primitives', 'Content model'],
  },
  {
    title: 'Agentic Ops',
    body: '반복 업무를 줄이고 팀의 리듬을 유지하는 자동화 기반을 설계한다.',
    material: 'Aegean Alloy',
    details: ['Workflow scripts', 'Execution rails', 'Review loops'],
  },
]

export const collectionWorks: CollectionWork[] = [
  {
    title: 'FORMA',
    subtitle: 'Luxury consulting presence',
    outcome: '고급 컨설팅 인상과 구조적 신뢰를 동시에 전달하는 브랜드 웹 경험.',
    body: '화이트 스톤 기반 미감과 에디토리얼 타이포를 통해 제품보다 먼저 태도를 기억하게 만드는 사례.',
    tags: ['Brand', 'Editorial', 'Motion'],
  },
  {
    title: 'NEXUS',
    subtitle: 'Multi-platform analysis SaaS',
    outcome: '복잡한 기술 분석 시스템을 신뢰 가능한 인터페이스로 번역하는 방향성.',
    body: '대시보드와 분석 경험이 서로 분리되지 않도록 구조와 서사를 함께 설계한 제품 사례.',
    tags: ['SaaS', 'System', 'Product'],
  },
  {
    title: 'Automation Stack',
    subtitle: 'Operational choreography',
    outcome: '반복 업무를 줄이고 산출물의 일관성을 높이는 운영 자동화 레이어.',
    body: '에이전트 협업, 보고서 파이프라인, 리뷰 루프를 한 팀의 동선처럼 정리한 내부 시스템.',
    tags: ['Ops', 'Automation', 'Workflow'],
  },
]

export function buildExhibitionRooms(): ExhibitionRoom[] {
  return roomBlueprints.map((room) => ({ ...room }))
}

export function buildExhibitionNavigation(rooms = buildExhibitionRooms()) {
  return rooms.map(({ id, navLabel: label }) => ({ id, label }))
}
