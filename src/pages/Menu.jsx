//src\pages\Menu.jsx
import React from "react";
import { menuCategories } from "../menuData.js";

function Menu() {
  const scrollToCategory = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="menu-page">
      {/* HERO / INTRO */}
      <section className="menu-hero">
        <div className="menu-hero__inner">
          <h1>Our Menu</h1>
          <p>
            Explore our breads, cakes, pastries, and sweets — baked fresh in our
            peanut- and tree-nut-free bakery. Prices and selection may vary by
            location and season.
          </p>
          <p className="menu-hero__note">
            All items are baked in a nut-free facility. Always confirm
            ingredients and allergens with our staff when ordering.
          </p>
        </div>
      </section>

      {/* CATEGORY QUICK NAV */}
      <nav className="menu-nav">
        <div className="menu-nav__inner">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              className="menu-nav__button"
              onClick={() => scrollToCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      {/* FULL MENU LIST */}
      <section className="menu-content">
        <div className="menu-content__inner">
          {menuCategories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              className="menu-category"
            >
              <header className="menu-category__header">
                <h2>{cat.name}</h2>
                {cat.description && (
                  <p className="menu-category__description">
                    {cat.description}
                  </p>
                )}
              </header>

              <div className="menu-grid">
                {cat.items.map((item) => (
                  <article key={item.name} className="menu-item">
                    <div className="menu-item__main">
                      <h3>{item.name}</h3>
                      <p className="menu-item__description">
                        {item.description}
                      </p>
                    </div>
                    <div className="menu-item__meta">
                      <span className="menu-item__price">{item.price}</span>
                      <div className="menu-item__tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="menu-item__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Menu;
