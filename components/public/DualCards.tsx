import React from 'react';
import Link from 'next/link';

interface DualCardsProps {
  importData: { tag: string; title: string; description: string; linkText: string; linkUrl: string };
  exportData: { tag: string; title: string; description: string; linkText: string; linkUrl: string };
}

export default function DualCards({ importData, exportData }: DualCardsProps) {
  return (
    <section style={{ padding: '3.5rem 0 2rem' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
      }}>
        {/* Import Card */}
        <article style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '2.5rem 2.25rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          border: '1px solid var(--color-card-border)',
          borderTop: '4px solid var(--color-accent-green)'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-green)',
            display: 'block',
            marginBottom: '0.85rem'
          }}>
            {importData.tag}
          </span>
          <h2 style={{ fontSize: '1.65rem', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
            {importData.title}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.55 }}>
            {importData.description}
          </p>
          <a href={importData.linkUrl} style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-accent-green)' }}>
            {importData.linkText} &rarr;
          </a>
        </article>

        {/* Export Card */}
        <article style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '2.5rem 2.25rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          border: '1px solid var(--color-card-border)',
          borderTop: '4px solid var(--color-accent-terracotta)'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-terracotta)',
            display: 'block',
            marginBottom: '0.85rem'
          }}>
            {exportData.tag}
          </span>
          <h2 style={{ fontSize: '1.65rem', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
            {exportData.title}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.55 }}>
            {exportData.description}
          </p>
          <Link href={exportData.linkUrl} style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-accent-terracotta)' }}>
            {exportData.linkText} &rarr;
          </Link>
        </article>
      </div>
    </section>
  );
}
