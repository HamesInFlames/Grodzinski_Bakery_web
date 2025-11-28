//src\pages\Menu.jsx
import React, { useState } from "react";
import { menuCategories } from "../menuData.js";

function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);

  const scrollToCategory = (id) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) {
      // Account for fixed navbar height
      const navbarHeight = 140;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="menu-page">
      {/* HERO / INTRO */}
      <section className="menu-hero">
        <div className="menu-hero__inner">
          <h1>Our Menu</h1>
          <p className="menu-hero__subtitle">
            Explore our complete selection of fresh-baked breads, challahs, cakes, pastries, 
            and sweets — all made in our 100% peanut- and tree-nut-free bakery.
          </p>
          <div className="menu-hero__badges">
            <span className="menu-hero__badge">🥜 100% Nut-Free Facility</span>
            <span className="menu-hero__badge">✡️ Kosher Certified</span>
            <span className="menu-hero__badge">🥖 Fresh Baked Daily</span>
          </div>
          <p className="menu-hero__note">
            Prices are subject to change. Please confirm current pricing when ordering. 
            Many items available for custom orders — call us to discuss your needs.
          </p>
        </div>
      </section>

      {/* CATEGORY QUICK NAV */}
      <nav className="menu-nav">
        <div className="menu-nav__inner">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              className={`menu-nav__button ${activeCategory === cat.id ? 'menu-nav__button--active' : ''}`}
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
                <span className="menu-category__count">
                  {cat.items.length} {cat.items.length === 1 ? 'item' : 'items'}
                </span>
              </header>

              <div className="menu-grid">
                {cat.items.map((item, index) => (
                  <article key={`${item.name}-${index}`} className="menu-item">
                    {/* Image */}
                    <div className="menu-item__image-wrapper">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="menu-item__image"
                        loading="lazy"
                      />
                      {item.tags.includes("Custom Order") && (
                        <span className="menu-item__badge">Custom Order</span>
                      )}
                      {item.tags.includes("Seasonal") && (
                        <span className="menu-item__badge menu-item__badge--seasonal">Seasonal</span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="menu-item__content">
                      <div className="menu-item__header">
                        <h3 className="menu-item__name">{item.name}</h3>
                        <span className="menu-item__price">{item.price}</span>
                      </div>
                      
                      <p className="menu-item__description">
                        {item.description}
                      </p>
                      
                      <div className="menu-item__tags">
                        {item.tags
                          .filter(tag => !["Custom Order", "Seasonal"].includes(tag))
                          .slice(0, 4)
                          .map((tag) => (
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

      {/* FOOTER NOTE */}
      <section className="menu-footer">
        <div className="menu-footer__inner">
          <h3>Questions About Our Menu?</h3>
          <p>
            Can't find what you're looking for? Need a custom order or have dietary questions? 
            We're happy to help!
          </p>
          <div className="menu-footer__actions">
            <a href="/contact" className="btn btn--primary">Contact Us</a>
            <a href="tel:4167890785" className="btn btn--ghost">Call (416) 789-0785</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;
