import type { KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import type { GalleryItem } from '@/data/galleryItems';

type EmblaViewportRef = UseEmblaCarouselType[0];

type Props = {
  items: GalleryItem[];
  emblaRef: EmblaViewportRef;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (idx: number) => void;
};

export function GalleryHero({
  items,
  emblaRef,
  activeIndex,
  onPrev,
  onNext,
  onDotClick,
}: Props): React.ReactElement {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      onNext();
    }
  }

  return (
    <div
      className="gallery-hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Custom creations gallery"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="gallery-hero-carousel__stage">
        <button
          type="button"
          className="gallery-hero-carousel__arrow gallery-hero-carousel__arrow--prev"
          onClick={onPrev}
          aria-label="Previous cake"
        >
          <ChevronLeft size={22} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="gallery-hero-carousel__frame">
          <div className="gallery-hero-carousel__viewport" ref={emblaRef}>
            <div className="gallery-hero-carousel__container">
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
                const isNeighbour =
                  idx === (activeIndex + 1) % items.length ||
                  idx === (activeIndex - 1 + items.length) % items.length;
                return (
                  <div
                    key={item.id}
                    className="gallery-hero-carousel__slide"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} of ${items.length}`}
                    aria-hidden={!isActive}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="gallery-hero-carousel__image"
                      loading={isActive || isNeighbour ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="gallery-hero-carousel__arrow gallery-hero-carousel__arrow--next"
          onClick={onNext}
          aria-label="Next cake"
        >
          <ChevronRight size={22} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="gallery-hero-carousel__dots" role="tablist" aria-label="Slide indicator">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className={`gallery-hero-carousel__dot${idx === activeIndex ? ' is-active' : ''}`}
            onClick={() => onDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default GalleryHero;
