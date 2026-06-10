import type { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/services/ServicesHero'
import { ServicePackageList } from '@/components/sections/services/ServicePackageList'
import { ContactModal } from '@/components/ui/ContactModal'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { servicePackages } from '@/lib/data/services'

export const metadata: Metadata = {
  title: 'Services — FORMA by Taedong',
  description:
    '기업 웹 리뉴얼, 대시보드 SaaS 구축, 유지보수 SRE까지 — FORMA by Taedong의 풀스택 웹 컨설팅 패키지 3종.',
  openGraph: {
    title: 'Services — FORMA by Taedong',
    description: '기업 웹·SaaS·운영 3단계 컨설팅 패키지.',
    type: 'website',
  },
}

function ServicesPage() {
  return (
    <>
      <FloatingNav />
      <ScrollProgress />
      <ContactModal />
      <main>
        <ServicesHero />
        <ServicePackageList items={servicePackages} />
      </main>
      <Footer />
    </>
  )
}

export { ServicesPage as default }
