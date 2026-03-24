import { FloatingNav }    from '@/components/nav/FloatingNav'
import { HeroSection }    from '@/components/sections/HeroSection'
import { WorkSection }    from '@/components/sections/WorkSection'
import { StorySection }   from '@/components/sections/StorySection'
import { ServiceSection } from '@/components/sections/ServiceSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer }         from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <FloatingNav />
      <main>
        <HeroSection />
        <WorkSection />
        <StorySection />
        <ServiceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
