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
            <p className="font-mono text-[13px] tracking-[4px] text-[#ededed] font-bold mb-1.5">
              FORMA<span style={{ color: 'var(--color-gold)' }}>.</span>
            </p>
            <p className="font-mono text-[10px] tracking-[2px] text-zinc-600">
              by Taedong
            </p>
          </div>
          <nav aria-label="푸터 내비게이션">
            <ul style={{ display: 'flex', gap: 24, listStyle: 'none', flexWrap: 'wrap', padding: 0, margin: 0 }}>
              {(['#work', '#story', '#service', '#contact'] as const).map((href, i) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-mono text-[10px] tracking-widest uppercase text-zinc-600 no-underline transition-colors hover:text-[#ededed] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
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
              className="font-mono text-[11px] tracking-[1px] text-zinc-600 no-underline transition-colors hover:text-[#ededed] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            >
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@forma.kr'}
            </a>
            <p className="font-mono text-[10px] tracking-widest uppercase text-zinc-600 mt-1">
              © {currentYear} FORMA by Taedong
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
