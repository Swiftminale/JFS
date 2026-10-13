import React from 'react';

interface HeroProps {
  eyebrow: string;
  headline: string;
  lead: string;
  ctaPrimary: { text: string; link: string };
  ctaSecondary: { text: string; link: string };
  imageUrl: string;
  badgeText: string;
}

export default function HeroSection({
  eyebrow,
  headline,
  lead,
  ctaPrimary,
  ctaSecondary,
  imageUrl,
  badgeText,
}: HeroProps) {
  return (
    <section style={{
      backgroundColor: 'var(--color-forest-dark)',
      color: 'var(--color-text-light)',
      padding: '8.5rem 0 5.5rem',
      position: 'relative'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: '3.5rem',
        alignItems: 'center'
      }}>
        <div>
          <span style={{
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            display: 'inline-block',
            color: '#9cb1a6'
          }}>
            {eyebrow}
          </span>
          <h1 style={{
            fontSize: '3.5rem',
            lineHeight: 1.08,
            marginBottom: '1.5rem',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            fontWeight: 700
          }}>
            {headline}
          </h1>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: 'var(--color-text-light-dim)',
            marginBottom: '2.25rem',
            maxWidth: '480px'
          }}>
            {lead}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={ctaPrimary.link} style={{
              display: 'inline-flex',
              padding: '0.75rem 1.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: '4px',
              backgroundColor: 'var(--color-accent-terracotta)',
              color: '#ffffff'
            }}>
              {ctaPrimary.text}
            </a>
            <a href={ctaSecondary.link} style={{
              display: 'inline-flex',
              padding: '0.75rem 1.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color: '#ffffff'
            }}>
              {ctaSecondary.text}
            </a>
          </div>
        </div>

        <div style={{
          position: 'relative',
          aspectRatio: '4 / 3.2',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          backgroundColor: '#243831',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25)'
        }}>
          <img src={imageUrl} alt={headline} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {badgeText && (
            <div style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.25rem',
              backgroundColor: 'rgba(16, 26, 23, 0.8)',
              backdropFilter: 'blur(8px)',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: '#c4d4cc'
            }}>
              {badgeText}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
