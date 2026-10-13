import { getContent } from '@/lib/contentService';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export const revalidate = 0;

export default function CoffeePage() {
  const data = getContent();
  const coffee = data.coffeePage;

  return (
    <main>
      <Navbar siteName={data.site.name} theme="dark-coffee" isCoffeePage={true} />

      {/* Coffee Hero (Page 3) */}
      <section style={{
        backgroundColor: 'var(--color-coffee-dark)',
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
              color: '#d19a8d',
              marginBottom: '1.25rem',
              display: 'inline-block'
            }}>
              {coffee.hero.eyebrow}
            </span>
            <h1 style={{
              fontSize: '3.5rem',
              lineHeight: 1.08,
              marginBottom: '1.5rem',
              color: '#ffffff',
              letterSpacing: '-0.03em',
              fontWeight: 700
            }}>
              {coffee.hero.headline}
            </h1>
            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#d8cec8',
              marginBottom: '2.25rem',
              maxWidth: '480px'
            }}>
              {coffee.hero.lead}
            </p>
            <div>
              <a href={coffee.hero.ctaLink} style={{
                display: 'inline-flex',
                padding: '0.75rem 1.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: '4px',
                backgroundColor: 'var(--color-accent-terracotta)',
                color: '#ffffff'
              }}>
                {coffee.hero.ctaText}
              </a>
            </div>
          </div>

          <div style={{
            position: 'relative',
            aspectRatio: '4 / 3.2',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: '#3b2823',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)'
          }}>
            <img src={coffee.hero.imageUrl} alt={coffee.hero.headline} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {coffee.hero.badgeText && (
              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                backgroundColor: 'rgba(34, 23, 20, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                color: '#ebdcd6'
              }}>
                {coffee.hero.badgeText}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Exporting Coffee Heritage Section */}
      <section style={{ padding: '5rem 0 4rem' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.25fr',
          gap: '3.5rem',
          alignItems: 'flex-start'
        }}>
          <div>
            <h2 style={{ fontSize: '2.25rem', lineHeight: 1.18, color: 'var(--color-text-main)', fontWeight: 700 }}>
              {coffee.heritage.title}
            </h2>
          </div>
          <div>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: '#38423d' }}>
              {coffee.heritage.text}
            </p>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section style={{ padding: '1rem 0 4.5rem' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {coffee.pillars.map((pillar) => (
            <div key={pillar.id} style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '2.25rem 2rem',
              border: '1px solid var(--color-card-border)',
              borderTop: '4px solid var(--color-accent-terracotta)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.85rem', color: 'var(--color-text-main)' }}>
                {pillar.title}
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Callout Banner */}
      <section id="contact" style={{ padding: '2rem 0 6rem' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--color-forest-dark)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md)',
            padding: '3rem 3.5rem',
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#ffffff' }}>
                {coffee.callout.title}
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#b8c8c0' }}>
                {coffee.callout.subtitle}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <span style={{ fontWeight: 700, marginRight: '0.5rem' }}>Phone:</span>
                <span style={{ color: '#b8c8c0' }}>{data.site.phone}</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, marginRight: '0.5rem' }}>Email:</span>
                <span style={{ color: '#b8c8c0' }}>{data.site.email}</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, marginRight: '0.5rem' }}>Address:</span>
                <span style={{ color: '#b8c8c0' }}>{data.site.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer location={data.site.location} />
    </main>
  );
}
