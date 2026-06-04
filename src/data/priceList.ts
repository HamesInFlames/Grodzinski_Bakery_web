/**
 * Price list for Grodzinski Bakery.
 *
 * SCOPE: This list contains ONLY the products that appear in the web menu and
 * holiday menu (see `menuDisplay.ts` — MENU_GROUPS and HOLIDAY_SECTIONS). It is
 * intentionally a customer-facing subset of the full catalogue.
 *
 * SOURCE OF TRUTH: All prices come from `grodzinski_products.csv` at the repo
 * root. When a web menu item is a generic name that maps to several sized SKUs
 * in the CSV (e.g. "Baguettes", "Cakes", "Gift Baskets"), the price is shown as
 * "from $X" using the lowest matching SKU price. Single-SKU items show the exact
 * price; made-to-order items show "Custom".
 *
 * To update prices, edit the CSV first, then mirror the change here.
 */

export interface PriceItem {
  name: string;
  /** Display price string, e.g. "$1.10", "from $3.50", "Custom". */
  price: string;
  /** Optional clarifying note shown under the item. */
  note?: string;
}

export interface PriceSection {
  heading: string;
  items: PriceItem[];
  /** Optional note shown under the section heading. */
  note?: string;
}

export interface PriceGroup {
  id: string;
  title: string;
  sections: PriceSection[];
}

export interface PriceHolidaySection {
  id: string;
  title: string;
  items: PriceItem[];
  note?: string;
}

export const PRICE_GROUPS: PriceGroup[] = [
  {
    id: 'breads',
    title: 'Breads',
    sections: [
      {
        heading: 'Bagels',
        note: 'Priced each. By the dozen from $13.20.',
        items: [
          { name: 'Plain', price: '$1.10' },
          { name: 'Multigrain', price: '$1.15' },
          { name: 'Sesame', price: '$1.10' },
          { name: 'Everything', price: '$1.10' },
          { name: 'Wholewheat', price: '$1.10' },
          { name: 'Mezonot', price: '$1.55' },
        ],
      },
      {
        heading: 'Breads',
        items: [
          { name: 'Wholewheat', price: '$5.75' },
          { name: 'White', price: '$5.75' },
          { name: 'Multigrain', price: '$7.55' },
          { name: 'Rye', price: '$7.55' },
          { name: 'Plain', price: '$5.75' },
          { name: 'Rye Kemo', price: '$7.55' },
          { name: 'Rye Marble', price: '$7.55' },
          { name: 'Rye Pumpernickel', price: '$7.55' },
          { name: 'French', price: '$5.75' },
        ],
      },
      {
        heading: 'Buns & Rolls',
        items: [
          { name: 'Italian Rolls', price: '$1.15' },
          { name: 'Rye Rolls', price: '$1.15' },
          { name: 'Onion Packets', price: '$1.35' },
          { name: 'Onion Buns', price: '$1.15' },
          { name: 'Baguettes', price: 'from $3.50', note: 'Small $3.50 · Large $4.50' },
          { name: 'Slider Buns', price: '$0.55' },
          { name: 'Pretzel Demi Baguettes', price: '$1.55' },
        ],
      },
    ],
  },
  {
    id: 'challah',
    title: 'Challah',
    sections: [
      {
        heading: 'Challah',
        items: [
          { name: 'Square', price: '$7.99' },
          { name: 'Mini', price: '$5.79' },
          { name: 'Bilkas', price: '$1.65' },
          { name: 'Pretzel', price: '$8.95' },
          { name: 'Wholewheat', price: '$8.50' },
          { name: 'Multigrain', price: '$8.50' },
          { name: 'Twisted', price: '$7.99' },
          { name: 'Water', price: '$7.99' },
        ],
      },
    ],
  },
  {
    id: 'cakes-loaf',
    title: 'Cakes & Loaf',
    sections: [
      {
        heading: 'Cakes',
        note: 'Priced by size, from 5-inch. Larger rounds and slabs available.',
        items: [
          { name: 'Chocolate', price: 'from $25.00' },
          { name: 'Vanilla', price: 'from $25.00' },
          { name: 'Marble', price: 'from $25.00' },
          { name: 'Strawberry Shortcake', price: 'from $28.00' },
          { name: 'Black Forest', price: 'from $28.00' },
          { name: 'Caramel Crunch', price: 'from $28.00' },
          { name: 'Custom Cakes', price: 'Custom' },
        ],
      },
      {
        heading: 'Loaf',
        items: [
          { name: 'Poppy Lemon', price: '$12.95' },
          { name: 'Orange', price: '$12.95' },
          { name: 'Apple', price: '$12.95' },
          { name: 'Cherry', price: '$12.95' },
          { name: 'Marble', price: '$12.95' },
          { name: 'Chocolate', price: '$12.95' },
          { name: 'Berry', price: '$12.95' },
        ],
      },
    ],
  },
  {
    id: 'cookies-sweets',
    title: 'Cookies & Sweets/Savories',
    sections: [
      {
        heading: 'Cookies / Mandel / Icing Cookies',
        items: [
          { name: 'Cookies', price: '$20.00 / lb', note: 'Plain cookies $1.50 each.' },
          { name: 'Mandel', price: '$11.50' },
          { name: 'Icing Cookies', price: '$2.75' },
        ],
      },
      {
        heading: 'Sweets / Savories',
        items: [
          { name: 'Turnovers', price: '$4.99' },
          { name: 'Rugelach', price: '$1.75' },
          { name: 'Pretzel', price: '$6.00' },
          { name: 'Cheese Sticks', price: '$3.25' },
          { name: 'Churros', price: '$1.25' },
          { name: 'Sandwiches', price: 'from $5.25' },
          { name: 'Yogurt Parfait', price: '$5.75' },
        ],
      },
    ],
  },
  {
    id: 'danishes-babkas',
    title: 'Danishes & Babkas',
    sections: [
      {
        heading: 'Danishes / Babkas',
        items: [
          { name: 'Chocolate', price: '$12.99' },
          { name: 'Cinnamon', price: '$12.99' },
          { name: 'Assorted Berries', price: '$4.25' },
          { name: 'Icy Buns', price: '$13.99' },
          { name: 'Cheese Danishes', price: '$4.65' },
          { name: 'Poppy Seed', price: '$12.99' },
        ],
      },
    ],
  },
  {
    id: 'pies',
    title: 'Pies',
    sections: [
      {
        heading: 'Pies & Buns',
        items: [
          { name: 'Lemon Meringue', price: '$21.00' },
          { name: 'Fruit Pies', price: '$21.00' },
          { name: 'Fruit Tarts', price: 'from $7.95' },
        ],
      },
    ],
  },
];

export const PRICE_HOLIDAY_SECTIONS: PriceHolidaySection[] = [
  {
    id: 'rosh-sukkot-simchat',
    title: 'Rosh Hashanah / Sukkot / Simchat Torah',
    items: [
      { name: 'Round Challah', price: '$7.95', note: 'Small $5.50 · Large $7.95' },
      { name: 'Crown Challah', price: '$16.95' },
      { name: 'Honey Loaf', price: 'from $9.95', note: 'Small $9.95 · Large $15.50' },
      { name: 'Honey Cake', price: 'from $21.00', note: 'Bundt from $21.00; slabs available.' },
      { name: 'Gift Baskets', price: 'from $74.95' },
      { name: 'Gift Cookie Boxes', price: 'from $18.95', note: 'Square $18.95 · Rectangle $24.95' },
      { name: 'Sukkah House', price: '$65.00', note: 'Mini sukkah $4.95' },
      { name: 'Torah Cookie', price: '$3.50' },
    ],
  },
  {
    id: 'yom-kippur',
    title: 'Yom Kippur',
    items: [
      { name: 'Crown Babka', price: '$24.99' },
      { name: 'Honey Loaf', price: 'from $9.95', note: 'Small $9.95 · Large $15.50' },
      { name: 'Honey Cake', price: 'from $21.00', note: 'Bundt from $21.00; slabs available.' },
      { name: 'Gift Baskets', price: 'from $74.95' },
      { name: 'Gift Cookie Boxes', price: 'from $18.95', note: 'Square $18.95 · Rectangle $24.95' },
    ],
  },
  {
    id: 'hanukkah',
    title: 'Hanukkah',
    items: [
      { name: 'Sufganiyot', price: '$2.95' },
      { name: 'Cookie Boxes', price: 'from $10.50', note: 'Gift boxes to $25.95' },
      { name: 'Latkes', price: '$3.50' },
    ],
  },
  {
    id: 'purim',
    title: 'Purim',
    items: [
      { name: 'Hamantaschen (Assorted Flavours)', price: '$1.95', note: 'Fancy $2.25 · Yeast $4.65' },
      { name: 'Mishloach Manot', price: 'from $18.50', note: 'Bowls & baskets to $95.00' },
    ],
  },
  {
    id: 'shavuot',
    title: 'Shavuot',
    items: [
      {
        name: 'Cheesecake — all cheese, every cheese',
        price: 'from $5.25',
        note: 'Slice $5.25 · Loaf $25.00 · Round $50.00',
      },
    ],
  },
  {
    id: 'celebration',
    title: 'Celebration',
    items: [
      { name: 'Custom Holiday Cookies', price: 'Custom' },
      { name: 'Custom Holiday Cakes', price: 'Custom' },
    ],
  },
];
