import { Sheet, SheetContent, SheetTitle } from '@/components/ui/Sheet';
import { useFilterStore } from '@/stores/filterStore';
import { PRODUCTS } from '@/data/products';
import type { DietaryAttribute } from '@/data/products';
import { useMemo } from 'react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DIETARY_OPTIONS: { value: DietaryAttribute; label: string; description: string }[] = [
  { value: 'pareve', label: 'Pareve', description: 'Neither meat nor dairy' },
  { value: 'dairy', label: 'Dairy', description: 'Contains dairy ingredients' },
  { value: 'contains-egg', label: 'Contains Egg', description: 'Contains egg' },
];

export default function FilterSheet({ open, onOpenChange }: Props) {
  const { activeFilters, toggleFilter, clearFilters } = useFilterStore();

  const matchCount = useMemo(() => {
    if (activeFilters.length === 0) return PRODUCTS.length;
    return PRODUCTS.filter((p) =>
      activeFilters.every((f) => p.dietary.includes(f)),
    ).length;
  }, [activeFilters]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetTitle>Filter Products</SheetTitle>

        <div className="filter-sheet__section">
          <h3 className="filter-sheet__heading">Dietary</h3>
          <div className="filter-sheet__options">
            {DIETARY_OPTIONS.map((opt) => (
              <label key={opt.value} className="filter-sheet__option">
                <input
                  type="checkbox"
                  checked={activeFilters.includes(opt.value)}
                  onChange={() => toggleFilter(opt.value)}
                  className="filter-sheet__checkbox"
                />
                <div className="filter-sheet__option-text">
                  <span className="filter-sheet__option-label">{opt.label}</span>
                  <span className="filter-sheet__option-desc">{opt.description}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-sheet__footer">
          <button
            className="filter-sheet__clear"
            onClick={clearFilters}
          >
            Clear all
          </button>
          <button
            className="filter-sheet__apply"
            onClick={() => onOpenChange(false)}
          >
            Show {matchCount} products
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
