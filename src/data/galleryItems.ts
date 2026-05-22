// Custom-creations gallery manifest.
// Add / remove rows here — components consume this array directly, no hardcoded paths.
// Source images live at public/gallery/cake-XX.png (819 × 1024, 4:5 portrait).
// alt + title are matched to the actual photograph at each path.

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 'cake-01',
    src: '/gallery/cake-01.png',
    alt: 'Round chocolate-glazed drip cake with a yellow buttercream base, sunflowers and fondant bumblebees',
    title: 'Bumblebee & Sunflower Cake',
  },
  {
    id: 'cake-02',
    src: '/gallery/cake-02.png',
    alt: 'White fondant Bar Mitzvah cake with two Torah scrolls, a blue tallit drape and a gold Star of David — "Mazel Tov Ilay"',
    title: 'Bar Mitzvah Torah Cake — Ilay',
  },
  {
    id: 'cake-03',
    src: '/gallery/cake-03.png',
    alt: 'Small white cake with a dark chocolate drip, a whipped-cream swirl, fresh strawberries and chocolate shards',
    title: 'Strawberry Chocolate Drip Cake',
  },
  {
    id: 'cake-04',
    src: '/gallery/cake-04.png',
    alt: 'Three-tier ivory wedding cake with classic swag piping and sugar blossoms',
    title: 'Three-Tier Wedding Cake',
  },
  {
    id: 'cake-05',
    src: '/gallery/cake-05.png',
    alt: 'Lavender ribbed buttercream cake dotted with gold dragées and a cascade of purple and white piped roses',
    title: 'Lavender Rose Cascade Cake',
  },
  {
    id: 'cake-06',
    src: '/gallery/cake-06.png',
    alt: 'Two-tier cake with a rose-gold sequin base and an ivory pleated-drape top tier, trimmed with blush sugar roses',
    title: 'Rose-Gold Draped Cake',
  },
  {
    id: 'cake-07',
    src: '/gallery/cake-07.png',
    alt: 'White buttercream unicorn cake with a metallic purple horn, ears, lashes and a purple rosette mane',
    title: 'Unicorn Cake',
  },
  {
    id: 'cake-08',
    src: '/gallery/cake-08.png',
    alt: 'Cream fondant Bar Mitzvah cake with a navy tallit band and Star of David — "Nathan, Mazel Tov"',
    title: 'Bar Mitzvah Cake — Nathan',
  },
  {
    id: 'cake-09',
    src: '/gallery/cake-09.png',
    alt: 'Tall pink-to-ivory ombré cake flecked with gold leaf and topped with fresh pink and ivory roses',
    title: 'Gold-Leaf & Rose Cake',
  },
  {
    id: 'cake-10',
    src: '/gallery/cake-10.png',
    alt: 'Round white cake with a blue rosette border and a fondant baby bottle — "Mazel Tov Ari Zane"',
    title: 'Baby Bottle Cake — Ari Zane',
  },
  {
    id: 'cake-11',
    src: '/gallery/cake-11.png',
    alt: 'Cream sheet cake with a piped peach buttercream rose bouquet, green leaves and an organza bow — "L\'hitraot, Thank you Naama"',
    title: 'Floral Bouquet Cake — Naama',
  },
  {
    id: 'cake-12',
    src: '/gallery/cake-12.png',
    alt: 'Square Minecraft cake with a green grass-block top and character figures — "Sebastian"',
    title: 'Minecraft Cake — Sebastian',
  },
  {
    id: 'cake-13',
    src: '/gallery/cake-13.png',
    alt: 'Pull-apart cupcake cake shaped as a number two with a race-car theme, checkered flags and a "Happy 2nd Birthday" banner',
    title: 'Two Fast Cupcake Number Cake',
  },
  {
    id: 'cake-14',
    src: '/gallery/cake-14.png',
    alt: 'Pink Bat Mitzvah Torah-scroll cake with a red Star of David and piped roses — "Mazel Tov Aviva Rayla"',
    title: 'Bat Mitzvah Torah Cake — Aviva Rayla',
  },
  {
    id: 'cake-15',
    src: '/gallery/cake-15.png',
    alt: 'Heart-shaped chocolate basket-weave cake brimming with fresh strawberries, grapes, blueberries and kiwi',
    title: 'Chocolate Basket-Weave Heart Cake',
  },
  {
    id: 'cake-16',
    src: '/gallery/cake-16.png',
    alt: 'Cupcake bouquet cake — peach and tan buttercream flower cupcakes arranged as a bouquet with a gold bow — "Happy Birthday Nava"',
    title: 'Cupcake Flower Bouquet — Nava',
  },
  {
    id: 'cake-17',
    src: '/gallery/cake-17.png',
    alt: 'Number-two shaped cake styled as a race track with a green grass border and a red banner — "Happy 2nd Birthday"',
    title: 'Race Track Number Cake',
  },
  {
    id: 'cake-18',
    src: '/gallery/cake-18.png',
    alt: 'Round Toronto Maple Leafs cake with a blue piped border and a white maple leaf — "Happy Birthday Tzvi"',
    title: 'Toronto Maple Leafs Cake — Tzvi',
  },
  {
    id: 'cake-19',
    src: '/gallery/cake-19.png',
    alt: 'Single-tier cake with a soft pink ombré base and painted buttercream roses cascading down one side',
    title: 'Pink Buttercream Rose Cake',
  },
  {
    id: 'cake-20',
    src: '/gallery/cake-20.png',
    alt: 'Heart-shaped engagement photo cake framed with pink and blue buttercream roses — "Happy Engagement"',
    title: 'Engagement Photo Cake',
  },
  {
    id: 'cake-21',
    src: '/gallery/cake-21.png',
    alt: 'Rectangular edible-photo sheet cake with a blue rosette border and balloon accents — "Mazal Tov Levi"',
    title: 'Photo Cake — Levi',
  },
  {
    id: 'cake-22',
    src: '/gallery/cake-22.png',
    alt: 'White fondant Bar Mitzvah Torah-scroll cake with silver scrollwork and a navy Star of David — "Mazal Tov Ronen"',
    title: 'Bar Mitzvah Torah Cake — Ronen',
  },
];
