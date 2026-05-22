import { useEffect, useRef, type RefObject } from 'react';
import { LayoutGrid } from 'lucide-react';
import type { GalleryItem } from '@/data/galleryItems';

type Props = {
  items: GalleryItem[];
  activeIndex: number;
  onSelect: (idx: number) => void;
  onViewAll: () => void;
  viewAllRef: RefObject<HTMLButtonElement | null>;
};

export function GalleryThumbnails({
  items,
  activeIndex,
  onSelect,
  onViewAll,
  viewAllRef,
}: Props): React.ReactElement {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Keep the active thumbnail visible & roughly centered in the strip.
  // We scroll only the strip itself, never the page.
  useEffect(() => {
    const strip = stripRef.current;
    const target = itemRefs.current[activeIndex];
    if (!strip || !target) return;

    const stripRect = strip.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetCenter = targetRect.left + targetRect.width / 2;
    const stripCenter = stripRect.left + stripRect.width / 2;
    const delta = targetCenter - stripCenter;
    if (Math.abs(delta) > 1) {
      strip.scrollBy({ left: delta, behavior: 'smooth' });
    }
  }, [activeIndex]);

  return (
    <div className="gallery-thumbs">
      <div
        className="gallery-thumbs__strip"
        ref={stripRef}
        role="tablist"
        aria-label="Cake thumbnails"
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Show ${item.title ?? item.alt}`}
              className={`gallery-thumbs__item${isActive ? ' is-active' : ''}`}
              onClick={() => onSelect(idx)}
            >
              <img
                src={item.src}
                alt=""
                className="gallery-thumbs__image"
                loading={idx < 5 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </button>
          );
        })}
      </div>

      <button
        ref={viewAllRef}
        type="button"
        className="gallery-thumbs__view-all"
        onClick={onViewAll}
        aria-label={`View all ${items.length} cake designs`}
      >
        <span className="gallery-thumbs__view-all-inner">
          <LayoutGrid size={22} strokeWidth={1.6} aria-hidden="true" />
          <span className="gallery-thumbs__view-all-label">View All</span>
        </span>
      </button>
    </div>
  );
}

export default GalleryThumbnails;
