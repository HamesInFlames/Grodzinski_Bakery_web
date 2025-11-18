// src/menuData.js

export const menuCategories = [
  {
    id: "bread-rolls",
    name: "Bread & Rolls",
    description:
      "Everyday loaves and sandwich rolls, baked fresh from simple, wholesome ingredients.",
    items: [
      {
        name: "Plain Challah (Large)",
        price: "$7.50",
        description: "Classic braided loaf with a soft, slightly sweet crumb.",
        tags: ["Nut-Free", "Dairy-Free", "Contains Egg", "Kosher"]
      },
      {
        name: "Whole Wheat Challah",
        price: "$7.95",
        description: "Braided challah made with whole wheat flour for a heartier bite.",
        tags: ["Nut-Free", "Contains Egg", "Kosher"]
      },
      {
        name: "Sandwich Rye Loaf",
        price: "$6.25",
        description: "Traditional rye loaf, perfect for sandwiches and toast.",
        tags: ["Nut-Free", "Dairy-Free", "Contains Gluten", "Kosher"]
      },
      {
        name: "Assorted Dinner Rolls (Dozen)",
        price: "$8.95",
        description: "A mix of soft white and whole wheat dinner rolls.",
        tags: ["Nut-Free", "Dairy-Free", "Contains Gluten", "Kosher"]
      }
    ]
  },
  {
    id: "cakes",
    name: "Cakes",
    description:
      "Layer cakes, celebration cakes, and classic favourites for every simcha and milestone.",
    items: [
      {
        name: "7-Layer Cake",
        price: "$32.00",
        description: "Thin layers of sponge with rich cream and chocolate on top.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Kosher"]
      },
      {
        name: "Carrot Cake",
        price: "$34.00",
        description: "Moist carrot cake with spice, finished with creamy frosting.",
        tags: ["Nut-Free", "Dairy", "Contains Egg", "Contains Gluten"]
      },
      {
        name: "Chocolate Mousse Cake",
        price: "$36.00",
        description: "Light chocolate mousse on a delicate cake base.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      }
    ]
  },
  {
    id: "challah-bilkas",
    name: "Challah & Bilkas",
    description:
      "Braided challah and filled bilkas for Shabbat tables, holidays, and every Friday night.",
    items: [
      {
        name: "Round Challah",
        price: "$8.25",
        description: "Traditional round challah, especially popular for holidays.",
        tags: ["Nut-Free", "Contains Egg"]
      },
      {
        name: "Sesame Challah",
        price: "$7.95",
        description: "Braided challah topped with toasted sesame seeds.",
        tags: ["Nut-Free", "Contains Egg"]
      },
      {
        name: "Cinnamon Bilka",
        price: "$10.95",
        description: "Soft pull-apart loaf swirled with cinnamon sugar.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      }
    ]
  },
  {
    id: "cookies",
    name: "Cookies",
    description:
      "Everyday and fancy cookies, from kid-friendly treats to elegant platters.",
    items: [
      {
        name: "Assorted Fancy Cookies (Box)",
        price: "$18.95",
        description: "An assortment of classic fancy cookies for sharing.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      },
      {
        name: "Baby Cookies",
        price: "$15.95",
        description: "Decorated cookies for baby showers and celebrations.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      },
      {
        name: "Chocolate Chip Cookies (Dozen)",
        price: "$11.95",
        description: "Soft cookies with chocolate chips in every bite.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      }
    ]
  },
  {
    id: "danishes-sweets",
    name: "Danishes & Sweets",
    description:
      "Flaky pastries and sweet buns, ideal with a coffee or for a dessert table.",
    items: [
      {
        name: "Cheese Danish",
        price: "$3.95",
        description: "Buttery pastry filled with sweet cheese.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten"]
      },
      {
        name: "Apple Danish",
        price: "$3.95",
        description: "Layers of pastry wrapped around cinnamon-spiced apples.",
        tags: ["Nut-Free", "Dairy", "Contains Gluten"]
      },
      {
        name: "Cinnamon Bun",
        price: "$3.75",
        description: "Soft swirl with cinnamon filling and a light glaze.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      }
    ]
  },
  {
    id: "desserts-petitfours",
    name: "Desserts & Petit Fours",
    description:
      "Bite-sized treats and plated desserts to finish any meal on a sweet note.",
    items: [
      {
        name: "Mini Pastry Assortment",
        price: "$24.95",
        description: "An assortment of mini pastries for dessert platters.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      },
      {
        name: "Petit Fours",
        price: "$22.95",
        description: "Small layered cakes covered with icing and decoration.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      },
      {
        name: "Brownie Squares",
        price: "$16.95",
        description: "Rich chocolate brownies cut into small squares.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      }
    ]
  },
  {
    id: "gifts-baskets",
    name: "Gifts & Baskets",
    description:
      "Thoughtful bakery gifts and baskets for holidays, families, and corporate events.",
    items: [
      {
        name: "Holiday Gift Basket",
        price: "$69.00",
        description: "A curated mix of challah, cookies, and sweets.",
        tags: ["Nut-Free", "Contains Gluten"]
      },
      {
        name: "Shiva Tray",
        price: "$59.00",
        description: "Comforting baked goods suitable for condolence calls.",
        tags: ["Nut-Free", "Pareve Options"]
      },
      {
        name: "Celebration Cookie Platter",
        price: "$49.00",
        description: "Fancy cookies arranged on a ready-to-serve tray.",
        tags: ["Nut-Free", "Dairy"]
      }
    ]
  },
  {
    id: "loaf-cakes",
    name: "Loaf Cakes",
    description:
      "Sliceable loaf cakes that are perfect for coffee, dessert, or gifting.",
    items: [
      {
        name: "Marble Loaf",
        price: "$10.95",
        description: "Vanilla and chocolate cake marbled together.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      },
      {
        name: "Lemon Loaf",
        price: "$10.95",
        description: "Bright lemon loaf with a light citrus glaze.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      },
      {
        name: "Chocolate Chip Loaf",
        price: "$10.95",
        description: "Soft loaf cake studded with chocolate chips.",
        tags: ["Nut-Free", "Dairy", "Contains Egg"]
      }
    ]
  },
  {
    id: "pies",
    name: "Pies",
    description:
      "Family-size pies for Shabbat tables, holidays, and cozy weekends.",
    items: [
      {
        name: "Apple Pie",
        price: "$19.95",
        description: "Classic apple pie with a flaky crust.",
        tags: ["Nut-Free", "Dairy-Free", "Contains Gluten"]
      },
      {
        name: "Blueberry Pie",
        price: "$21.95",
        description: "Sweet blueberry filling in a golden crust.",
        tags: ["Nut-Free", "Contains Gluten"]
      },
      {
        name: "Cherry Pie",
        price: "$21.95",
        description: "Tart cherry filling with lattice top crust.",
        tags: ["Nut-Free", "Contains Gluten"]
      }
    ]
  }
];
