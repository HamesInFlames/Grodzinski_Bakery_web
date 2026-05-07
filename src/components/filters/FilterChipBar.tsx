import { useState } from 'react';
import { useFilterStore } from '@/stores/filterStore';
import type { DietaryAttribute } from '@/data/products';
import Chip from '@/components/ui/Chip';
import FilterSheet from './FilterSheet';
import { SlidersHorizontal } from 'lucide-react';

const DIETARY_OPTIONS: { value: DietaryAttribute; label: string }[] = [
  { value: 'pareve', label: 'Pareve' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'contains-egg', label: 'Contains Egg' },
];

export default function FilterChipBar() {
  const { activeFilters, toggleFilter } = useFilterStore();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <div className="filter-bar">
        <div className="filter-bar__inner">
          <button
            className="filter-bar__trigger"
            onClick={() => setSheetOpen(true)}
          >
            <SlidersHorizontal size={16} />
            Filters{activeFilters.length > 0 ? ` · ${activeFilters.length}` : ''}
          </button>

          <div className="filter-bar__chips">
            {DIETARY_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                active={activeFilters.includes(opt.value)}
                onClick={() => toggleFilter(opt.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <FilterSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </>
  );
}
