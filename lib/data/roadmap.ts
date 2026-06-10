export type MilestoneCategory = 'product' | 'nvidia' | 'business' | 'brand'

export interface Milestone {
  id: string
  quarter: string
  title: string
  detail: string
  category: MilestoneCategory
  nvidiaTouchpoint?: string
}

export interface PhaseKpi {
  id: string
  label: string
  target: number
  suffix: string
  note?: string
}

export interface RoadmapPhase {
  id: string
  year: number
  calendarYears: string
  theme: string
  themeEn: string
  objective: string
  milestones: Milestone[]
  kpis: PhaseKpi[]
  exitCriteria: string
}

export const categoryLabels: Record<MilestoneCategory, string> = {
  product: '제품',
  nvidia: 'NVIDIA',
  business: '사업',
  brand: '브랜드',
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'year-1',
    year: 1,
    calendarYears: '2026–2027',
    theme: '기반 구축',
    themeEn: 'Foundation',
    objective:
      'NEXUS의 PMF를 검증하고, FORMA의 현금흐름으로 활주로를 고정한 뒤, NVIDIA 생태계의 공식 자격(Inception)을 확보한다.',
    milestones: [
      {
        id: 'y1-nexus-pmf',
        quarter: 'Y1 · Q1–Q2',
        title: 'NEXUS 유료 고객 5곳 확보',
        detail:
          '멀티플랫폼 기술 분석·시뮬레이션 SaaS의 PMF 검증. 건축·제조 설계 분석 파이프라인을 핵심 유스케이스로 좁혀 유료 전환율과 갱신 의사를 측정한다.',
        category: 'product',
      },
      {
        id: 'y1-forma-retainer',
        quarter: 'Y1 · Q1–Q4',
        title: 'FORMA 리테이너 2건으로 현금흐름 고정',
        detail:
          '기업 웹 리뉴얼·SRE 리테이너 패키지로 월 고정 매출을 만든다. 이 현금흐름이 NEXUS의 GPU 전환 투자와 5개년 실행의 활주로가 된다.',
        category: 'business',
      },
      {
        id: 'y1-inception',
        quarter: 'Y1 · Q2',
        title: 'NVIDIA Inception 프로그램 가입',
        detail:
          '법인 정비 후 가입 신청. Inception은 무료 스타트업 프로그램으로 심사 장벽이 낮고, 클라우드 GPU 크레딧·DLI 교육·VC Alliance 접근권을 제공한다. 생태계 진입의 첫 공식 자격.',
        category: 'nvidia',
        nvidiaTouchpoint: 'NVIDIA Inception 멤버십 — 생태계 공식 진입점',
      },
      {
        id: 'y1-cuda-sprint',
        quarter: 'Y1 · Q3–Q4',
        title: 'CUDA · RAPIDS 학습 스프린트',
        detail:
          'NEXUS 시뮬레이션 엔진의 GPU 가속 전환을 준비하는 기술 역량 축적. DLI(Deep Learning Institute) 크레딧을 활용해 인증 과정을 이수한다.',
        category: 'product',
      },
    ],
    kpis: [
      { id: 'y1-kpi-customers', label: 'NEXUS 유료 고객', target: 5, suffix: '곳' },
      { id: 'y1-kpi-retainer', label: 'FORMA 리테이너', target: 2, suffix: '건' },
      { id: 'y1-kpi-inception', label: 'Inception 가입', target: 1, suffix: '건' },
    ],
    exitCriteria: 'NEXUS 유료 갱신율 확보 + Inception 멤버십 승인',
  },
  {
    id: 'year-2',
    year: 2,
    calendarYears: '2027–2028',
    theme: '기술 침투',
    themeEn: 'GPU Adoption',
    objective:
      'NEXUS를 GPU 가속 제품으로 전환해 NVIDIA 기술 스택의 실사용 사례가 되고, GTC 현장에서 생태계 네트워크를 연다.',
    milestones: [
      {
        id: 'y2-gpu-engine',
        quarter: 'Y2 · Q1–Q2',
        title: '시뮬레이션 엔진 CUDA/RAPIDS 가속 v1 출시',
        detail:
          'NEXUS의 설계 분석·시뮬레이션 코어를 GPU 가속으로 재구축. 벤치마크(CPU 대비 처리 속도)를 수치화해 이후 모든 NVIDIA 접점에서 쓸 기술 증거를 만든다.',
        category: 'product',
        nvidiaTouchpoint: 'CUDA · RAPIDS 프로덕션 도입 사례',
      },
      {
        id: 'y2-nim-agent',
        quarter: 'Y2 · Q2–Q3',
        title: 'NIM 기반 분석 에이전트 통합',
        detail:
          'NVIDIA NIM 마이크로서비스로 추론 레이어를 구성해 멀티에이전트 분석 파이프라인에 통합. NVIDIA AI Enterprise 스택과의 호환 사례를 확보한다.',
        category: 'product',
        nvidiaTouchpoint: 'NIM 마이크로서비스 통합 레퍼런스',
      },
      {
        id: 'y2-gtc-attend',
        quarter: 'Y2 · Q1 (3월)',
        title: 'GTC 첫 참관 + Inception 네트워킹',
        detail:
          'GTC(GPU Technology Conference) 현장 참가. Inception 멤버 전용 세션·밋업에서 DevRel·파트너 매니저와 첫 대면 접점을 만든다. 목표는 발표가 아니라 지형 파악과 관계의 시작.',
        category: 'nvidia',
        nvidiaTouchpoint: 'GTC 현장 참가 — 첫 대면 네트워크',
      },
      {
        id: 'y2-content',
        quarter: 'Y2 · 연중',
        title: '기술 블로그 · 오픈소스 12편 발행',
        detail:
          'GPU 가속 전환 과정을 기술 콘텐츠로 공개. Automation Stack의 콘텐츠 라인(content 에이전트)을 활용해 발행 케이던스를 자동화한다. 검색 가능한 공개 표면이 이후 모든 심사의 레퍼런스가 된다.',
        category: 'brand',
      },
    ],
    kpis: [
      { id: 'y2-kpi-gpu', label: 'GPU 가속 기능 출시', target: 1, suffix: '건' },
      { id: 'y2-kpi-gtc', label: 'GTC 참가', target: 1, suffix: '회' },
      { id: 'y2-kpi-posts', label: '기술 콘텐츠 발행', target: 12, suffix: '편' },
    ],
    exitCriteria: 'GPU 가속 벤치마크 공개 + GTC 현장 네트워크 형성',
  },
  {
    id: 'year-3',
    year: 3,
    calendarYears: '2028–2029',
    theme: '생태계 안착',
    themeEn: 'Ecosystem',
    objective:
      'NVIDIA 측에서 "아는 회사"가 된다. 프로그램 혜택의 모범 활용 사례가 되고, 파트너 네트워크와 자본 시장에 동시 진입한다.',
    milestones: [
      {
        id: 'y3-case-study',
        quarter: 'Y3 · Q1–Q2',
        title: 'Inception 혜택 활용 성과의 사례화',
        detail:
          'GPU 크레딧·DLI로 만든 성과를 케이스 스터디로 정리해 Inception 팀에 공유. 프로그램의 모범 활용 사례는 NVIDIA 내부에서 회자될 명분이 된다.',
        category: 'nvidia',
        nvidiaTouchpoint: 'Inception 팀 대상 성과 케이스 공유',
      },
      {
        id: 'y3-partner-poc',
        quarter: 'Y3 · Q2–Q3',
        title: 'NVIDIA 코리아 파트너 공동 PoC 1건',
        detail:
          '국내 NVIDIA 파트너(리셀러·클라우드)와 건축·제조 고객 대상 공동 PoC를 수행. 파트너 채널은 본사 접점으로 가는 가장 현실적인 한국 경로다.',
        category: 'business',
        nvidiaTouchpoint: 'NVIDIA 코리아 파트너 채널 진입',
      },
      {
        id: 'y3-gtc-proposal',
        quarter: 'Y3 · Q3',
        title: 'GTC 세션 제안서 제출',
        detail:
          '"1인 운영자 + AI 에이전트 팀이 CUDA로 설계 시뮬레이션 SaaS를 만든 방법" — 벤치마크와 고객 사례를 갖춘 세션 제안. 채택되지 않아도 제출 이력 자체가 심사자와의 접점이 된다.',
        category: 'nvidia',
        nvidiaTouchpoint: 'GTC Call for Proposals 제출',
      },
      {
        id: 'y3-seed',
        quarter: 'Y3 · Q4',
        title: 'Inception VC Alliance 경유 시드 라운드 검토',
        detail:
          'NVIDIA 생태계 투자자 네트워크를 통한 자금 조달 검토. 투자 유치 자체보다, NVIDIA와 이해관계를 공유하는 자본이 들어오는 것이 전략적 의미를 가진다.',
        category: 'business',
      },
    ],
    kpis: [
      { id: 'y3-kpi-poc', label: '파트너 공동 PoC', target: 1, suffix: '건' },
      { id: 'y3-kpi-proposal', label: 'GTC 세션 제안', target: 1, suffix: '건' },
      { id: 'y3-kpi-arr', label: 'NEXUS ARR', target: 3, suffix: '억원', note: '목표치' },
    ],
    exitCriteria: '파트너 PoC 완료 + GTC 제안 제출 + ARR 성장 곡선 확보',
  },
  {
    id: 'year-4',
    year: 4,
    calendarYears: '2029–2030',
    theme: '공개 가시성',
    themeEn: 'Visibility',
    objective:
      'NVIDIA의 공식 표면에 등장한다. GTC 발표, Spotlight 등재, 미디어 커버리지로 "젠슨 황이 들어봤을 수 있는 회사"가 된다.',
    milestones: [
      {
        id: 'y4-gtc-talk',
        quarter: 'Y4 · Q1 (3월)',
        title: 'GTC 세션 · 포스터 발표',
        detail:
          '전년도 제출 이력과 누적 벤치마크를 기반으로 GTC 공식 세션 또는 포스터 발표를 성사. NVIDIA 공식 아카이브에 회사 이름이 남는 첫 순간.',
        category: 'nvidia',
        nvidiaTouchpoint: 'GTC 공식 발표 — NVIDIA 아카이브 등재',
      },
      {
        id: 'y4-spotlight',
        quarter: 'Y4 · Q2',
        title: 'Inception Spotlight · 사례 페이지 등재 시도',
        detail:
          'NVIDIA 블로그·Inception Spotlight에 고객 사례로 등재되기 위한 피칭. GTC 발표 이력이 있는 멤버는 선정 확률이 구조적으로 높아진다.',
        category: 'nvidia',
        nvidiaTouchpoint: 'NVIDIA 공식 채널 노출',
      },
      {
        id: 'y4-media',
        quarter: 'Y4 · 연중',
        title: '국내외 미디어 커버리지',
        detail:
          '"AI 에이전트 팀으로 운영되는 1인 기업의 GTC 발표" — 스토리 자체의 희소성으로 국내외 테크 미디어 커버리지를 확보. 외부 검증이 내부 챔피언의 추천 명분을 만든다.',
        category: 'brand',
      },
      {
        id: 'y4-champions',
        quarter: 'Y4 · 연중',
        title: 'NVIDIA 내부 챔피언 3인 관계 구축',
        detail:
          'DevRel·Inception 매니저·코리아 파트너 매니저 등 3인 이상과 지속 관계를 유지. 젠슨 황 미팅은 외부 요청이 아니라 내부 추천으로 성사된다.',
        category: 'business',
        nvidiaTouchpoint: '내부 추천 라인 확보',
      },
    ],
    kpis: [
      { id: 'y4-kpi-talk', label: 'GTC 발표', target: 1, suffix: '회' },
      { id: 'y4-kpi-champions', label: '내부 챔피언', target: 3, suffix: '인' },
      { id: 'y4-kpi-media', label: '미디어 커버리지', target: 5, suffix: '건' },
    ],
    exitCriteria: 'NVIDIA 공식 표면 등재 1건 + 내부 추천 가능 관계 3인',
  },
  {
    id: 'year-5',
    year: 5,
    calendarYears: '2030–2031',
    theme: '미팅 성사',
    themeEn: 'The Meeting',
    objective:
      '젠슨 황의 동선과 교차하는 공식 표면을 확보한다. 미팅을 요청하는 것이 아니라, 미팅이 자연스러운 위치에 도달한다.',
    milestones: [
      {
        id: 'y5-keynote-demo',
        quarter: 'Y5 · Q1',
        title: 'GTC · CES 키노트 데모 후보 지원',
        detail:
          '키노트 무대의 파트너 데모 슬롯에 지원. 젠슨 황이 직접 검토·언급하는 가장 확실한 단일 표면. 채택 확률은 낮지만 후보군 진입 자체가 본사 임원 라인과의 접점이다.',
        category: 'nvidia',
        nvidiaTouchpoint: '키노트 데모 후보 — 임원 라인 접점',
      },
      {
        id: 'y5-vip-events',
        quarter: 'Y5 · Q1–Q2',
        title: '젠슨 황 참석 행사 내 공식 접점',
        detail:
          'Inception 쇼케이스·GTC VIP 리셉션·기자간담회 등 젠슨 황이 실제 참석하는 행사에서 공식 자격(발표자·Spotlight 멤버)으로 참가. 4년간 쌓은 자격이 이 방의 입장권이 된다.',
        category: 'nvidia',
        nvidiaTouchpoint: '젠슨 황 동선 교차 — 공식 자격 참가',
      },
      {
        id: 'y5-proof',
        quarter: 'Y5 · Q2–Q3',
        title: '미팅의 명분이 되는 단일 성과 완성',
        detail:
          '대표 레퍼런스 고객 또는 업계 표준 벤치마크 1건을 완성. "왜 만나야 하는가"에 대한 한 문장 답변 — 이것이 없으면 어떤 접점도 미팅으로 전환되지 않는다.',
        category: 'product',
      },
      {
        id: 'y5-meeting',
        quarter: 'Y5 · Q4',
        title: '미팅 성사 — 또는 차기 5개년 갱신',
        detail:
          '내부 챔피언의 추천 + 공식 행사 접점 + 명분 있는 성과의 교집합에서 미팅을 제안. 성사되지 않으면 누적된 자산 위에서 차기 5개년 계획을 갱신한다. 이 로드맵의 자산은 미팅 여부와 무관하게 남는다.',
        category: 'business',
        nvidiaTouchpoint: '젠슨 황 미팅 제안',
      },
    ],
    kpis: [
      { id: 'y5-kpi-events', label: '공식 접점 행사', target: 2, suffix: '회' },
      { id: 'y5-kpi-meeting', label: '미팅 성사', target: 1, suffix: '건', note: '최종 목표' },
    ],
    exitCriteria: '미팅 성사 — 또는 누적 자산 기반 차기 5개년 계획 수립',
  },
]
