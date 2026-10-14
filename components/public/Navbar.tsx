'use client';

import React, { useState, useEffect } from 'react';
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
  isCoffeePage = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem 1.5rem' : '1.25rem 1.5rem',
          backgroundColor: scrolled
            ? isCoffeePage
              ? 'rgba(26, 17, 15, 0.94)'
              : 'rgba(12, 21, 17, 0.94)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none',
          transition: 'background-color 0.3s ease, padding 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        className="navbar-header"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Brand Logo & Tagline */}
          <Link
            href="/"
            onClick={closeMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              minWidth: 0,
            }}
          >
            <div
              style={{
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src="/logo.png"
                alt="JFS Trading Logo"
                style={{
                  height: '34px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {siteName}
              </span>
              <span
                style={{
                  fontSize: '0.575rem',
                  fontWeight: 600,
                  color: '#a3e635',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'none' }}>
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.25rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <a
                  href="#about"
                  style={{
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                  }}
                >
                  WHO WE ARE
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  style={{
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                  }}
                >
                  OUR SERVICES
                </a>
              </li>
              <li>
                <Link
                  href="/coffee"
                  style={{
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: isCoffeePage ? 800 : 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                  }}
                >
                  COFFEE EXPORT
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  style={{
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                  }}
                >
                  CONTACT US
                </a>
              </li>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.7)',
                  letterSpacing: '0.08em',
                }}
              >
                <span style={{ width: '6px', height: '6px', backgroundColor: '#a3e635', borderRadius: '50%' }} />
                <span>ET</span>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="mobile-menu-btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '42px',
              height: '42px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '8px',
              cursor: 'pointer',
              zIndex: 110,
              padding: 0,
              transition: 'background-color 0.2s ease',
            }}
          >
            <span
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: '#ffffff',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: '#a3e635',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: '#ffffff',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Full-Screen Glassmorphic Mobile Drawer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 95,
          backgroundColor: 'rgba(8, 14, 11, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '6.5rem 2rem 3rem',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#a3e635',
            }}
          >
            NAVIGATION MENU
          </span>

          <nav>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <li>
                <Link
                  href="/#landing"
                  onClick={closeMenu}
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span>Home</span>
                  <span style={{ fontSize: '1rem', color: '#a3e635' }}>01</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/#about"
                  onClick={closeMenu}
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span>Who We Are</span>
                  <span style={{ fontSize: '1rem', color: '#a3e635' }}>02</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/#services"
                  onClick={closeMenu}
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span>Our Services</span>
                  <span style={{ fontSize: '1rem', color: '#a3e635' }}>03</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/coffee"
                  onClick={closeMenu}
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: isCoffeePage ? '#e58e37' : '#ffffff',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span>Coffee Export</span>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(229, 142, 55, 0.2)', color: '#e58e37', fontWeight: 800 }}>SPECIALTY</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/#contact"
                  onClick={closeMenu}
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span>Contact Us</span>
                  <span style={{ fontSize: '1rem', color: '#a3e635' }}>04</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Drawer Footer Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a
            href="tel:+251911400328"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.9rem',
              borderRadius: '8px',
              backgroundColor: '#a3e635',
              color: '#0c1511',
              fontWeight: 800,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(163, 230, 53, 0.3)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call +251 91 140 0328</span>
          </a>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'rgba(255, 255, 255, 0.55)',
              fontSize: '0.8rem',
            }}
          >
            <span>Addis Ababa, Ethiopia</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#a3e635' }} />
              ET
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Media Query for Navbar */}
      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .navbar-header {
            padding-left: 3rem !important;
            padding-right: 3rem !important;
          }
        }
      `}</style>
    </>
  );
}
