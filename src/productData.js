// src/productData.js
// Product data parsed from Square POS CSV (grodzinski_products.csv)

import csvRaw from '../grodzinski_products.csv?raw';

// Map Square POS Item Names to display categories
const squareCategoryMapping = {
  'bagels': 'Bread & Rolls',
  'baguettes/rolls/buns': 'Bread & Rolls',
  'bread': 'Bread & Rolls',
  'bread items': 'Bread & Rolls',
  'bilka': 'Challah & Bilkas',
  'challah': 'Challah & Bilkas',
  'challah multigrain': 'Challah & Bilkas',
  'challah spelt': 'Challah & Bilkas',
  'bubka': 'Bubkas',
  'bubka\\chocolatestrip\\': 'Bubkas',
  'bow ties/kichels': 'Cookies',
  'boxed cookies': 'Cookies',
  'chan-cookies': 'Cookies',
  'cookies': 'Cookies',
  'cakes': 'Cakes',
  'loaf': 'Loaves',
  'loaf cakes': 'Loaves',
  'danishes': 'Danishes & Sweets',
  'pastries': 'Danishes & Sweets',
  'pies': 'Pies',
  'desserts': 'Desserts & Petit Fours',
  'petit fours': 'Desserts & Petit Fours',
  'prepared': 'Prepared Foods',
  'sandwiches': 'Prepared Foods',
  'gifts': 'Gifts & Baskets',
  'baskets': 'Gifts & Baskets',
  'holiday': 'Cookies',
  'pur-cookies': 'Cookies',
  'rosh-cookies': 'Cookies',
};

function mapSquareCategory(itemName) {
  if (!itemName) return 'Other';
  const key = itemName.toLowerCase().replace(/\\/g, '');
  for (const [squareKey, displayCat] of Object.entries(squareCategoryMapping)) {
    if (key.includes(squareKey.replace(/\\/g, '')) || key.startsWith(squareKey.replace(/\\/g, ''))) {
      return displayCat;
    }
  }
  // Fallback: use keyword matching
  if (key.includes('challah') || key.includes('bilka')) return 'Challah & Bilkas';
  if (key.includes('bagel') || key.includes('bread') || key.includes('bun') || key.includes('roll')) return 'Bread & Rolls';
  if (key.includes('bubka') || key.includes('babka') || key.includes('kokosh')) return 'Bubkas';
  if (key.includes('cake') && !key.includes('cupcake')) return 'Cakes';
  if (key.includes('loaf')) return 'Loaves';
  if (key.includes('cookie') || key.includes('kichel') || key.includes('rogalach')) return 'Cookies';
  if (key.includes('danish') || key.includes('croissant') || key.includes('strudel') || key.includes('sufganiyot')) return 'Danishes & Sweets';
  if (key.includes('pie')) return 'Pies';
  if (key.includes('dessert') || key.includes('petit') || key.includes('napoleon') || key.includes('tart')) return 'Desserts & Petit Fours';
  return 'Other';
}

// Parse Square POS CSV format
// Column indices:
// 0: Token, 1: Item Name, 2: Variation Name, 12: Square Online Item Visibility,
// 21: Price, 23: Archived, 25: Contains Alcohol, 34: Tax - Sales Tax (13%)
function parseSquareCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const products = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split(',');
    if (parts.length < 22) continue;
    
    const token = (parts[0] || '').trim();
    const itemName = (parts[1] || '').trim().replace(/^"|"$/g, '');
    const variationName = (parts[2] || '').trim().replace(/^"|"$/g, '');
    const visibility = (parts[12] || '').trim().toLowerCase();
    const priceStr = (parts[21] || '').trim();
    const archived = (parts[23] || '').trim().toUpperCase() === 'Y';
    const containsAlcohol = (parts[25] || '').trim().toUpperCase() === 'Y';
    const hasTax = (parts[34] || '').trim().toUpperCase() === 'Y';
    
    // Skip if archived, not visible, or missing required fields
    if (archived || !token || !itemName) continue;
    if (visibility !== 'visible') continue;
    
    const priceNum = parseFloat(priceStr);
    if (isNaN(priceNum) || priceStr.toLowerCase() === 'variable') continue;
    
    const category = mapSquareCategory(itemName);
    const name = variationName ? `${itemName} - ${variationName}` : itemName;
    
    // Build tags array
    const tags = ['Kosher'];
    if (containsAlcohol) tags.push('Contains Alcohol');
    
    products.push({
      plu: token,
      name,
      price: priceNum,
      category,
      ingredients: '',
      tags,
      containsAlcohol,
      hasTax,
    });
  }
  return products;
}

// Parse CSV and export products
export const products = parseSquareCSV(csvRaw);

// Gallery category mapping for cookies and cakes
export const galleryCategories = [
  { id: 'all', name: 'All', icon: '🎨' },
  { id: 'wedding', name: 'Wedding', icon: '💒' },
  { id: 'baby', name: 'Baby Shower', icon: '👶' },
  { id: 'birthday', name: 'Birthday', icon: '🎂' },
  { id: 'rosh-hashanah', name: 'Rosh HaShanah & Sukkot', icon: '🍎' },
  { id: 'chanukah', name: 'Chanukkah', icon: '🕎' },
  { id: 'purim', name: 'Purim', icon: '🎭' },
  { id: 'shavuot', name: 'Shavuot', icon: '🧀' },
  { id: 'fathers-day', name: "Father's Day", icon: '👔' },
  { id: 'mothers-day', name: "Mother's Day", icon: '💐' },
  { id: 'halloween', name: 'Halloween', icon: '🎃' },
  { id: 'valentines', name: "Valentine's Day", icon: '❤️' },
  { id: 'christmas', name: 'Christmas', icon: '🎄' },
  { id: 'custom', name: 'Custom Orders', icon: '✨' },
];

// Get unique categories (sorted)
export const categories = [...new Set(products.map(p => p.category))].filter(Boolean).sort();

// Category thumbnails mapping
export const categoryThumbnails = {
  'Bread & Rolls': '/images/home/thumbnail_breaks_rolls.jpg',
  'Challah & Bilkas': '/images/home/thumbnail_challahs.jpg',
  'Bubkas': '/images/home/thumbnail_babkas.jpg',
  'Cakes': '/images/home/thumbnail_cakes.jpg',
  'Loaves': '/images/home/thumbnail_loafcakes.jpg',
  'Cookies': '/images/home/thumbnail_cookies.jpg',
  'Danishes & Sweets': '/images/home/thumbnail_danishes_sweets.jpg',
  'Pies': '/images/home/thumbnail_pies.jpg',
  'Desserts & Petit Fours': '/images/home/thumbnail_personal_desserts.jpg',
  'Prepared Foods': '/images/home/thumbnail_assorted_wraps.jpg',
  'Gifts & Baskets': '/images/home/thumbnail_gift_basket.jpg',
  'Other': '/images/home/thumbnail_slider.jpg',
};

// Get products by category
export function getProductsByCategory(category) {
  return products.filter(p => p.category === category);
}

// Get products grouped by category
export function getProductsGroupedByCategory() {
  const grouped = {};
  categories.forEach(cat => {
    grouped[cat] = getProductsByCategory(cat);
  });
  return grouped;
}

// Format price
export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}
