'use client';

import React from 'react';

interface FooterProps {
  location: string;
}

export default function Footer({ location }: FooterProps) {
  return (
    <footer style={{
      backgroundColor: '#101614',
      color: '#838e88',
      padding: '2.5rem 0',
      fontSize: '0.8125rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            backgroundColor: 'transparent',
            display: 'inline-flex',
            alignItems: 'center'
          }}>
            <img src="/logo.png" alt="JFS Logo" style={{ height: '24px', width: 'auto' }} />
          </div>
          <span>© JFS Trading · {location || 'Addis Ababa, Ethiopia'}</span>
        </div>
        <ul style={{ display: 'flex', gap: '1.75rem', listStyle: 'none' }}>
          <li><a href="#" style={{ color: 'inherit' }}>Legal notice</a></li>
          <li><a href="#" style={{ color: 'inherit' }}>Privacy</a></li>
        </ul>
      </div>
    </footer>
  );
}
