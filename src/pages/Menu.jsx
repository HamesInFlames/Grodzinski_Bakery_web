//src\pages\Menu.jsx
import React, { useState, useEffect } from "react";
import { menuCategories } from "../menuData.js";

function Menu() {
  // Track which category is expanded (only one at a time - accordion style)
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Scroll to category section and expand it (closes any other open category)
  const scrollToCategory = (categoryId) => {
    // First close any open category
    setExpandedCategory(null);
    setActiveCategory(categoryId);
    
    // Wait for collapse to complete, then expand and scroll
    setTimeout(() => {
      setExpandedCategory(categoryId);
      
      // Wait for expand to start, then scroll
      setTimeout(() => {
        const el = document.getElementById(categoryId);
        if (el) {
          // Calculate position accounting for sticky nav (navbar + category nav)
          const stickyHeaderHeight = 180;
          const elementTop = el.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: elementTop - stickyHeaderHeight,
            behavior: "smooth"
          });
        }
      }, 50);
    }, 300);
  };

  // Toggle category - accordion style (only one open at a time)
  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      // Close if already open
      setExpandedCategory(null);
    } else {
      // First close any open category
      setExpandedCategory(null);
      
      // Wait for collapse, then expand and scroll
      setTimeout(() => {
        setExpandedCategory(categoryId);
        
        // Scroll to position the header at top
        setTimeout(() => {
          const el = document.getElementById(categoryId);
          if (el) {
            const stickyHeaderHeight = 180;
            const elementTop = el.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
              top: elementTop - stickyHeaderHeight,
              behavior: "smooth"
            });
          }
        }, 50);
      }, 300);
    }
  };

  const isExpanded = (categoryId) => expandedCategory === categoryId;

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

      {/* CATEGORY QUICK NAV - Jump to sections */}
      <nav className="menu-nav menu-nav--enhanced">
        <div className="menu-nav__header">
          <div className="menu-nav__label">
            <span className="menu-nav__label-icon">📋</span>
            <span className="menu-nav__label-text">Categories</span>
          </div>
        </div>
        <div className="menu-nav__inner menu-nav__inner--grid">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              className={`menu-nav__button menu-nav__button--jump ${activeCategory === cat.id ? 'menu-nav__button--active' : ''}`}
              onClick={() => scrollToCategory(cat.id)}
            >
              <span className="menu-nav__button-text">{cat.name}</span>
              <span className="menu-nav__button-count">{cat.items.length} items</span>
            </button>
          ))}
        </div>
      </nav>

      {/* COLLAPSIBLE MENU CATEGORIES */}
      <section className="menu-content">
        <div className="menu-content__inner">
          {menuCategories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              className={`menu-category menu-category--collapsible ${isExpanded(cat.id) ? 'menu-category--expanded' : ''}`}
            >
              {/* Clickable Header */}
              <button 
                className="menu-category__header menu-category__header--clickable"
                onClick={() => toggleCategory(cat.id)}
                aria-expanded={isExpanded(cat.id)}
              >
                <div className="menu-category__header-content">
                  <h2>{cat.name}</h2>
                  {cat.description && (
                    <p className="menu-category__description">
                      {cat.description}
                    </p>
                  )}
                  <span className="menu-category__count">
                    {cat.items.length} {cat.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="menu-category__toggle">
                  <span className="menu-category__toggle-text">
                    {isExpanded(cat.id) ? 'Hide' : 'Show'}
                  </span>
                  <span className="menu-category__toggle-icon">
                    {isExpanded(cat.id) ? '▲' : '▼'}
                  </span>
                </div>
              </button>

              {/* Collapsible Content */}
              <div className={`menu-category__content ${isExpanded(cat.id) ? 'menu-category__content--visible' : ''}`}>
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
            <a href="/visit" className="btn btn--primary">Contact Us</a>
            <a href="tel:4167890785" className="btn btn--secondary">Call (416) 789-0785</a>
          </div>
        </div>
      </section>

      {/* BACK TO TOP BUTTON */}
      <button
        className={`back-to-top ${showBackToTop ? 'back-to-top--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <span className="back-to-top__icon">↑</span>
      </button>
    </div>
  );
}

export default Menu;
