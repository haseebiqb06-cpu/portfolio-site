'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import SmoothScroll from '../components/SmoothScroll';
import Magnetic from '../components/Magnetic';
import AmbientOrbs from '../components/AmbientOrbs';
import GooeyNav from '../components/GooeyNav';
import CurveMenu from '../components/CurveMenu';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

const projects = [
  { name: 'Lava Me', category: 'Design, Development', year: '2024', img: '/proj1.png' },
  { name: 'Rothco', category: 'Brand Identity, Web', year: '2023', img: '/proj2.png' },
  { name: 'Studio Noak', category: 'Creative Direction', year: '2023', img: '/proj3.png' },
  { name: 'Awwwards', category: 'Design, Motion', year: '2022', img: '/proj1.png' },
];

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [time, setTime] = useState('');
  const [hoveredProject, setHoveredProject] = useState(null);
  const hoverImgRef = useRef(null);
  const marqueeRef = useRef(null);
  const gsapRef = useRef(null);

  // Date setup
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }));
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP marquee
  useEffect(() => {
    if (!preloaderDone) return;
    let ctx;
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      
      gsapRef.current = gsap;
      const track = marqueeRef.current;
      if (!track) return;
      ctx = gsap.context(() => {
        // Marquee timeline
        gsap.to('.marquee__inner', {
          xPercent: -50,
          repeat: -1,
          duration: 68,
          ease: 'none',
        });

        // Cinematic Layer Peel Shrink Effect
        gsap.to('.header', {
          scrollTrigger: {
            trigger: '#about', // As the about section comes into view
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
          scale: 0.9,
          opacity: 0, // COMPLETELY FADE OUT!!!
          pointerEvents: 'none',
          transformOrigin: 'top center',
          ease: 'none'
        });

        // Hide standard floating Navbar on scroll past the fold
        gsap.to('.nav', {
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=200', // Fully fade out within 200px of scroll
            scrub: true,
          },
          opacity: 0,
          y: -20, // Lightly drift up out of frame
          pointerEvents: 'none',
          ease: 'none'
        });
      });
    };
    init();
    return () => ctx && ctx.revert();
  }, [preloaderDone]);

  // Floating hover image follow
  useEffect(() => {
    const onMove = (e) => {
      if (hoverImgRef.current) {
        hoverImgRef.current.style.left = (e.clientX + 20) + 'px';
        hoverImgRef.current.style.top = (e.clientY - 100) + 'px';
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <CustomCursor />
      <CurveMenu />
      <SmoothScroll>

        {/* ============ NAVBAR ============ */}
        <nav className="nav">
          <Magnetic strength={0.3}>
            <a href="#" className="nav__logo">© Code by Haseeb</a>
          </Magnetic>
          <div className="nav__links">
            <GooeyNav
              items={navItems}
              particleCount={12}
              particleDistances={[60, 5]}
              particleR={80}
              initialActiveIndex={-1}
              animationTime={400}
              timeVariance={150}
            />
          </div>
        </nav>

        {/* ============ HERO ============ */}
        <header className="header" id="home">
            {/* Left: Floating Location Capsule (Above Marquee) */}
            <div className="header__location-container">
              <Magnetic strength={0.15}>
                <div className="header__location-badge">
                  <div className="header__location-text">
                    <span>Located</span>
                    <span>in the</span>
                    <span>Pakistan</span>
                  </div>
                  <div className="header__globe-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      {/* Vertical grid lines */}
                      <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
                      <path d="M12 2v20" />
                      {/* Horizontal grid lines */}
                      <path d="M2 12h20" />
                      <path d="M4.5 7.5a14 14 0 0 1 15 0" />
                      <path d="M4.5 16.5a14 14 0 0 0 15 0" />
                    </svg>
                  </div>
                </div>
              </Magnetic>
            </div>

            {/* Center: Tall Portrait anchored to bottom */}
            <div className="header__center">
              <div className="header__img-wrapper">
                <img src="/abdul_haseeb_iqbal.png" alt="Abdul Haseeb Iqbal" />
              </div>
            </div>

            {/* Right: Floating Arrow and Subtitle (Above Marquee) */}
            <div className="header__meta-text-container">
              <svg className="header__arrow" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M7 7L17 17M17 17H7M17 17V7"/>
              </svg>
              <div className="header__meta-title">
                Freelance<br />Designer & Developer
              </div>
            </div>

            {/* Giant Overlapping Bottom Marquee */}
            <div className="marquee">
              <div className="marquee__inner" ref={marqueeRef}>
                {[0, 1].map((_, i) => (
                  <div key={i} className="marquee__track">
                    {['Abdul Haseeb Iqbal', 'Abdul Haseeb Iqbal', 'Abdul Haseeb Iqbal', 'Abdul Haseeb Iqbal'].map((t, j) => (
                      <span key={j} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <span className="marquee__text">{t} —</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
        </header>

        {/* ============ ABOUT ============ */}
        <section className="about" id="about">
          <div className="about__container">
            <div className="about__left">
              <h2 className="about__title">
                Crafting the next<br />
                <em>generation of the web.</em>
              </h2>
              <p className="about__body">
                I craft high-end, modern digital experiences that bridge the gap between creative design and technical excellence. 
                My approach combines a deep understanding of modern tech stacks with a passion for fluid animations and scalable architecture.
                Whether it’s transforming a complex idea into a functional web application or optimizing a brand’s digital presence, I build with a focus on precision and impact.
              </p>
              
              <div className="about__cta">
                <Magnetic strength={0.4}>
                  <Link href="/about" className="round-btn">
                    About<br />Me
                  </Link>
                </Magnetic>
              </div>
            </div>

            <div className="about__right">
              <div className="about__cards-stack">
                <div className="about__card card-1">
                  <div className="about__card-inner">
                    <span className="about__card-tag">01 / WEB</span>
                    <h3 className="about__card-title">Modern Web Development</h3>
                    <p className="about__card-text">Creating sleek, responsive, and interactive websites using the latest frontend frameworks.</p>
                  </div>
                </div>
                <div className="about__card card-2">
                  <div className="about__card-inner">
                    <span className="about__card-tag">02 / COMMERCE</span>
                    <h3 className="about__card-title">E-commerce Solutions</h3>
                    <p className="about__card-text">Building robust online stores designed specifically for high-performance conversion and seamless user journeys.</p>
                  </div>
                </div>
                <div className="about__card card-3">
                  <div className="about__card-inner">
                    <span className="about__card-tag">03 / AI</span>
                    <h3 className="about__card-title">AI Integration</h3>
                    <p className="about__card-text">Developing intelligent software tools and specialized pipelines that leverage AI to solve real-world problems.</p>
                  </div>
                </div>
                <div className="about__card card-4">
                  <div className="about__card-inner">
                    <span className="about__card-tag">04 / CRAFT</span>
                    <h3 className="about__card-title">Creative Engineering</h3>
                    <p className="about__card-text">Blending sophisticated, art-directed design principles with remarkably clean, scalable, and maintainable code.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ WORK ============ */}
        <section className="work" id="work">
          <div className="work__header">
            <span className="work__label">Recent work</span>
          </div>

          {/* Floating hover image */}
          <div
            ref={hoverImgRef}
            className={`work__hover-img ${hoveredProject !== null ? 'visible' : ''}`}
          >
            {hoveredProject !== null && (
              <img src={projects[hoveredProject].img} alt={projects[hoveredProject].name} />
            )}
          </div>

          <ul className="work__list">
            {projects.map((p, i) => (
              <li
                key={i}
                className="work__item"
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <span className="work__item-name">{p.name}</span>
                <div className="work__item-meta">
                  <span className="work__item-category">{p.category}</span>
                  <span className="work__item-year">{p.year}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Grid thumbnails */}
          <div className="work__grid">
            {projects.slice(0, 3).map((p, i) => (
              <div key={i} className="work__grid-item">
                <img src={p.img} alt={p.name} className="work__grid-img" />
                <div className="work__grid-overlay">
                  <span className="work__grid-title">{p.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="work__footer">
            <Magnetic strength={0.4}>
              <a href="#" className="round-btn round-btn--large">
                More<br />work
              </a>
            </Magnetic>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section className="contact" id="contact">
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

          {/* Footer bar */}
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

      </SmoothScroll>
    </>
  );
}
