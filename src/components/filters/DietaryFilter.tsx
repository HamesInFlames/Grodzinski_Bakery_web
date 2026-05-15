import { DIETARY_TAGS } from '@/data/products';
import type { DietaryTag } from '@/data/products';
import { useFilterStore } from '@/stores/filterStore';

const TAG_LABELS: Record<DietaryTag, string> = {
  pareve: 'Pareve',
  dairy: 'Dairy',
  eggs: 'Eggs',
  nuts: 'Nuts',
  sesame: 'Sesame',
  'sugar-free': 'Sugar Free',
  'gluten-free': 'Gluten Free',
};

interface Props {
  totalCount: number;
  filteredCount: number;
  sectionName?: string;
}

export default function DietaryFilter({ totalCount, filteredCount, sectionName }: Props) {
  const { activeTags, toggleTag, clearAll, activeCount } = useFilterStore();

  const showingSubset = activeCount > 0 && filteredCount < totalCount;

  return (
    <div className="dietary-filter">
      <div className="dietary-filter__inner">
        <div
          className="dietary-filter__pills"
          role="group"
          aria-label="Dietary filters"
        >
          {DIETARY_TAGS.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                className={`dietary-filter__pill ${isActive ? 'dietary-filter__pill--active' : ''}`}
                aria-pressed={isActive}
                onClick={() => toggleTag(tag)}
              >
                {TAG_LABELS[tag]}
              </button>
            );
          })}
        </div>

        <div className="dietary-filter__status">
          {showingSubset && sectionName && (
            <span className="dietary-filter__count">
              {sectionName} ({filteredCount} of {totalCount} shown)
            </span>
          )}
          {activeCount > 0 && (
            <button
              type="button"
              className="dietary-filter__clear"
              onClick={clearAll}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
