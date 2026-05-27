import { useRef, useCallback } from 'react';
import type { MenuItem } from '@/data/products';

interface VariantListProps {
  items: MenuItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function formatPrice(price: number | null, unit?: string): string {
  if (price === null) return '';
  const formatted = `$${price.toFixed(2)}`;
  return unit ? `${formatted}/${unit}` : formatted;
}

export default function VariantList({
  items,
  activeIndex,
  onSelect,
}: VariantListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let next = index;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        next = (index + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        next = (index - 1 + items.length) % items.length;
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(index);
        return;
      } else {
        return;
      }

      onSelect(next);
      const rows = listRef.current?.querySelectorAll<HTMLElement>('[role="option"]');
      rows?.[next]?.focus();
    },
    [items.length, onSelect],
  );

  return (
    <div
      ref={listRef}
      className="variant-list"
      role="listbox"
      aria-label="Product variants"
    >
      {items.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={item.slug}
            role="option"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`variant-row${isActive ? ' variant-row--active' : ''}`}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            <span className="variant-row__name">{item.name}</span>
            <span className="variant-row__dots" aria-hidden="true" />
            <span className="variant-row__price">
              {formatPrice(item.price, item.priceUnit)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
