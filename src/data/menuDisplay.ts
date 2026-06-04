export interface MenuDisplaySection {
  heading: string;
  items: string[];
}

export interface MenuDisplayGroup {
  id: string;
  title: string;
  photo: string;
  sections: MenuDisplaySection[];
}

export interface HolidayDisplaySection {
  id: string;
  title: string;
  photo: string;
  items: string[];
}

export const MENU_GROUPS: MenuDisplayGroup[] = [
  {
    id: 'breads',
    title: 'Breads',
    photo: 'breads.jpg',
    sections: [
      {
        heading: 'Bagels',
        items: ['Plain', 'Multigrain', 'Sesame', 'Everything', 'Wholewheat', 'Mezonot'],
      },
      {
        heading: 'Breads',
        items: ['Wholewheat', 'White', 'Multigrain', 'Rye', 'Plain', 'Rye Kemo', 'Rye Marble', 'Rye Pumpernickel', 'French'],
      },
      {
        heading: 'Buns & Rolls',
        items: ['Italian Rolls', 'Rye Rolls', 'Onion Packets', 'Onion Buns', 'Baguettes', 'Slider Buns', 'Pretzel Demi Baguettes'],
      },
    ],
  },
  {
    id: 'challah',
    title: 'Challah',
    photo: 'challah.jpg',
    sections: [
      {
        heading: 'Challah',
        items: ['Square', 'Mini', 'Bilkas', 'Pretzel', 'Wholewheat', 'Multigrain', 'Twisted', 'Water'],
      },
    ],
  },
  {
    id: 'cakes-loaf',
    title: 'Cakes & Loaf',
    photo: 'cakes.jpg',
    sections: [
      {
        heading: 'Cakes',
        items: ['Chocolate', 'Vanilla', 'Marble', 'Strawberry Shortcake', 'Black Forest', 'Caramel Crunch', 'Custom Cakes'],
      },
      {
        heading: 'Loaf',
        items: ['Poppy Lemon', 'Orange', 'Apple', 'Cherry', 'Marble', 'Chocolate', 'Berry'],
      },
    ],
  },
  {
    id: 'cookies-sweets',
    title: 'Cookies & Sweets/Savories',
    photo: 'cookies.jpg',
    sections: [
      {
        heading: 'Cookies / Mandel / Icing Cookies',
        items: ['Cookies', 'Mandel', 'Icing Cookies'],
      },
      {
        heading: 'Sweets / Savories',
        items: ['Turnovers', 'Rugelach', 'Pretzel', 'Cheese Sticks', 'Churros', 'Sandwiches', 'Yogurt Parfait'],
      },
    ],
  },
  {
    id: 'danishes-babkas',
    title: 'Danishes & Babkas',
    photo: 'danishes-babkas.jpg',
    sections: [
      {
        heading: 'Danishes / Babkas',
        items: ['Chocolate', 'Cinnamon', 'Assorted Berries', 'Icy Buns', 'Cheese Danishes', 'Poppy Seed'],
      },
    ],
  },
  {
    id: 'pies',
    title: 'Pies',
    photo: 'pies-buns.jpg',
    sections: [
      {
        heading: 'Pies & Buns',
        items: ['Lemon Meringue', 'Fruit Pies', 'Fruit Tarts'],
      },
    ],
  },
];

export const HOLIDAY_SECTIONS: HolidayDisplaySection[] = [
  {
    id: 'rosh-sukkot-simchat',
    title: 'Rosh Hashanah / Sukkot / Simchat Torah',
    photo: 'holiday-rosh-sukkot-simchat.jpg',
    items: ['Round Challah', 'Crown Challah', 'Honey Loaf', 'Honey Cake', 'Gift Baskets', 'Gift Cookie Boxes', 'Sukkah House', 'Torah Cookie'],
  },
  {
    id: 'yom-kippur',
    title: 'Yom Kippur',
    photo: 'holiday-yom-kippur.jpg',
    items: ['Crown Babka', 'Honey Loaf', 'Honey Cake', 'Gift Baskets', 'Gift Cookie Boxes'],
  },
  {
    id: 'hanukkah',
    title: 'Hanukkah',
    photo: 'holiday-hanukkah.jpg',
    items: ['Sufganiyot', 'Cookie Boxes', 'Latkes'],
  },
  {
    id: 'purim',
    title: 'Purim',
    photo: 'holiday-purim.jpg',
    items: ['Hamantaschen (Assorted Flavours)', 'Mishloach Manot'],
  },
  {
    id: 'shavuot',
    title: 'Shavuot',
    photo: 'holiday-shavuot.jpg',
    items: ['Cheesecake only \u2014 all cheese, every cheese'],
  },
  {
    id: 'celebration',
    title: 'Celebration',
    photo: 'holiday-celebration.jpg',
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
