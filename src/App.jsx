// src/App.jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Catering from "./pages/Catering";
import VisitUs from "./pages/VisitUs";
import Gallery from "./pages/Gallery";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/about" element={<About />} />
          <Route path="/visit" element={<VisitUs />} />
          {/* Redirect old routes to new Visit Us page */}
          <Route path="/locations" element={<Navigate to="/visit" replace />} />
          <Route path="/contact" element={<Navigate to="/visit" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
