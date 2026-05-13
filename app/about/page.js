'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Magnetic from '../../components/Magnetic';
import TextType from '../../components/TextType';

export default function AboutPage() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cinematic Layer Peel Shrink Effect for About Page
  useEffect(() => {
    let ctx;
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      
      ctx = gsap.context(() => {
        gsap.to('#about-intro', {
          scrollTrigger: {
            trigger: '#about-story', // When story section overlaps
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
          scale: 0.9,
          opacity: 0.5,
          transformOrigin: 'top center',
          ease: 'none'
        });
      });
    };
    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <div className="about-page">
      {/* ============================================
         CINEMATIC STICKY INTRO (PEELS BACK ON SCROLL)
         ============================================ */}
      <div className="about-intro" id="about-intro">
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
          <TextType
            as="h1"
            text="Where artistic imagination meets the scalable architecture of next-generation web engineering."
            typingSpeed={40}
            loop={false}
            showCursor={true}
            cursorCharacter="_"
            className="about-hero__title"
          />
          
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
      </div> {/* End .about-intro */}

      {/* The Editorial Story Section */}
      <section className="about-story" id="about-story">
        <div className="about-story__container">
          <div className="about-story__grid">
            
            {/* Left Column: High-end portrait visual */}
            <div className="about-story__img-wrapper">
              <img src="/abdul_haseeb_iqbal.png" alt="Abdul Haseeb Iqbal" className="about-story__img" />
            </div>
            
            {/* Right Column: Sophisticated textual deep-dive */}
            <div className="about-story__content">
              <span className="about-story__label">MY STORY & BACKGROUND</span>
              
              <h2 className="about-story__heading">
                I engineer sophisticated digital logic hidden beneath flawless visual layers.
              </h2>
              
              <div className="about-story__paragraphs">
                <p>
                  I specialize in fusing elite aesthetic sensibilities with rigid engineering principles. For me, code is not just about getting things to work—it is an expressive language used to render fluid user motions and flawless system architecture.
                </p>
                <p>
                  From dynamic, animation-rich interactive websites to heavy-duty, scalable backend systems and customized software suites, I handle the entire spectrum of modern creation. My absolute driving focus is delivering solutions that are fast, visually unparalleled, and strategically robust.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================
         THE ENGINEERING TOOLKIT SECTION
         ============================================ */}
      <section className="about-toolkit">
        <div className="about-toolkit__container">
          <div className="about-toolkit__grid">
            
            {/* LEFT COLUMN: Engineering Toolkit Heading & Tech Stack Grid */}
            <div className="about-toolkit__left">
              <div className="about-toolkit__heading-wrapper">
                <h2 className="about-toolkit__title">
                  Engineering<br />
                  <span className="about-toolkit__title--accent">Toolkit</span>
                </h2>
                <span className="about-toolkit__subtitle">My tech stack</span>
              </div>

              <div className="about-toolkit__tech-grid">
                {/* Tech 1: React */}
                <Magnetic strength={0.3}>
                  <div className="tech-card" data-name="React">
                    <svg viewBox="0 0 100 100" width="40" height="40">
                      <circle cx="50" cy="50" r="8" fill="currentColor"/>
                      <ellipse cx="50" cy="50" rx="38" ry="15" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(0 50 50)"/>
                      <ellipse cx="50" cy="50" rx="38" ry="15" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(60 50 50)"/>
                      <ellipse cx="50" cy="50" rx="38" ry="15" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(120 50 50)"/>
                    </svg>
                  </div>
                </Magnetic>

                {/* Tech 2: Next.js */}
                <Magnetic strength={0.3}>
                  <div className="tech-card" data-name="Next.js">
                    <svg viewBox="0 0 256 256" width="40" height="40">
                      <circle cx="128" cy="128" r="128" fill="currentColor"/>
                      <path fill="white" d="M210.2 200.8L107.7 68.6H87.5v118.8h17.8v-94.2l92.1 119c4.2-3.3 8.3-6.9 12.8-11.4z"/>
                      <rect x="168.2" y="68.6" width="17.8" height="118.8" fill="white"/>
                    </svg>
                  </div>
                </Magnetic>

                {/* Tech 3: TypeScript */}
                <Magnetic strength={0.3}>
                  <div className="tech-card" data-name="TypeScript">
                    <svg viewBox="0 0 100 100" width="40" height="40" fill="currentColor">
                      <rect width="100" height="100" rx="8" />
                      <path d="M30 70 V35 H55 M42.5 35 V70 M62 48 Q75 35 80 50 Q85 65 70 70" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
                      <text x="70" y="85" fill="white" fontSize="45" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">TS</text>
                    </svg>
                  </div>
                </Magnetic>

                {/* Tech 4: Python */}
                <Magnetic strength={0.3}>
                  <div className="tech-card" data-name="Python">
                    <svg viewBox="0 0 100 100" width="40" height="40" fill="currentColor">
                      <path d="M50 10 C28 10 29 27 29 27 L29 35 L51 35 L51 38 L22 38 C22 38 10 37 10 59 C10 81 24 80 24 80 L29 80 L29 71 C29 71 28 55 44 55 L65 55 C65 55 78 55 78 41 L78 24 C78 24 78 10 50 10 Z M40 20 A3 3 0 1 1 40.1 20 Z" />
                      <path d="M50 90 C72 90 71 73 71 73 L71 65 L49 65 L49 62 L78 62 C78 62 90 63 90 41 C90 19 76 20 76 20 L71 20 L71 29 C71 29 72 45 56 45 L35 45 C35 45 22 45 22 59 L22 76 C22 76 22 90 50 90 Z M60 80 A3 3 0 1 1 60.1 80 Z" opacity="0.8"/>
                    </svg>
                  </div>
                </Magnetic>

                {/* Tech 5: Express */}
                <Magnetic strength={0.3}>
                  <div className="tech-card" data-name="Express.js">
                    <span style={{ fontSize: '22px', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>ex</span>
                  </div>
                </Magnetic>

                {/* Tech 6: AI Integration */}
                <Magnetic strength={0.3}>
                  <div className="tech-card" data-name="AI / GPT">
                    <svg viewBox="0 0 100 100" width="40" height="40" fill="currentColor">
                      <path d="M89.6 43.3C88 32.6 79.4 24.3 68.8 22.8C63 13.2 51.7 8.4 40.6 10.8c-11 2.4-19.9 10.9-22.6 21.9C8.5 34.3 2.3 43.9 3.2 54.8c.9 10.8 8.5 19.8 19 22.3 4.4 10.6 15.2 17.1 26.6 16.1 11.3-.9 20.9-8.7 23.4-19.8 9.5-2.1 16.7-9.4 18.5-19 .6-.4 1-.9 1.5-1.4 2-2.9 2.6-6.4 2.6-9.7z" opacity="0.9" />
                      <circle cx="50" cy="50" r="15" fill="white" />
                    </svg>
                  </div>
                </Magnetic>

                {/* Tech 7: MongoDB */}
                <Magnetic strength={0.3}>
                  <div className="tech-card" data-name="MongoDB">
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                      <path d="M17.193 10.515c0-3.503-2.266-7.06-4.783-10.515-.438-.6-.596-.6-.875 0-2.5 3.455-4.798 7.012-4.798 10.515 0 3.146 1.133 5.333 3.207 7.106V22.5c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5v-4.882c2.13-1.77 3.249-3.957 3.249-7.103zm-4.793-6.142c1.64 2.452 3.293 5.093 3.293 6.142 0 2.642-.95 4.223-2.763 5.655v-1.649c0-.552-.448-1-1-.5-1-.5-1.5.448-1 1v1.149c-1.813-1.432-2.763-3.013-2.763-5.655 0-1.049 1.59-3.69 3.233-6.142z" />
                    </svg>
                  </div>
                </Magnetic>

                {/* Tech 8: PostgreSQL */}
                <Magnetic strength={0.3}>
                  <div className="tech-card" data-name="PostgreSQL">
                    <svg viewBox="0 0 100 100" width="40" height="40" fill="currentColor">
                      <path d="M90 55 C90 25 65 20 50 20 C35 20 10 25 10 55 C10 75 25 85 50 85 C75 85 90 75 90 55 Z" opacity="0.2"/>
                      <path d="M45 30 C30 30 20 40 20 55 C20 68 28 78 40 80 C35 75 33 68 33 60 C33 45 40 35 50 35 C58 35 65 42 67 52 C70 45 78 40 85 42 L85 48 C78 48 74 53 73 60 C72 68 75 75 80 80 C83 75 85 68 85 60 C85 45 75 35 60 35 C58 35 55 30 45 30 Z" />
                    </svg>
                  </div>
                </Magnetic>

                {/* Tech 9: Figma */}
                <Magnetic strength={0.3}>
                  <div className="tech-card" data-name="Figma">
                    <svg viewBox="0 0 24 36" width="28" height="40" fill="currentColor">
                      <path d="M12 0a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zM6 18a6 6 0 0 0 6 6 6 6 0 0 0 6-6V12H6v6zM6 30a6 6 0 0 0 6 6v-6H6z" />
                      <path d="M0 18a6 6 0 0 0 6 6V12H0v6z" opacity="0.8"/>
                      <path d="M0 6a6 6 0 0 0 6 6V0H0v6z" opacity="0.6"/>
                    </svg>
                  </div>
                </Magnetic>
              </div>
            </div>

            {/* RIGHT COLUMN: Capabilities / Services List */}
            <div className="about-toolkit__right">
              <ul className="capability-list">
                
                <li className="capability-item">
                  <span className="capability-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </span>
                  <span className="capability-text">Full Stack Development</span>
                </li>

                <li className="capability-item">
                  <span className="capability-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </span>
                  <span className="capability-text">React Development</span>
                </li>

                <li className="capability-item">
                  <span className="capability-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </span>
                  <span className="capability-text">Performance Optimization</span>
                </li>

                <li className="capability-item">
                  <span className="capability-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
                    </svg>
                  </span>
                  <span className="capability-text">UI/UX Design</span>
                </li>

                <li className="capability-item">
                  <span className="capability-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </span>
                  <span className="capability-text">Code Architecture Reviews</span>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================
         MIRRORED PREMIUM CONTACT FOOTER
         ============================================ */}
      <section className="contact" id="contact" style={{ zIndex: 5 }}>
        <div className="contact__title-wrapper">
          <h2 className="contact__title">
            Let's work<br />together
          </h2>
        </div>

        <div className="contact__actions">
          <Magnetic strength={0.5}>
            <Link href="/contact" className="round-btn round-btn--blue round-btn--large">
              Get in<br />touch
            </Link>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href="mailto:haseebiqb06@gmail.com" className="contact__pill">
              ✉ haseebiqb06@gmail.com
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href="tel:+923019685025" className="contact__pill">
              📞 +92 301 9685025
            </a>
          </Magnetic>
        </div>

        <footer className="footer">
          <span className="footer__copy">2025 © Edition</span>
          <span className="footer__time">{time} PKT</span>
          <div className="footer__socials">
            <a href="#" className="footer__social-link">Instagram</a>
            <a href="#" className="footer__social-link">Twitter</a>
            <a href="#" className="footer__social-link">LinkedIn</a>
            <a href="#" className="footer__social-link">GitHub</a>
          </div>
        </footer>
      </section>
    </div>
  );
}
