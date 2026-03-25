// components/layout/Footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer
      role="contentinfo"
      style={{ background: 'var(--color-dark-bg)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      className="py-12"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: 4, color: '#fff', fontWeight: 700, marginBottom: 6 }}>
              FORMA
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555' }}>
              by Taedong
            </p>
          </div>
          <nav aria-label="푸터 내비게이션">
            <ul style={{ display: 'flex', gap: 24, listStyle: 'none', flexWrap: 'wrap', padding: 0, margin: 0 }}>
              {(['#work', '#story', '#service', '#contact'] as const).map((href, i) => (
                <li key={href}>
                  <a
                    href={href}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#555', textDecoration: 'none' }}
                    className="transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] focus-visible:outline-none"
                  >
                    {(['WORK', 'STORY', 'SERVICE', 'CONTACT'] as const)[i]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div style={{ textAlign: 'right' }}>
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@forma.kr'}`}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1, color: '#666', textDecoration: 'none' }}
              className="transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] focus-visible:outline-none"
            >
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@forma.kr'}
            </a>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: '#333', marginTop: 4 }}>
              © {currentYear} FORMA by Taedong
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
