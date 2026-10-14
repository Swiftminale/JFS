'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import JebenaArt from '@/components/public/JebenaArt';
import type { SiteContent } from '@/types/content';

interface CoffeeExperienceProps {
  data: SiteContent;
}

export default function CoffeeExperience({ data }: CoffeeExperienceProps) {
  const coffee = data.coffeePage;
  const site = data.site;

  // Gallery Data & State (managed live via Admin Panel)
  const galleryItems = coffee.gallery && coffee.gallery.length > 0 ? coffee.gallery : [
    {
      id: "gal-1",
      title: "Selective Red Cherry Harvest",
      category: "Harvesting",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
      caption: "Hand-picked ripe red Arabica cherries from smallholder mountain farms across Yirgacheffe & Sidama."
    },
    {
      id: "gal-2",
      title: "Highland Washing Station",
      category: "Washing Station",
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      caption: "Mountain spring-fed pulping channels and controlled ceramic fermentation vats for pristine cup clarity."
    },
    {
      id: "gal-3",
      title: "African Raised Drying Beds",
      category: "Sun Drying",
      imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
      caption: "Uniform aeration on elevated bamboo drying beds under high-altitude sunshine to preserve terroir."
    },
    {
      id: "gal-4",
      title: "SCA Protocol Cupping Lab",
      category: "Cupping & QC",
      imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80",
      caption: "Q-grader certified sensory evaluation for moisture, density, screen size, and specialty cup scoring."
    },
    {
      id: "gal-5",
      title: "Artisanal Brew & Aromas",
      category: "Brewing",
      imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=80",
      caption: "Bright floral jasmine, citrus bergamot, and rich natural sweetness in every pour."
    },
    {
      id: "gal-6",
      title: "Export Ready Packaging",
      category: "Export Logistics",
      imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
      caption: "Hermetic GrainPro barrier bags and JFS burlap sacks prepared for swift transit through Djibouti port."
    }
  ];

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(galleryItems.map((p) => p.category || 'General')))];
  const filteredPhotos = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((p) => (p.category || 'General') === activeCategory);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredPhotos.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSuccess(false);
    }, 4500);
  };

  // Inquiry Form State
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', message: '' });
  const [inquirySent, setInquirySent] = useState(false);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.email) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="font-sans-coffee" style={{ backgroundColor: '#fbf7f0', color: '#1a110e', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Fixed Navigation with Coffee Theme */}
      <Navbar siteName={site.name} theme="dark-coffee" isCoffeePage={true} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Rustic Wood Table, Steaming Cup, Script Lettering */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '9rem 1.5rem 6.5rem',
        backgroundImage: `linear-gradient(to right, rgba(22, 14, 11, 0.94) 0%, rgba(22, 14, 11, 0.8) 45%, rgba(22, 14, 11, 0.45) 100%), url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff',
      }}>
        {/* Subtle radial glow on the cup */}
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '25%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 142, 55, 0.18) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1240px' }}>
          <div style={{ maxWidth: '680px' }}>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-coffee-amber)',
              marginBottom: '1rem',
            }}>
              <span style={{ width: '28px', height: '1.5px', backgroundColor: 'var(--color-coffee-amber)' }} />
              <span>{coffee.hero.eyebrow || 'EXPORT SERVICES · JFS TRADING'}</span>
            </div>

            {/* Script "Coffee" + Editorial Headline */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="font-script-coffee" style={{
                display: 'block',
                fontSize: 'clamp(2.75rem, 8vw, 6.5rem)',
                lineHeight: 0.95,
                color: '#ffffff',
                textShadow: '0 4px 24px rgba(0,0,0,0.6)',
                fontWeight: 400,
              }}>
                Coffee
              </span>
              <h1 className="font-serif-coffee" style={{
                fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#fdfaf5',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                marginTop: '0.35rem',
              }}>
                {coffee.hero.headline || 'Flavors that tell a story.'}
              </h1>
            </div>

            {/* Lead text from site content */}
            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.88)',
              marginBottom: '2rem',
              maxWidth: '560px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}>
              {coffee.hero.lead || 'Premium Ethiopian coffee, sourced directly from local farmers and exported to international markets.'}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a href="#contact" className="btn-coffee-amber">
                <span>{coffee.hero.ctaText || 'Contact Us'}</span>
                <span>&rarr;</span>
              </a>
              <a href="#gallery" className="btn-coffee-outline">
                Origin Gallery
              </a>
              <a href="#why-us" style={{
                color: 'var(--color-coffee-amber)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0',
              }}>
                Why Choose Us &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DISCOVER THE BEST COFFEE: Heritage & Sourcing Story */}
      {/* ========================================================================= */}
      <section id="heritage" style={{
        padding: '5.5rem 1.25rem',
        backgroundColor: '#fbf7f0',
        position: 'relative',
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Left Content */}
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c97223',
                display: 'block',
                marginBottom: '1rem',
              }}>
                ETHIOPIA · BIRTHPLACE OF COFFEE
              </span>

              <h2 className="font-serif-coffee" style={{
                fontSize: 'clamp(2rem, 3.4vw, 2.85rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                color: '#24140f',
                letterSpacing: '-0.02em',
                marginBottom: '1.75rem',
              }}>
                {coffee.heritage.title || 'Exporting Ethiopia’s coffee heritage'}
              </h2>

              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: '#4e3d36',
                marginBottom: '2rem',
              }}>
                {coffee.heritage.text || 'At JFS Trading, we specialize in exporting premium Ethiopian coffee, sourced directly from local farmers. Our coffee is carefully selected to showcase Ethiopia’s rich coffee heritage. We keep the export process seamless, delivering high-quality coffee to international markets while supporting local farmers and sustainable practices.'}
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <a href="#contact" className="btn-coffee-amber" style={{ padding: '0.8rem 2rem' }}>
                  Inquire Export Lot
                </a>
                <a href="#why-us" style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#c97223',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}>
                  Why Our Coffee &rarr;
                </a>
              </div>
            </div>

            {/* Right Graphic: Artistic Coffee Beans & Cup */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(74, 44, 32, 0.16)',
                backgroundColor: '#ffffff',
                border: '1px solid #ebdcd0',
                aspectRatio: '4 / 3.4',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80"
                  alt="Ethiopian Coffee Beans"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                />
              </div>

              {/* Floating Quality Stamp Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem',
                left: '-1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 12px 30px rgba(74, 44, 32, 0.15)',
                border: '1px solid #ebdcd0',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#f6efe6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c97223',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#24140f' }}>100% Arabica</div>
                  <div style={{ fontSize: '0.75rem', color: '#7a665e' }}>Grade 1 & 2 Specialty Export</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. COFFEE ORIGIN & HARVEST GALLERY (Managed Live via Admin Panel) */}
      {/* ========================================================================= */}
      <section id="gallery" style={{
        padding: '6.5rem 1.5rem',
        backgroundColor: '#160e0b',
        color: '#ffffff',
        position: 'relative',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(229, 142, 55, 0.08) 0%, rgba(0,0,0,0) 70%)',
      }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-coffee-amber)',
              display: 'block',
              marginBottom: '0.85rem',
            }}>
              ORIGIN & HARVEST PHOTO GALLERY
            </span>
            <h2 className="font-serif-coffee" style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>
              From Mountain Farms to International Export
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#c4b5ac', lineHeight: 1.65 }}>
              Explore the journey of Ethiopia's finest Arabica beans: selective highland picking, pristine mountain washing stations, sun-drenched raised drying beds, and certified Q-grader cupping labs.
            </p>
          </div>

          {/* Dynamic Category Filter Pills */}
          {categories.length > 1 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '3.5rem',
            }}>
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      backgroundColor: isSelected ? 'var(--color-coffee-amber)' : 'rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#1a110e' : '#e0d6cf',
                      border: isSelected ? '1px solid var(--color-coffee-amber)' : '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '0.55rem 1.4rem',
                      borderRadius: '30px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isSelected ? '0 4px 16px rgba(229, 142, 55, 0.35)' : 'none',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* Photo Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
          }}>
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#24140f',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                  cursor: 'pointer',
                  aspectRatio: '4 / 3',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(229, 142, 55, 0.5)';
                  e.currentTarget.style.boxShadow = '0 18px 40px rgba(229, 142, 55, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)';
                }}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                />

                {/* Category Chip */}
                {photo.category && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(26, 17, 14, 0.88)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--color-coffee-amber)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.35rem 0.75rem',
                    borderRadius: '20px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(229, 142, 55, 0.3)',
                    zIndex: 2,
                  }}>
                    {photo.category}
                  </div>
                )}

                {/* Bottom Overlay with Title & Caption */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18, 10, 7, 0.96) 0%, rgba(18, 10, 7, 0.65) 45%, rgba(0,0,0,0) 80%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.75rem',
                  zIndex: 2,
                }}>
                  <h3 className="font-serif-coffee" style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '0.35rem',
                    textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  }}>
                    {photo.title}
                  </h3>
                  {photo.caption && (
                    <p style={{
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      color: 'rgba(255, 255, 255, 0.85)',
                      margin: 0,
                    }}>
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <div
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(10, 6, 4, 0.94)',
              backdropFilter: 'blur(12px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 1.5rem',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '960px',
                width: '100%',
                maxHeight: '92vh',
                backgroundColor: '#1e130f',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(229, 142, 55, 0.3)',
                boxShadow: '0 24px 70px rgba(0,0,0,0.8)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Lightbox"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 10,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                &times;
              </button>

              {/* Lightbox Image Stage */}
              <div style={{ position: 'relative', width: '100%', maxHeight: '65vh', overflow: 'hidden', backgroundColor: '#0f0806' }}>
                <img
                  src={filteredPhotos[lightboxIndex].imageUrl}
                  alt={filteredPhotos[lightboxIndex].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '65vh',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />

                {/* Prev Navigation Button */}
                <button
                  onClick={() => setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length))}
                  aria-label="Previous Image"
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(26, 17, 14, 0.8)',
                    color: '#ffffff',
                    border: '1px solid rgba(229, 142, 55, 0.4)',
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  &#8249;
                </button>

                {/* Next Navigation Button */}
                <button
                  onClick={() => setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredPhotos.length))}
                  aria-label="Next Image"
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(26, 17, 14, 0.8)',
                    color: '#ffffff',
                    border: '1px solid rgba(229, 142, 55, 0.4)',
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  &#8250;
                </button>
              </div>

              {/* Lightbox Info Bar */}
              <div style={{ padding: '1.5rem 2rem', backgroundColor: '#1a100d' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      backgroundColor: 'rgba(229, 142, 55, 0.2)',
                      color: 'var(--color-coffee-amber)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                    }}>
                      {filteredPhotos[lightboxIndex].category || 'General'}
                    </span>
                    <h3 className="font-serif-coffee" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      {filteredPhotos[lightboxIndex].title}
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#8f7e75', fontWeight: 600 }}>
                    {lightboxIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>
                {filteredPhotos[lightboxIndex].caption && (
                  <p style={{ fontSize: '0.92rem', color: '#d8cec8', margin: 0, lineHeight: 1.6 }}>
                    {filteredPhotos[lightboxIndex].caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      <section id="why-us" style={{
        padding: '7rem 1.5rem',
        backgroundColor: '#fbf7f0',
        position: 'relative',
      }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4.5rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c97223',
              display: 'block',
              marginBottom: '0.75rem',
            }}>
              OUR EXPORT VALUES
            </span>
            <h2 className="font-serif-coffee" style={{
              fontSize: 'clamp(2.2rem, 3.6vw, 3rem)',
              fontWeight: 800,
              color: '#24140f',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}>
              Why are we different?
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#68544c', lineHeight: 1.6 }}>
              We don't just export coffee; we uphold Ethiopia's sacred origin through strict quality control, transparent farm-gate partnerships, and seamless container logistics.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}>
            {/* Pillar 1: Supreme Beans (Traceable) */}
            <div className="coffee-pill-card">
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1.5rem',
                borderRadius: '50%',
                backgroundColor: '#f4e9de',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c97223',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="12" rx="9" ry="6" transform="rotate(-30 12 12)"/>
                  <path d="M7 14c3-1 7-3 10-4"/>
                </svg>
              </div>
              <h3 className="font-serif-coffee" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#24140f', marginBottom: '0.75rem' }}>
                {coffee.pillars[0]?.title || 'Supreme Beans'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#68544c', lineHeight: 1.6, margin: 0 }}>
                {coffee.pillars[0]?.description || 'Sourced directly from local farmers, so you know where your coffee comes from.'}
              </p>
            </div>

            {/* Pillar 2: High Quality */}
            <div className="coffee-pill-card">
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1.5rem',
                borderRadius: '50%',
                backgroundColor: '#f4e9de',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c97223',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
              </div>
              <h3 className="font-serif-coffee" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#24140f', marginBottom: '0.75rem' }}>
                {coffee.pillars[2]?.title || 'High Quality'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#68544c', lineHeight: 1.6, margin: 0 }}>
                {coffee.pillars[2]?.description || 'Premium coffee chosen to show off Ethiopia’s rich heritage with rigorous cupping standards.'}
              </p>
            </div>

            {/* Pillar 3: Extraordinary Aroma (Sustainable) */}
            <div className="coffee-pill-card">
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1.5rem',
                borderRadius: '50%',
                backgroundColor: '#f4e9de',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c97223',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
              <h3 className="font-serif-coffee" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#24140f', marginBottom: '0.75rem' }}>
                {coffee.pillars[1]?.title || 'Sustainable'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#68544c', lineHeight: 1.6, margin: 0 }}>
                {coffee.pillars[1]?.description || 'Practices that support the farmers and the land behind every harvest.'}
              </p>
            </div>

            {/* Pillar 4: Reliable Logistics */}
            <div className="coffee-pill-card">
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1.5rem',
                borderRadius: '50%',
                backgroundColor: '#f4e9de',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c97223',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3 className="font-serif-coffee" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#24140f', marginBottom: '0.75rem' }}>
                Reliable Logistics
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#68544c', lineHeight: 1.6, margin: 0 }}>
                Food-grade GrainPro barrier bags, swift customs clearance, and punctual shipments through Djibouti.
              </p>
            </div>
          </div>

          {/* Bottom Prompt Banner */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem 3rem',
            border: '1px solid #ebdcd0',
            boxShadow: '0 8px 30px rgba(74, 44, 32, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}>
            <div>
              <h4 className="font-serif-coffee" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#24140f', marginBottom: '0.35rem' }}>
                Great coffee starts with ethical, transparent sourcing.
              </h4>
              <p style={{ color: '#68544c', margin: 0, fontSize: '0.95rem' }}>
                Get started today by requesting cupping samples and FOB export contracts.
              </p>
            </div>
            <a href="#contact" className="btn-coffee-amber">
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SPOTLIGHT BANNER: "Get a chance to have an Amazing morning" */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        padding: '7rem 1.5rem',
        backgroundImage: `linear-gradient(to right, rgba(26, 17, 14, 0.95) 0%, rgba(26, 17, 14, 0.82) 50%, rgba(26, 17, 14, 0.6) 100%), url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}>
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-coffee-amber)',
                display: 'block',
                marginBottom: '1rem',
              }}>
                A WORLD-CLASS CUPPING EXPERIENCE
              </span>
              <h2 className="font-serif-coffee" style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '1.5rem',
              }}>
                Get a chance to experience an Amazing morning
              </h2>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '2rem',
              }}>
                Whether you are roasting for high-end boutique cafes or scaling specialty subscription boxes, JFS Trading brings you direct access to Ethiopia's finest harvest lots.
              </p>
              <a href="#contact" className="btn-coffee-amber">
                Request Cupping Samples &rarr;
              </a>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                border: '2px solid rgba(255,255,255,0.15)',
                maxWidth: '420px',
                width: '100%',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                  alt="Freshly brewed coffee"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 7. NEWSLETTER / HARVEST BULLETIN */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        backgroundImage: `linear-gradient(rgba(26, 17, 14, 0.92), rgba(26, 17, 14, 0.92)), url('https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 className="font-serif-coffee" style={{
            fontSize: 'clamp(2rem, 3.4vw, 2.75rem)',
            fontWeight: 800,
            marginBottom: '0.85rem',
            color: '#ffffff',
          }}>
            Subscribe to get the Latest News
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}>
            Receive seasonal harvest forecasts, FOB Djibouti price sheets, and cupping releases directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} style={{
            display: 'flex',
            maxWidth: '540px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '50px',
            overflow: 'hidden',
            padding: '4px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          }}>
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                flex: 1,
                border: 'none',
                padding: '0.85rem 1.5rem',
                fontSize: '0.95rem',
                outline: 'none',
                color: '#1a110e',
              }}
            />
            <button
              type="submit"
              className="btn-coffee-amber"
              style={{
                borderRadius: '50px',
                padding: '0.85rem 2rem',
                fontSize: '0.9rem',
              }}
            >
              Subscribe
            </button>
          </form>

          {newsletterSuccess && (
            <div style={{
              marginTop: '1.25rem',
              color: '#a3e635',
              fontSize: '0.9rem',
              fontWeight: 700,
            }}>
              ✓ Thank you! You will receive our next Ethiopian harvest and price bulletin.
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CONTACT US & EXPORT INQUIRY (with site content details) */}
      {/* ========================================================================= */}
      <section id="contact" style={{
        padding: '7rem 1.5rem 5rem',
        backgroundColor: '#1a110e',
        color: '#ffffff',
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-coffee-amber)',
              display: 'block',
              marginBottom: '0.75rem',
            }}>
              DIRECT EXPORT DESK
            </span>
            <h2 className="font-serif-coffee" style={{
              fontSize: 'clamp(2.2rem, 3.4vw, 2.85rem)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              color: '#ffffff',
            }}>
              {coffee.callout.title || 'Interested in our coffee?'}
            </h2>
            <p style={{ fontSize: '1rem', color: '#b8a8a0' }}>
              {coffee.callout.subtitle || 'Reach out and we’ll talk through your export needs.'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}>
            {/* Left Card: Direct Contact Details (from data.site) */}
            <div style={{
              backgroundColor: '#241713',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}>
              <h3 className="font-serif-coffee" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>
                JFS Trading Coffee Export Desk
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-coffee-amber)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                    Telephone / WhatsApp
                  </span>
                  <a href={`tel:${(site?.phone || '+251911400328').replace(/[^0-9+]/g, '')}`} style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}>
                    {site?.phone || '+251 91 140 0328'}
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-coffee-amber)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                    Direct Export Email
                  </span>
                  <a href={`mailto:${site?.email || 'contact@jfs-tradinget.com'}`} style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', textDecoration: 'none', wordBreak: 'break-all' }}>
                    {site?.email || 'contact@jfs-tradinget.com'}
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-coffee-amber)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                    Headquarters
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#d8cec8', lineHeight: 1.5, display: 'block' }}>
                    {site?.address || 'Figa, Mesi Building, Addis Ababa'} · {site?.location || 'Addis Ababa, Ethiopia'}
                  </span>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-coffee-amber)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                    Business Hours
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#d8cec8', lineHeight: 1.5, display: 'block' }}>
                    {site?.hours || 'Monday to Friday, 9:00 AM to 5:00 PM'} (East Africa Time, UTC+3)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card: Sample & Order Inquiry Form */}
            <div style={{
              backgroundColor: '#241713',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}>
              <h3 className="font-serif-coffee" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', fontWeight: 800, marginBottom: '1.5rem', color: '#ffffff' }}>
                Request Sample & Price Sheet
              </h3>

              {inquirySent ? (
                <div style={{
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: 'rgba(229, 142, 55, 0.15)',
                  border: '1px solid rgba(229, 142, 55, 0.4)',
                  borderRadius: '8px',
                  color: 'var(--color-coffee-amber)',
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>Thank You!</h4>
                  <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.55 }}>
                    Your inquiry has been received. Our export team will provide sample lots and current FOB pricing within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendInquiry}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem', color: '#d8cec8' }}>
                      Contact Name & Company
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      placeholder="e.g. John Doe, Roastery Co."
                      className="glass-input"
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem', color: '#d8cec8' }}>
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="buyer@roastery.com"
                      className="glass-input"
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem', color: '#d8cec8' }}>
                      Additional Notes or Questions
                    </label>
                    <textarea
                      rows={3}
                      value={inquiryData.message}
                      onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                      placeholder="Specify your target port, certification requirements, or preferred crop year..."
                      className="glass-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-coffee-amber"
                    style={{ width: '100%', padding: '0.9rem' }}
                  >
                    Submit Export Inquiry &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. COFFEE EXPERIENCE FOOTER */}
      {/* ========================================================================= */}
      <footer style={{
        backgroundColor: '#120a08',
        color: '#a3938b',
        padding: '3rem 1.5rem',
        fontSize: '0.85rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/logo.png" alt="JFS Logo" style={{ height: '28px', width: 'auto' }} />
            <span>&copy; {new Date().getFullYear()} JFS Trading PLC · {site.location}</span>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#d8cec8', textDecoration: 'none' }}>
              Home (Feed Division)
            </Link>
            <a href="#heritage" style={{ color: '#d8cec8', textDecoration: 'none' }}>
              Heritage
            </a>
            <a href="#gallery" style={{ color: '#d8cec8', textDecoration: 'none' }}>
              Origin Gallery
            </a>
            <a href="#why-us" style={{ color: '#d8cec8', textDecoration: 'none' }}>
              Sourcing Pillars
            </a>
            <a href="#contact" style={{ color: '#d8cec8', textDecoration: 'none' }}>
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Persistent Bottom Jebena (Ethiopian Coffee Brewing Pot) & Sini Cup Art */}
      <div
        className="jebena-bottom-container"
        style={{
          position: 'fixed',
          bottom: '2vh',
          right: '2.5vw',
          zIndex: 25,
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <JebenaArt width="clamp(110px, 16vw, 220px)" height="auto" />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .jebena-bottom-container {
            bottom: 1vh !important;
            right: 1.5vw !important;
            opacity: 0.55 !important;
            transform: scale(0.68) !important;
            transform-origin: bottom right !important;
          }
        }
        @media (max-width: 480px) {
          .jebena-bottom-container {
            transform: scale(0.55) !important;
            opacity: 0.45 !important;
          }
        }
      `}</style>
    </div>
  );
}

