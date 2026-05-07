//src/pages/Menu.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { menuCategories } from "../menuData.js";
import { ScrollReveal, FadeIn, StaggerContainer, StaggerItem } from "../components/AnimationWrappers";
import { ShieldCheck, Star, Wheat, List, ChevronDown } from "lucide-react";

function Menu() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCategory = (categoryId) => {
    setExpandedCategory(null);
    setActiveCategory(categoryId);

    setTimeout(() => {
      setExpandedCategory(categoryId);
      setTimeout(() => {
        const el = document.getElementById(categoryId);
        if (el) {
          const stickyHeaderHeight = 180;
          const elementTop = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementTop - stickyHeaderHeight, behavior: "smooth" });
        }
      }, 50);
    }, 300);
  };

  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(null);
      setTimeout(() => {
        setExpandedCategory(categoryId);
        setTimeout(() => {
          const el = document.getElementById(categoryId);
          if (el) {
            const stickyHeaderHeight = 180;
            const elementTop = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementTop - stickyHeaderHeight, behavior: "smooth" });
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
          <FadeIn delay={0.2}>
            <h1>Our Menu</h1>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p className="menu-hero__subtitle">
              Explore our complete selection of fresh-baked breads, challahs, cakes, pastries,
              and sweets — all made in our 100% peanut- and tree-nut-free bakery.
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="menu-hero__badges">
              <span className="menu-hero__badge"><ShieldCheck size={16} /> 100% Nut-Free Facility</span>
              <span className="menu-hero__badge"><Star size={16} /> Kosher Certified</span>
              <span className="menu-hero__badge"><Wheat size={16} /> Fresh Baked Daily</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="menu-hero__note">
              Prices are subject to change. Please confirm current pricing when ordering.
              Many items available for custom orders — call us to discuss your needs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CATEGORY QUICK NAV */}
      <nav className="menu-nav menu-nav--enhanced">
        <div className="menu-nav__header">
          <div className="menu-nav__label">
            <span className="menu-nav__label-icon"><List size={18} /></span>
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
            <ScrollReveal key={cat.id} distance={20} duration={0.5}>
              <section
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
                    <motion.span
                      className="menu-category__toggle-icon"
                      animate={{ rotate: isExpanded(cat.id) ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </div>
                </button>

                {/* Animated Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isExpanded(cat.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="menu-category__content menu-category__content--visible" style={{ maxHeight: "none" }}>
                        <StaggerContainer className="menu-grid" staggerDelay={0.06}>
                          {cat.items.map((item, index) => (
                            <StaggerItem key={`${item.name}-${index}`} distance={16} duration={0.4}>
                              <article className="menu-item">
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
                                <div className="menu-item__content">
                                  <div className="menu-item__header">
                                    <h3 className="menu-item__name">{item.name}</h3>
                                    <span className="menu-item__price">{item.price}</span>
                                  </div>
                                  <p className="menu-item__description">{item.description}</p>
                                  <div className="menu-item__tags">
                                    {item.tags
                                      .filter(tag => !["Custom Order", "Seasonal"].includes(tag))
                                      .slice(0, 4)
                                      .map((tag) => (
                                        <span key={tag} className="menu-item__tag">{tag}</span>
                                      ))}
                                  </div>
                                </div>
                              </article>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FOOTER NOTE */}
      <ScrollReveal>
        <section className="menu-footer">
          <div className="menu-footer__inner">
            <h3>Questions About Our Menu?</h3>
            <p>
              Can't find what you're looking for? Need a custom order or have dietary questions?
              We're happy to help!
            </p>
            <div className="menu-footer__actions">
              <a href="/visit" className="btn btn--primary">Contact Us</a>
              <a href="tel:9058821350" className="btn btn--secondary">Call (905) 882-1350</a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="back-to-top back-to-top--visible"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <span className="back-to-top__icon">↑</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Menu;
