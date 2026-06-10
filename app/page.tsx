import type { Metadata } from 'next'

import { TaedongLanding } from '@/components/landing/TaedongLanding'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export const metadata: Metadata = {
  title: '태동 | 고대 전시관 랜딩',
  description:
    '고대 그리스 전시관을 걷듯 스크롤하며 태동의 철학, 제작 역량, 컬렉션을 경험하는 몰입형 메인 랜딩 페이지.',
  keywords: ['태동', 'Taedong', '브랜드 랜딩', '인터랙티브 웹', '전시형 홈페이지'],
  openGraph: {
    title: '태동 | 고대 전시관 랜딩',
    description:
      '전시관을 이동하듯 브랜드를 경험하는 태동의 몰입형 메인 페이지.',
    siteName: 'Taedong',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <TaedongLanding />
    </>
  )
}
