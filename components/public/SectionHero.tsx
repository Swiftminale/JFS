'use client';

import React from 'react';
import Link from 'next/link';
import type { ScrollSectionItem } from '@/types/content';

interface SectionHeroProps {
  data: ScrollSectionItem;
  badgeNumber: string;
  dualCards?: {
    import: { tag: string; title: string; description: string; linkText: string; linkUrl: string };
    export: { tag: string; title: string; description: string; linkText: string; linkUrl: string };
  };
  children?: React.ReactNode;
}

export default function SectionHero({ data, badgeNumber, dualCards, children }: SectionHeroProps) {
  const hasExtra = !!(dualCards || children);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: hasExtra ? '100vh' : '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      padding: children ? '7.5rem 1.5rem 5.5rem' : dualCards ? '7rem 2rem 4rem' : '6rem 2rem',
      backgroundColor: 'transparent',
    }}>

      {/* Centerpiece Text & Content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        maxWidth: children ? '1140px' : '1080px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Category Pill */}
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.75)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <span style={{ width: '24px', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
          <span>{data.tag || 'AFRICAN PROVERB'}</span>
          <span style={{ width: '24px', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
        </div>

        {/* Large Editorial Headline Quote */}
        <h2 style={{
          fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: '#ffffff',
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
          maxWidth: '860px',
        }}>
          {data.quote}
        </h2>

        {/* Subtext */}
        {data.subtext && (
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '2rem',
            maxWidth: '640px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}>
            {data.subtext}
          </p>
        )}

        {/* Ghost CTA Button */}
        {data.buttonText && data.buttonLink && (
          <div style={{ marginBottom: hasExtra ? '2.5rem' : '0' }}>
            <a href={data.buttonLink} className="ghost-btn">
              {data.buttonText}
            </a>
          </div>
        )}

        {/* Integrated Import & Export Dual Highlight Cards directly inside Hero */}
        {dualCards && (
          <div style={{
            width: '100%',
            maxWidth: '960px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.75rem',
            textAlign: 'left',
            marginTop: '1rem',
          }}>
            {/* Import Card */}
            <article style={{
              backgroundColor: 'rgba(14, 24, 19, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderTop: '4px solid #a3e635',
              padding: '2rem 1.75rem',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
              color: '#ffffff',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#a3e635',
                display: 'block',
                marginBottom: '0.65rem'
              }}>
                {dualCards.import.tag}
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.6rem', color: '#ffffff', lineHeight: 1.25 }}>
                {dualCards.import.title}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.55 }}>
                {dualCards.import.description}
              </p>
              <a href={dualCards.import.linkUrl} style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#a3e635', textDecoration: 'none' }}>
                {dualCards.import.linkText} &rarr;
              </a>
            </article>

            {/* Export Card */}
            <article style={{
              backgroundColor: 'rgba(14, 24, 19, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderTop: '4px solid #c94a38',
              padding: '2rem 1.75rem',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
              color: '#ffffff',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#c94a38',
                display: 'block',
                marginBottom: '0.65rem'
              }}>
                {dualCards.export.tag}
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.6rem', color: '#ffffff', lineHeight: 1.25 }}>
                {dualCards.export.title}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.55 }}>
                {dualCards.export.description}
              </p>
              <Link href={dualCards.export.linkUrl} style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#c94a38', textDecoration: 'none' }}>
                {dualCards.export.linkText} &rarr;
              </Link>
            </article>
          </div>
        )}

        {/* Integrated Children (e.g. Services Grid, Why Choose Us, Announcements) */}
        {children && (
          <div style={{ width: '100%', marginTop: '1.5rem' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
