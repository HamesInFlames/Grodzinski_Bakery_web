import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import About from "./pages/About.jsx";
import Catering from "./pages/Catering.jsx";
import Locations from "./pages/Locations.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <div className="app">
      {/* NEW NAVBAR */}
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/Catering" element={<Catering />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

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
