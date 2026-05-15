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
  // TODO: Replace placeholder descriptions with copy from copy-revision-proposal.md
  // once Chris + Carolina sign off.
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
  chanukah: {
    slug: 'chanukah',
    name: 'Chanukah',
    hebrew: 'חנוכה',
    order: 3,
    description: 'Sufganiyot, decorated cookies, and festive treats for the Festival of Lights.',
  },
  purim: {
    slug: 'purim',
    name: 'Purim',
    hebrew: 'פורים',
    order: 4,
    description: 'Hamantaschen, mishloach manot, and themed treats for Purim celebrations.',
  },
  pesach: {
    slug: 'pesach',
    name: 'Pesach',
    hebrew: 'פסח',
    order: 5,
    description: 'Kosher for Passover cakes, macaroons, and treats for the seder table.',
    preOrderNotice: 'Pre-orders close one week before erev Pesach.',
  },
  shavuot: {
    slug: 'shavuot',
    name: 'Shavuot',
    hebrew: 'שבועות',
    order: 6,
    description: 'Cheesecakes, blintzes, and dairy delights for the holiday of first fruits.',
  },
  simchas: {
    slug: 'simchas',
    name: 'Simchas & Celebrations',
    hebrew: null,
    order: 7,
    description: 'Custom cookies and cakes for weddings, bar/bat mitzvahs, baby showers, and birthdays.',
  },
  'fathers-day': {
    slug: 'fathers-day',
    name: "Father's Day",
    hebrew: null,
    order: 8,
    description: "Fun, themed cookies and treats to celebrate Dad.",
  },
  'mothers-day': {
    slug: 'mothers-day',
    name: "Mother's Day",
    hebrew: null,
    order: 9,
    description: "Flower-shaped cookies, cookie bouquets, and sweet gifts for Mom.",
  },
  valentines: {
    slug: 'valentines',
    name: "Valentine's Day",
    hebrew: null,
    order: 10,
    description: "Heart-shaped cookies and sweet treats for your sweetheart.",
  },
  graduation: {
    slug: 'graduation',
    name: 'Graduation',
    hebrew: null,
    order: 11,
    description: 'Celebratory cookies and treats to mark the milestone.',
  },
};

export function productsForOccasion(occasion: OccasionSlug, allProducts: Product[]): Product[] {
  return allProducts.filter(p => p.occasion === occasion);
}

export function getOccasionBySlug(slug: string): HolidayOccasion | undefined {
  return HOLIDAY_OCCASION_META[slug as OccasionSlug];
}

export { HOLIDAY_OCCASIONS };
