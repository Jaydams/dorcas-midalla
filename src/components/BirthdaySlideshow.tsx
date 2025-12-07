import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideImage } from './SlideImage';
import { ProgressIndicators } from './ProgressIndicators';
import { ConfettiEffect } from './ConfettiEffect';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

interface BirthdaySlideshowProps {
  images: string[];
  celebrantName: string;
  occasion: string;
  autoplayInterval?: number;
}

export const BirthdaySlideshow = ({
  images,
  celebrantName,
  occasion,
  autoplayInterval = 4500,
}: BirthdaySlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoaded(true); // Show anyway
      }
    };

    preloadImages();
  }, [images]);

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isPlaying || !isLoaded) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, images.length, autoplayInterval, isLoaded]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  }, []);

  // const toggleFullscreen = useCallback(() => {
  //   if (!document.fullscreenElement) {
  //     containerRef.current?.requestFullscreen();
  //   } else {
  //     document.exitFullscreen();
  //   }
  // }, []);

  // Keyboard navigation
  useKeyboardNavigation({
    onPrevious: goToPrevious,
    onNext: goToNext,
    onPlayPause: togglePlayPause,
  });

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 font-light">Loading celebration...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Confetti */}
      {showConfetti && <ConfettiEffect />}

      {/* Images */}
      <div className="relative h-screen">
        <AnimatePresence mode="wait">
          {images.map((image, index) => (
            index === currentIndex && (
              <SlideImage
                key={image}
                src={image}
                alt={`${celebrantName} - Photo ${index + 1}`}
                isActive={index === currentIndex}
              />
            )
          ))}
        </AnimatePresence>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          className="absolute bottom-16 left-0 right-0 text-center z-20 px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-2xl"
          >
            {celebrantName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="font-light text-md md:text-2xl text-gold-300 drop-shadow-lg tracking-wide"
          >
            {occasion}
          </motion.p>
        </motion.div>

        {/* Controls */}
        {/* <div className="absolute bottom-24 left-0 right-0 z-20">
          <Controls
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onFullscreen={toggleFullscreen}
          />
        </div> */}

        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-20">
          <ProgressIndicators
            total={images.length}
            current={currentIndex}
            onSelect={goToSlide}
          />
        </div>

        {/* Slide counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-8 right-8 z-20 text-white/60 text-sm font-light"
        >
          {currentIndex + 1} / {images.length}
        </motion.div>
      </div>
    </div>
  );
};
