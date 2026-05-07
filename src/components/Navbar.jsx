// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    ["Home", "/"],
    ["Menu", "/menu"],
    ["Gallery", "/gallery"],
    ["Catering", "/catering"],
    ["About", "/about"],
    ["Visit Us", "/visit"],
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <div className="navbar__logo">
            <NavLink to="/" className="navbar__logo-link">
              <img
                src="/images/home/logo.png"
                alt="Grodzinski Bakery"
                className="navbar__logo-image"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="navbar__nav">
            {navLinks.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            <a href="tel:9058821350" className="navbar__phone">
              <AiOutlinePhone />
              <span>(905) 882-1350</span>
            </a>

            <button
              className="navbar__mobile-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay mobile-menu-overlay--open"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu mobile-menu--open"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transform: undefined }} // let motion control transform
          >
            <div className="mobile-menu__header">
              <h2 className="mobile-menu__title">Menu</h2>
              <button
                className="mobile-menu__close"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <AiOutlineClose />
              </button>
            </div>

            <nav className="mobile-menu__nav">
              <ul className="mobile-menu__links">
                {navLinks.map(([label, path], i) => (
                  <motion.li
                    key={path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mobile-menu__footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <a href="tel:9058821350" className="mobile-menu__phone">
                <AiOutlinePhone />
                <span>(905) 882-1350</span>
              </a>
              <p className="mobile-menu__hours">Open Daily • Sun-Thu 7AM-6PM</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
