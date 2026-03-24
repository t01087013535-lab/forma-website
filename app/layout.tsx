import type { Metadata } from 'next'
import { LazyMotion, domAnimation } from 'framer-motion'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'FORMA by Taedong — 풀스택 웹 컨설팅',
  description: '오류에서 설계로, 설계에서 완성으로. 기업과 사업체를 위한 풀스택 웹 컨설팅.',
  openGraph: {
    title: 'FORMA by Taedong',
    description: '풀스택 웹 컨설팅 — 기획부터 배포까지',
    siteName: 'FORMA',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
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
