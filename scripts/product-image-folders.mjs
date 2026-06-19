// Source of truth: which sub-folder under public/images/products/ each product
// photo lives in. Split mirrors the website menu (MENU_GROUPS) and the holiday
// menu (HOLIDAY_SECTIONS) in src/data/menuDisplay.ts.
//
// Shared by scripts/organize-product-images.mjs (the one-off mover) and
// scripts/generate-catalog.mjs (so regenerating the catalog keeps the paths).
// Keys are filenames WITHOUT the .webp extension.

export const PRODUCT_IMAGE_FOLDERS = {
  // ── Website menu ──────────────────────────────────────────────────────
  // menu/breads
  'assorted-bagels': 'menu/breads',
  'assorted-breads': 'menu/breads',
  'everything-bagel': 'menu/breads',
  'french-bread': 'menu/breads',
  'italian-rolls': 'menu/breads',
  'marble-rye-bread': 'menu/breads',
  'mezonot-bagel': 'menu/breads',
  'mini-roll': 'menu/breads',
  'multigrain-bagel': 'menu/breads',
  'multigrain-bread': 'menu/breads',
  'onion-rolls-6-pack': 'menu/breads',
  'plain-bagel': 'menu/breads',
  'pretzel-demi-baguettes': 'menu/breads',
  'pumpernickel-bread-sliced': 'menu/breads',
  'pumpernickel-bread': 'menu/breads',
  'rye-bread-sliced': 'menu/breads',
  'rye-kemo-bread': 'menu/breads',
  'rye-roll': 'menu/breads',
  'sesame-seed-bagel': 'menu/breads',
  'slider-buns': 'menu/breads',
  'white-bread-sliced': 'menu/breads',
  'white-bread': 'menu/breads',
  'wholewheat-bagel': 'menu/breads',
  'wholewheat-bread-sliced': 'menu/breads',
  'wholewheat-bread': 'menu/breads',

  // menu/challah
  'challah-braided': 'menu/challah',
  'plain-challah-large': 'menu/challah',
  'rustic-floured-challah': 'menu/challah',
  'sesame-challah-large': 'menu/challah',
  'sesame-challah-small': 'menu/challah',
  'sesame-challah': 'menu/challah',
  'square-challah': 'menu/challah',
  'twisted-challah': 'menu/challah',
  'water-challah': 'menu/challah',
  'wholewheat-challah': 'menu/challah',

  // menu/cakes-loaf
  'apple-loaf-cake': 'menu/cakes-loaf',
  'berry-muffin': 'menu/cakes-loaf',
  'brownie-squares': 'menu/cakes-loaf',
  'caramel-crunch-bundt': 'menu/cakes-loaf',
  'caramel-crunch-cake': 'menu/cakes-loaf',
  'carrot-cake': 'menu/cakes-loaf',
  'cherry-loaf': 'menu/cakes-loaf',
  'chocolate-cake': 'menu/cakes-loaf',
  'chocolate-glazed-ring-cake': 'menu/cakes-loaf',
  'chocolate-loaf-cake': 'menu/cakes-loaf',
  'chocolate-loaf': 'menu/cakes-loaf',
  'custom-birthday-cake': 'menu/cakes-loaf',
  'custom-celebration-cake': 'menu/cakes-loaf',
  'marble-loaf-cake': 'menu/cakes-loaf',
  'orange-loaf': 'menu/cakes-loaf',
  'red-velvet-cupcakes': 'menu/cakes-loaf',
  'lemon-cake': 'menu/cakes-loaf',

  // menu/cookies-sweets
  'assorted-fancy-cookies-box': 'menu/cookies-sweets',
  'baby-shower-cookies': 'menu/cookies-sweets',
  'birthday-cookies': 'menu/cookies-sweets',
  'butter-cookies-box': 'menu/cookies-sweets',
  'cheese-stick': 'menu/cookies-sweets',
  'chocolate-chip-cookies-dozen': 'menu/cookies-sweets',
  'churros': 'menu/cookies-sweets',
  'halloween-cookies': 'menu/cookies-sweets',
  'mandel-bread': 'menu/cookies-sweets',
  'rogalach-tray-assorted': 'menu/cookies-sweets',
  'rugelach-strawberry': 'menu/cookies-sweets',
  'sandwich': 'menu/cookies-sweets',

  // menu/danishes-babkas
  'apple-danish': 'menu/danishes-babkas',
  'cheese-danish': 'menu/danishes-babkas',
  'chocolate-babka': 'menu/danishes-babkas',
  'chocolate-chip-croissant': 'menu/danishes-babkas',
  'chocolate-croissant': 'menu/danishes-babkas',
  'chocolate-crown-babka': 'menu/danishes-babkas',
  'chocolate-pastry': 'menu/danishes-babkas',
  'chocolate-ring-babka': 'menu/danishes-babkas',
  'cinnamon-bun': 'menu/danishes-babkas',
  'concha-assorted': 'menu/danishes-babkas',
  'concha-chocolate': 'menu/danishes-babkas',
  'concha-pink': 'menu/danishes-babkas',
  'concha-vanilla': 'menu/danishes-babkas',
  'concha-white': 'menu/danishes-babkas',
  'croissant-plain': 'menu/danishes-babkas',
  'funfetti-babka': 'menu/danishes-babkas',
  'mini-pastry-assortment': 'menu/danishes-babkas',
  'opera-petit-fours': 'menu/danishes-babkas',
  'poppy-seed-roll': 'menu/danishes-babkas',
  'poppy-seed-twist': 'menu/danishes-babkas',
  'raisin-twist': 'menu/danishes-babkas',

  // menu/pies
  'blueberry-pie': 'menu/pies',
  'cherry-pie': 'menu/pies',

  // ── Holiday menu ──────────────────────────────────────────────────────
  // holiday/rosh-sukkot-simchat
  'apple-cookies-rosh-hashanah': 'holiday/rosh-sukkot-simchat',
  'rosh-hashanah-round-challah': 'holiday/rosh-sukkot-simchat',

  // holiday/hanukkah
  'chanukah-cookies-platter': 'holiday/hanukkah',
  'chanukah-sugar-cookies-dozen': 'holiday/hanukkah',

  // holiday/purim
  'hamantaschen-assorted': 'holiday/purim',
  'hamantaschen-dozen': 'holiday/purim',

  // holiday/shavuot
  'cheesecake-classic': 'holiday/shavuot',
  'cheesecake-chocolate-swirl': 'holiday/shavuot',
  'cheesecake-fruit': 'holiday/shavuot',
  'cheesecake-loaf-duo': 'holiday/shavuot',

  // holiday/celebration
  'valentines-day-cookies': 'holiday/celebration',
  'mothers-day-cookie-bouquet': 'holiday/celebration',
  'fathers-day-cookies': 'holiday/celebration',
  'graduation-cookies': 'holiday/celebration',

  // holiday/passover (not on the live holiday menu, but clearly a holiday item)
  'passover-cookie-assortment': 'holiday/passover',
};
