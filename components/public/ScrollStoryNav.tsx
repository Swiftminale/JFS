'use client';

import React, { useState, useEffect } from 'react';

interface ScrollStoryNavProps {
  children: React.ReactNode;
  backgroundImages?: {
    '01': string;
    '02': string;
    '03': string;
    '04': string;
  };
}

export default function ScrollStoryNav({ children, backgroundImages }: ScrollStoryNavProps) {
  const [activeSection, setActiveSection] = useState<'01' | '02' | '03' | '04'>('01');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const sec1 = document.getElementById('landing');
      const sec2 = document.getElementById('about');
      const sec3 = document.getElementById('services');
      const sec4 = document.getElementById('contact');

      const triggerPoint = scrollY + windowHeight * 0.45;

      if (sec4 && triggerPoint >= sec4.offsetTop) {
        setActiveSection('04');
      } else if (sec3 && triggerPoint >= sec3.offsetTop) {
        setActiveSection('03');
      } else if (sec2 && triggerPoint >= sec2.offsetTop) {
        setActiveSection('02');
      } else {
        setActiveSection('01');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { badge: '01', id: 'landing' },
    { badge: '02', id: 'about' },
    { badge: '03', id: 'services' },
    { badge: '04', id: 'contact' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Fixed Fullscreen Background Stage with Smooth Cinematic Cross-Fade */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#0c1511',
      }}>
        {backgroundImages && Object.entries(backgroundImages).map(([badge, url]) => {
          const isActive = activeSection === badge;
          return (
            <div
              key={badge}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1)' : 'scale(1.05)',
                transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 1.6s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'opacity, transform',
              }}
            >
              <img
                src={url}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          );
        })}

        {/* Global Dark Radial & Linear Vignettes */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(16, 26, 21, 0.35) 0%, rgba(10, 18, 14, 0.86) 100%)',
          zIndex: 2,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,18,14,0.7) 0%, rgba(10,18,14,0.2) 20%, rgba(10,18,14,0.35) 80%, rgba(10,18,14,0.92) 100%)',
          zIndex: 3,
        }} />
      </div>

      {/* Persistent Left Indicator Rail */}
      <div style={{
        position: 'fixed',
        left: '2.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        pointerEvents: 'auto',
      }}>
        {navItems.map((item) => {
          const isActive = activeSection === item.badge;
          return (
            <button
              key={item.badge}
              onClick={() => scrollTo(item.id)}
              aria-label={`Scroll to section ${item.badge}`}
              style={{
                background: 'none',
                border: 'none',
                color: isActive ? '#a3e635' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.4rem',
                transition: 'all 0.3s ease',
              }}
            >
              {isActive ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(163, 230, 53, 0.15)',
                  border: '1px solid rgba(163, 230, 53, 0.5)',
                  boxShadow: '0 0 15px rgba(163, 230, 53, 0.25)',
                }}>
                  {/* Emblem Icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L12 22" />
                    <path d="M17 7L12 12" />
                    <path d="M7 7L12 12" />
                    <path d="M17 13L12 18" />
                    <path d="M7 13L12 18" />
                  </svg>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                    {item.badge}
                  </span>
                </div>
              ) : (
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  opacity: 0.6,
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Floating Bottom Left "SCROLL ↓" */}
      <div style={{
        position: 'fixed',
        bottom: '2.5rem',
        left: '2.8rem',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.625rem',
        letterSpacing: '0.2em',
        fontWeight: 700,
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        <span>SCROLL</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>

      {/* Persistent Right Geometric Wheat Watermark Graphic */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        right: '3vw',
        zIndex: 15,
        pointerEvents: 'none',
        opacity: 0.85,
        filter: 'drop-shadow(0 0 20px rgba(163, 230, 53, 0.25))',
      }}>
        <svg
          width="210"
          height="420"
          viewBox="0 0 160 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M80 320V20" stroke="#a3e635" strokeWidth="3" strokeLinecap="round" />
          <polygon points="80,10 92,26 80,42 68,26" stroke="#a3e635" strokeWidth="3" fill="none" />
          <path d="M48 64L80 96L112 64" stroke="#a3e635" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="80" y1="42" x2="80" y2="96" stroke="#a3e635" strokeWidth="3" />
          <path d="M40 108L80 148L120 108" stroke="#a3e635" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 156L80 202L126 156" stroke="#a3e635" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 208L80 258L130 208" stroke="#a3e635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 264L80 314L130 264" stroke="#a3e635" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Scrolling Foreground Storytelling Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}
