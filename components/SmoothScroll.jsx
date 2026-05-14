'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname(); // Track route changes

  useEffect(() => {
    let lenis;
    const init = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      });
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    init();
    
    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  // MAGIC FIX: Every time you change pages, force scroll to instant TOP!
  useEffect(() => {
    // Small delay so Next.js completes DOM injection before scrolling
    const timeoutId = setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          if (lenisRef.current) {
            // Instant snap to target to match default browser link mechanics
            lenisRef.current.scrollTo(target, { immediate: true });
          } else {
            target.scrollIntoView();
          }
          return;
        }
      }
      
      // Default: reset to top if no hash present
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return <>{children}</>;
}
