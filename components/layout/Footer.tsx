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
        color: '#333',
      }}
    >
      FORMA by Taedong · © 2026 · All rights reserved
    </footer>
  )
}
