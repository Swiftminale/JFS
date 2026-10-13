'use client';

import Link from 'next/link';

interface NavbarProps {
  siteName: string;
  tagline?: string;
  theme?: 'dark-forest' | 'dark-coffee' | 'transparent';
  isCoffeePage?: boolean;
}

export default function Navbar({
  siteName,
  tagline = 'FEED & COFFEE EXPORT',
  isCoffeePage = false
}: NavbarProps) {
  return (
    <header style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '2rem 3rem 1rem',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1440px',
        margin: '0 auto',
      }}>
        {/* Brand Logo & Tagline */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          textDecoration: 'none',
        }}>
          {/* Logo badge */}
          <div style={{
            backgroundColor: '#ffffff',
            padding: '5px 8px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <img
              src="/logo.png"
              alt="JFS Trading Logo"
              style={{
                height: '34px',
                width: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}>
              {siteName}
            </span>
            <span style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              color: '#a3e635',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>
              {tagline}
            </span>
          </div>
        </Link>

        {/* Minimalist Navigation Links matching reference UI */}
        <nav>
          <ul style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}>
            <li>
              <a href="#about" style={{
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.9,
                transition: 'opacity 0.2s',
              }}>
                WHO WE ARE
              </a>
            </li>
            <li>
              <a href="#services" style={{
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.9,
                transition: 'opacity 0.2s',
              }}>
                OUR SERVICES
              </a>
            </li>
            <li>
              <Link href="/coffee" style={{
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: isCoffeePage ? 800 : 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.9,
                transition: 'opacity 0.2s',
              }}>
                COFFEE EXPORT
              </Link>
            </li>
            <li>
              <a href="#contact" style={{
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.9,
                transition: 'opacity 0.2s',
              }}>
                CONTACT US
              </a>
            </li>
            {/* Region / Language pill */}
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '0.08em',
            }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: '#a3e635', borderRadius: '50%' }}></span>
              <span>ET</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
