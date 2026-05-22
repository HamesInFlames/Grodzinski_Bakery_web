import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '@/data/galleryItems';

type Mode = 'grid' | 'single';
type Direction = 1 | -1;

type Props = {
  items: GalleryItem[];
  open: boolean;
  onClose: () => void;
};

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Directional slide variants for the enlarged image. `direction` is passed via
// AnimatePresence's `custom` prop so the entering and exiting figures know
// which side of the screen to fly to.
const slideVariants = {
  enter: (dir: Direction) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: Direction) => ({ x: -dir * 80, opacity: 0 }),
};

const SWIPE_OFFSET = 50;
const SWIPE_VELOCITY = 500;

export function GalleryLightbox({ items, open, onClose }: Props): React.ReactElement {
  const [mode, setMode] = useState<Mode>('grid');
  const [singleIndex, setSingleIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setSingleIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setSingleIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const goNext =
        info.offset.x < -SWIPE_OFFSET || info.velocity.x < -SWIPE_VELOCITY;
      const goPrev =
        info.offset.x > SWIPE_OFFSET || info.velocity.x > SWIPE_VELOCITY;
      if (goNext) next();
      else if (goPrev) prev();
    },
    [next, prev],
  );

  // Reset to grid view each time the lightbox opens.
  useEffect(() => {
    if (open) {
      setMode('grid');
      setSingleIndex(0);
      setDirection(1);
    }
  }, [open]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Move focus into the dialog on open.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(focusableSelector);
      focusables[0]?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [open, mode]);

  // ESC / Tab focus trap / arrow keys while in single view.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        const list = Array.from(root.querySelectorAll<HTMLElement>(focusableSelector));
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (mode === 'single') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          next();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, mode, next, prev, onClose]);

  function onBackdrop(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="gallery-lightbox"
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Custom Creations gallery"
          onClick={onBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.div
            className="gallery-lightbox__content"
            ref={dialogRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="gallery-lightbox__header">
              <div className="gallery-lightbox__header-left">
                {mode === 'single' && (
                  <button
                    type="button"
                    className="gallery-lightbox__back"
                    onClick={() => setMode('grid')}
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>All cakes</span>
                  </button>
                )}
              </div>
              <h2 className="gallery-lightbox__title">Custom Creations</h2>
              <button
                type="button"
                className="gallery-lightbox__close"
                onClick={onClose}
                aria-label="Close gallery"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            {mode === 'grid' ? (
              <div className="gallery-lightbox__grid">
                {items.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    className="gallery-lightbox__cell"
                    onClick={() => {
                      setDirection(1);
                      setSingleIndex(idx);
                      setMode('single');
                    }}
                    aria-label={`View ${item.title ?? item.alt} larger`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="gallery-lightbox__single">
                <button
                  type="button"
                  className="gallery-lightbox__nav gallery-lightbox__nav--prev"
                  onClick={prev}
                  aria-label="Previous cake"
                >
                  <ChevronLeft size={24} aria-hidden="true" />
                </button>

                <div className="gallery-lightbox__stage">
                  <div className="gallery-lightbox__track">
                    <AnimatePresence custom={direction} initial={false} mode="popLayout">
                      <motion.figure
                        key={items[singleIndex].id}
                        className="gallery-lightbox__single-frame"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: 'spring', stiffness: 320, damping: 32 },
                          opacity: { duration: 0.2, ease: 'easeOut' },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.18}
                        dragMomentum={false}
                        onDragEnd={onDragEnd}
                      >
                        <img
                          src={items[singleIndex].src}
                          alt={items[singleIndex].alt}
                          draggable={false}
                        />
                        {items[singleIndex].title && (
                          <figcaption className="gallery-lightbox__caption">
                            {items[singleIndex].title}
                          </figcaption>
                        )}
                      </motion.figure>
                    </AnimatePresence>
                  </div>

                  <p className="gallery-lightbox__counter" aria-live="polite">
                    {singleIndex + 1} <span aria-hidden="true">/</span>{' '}
                    <span className="sr-only">of</span> {items.length}
                  </p>
                </div>

                <button
                  type="button"
                  className="gallery-lightbox__nav gallery-lightbox__nav--next"
                  onClick={next}
                  aria-label="Next cake"
                >
                  <ChevronRight size={24} aria-hidden="true" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GalleryLightbox;
