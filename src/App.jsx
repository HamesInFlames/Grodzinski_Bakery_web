import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Locations from "./pages/Locations.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  const navLinkClass = ({ isActive }) =>
    "navbar__link" + (isActive ? " navbar__link--active" : "");

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar__logo">
          <span className="navbar__logo-main">GRODZINSKI</span>
          <span className="navbar__logo-sub">BAKERY</span>
        </div>
        <nav className="navbar__links">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navLinkClass}>
            Menu
          </NavLink>
          <NavLink to="/locations" className={navLinkClass}>
            Locations
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>
      </header>

      {/* ROUTES */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Grodzinski Bakery. All rights reserved.</p>
        <p className="footer__note">
          Fresh bread, family traditions, and a warm welcome — every day.
        </p>
      </footer>
    </div>
  );
}

export default App;
