// src/menuData.js
// Comprehensive menu data for Grodzinski Bakery
// Prices shown as placeholders - to be updated with current pricing
// Images shown as placeholders - to be replaced with actual product photos

// Placeholder image for items without photos yet
const PLACEHOLDER_IMAGE = "/images/home/thumbnail_slider.jpg";

export const menuCategories = [
  // ═══════════════════════════════════════════════════════════════
  // CHALLAH & BILKAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "challah-bilkas",
    name: "Challah & Bilkas",
    description:
      "Our famous braided challahs and sweet bilkas — the heart of every Shabbat table and holiday celebration. Fresh-baked daily using traditional recipes.",
    items: [
      {
        name: "Plain Challah (Large)",
        price: "$8.13",
        description: "Our signature beautifully braided challah with a soft, slightly sweet crumb and golden crust. The classic choice for Shabbat.",
        tags: ["Nut-Free", "Pareve", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Plain Challah (Small)",
        price: "$5.56",
        description: "Perfect portion braided challah, ideal for smaller families or weeknight dinners.",
        tags: ["Nut-Free", "Pareve", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Round Challah",
        price: "$8.50",
        description: "Traditional round challah symbolizing continuity and the cycle of the year. Especially popular for Rosh Hashanah.",
        tags: ["Nut-Free", "Pareve", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Sesame Challah",
        price: "$8.13",
        description: "Classic braided challah generously topped with toasted sesame seeds for extra flavor and texture.",
        tags: ["Nut-Free", "Pareve", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Whole Wheat Challah",
        price: "$8.50",
        description: "Wholesome braided challah made with whole wheat flour for a heartier, more nutritious option.",
        tags: ["Nut-Free", "Pareve", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Challah Seeds Square",
        price: "$8.13",
        description: "Square-shaped challah topped with a blend of seeds — perfect for sandwiches and toast.",
        tags: ["Nut-Free", "Pareve", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Challah Seeds Plain",
        price: "$8.13",
        description: "Traditional braided challah with a seeded top, combining classic shape with modern flavor.",
        tags: ["Nut-Free", "Pareve", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Challah Bika",
        price: "$1.76",
        description: "Individual-sized challah roll, perfect for personal servings or alongside meals.",
        tags: ["Nut-Free", "Pareve", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cinnamon Bilka",
        price: "$12.00",
        description: "Soft, pull-apart loaf swirled with sweet cinnamon sugar. A family favourite for breakfast or dessert.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Bilka",
        price: "$12.00",
        description: "Rich chocolate swirled through soft, pillowy dough. Irresistible warm from the oven.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // BREAD & ROLLS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "bread-rolls",
    name: "Bread & Rolls",
    description:
      "Artisan breads and fresh rolls baked daily. From classic sandwich loaves to dinner rolls, each is made with simple, wholesome ingredients.",
    items: [
      {
        name: "White Bread",
        price: "$6.14",
        description: "Soft, classic white sandwich bread with a tender crumb. Perfect for sandwiches and toast.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "French Bread",
        price: "$6.14",
        description: "Crisp golden crust with a light, airy interior. Ideal for bruschetta or alongside soups.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Whole Wheat Bread",
        price: "$6.14",
        description: "Hearty whole wheat loaf packed with fiber and wholesome goodness.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Multigrain Bread",
        price: "$8.14",
        description: "Nutritious loaf made with a blend of grains and seeds for added texture and flavor.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Sandwich Rye Loaf",
        price: "$6.50",
        description: "Traditional deli-style rye bread with authentic European flavor. A classic for sandwiches.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Marble Rye",
        price: "$7.00",
        description: "Beautiful swirl of light and dark rye doughs. Looks as good as it tastes.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Plain Bagel",
        price: "$1.17",
        description: "Classic chewy bagel with a crisp exterior. Baked fresh daily.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Sesame Seed Bagel",
        price: "$1.17",
        description: "Traditional bagel generously topped with toasted sesame seeds.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Everything Bagel",
        price: "$1.35",
        description: "Loaded with sesame, poppy seeds, onion, garlic, and salt. A flavor explosion.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Assorted Dinner Rolls (Dozen)",
        price: "$9.50",
        description: "A mix of soft white and whole wheat dinner rolls. Perfect for family dinners.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Kaiser Rolls (6 Pack)",
        price: "$6.00",
        description: "Classic crusty rolls with the traditional star pattern. Great for sandwiches.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Onion Rolls (6 Pack)",
        price: "$6.50",
        description: "Soft rolls topped with caramelized onions. Savory and delicious.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // BABKAS (BUBKAS)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "babkas",
    name: "Babkas",
    description:
      "Rich, swirled Eastern European sweet breads filled with chocolate, cinnamon, or other delicious fillings. A Grodzinski specialty for generations.",
    items: [
      {
        name: "Chocolate Crown Babka",
        price: "$23.34",
        description: "Our showpiece babka — a magnificent crown shape with rich chocolate swirled throughout. Perfect for celebrations.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Kokosh Babka",
        price: "$21.06",
        description: "Traditional Hungarian-style kokosh with layers of chocolate filling rolled into a tender dough.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Loaf Babka",
        price: "$15.15",
        description: "Classic chocolate babka in loaf form — easy to slice and perfect for sharing.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate 3-Strip Babka",
        price: "$14.63",
        description: "Three strips of chocolate-filled dough braided together. Beautiful and delicious.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Ring Babka",
        price: "$18.00",
        description: "Elegant ring-shaped babka swirled with rich chocolate. A stunning centerpiece.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cinnamon Babka",
        price: "$15.15",
        description: "Sweet cinnamon sugar swirled through soft, buttery dough. Classic comfort.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cinnamon Crown Babka",
        price: "$23.34",
        description: "Crown-shaped babka filled with sweet cinnamon. Impressive and irresistible.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Poppy Seed Twist",
        price: "$16.00",
        description: "Traditional poppy seed filling twisted into flaky pastry. An old-world favourite.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Icy Bun Tray",
        price: "$18.00",
        description: "Assortment of sweet iced buns — perfect for breakfast gatherings or brunch.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Babka Tray",
        price: "$22.00",
        description: "Pre-sliced chocolate babka arranged on a tray. Ready to serve for any occasion.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // CAKES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "cakes",
    name: "Cakes",
    description:
      "Celebration cakes, layer cakes, and classic favourites for every simcha and milestone. Custom designs available — call to discuss your special occasion.",
    items: [
      {
        name: "7-Layer Cake",
        price: "$34.00",
        description: "Our legendary seven thin layers of sponge cake with rich cream between each, topped with glossy chocolate. A customer favourite for decades.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Mousse Cake",
        price: "$38.00",
        description: "Light-as-air chocolate mousse layered on a delicate cake base. Elegant and decadent.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Ladyfinger Chocolate Mousse Cake",
        price: "$42.00",
        description: "Dark chocolate frozen mousse cake decorated with half-dipped ladyfingers. Requires 2 days notice.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Carrot Cake",
        price: "$36.00",
        description: "Moist, spiced carrot cake with cream cheese frosting. A timeless classic.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Coconut Cake",
        price: "$36.00",
        description: "White sponge cake layered with cream and toasted coconuts, sprinkled with coconut shavings.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Mocha Cake",
        price: "$36.00",
        description: "Layers of white sponge filled with mocha buttercream, decorated with whole coffee beans. Coffee lover's dream.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Caramel Crunch Cake",
        price: "$38.00",
        description: "Vanilla sponge with caramel between layers, white icing on the outside topped with caramel and pumpkin seeds.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Black Forest Cake",
        price: "$38.00",
        description: "Classic German-style chocolate cake with cherries and whipped cream. Rich and indulgent.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cheesecake (Plain)",
        price: "$32.00",
        description: "Rich, creamy New York-style cheesecake on a graham cracker crust.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cheesecake (Marble)",
        price: "$34.00",
        description: "Swirled chocolate and vanilla cheesecake — beautiful and delicious.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Strawberry Shortcake",
        price: "$36.00",
        description: "Light sponge cake layered with fresh strawberries and whipped cream. Seasonal favourite.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Tiramisu Cake",
        price: "$40.00",
        description: "Italian-inspired layers of coffee-soaked sponge and mascarpone cream. Dusted with cocoa.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Custom Celebration Cake",
        price: "Call for pricing",
        description: "Personalized cakes for birthdays, bar/bat mitzvahs, anniversaries, and more. Call to discuss designs.",
        tags: ["Nut-Free", "Custom Order", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Custom Wedding Cake",
        price: "Call for pricing",
        description: "Beautiful multi-tier wedding cakes designed to your specifications. Consultation required.",
        tags: ["Nut-Free", "Custom Order", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // BUNDT CAKES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "bundt-cakes",
    name: "Bundt Cakes",
    description:
      "Classic ring-shaped cakes with moist, tender crumbs. Perfect for gifting, entertaining, or enjoying with coffee.",
    items: [
      {
        name: "Large Chocolate Bundt Cake",
        price: "$23.34",
        description: "Rich, moist chocolate bundt cake with a beautiful ring shape. Serves 10-12.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Large Apple Bundt Cake",
        price: "$23.34",
        description: "Moist apple cake with cinnamon spice in an elegant bundt shape. Serves 10-12.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Large Marble Bundt Cake",
        price: "$23.34",
        description: "Swirled vanilla and chocolate in a classic bundt. Beautiful and delicious.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Small Chocolate Bundt Cake",
        price: "$16.00",
        description: "Personal-sized chocolate bundt, perfect for smaller gatherings. Serves 4-6.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Small Apple Bundt Cake",
        price: "$16.00",
        description: "Personal-sized apple bundt with cinnamon. Serves 4-6.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Small Marble Bundt Cake",
        price: "$16.00",
        description: "Personal-sized marble bundt. Serves 4-6.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // LOAF CAKES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "loaf-cakes",
    name: "Loaf Cakes",
    description:
      "Sliceable loaf cakes that are perfect for coffee, dessert, or gifting. Moist and flavorful with every slice.",
    items: [
      {
        name: "Apple Loaf Cake",
        price: "$13.98",
        description: "Moist apple cake with cinnamon and real apple pieces throughout.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cinnamon Loaf Cake",
        price: "$13.98",
        description: "Tender cake with a sweet cinnamon swirl running through the center.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Loaf Cake",
        price: "$13.98",
        description: "Rich chocolate loaf with an intense cocoa flavor. Chocolate lover's dream.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Marble Loaf Cake",
        price: "$13.98",
        description: "Classic swirl of vanilla and chocolate cake marbled together beautifully.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Lemon Loaf Cake",
        price: "$13.98",
        description: "Bright, citrusy lemon cake with a light glaze. Refreshing and delicious.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Banana Loaf Cake",
        price: "$13.98",
        description: "Moist banana bread-style loaf with hints of cinnamon. Comfort in every slice.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Pound Cake",
        price: "$12.00",
        description: "Classic buttery pound cake with a dense, tender crumb. Timeless simplicity.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // COOKIES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "cookies",
    name: "Cookies",
    description:
      "From everyday favourites to elegant decorated cookies for special occasions. We offer a wide variety of styles, flavors, and custom designs.",
    items: [
      {
        name: "Assorted Fancy Cookies (Box)",
        price: "$22.00",
        description: "Beautiful assortment of our finest decorated cookies. Perfect for entertaining or gifting.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Chip Cookies (Dozen)",
        price: "$14.00",
        description: "Classic soft-baked cookies loaded with chocolate chips. A family favourite.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Rogalach",
        price: "$1.81",
        description: "Flaky crescent-shaped pastry filled with rich chocolate. Bite-sized perfection.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cinnamon Rogalach",
        price: "$1.81",
        description: "Traditional rogalach with sweet cinnamon filling wrapped in flaky dough.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Rogalach Tray (Assorted)",
        price: "$28.00",
        description: "Assorted rogalach arranged on a serving tray. Perfect for events and holidays.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Baby Shower Cookies",
        price: "$24.00",
        description: "Adorable decorated cookies in baby-themed shapes. Customizable colors available.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Custom Order", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Wedding Cookies",
        price: "$28.00",
        description: "Elegant decorated cookies perfect for bridal showers, weddings, and engagements.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Custom Order", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Birthday Cookies",
        price: "$24.00",
        description: "Fun, colorful decorated cookies for birthday celebrations. Can be customized.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Custom Order", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Hamantaschen (Assorted)",
        price: "$2.50",
        description: "Traditional triangular Purim cookies with various fillings: poppy, prune, apricot, or chocolate.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Mandel Bread",
        price: "$16.00",
        description: "Traditional Jewish biscotti, twice-baked for perfect crunch. Great with tea or coffee.",
        tags: ["Nut-Free", "Pareve", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Linzer Cookies",
        price: "$3.00",
        description: "Delicate sandwich cookies with jam filling, dusted with powdered sugar.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Black & White Cookies",
        price: "$3.50",
        description: "Classic New York-style cookie, half chocolate, half vanilla icing.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Butter Cookies (Box)",
        price: "$18.00",
        description: "Delicate, melt-in-your-mouth butter cookies in assorted shapes.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Sugar Cookies (Decorated, Dozen)",
        price: "$26.00",
        description: "Hand-decorated sugar cookies. Available in seasonal themes and custom designs.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Custom Order", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // DANISHES & SWEETS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "danishes-sweets",
    name: "Danishes & Sweets",
    description:
      "Flaky pastries and sweet treats, perfect for breakfast, brunch, or afternoon indulgence. Fresh-baked daily.",
    items: [
      {
        name: "Cheese Danish",
        price: "$3.95",
        description: "Buttery, flaky pastry filled with sweet cream cheese. A morning favourite.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Apple Danish",
        price: "$3.95",
        description: "Flaky layers of pastry wrapped around cinnamon-spiced apples.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cherry Danish",
        price: "$3.95",
        description: "Sweet cherry filling nestled in buttery danish pastry.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Blueberry Danish",
        price: "$3.95",
        description: "Fresh blueberry filling in a golden flaky pastry shell.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Mini Danish (Each)",
        price: "$1.64",
        description: "Bite-sized danish pastries, perfect for platters and events. Various flavors available.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Mini Danish Tray",
        price: "$24.00",
        description: "Assortment of mini danishes beautifully arranged for serving.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cinnamon Bun",
        price: "$3.95",
        description: "Soft, gooey cinnamon roll with sweet glaze. Warm comfort in every bite.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Croissant (Plain)",
        price: "$3.50",
        description: "Buttery, flaky French-style croissant. Perfect for breakfast.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Croissant",
        price: "$4.00",
        description: "Flaky croissant filled with rich chocolate. Indulgent and delicious.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Muffins (Various)",
        price: "$3.25",
        description: "Fresh-baked muffins in various flavors: blueberry, chocolate chip, bran, and more.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Scone (Plain or Fruit)",
        price: "$3.50",
        description: "Traditional British-style scone, perfect with tea. Available plain or with fruit.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Strudel (Apple)",
        price: "$16.00",
        description: "Traditional apple strudel with flaky phyllo-style pastry. Serves 6-8.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // DESSERTS & PETIT FOURS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "desserts-petitfours",
    name: "Desserts & Petit Fours",
    description:
      "Elegant bite-sized treats and plated desserts to finish any meal on a sweet note. Perfect for entertaining.",
    items: [
      {
        name: "Opera Petit Fours",
        price: "$3.50",
        description: "Individual squares of almond sponge filled with mocha and heavy cream, topped with ganache.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Petit Fours (Assorted Box)",
        price: "$28.00",
        description: "Beautiful assortment of bite-sized cakes covered with icing and decorations.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Cigars",
        price: "$2.50",
        description: "Rolled wafers filled with heavy cream, dipped on each end. Elegant and delicious.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Mini Pastry Assortment",
        price: "$28.00",
        description: "Selection of miniature pastries perfect for dessert platters and events.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Brownie Squares",
        price: "$18.00",
        description: "Rich, fudgy chocolate brownies cut into squares. Intensely chocolatey.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Lemon Squares",
        price: "$18.00",
        description: "Tangy lemon curd on a buttery shortbread base, dusted with powdered sugar.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Nanaimo Bars",
        price: "$18.00",
        description: "Classic Canadian three-layer no-bake bars with chocolate, custard, and coconut.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Fruit Tarts (Mini)",
        price: "$4.00",
        description: "Buttery tart shell filled with pastry cream and topped with fresh fruit.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Éclairs",
        price: "$4.50",
        description: "Classic French pastry filled with vanilla cream and topped with chocolate glaze.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cream Puffs",
        price: "$4.00",
        description: "Light choux pastry filled with sweet whipped cream. Dusted with powdered sugar.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PIES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "pies",
    name: "Pies",
    description:
      "Family-size pies with flaky crusts and delicious fillings. Perfect for Shabbat tables, holidays, and cozy weekends.",
    items: [
      {
        name: "Apple Pie",
        price: "$22.00",
        description: "Classic apple pie with cinnamon-spiced apples in a flaky, golden crust.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Blueberry Pie",
        price: "$24.00",
        description: "Sweet, juicy blueberry filling in a golden crust. Bursting with berry flavor.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cherry Pie",
        price: "$24.00",
        description: "Tart cherry filling with a beautiful lattice top crust. A classic favourite.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Peach Pie",
        price: "$24.00",
        description: "Sweet peaches in a buttery crust. Seasonal favourite when peaches are at their best.",
        tags: ["Nut-Free", "Pareve", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Pumpkin Pie",
        price: "$22.00",
        description: "Smooth, spiced pumpkin custard in a flaky crust. Essential for fall celebrations.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Lemon Meringue Pie",
        price: "$26.00",
        description: "Tangy lemon curd topped with fluffy toasted meringue. Bright and beautiful.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Coconut Cream Pie",
        price: "$26.00",
        description: "Rich coconut custard topped with whipped cream and toasted coconut.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chocolate Cream Pie",
        price: "$26.00",
        description: "Silky chocolate pudding filling topped with fresh whipped cream.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // GIFTS & BASKETS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "gifts-baskets",
    name: "Gifts & Baskets",
    description:
      "Thoughtfully curated bakery gifts and baskets for holidays, celebrations, corporate events, and times of comfort.",
    items: [
      {
        name: "Rosh Hashanah Gift Basket",
        price: "$84.95",
        description: "Curated basket with grape juice, honey, honey cake, fresh apple, and assorted themed cookies for a sweet new year.",
        tags: ["Nut-Free", "Seasonal", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Holiday Gift Basket (Standard)",
        price: "$69.00",
        description: "Beautiful basket with challah, cookies, and an assortment of baked sweets.",
        tags: ["Nut-Free", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Holiday Gift Basket (Deluxe)",
        price: "$95.00",
        description: "Premium basket with challah, babka, cookies, and a selection of our finest pastries.",
        tags: ["Nut-Free", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Shiva Tray",
        price: "$59.00",
        description: "Comforting assortment of baked goods suitable for condolence calls. Thoughtfully arranged.",
        tags: ["Nut-Free", "Pareve Options", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Shiva Basket",
        price: "$79.00",
        description: "Expanded shiva offering with a larger variety of breads, cakes, and cookies.",
        tags: ["Nut-Free", "Pareve Options", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Corporate Gift Basket",
        price: "$75.00",
        description: "Professional presentation perfect for client gifts or office celebrations.",
        tags: ["Nut-Free", "Contains Gluten", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Celebration Cookie Platter",
        price: "$55.00",
        description: "Fancy decorated cookies arranged on a beautiful serving tray. Perfect for parties.",
        tags: ["Nut-Free", "Dairy", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Breakfast Basket",
        price: "$65.00",
        description: "Morning treats including muffins, danishes, bagels, and spreads. Great for hosts.",
        tags: ["Nut-Free", "Dairy", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Sweet Treats Box",
        price: "$45.00",
        description: "A curated box of our best cookies, brownies, and sweet treats.",
        tags: ["Nut-Free", "Dairy", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Custom Gift Basket",
        price: "Call for pricing",
        description: "Create your own custom basket with your choice of bakery items. Call to discuss.",
        tags: ["Nut-Free", "Custom Order", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // HOLIDAY & SEASONAL SPECIALS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "holiday-seasonal",
    name: "Holiday & Seasonal Specials",
    description:
      "Traditional treats for Jewish holidays and seasonal celebrations throughout the year. Many items available by pre-order — call ahead for holiday orders.",
    items: [
      // ROSH HASHANAH
      {
        name: "Rosh Hashanah Round Challah",
        price: "$9.00",
        description: "Traditional round challah symbolizing the cycle of the year. Often topped with raisins for a sweet new year.",
        tags: ["Nut-Free", "Pareve", "Rosh Hashanah", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Honey Cake",
        price: "$18.00",
        description: "Traditional honey cake for Rosh Hashanah — moist, aromatic, and perfectly sweet for the new year.",
        tags: ["Nut-Free", "Pareve", "Rosh Hashanah", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Apple Cookies (Rosh Hashanah)",
        price: "$24.00",
        description: "Decorated apple-shaped cookies for the Jewish New Year. Box of assorted designs.",
        tags: ["Nut-Free", "Dairy", "Rosh Hashanah", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      // CHANUKAH
      {
        name: "Chanukah Cookies Platter",
        price: "$160.00",
        description: "Approximately 44 beautifully decorated cookies in dreidel, menorah, and Star of David shapes.",
        tags: ["Nut-Free", "Dairy", "Chanukah", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Sufganiyot (Jelly Donuts)",
        price: "$3.50",
        description: "Traditional Chanukah donuts filled with jelly and dusted with powdered sugar. Made fresh during holiday.",
        tags: ["Nut-Free", "Dairy", "Chanukah", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Chanukah Sugar Cookies (Dozen)",
        price: "$28.00",
        description: "Hand-decorated sugar cookies in festive Chanukah shapes and colors.",
        tags: ["Nut-Free", "Dairy", "Chanukah", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      // PURIM
      {
        name: "Hamantaschen (Dozen)",
        price: "$24.00",
        description: "Traditional triangular Purim cookies. Available in poppy, prune, apricot, chocolate, and more.",
        tags: ["Nut-Free", "Dairy", "Purim", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Purim Gift Basket",
        price: "$45.00",
        description: "Festive mishloach manot basket with hamantaschen and assorted treats for Purim.",
        tags: ["Nut-Free", "Purim", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      // PASSOVER
      {
        name: "Passover Sponge Cake",
        price: "$28.00",
        description: "Light, fluffy sponge cake made without flour for Passover. Available during holiday.",
        tags: ["Nut-Free", "Pareve", "Passover", "Kosher for Passover"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Passover Macaroons",
        price: "$16.00",
        description: "Classic coconut macaroons, perfect for Passover. Box of assorted flavors.",
        tags: ["Nut-Free", "Pareve", "Passover", "Kosher for Passover"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Passover Cookie Assortment",
        price: "$22.00",
        description: "Assorted Kosher for Passover cookies. Perfect for seders and holiday entertaining.",
        tags: ["Nut-Free", "Passover", "Kosher for Passover"],
        image: PLACEHOLDER_IMAGE
      },
      // SHAVUOT
      {
        name: "Shavuot Cheesecake",
        price: "$36.00",
        description: "Traditional cheesecake for Shavuot — rich, creamy, and perfect for the dairy holiday.",
        tags: ["Nut-Free", "Dairy", "Shavuot", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Cheese Blintzes",
        price: "$18.00",
        description: "Traditional cheese-filled crepes for Shavuot. Package of 6.",
        tags: ["Nut-Free", "Dairy", "Shavuot", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      // GENERAL HOLIDAYS
      {
        name: "Valentine's Day Cookies",
        price: "$26.00",
        description: "Heart-shaped decorated sugar cookies for Valentine's Day. Dozen assorted.",
        tags: ["Nut-Free", "Dairy", "Valentine's Day", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Mother's Day Cookie Bouquet",
        price: "$35.00",
        description: "Beautiful arrangement of flower-shaped decorated cookies. Perfect for mom.",
        tags: ["Nut-Free", "Dairy", "Mother's Day", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Father's Day Cookies",
        price: "$26.00",
        description: "Fun decorated cookies for dad. Ties, tools, and sports themes available.",
        tags: ["Nut-Free", "Dairy", "Father's Day", "Kosher"],
        image: PLACEHOLDER_IMAGE
      },
      {
        name: "Halloween Cookies",
        price: "$26.00",
        description: "Spooky decorated sugar cookies — pumpkins, ghosts, bats, and more!",
        tags: ["Nut-Free", "Dairy", "Halloween", "Kosher"],
        image: PLACEHOLDER_IMAGE
      }
    ]
  }
];

// Helper function to get all items across categories
export const getAllItems = () => {
  return menuCategories.flatMap(cat => cat.items);
};

// Helper function to get items by tag
export const getItemsByTag = (tag) => {
  return menuCategories.flatMap(cat => 
    cat.items.filter(item => item.tags.includes(tag))
  );
};

// Helper function to get holiday items
export const getHolidayItems = (holiday) => {
  return menuCategories.flatMap(cat => 
    cat.items.filter(item => item.tags.includes(holiday))
  );
};
