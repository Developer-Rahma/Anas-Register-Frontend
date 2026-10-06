'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';

export function SiteHeader({ activePath, compact = false }: { activePath?: string; compact?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return <header className="site-header" dir="rtl">
    <Link href="/" className="wordmark" aria-label="أنس - الرئيسية" data-testid="link-home">أنس<span className="brand-dot">.</span></Link>
    <button className="mobile-menu icon-button" aria-label="فتح القائمة" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu"><Menu size={22} /></button>
    <nav className={`site-nav ${menuOpen ? 'nav-open' : ''}`}>
      {!compact && <>
        <Link href="/" className={activePath === '/' ? 'active' : undefined}>الرئيسية</Link>
        <Link href="/about" className={activePath === '/about' ? 'active' : undefined}>عن أنس</Link>
        <Link href="/#steps">كيف نسجل؟</Link>
        <Link href="/contact" className={activePath === '/contact' ? 'active' : undefined}>تواصل معنا</Link>
      </>}
      <Link href="/register" className="button button-primary header-cta" data-testid="link-start-registration">سجّل نشاطك</Link>
      {!compact && <Link href="/admin" className="admin-link" data-testid="link-admin">إدارة الحصر</Link>}
    </nav>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer" dir="rtl">
    <Link href="/" className="wordmark">أنس<span className="brand-dot">.</span><small>مؤسسة أنس للتنمية البيئية والمجتمعية</small></Link>
    <div className="footer-links">
      <Link href="/about">عن أنس</Link>
      <Link href="/register">التسجيل</Link>
      <button onClick={() => window.dispatchEvent(new Event('open-privacy'))}>الخصوصية</button>
      <Link href="/contact">تواصل معنا</Link>
    </div>
    <a className="footer-whatsapp" href="https://wa.me/201030609048" target="_blank" rel="noreferrer"><Phone size={16} /> واتساب 01030609048</a>
  </footer>;
}
