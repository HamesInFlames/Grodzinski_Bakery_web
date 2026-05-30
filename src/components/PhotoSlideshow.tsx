import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface SlideshowPhoto {
  src: string;
  alt: string;
}

interface PhotoSlideshowProps {
  photos: SlideshowPhoto[];
  className?: string;
  /** Time each photo is shown, in milliseconds */
  interval?: number;
  /** Which photo to show first (offset for visual variety between instances) */
  startIndex?: number;
}

/**
 * Crossfading photo slideshow with a slow Ken Burns pan/zoom on each frame.
 * Falls back to a single static image when the user prefers reduced motion.
 */
export function PhotoSlideshow({
  photos,
  className = '',
  interval = 5000,
  startIndex = 0,
}: PhotoSlideshowProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(
    photos.length ? startIndex % photos.length : 0,
  );

  useEffect(() => {
    if (reducedMotion || photos.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      interval,
    );
    return () => clearInterval(id);
  }, [reducedMotion, photos.length, interval]);

  if (!photos.length) return null;

  if (reducedMotion) {
    const photo = photos[index] ?? photos[0];
    return (
      <div className={`photo-slideshow ${className}`.trim()}>
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="photo-slideshow__img"
        />
      </div>
    );
  }

  const current = photos[index];
  // Alternate the pan direction (zoom in vs. zoom out) per frame for variety.
  const zoomIn = index % 2 === 0;

  return (
    <div className={`photo-slideshow ${className}`.trim()}>
      <AnimatePresence>
        <motion.img
          key={index}
          src={current.src}
          alt={current.alt}
          loading="lazy"
          className="photo-slideshow__img"
          initial={{ opacity: 0, scale: zoomIn ? 1.0 : 1.12 }}
          animate={{ opacity: 1, scale: zoomIn ? 1.12 : 1.0 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: interval / 1000 + 1.4, ease: 'linear' },
          }}
        />
      </AnimatePresence>
    </div>
  );
}
