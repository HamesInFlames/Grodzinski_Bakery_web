// src/App.jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Catering from "./pages/Catering";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="app bg-main text-text">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
