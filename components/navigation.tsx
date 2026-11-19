'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const sections = [
  ['Work', 'work'],
  ['About', 'about'],
  ['Contact', 'contact'],
];

export function Navigation({ contact }: { contact: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) setOpen(false);
    }
    const desktop = matchMedia('(min-width: 701px)');
    function dismissOnDesktop() { if (desktop.matches) setOpen(false); }
    desktop.addEventListener('change', dismissOnDesktop);
    document.addEventListener('keydown', dismissOnEscape);
    document.addEventListener('pointerdown', dismissOutside);
    return () => {
      desktop.removeEventListener('change', dismissOnDesktop);
      document.removeEventListener('keydown', dismissOnEscape);
      document.removeEventListener('pointerdown', dismissOutside);
    };
  }, [open]);

  const prefix = path === '/' ? '' : '/';
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link href={path === '/' ? '#top' : '/'} className="brand" aria-label="K/HS. — Koushik HS home" onClick={() => setOpen(false)}>
          K<span>/</span>HS<span>.</span>
        </Link>
        <div className="nav-disclosure" ref={menu}>
          <button className="menu-toggle label" ref={toggle} aria-expanded={open}
            aria-controls="primary-nav" onClick={() => setOpen(!open)} type="button">
            {open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span>
          </button>
          <nav className="primary-nav label" data-open={open} id="primary-nav" aria-label="Primary">
            {sections.map(([label, id]) => (
              <Link key={id} href={`${prefix}#${id}`} onClick={() => {
                setOpen(false);
                if (open && path === '/') {
                  const target = document.getElementById(id);
                  if (target instanceof HTMLElement) target.focus({ preventScroll: true });
                }
              }}>{label}</Link>
            ))}
          </nav>
        </div>
        <a className="nav-contact label" href={contact}>Let’s talk <span aria-hidden="true">↗︎</span></a>
      </div>
    </header>
  );
}
