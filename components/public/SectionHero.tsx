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
  hideHeader?: boolean;
}

export default function SectionHero({ data, badgeNumber, dualCards, children, hideHeader }: SectionHeroProps) {
  const hasExtra = !!(dualCards || children);

  return (
    <div
      className={`section-hero-container ${hasExtra ? 'has-extra' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: hasExtra ? '100vh' : '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
      }}
    >
      {/* Centerpiece Text & Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: children ? '1140px' : '1080px',
          width: '100%',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!hideHeader && (
          <>
            {/* Category Pill */}
            {data.tag ? (
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.75)',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ width: '24px', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
                <span>{data.tag}</span>
                <span style={{ width: '24px', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
              </div>
            ) : null}

            {/* Large Editorial Headline Quote */}
            <h2
              style={{
                fontSize: 'clamp(1.55rem, 4.8vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                color: '#ffffff',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                maxWidth: '860px',
                padding: '0 0.5rem',
              }}
            >
              {data.quote}
            </h2>

            {/* Subtext */}
            {data.subtext && (
              <p
                style={{
                  fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '1.75rem',
                  maxWidth: '640px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  padding: '0 0.5rem',
                }}
              >
                {data.subtext}
              </p>
            )}

            {/* Ghost CTA Button */}
            {data.buttonText && data.buttonLink && (
              <div style={{ marginBottom: hasExtra ? '2rem' : '0' }}>
                <a href={data.buttonLink} className="ghost-btn">
                  {data.buttonText}
                </a>
              </div>
            )}
          </>
        )}

        {/* Integrated Import & Export Dual Highlight Cards directly inside Hero */}
        {dualCards && (
          <div
            style={{
              width: '100%',
              maxWidth: '960px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1.5rem',
              textAlign: 'left',
              marginTop: '1rem',
            }}
          >
            {/* Import Card */}
            <article className="glass-card glass-card-green" style={{ color: '#ffffff' }}>
              <span className="glass-tag glass-tag-green">
                {dualCards.import.tag}
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                  fontWeight: 800,
                  marginBottom: '0.6rem',
                  color: '#ffffff',
                  lineHeight: 1.25,
                }}
              >
                {dualCards.import.title}
              </h3>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.88)',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                  lineHeight: 1.55,
                }}
              >
                {dualCards.import.description}
              </p>
              <a
                href={dualCards.import.linkUrl}
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#a3e635',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginTop: 'auto',
                }}
              >
                <span>{dualCards.import.linkText}</span>
                <span>&rarr;</span>
              </a>
            </article>

            {/* Export Card */}
            <article className="glass-card glass-card-red" style={{ color: '#ffffff' }}>
              <span className="glass-tag glass-tag-red">
                {dualCards.export.tag}
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                  fontWeight: 800,
                  marginBottom: '0.6rem',
                  color: '#ffffff',
                  lineHeight: 1.25,
                }}
              >
                {dualCards.export.title}
              </h3>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.88)',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                  lineHeight: 1.55,
                }}
              >
                {dualCards.export.description}
              </p>
              <Link
                href={dualCards.export.linkUrl}
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#ff8c7a',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginTop: 'auto',
                }}
              >
                <span>{dualCards.export.linkText}</span>
                <span>&rarr;</span>
              </Link>
            </article>
          </div>
        )}

        {/* Integrated Children (e.g. Services Grid, Why Choose Us, Announcements) */}
        {children && (
          <div style={{ width: '100%', marginTop: hideHeader ? 0 : '1.5rem' }}>
            {children}
          </div>
        )}
      </div>

      <style jsx>{`
        .section-hero-container {
          padding: 7rem 2rem 4.5rem;
        }
        .section-hero-container.has-extra {
          padding: 7.5rem 2rem 5.5rem;
        }

        @media (max-width: 1024px) {
          .section-hero-container {
            padding: 6.5rem 1.5rem 4rem;
          }
          .section-hero-container.has-extra {
            padding: 7rem 1.5rem 4.5rem;
          }
        }

        @media (max-width: 768px) {
          .section-hero-container {
            padding: 5.5rem 1rem 3.5rem;
          }
          .section-hero-container.has-extra {
            padding: 5.75rem 1rem 3.5rem;
          }
        }

        @media (max-width: 480px) {
          .section-hero-container {
            padding: 4.75rem 0.85rem 3rem;
          }
          .section-hero-container.has-extra {
            padding: 5rem 0.85rem 3rem;
          }
        }
      `}</style>
    </div>
  );
}
