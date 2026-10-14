'use client';

import React from 'react';

interface ServicesProps {
  services: Array<{ id: string; title: string; description: string }>;
  whyChoose: {
    title: string;
    pillars: Array<{ id: string; title: string; description: string }>;
  };
}

export default function ServicesGrid({ services, whyChoose }: ServicesProps) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Why Choose Us */}
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '1.75rem',
        }}>
          <span style={{ width: '28px', height: '2px', backgroundColor: '#a3e635' }} />
          <h3 style={{
            fontSize: 'clamp(1.2rem, 3.5vw, 1.4rem)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            margin: 0,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            textAlign: 'center',
          }}>
            {whyChoose.title}
          </h3>
          <span style={{ width: '28px', height: '2px', backgroundColor: '#a3e635' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem',
            textAlign: 'left',
          }}
        >
          {whyChoose.pillars.map((pillar, idx) => (
            <article
              key={pillar.id}
              className="glass-card glass-card-green"
              style={{ color: '#ffffff' }}
            >
              <span className="glass-tag glass-tag-green">
                PILLAR 0{idx + 1}
              </span>
              <h4 style={{
                fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                fontWeight: 800,
                marginBottom: '0.65rem',
                color: '#ffffff',
                lineHeight: 1.25,
              }}>
                {pillar.title}
              </h4>
              <p style={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '0.875rem',
                lineHeight: 1.55,
                margin: 0,
              }}>
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Our Services Grid */}
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '1.75rem',
        }}>
          <span style={{ width: '28px', height: '2px', backgroundColor: '#a3e635' }} />
          <h3 style={{
            fontSize: 'clamp(1.2rem, 3.5vw, 1.4rem)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            margin: 0,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            textAlign: 'center',
          }}>
            Our services
          </h3>
          <span style={{ width: '28px', height: '2px', backgroundColor: '#a3e635' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem',
            textAlign: 'left',
          }}
        >
          {services.map((service, idx) => {
            const isGreen = idx % 2 === 0;
            return (
              <article
                key={service.id}
                className={`glass-card ${isGreen ? 'glass-card-green' : 'glass-card-red'}`}
                style={{ color: '#ffffff' }}
              >
                <span className={`glass-tag ${isGreen ? 'glass-tag-green' : 'glass-tag-red'}`}>
                  SERVICE 0{idx + 1}
                </span>
                <h4 style={{
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                  fontWeight: 800,
                  marginBottom: '0.65rem',
                  lineHeight: 1.25,
                  color: '#ffffff',
                }}>
                  {service.title}
                </h4>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.875rem',
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
