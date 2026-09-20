/**
 * Explicit mapping of every carousel item (menu groups + holiday sections) to a
 * real product photo under `public/images/products/`.
 *
 * The lookup key is a composite `${groupOrSectionId}::${slugify(itemName)}` so
 * that menu groups and holiday sections can never collide. `getItemPhoto` is
 * consumed by `ProductShowcase` for the per-item slides.
 *
 * NOTE: `slugify` below is a byte-for-byte copy of the one in
 * `src/components/menu/ProductShowcase.tsx`. Keep the two identical so the keys
 * built here match the keys the showcase looks up.
 */

// Keep identical to ProductShowcase.slugify.
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const PRODUCT_IMAGE_BASE = '/images/products';

/**
 * id (menu group id OR holiday section id) -> item name -> photo filename.
 *
 * Within a single menu group, multiple sections share the same group id, so an
 * item name that appears in more than one section is listed once and the same
 * photo is reused for every occurrence (that is expected and fine).
 */
const PHOTO_BY_ID: Record<string, Record<string, string>> = {
  // ----- Menu groups -----------------------------------------------------
  // Bagels share the `breads` group but need their own photos (the `breads`
  // block below serves the Breads / Buns & Rolls sections).
  'breads-bagels': {
    Plain: 'menu/breads/plain-bagel.webp',
    Multigrain: 'menu/breads/multigrain-bagel.webp',
    Sesame: 'menu/breads/sesame-seed-bagel.webp',
    Everything: 'menu/breads/everything-bagel.webp',
    Wholewheat: 'menu/breads/wholewheat-bagel.webp',
    Mezonot: 'menu/breads/mezonot-bagel.webp',
  },
  breads: {
    Plain: 'menu/breads/plain-bagel.webp',
    Multigrain: 'menu/breads/multigrain-bread.webp',
    Sesame: 'menu/breads/sesame-seed-bagel.webp',
    Everything: 'menu/breads/everything-bagel.webp',
    Wholewheat: 'menu/breads/wholewheat-bread.webp',
    Mezonot: 'menu/breads/plain-bagel.webp',
    White: 'menu/breads/white-bread.webp',
    'Rye Plain': 'menu/breads/rye-plain-bread.webp',
    'Rye Kimmel': 'menu/breads/rye-kimmel-bread.webp',
    'Rye Marble': 'menu/breads/rye-marble-bread.webp',
    'Rye Pumpernickel': 'menu/breads/pumpernickel-bread.webp',
    French: 'menu/breads/french-bread.webp',
    'Hotdog Buns': 'menu/breads/hotdog-buns.webp',
    'Rye Rolls': 'menu/breads/rye-rolls.webp',
    'Hamburger Buns': 'menu/breads/hamburger-buns.webp',
    'Onion Packets & Buns': 'menu/breads/onion-rolls-6-pack.webp',
    Baguettes: 'menu/breads/baguette.webp',
    'Slider Buns': 'menu/breads/slider-buns.webp',
    'Pretzel Buns & Demi Baguettes': 'menu/breads/pretzel-demi-baguettes.webp',
    Flatbread: 'menu/breads/flatbread.webp',
  },
  'challah-bilkas': {
    Square: 'menu/challah/square-plain-challah.webp',
    'Square Sesame': 'menu/challah/square-sesame-challah.webp',
    Egg: 'menu/challah/egg-challah.webp',
    Water: 'menu/challah/water-braided-challah.webp',
    'Whole Wheat': 'menu/challah/wholewheat-braided-challah.webp',
    Multigrain: 'menu/challah/multigrain-challah.webp',
    Sourdough: 'menu/challah/sourdough-challah.webp',
    Raisin: 'menu/challah/raisin-challah.webp',
    Streusel: 'menu/challah/streusel-challah.webp',
  },
  bilkas: {
    Egg: 'menu/challah/bilka-egg.webp',
    Water: 'menu/challah/bilka-water.webp',
    'Whole Wheat': 'menu/challah/bilka-wholewheat.webp',
    Multigrain: 'menu/challah/bilka-multigrain.webp',
    Sourdough: 'menu/challah/bilka-sourdough.webp',
    Raisin: 'menu/challah/bilka-raisin.webp',
    Streusel: 'menu/challah/bilka-streusel.webp',
  },
  // Cakes section (the Loaf section shares this group but uses the `loaf`
  // block below so shared names like Chocolate/Marble stay independent).
  'cakes-loaf': {
    Chocolate: 'menu/cakes-loaf/chocolate-cake.webp',
    Vanilla: 'menu/cakes-loaf/vanilla-cake.webp',
    // Owner identified the decorated cake photo as marble / half-and-half.
    Marble: 'menu/cakes-loaf/custom-celebration-cake.webp',
    Lemon: 'menu/cakes-loaf/lemon-cake.webp',
    'Red Velvet': 'menu/cakes-loaf/red-velvet-cake.webp',
    Carrot: 'menu/cakes-loaf/carrot-cake.webp',
    'Strawberry Shortcake': 'menu/cakes-loaf/strawberry-shortcake.webp',
    'Black Forest': 'menu/cakes-loaf/black-forest-cake.webp',
    Mocha: 'menu/cakes-loaf/mocha-cake.webp',
    'Chocolate Fudge': 'menu/cakes-loaf/chocolate-fudge-cake.webp',
    'Caramel Crunch': 'menu/cakes-loaf/caramel-crunch-cake.webp',
    Oreo: 'menu/cakes-loaf/oreo-cake.webp',
    Napoleon: 'menu/cakes-loaf/napoleon.webp',
    'Fruit Cake': 'menu/cakes-loaf/fruit-cake.webp',
    Checkerboard: 'menu/cakes-loaf/checkerboard-cake.webp',
  },
  loaf: {
    'Poppy Lemon': 'menu/cakes-loaf/poppy-lemon-loaf.webp',
    Orange: 'menu/cakes-loaf/orange-loaf.webp',
    Apple: 'menu/cakes-loaf/apple-loaf-cake.webp',
    Cherry: 'menu/cakes-loaf/cherry-loaf.webp',
    Marble: 'menu/cakes-loaf/marble-loaf-cake.webp',
    Chocolate: 'menu/cakes-loaf/chocolate-loaf.webp',
    Berry: 'menu/cakes-loaf/berry-loaf.webp',
  },
  bundt: {
    Chocolate: 'menu/cakes-loaf/chocolate-bundt.webp',
    Apple: 'menu/cakes-loaf/apple-bundt.webp',
    Marble: 'menu/cakes-loaf/marble-bundt.webp',
    'Mixed Berry': 'menu/cakes-loaf/mixed-berry-bundt.webp',
    Orange: 'photo-coming-soon.svg',
    'Lemon Poppy': 'photo-coming-soon.svg',
  },
  // Desserts section (Cakes & Loaf). All awaiting real photos.
  desserts: {
    'Personal Desserts': 'menu/cakes-loaf/personal-desserts.webp',
    'Cake Pop': 'menu/cakes-loaf/cake-pop.webp',
    'Cupcakes/Muffins': 'menu/cakes-loaf/cupcakes-muffins.webp',
  },
  'cookies-sweets': {
    Cookies: 'menu/cookies-sweets/chocolate-chip-cookies-dozen.webp',
    Mandel: 'menu/cookies-sweets/mandel-bread.webp',
    'Icing Cookies': 'menu/cookies-sweets/icing-cookies.webp',
    'Bow Ties / Nothings': 'menu/cookies-sweets/bow-ties-nothings.webp',
    'Assorted Bourekas': 'menu/cookies-sweets/assorted-bourekas.webp',
    'Assorted Cheese': 'menu/cookies-sweets/assorted-cheese.webp',
    Croissants: 'menu/cookies-sweets/croissants.webp',
    Turnovers: 'menu/cookies-sweets/turnovers.webp',
    'Apple Streusel': 'menu/cookies-sweets/apple-streusel.webp',
    'Assorted Rugelach': 'menu/cookies-sweets/assorted-rugelach.webp',
    Pretzel: 'menu/cookies-sweets/pretzel.webp',
    'Poppy Horseshoe Rolls': 'menu/cookies-sweets/poppy-horseshoe-rolls.webp',
    'Cheese Sticks': 'menu/cookies-sweets/cheese-stick.webp',
    Churros: 'menu/cookies-sweets/churros.webp',
    Sandwiches: 'menu/cookies-sweets/sandwiches-assorted.webp',
    'Yogurt Parfait': 'menu/cookies-sweets/yogurt-parfait.webp',
  },
  'danishes-babkas': {
    'Chocolate Danish': 'menu/danishes-babkas/chocolate-danish.webp',
    'Icy Buns': 'menu/danishes-babkas/cinnamon-bun.webp',
    // The four Circle Danishes are merged into one "Assorted Danish" tile.
    'Assorted Danish': 'menu/danishes-babkas/assorted-danish.webp',
    'Bufolo Danish': 'menu/danishes-babkas/chocolate-bufolo-danish.webp',
    'Poppy Danish': 'menu/danishes-babkas/poppy-danish.webp',
    Conchas: 'menu/danishes-babkas/concha-assorted.webp',
    // Babka section is a single "Assorted" tile.
    Assorted: 'menu/danishes-babkas/assorted-babkas.webp',
  },
  pies: {
    // Pies section is a single "Assorted" tile.
    Assorted: 'menu/pies/assorted-pies.webp',
    'Lemon Meringue': 'menu/pies/lemon-meringue-pie.webp',
    'Fruit Tarts': 'menu/pies/fruit-tarts.webp',
  },

  // ----- Holiday sections ------------------------------------------------
  // Reviewed in the photo audit: items flagged "missing" (wrong stand-in)
  // now show the photo-coming-soon placeholder until real photos exist.
  'rosh-sukkot-simchat': {
    'Round Challah': 'holiday/rosh-sukkot-simchat/round-challah.webp',
    'Crown Challah': 'holiday/rosh-sukkot-simchat/crown-challah.webp',
    'Honey Loaf': 'holiday/rosh-sukkot-simchat/honey-loaf.webp',
    'Honey Bundt Cake': 'holiday/rosh-sukkot-simchat/honey-bundt-cake.webp',
    'Fancy Honey Cake': 'holiday/rosh-sukkot-simchat/fancy-honey-cake.webp',
    'Gift Basket': 'holiday/rosh-sukkot-simchat/gift-basket.webp',
    'Gift Basket Square': 'holiday/rosh-sukkot-simchat/gift-basket-square.webp',
    'Gift Basket Rectangle': 'holiday/rosh-sukkot-simchat/gift-basket-rectangle.webp',
    'Gift Plate': 'holiday/rosh-sukkot-simchat/gift-plate-shana-tova.webp',
    'Honeycomb Gift Plate': 'holiday/rosh-sukkot-simchat/gift-plate-honeycomb.webp',
    'Rectangle Cookie Box': 'holiday/rosh-sukkot-simchat/cookie-gift-box-rectangle.webp',
    'Square Cookie Box': 'holiday/rosh-sukkot-simchat/cookie-gift-box-square.webp',
    'Sukkah House': 'photo-coming-soon.svg',
    'Torah Cookie': 'photo-coming-soon.svg',
  },
  'yom-kippur': {
    'Crown Babka': 'holiday/yom-kippur/crown-babka.webp',
    'Honey Loaf': 'photo-coming-soon.svg',
    'Honey Cake': 'photo-coming-soon.svg',
    'Gift Baskets': 'photo-coming-soon.svg',
    'Gift Cookie Boxes': 'photo-coming-soon.svg',
  },
  hanukkah: {
    Sufganiyot: 'holiday/hanukkah/sufganiyot.webp',
    'Cookie Boxes': 'photo-coming-soon.svg',
    Latkes: 'photo-coming-soon.svg',
  },
  // Dedicated Sufganiyot showcase on the Hanukkah detail page.
  'hanukkah-sufganiyot': {
    'Classic Jelly': 'holiday/hanukkah/sufganiyot.webp',
    Specialty: 'holiday/hanukkah/sufganiyot-specialty.webp',
  },
  purim: {
    'Hamantaschen (Assorted Flavours)': 'holiday/purim/hamantaschen-assorted.webp',
    'Mishloach Manot': 'photo-coming-soon.svg',
  },
  shavuot: {
    'Assorted Cheesecake': 'holiday/shavuot/assorted-cheesecake.webp',
  },
  celebration: {
    'Custom Holiday Cookies': 'holiday/celebration/graduation-cookies.webp',
    'Custom Holiday Cakes': 'menu/cakes-loaf/custom-birthday-cake.webp',
  },
};

// Flatten into a composite-keyed lookup at module init.
const photoMap = new Map<string, string>();
for (const [id, items] of Object.entries(PHOTO_BY_ID)) {
  for (const [name, file] of Object.entries(items)) {
    photoMap.set(`${id}::${slugify(name)}`, `${PRODUCT_IMAGE_BASE}/${file}`);
  }
}

/**
 * Resolve the best-matching product photo for a carousel item, or `undefined`
 * if no mapping exists (the caller then falls back to its derived path /
 * placeholder).
 */
export function getItemPhoto(
  groupOrSectionId: string,
  itemName: string,
): string | undefined {
  return photoMap.get(`${groupOrSectionId}::${slugify(itemName)}`);
}
