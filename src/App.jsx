// src/App.jsx
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";
import { PageTransition } from "./components/AnimationWrappers";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Catering = lazy(() => import("./pages/Catering"));
const VisitUs = lazy(() => import("./pages/VisitUs"));
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MenuLayout = lazy(() => import("./routes/MenuLayout"));
const MenuHub = lazy(() => import("./routes/MenuHub"));
const CategoryPage = lazy(() => import("./routes/CategoryPage"));
const ProductPage = lazy(() => import("./routes/ProductPage"));

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
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <ScrollToTop />
      <main id="main-content">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
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
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
