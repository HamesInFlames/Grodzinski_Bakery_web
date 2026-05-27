import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DietaryLabel = 'pareve' | 'dairy';

interface FilterState {
  activeLabel: DietaryLabel | null;
  toggleLabel: (label: DietaryLabel) => void;
  clearAll: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      activeLabel: null,

      toggleLabel: (label) =>
        set(() => ({
          activeLabel: get().activeLabel === label ? null : label,
        })),

      clearAll: () => set({ activeLabel: null }),
    }),
    { name: 'grodz-filters' },
  ),
);
