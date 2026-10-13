'use client';

import React, { useState } from 'react';

interface ContactProps {
  site: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
}

export default function ContactSection({ site }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', privacy: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.privacy) {
      alert('Please fill out all fields and accept the privacy policy.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '', privacy: false });
    }, 4000);
  };

  return (
    <div id="contact-form" style={{
      width: '100%',
      maxWidth: '960px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
      gap: '1.75rem',
      textAlign: 'left',
      alignItems: 'stretch',
    }}>
      {/* Left Card: Direct Contact Details */}
      <article style={{
        backgroundColor: 'rgba(14, 24, 19, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderTop: '4px solid #a3e635',
        padding: '2rem 1.75rem',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
      }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#a3e635',
          display: 'block',
          marginBottom: '0.65rem',
        }}>
          DIRECT CONTACT
        </span>

        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          marginBottom: '0.6rem',
          color: '#ffffff',
          lineHeight: 1.25,
        }}>
          Get in touch
        </h3>

        <p style={{
          color: 'rgba(255, 255, 255, 0.82)',
          fontSize: '0.9rem',
          marginBottom: '1.5rem',
          lineHeight: 1.55,
        }}>
          Questions about Primix, or need help choosing the right blend? We’re ready to help.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: 'auto' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a3e635', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
              Phone
            </span>
            <a href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`} style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}>
              {site.phone}
            </a>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a3e635', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
              Email
            </span>
            <a href={`mailto:${site.email}`} style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}>
              {site.email}
            </a>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a3e635', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
              Address
            </span>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.4, display: 'block' }}>
              {site.address}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a3e635', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
              Hours
            </span>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.4, display: 'block' }}>
              {site.hours}
            </span>
          </div>
        </div>
      </article>

      {/* Right Card: Contact Message Form */}
      <article style={{
        backgroundColor: 'rgba(14, 24, 19, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderTop: '4px solid #c94a38',
        padding: '2rem 1.75rem',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
        color: '#ffffff',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
      }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#c94a38',
          display: 'block',
          marginBottom: '0.65rem',
        }}>
          SEND INQUIRY
        </span>

        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          marginBottom: '1rem',
          color: '#ffffff',
          lineHeight: 1.25,
        }}>
          Send a message
        </h3>

        {submitted ? (
          <div style={{
            padding: '2rem 1.5rem',
            textAlign: 'center',
            backgroundColor: 'rgba(163, 230, 53, 0.15)',
            border: '1px solid rgba(163, 230, 53, 0.4)',
            borderRadius: '6px',
            color: '#a3e635',
          }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>Thank You!</h4>
            <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.55 }}>
              Your message has been received. Our team in Addis Ababa will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                }}
                placeholder="Your full name"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                }}
                placeholder="your.email@domain.com"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.35rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Message
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                }}
                placeholder="How can we help your farm?"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="privacy"
                checked={formData.privacy}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                required
                style={{ width: '15px', height: '15px', cursor: 'pointer' }}
              />
              <label htmlFor="privacy" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)', cursor: 'pointer' }}>
                I have read and understand the privacy policy.
              </label>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: '#c94a38',
                color: '#ffffff',
                fontWeight: 700,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                letterSpacing: '0.04em',
                boxShadow: '0 4px 14px rgba(201, 74, 56, 0.35)',
                transition: 'opacity 0.2s',
              }}
            >
              Send message
            </button>
          </form>
        )}
      </article>
    </div>
  );
}
