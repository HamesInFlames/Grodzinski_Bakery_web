import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DietaryAttribute } from '@/data/products';

interface FilterState {
  activeFilters: DietaryAttribute[];
  searchQuery: string;
  toggleFilter: (f: DietaryAttribute) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      activeFilters: [],
      searchQuery: '',
      toggleFilter: (f) =>
        set((s) => ({
          activeFilters: s.activeFilters.includes(f)
            ? s.activeFilters.filter((x) => x !== f)
            : [...s.activeFilters, f],
        })),
      clearFilters: () => set({ activeFilters: [], searchQuery: '' }),
    }),
    { name: 'grodz-filters' },
  ),
);
