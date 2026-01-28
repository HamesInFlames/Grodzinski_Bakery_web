// src/productData.js
// Product data parsed from CSV with categories and dietary tags

// Category mapping based on product names
const categoryMapping = {
  'bagel': 'Bread & Rolls',
  'bread': 'Bread & Rolls',
  'bun': 'Bread & Rolls',
  'baguette': 'Bread & Rolls',
  'rye': 'Bread & Rolls',
  'challah': 'Challah & Bilkas',
  'bilka': 'Challah & Bilkas',
  'bubka': 'Bubkas',
  'babka': 'Bubkas',
  'kokosh': 'Bubkas',
  'icy bun': 'Bubkas',
  'cake': 'Cakes',
  'bundt': 'Cakes',
  'brownie': 'Cakes',
  'cupcake': 'Cakes',
  'loaf cake': 'Loaves',
  'mini loaf': 'Loaves',
  'cookie': 'Cookies',
  'rogalach': 'Cookies',
  'rugelach': 'Cookies',
  'hamantaschen': 'Cookies',
  'gingerbread': 'Cookies',
  'danish': 'Danishes & Sweets',
  'croissant': 'Danishes & Sweets',
  'turnover': 'Danishes & Sweets',
  'strudel': 'Danishes & Sweets',
  'pretzel': 'Danishes & Sweets',
  'sufganiyot': 'Danishes & Sweets',
  'donut': 'Danishes & Sweets',
  'pie': 'Pies',
  'flan': 'Pies',
  'napoleon': 'Desserts & Petit Fours',
  'tart': 'Desserts & Petit Fours',
  'rum ball': 'Desserts & Petit Fours',
  'dominos': 'Desserts & Petit Fours',
  'cake pop': 'Desserts & Petit Fours',
  'swiss roll': 'Desserts & Petit Fours',
  'chocolate roll': 'Desserts & Petit Fours',
  'mocha roll': 'Desserts & Petit Fours',
  'marble cake': 'Desserts & Petit Fours',
  'caramel cake': 'Desserts & Petit Fours',
  'lemon cake': 'Desserts & Petit Fours',
  'carrot cake': 'Desserts & Petit Fours',
  'sandwich': 'Prepared Foods',
  'wrap': 'Prepared Foods',
  'mezonot': 'Prepared Foods',
};

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

// Determine category from product name
function getCategory(name) {
  const lowerName = name.toLowerCase();
  
  for (const [keyword, category] of Object.entries(categoryMapping)) {
    if (lowerName.includes(keyword)) {
      return category;
    }
  }
  
  return 'Other';
}

// Determine dietary tags from ingredients
function getDietaryTags(ingredients) {
  const tags = ['Kosher']; // Everything is Kosher
  const lowerIngredients = ingredients.toLowerCase();
  
  // Check for Dairy
  const dairyKeywords = ['milk', 'butter', 'cream', 'cheese', 'custard', 'dairy'];
  const hasDairy = dairyKeywords.some(keyword => lowerIngredients.includes(keyword));
  
  if (hasDairy) {
    tags.push('Dairy');
  } else if (lowerIngredients.includes('dairy-free') || lowerIngredients.includes('parve') || lowerIngredients.includes('pareve')) {
    tags.push('Dairy Free');
  }
  
  // Check for Gluten (most bakery items have gluten)
  const glutenKeywords = ['wheat', 'flour', 'rye'];
  const hasGluten = glutenKeywords.some(keyword => lowerIngredients.includes(keyword));
  
  if (!hasGluten) {
    tags.push('Gluten Free');
  }
  
  // Sugar Free would need explicit marking - leaving as placeholder
  // tags.push('Sugar Free'); // Only if explicitly marked
  
  return tags;
}

// Parse CSV data into products
export const products = [
  { plu: "20093", name: "Bagel Everything", price: 1.10, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, poppy seeds, sesame seeds, onions", tags: ["Kosher"] },
  { plu: "20072", name: "Margaritas Strawberry", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, whole eggs, water, sugar, shortening, salt, baking powder, strawberry jam", tags: ["Kosher"] },
  { plu: "20004", name: "Chocolate Three Strip", price: 13.75, category: "Bubkas", ingredients: "Wheat flour, pastry flour, vegetable shortening, margarine, eggs, salt, yeast, sugar, baking powder, water, chocolate spread, chocolate chunks", tags: ["Kosher"] },
  { plu: "20010", name: "Hamantaschen Caramel", price: 1.95, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, caramel filling", tags: ["Kosher"] },
  { plu: "20011", name: "Hamantaschen Chocolate", price: 1.95, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, chocolate filling", tags: ["Kosher"] },
  { plu: "20012", name: "Hamantaschen Poppy", price: 1.95, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, poppy seed paste", tags: ["Kosher"] },
  { plu: "20074", name: "Moon Cookies Poppy Seeds", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, whole eggs, water, sugar, shortening, salt, baking powder, poppy seeds", tags: ["Kosher"] },
  { plu: "20075", name: "Sprinkle Delights Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, margarine, icing sugar, egg whites, sprinkles", tags: ["Kosher"] },
  { plu: "20076", name: "Sprinkles Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, water, icing sugar, whole eggs, vanilla, sprinkles", tags: ["Kosher"] },
  { plu: "20015", name: "Hamantaschen Strawberry", price: 1.95, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, strawberry jam", tags: ["Kosher"] },
  { plu: "20016", name: "Hamantaschen Apricot", price: 1.95, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, apricot jam", tags: ["Kosher"] },
  { plu: "20017", name: "Apple Strudel", price: 12.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, shortening, water, sugar, salt, fresh apples, ground cinnamon, raisins", tags: ["Kosher"] },
  { plu: "20077", name: "Jam Drops Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, water, icing sugar, whole eggs, vanilla, strawberry jam", tags: ["Kosher"] },
  { plu: "20026", name: "Pretzel Chocolate", price: 6.00, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, shortening, water, sugar, salt, chocolate filling", tags: ["Kosher"] },
  { plu: "20025", name: "Pretzel Strawberry", price: 6.00, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, shortening, water, sugar, salt, strawberry filling", tags: ["Kosher"] },
  { plu: "20078", name: "Two Tones Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, water, icing sugar, whole eggs, vanilla, cocoa powder", tags: ["Kosher"] },
  { plu: "20029", name: "Loaf Cake Apple", price: 11.99, category: "Loaves", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, apples", tags: ["Kosher"] },
  { plu: "20028", name: "Loaf Cake Honey", price: 15.50, category: "Loaves", ingredients: "Rye flour, Honey, cake flour, orange juice, brown sugar, eggs, cinnamon, ginger, salt, baking soda, vegetable oil", tags: ["Kosher"] },
  { plu: "20079", name: "Gingerbread Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, pastry flour, shortening, white sugar, brown sugar, baking powder, baking soda, ginger powder, cinnamon powder, glucose, eggs, water", tags: ["Kosher"] },
  { plu: "20038", name: "Large Bundt Chocolate", price: 21.95, category: "Cakes", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder", tags: ["Kosher"] },
  { plu: "20039", name: "Large Bundt Marble", price: 21.95, category: "Cakes", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder", tags: ["Kosher"] },
  { plu: "20081", name: "Chocolate Drops Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, water, icing sugar, whole eggs, vanilla, chocolate chips", tags: ["Kosher"] },
  { plu: "20082", name: "Oatmeal Raisins Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, brown sugar, whole eggs, vanilla, baking soda, oats, chocolate chips", tags: ["Kosher"] },
  { plu: "20035", name: "Loaf Cake Chocolate Chips", price: 11.99, category: "Loaves", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, chocolate chips", tags: ["Kosher"] },
  { plu: "20043", name: "Small Bundt Marble", price: 17.50, category: "Cakes", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder", tags: ["Kosher"] },
  { plu: "20085", name: "Pie Apple", price: 21.00, category: "Pies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, prune filling", tags: ["Kosher"] },
  { plu: "20086", name: "Pie Blueberry", price: 21.00, category: "Pies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, blueberry filling", tags: ["Kosher"] },
  { plu: "20089", name: "Bagel Plain", price: 1.10, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence", tags: ["Kosher"] },
  { plu: "20037", name: "Large Bundt Apple", price: 21.95, category: "Cakes", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, apples", tags: ["Kosher"] },
  { plu: "20087", name: "Pie Cherry", price: 21.00, category: "Pies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, cherry filling", tags: ["Kosher"] },
  { plu: "20088", name: "Pie Lemon", price: 21.00, category: "Pies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, lemon filling", tags: ["Kosher"] },
  { plu: "20033", name: "Loaf Cake Mixed Berries", price: 11.99, category: "Loaves", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cranberries, blueberries, cherries", tags: ["Kosher"] },
  { plu: "20057", name: "6 Hamburger Buns Sesame", price: 6.60, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt, sesame seeds", tags: ["Kosher"] },
  { plu: "20071", name: "Lady Fingers Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, margarine, icing sugar, egg whites, chocolate chips", tags: ["Kosher"] },
  { plu: "20103", name: "Napoleon Custard", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, pastry flour, shortening, water, sugar, salt, custard", tags: ["Kosher", "Dairy"] },
  { plu: "20059", name: "6 Hot Dog Buns Sesame", price: 6.60, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt, sesame seeds", tags: ["Kosher"] },
  { plu: "20097", name: "Mocha Roll Cake", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, vanilla, coffee", tags: ["Kosher"] },
  { plu: "20062", name: "Bagel Egg Salad", price: 6.50, category: "Prepared Foods", ingredients: "Whole wheat flour, sugar, whole eggs, canola oil, salt, yeast, mayonnaise, pepper", tags: ["Kosher"] },
  { plu: "20063", name: "Mezonot Egg Sandwich", price: 6.50, category: "Prepared Foods", ingredients: "Whole wheat flour, orange juice, sugar, whole eggs, canola oil, salt, yeast, mayonnaise, pepper", tags: ["Kosher"] },
  { plu: "20064", name: "Mezonot Egg Wrap", price: 7.50, category: "Prepared Foods", ingredients: "Whole wheat flour, orange juice, sugar, whole eggs, canola oil, salt, yeast, mayonnaise, pepper", tags: ["Kosher"] },
  { plu: "20061", name: "5 Slider Buns Sesame", price: 3.99, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt, sesame seeds", tags: ["Kosher"] },
  { plu: "20066", name: "Mezonot Lox Sandwich", price: 8.50, category: "Prepared Foods", ingredients: "Whole wheat flour, orange juice, sugar, whole eggs, canola oil, salt, yeast, lox, dairy-free cream cheese", tags: ["Kosher", "Dairy Free"] },
  { plu: "20068", name: "Bagel Tuna", price: 7.50, category: "Prepared Foods", ingredients: "Whole wheat flour, sugar, whole eggs, canola oil, salt, yeast, tuna, mayonnaise, pepper", tags: ["Kosher"] },
  { plu: "20098", name: "Cake Pop Chocolate", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder", tags: ["Kosher"] },
  { plu: "20095", name: "Dominos", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder", tags: ["Kosher"] },
  { plu: "20099", name: "Cake Pop Vanilla", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, vanilla", tags: ["Kosher"] },
  { plu: "20031", name: "Loaf Cake Marble", price: 12.95, category: "Loaves", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder", tags: ["Kosher"] },
  { plu: "20096", name: "Marble Cake", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder", tags: ["Kosher"] },
  { plu: "20104", name: "Caramel Cake", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, vanilla, caramel filling", tags: ["Kosher"] },
  { plu: "20105", name: "Lemon Cake", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, salt, margarine, lemon, vanilla", tags: ["Kosher"] },
  { plu: "20009", name: "Kokosh Chocolate", price: 20.95, category: "Bubkas", ingredients: "Wheat flour, pastry flour, cocoa powder, vegetable shortening, margarine, eggs, salt, yeast, sugar, baking powder, water, chocolate filling, chocolate chunks", tags: ["Kosher"] },
  { plu: "20109", name: "Rye Bread Small", price: 5.75, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, salt, rye flour, yeast, may contain eggs", tags: ["Kosher"] },
  { plu: "20107", name: "Chocolate Roll", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, baking powder, lemon, dairy-free cream, shortening, margarine, cocoa powder", tags: ["Kosher", "Dairy Free"] },
  { plu: "20049", name: "Jam Rogalach", price: 4.75, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, strawberry jam, cinnamon, pumpkin seeds", tags: ["Kosher"] },
  { plu: "20111", name: "Rye Bread Kimmel", price: 7.50, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, salt, rye flour, yeast, kimmel, may contain eggs", tags: ["Kosher"] },
  { plu: "20112", name: "Rye Bread Pumpernickel", price: 7.50, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, salt, rye flour, rye meal, molasses, yeast, kimmel", tags: ["Kosher"] },
  { plu: "20113", name: "Rye Bread Marble", price: 7.50, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, salt, rye flour, rye meal, molasses, yeast, kimmel", tags: ["Kosher"] },
  { plu: "20020", name: "Turnover Blueberry", price: 4.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, shortening, water, sugar, salt, blueberry filling", tags: ["Kosher"] },
  { plu: "20114", name: "White Bread", price: 5.75, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20116", name: "Challah Bread Whole Wheat", price: 5.75, category: "Challah & Bilkas", ingredients: "Whole wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20121", name: "Nut Free Cake Chocolate", price: 32.50, category: "Cakes", ingredients: "All purpose flour, eggs, water, fine sugar, vegetable oil, baking soda, cocoa powder, salt, baking powder, apple juice, dairy-free whipped cream, chocolate fudge", tags: ["Kosher", "Dairy Free"] },
  { plu: "20117", name: "Whole Wheat Bread", price: 5.75, category: "Bread & Rolls", ingredients: "Whole wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20118", name: "Challah Bread Multigrain", price: 7.50, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, whole wheat flour, water, eggs, honey, canola oil, rye flour, oats, sunflower seeds, wheat bran, salt, millet, sesame seeds, rye meal, poppy seeds, flaxseed, cornmeal, yeast", tags: ["Kosher"] },
  { plu: "20140", name: "Loaf Cake Orange", price: 11.99, category: "Loaves", ingredients: "Unbleached wheat flour, sugar, eggs apple juice, baking powder, water, oranges", tags: ["Kosher"] },
  { plu: "20124", name: "Small Babka Chocolate", price: 12.95, category: "Bubkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, shortening, yeast, salt, margarine, cocoa powder, chocolate chunks", tags: ["Kosher"] },
  { plu: "20123", name: "Nut Free Cake Black White", price: 32.50, category: "Cakes", ingredients: "All purpose flour, eggs, water, fine sugar, vegetable oil, baking soda, cocoa powder, salt, baking powder, apple juice, lemon juice, dairy-free whipped cream, chocolate fudge", tags: ["Kosher", "Dairy Free"] },
  { plu: "20070", name: "Mezonot Tuna Wrap", price: 8.50, category: "Prepared Foods", ingredients: "Whole wheat flour, orange juice, sugar, whole eggs, canola oil, salt, yeast, tuna, mayonnaise, pepper", tags: ["Kosher"] },
  { plu: "20126", name: "Cookies Christmas", price: 25.95, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, water, whole eggs, sugar, salt, baking powder, royal icing, edible print", tags: ["Kosher"], holiday: "Christmas" },
  { plu: "20141", name: "Carrot Cake", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs apple juice, baking powder, water, lemon essence, carrots, coconut.", tags: ["Kosher"] },
  { plu: "20128", name: "Square Challah Plain", price: 7.95, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20132", name: "Challah Bread Plain", price: 7.95, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20134", name: "French Bread", price: 5.75, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, pastry flour, sugar, shortening, salt", tags: ["Kosher"] },
  { plu: "20133", name: "Crown Challah Sesame", price: 16.95, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20131", name: "Challah Bread Raisins", price: 7.95, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt, raisins", tags: ["Kosher"] },
  { plu: "20143", name: "Cupcake Vanilla", price: 4.50, category: "Cakes", ingredients: "Unbleached flour, sugar, eggs apple juice, baking powder, water, lemon essence, butter cream PARVE)", tags: ["Kosher", "Dairy Free"] },
  { plu: "20137", name: "Sufganiyot Custard", price: 2.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, custard", tags: ["Kosher", "Dairy"], holiday: "Chanukah" },
  { plu: "20144", name: "Brownie", price: 4.50, category: "Cakes", ingredients: "Cocoa powder, Cake flour, shortening sugar, eggs", tags: ["Kosher"] },
  { plu: "20048", name: "Mini Loaf Chocolate", price: 6.95, category: "Loaves", ingredients: "Wheat flour, pastry flour, vegetable shortening, margarine, eggs, salt, yeast, sugar, baking powder, water, chocolate spread, chocolate chunks", tags: ["Kosher"] },
  { plu: "20013", name: "Hamantaschen Prune", price: 1.95, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, prune filling", tags: ["Kosher"], holiday: "Purim" },
  { plu: "20091", name: "Bagel Poppy", price: 1.10, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, poppy seeds", tags: ["Kosher"] },
  { plu: "20051", name: "Jam Cookie Rogalach", price: 9.99, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, raspberry jam, cinnamon, raisins, pumpkin seeds, coconut", tags: ["Kosher"] },
  { plu: "20056", name: "6 Hamburger Buns No Seeds", price: 6.60, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20058", name: "6 Hot Dog Buns No Seeds", price: 6.60, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20142", name: "Cupcake Chocolate", price: 4.50, category: "Cakes", ingredients: "Unbleached wheat flour, sugar,eggs apple juice, baking powder, water, lemon essence, cocoa powder, chocolate fudge", tags: ["Kosher"] },
  { plu: "20014", name: "Hamantaschen Raspberry", price: 1.95, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, raspberry jam", tags: ["Kosher"], holiday: "Purim" },
  { plu: "20101", name: "Rum Ball Vanilla", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, vanilla, rum", tags: ["Kosher"] },
  { plu: "20108", name: "Tart", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, salt, margarine, vanilla, lemon, custard, fruit", tags: ["Kosher", "Dairy"] },
  { plu: "20067", name: "Mezonot Lox Wrap", price: 7.50, category: "Prepared Foods", ingredients: "Whole wheat flour, orange juice, sugar, whole eggs, canola oil, salt, yeast, lox, dairy-free cream cheese", tags: ["Kosher", "Dairy Free"] },
  { plu: "20115", name: "Baguette", price: 4.50, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, salt, yeast, canola oil, water", tags: ["Kosher"] },
  { plu: "20092", name: "Bagel Sesame", price: 1.10, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, sesame seeds", tags: ["Kosher"] },
  { plu: "20100", name: "Rum Ball Chocolate", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder, rum", tags: ["Kosher"] },
  { plu: "20065", name: "Bagel Lox and Cheese", price: 7.50, category: "Prepared Foods", ingredients: "Whole wheat flour, sugar, whole eggs, canola oil, salt, yeast, lox, dairy-free cream cheese", tags: ["Kosher", "Dairy Free"] },
  { plu: "20069", name: "Mezonot Tuna Sandwich", price: 7.50, category: "Prepared Foods", ingredients: "Whole wheat flour, orange juice, sugar, whole eggs, canola oil, salt, yeast, tuna, mayonnaise, pepper", tags: ["Kosher"] },
  { plu: "20145", name: "Mini Bilka 2 Pack", price: 1.99, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, eggs, sugar, canola oil yeast, salt, sesame seeds, streusel", tags: ["Kosher"] },
  { plu: "20119", name: "Croissant", price: 4.25, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, salt, yeast, sugar, water, oil, margarine", tags: ["Kosher"] },
  { plu: "20073", name: "Chocolate Crinkle Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, whole eggs, cocoa powder, water, icing sugar, oil, vanilla extract", tags: ["Kosher"] },
  { plu: "20130", name: "Challah Bread Sesame", price: 7.95, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt, sesame seeds", tags: ["Kosher"] },
  { plu: "20002", name: "Rugelach Cinnamon", price: 1.75, category: "Cookies", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, shortening, yeast, salt, margarine, cinnamon powder, raisins", tags: ["Kosher"] },
  { plu: "20129", name: "Square Challah Sesame", price: 7.95, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt, sesame seeds", tags: ["Kosher"] },
  { plu: "20001", name: "Rugelach Chocolate", price: 1.75, category: "Cookies", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, shortening, yeast, salt, margarine, cocoa powder, chocolate chunks", tags: ["Kosher"] },
  { plu: "20006", name: "Chocolate Bubka", price: 24.95, category: "Bubkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, shortening, yeast, salt, margarine, cocoa powder, chocolate chunks", tags: ["Kosher"] },
  { plu: "20005", name: "Icy Buns Cinnamon", price: 12.95, category: "Bubkas", ingredients: "Wheat flour, pastry flour, vegetable shortening, margarine, eggs, salt, yeast, sugar, baking powder, water, cinnamon spread, icing sugar", tags: ["Kosher"] },
  { plu: "20146", name: "Mixed Box Cookies", price: 19.99, category: "Cookies", ingredients: "Unbleached wheat flour, Margarine, Icing sugar Sprinkles, Egg whites, cocoa powder strawberry Jam", tags: ["Kosher"] },
  { plu: "20060", name: "5 Slider Buns No Seeds", price: 3.99, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20021", name: "Turnover Apple", price: 4.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, shortening, water, sugar, salt, apple filling", tags: ["Kosher"] },
  { plu: "20147", name: "Cappuccino Dipped Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour,shortening water, icing sugar, whole eggs, vanilla, chocolate, coffee", tags: ["Kosher"] },
  { plu: "20084", name: "Icing Chanukah Cookies", price: 3.99, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, water, sugar, whole eggs, salt, baking powder, royal icing", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20027", name: "Horseshoe Poppy", price: 4.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, shortening, water, sugar, salt, poppy seeds", tags: ["Kosher"] },
  { plu: "20083", name: "Icing Xmas Cookies", price: 2.99, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, water, sugar, whole eggs, salt, baking powder, royal icing", tags: ["Kosher"], holiday: "Christmas" },
  { plu: "20030", name: "Loaf Cake Chocolate", price: 11.99, category: "Loaves", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder", tags: ["Kosher"] },
  { plu: "20053", name: "Jam Swirl Cookies", price: 9.99, category: "Cookies", ingredients: "Wheat flour, vegetable shortening, sugar, eggs, baking powder, salt, water, raspberry jam, vanilla", tags: ["Kosher"] },
  { plu: "20036", name: "Loaf Cake Double Chocolate", price: 11.99, category: "Loaves", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, chocolate fudge, chocolate chips", tags: ["Kosher"] },
  { plu: "20034", name: "Loaf Cake Cinnamon", price: 11.99, category: "Loaves", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, ground cinnamon", tags: ["Kosher"] },
  { plu: "20032", name: "Loaf Cake Lemon", price: 12.95, category: "Loaves", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, lemon zest", tags: ["Kosher"] },
  { plu: "20040", name: "Large Bundt Mixed Berries", price: 21.95, category: "Cakes", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cranberries, blueberries, cherries", tags: ["Kosher"] },
  { plu: "20041", name: "Small Bundt Apple", price: 17.50, category: "Cakes", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, apples", tags: ["Kosher"] },
  { plu: "20019", name: "Turnover Cherry", price: 4.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, shortening, water, sugar, salt, cherry filling", tags: ["Kosher"] },
  { plu: "20042", name: "Small Bundt Chocolate", price: 17.50, category: "Cakes", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cocoa powder", tags: ["Kosher"] },
  { plu: "20044", name: "Small Bundt Mixed Berries", price: 17.50, category: "Cakes", ingredients: "Unbleached wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence, cranberries, blueberries, cherries", tags: ["Kosher"] },
  { plu: "20149", name: "Icing Xmas Box Cookies 16 Units", price: 48.00, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, water, sugar, whole eggs, salt, baking powder, royal icing", tags: ["Kosher"], holiday: "Christmas" },
  { plu: "20150", name: "Icing Chanukah Box Cookies 16 Units", price: 48.00, category: "Cookies", ingredients: "Unbleached wheat flour, shortening, water, sugar, whole eggs, salt, baking powder, royal icing", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20135", name: "Sufganiyot Blueberry", price: 2.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, blueberry filling", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20138", name: "Sufganiyot Strawberry", price: 2.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, strawberry filling", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20154", name: "Donut", price: 1.39, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast", tags: ["Kosher"] },
  { plu: "20155", name: "Chanukah Cookies", price: 10.99, category: "Cookies", ingredients: "Unbleached wheat flour, whole eggs, water, sugar, shortening, salt, baking powder, sprinkles", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20156", name: "Chanukah Dreidel Cookies", price: 7.50, category: "Cookies", ingredients: "Unbleached wheat flour, pastry flour, shortening, white sugar, brown sugar, baking powder, baking soda, ginger powder, cinnamon powder, glucose, eggs, water", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20152", name: "Sufganiyot 4 Pack Custard", price: 10.00, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, custard", tags: ["Kosher", "Dairy"], holiday: "Chanukah" },
  { plu: "20159", name: "Sufganiyot 4 Pack Chocolate", price: 10.00, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, chocolate filling", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20158", name: "Small Challah Bread Plain", price: 7.95, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt", tags: ["Kosher"] },
  { plu: "20157", name: "Small Challah Bread Sesame", price: 5.95, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt, sesame seeds", tags: ["Kosher"] },
  { plu: "20164", name: "Multigrain Bread", price: 7.50, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, whole wheat flour, water, eggs, honey, canola oil, rye flour, oats, sunflower seeds, wheat bran, salt, millet, sesame seeds, rye meal, poppy seeds, flaxseed, cornmeal, yeast", tags: ["Kosher"] },
  { plu: "20165", name: "Rye Bread Kimmel Small", price: 5.75, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, salt, rye flour, yeast, kimmel", tags: ["Kosher"] },
  { plu: "20080", name: "Chocolate Chips Cookies", price: 9.99, category: "Cookies", ingredients: "Unbleached wheat flour, brown sugar, white sugar, corn syrup, whole eggs, margarine, vanilla extract, salt, baking powder, chocolate chips", tags: ["Kosher"] },
  { plu: "20151", name: "Sufganiyot 4 Pack Strawberry", price: 10.00, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, strawberry filling", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20166", name: "Small Challah Raisins", price: 7.95, category: "Challah & Bilkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, canola oil, yeast, salt, raisins", tags: ["Kosher"] },
  { plu: "20090", name: "Bagel Whole Wheat", price: 1.10, category: "Bread & Rolls", ingredients: "Whole wheat flour, sugar, eggs, apple juice, baking powder, water, lemon essence", tags: ["Kosher"] },
  { plu: "20160", name: "Sufganiyot Strawberry x4", price: 2.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, strawberry filling", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20163", name: "Sufganiyot Lemon x4", price: 2.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, lemon filling", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20094", name: "Bagel Multigrain", price: 1.15, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, whole wheat flour, water, eggs, honey, canola oil, rye flour, oats, sunflower seeds, wheat bran, salt, millet, sesame seeds, rye meal, poppy seeds, flaxseed, cornmeal, yeast", tags: ["Kosher"] },
  { plu: "20161", name: "Sufganiyot Custard x4", price: 2.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, custard", tags: ["Kosher", "Dairy"], holiday: "Chanukah" },
  { plu: "20162", name: "Sufganiyot Chocolate x4", price: 2.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, chocolate filling", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20102", name: "Napoleon Dairy-Free Whipped Cream", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, pastry flour, shortening, water, sugar, salt, dairy-free whipped cream", tags: ["Kosher", "Dairy Free"] },
  { plu: "20153", name: "Sufganiyot 4 Pack Caramel", price: 10.00, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, caramel", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20106", name: "Swiss Roll", price: 4.50, category: "Desserts & Petit Fours", ingredients: "Unbleached wheat flour, sugar, eggs, baking powder, lemon, dairy-free cream, shortening, margarine, vanilla", tags: ["Kosher", "Dairy Free"] },
  { plu: "20110", name: "Rye Bread Plain", price: 7.50, category: "Bread & Rolls", ingredients: "Unbleached wheat flour, water, salt, rye flour, yeast, may contain eggs", tags: ["Kosher"] },
  { plu: "20120", name: "Croissant Cheese", price: 4.65, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, salt, yeast, sugar, water, oil, margarine, cheese", tags: ["Kosher", "Dairy"] },
  { plu: "20122", name: "Nut Free Cake Vanilla Cream", price: 32.50, category: "Cakes", ingredients: "All purpose flour, eggs, water, fine sugar, vegetable oil, baking powder, lemon juice, dairy-free whipped cream, sprinkles", tags: ["Kosher", "Dairy Free"] },
  { plu: "20125", name: "Small Babka Cinnamon", price: 12.95, category: "Bubkas", ingredients: "Unbleached wheat flour, water, whole eggs, sugar, shortening, yeast, salt, margarine, cinnamon powder, raisins", tags: ["Kosher"] },
  { plu: "20136", name: "Sufganiyot Raspberry", price: 2.95, category: "Danishes & Sweets", ingredients: "Unbleached wheat flour, pastry flour, water, whole eggs, shortening, sugar, salt, yeast, raspberry filling", tags: ["Kosher"], holiday: "Chanukah" },
  { plu: "20139", name: "Apple Flan", price: 35.00, category: "Pies", ingredients: "Unbleached wheat flour, cake flour, shortening, sugar, eggs, water, baking powder, apples, apple filling", tags: ["Kosher"] },
];

// Get unique categories
export const categories = [...new Set(products.map(p => p.category))].sort();

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
