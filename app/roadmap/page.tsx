import type { Metadata } from 'next'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ContactModal } from '@/components/ui/ContactModal'
import { RoadmapHero } from '@/components/sections/roadmap/RoadmapHero'
import { CurrentStateSection } from '@/components/sections/roadmap/CurrentStateSection'
import { StrategySection } from '@/components/sections/roadmap/StrategySection'
import { RoadmapTimeline } from '@/components/sections/roadmap/RoadmapTimeline'
import { KpiDashboard } from '@/components/sections/roadmap/KpiDashboard'
import { RoadmapCTA } from '@/components/sections/roadmap/RoadmapCTA'
import { roadmapPhases } from '@/lib/data/roadmap'

export const metadata: Metadata = {
  title: 'Road to Jensen Huang — Taedong 5-Year Roadmap',
  description:
    '태동그룹의 세 사업을 분석하고, NVIDIA 생태계 진입을 통해 5년 안에 젠슨 황과의 미팅에 도달하는 전략 로드맵.',
  robots: { index: false, follow: false },
}

function RoadmapPage() {
  return (
    <>
      <FloatingNav />
      <ScrollProgress />
      <ContactModal />
      <main>
        <RoadmapHero />
        <CurrentStateSection />
        <StrategySection />
        <RoadmapTimeline phases={roadmapPhases} />
        <KpiDashboard />
        <RoadmapCTA />
      </main>
      <Footer />
    </>
  )
}

export { RoadmapPage as default }
