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
const HolidayDetailPage = lazy(() => import("./routes/HolidayDetailPage"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Target a section by id. Content is lazy-loaded and images above the
      // target shift layout as they load, so: wait for the element to mount
      // (up to ~6s for a cold chunk), then re-assert the scroll a few times as
      // the layout settles. Use instant scrolling — a smooth animation here is
      // interrupted by re-renders/layout shifts and intermittently lands at 0.
      const id = hash.slice(1);
      let cancelled = false;
      let waited = 0;
      const jumpTo = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
        return true;
      };
      const settle = (n) => {
        if (cancelled || n <= 0) return;
        jumpTo();
        setTimeout(() => settle(n - 1), 200);
      };
      const waitForEl = () => {
        if (cancelled) return;
        if (jumpTo()) { settle(5); return; }
        waited += 100;
        if (waited < 6000) setTimeout(waitForEl, 100);
      };
      waitForEl();
      return () => { cancelled = true; };
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
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
                  <Route path="challah" element={<Navigate to="/menu/challah-bilkas" replace />} />
                  <Route path=":group" element={<GroupPage />} />
                  <Route path="p/*" element={<Navigate to="/menu" replace />} />
                </Route>
                <Route path="/holidays" element={<PageTransition><HolidaysHub /></PageTransition>} />
                <Route path="/holidays/:occasion" element={<PageTransition><HolidayDetailPage /></PageTransition>} />
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
