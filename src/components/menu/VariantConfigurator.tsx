import { useState, useEffect, useRef, useCallback } from 'react';
import type { MenuItem } from '@/data/products';
import VariantImage from './VariantImage';
import VariantList from './VariantList';

interface VariantConfiguratorProps {
  items: MenuItem[];
  fallbackImage?: string;
}

const ROTATION_INTERVAL = 4000;
const CLICK_PAUSE_DURATION = 5000;
const HOVER_RESUME_DELAY = 2000;

export default function VariantConfigurator({
  items,
  fallbackImage,
}: VariantConfiguratorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkReducedMotion = useCallback(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const photoIndices = items.reduce<number[]>((acc, item, i) => {
    if (item.hasPhoto) acc.push(i);
    return acc;
  }, []);

  const clearPauseTimer = useCallback(() => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (checkReducedMotion() || isPaused || photoIndices.length <= 1) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        if (photoIndices.length === 0) return prev;
        const currentPhotoPos = photoIndices.indexOf(prev);
        const nextPos =
          currentPhotoPos === -1
            ? 0
            : (currentPhotoPos + 1) % photoIndices.length;
        return photoIndices[nextPos];
      });
    }, ROTATION_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, photoIndices, checkReducedMotion]);

  useEffect(() => {
    return () => clearPauseTimer();
  }, [clearPauseTimer]);

  const handleMouseEnter = useCallback(() => {
    clearPauseTimer();
    setIsPaused(true);
  }, [clearPauseTimer]);

  const handleMouseLeave = useCallback(() => {
    clearPauseTimer();
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, HOVER_RESUME_DELAY);
  }, [clearPauseTimer]);

  const handleSelect = useCallback(
    (index: number) => {
      setActiveIndex(index);
      clearPauseTimer();
      setIsPaused(true);
      pauseTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, CLICK_PAUSE_DURATION);
    },
    [clearPauseTimer],
  );

  const currentItem = items[activeIndex] ?? items[0];
  if (!currentItem) return null;

  const imageSrc = currentItem.image ?? fallbackImage;
  const isPlaceholder = !imageSrc;

  return (
    <div
      className="variant-configurator"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <VariantImage
        src={imageSrc}
        alt={currentItem.name}
        isPlaceholder={isPlaceholder}
        placeholderText={currentItem.name}
      />
      <VariantList
        items={items}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      />
    </div>
  );
}
