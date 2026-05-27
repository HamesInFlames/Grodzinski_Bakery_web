// Re-exports from products.ts for backward compatibility.
// All holiday metadata is now centralized in products.ts via HOLIDAY_META.

export {
  HOLIDAY_META,
  getHolidayMeta,
  type HolidayMeta,
} from './products';

// Legacy re-exports for any files still using the old API
export { HOLIDAY_OCCASIONS, getOccasionBySlug } from './products';
