// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePhone } from "react-icons/ai";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detect scroll position for enhanced shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    ["Home", "/"],
    ["Menu", "/menu"],
    ["Catering", "/catering"],
    ["Locations", "/locations"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav 
        className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      >
        <div className="navbar__container">
          {/* LEFT — LOGO */}
          <div className="navbar__logo">
            <NavLink to="/" className="navbar__logo-link">
              <h1 className="navbar__logo-text">
                GRODZINSKI
                <span className="navbar__logo-subtitle">BAKERY</span>
              </h1>
            </NavLink>
          </div>

          {/* CENTER — NAVIGATION LINKS (Desktop) */}
          <ul className="navbar__links">
            {navLinks.map(([label, path]) => (
              <li key={path} className="navbar__link-item">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? "navbar__link--active" : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* RIGHT — PHONE & MOBILE MENU */}
          <div className="navbar__right">
            {/* Phone Number (Desktop Only) */}
            <a 
              href="tel:4167890785" 
              className="navbar__phone"
              aria-label="Call Grodzinski Bakery"
            >
              <AiOutlinePhone className="navbar__phone-icon" />
              <span className="navbar__phone-text">(416) 789-0785</span>
            </a>

            {/* Mobile Menu Button */}
            <button 
              className="navbar__mobile-toggle"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "mobile-menu-overlay--open" : ""}`}
        onClick={toggleMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="mobile-menu__header">
          <h2 className="mobile-menu__title">Menu</h2>
          <button 
            className="mobile-menu__close"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <AiOutlineClose />
          </button>
        </div>

        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__links">
            {navLinks.map(([label, path]) => (
              <li key={path} className="mobile-menu__link-item">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`
                  }
                  onClick={toggleMobileMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <a 
            href="tel:4167890785" 
            className="mobile-menu__phone"
          >
            <AiOutlinePhone />
            <span>(416) 789-0785</span>
          </a>
          <p className="mobile-menu__hours">
            Open Daily • Sun-Thu 7AM-6PM
          </p>
        </div>
      </div>
    </>
  );
}
