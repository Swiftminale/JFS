import React from 'react';

interface AboutProps {
  title: string;
  paragraphs: string[];
  imageUrl: string;
  badgeText: string;
}

export default function AboutSection({ title, paragraphs, imageUrl, badgeText }: AboutProps) {
  return (
    <section id="about" style={{ padding: '4.5rem 0 3.5rem' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: '3.5rem',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', color: 'var(--color-text-main)', fontWeight: 700 }}>
            {title}
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: '#38423d', marginBottom: '1.25rem' }}>
              {p}
            </p>
          ))}
        </div>

        <div style={{
          position: 'relative',
          aspectRatio: '4 / 2.9',
          backgroundColor: '#dce3df',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
        }}>
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
