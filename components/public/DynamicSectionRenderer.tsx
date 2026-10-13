'use client';

import React from 'react';

interface DynamicSectionProps {
  sections: Array<{
    id: string;
    enabled: boolean;
    type: string;
    title: string;
    content: string;
    buttonText?: string;
    buttonLink?: string;
  }>;
}

export default function DynamicSectionRenderer({ sections }: DynamicSectionProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.filter(s => s.enabled).map((sec) => (
        <article key={sec.id} style={{
          width: '100%',
          marginTop: '1.5rem',
          backgroundColor: 'rgba(14, 24, 19, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderTop: '4px solid #c94a38',
          padding: '2rem 1.75rem',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          textAlign: 'left',
          color: '#ffffff',
        }}>
          <div style={{ maxWidth: '720px' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#a3e635',
              display: 'block',
              marginBottom: '0.5rem',
            }}>
              ANNOUNCEMENT / CUSTOM UPDATE
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.6rem', lineHeight: 1.25 }}>
              {sec.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.6, margin: 0 }}>
              {sec.content}
            </p>
          </div>

          {sec.buttonText && sec.buttonLink && (
            <a href={sec.buttonLink} style={{
              padding: '0.9rem 2.25rem',
              backgroundColor: '#c94a38',
              color: '#ffffff',
              fontWeight: 700,
              borderRadius: '4px',
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(201, 74, 56, 0.35)',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}>
              {sec.buttonText}
            </a>
          )}
        </article>
      ))}
    </>
  );
}
