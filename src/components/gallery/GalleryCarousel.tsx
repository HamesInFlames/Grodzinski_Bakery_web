import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { galleryItems } from '@/data/galleryItems';
import { GalleryHero } from './GalleryHero';
import { GalleryThumbnails } from './GalleryThumbnails';
import { GalleryLightbox } from './GalleryLightbox';

/**
 * Parent that owns the carousel API + active-slide state. Children stay synced:
 *   - GalleryHero reads `emblaRef` and the active index.
 *   - GalleryThumbnails calls `scrollTo` and auto-centers the active thumbnail.
 *   - GalleryLightbox is decoupled — it opens via the View All tile.
 */
export function GalleryCarousel(): React.ReactElement {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 25,
    align: 'center',
    skipSnaps: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const viewAllRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (idx: number) => emblaApi?.scrollTo(idx),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    requestAnimationFrame(() => viewAllRef.current?.focus());
  }, []);

  return (
    <div className="gallery-carousel">
      <GalleryHero
        items={galleryItems}
        emblaRef={emblaRef}
        activeIndex={activeIndex}
        onPrev={scrollPrev}
        onNext={scrollNext}
        onDotClick={scrollTo}
      />
      <GalleryThumbnails
        items={galleryItems}
        activeIndex={activeIndex}
        onSelect={scrollTo}
        onViewAll={openLightbox}
        viewAllRef={viewAllRef}
      />
      <GalleryLightbox
        items={galleryItems}
        open={lightboxOpen}
        onClose={closeLightbox}
      />
    </div>
  );
}

export default GalleryCarousel;
