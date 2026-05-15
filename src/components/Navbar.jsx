// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Gallery", "/gallery"],
  ["Catering", "/catering"],
  ["About", "/about"],
  ["Visit Us", "/visit"],
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Focus trap + Escape for the mobile drawer.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusables = drawer.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <div className="navbar__logo">
            <NavLink to="/" className="navbar__wordmark-link" aria-label="Grodzinski Bakery — home">
              <img
                src="/images/home/logo_trensparent.png"
                alt="Grodzinski Bakery"
                className="navbar__wordmark-img"
              />
            </NavLink>
          </div>

          <nav className="navbar__nav" aria-label="Primary">
            {NAV_LINKS.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <a href="tel:9058821350" className="navbar__phone">
              <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>(905) 882-1350</span>
            </a>

            <button
              ref={toggleBtnRef}
              type="button"
              className="navbar__mobile-btn"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={24} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay mobile-menu-overlay--open"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            id="mobile-drawer"
            ref={drawerRef}
            className="mobile-menu mobile-menu--open"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mobile-menu__header">
              <img
                src="/images/home/logo_trensparent.png"
                alt="Grodzinski Bakery"
                className="mobile-menu__wordmark-img"
              />
              <button
                type="button"
                className="mobile-menu__close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav className="mobile-menu__nav" aria-label="Mobile primary">
              <ul className="mobile-menu__links">
                {NAV_LINKS.map(([label, path]) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      end={path === "/"}
                      className={({ isActive }) =>
                        `mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobile-menu__footer">
              <a href="tel:9058821350" className="mobile-menu__phone">
                <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
                <span>(905) 882-1350</span>
              </a>
              <p className="mobile-menu__hours">Open Sun&ndash;Thu, closed Saturday</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
