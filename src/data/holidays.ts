import { HOLIDAY_OCCASIONS } from './products';
import type { OccasionSlug, Product } from './products';

export interface HolidayOccasion {
  slug: OccasionSlug;
  name: string;
  hebrew: string | null;
  order: number;
  description: string;
  preOrderNotice?: string;
}

// Hard-coded occasion metadata. Product list is derived from products.generated.ts
// by filtering on occasion === slug. Carolina's review will populate the actual
// product:occasion mapping in the next data pass.
export const HOLIDAY_OCCASION_META: Record<OccasionSlug, HolidayOccasion> = {
  'rosh-hashanah': {
    slug: 'rosh-hashanah',
    name: 'Rosh Hashanah',
    hebrew: 'ראש השנה',
    order: 1,
    description: 'Round challah, honey cakes, and traditional sweets for the Jewish New Year.',
    preOrderNotice: 'Pre-orders close 48 hours before erev Rosh Hashanah.',
  },
  sukkot: {
    slug: 'sukkot',
    name: 'Sukkot',
    hebrew: 'סוכות',
    order: 2,
    description: 'Festive baked goods to enjoy in the sukkah with family and friends.',
    preOrderNotice: 'Pre-orders close 48 hours before erev Sukkot.',
  },
  'yom-kippur': {
    slug: 'yom-kippur',
    name: 'Yom Kippur',
    hebrew: 'יום כיפור',
    order: 3,
    description: 'Traditional baked goods to break the fast and celebrate the holiest day of the year.',
    preOrderNotice: 'Pre-orders close 48 hours before erev Yom Kippur.',
  },
  'simchat-torah': {
    slug: 'simchat-torah',
    name: 'Simchat Torah',
    hebrew: 'שמחת תורה',
    order: 4,
    description: 'Festive treats and baked goods to celebrate the completion of the Torah reading cycle.',
  },
  hanukkah: {
    slug: 'hanukkah',
    name: 'Hanukkah',
    hebrew: 'חנוכה',
    order: 5,
    description: 'Sufganiyot, decorated cookies, and festive treats for the Festival of Lights.',
  },
  purim: {
    slug: 'purim',
    name: 'Purim',
    hebrew: 'פורים',
    order: 6,
    description: 'Hamantaschen, mishloach manot, and themed treats for Purim celebrations.',
  },
};

export function productsForOccasion(occasion: OccasionSlug, allProducts: Product[]): Product[] {
  return allProducts.filter(p => p.occasion === occasion);
}

export function getOccasionBySlug(slug: string): HolidayOccasion | undefined {
  return HOLIDAY_OCCASION_META[slug as OccasionSlug];
}

export { HOLIDAY_OCCASIONS };
