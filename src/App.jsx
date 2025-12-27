import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Lazy pages
const LandingPage = lazy(() => import("./pages/landing/page.jsx"));
const SolutionsPage = lazy(() => import("./pages/solutions/Page.jsx"));
const ContactPage = lazy(() => import("./pages/contact/page.jsx"));
const AboutPage = lazy(() => import("./pages/about/page.jsx"));
const ProductsPage = lazy(() => import("./pages/products/page.jsx"));
const AuthPage = lazy(() => import("./pages/auth/auth.jsx"));
const NotFoundPage = lazy(() => import("./pages/404/page.jsx"));
const ContactFormModal = lazy(() => import("./modals/ContactFormModal.jsx"));
const AdminDashboard = lazy(() => import("./pages/dashboard/Dashboard.jsx"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard.jsx"));
const ProtectedRoute = lazy(() => import("./context/ProtectedRoute.jsx"));
const PublicLayout = lazy(() => import("./components/PublicLayout.jsx"));

import { AuthProvider } from "./context/AuthContext.jsx";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const AppContent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout onContactClick={() => setModalOpen(true)} showSharedComponents={!isAdminRoute}>
              <LandingPage onContactClick={() => setModalOpen(true)} />
            </PublicLayout>
          }
        />

        <Route
          path="/solutions"
          element={
            <PublicLayout onContactClick={() => setModalOpen(true)} showSharedComponents={!isAdminRoute}>
              <SolutionsPage />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout onContactClick={() => setModalOpen(true)} showSharedComponents={!isAdminRoute}>
              <ContactPage />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout onContactClick={() => setModalOpen(true)} showSharedComponents={!isAdminRoute}>
              <AboutPage />
            </PublicLayout>
          }
        />

        <Route
          path="/products"
          element={
            <PublicLayout onContactClick={() => setModalOpen(true)} showSharedComponents={!isAdminRoute}>
              <ProductsPage />
            </PublicLayout>
          }
        />

        {/* Auth */}
        <Route path="/admin/login" element={<AuthPage />} />
        <Route path="/admin/create" element={<AuthPage />} />

        {/* Protected */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <PublicLayout showSharedComponents={!isAdminRoute}>
              <NotFoundPage />
            </PublicLayout>
          }
        />
      </Routes>

      {modalOpen && <ContactFormModal isOpen onClose={() => setModalOpen(false)} />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <AppContent />
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
