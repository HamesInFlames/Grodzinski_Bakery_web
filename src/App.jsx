// src/App.jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Catering from "./pages/Catering";
import VisitUs from "./pages/VisitUs";
import Gallery from "./pages/Gallery";
import MenuLayout from "./routes/MenuLayout";
import MenuHub from "./routes/MenuHub";
import CategoryPage from "./routes/CategoryPage";
import ProductPage from "./routes/ProductPage";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { PageTransition } from "./components/AnimationWrappers";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      <ScrollToTop />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/menu" element={<PageTransition><MenuLayout /></PageTransition>}>
              <Route index element={<MenuHub />} />
              <Route path=":category" element={<CategoryPage />} />
              <Route path="p/:slug" element={<ProductPage />} />
            </Route>
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/catering" element={<PageTransition><Catering /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/visit" element={<PageTransition><VisitUs /></PageTransition>} />
            <Route path="/locations" element={<Navigate to="/visit" replace />} />
            <Route path="/contact" element={<Navigate to="/visit" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
