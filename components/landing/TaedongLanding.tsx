import {
  buildExhibitionRooms,
  capabilityPanels,
  collectionWorks,
  exhibitionPillars,
} from '@/lib/taedong-exhibition'

import { TaedongAtelierHall } from '@/components/landing/TaedongAtelierHall'
import { TaedongCollectionHall } from '@/components/landing/TaedongCollectionHall'
import { TaedongFinaleHall } from '@/components/landing/TaedongFinaleHall'
import { TaedongLandingNav } from '@/components/landing/TaedongLandingNav'
import { TaedongOriginHall } from '@/components/landing/TaedongOriginHall'
import { TaedongPortalHero } from '@/components/landing/TaedongPortalHero'

const rooms = buildExhibitionRooms()

export function TaedongLanding() {
  const [portalRoom, originRoom, atelierRoom, galleryRoom, finaleRoom] = rooms

  return (
    <div className="relative overflow-x-clip bg-[#05080d] text-[#f8f4ed]">
      <TaedongLandingNav />

      <main>
        <TaedongPortalHero room={portalRoom} />
        <TaedongOriginHall room={originRoom} pillars={exhibitionPillars} />
        <TaedongAtelierHall room={atelierRoom} capabilities={capabilityPanels} />
        <TaedongCollectionHall room={galleryRoom} works={collectionWorks} />
        <TaedongFinaleHall room={finaleRoom} />
      </main>
    </div>
  )
}
