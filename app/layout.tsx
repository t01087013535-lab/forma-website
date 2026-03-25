import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { LazyMotion, domAnimation } from 'framer-motion'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { PreloadResources } from '@/components/layout/PreloadResources'
import '@/app/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://forma-website-two.vercel.app'),
  title: 'FORMA by Taedong — 풀스택 웹 컨설팅',
  description: '오류에서 설계로, 설계에서 완성으로. 기업과 사업체를 위한 풀스택 웹 컨설팅. Next.js, Supabase, Vercel 기반 제작.',
  keywords: ['풀스택 웹 컨설팅', '웹개발', 'Next.js', 'Vercel', '태동', 'FORMA'],
  authors: [{ name: 'Taedong' }],
  openGraph: {
    title: 'FORMA by Taedong — 풀스택 웹 컨설팅',
    description: '오류에서 설계로, 설계에서 완성으로. 기업과 사업체를 위한 풀스택 웹 컨설팅.',
    siteName: 'FORMA by Taedong',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORMA by Taedong',
    description: '오류에서 설계로, 설계에서 완성으로. 기업과 사업체를 위한 풀스택 웹 컨설팅.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={playfair.variable}>
      <body>
        <PreloadResources />
        <LazyMotion features={domAnimation}>
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </LazyMotion>
      </body>
    </html>
  )
}
