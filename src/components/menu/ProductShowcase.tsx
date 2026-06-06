import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PLACEHOLDER = '/images/home/logo_trensparent.png';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface Slide {
  label: string;
  src: string;
}

interface ShowcaseImageProps {
  src: string;
  alt: string;
  className: string;
  eager?: boolean;
}

/** Image that swaps to the branded placeholder if the real photo is missing. */
function ShowcaseImage({ src, alt, className, eager }: ShowcaseImageProps) {
  const [failed, setFailed] = useState(false);

  // Reset the error state when the source changes (e.g. switching flavours).
  useEffect(() => {
    setFailed(false);
  }, [src]);

  const isPlaceholder = failed || !src;
  return (
    <img
      src={isPlaceholder ? PLACEHOLDER : src}
      alt={alt}
      className={`${className}${isPlaceholder ? ' is-placeholder' : ''}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

export interface ProductShowcaseProps {
  heading: string;
  flavours: string[];
  groupId: string;
  assortedImage?: string;
  groupImage?: string;
  /** Directory the per-flavour photos are derived from. */
  imageBase?: string;
  /** Noun used in the "— N flavours" subhead (e.g. "specialty"). */
  flavourNoun?: string;
}

export default function ProductShowcase({
  heading,
  flavours,
  groupId,
  assortedImage,
  groupImage,
  imageBase = '/images/menu',
  flavourNoun = 'flavour',
}: ProductShowcaseProps) {
  const slides: Slide[] = [
    { label: 'Assorted', src: assortedImage || groupImage || PLACEHOLDER },
    ...flavours.map((name) => ({
      label: name,
      src: `${imageBase}/${groupId}/${slugify(name)}.webp`,
    })),
  ];

  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const count = slides.length;
  const prev = () => setActive((i) => (i - 1 + count) % count);
  const next = () => setActive((i) => (i + 1) % count);

  // Keep the active thumbnail centered within the strip (port of GalleryThumbnails).
  useEffect(() => {
    const strip = stripRef.current;
    const target = itemRefs.current[active];
    if (!strip || !target) return;
    const stripRect = strip.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const delta =
      targetRect.left + targetRect.width / 2 - (stripRect.left + stripRect.width / 2);
    if (Math.abs(delta) > 1) {
      strip.scrollBy({ left: delta, behavior: 'smooth' });
    }
  }, [active]);

  const activeSlide = slides[active];

  return (
    <section className="product-showcase" aria-label={heading}>
      <header className="product-showcase__header">
        <h3 className="product-showcase__title">
          {heading}
          <span className="product-showcase__flavour-count">
            {' — '}
            {flavours.length}{' '}
            {flavours.length === 1
              ? flavourNoun
              : flavourNoun.endsWith('y')
                ? `${flavourNoun.slice(0, -1)}ies`
                : `${flavourNoun}s`}
          </span>
        </h3>
      </header>

      <div className="product-showcase__stage">
        <button
          type="button"
          className="product-showcase__arrow product-showcase__arrow--prev"
          onClick={prev}
          aria-label="Previous flavour"
        >
          <ChevronLeft size={28} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <div className="product-showcase__frame">
          <ShowcaseImage
            src={activeSlide.src}
            alt={
              active === 0
                ? `Assorted ${heading.toLowerCase()}`
                : `${activeSlide.label} — ${heading}`
            }
            className="product-showcase__image"
            eager
          />
          <span className="product-showcase__caption">{activeSlide.label}</span>
        </div>

        <button
          type="button"
          className="product-showcase__arrow product-showcase__arrow--next"
          onClick={next}
          aria-label="Next flavour"
        >
          <ChevronRight size={28} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div
        className="product-showcase__thumbs"
        ref={stripRef}
        role="tablist"
        aria-label={`${heading} flavours`}
      >
        {slides.map((slide, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={slide.label}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show ${slide.label}`}
              className={`product-showcase__thumb${isActive ? ' is-active' : ''}`}
              onClick={() => setActive(idx)}
            >
              <ShowcaseImage
                src={slide.src}
                alt=""
                className="product-showcase__thumb-image"
              />
              <span className="product-showcase__thumb-label">{slide.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
