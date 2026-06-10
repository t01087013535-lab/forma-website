'use client'

import { useEffect, useState } from 'react'

const DESKTOP_QUERY = '(min-width: 1024px)'

/**
 * Returns true only on desktop-width viewports. Defaults to false so SSR and the
 * first client render match the mobile layout, then upgrades after mount.
 * Used to disable scroll-jacking / pinning effects that break on small screens.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY)
    const update = () => setIsDesktop(mediaQuery.matches)

    update()
    mediaQuery.addEventListener('change', update)

    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return isDesktop
}
