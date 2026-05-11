'use client';

import React from 'react';
import Link from 'next/link';
import Magnetic from '../../components/Magnetic';

export default function AboutPage() {
  return (
    <div className="contact-page"> {/* Reusing the high-end layout wrapper for consistency */}
      {/* Simple temporary back nav */}
      <div className="contact-page__nav">
        <Magnetic strength={0.3}>
          <Link href="/" className="contact-page__back-btn">
            ← Go Back Home
          </Link>
        </Magnetic>
      </div>

      <div className="contact-page__container" style={{ display: 'block', textAlign: 'center', paddingTop: '80px' }}>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 120px)', marginBottom: '20px', letterSpacing: '-0.04em' }}>
          About<br/>Me
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.6, maxWidth: '600px', margin: '0 auto 40px' }}>
          This dedicated About page is initialized and ready to be custom edited and designed!
        </p>
        <Link href="/" style={{ textDecoration: 'underline', opacity: 0.8, color: 'white' }}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
