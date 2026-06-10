import type { Metadata } from 'next'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ContactModal } from '@/components/ui/ContactModal'
import { InsightsHero } from '@/components/sections/insights/InsightsHero'
import { InsightGrid } from '@/components/sections/insights/InsightGrid'

export const metadata: Metadata = {
  title: 'Insights — FORMA by Taedong',
  description:
    '엔지니어링, 케이스 스터디, AI 에이전트, 팀 노트 — 태동 스튜디오가 기록하는 작업 노트.',
  openGraph: {
    title: 'Insights — FORMA by Taedong',
    description: 'Notes on building the web, from error to form.',
    type: 'website',
  },
}

function InsightsPage() {
  return (
    <>
      <FloatingNav />
      <ScrollProgress />
      <ContactModal />
      <main>
        <InsightsHero />
        <InsightGrid />
      </main>
      <Footer />
    </>
  )
}

export { InsightsPage as default }
