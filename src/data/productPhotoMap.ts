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
    'Rye Plain': 'menu/breads/rye-bread-sliced.webp',
    'Rye Kemo': 'menu/breads/rye-kemo-bread.webp',
    'Rye Marble': 'menu/breads/marble-rye-bread.webp',
    'Rye Pumpernickel': 'menu/breads/pumpernickel-bread.webp',
    French: 'menu/breads/french-bread.webp',
    'Italian Rolls': 'menu/breads/italian-rolls.webp',
    'Rye Rolls': 'menu/breads/rye-roll.webp',
    'Onion Packets & Buns': 'menu/breads/onion-rolls-6-pack.webp',
    Baguettes: 'menu/breads/french-bread.webp',
    'Slider Buns': 'menu/breads/slider-buns.webp',
    'Pretzel Buns & Demi Baguettes': 'menu/breads/pretzel-demi-baguettes.webp',
  },
  'challah-bilkas': {
    'Square — Plain': 'menu/challah/square-challah.webp',
    'Square — Sesame': 'menu/challah/square-challah.webp',
    'Braided — Egg': 'menu/challah/twisted-challah.webp',
    'Braided — Water': 'menu/challah/water-challah.webp',
    'Braided — Whole Wheat': 'menu/challah/wholewheat-challah.webp',
    'Braided — Multigrain': 'menu/challah/sesame-challah.webp',
  },
  bilkas: {
    Egg: 'menu/challah/sesame-challah-small.webp',
    Water: 'menu/challah/sesame-challah-small.webp',
    'Whole Wheat': 'menu/challah/sesame-challah-small.webp',
    Multigrain: 'menu/challah/sesame-challah-small.webp',
    Sourdough: 'menu/challah/sesame-challah-small.webp',
    Raisin: 'menu/challah/sesame-challah-small.webp',
    Streusel: 'menu/challah/sesame-challah-small.webp',
  },
  // Cakes section (the Loaf section shares this group but uses the `loaf`
  // block below so shared names like Chocolate/Marble stay independent).
  'cakes-loaf': {
    Chocolate: 'menu/cakes-loaf/chocolate-cake.webp',
    Vanilla: 'menu/cakes-loaf/vanilla-cake.webp',
    Marble: 'menu/cakes-loaf/marble-loaf-cake.webp',
    'Strawberry Shortcake': 'menu/cakes-loaf/custom-celebration-cake.webp',
    'Black Forest': 'menu/cakes-loaf/custom-celebration-cake.webp',
    'Caramel Crunch': 'menu/cakes-loaf/caramel-crunch-bundt.webp',
    'Custom Cakes': 'menu/cakes-loaf/custom-birthday-cake.webp',
  },
  loaf: {
    'Poppy Lemon': 'menu/cakes-loaf/marble-loaf-cake.webp',
    Orange: 'menu/cakes-loaf/orange-loaf.webp',
    Apple: 'menu/cakes-loaf/apple-loaf-cake.webp',
    Cherry: 'menu/cakes-loaf/cherry-loaf.webp',
    Marble: 'menu/cakes-loaf/marble-loaf-cake.webp',
    Chocolate: 'menu/cakes-loaf/chocolate-loaf.webp',
    Berry: 'menu/cakes-loaf/berry-muffin.webp',
  },
  'cookies-sweets': {
    Cookies: 'menu/cookies-sweets/chocolate-chip-cookies-dozen.webp',
    Mandel: 'menu/cookies-sweets/mandel-bread.webp',
    'Icing Cookies': 'holiday/celebration/graduation-cookies.webp',
    'Cheese Bourekas': 'menu/danishes-babkas/mini-pastry-assortment.webp',
    'Mushroom Bourekas': 'menu/danishes-babkas/mini-pastry-assortment.webp',
    'Potato Bourekas': 'menu/danishes-babkas/mini-pastry-assortment.webp',
    'Plain Croissant': 'menu/danishes-babkas/mini-pastry-assortment.webp',
    'Chocolate Croissant': 'menu/danishes-babkas/mini-pastry-assortment.webp',
    'Cheese Croissant': 'menu/danishes-babkas/mini-pastry-assortment.webp',
    Turnovers: 'menu/danishes-babkas/apple-danish.webp',
    'Apple Streusel': 'menu/danishes-babkas/apple-danish.webp',
    Rugelach: 'menu/cookies-sweets/rugelach-strawberry.webp',
    'Cookie-Dough Rugelach — Jam': 'menu/cookies-sweets/rugelach-strawberry.webp',
    'Danish Rugelach — Chocolate': 'menu/cookies-sweets/rugelach-strawberry.webp',
    'Danish Rugelach — Cinnamon': 'menu/cookies-sweets/rugelach-strawberry.webp',
    'Danish Rugelach — Raisin': 'menu/cookies-sweets/rugelach-strawberry.webp',
    Pretzel: 'menu/danishes-babkas/mini-pastry-assortment.webp',
    'Poppy Horseshoe Rolls': 'menu/danishes-babkas/poppy-seed-roll.webp',
    'Cheese Sticks': 'menu/cookies-sweets/cheese-stick.webp',
    Churros: 'menu/cookies-sweets/churros.webp',
    Sandwiches: 'menu/cookies-sweets/sandwich.webp',
    'Yogurt Parfait': 'menu/danishes-babkas/mini-pastry-assortment.webp',
  },
  'danishes-babkas': {
    'Cheese Danish': 'menu/danishes-babkas/cheese-danish.webp',
    'Icy Buns': 'menu/danishes-babkas/cinnamon-bun.webp',
    'Circle Danish — Apple': 'menu/danishes-babkas/apple-danish.webp',
    'Circle Danish — Blueberry': 'menu/danishes-babkas/apple-danish.webp',
    'Circle Danish — Cinnamon': 'menu/danishes-babkas/cinnamon-bun.webp',
  },
  // Babka shapes share the six names below; each flavour gets its own namespace
  // so the shapes resolve to the right flavour photo (or placeholder).
  'babka-chocolate': {
    Crown: 'menu/danishes-babkas/chocolate-babka.webp',
    Round: 'menu/danishes-babkas/chocolate-babka.webp',
    Loaf: 'menu/danishes-babkas/chocolate-babka.webp',
    Mini: 'menu/danishes-babkas/chocolate-babka.webp',
    Kokosh: 'menu/danishes-babkas/chocolate-babka.webp',
    '3-Strip': 'menu/danishes-babkas/chocolate-babka.webp',
  },
  'babka-cinnamon': {
    Crown: 'menu/danishes-babkas/cinnamon-bun.webp',
    Round: 'menu/danishes-babkas/cinnamon-bun.webp',
    Loaf: 'menu/danishes-babkas/cinnamon-bun.webp',
    Mini: 'menu/danishes-babkas/cinnamon-bun.webp',
    Kokosh: 'menu/danishes-babkas/cinnamon-bun.webp',
    '3-Strip': 'menu/danishes-babkas/cinnamon-bun.webp',
  },
  'babka-poppy': {
    Crown: 'menu/danishes-babkas/poppy-seed-roll.webp',
    Round: 'menu/danishes-babkas/poppy-seed-roll.webp',
    Loaf: 'menu/danishes-babkas/poppy-seed-roll.webp',
    Mini: 'menu/danishes-babkas/poppy-seed-roll.webp',
    Kokosh: 'menu/danishes-babkas/poppy-seed-roll.webp',
    '3-Strip': 'menu/danishes-babkas/poppy-seed-roll.webp',
  },
  pies: {
    'Lemon Meringue': 'menu/pies/blueberry-pie.webp',
    'Fruit Pies': 'menu/pies/cherry-pie.webp',
    'Fruit Tarts': 'menu/danishes-babkas/mini-pastry-assortment.webp',
  },

  // ----- Holiday sections ------------------------------------------------
  'rosh-sukkot-simchat': {
    'Round Challah': 'holiday/rosh-sukkot-simchat/rosh-hashanah-round-challah.webp',
    'Crown Challah': 'menu/challah/sesame-challah-large.webp',
    'Honey Loaf': 'menu/cakes-loaf/apple-loaf-cake.webp',
    'Honey Cake': 'menu/cakes-loaf/carrot-cake.webp',
    'Gift Baskets': 'menu/cookies-sweets/assorted-fancy-cookies-box.webp',
    'Gift Cookie Boxes': 'menu/cookies-sweets/butter-cookies-box.webp',
    'Sukkah House': 'menu/cookies-sweets/assorted-fancy-cookies-box.webp',
    'Torah Cookie': 'holiday/rosh-sukkot-simchat/apple-cookies-rosh-hashanah.webp',
  },
  'yom-kippur': {
    'Crown Babka': 'menu/danishes-babkas/chocolate-babka.webp',
    'Honey Loaf': 'menu/cakes-loaf/apple-loaf-cake.webp',
    'Honey Cake': 'menu/cakes-loaf/carrot-cake.webp',
    'Gift Baskets': 'menu/cookies-sweets/assorted-fancy-cookies-box.webp',
    'Gift Cookie Boxes': 'menu/cookies-sweets/butter-cookies-box.webp',
  },
  hanukkah: {
    Sufganiyot: 'menu/danishes-babkas/cinnamon-bun.webp',
    'Cookie Boxes': 'holiday/hanukkah/chanukah-cookies-platter.webp',
    Latkes: 'holiday/hanukkah/chanukah-cookies-platter.webp',
  },
  purim: {
    'Hamantaschen (Assorted Flavours)': 'holiday/purim/hamantaschen-assorted.webp',
    'Mishloach Manot': 'menu/cookies-sweets/assorted-fancy-cookies-box.webp',
  },
  shavuot: {
    'Cheesecake only — all cheese, every cheese': 'holiday/shavuot/cheesecake-classic.webp',
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
