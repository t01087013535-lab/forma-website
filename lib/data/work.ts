export interface WorkCase {
  slug: string
  client: string
  title: string
  subtitle: string
  lede: string
  period: string
  role: string
  stack: string[]
  challenge: string
  approach: string
  outcome: { label: string; value: string; detail: string }[]
  gallery: { src: string; alt: string; ratio: '4/5' | '16/9' }[]
}

export const workCases: WorkCase[] = [
  {
    slug: 'sungbyuk',
    client: '성벽 건축',
    title: 'A cathedral, drawn twice.',
    subtitle: '성벽 건축 — 종교·공공·상업 복합 부지 시각화',
    lede:
      '실물 답사 없이도 의사결정이 가능한 수준으로, 교회·공공·상업 3개 동의 3D 모델을 포토리얼 렌더 시퀀스로 번역했습니다.',
    period: '2026.02 — 2026.04',
    role: 'Rendering Pipeline · Web Delivery',
    stack: ['rhino3dm', 'Krea API', 'Next.js 16', 'Tailwind v4', 'Vercel'],
    challenge:
      '3D 설계 데이터는 `.3dm` 파일로만 존재했고, 건축주가 의사결정에 쓸 수 있는 이미지 시퀀스를 만드는 데 매번 2주가 걸렸습니다. 외주 렌더링 의존도를 낮추고, 수정 요청이 있을 때 24시간 안에 새 이미지를 전달하는 것이 목표였습니다.',
    approach:
      'rhino3dm으로 .3dm 파일에서 뷰포트·머티리얼 메타데이터를 추출하고, Krea API에 프롬프트 템플릿과 함께 투입하는 파이프라인을 구축했습니다. 건축주 코멘트는 Notion 웹훅을 통해 파이프라인의 프롬프트 엔진으로 되돌아와, 같은 모델에서 톤·빛·계절만 바꿔 재렌더합니다.',
    outcome: [
      {
        label: '렌더 턴어라운드',
        value: '14일 → 18시간',
        detail: '첫 배치 기준. 수정 요청은 평균 6시간 내 재전달.',
      },
      {
        label: '전달 이미지 수',
        value: '3배',
        detail: '동일 예산 내 의사결정용 이미지 수 증가.',
      },
      {
        label: '외주 비용 절감',
        value: '− 62%',
        detail: '기존 렌더 외주 대비. 내부 인프라 + Krea 크레딧 기준.',
      },
    ],
    gallery: [
      { src: '/work/sungbyuk/church-1.webp', alt: '성벽 교회 외관 렌더 낮', ratio: '16/9' },
      { src: '/work/sungbyuk/church-2.webp', alt: '성벽 교회 내부 공간 렌더', ratio: '4/5' },
      { src: '/work/sungbyuk/public-1.webp', alt: '공공 동 전경 렌더 황혼', ratio: '16/9' },
      { src: '/work/sungbyuk/public-2.webp', alt: '공공 동 로비 디테일', ratio: '4/5' },
      { src: '/work/sungbyuk/commercial-1.webp', alt: '상업 동 거리 전경', ratio: '16/9' },
      { src: '/work/sungbyuk/commercial-2.webp', alt: '상업 동 내부 카페 공간', ratio: '4/5' },
    ],
  },
]

export function findWork(slug: string) {
  return workCases.find((c) => c.slug === slug)
}

export function adjacentWork(slug: string) {
  const idx = workCases.findIndex((c) => c.slug === slug)
  if (idx === -1) return { prev: undefined, next: undefined }
  const prev = idx > 0 ? workCases[idx - 1] : undefined
  const next = idx < workCases.length - 1 ? workCases[idx + 1] : undefined
  return { prev, next }
}
