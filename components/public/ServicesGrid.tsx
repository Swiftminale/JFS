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
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* Why Choose Us */}
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          <span style={{ width: '28px', height: '2px', backgroundColor: '#a3e635' }} />
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            margin: 0,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            {whyChoose.title}
          </h3>
          <span style={{ width: '28px', height: '2px', backgroundColor: '#a3e635' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.75rem',
          textAlign: 'left',
        }}>
          {whyChoose.pillars.map((pillar, idx) => (
            <article
              key={pillar.id}
              style={{
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
              }}
            >
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#a3e635',
                display: 'block',
                marginBottom: '0.65rem',
              }}>
                PILLAR 0{idx + 1}
              </span>
              <h4 style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                marginBottom: '0.6rem',
                color: '#ffffff',
                lineHeight: 1.25,
              }}>
                {pillar.title}
              </h4>
              <p style={{
                color: 'rgba(255, 255, 255, 0.82)',
                fontSize: '0.9rem',
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
          marginBottom: '2rem',
        }}>
          <span style={{ width: '28px', height: '2px', backgroundColor: '#a3e635' }} />
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            margin: 0,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            Our services
          </h3>
          <span style={{ width: '28px', height: '2px', backgroundColor: '#a3e635' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.75rem',
          textAlign: 'left',
        }}>
          {services.map((service, idx) => (
            <article
              key={service.id}
              style={{
                backgroundColor: 'rgba(14, 24, 19, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderTop: idx % 2 === 0 ? '4px solid #a3e635' : '4px solid #c94a38',
                padding: '2rem 1.75rem',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
                color: '#ffffff',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              }}
            >
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: idx % 2 === 0 ? '#a3e635' : '#c94a38',
                display: 'block',
                marginBottom: '0.65rem',
              }}>
                SERVICE 0{idx + 1}
              </span>
              <h4 style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                marginBottom: '0.6rem',
                lineHeight: 1.25,
                color: '#ffffff',
              }}>
                {service.title}
              </h4>
              <p style={{
                color: 'rgba(255, 255, 255, 0.82)',
                fontSize: '0.9rem',
                lineHeight: 1.55,
                margin: 0,
              }}>
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
