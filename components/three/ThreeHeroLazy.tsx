'use client'
import dynamic from 'next/dynamic'

export const ThreeHeroLazy = dynamic(
  () => import('./ThreeHero').then(m => ({ default: m.ThreeHero })),
  { ssr: false },
)
