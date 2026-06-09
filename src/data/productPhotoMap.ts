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
  breads: {
    Plain: 'plain-bagel.webp',
    Multigrain: 'everything-bagel.webp',
    Sesame: 'sesame-seed-bagel.webp',
    Everything: 'everything-bagel.webp',
    Wholewheat: 'plain-challah-large.webp',
    Mezonot: 'plain-bagel.webp',
    White: 'plain-challah-large.webp',
    Rye: 'plain-challah-large.webp',
    'Rye Kemo': 'plain-challah-large.webp',
    'Rye Marble': 'plain-challah-large.webp',
    'Rye Pumpernickel': 'plain-challah-large.webp',
    French: 'plain-challah-large.webp',
    'Italian Rolls': 'onion-rolls-6-pack.webp',
    'Rye Rolls': 'onion-rolls-6-pack.webp',
    'Onion Packets': 'onion-rolls-6-pack.webp',
    'Onion Buns': 'onion-rolls-6-pack.webp',
    Baguettes: 'plain-challah-large.webp',
    'Slider Buns': 'onion-rolls-6-pack.webp',
    'Pretzel Demi Baguettes': 'onion-rolls-6-pack.webp',
  },
  challah: {
    Square: 'plain-challah-large.webp',
    Mini: 'plain-challah-large.webp',
    Bilkas: 'sesame-challah.webp',
    Pretzel: 'poppy-seed-twist.webp',
    Wholewheat: 'plain-challah-large.webp',
    Multigrain: 'sesame-challah.webp',
    Twisted: 'poppy-seed-twist.webp',
    Water: 'plain-challah-large.webp',
  },
  'cakes-loaf': {
    Chocolate: 'chocolate-loaf-cake.webp',
    Vanilla: 'custom-celebration-cake.webp',
    Marble: 'marble-loaf-cake.webp',
    'Strawberry Shortcake': 'custom-celebration-cake.webp',
    'Black Forest': 'custom-celebration-cake.webp',
    'Caramel Crunch': 'caramel-crunch-cake.webp',
    'Custom Cakes': 'custom-celebration-cake.webp',
    'Poppy Lemon': 'marble-loaf-cake.webp',
    Orange: 'apple-loaf-cake.webp',
    Apple: 'apple-loaf-cake.webp',
    Cherry: 'apple-loaf-cake.webp',
    Berry: 'apple-loaf-cake.webp',
  },
  'cookies-sweets': {
    Cookies: 'chocolate-chip-cookies-dozen.webp',
    Mandel: 'mandel-bread.webp',
    'Icing Cookies': 'assorted-fancy-cookies-box.webp',
    Turnovers: 'apple-danish.webp',
    Rugelach: 'rogalach-tray-assorted.webp',
    Pretzel: 'mini-pastry-assortment.webp',
    'Cheese Sticks': 'cheese-danish.webp',
    Churros: 'cinnamon-bun.webp',
    Sandwiches: 'croissant-plain.webp',
    'Yogurt Parfait': 'mini-pastry-assortment.webp',
  },
  'danishes-babkas': {
    Chocolate: 'chocolate-ring-babka.webp',
    Cinnamon: 'cinnamon-bun.webp',
    'Assorted Berries': 'apple-danish.webp',
    'Icy Buns': 'cinnamon-bun.webp',
    'Cheese Danishes': 'cheese-danish.webp',
    'Poppy Seed': 'poppy-seed-twist.webp',
  },
  pies: {
    'Lemon Meringue': 'blueberry-pie.webp',
    'Fruit Pies': 'cherry-pie.webp',
    'Fruit Tarts': 'mini-pastry-assortment.webp',
  },

  // ----- Holiday sections ------------------------------------------------
  'rosh-sukkot-simchat': {
    'Round Challah': 'rosh-hashanah-round-challah.webp',
    'Crown Challah': 'rosh-hashanah-round-challah.webp',
    'Honey Loaf': 'apple-loaf-cake.webp',
    'Honey Cake': 'carrot-cake.webp',
    'Gift Baskets': 'assorted-fancy-cookies-box.webp',
    'Gift Cookie Boxes': 'butter-cookies-box.webp',
    'Sukkah House': 'assorted-fancy-cookies-box.webp',
    'Torah Cookie': 'apple-cookies-rosh-hashanah.webp',
  },
  'yom-kippur': {
    'Crown Babka': 'chocolate-crown-babka.webp',
    'Honey Loaf': 'apple-loaf-cake.webp',
    'Honey Cake': 'carrot-cake.webp',
    'Gift Baskets': 'assorted-fancy-cookies-box.webp',
    'Gift Cookie Boxes': 'butter-cookies-box.webp',
  },
  hanukkah: {
    Sufganiyot: 'cinnamon-bun.webp',
    'Cookie Boxes': 'chanukah-cookies-platter.webp',
    Latkes: 'chanukah-cookies-platter.webp',
  },
  purim: {
    'Hamantaschen (Assorted Flavours)': 'hamantaschen-assorted.webp',
    'Mishloach Manot': 'assorted-fancy-cookies-box.webp',
  },
  shavuot: {
    'Cheesecake only — all cheese, every cheese': 'custom-celebration-cake.webp',
  },
  celebration: {
    'Custom Holiday Cookies': 'birthday-cookies.webp',
    'Custom Holiday Cakes': 'custom-celebration-cake.webp',
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
