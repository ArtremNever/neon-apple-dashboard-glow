
import { useEffect, useRef } from 'react';

export const WaveAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    };

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
      gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.1)');
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 10) {
        const y = Math.sin((x * 0.01) + (time * 0.02)) * 30 + 
                  Math.sin((x * 0.005) + (time * 0.01)) * 20 + 
                  canvas.height / 2;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Second wave
      const gradient2 = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient2.addColorStop(0, 'rgba(34, 197, 94, 0.2)');
      gradient2.addColorStop(1, 'rgba(34, 197, 94, 0)');

      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 10) {
        const y = Math.sin((x * 0.008) + (time * 0.03)) * 25 + 
                  Math.sin((x * 0.012) + (time * 0.015)) * 15 + 
                  canvas.height / 2 + 20;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      time += 1;
      animationRef.current = requestAnimationFrame(drawWave);
    };

    resizeCanvas();
    drawWave();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full pointer-events-none z-0"
      style={{ height: '200px' }}
    />
  );
};
