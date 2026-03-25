// lib/portfolio-data.ts
export type PortfolioItem = {
  index:      string
  name:       string
  nameEn?:    string
  url?:       string
  tags:       string[]
  thumbnail?: string
  isLive:     boolean
}

export const portfolioItems: PortfolioItem[] = [
  {
    index:     '01',
    name:      '성벽종합건설',
    nameEn:    'Sungbyuk Construction',
    url:       'https://sungbyuk.vercel.app',
    tags:      ['Next.js 16', 'Tailwind v4', 'Vercel'],
    thumbnail: undefined,
    isLive:    true,
  },
  { index: '02', name: 'Project 02', tags: [], isLive: false },
  { index: '03', name: 'Project 03', tags: [], isLive: false },
  { index: '04', name: 'Project 04', tags: [], isLive: false },
  { index: '05', name: 'Project 05', tags: [], isLive: false },
]
