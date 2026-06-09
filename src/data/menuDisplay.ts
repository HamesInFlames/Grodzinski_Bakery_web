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
        assortedImage: '/images/products/assorted-bagels.webp',
        photoGroupId: 'breads-bagels',
        items: ['Plain', 'Multigrain', 'Sesame', 'Everything', 'Wholewheat', 'Mezonot'],
      },
      {
        heading: 'Breads',
        assortedImage: '/images/products/assorted-breads.webp',
        items: ['Wholewheat', 'White', 'Multigrain', 'Rye', 'Plain', 'Rye Kemo', 'Rye Marble', 'Rye Pumpernickel', 'French'],
      },
      {
        heading: 'Buns & Rolls',
        assortedImage: '/images/products/onion-rolls-6-pack.webp',
        items: ['Italian Rolls', 'Rye Rolls', 'Onion Packets & Buns', 'Baguettes', 'Slider Buns', 'Pretzel Demi Baguettes'],
      },
    ],
  },
  {
    id: 'challah',
    title: 'Challah',
    photo: 'challah.jpg',
    image: '/images/home/thumbnail_challahs.png',
    sections: [
      {
        heading: 'Challah',
        assortedImage: '/images/home/thumbnail_challahs.png',
        items: ['Square', 'Mini', 'Bilkas', 'Pretzel', 'Wholewheat', 'Multigrain', 'Twisted', 'Water'],
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
        assortedImage: '/images/home/thumbnail_cakes.png',
        items: ['Chocolate', 'Vanilla', 'Marble', 'Strawberry Shortcake', 'Black Forest', 'Caramel Crunch', 'Custom Cakes'],
      },
      {
        heading: 'Loaf',
        assortedImage: '/images/products/marble-loaf-cake.webp',
        photoGroupId: 'loaf',
        items: ['Poppy Lemon', 'Orange', 'Apple', 'Cherry', 'Marble', 'Chocolate', 'Berry'],
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
        heading: 'Cookies / Mandel / Icing Cookies',
        assortedImage: '/images/home/thumbnail_cookies.png',
        items: ['Cookies', 'Mandel', 'Icing Cookies'],
      },
      {
        heading: 'Sweets / Savories',
        assortedImage: '/images/products/rogalach-tray-assorted.webp',
        items: ['Turnovers', 'Rugelach', 'Pretzel', 'Cheese Sticks', 'Churros', 'Sandwiches', 'Yogurt Parfait'],
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
        heading: 'Danishes / Babkas',
        assortedImage: '/images/home/thumbnail_babkas.png',
        items: ['Chocolate', 'Cinnamon', 'Assorted Berries', 'Icy Buns', 'Cheese Danishes', 'Poppy Seed'],
      },
    ],
  },
  {
    id: 'pies',
    title: 'Pies',
    photo: 'pies-buns.jpg',
    image: '/images/products/blueberry-pie.webp',
    sections: [
      {
        heading: 'Pies & Buns',
        assortedImage: '/images/products/blueberry-pie.webp',
        items: ['Lemon Meringue', 'Fruit Pies', 'Fruit Tarts'],
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
    image: '/images/products/rosh-hashanah-round-challah.webp',
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
    image: '/images/products/chanukah-cookies-platter.webp',
    items: ['Sufganiyot', 'Cookie Boxes', 'Latkes'],
  },
  {
    id: 'purim',
    title: 'Purim',
    hebrew: '\u05e4\u05d5\u05e8\u05d9\u05dd',
    description:
      'Assorted hamantaschen in every flavour and ready-to-give mishloach manot for the Purim feast.',
    photo: 'holiday-purim.jpg',
    image: '/images/products/hamantaschen-assorted.webp',
    items: ['Hamantaschen (Assorted Flavours)', 'Mishloach Manot'],
  },
  {
    id: 'shavuot',
    title: 'Shavuot',
    hebrew: '\u05e9\u05d1\u05d5\u05e2\u05d5\u05ea',
    description:
      'Cheesecake, and only cheesecake \u2014 every variety we make for the dairy holiday.',
    photo: 'holiday-shavuot.jpg',
    image: '/images/home/thumbnail_cakes.png',
    items: ['Cheesecake only \u2014 all cheese, every cheese'],
  },
  {
    id: 'celebration',
    title: 'Celebration',
    hebrew: '\u05d7\u05d2\u05d9\u05d2\u05d4',
    description:
      'Custom holiday cookies and cakes, made to order for any simcha or celebration.',
    photo: 'holiday-celebration.jpg',
    image: '/images/products/custom-celebration-cake.webp',
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
