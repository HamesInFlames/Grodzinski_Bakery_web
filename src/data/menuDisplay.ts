export interface MenuDisplaySection {
  heading: string;
  /** Hero "assorted of all flavours" image for this product's showcase. */
  assortedImage?: string;
  /**
   * Photo-map namespace override for per-flavour lookups. Use when two sections
   * in the same group share flavour names but need different photos (e.g.
   * Bagels vs Breads). Defaults to the parent group id.
   */
  photoGroupId?: string;
  /**
   * Noun used in the showcase "— N flavours" subhead. Defaults to "flavour".
   * Set to "shape" for babka sections, where the items are shapes (Crown,
   * Round, Loaf…) of a single flavour rather than flavours.
   */
  flavourNoun?: string;
  items: string[];
}

export interface MenuDisplayGroup {
  id: string;
  title: string;
  photo: string;
  /** Existing asset used for the hub card and group hero. */
  image?: string;
  sections: MenuDisplaySection[];
}

export interface HolidayDisplaySection {
  id: string;
  title: string;
  /** Hebrew name shown on the holiday card and detail page. */
  hebrew?: string;
  /** Short blurb on the hub card summarising this holiday's selections. */
  description?: string;
  photo: string;
  /** Existing asset used for the hub card and detail hero. */
  image?: string;
  items: string[];
}

export const MENU_GROUPS: MenuDisplayGroup[] = [
  {
    id: 'breads',
    title: 'Breads',
    photo: 'breads.jpg',
    image: '/images/home/thumbnail_breaks_rolls.png',
    sections: [
      {
        heading: 'Bagels',
        assortedImage: '/images/products/menu/breads/assorted-bagels.webp',
        photoGroupId: 'breads-bagels',
        items: ['Plain', 'Multigrain', 'Sesame', 'Everything', 'Wholewheat', 'Mezonot'],
      },
      {
        heading: 'Breads',
        assortedImage: '/images/products/menu/breads/assorted-breads.webp',
        items: ['Wholewheat', 'White', 'Multigrain', 'Rye Plain', 'Rye Kemo', 'Rye Marble', 'Rye Pumpernickel', 'French'],
      },
      {
        heading: 'Buns & Rolls',
        items: ['Italian Rolls', 'Rye Rolls', 'Onion Packets & Buns', 'Baguettes', 'Slider Buns', 'Pretzel Buns & Demi Baguettes'],
      },
    ],
  },
  {
    id: 'challah-bilkas',
    title: 'Challahs & Bilkas',
    photo: 'challah.jpg',
    image: '/images/home/thumbnail_challahs.png',
    sections: [
      {
        heading: 'Challah',
        assortedImage: '/images/home/thumbnail_challahs.png',
        items: [
          'Square',
          'Square Sesame',
          'Egg',
          'Water',
          'Whole Wheat',
          'Multigrain',
          'Sourdough',
          'Raisin',
          'Streusel',
        ],
      },
      {
        heading: 'Bilkas',
        assortedImage: '/images/products/menu/challah/bilka-assorted.webp',
        photoGroupId: 'bilkas',
        items: ['Egg', 'Water', 'Whole Wheat', 'Multigrain', 'Sourdough', 'Raisin', 'Streusel'],
      },
    ],
  },
  {
    id: 'cakes-loaf',
    title: 'Cakes & Loaf',
    photo: 'cakes.jpg',
    image: '/images/home/thumbnail_cakes.png',
    sections: [
      {
        heading: 'Cakes',
        items: ['Chocolate', 'Vanilla', 'Marble', 'Lemon', 'Red Velvet', 'Carrot', 'Strawberry Shortcake', 'Black Forest', 'Caramel Crunch', 'Checkerboard', 'Sprinkles'],
      },
      {
        heading: 'Loaf',
        assortedImage: '/images/products/menu/cakes-loaf/assorted-loaf.webp',
        photoGroupId: 'loaf',
        items: ['Poppy Lemon', 'Orange', 'Apple', 'Cherry', 'Marble', 'Chocolate', 'Berry'],
      },
      {
        heading: 'Bundt Cake',
        photoGroupId: 'bundt',
        items: ['Chocolate', 'Apple', 'Marble', 'Mixed Berry', 'Orange', 'Lemon Poppy'],
      },
      {
        heading: 'Desserts',
        photoGroupId: 'desserts',
        items: ['Personal Desserts', 'Cake Pop', 'Cupcakes/Muffins'],
      },
    ],
  },
  {
    id: 'cookies-sweets',
    title: 'Cookies & Sweets/Savories',
    photo: 'cookies.jpg',
    image: '/images/home/thumbnail_cookies.png',
    sections: [
      {
        heading: 'Cookies',
        assortedImage: '/images/products/menu/cookies-sweets/assorted-cookies-platter.webp',
        items: ['Icing Cookies'],
      },
      {
        heading: 'Savories',
        items: [
          'Assorted Bourekas',
          'Assorted Cheese',
          'Sandwiches',
        ],
      },
      {
        heading: 'Sweets',
        items: [
          'Croissants',
          'Pretzel',
          'Turnovers',
          'Apple Streusel',
          'Assorted Rugelach',
          'Poppy Horseshoe Rolls',
          'Churros',
          'Yogurt Parfait',
        ],
      },
    ],
  },
  {
    id: 'danishes-babkas',
    title: 'Danishes & Babkas',
    photo: 'danishes-babkas.jpg',
    image: '/images/home/thumbnail_danishes_sweets.png',
    sections: [
      {
        heading: 'Danishes',
        items: ['Chocolate Danish', 'Icy Buns', 'Assorted Danish', 'Bufolo Danish'],
      },
      {
        heading: 'Babka',
        items: ['Assorted'],
      },
    ],
  },
  {
    id: 'pies',
    title: 'Pies',
    photo: 'pies-buns.jpg',
    image: '/images/products/menu/pies/assorted-pies.webp',
    sections: [
      {
        heading: 'Pies',
        items: ['Assorted'],
      },
    ],
  },
];

export const HOLIDAY_SECTIONS: HolidayDisplaySection[] = [
  {
    id: 'rosh-sukkot-simchat',
    title: 'Rosh Hashanah / Sukkot / Simchat Torah',
    hebrew: '\u05e8\u05d0\u05e9 \u05d4\u05e9\u05e0\u05d4 \u00b7 \u05e1\u05d5\u05db\u05d5\u05ea \u00b7 \u05e9\u05de\u05d7\u05ea \u05ea\u05d5\u05e8\u05d4',
    description:
      'Round and crown challahs, honey loaf and cake, gift baskets and cookie boxes, plus festive Sukkah houses and Torah cookies for the High Holidays.',
    photo: 'holiday-rosh-sukkot-simchat.jpg',
    image: '/images/products/holiday/rosh-sukkot-simchat/rosh-hashanah-round-challah.webp',
    items: ['Round Challah', 'Crown Challah', 'Honey Loaf', 'Honey Cake', 'Gift Baskets', 'Gift Cookie Boxes', 'Sukkah House', 'Torah Cookie'],
  },
  {
    id: 'yom-kippur',
    title: 'Yom Kippur',
    hebrew: '\u05d9\u05d5\u05dd \u05db\u05d9\u05e4\u05d5\u05e8',
    description:
      'Crown babka, honey loaf and cake, and thoughtful gift baskets and cookie boxes to share before and after the fast.',
    photo: 'holiday-yom-kippur.jpg',
    image: '/images/home/thumbnail_babkas.png',
    items: ['Crown Babka', 'Honey Loaf', 'Honey Cake', 'Gift Baskets', 'Gift Cookie Boxes'],
  },
  {
    id: 'hanukkah',
    title: 'Hanukkah',
    hebrew: '\u05d7\u05e0\u05d5\u05db\u05d4',
    description:
      'Jelly-filled sufganiyot, golden latkes, and festive cookie boxes for the Festival of Lights.',
    photo: 'holiday-hanukkah.jpg',
    image: '/images/products/holiday/hanukkah/chanukah-cookies-platter.webp',
    items: ['Sufganiyot', 'Cookie Boxes', 'Latkes'],
  },
  {
    id: 'purim',
    title: 'Purim',
    hebrew: '\u05e4\u05d5\u05e8\u05d9\u05dd',
    description:
      'Assorted hamantaschen in every flavour and ready-to-give mishloach manot for the Purim feast.',
    photo: 'holiday-purim.jpg',
    image: '/images/products/holiday/purim/hamantaschen-assorted.webp',
    items: ['Hamantaschen (Assorted Flavours)', 'Mishloach Manot'],
  },
  {
    id: 'shavuot',
    title: 'Shavuot',
    hebrew: '\u05e9\u05d1\u05d5\u05e2\u05d5\u05ea',
    description:
      'Cheesecake, and only cheesecake \u2014 every variety we make for the dairy holiday.',
    photo: 'holiday-shavuot.jpg',
    image: '/images/products/holiday/shavuot/assorted-cheesecake.webp',
    items: ['Assorted Cheesecake'],
  },
  {
    id: 'celebration',
    title: 'Celebration',
    hebrew: '\u05d7\u05d2\u05d9\u05d2\u05d4',
    description:
      'Custom holiday cookies and cakes, made to order for any simcha or celebration.',
    photo: 'holiday-celebration.jpg',
    image: '/images/products/menu/cakes-loaf/custom-celebration-cake.webp',
    items: ['Custom Holiday Cookies', 'Custom Holiday Cakes'],
  },
];

export function getMenuNavItems(): { name: string; href: string }[] {
  return MENU_GROUPS.map((g) => ({ name: g.title, href: `/menu/${g.id}` }));
}

export function getMenuGroupById(id: string): MenuDisplayGroup | undefined {
  return MENU_GROUPS.find((g) => g.id === id);
}

export function getHolidaySections(): HolidayDisplaySection[] {
  return HOLIDAY_SECTIONS;
}

export function getHolidaySectionById(id: string): HolidayDisplaySection | undefined {
  return HOLIDAY_SECTIONS.find((s) => s.id === id);
}
