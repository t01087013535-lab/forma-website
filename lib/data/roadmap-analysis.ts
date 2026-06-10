import type { PhaseKpi } from '@/lib/data/roadmap'

export interface BusinessUnit {
  id: 'forma' | 'nexus' | 'automation'
  index: string
  name: string
  role: string
  summary: string
  strengths: string[]
  gaps: string[]
  nvidiaRelevance: string
}

export interface StrategyPath {
  id: string
  index: string
  title: string
  body: string
  feasibility: '높음' | '중간' | '누적형'
  evidence: string
}

export interface ProbabilityStage {
  id: string
  stage: string
  probability: number
  note: string
}

export const businessUnits: BusinessUnit[] = [
  {
    id: 'forma',
    index: '01',
    name: 'FORMA by Taedong',
    role: 'Cash Engine',
    summary:
      '풀스택 웹 컨설팅 스튜디오. 기업 웹 리뉴얼·대시보드 SaaS 구축·SRE 리테이너의 3개 패키지로 운영되는 현금흐름 축.',
    strengths: [
      '전략–디자인–구현–운영의 일관된 4단계 방법론',
      '리테이너 구조의 반복 매출 — 장기 계획의 활주로',
      '레퍼런스 케이스(성벽 건축 렌더링 파이프라인) 보유',
    ],
    gaps: [
      '1인 운영자 의존 — 수주 확장 시 병목',
      'GPU·AI 인프라 영역 레퍼런스 부재',
      '해외 고객 접점 없음',
    ],
    nvidiaRelevance: 'NEXUS의 GPU 전환과 5개년 실행을 버티는 자금줄',
  },
  {
    id: 'nexus',
    index: '02',
    name: 'NEXUS',
    role: 'Entry Vehicle',
    summary:
      '멀티플랫폼 기술 자동 분석·시뮬레이션 B2B SaaS (FastAPI + Next.js). 설계 파일 분석과 시뮬레이션이 코어 — NVIDIA 생태계로 들어가는 기술적 진입 차량.',
    strengths: [
      '시뮬레이션·분석 코어가 GPU 가속과 구조적으로 정합',
      'LangGraph 멀티에이전트 파이프라인 내재화',
      '건축·제조 설계라는 명확한 버티컬',
    ],
    gaps: [
      'PMF 미검증 — 유료 고객 기반 없음',
      '현재 CPU 기반 — CUDA 전환 역량 미축적',
      'NVIDIA 생태계 내 인지도 전무',
    ],
    nvidiaRelevance: 'CUDA·NIM 도입 사례가 될 제품 — 모든 NVIDIA 접점의 기술 증거',
  },
  {
    id: 'automation',
    index: '03',
    name: 'Automation Stack',
    role: 'Leverage Layer',
    summary:
      'Claude 멀티에이전트 오케스트레이션 기반 내부 운영 체계. 1인 운영자가 콘텐츠·커뮤니티·그로스의 외부 표면을 에이전트 팀으로 가동한다.',
    strengths: [
      '1인이 팀 규모의 실행량을 내는 구조적 레버리지',
      '콘텐츠 발행·아웃리치의 케이던스 자동화',
      '그 자체가 희소한 스토리 — 미디어·발표 소재',
    ],
    gaps: [
      '외부 검증된 성과 지표 부재',
      '에이전트 운영 노하우의 제품화 미착수',
      '플랫폼 의존 리스크',
    ],
    nvidiaRelevance: '"AI 에이전트 팀의 1인 기업" 서사 — GTC 발표와 미디어의 차별화 축',
  },
]

export const strategyPaths: StrategyPath[] = [
  {
    id: 'inception',
    index: '01',
    title: 'NVIDIA Inception 프로그램',
    body:
      '무료 스타트업 지원 프로그램. GPU 크레딧, DLI 교육, VC Alliance, 마케팅 채널 접근권을 제공한다. 가입이 곧 생태계의 공식 신분증.',
    feasibility: '높음',
    evidence: '전 세계 2만+ 스타트업이 가입한 개방형 프로그램 — 심사 장벽이 낮다',
  },
  {
    id: 'developer',
    index: '02',
    title: '개발자 생태계 침투',
    body:
      'CUDA·RAPIDS·NIM을 NEXUS에 실제 도입하고 그 과정을 기술 콘텐츠로 공개한다. NVIDIA DevRel은 프로덕션 도입 사례를 상시 발굴한다.',
    feasibility: '중간',
    evidence: 'DevRel·GTC 세션 공모는 실사용 사례 중심으로 선정된다',
  },
  {
    id: 'partner',
    index: '03',
    title: '파트너 · 벤처 네트워크',
    body:
      'NVIDIA 코리아 파트너 채널과 Inception VC Alliance를 통해 본사로 이어지는 사람의 경로를 만든다. 한국에서 본사 임원 라인까지는 파트너 조직이 최단 경로다.',
    feasibility: '중간',
    evidence: '파트너 공동 PoC·VC 추천은 내부 챔피언 형성의 검증된 경로',
  },
  {
    id: 'surface',
    index: '04',
    title: '공개 표면의 누적',
    body:
      'GTC 발표, Spotlight 등재, 미디어 커버리지를 해마다 쌓는다. 젠슨 황 미팅은 단일 이벤트가 아니라 누적된 공개 표면이 임계점을 넘는 순간 성사된다.',
    feasibility: '누적형',
    evidence: '키노트 데모·VIP 행사 참가자는 공개 이력 기반으로 선별된다',
  },
]

export const summaryKpis: PhaseKpi[] = [
  { id: 'sum-touchpoints', label: '누적 NVIDIA 공식 접점', target: 9, suffix: '건', note: '5년 합산' },
  { id: 'sum-gtc', label: 'GTC 참가 · 발표', target: 4, suffix: '회', note: '참관 2 + 발표 2' },
  { id: 'sum-content', label: '기술 콘텐츠 발행', target: 48, suffix: '편', note: '연 12편 케이던스' },
  { id: 'sum-arr', label: 'NEXUS ARR 목표', target: 10, suffix: '억원', note: 'Y5 기준' },
]

export const probabilityModel: ProbabilityStage[] = [
  {
    id: 'p-inception',
    stage: 'NVIDIA Inception 가입',
    probability: 95,
    note: '개방형 프로그램 — 법인 요건 충족 시 사실상 확실',
  },
  {
    id: 'p-gpu',
    stage: 'GPU 가속 제품 출시',
    probability: 80,
    note: '기술 난이도는 있으나 자체 통제 가능한 변수',
  },
  {
    id: 'p-gtc',
    stage: 'GTC 세션 채택',
    probability: 40,
    note: '경쟁 공모 — 실사용 사례와 서사의 희소성이 변수',
  },
  {
    id: 'p-keynote',
    stage: '키노트 · 쇼케이스 노출',
    probability: 20,
    note: '소수 선발 — 발표 이력과 내부 추천이 전제 조건',
  },
  {
    id: 'p-meeting',
    stage: '5년 내 미팅 성사',
    probability: 20,
    note: '보수적 추정 15–25% — 매년 갱신하는 추정치',
  },
]
