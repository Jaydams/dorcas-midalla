import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SlideImageProps {
  src: string;
  alt: string;
  isActive: boolean;
}

export const SlideImage = ({ src, alt, isActive }: SlideImageProps) => {
  const [kenBurns, setKenBurns] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (isActive) {
      // Random Ken Burns effect direction
      const directions = [
        { scale: 1.08, x: -3, y: -3 },
        { scale: 1.08, x: 3, y: -3 },
        { scale: 1.08, x: -3, y: 3 },
        { scale: 1.08, x: 3, y: 3 },
        { scale: 1.08, x: 0, y: 0 },
      ];
      setKenBurns(directions[Math.floor(Math.random() * directions.length)]);
    }
  }, [isActive, src]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isActive
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.95 }
      }
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{
        opacity: { duration: 0.6, ease: 'easeOut' },
        scale: { duration: 0.6, ease: 'easeOut' },
      }}
      className="absolute inset-0"
    >
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-slate-900">
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 z-10 pointer-events-none" />

        <motion.img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain"
          style={{
            imageRendering: 'high-quality',
          }}
          animate={
            isActive
              ? {
                  scale: kenBurns.scale,
                  x: `${kenBurns.x}%`,
                  y: `${kenBurns.y}%`,
                }
              : { scale: 1, x: '0%', y: '0%' }
          }
          transition={{
            duration: 5,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
};
