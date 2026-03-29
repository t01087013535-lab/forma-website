import { LoadingOverlay } from '@/components/ui/LoadingOverlay'
import { FloatingNav }    from '@/components/nav/FloatingNav'
import { HeroSection }    from '@/components/sections/HeroSection'
import { OriginSection }  from '@/components/sections/OriginSection'
import { ValuesSection }  from '@/components/sections/ValuesSection'
import { WorkSection }    from '@/components/sections/WorkSection'
import { StorySection }   from '@/components/sections/StorySection'
import { ServiceSection } from '@/components/sections/ServiceSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ContactModal }   from '@/components/ui/ContactModal'
import { Footer }         from '@/components/layout/Footer'
import { ScrollReveal }   from '@/components/layout/ScrollReveal'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { SectionNav }     from '@/components/ui/SectionNav'

export default function HomePage() {
  return (
    <>
      <LoadingOverlay />
      <FloatingNav />
      <ScrollProgress />
      <SectionNav />
      <ContactModal />

      <main>
        {/* Hero — 자체 패럴랙스가 있으므로 subtle 강도 */}
        <ScrollReveal intensity="subtle">
          <HeroSection />
        </ScrollReveal>

        <ScrollReveal intensity="medium">
          <OriginSection />
        </ScrollReveal>

        <ScrollReveal intensity="medium">
          <WorkSection />
        </ScrollReveal>

        <ScrollReveal intensity="medium">
          <ValuesSection />
        </ScrollReveal>

        <ScrollReveal intensity="medium">
          <StorySection />
        </ScrollReveal>

        <ScrollReveal intensity="medium">
          <ServiceSection />
        </ScrollReveal>

        {/* Contact — 다크 섹션, subtle 로 안정적 전환 */}
        <ScrollReveal intensity="subtle">
          <ContactSection />
        </ScrollReveal>
      </main>

      <Footer />
    </>
  )
}
