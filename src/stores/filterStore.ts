import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DietaryAttribute, DietaryTag } from '@/data/products';

interface FilterState {
  activeFilters: DietaryAttribute[];
  activeTags: DietaryTag[];
  searchQuery: string;
  toggleFilter: (f: DietaryAttribute) => void;
  toggleTag: (tag: DietaryTag) => void;
  clearAll: () => void;
  clearFilters: () => void;
  isActive: (tag: DietaryTag) => boolean;
  activeCount: number;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      activeFilters: [],
      activeTags: [],
      searchQuery: '',

      toggleFilter: (f) =>
        set((s) => ({
          activeFilters: s.activeFilters.includes(f)
            ? s.activeFilters.filter((x) => x !== f)
            : [...s.activeFilters, f],
        })),

      toggleTag: (tag) =>
        set((s) => {
          const next = s.activeTags.includes(tag)
            ? s.activeTags.filter((t) => t !== tag)
            : [...s.activeTags, tag];
          return { activeTags: next, activeCount: next.length };
        }),

      clearAll: () => set({ activeFilters: [], activeTags: [], searchQuery: '', activeCount: 0 }),
      clearFilters: () => set({ activeFilters: [], activeTags: [], searchQuery: '', activeCount: 0 }),

      isActive: (tag) => get().activeTags.includes(tag),
      activeCount: 0,
    }),
    { name: 'grodz-filters' },
  ),
);
