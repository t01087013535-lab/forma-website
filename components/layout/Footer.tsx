// components/layout/Footer.tsx
export function Footer() {
  return (
    <footer
      className="py-8 text-center"
      style={{
        background: 'var(--color-dark-bg)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0 4px' }}>
        <span style={{ color: '#555' }}>FORMA by Taedong</span>
        <span style={{ color: '#222', margin: '0 12px' }}>·</span>
        <span style={{ color: '#333' }}>© 2026</span>
        <span style={{ color: '#222', margin: '0 12px' }}>·</span>
        <a
          href="mailto:hello@forma.kr"
          style={{ color: '#444' }}
          className="transition-colors hover:text-[#666]"
        >
          hello@forma.kr
        </a>
      </div>
    </footer>
  )
}
