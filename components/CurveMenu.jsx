'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Magnetic from './Magnetic';
import './CurveMenu.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' }
];

const CurveMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Track Window Scroll to Trigger Burger Scale In
  useEffect(() => {
    const handleScroll = () => {
      // Scales in after 150px of scrolling (Snellenberg fold standard)
      if (window.scrollY > 150) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check just in case user starts scrolled down
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🧬 Elastic Curved SVG Morphs (Hardware-Accelerated)
  const curvePath = {
    initial: {
      d: 'M 100 0 L 100 100 Q 100 50 100 0' // Flat edge at rest
    },
    enter: {
      d: 'M 100 0 L 100 100 Q 0 50 100 0', // Bouncy inward curve
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: 'M 100 0 L 100 100 Q 100 50 100 0', // Snaps back to flat
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  // 📐 Sliding Drawer Variants
  const menuSlide = {
    initial: { x: 'calc(100% + 100px)' },
    enter: { x: '0%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: 'calc(100% + 100px)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  // 🔗 Text Slide-Up Entrance Variants
  const navLinkSlide = {
    initial: { x: '80px', opacity: 0 },
    enter: (i) => ({
      x: '0px',
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
    }),
    exit: (i) => ({
      x: '80px',
      opacity: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
    })
  };

  return (
    <>
      {/* 🍔 THE FLOATING MAGNETIC BURGER TRIGGER */}
      <AnimatePresence mode="wait">
        {isActive && !menuOpen && (
          <motion.div
            className="curve-burger-wrap"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Magnetic strength={0.3}>
              <button 
                className="curve-burger" 
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
              >
                <span className="curve-burger__line"></span>
                <span className="curve-burger__line"></span>
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌊 THE ELASTIC DRAWER OVERLAY */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="curve-menu"
          >
            {/* 📐 SVG Curve Perimeter Block */}
            <svg className="curve-menu__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                variants={curvePath}
                initial="initial"
                animate="enter"
                exit="exit"
              />
            </svg>

            {/* ✖️ FLOATING BLUE CLOSE BUTTON OVERLAY */}
            <div className="curve-close-wrap">
              <Magnetic strength={0.3}>
                <button 
                  className="curve-close" 
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </Magnetic>
            </div>

            {/* 📝 NAVIGATION CONTENT BODYSHELL */}
            <div className="curve-menu__body">
              <span className="curve-menu__label">Navigation</span>
              <ul className="curve-menu__nav">
                {navItems.map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={navLinkSlide}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="curve-menu__nav-item"
                  >
                    <span className="curve-menu__indicator"></span>
                    <Link
                      href={item.href}
                      className="curve-menu__link"
                      onClick={() => setMenuOpen(false)} // Automatically close drawer on navigation
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* 🌐 SOCIAL MEDIA ROW UTILITY FOOTER */}
            <div className="curve-menu__footer">
              <span className="curve-menu__label" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 5 }}>Socials</span>
              <div className="curve-menu__socials">
                <a href="#" target="_blank" rel="noreferrer" className="curve-menu__social-link">Awwwards</a>
                <a href="#" target="_blank" rel="noreferrer" className="curve-menu__social-link">Instagram</a>
                <a href="#" target="_blank" rel="noreferrer" className="curve-menu__social-link">Twitter</a>
                <a href="#" target="_blank" rel="noreferrer" className="curve-menu__social-link">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CurveMenu;
