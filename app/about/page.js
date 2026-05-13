'use client';

import React from 'react';
import Link from 'next/link';
import Magnetic from '../../components/Magnetic';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* High-end top navigation row mirroring specific editorial reference */}
      <header className="about-page__header">
        <div className="about-page__logo">
          <Link href="/">© Code by Abdul</Link>
        </div>
        <nav className="about-page__nav">
          <Magnetic strength={0.2}><Link href="/" className="nav-item">Work</Link></Magnetic>
          <Magnetic strength={0.2}><Link href="/about" className="nav-item active">About</Link></Magnetic>
          <Magnetic strength={0.2}><Link href="/contact" className="nav-item">Contact</Link></Magnetic>
        </nav>
      </header>

      {/* The Massive Editorial Hero Section */}
      <section className="about-hero">
        <div className="about-hero__container">
          
          {/* Exact Statement from User's Instruction */}
          <h1 className="about-hero__title">
            Where artistic imagination meets the scalable architecture of next-generation web engineering.
          </h1>
          
          {/* Hairline divider with floating Magnetic Globe Button */}
          <div className="about-hero__divider-wrapper">
            <div className="about-hero__line"></div>
            
            <Magnetic strength={0.4}>
              <div className="about-hero__globe-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="50" height="50">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M2 12h20"></path>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
            </Magnetic>
          </div>

        </div>
      </section>
    </div>
  );
}
