// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePhone } from "react-icons/ai";

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
    ["Locations", "/locations"],
    ["About", "/about"],
    ["Contact", "/contact"],
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
            <a href="tel:4167890785" className="navbar__phone">
              <AiOutlinePhone />
              <span>(416) 789-0785</span>
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
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "mobile-menu-overlay--open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu--open" : ""}`}>
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
            {navLinks.map(([label, path]) => (
              <li key={path}>
                <NavLink
                  to={path}
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
          <a href="tel:4167890785" className="mobile-menu__phone">
            <AiOutlinePhone />
            <span>(416) 789-0785</span>
          </a>
          <p className="mobile-menu__hours">Open Daily • Sun-Thu 7AM-6PM</p>
        </div>
      </div>
    </>
  );
}
