// Shared bakery photos for the home + about Ken Burns slideshows.
// Sourced from the 2026-05-15 in-store shoot. Tova's-branded shots excluded.

const P = (file, alt) => ({ src: `/images/slideshow/${file}`, alt });

export const PHOTOS = {
  shelvesBreads: P(
    "shelves-breads.webp",
    "Shelves of freshly baked breads, challahs, and pastries at Grodzinski Bakery",
  ),
  cookiesTable: P(
    "cookies-table.webp",
    "A table display of cookies, cakes, and decorated treats",
  ),
  cakesCase: P(
    "cakes-case.webp",
    "A display case of layer cakes, cheesecakes, and chocolate desserts",
  ),
  fridgeCakes: P(
    "fridge-cakes.webp",
    "Grab-and-go cakes and individual pastries in the bakery fridge",
  ),
};

// Home hero showcase — the full set of bakery photos.
export const SHOWCASE_PHOTOS = [
  PHOTOS.shelvesBreads,
  PHOTOS.cakesCase,
  PHOTOS.cookiesTable,
  PHOTOS.fridgeCakes,
];

// About story sections — each pans through a themed pair.
export const HERITAGE_PHOTOS = [PHOTOS.shelvesBreads, PHOTOS.cookiesTable];
export const CELEBRATION_PHOTOS = [PHOTOS.cakesCase, PHOTOS.fridgeCakes];
export const FAMILY_PHOTOS = [PHOTOS.cookiesTable, PHOTOS.shelvesBreads];
