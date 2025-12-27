import React, { Suspense, lazy } from "react";

// Lazy load shared components
const TopBar = lazy(() => import("../shared/Topbar/Topbar.jsx"));
const TopNavbar = lazy(() => import("../shared/TopNavbar/TopNavbar.jsx"));
const Footer = lazy(() => import("../shared/footer/Footer.jsx"));
const FloatingActionMenu = lazy(() => import("../shared/FloatingActionMenu.jsx"));
const ScrollToTop = lazy(() => import("../shared/ScrollToTop.jsx"));

// Loader
const SharedComponentLoader = () => (
  <div className="flex items-center justify-center py-4">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
  </div>
);

const PublicLayout = ({ children, onContactClick, showSharedComponents = true }) => {
  // If layout is disabled (admin/auth pages)
  if (!showSharedComponents) {
    return (
      <main id="main-content" aria-label="Main content">
        {children}
      </main>
    );
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header>
        <Suspense fallback={<SharedComponentLoader />}>
          <TopBar />
        </Suspense>

        <Suspense fallback={<SharedComponentLoader />}>
          <TopNavbar />
        </Suspense>
      </header>

      {/* ================= MAIN LANDMARK (CRITICAL) ================= */}
      <main id="main-content" aria-label="Main content">
        {children}
      </main>

      {/* ================= FOOTER ================= */}
      <footer>
        <Suspense fallback={<SharedComponentLoader />}>
          <Footer />
        </Suspense>
      </footer>

      {/* ================= FLOATING / UTILITIES ================= */}
      <Suspense fallback={null}>
        <FloatingActionMenu onContactClick={onContactClick} />
      </Suspense>

      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </>
  );
};

export default PublicLayout;
