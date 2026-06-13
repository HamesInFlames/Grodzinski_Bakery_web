import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getItemPhoto } from '@/data/productPhotoMap';

const PLACEHOLDER = '/images/home/logo_trensparent.png';

/** Slide the main image in/out along the direction of travel (next = +1). */
const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0 }),
};

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
  /**
   * Photo-map namespace for per-flavour lookups. Defaults to `groupId`, but a
   * section can override it when several sections share one group yet need
   * independent photos (e.g. Bagels vs Breads both live in `breads`).
   */
  photoGroupId?: string;
  /** Hero "assorted" slide image. When omitted, the section has no Assorted slide. */
  assortedImage?: string;
  /** Directory the per-flavour photos are derived from. */
  imageBase?: string;
  /** Noun used in the "— N flavours" subhead (e.g. "specialty"). */
  flavourNoun?: string;
}

export default function ProductShowcase({
  heading,
  flavours,
  groupId,
  photoGroupId,
  assortedImage,
  imageBase = '/images/menu',
  flavourNoun = 'flavour',
}: ProductShowcaseProps) {
  const photoKey = photoGroupId ?? groupId;
  const slides: Slide[] = [
    ...(assortedImage ? [{ label: 'Assorted', src: assortedImage }] : []),
    ...flavours.map((name) => ({
      label: name,
      src:
        getItemPhoto(photoKey, name) ??
        `${imageBase}/${photoKey}/${slugify(name)}.webp`,
    })),
  ];

  const [active, setActive] = useState(0);
  // Travel direction of the last change (+1 next, -1 prev) drives the slide.
  const [direction, setDirection] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const count = slides.length;
  const go = (target: number, dir: number) => {
    setDirection(dir);
    setActive(target);
  };
  const prev = () => go((active - 1 + count) % count, -1);
  const next = () => go((active + 1) % count, 1);
  const select = (idx: number) => {
    if (idx !== active) go(idx, idx > active ? 1 : -1);
  };

  // Keep the active flavour in view as it changes — the list is a horizontal
  // carousel on phones and a vertical list on wider screens, so detect which
  // axis actually scrolls and nudge along that one.
  useEffect(() => {
    const strip = stripRef.current;
    const target = itemRefs.current[active];
    if (!strip || !target) return;
    const stripRect = strip.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const horizontal = strip.scrollWidth > strip.clientWidth + 1;
    if (horizontal) {
      if (targetRect.left < stripRect.left || targetRect.right > stripRect.right) {
        const delta =
          targetRect.left + targetRect.width / 2 - (stripRect.left + stripRect.width / 2);
        strip.scrollBy({ left: delta, behavior: 'smooth' });
      }
    } else if (targetRect.top < stripRect.top || targetRect.bottom > stripRect.bottom) {
      const delta =
        targetRect.top + targetRect.height / 2 - (stripRect.top + stripRect.height / 2);
      strip.scrollBy({ top: delta, behavior: 'smooth' });
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
        <div className="product-showcase__frame">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={active}
              className="product-showcase__slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'tween', duration: 0.45, ease: [0.22, 0.61, 0.36, 1] },
                opacity: { duration: 0.25 },
              }}
            >
              <ShowcaseImage
                src={activeSlide.src}
                alt={
                  activeSlide.label === 'Assorted'
                    ? `Assorted ${heading.toLowerCase()}`
                    : `${activeSlide.label} — ${heading}`
                }
                className="product-showcase__image"
                eager
              />
              <span className="product-showcase__caption">{activeSlide.label}</span>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            className="product-showcase__arrow product-showcase__arrow--prev"
            onClick={prev}
            aria-label="Previous flavour"
          >
            <ChevronLeft size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="product-showcase__arrow product-showcase__arrow--next"
            onClick={next}
            aria-label="Next flavour"
          >
            <ChevronRight size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div
          className="product-showcase__list"
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
                className={`product-showcase__option${isActive ? ' is-active' : ''}`}
                onClick={() => select(idx)}
              >
                <span className="product-showcase__option-chip">
                  <ShowcaseImage
                    src={slide.src}
                    alt=""
                    className="product-showcase__option-image"
                  />
                </span>
                <span className="product-showcase__option-label">{slide.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
