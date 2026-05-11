'use client';
import { useEffect, useRef } from 'react';

export default function WireframeSphere() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Generate vertices on a sphere
    const vertices = [];
    const rings = 12; // horizontal lines
    const segments = 16; // vertical lines
    const radius = Math.min(width, height) * 0.28;

    for (let r = 0; r <= rings; r++) {
      const theta = (r * Math.PI) / rings;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let s = 0; s < segments; s++) {
        const phi = (s * 2 * Math.PI) / segments;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = radius * sinTheta * cosPhi;
        const y = radius * sinTheta * sinPhi;
        const z = radius * cosTheta;

        vertices.push({ x, y, z, ox: x, oy: y, oz: z });
      }
    }

    // Rotation angles
    let angleX = 0.002;
    let angleY = 0.003;

    // Projection setup
    const fov = 400;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = x * 0.0005;
      mouseRef.current.targetY = y * 0.0005;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const rotateX = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = point.y * cos - point.z * sin;
      const z = point.z * cos + point.y * sin;
      return { ...point, y, z };
    };

    const rotateY = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = point.x * cos - point.z * sin;
      const z = point.z * cos + point.x * sin;
      return { ...point, x, z };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Update rotation angles based on time + mouse
      const currentAngleX = angleX + mouseRef.current.y;
      const currentAngleY = angleY + mouseRef.current.x;

      // Rotate and project vertices
      const projected = vertices.map((v) => {
        // Rotate the vertices
        let p = rotateX(v, currentAngleX);
        p = rotateY(p, currentAngleY);

        // Keep rotated values for continuous rotation
        v.x = p.x;
        v.y = p.y;
        v.z = p.z;

        // Apply depth perspective projection
        const scale = fov / (fov + p.z);
        const projX = p.x * scale + width / 2;
        const projY = p.y * scale + height / 2;

        return { x: projX, y: projY, z: p.z, scale };
      });

      // Draw Grid Lines (Horizontal rings)
      ctx.lineWidth = 0.8;
      for (let r = 0; r <= rings; r++) {
        ctx.beginPath();
        for (let s = 0; s < segments; s++) {
          const idx = r * segments + s;
          const nextIdx = r * segments + ((s + 1) % segments);
          const p1 = projected[idx];
          const p2 = projected[nextIdx];

          if (p1 && p2) {
            // Fade lines based on depth (z coordinate)
            const averageZ = (p1.z + p2.z) / 2;
            const alpha = Math.max(0.08, Math.min(0.5, 0.3 - averageZ / (radius * 2)));
            ctx.strokeStyle = `rgba(28, 29, 32, ${alpha})`;

            if (s === 0) {
              ctx.moveTo(p1.x, p1.y);
            } else {
              ctx.lineTo(p1.x, p1.y);
            }
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw Grid Lines (Vertical segments)
      for (let s = 0; s < segments; s++) {
        ctx.beginPath();
        for (let r = 0; r <= rings; r++) {
          const idx = r * segments + s;
          const p = projected[idx];

          if (p) {
            const alpha = Math.max(0.08, Math.min(0.5, 0.3 - p.z / (radius * 2)));
            ctx.strokeStyle = `rgba(28, 29, 32, ${alpha})`;

            if (r === 0) {
              ctx.moveTo(p.x, p.y);
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw elegant glowing dots on vertex intersections
      projected.forEach((p) => {
        if (p.z < 100) { // Only draw dots on the front half
          const alpha = Math.max(0, Math.min(0.8, 0.4 - p.z / (radius * 2)));
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2 * p.scale, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(69, 92, 233, ${alpha})`; // Beautiful brand blue accent dots
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.85,
      }}
    />
  );
}
