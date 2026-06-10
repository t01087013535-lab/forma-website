import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ContactModal } from '@/components/ui/ContactModal'
import { WorkHero } from '@/components/sections/work/WorkHero'
import { WorkNarrative } from '@/components/sections/work/WorkNarrative'
import { WorkOutcome } from '@/components/sections/work/WorkOutcome'
import { WorkGallery } from '@/components/sections/work/WorkGallery'
import { WorkCTA } from '@/components/sections/work/WorkCTA'
import { adjacentWork, findWork, workCases } from '@/lib/data/work'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return workCases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const work = findWork(slug)
  if (!work) return { title: 'Work — FORMA by Taedong' }

  return {
    title: `${work.client} — FORMA by Taedong`,
    description: work.lede,
    openGraph: {
      title: `${work.client} — FORMA by Taedong`,
      description: work.lede,
      type: 'article',
    },
  }
}

async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params
  const work = findWork(slug)
  if (!work) notFound()

  const { prev, next } = adjacentWork(slug)

  return (
    <>
      <FloatingNav />
      <ScrollProgress />
      <ContactModal />
      <main>
        <WorkHero work={work} />
        <WorkNarrative challenge={work.challenge} approach={work.approach} />
        <WorkOutcome outcome={work.outcome} />
        <WorkGallery gallery={work.gallery} />
        <WorkCTA prev={prev} next={next} />
      </main>
      <Footer />
    </>
  )
}

export { WorkDetailPage as default }
