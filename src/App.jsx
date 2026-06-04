import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import KosherBanner from "./components/KosherBanner";
import TovaButton from "./components/TovaButton";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";
import { PageTransition } from "./components/AnimationWrappers";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Catering = lazy(() => import("./pages/Catering"));
const VisitUs = lazy(() => import("./pages/VisitUs"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PriceList = lazy(() => import("./pages/PriceList"));
const MenuLayout = lazy(() => import("./routes/MenuLayout"));
const MenuHub = lazy(() => import("./routes/MenuHub"));
const GroupPage = lazy(() => import("./routes/GroupPage"));
const HolidaysHub = lazy(() => import("./routes/HolidaysHub"));

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
      <KosherBanner />
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
                  <Route path=":group" element={<GroupPage />} />
                  <Route path="p/*" element={<Navigate to="/menu" replace />} />
                </Route>
                <Route path="/holidays" element={<PageTransition><HolidaysHub /></PageTransition>} />
                <Route path="/holidays/:occasion" element={<Navigate to="/holidays" replace />} />
                <Route path="/holidays/:occasion/p/*" element={<Navigate to="/holidays" replace />} />
                <Route path="/gallery" element={<Navigate to="/" replace />} />
                <Route path="/catering" element={<PageTransition><Catering /></PageTransition>} />
                <Route path="/price-list" element={<PageTransition><PriceList /></PageTransition>} />
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
      <TovaButton />
    </div>
  );
}
