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
      <div
        className="desktop-story-rail"
        style={{
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
        }}
      >
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
      <div
        className="desktop-scroll-hint"
        style={{
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
        }}
      >
        <span>SCROLL</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>

      {/* Persistent Right Geometric Chicken Watermark Graphic */}
      <div
        className="chicken-watermark"
        style={{
          position: 'fixed',
          bottom: '2vh',
          right: '3vw',
          zIndex: 15,
          pointerEvents: 'none',
          opacity: 0.85,
          filter: 'drop-shadow(0 0 20px rgba(163, 230, 53, 0.25))',
          transition: 'all 0.3s ease',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 240 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        >
          <g transform="translate(240, 0) scale(-1, 1)">
            {/* Comb (Proud crest) */}
            <path d="M135 44 L142 16 L154 28 L168 10 L180 26 L194 16 L190 46" stroke="#a3e635" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Head & Beak */}
            <path d="M135 44 C148 42 168 42 182 46 C190 48 196 54 198 62 L220 68 L196 76 C194 84 186 92 178 96" stroke="#a3e635" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Eye */}
            <circle cx="172" cy="60" r="3.5" fill="#a3e635" />
            
            {/* Wattle */}
            <path d="M188 78 C196 88 194 104 182 110 C172 114 168 102 172 90" stroke="#a3e635" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Breast & Underbelly */}
            <path d="M178 96 C198 126 202 168 176 206 C155 232 120 236 94 220" stroke="#a3e635" strokeWidth="3.2" strokeLinecap="round" />
            
            {/* Neck & Back */}
            <path d="M135 44 C122 70 112 108 106 142 C98 152 92 158 92 165" stroke="#a3e635" strokeWidth="3.2" strokeLinecap="round" />
            
            {/* Wing Contour */}
            <path d="M128 128 C158 130 178 148 168 185 C158 212 130 218 108 206 C104 180 112 145 128 128 Z" stroke="#a3e635" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Internal Feather Chevrons */}
            <path d="M136 146 L152 164 L134 180" stroke="#a3e635" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M124 158 L142 176 L124 194" stroke="#a3e635" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Sweeping Tail Feathers */}
            <path d="M92 165 C75 110 50 62 26 42 C16 32 20 22 34 30 C58 44 80 85 92 145" stroke="#a3e635" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M82 172 C60 128 35 88 18 70 C8 62 14 52 26 60 C48 76 70 115 80 165" stroke="#a3e635" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M74 185 C52 148 28 118 14 102 C6 95 10 86 22 94 C42 108 62 142 70 182" stroke="#a3e635" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M68 200 C50 176 30 152 18 138 C12 132 16 124 26 130 C42 142 58 172 65 200" stroke="#a3e635" strokeWidth="2.2" strokeLinecap="round" />
            
            {/* Legs & Feet */}
            {/* Back Leg */}
            <path d="M112 216 L108 268" stroke="#a3e635" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M108 268 L92 280" stroke="#a3e635" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M108 268 L108 285" stroke="#a3e635" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M108 268 L124 280" stroke="#a3e635" strokeWidth="2.6" strokeLinecap="round" />
            {/* Front Leg */}
            <path d="M138 214 L142 272" stroke="#a3e635" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M142 272 L124 286" stroke="#a3e635" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M142 272 L142 292" stroke="#a3e635" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M142 272 L160 286" stroke="#a3e635" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M142 260 L152 254" stroke="#a3e635" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Scrolling Foreground Storytelling Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {children}
      </div>

      <style jsx>{`
        .chicken-watermark {
          width: 210px;
          height: 280px;
        }

        @media (max-width: 900px) {
          .desktop-story-rail {
            left: 0.75rem !important;
            transform: translateY(-50%) scale(0.85) !important;
          }
          .desktop-scroll-hint {
            left: 1rem !important;
            bottom: 1.5rem !important;
          }
        }

        @media (max-width: 768px) {
          .desktop-story-rail,
          .desktop-scroll-hint {
            display: none !important;
          }
          .chicken-watermark {
            width: 105px !important;
            height: 140px !important;
            opacity: 0.45 !important;
            right: 2vw !important;
            bottom: 1.5vh !important;
          }
        }

        @media (max-width: 480px) {
          .chicken-watermark {
            width: 80px !important;
            height: 108px !important;
            opacity: 0.35 !important;
          }
        }
      `}</style>
    </div>
  );
}
