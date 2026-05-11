'use client';
import { useEffect, useRef } from 'react';

export default function AmbientOrbs() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Grid configuration
    const cols = 26; // Number of columns in 3D grid
    const rows = 20; // Number of rows in 3D grid
    const spacingX = 65; // Horizontal spacing between intersections
    const spacingZ = 55; // Depth spacing between intersections
    const fov = 350; // Camera perspective field of view

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for mouse positions
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;

      const centerX = width / 2;
      const centerY = height * 0.55; // Position the grid lower down for landscape feel

      // We will project a 3D grid of points: points[iz][ix] = {px, py, opacity}
      const points = [];

      for (let iz = 0; iz < rows; iz++) {
        points[iz] = [];
        for (let ix = 0; ix < cols; ix++) {
          // 3D coordinates relative to center
          const x3d = (ix - cols / 2) * spacingX;
          const z3d = (iz - rows / 2) * spacingZ + 200; // Push grid forward into screen depth

          // Perfect static, stable, and elegant 3D perspective grid
          let y3d = 0;

          // Final 3D Projection
          const scale = fov / (fov + z3d);
          const px = centerX + x3d * scale;
          const py = centerY + (y3d + 120) * scale; // Adjust base height downwards

          // Fade grid out into depth (Z) and toward the screen edges for luxury vignette
          const zFade = Math.max(0, 1 - (z3d / (rows * spacingZ + 150)));
          const edgeFadeX = Math.max(0, 1 - Math.abs(ix - cols / 2) / (cols / 2));
          const opacity = zFade * edgeFadeX;

          points[iz][ix] = { px, py, opacity };
        }
      }

      // Draw the grid lines with high visibility and crisp strokes
      ctx.lineWidth = 1.2;

      for (let iz = 0; iz < rows; iz++) {
        for (let ix = 0; ix < cols; ix++) {
          const p = points[iz][ix];

          // Draw horizontal line connecting to neighbor on the right
          if (ix < cols - 1) {
            const pRight = points[iz][ix + 1];
            const avgOpacity = (p.opacity + pRight.opacity) / 2;
            ctx.beginPath();
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(pRight.px, pRight.py);
            ctx.strokeStyle = `rgba(28, 29, 32, ${avgOpacity * 0.22})`;
            ctx.stroke();
          }

          // Draw vertical line connecting to neighbor below (creating perspective depth)
          if (iz < rows - 1) {
            const pBelow = points[iz + 1][ix];
            const avgOpacity = (p.opacity + pBelow.opacity) / 2;
            ctx.beginPath();
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(pBelow.px, pBelow.py);
            ctx.strokeStyle = `rgba(28, 29, 32, ${avgOpacity * 0.22})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0, // Sit right above body and behind all text layers
        opacity: 0.9,
      }}
    />
  );
}
