export interface GalleryCategory {
  id: string;
  name: string;
}

export const galleryCategories: GalleryCategory[] = [
  { id: 'all', name: 'All' },
  { id: 'wedding', name: 'Wedding' },
  { id: 'baby', name: 'Baby Shower' },
  { id: 'birthday', name: 'Birthday' },
  { id: 'rosh-hashanah', name: 'Rosh HaShanah & Sukkot' },
  { id: 'chanukah', name: 'Chanukkah' },
  { id: 'purim', name: 'Purim' },
  { id: 'shavuot', name: 'Shavuot' },
  { id: 'fathers-day', name: "Father's Day" },
  { id: 'mothers-day', name: "Mother's Day" },
  { id: 'halloween', name: 'Halloween' },
  { id: 'valentines', name: "Valentine's Day" },
  { id: 'christmas', name: 'Christmas' },
  { id: 'custom', name: 'Custom Orders' },
];
