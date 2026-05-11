'use client';
import { useEffect, useRef, useState } from 'react';

const words = ['Hello', 'Olá', 'Bonjour', 'Hola', 'Ciao', 'Sveiki'];
const DURATION = 2000; // ms total duration

export default function Preloader({ onComplete }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const barRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  // Sync onComplete reference to prevent timer resets
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 100;
    let wordIndex = 0;
    const wordInterval = Math.floor(totalFrames / words.length);

    const timer = setInterval(() => {
      frame++;
      const pct = Math.min(Math.round((frame / totalFrames) * 100), 100);
      setCount(pct);
      
      if (barRef.current) {
        barRef.current.style.width = pct + '%';
      }

      const newWordIdx = Math.min(Math.floor(frame / wordInterval), words.length - 1);
      if (newWordIdx !== wordIndex) {
        wordIndex = newWordIdx;
        setCurrentWord(wordIndex);
      }

      if (frame >= totalFrames) {
        clearInterval(timer);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
          }, 800);
        }, 150);
      }
    }, Math.floor(DURATION / totalFrames));

    return () => clearInterval(timer);
  }, []); // Run ONLY once on mount to prevent erratic resets

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#1C1D20',
        zIndex: 9999, // Max z-index to stay on top
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        transition: exiting ? 'clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        clipPath: exiting ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)',
      }}
    >
      {/* Greeting word (Centered and fully visible) */}
      <div 
        style={{ 
          height: '120px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 'clamp(44px, 8vw, 85px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'opacity 0.15s ease',
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          {words[currentWord]}
        </span>
      </div>

      {/* Percentage counter */}
      <div
        style={{
          color: 'rgba(255, 255, 255, 0.55)',
          fontSize: '20px',
          fontWeight: 400,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          marginTop: 24,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}%
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 240,
          height: 3,
          background: 'rgba(255, 255, 255, 0.12)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            background: '#FFFFFF',
            width: '0%',
            borderRadius: 2,
            transition: 'width 0.05s linear',
          }}
        />
      </div>
    </div>
  );
}
