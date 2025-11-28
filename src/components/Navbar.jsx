// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlinePhone } from "react-icons/ai";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position for enhanced shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    ["Home", "/"],
    ["Menu", "/menu"],
    ["Catering", "/catering"],
    ["Locations", "/locations"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];

  return (
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

        {/* CENTER — NAVIGATION LINKS */}
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
            aria-label="Open mobile menu"
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>
    </nav>
  );
}
