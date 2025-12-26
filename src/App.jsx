import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Lazy load components for better performance
const TopNavbar = lazy(() => import("./shared/TopNavbar/TopNavbar.jsx"));
const Footer = lazy(() => import("./shared/footer/Footer.jsx"));
const LandingPage = lazy(() => import("./pages/landing/page.jsx"));
const SolutionsPage = lazy(() => import("./pages/solutions/Page.jsx"));
const ContactPage = lazy(() => import("./pages/contact/page.jsx"));
const TopBar = lazy(() => import("./shared/Topbar/Topbar.jsx"));
const AboutPage = lazy(() => import("./pages/about/page.jsx"));
const FloatingActionMenu = lazy(() => import("./shared/FloatingActionMenu.jsx"));
const ScrollToTop = lazy(() => import("./shared/ScrollToTop.jsx"));
const ProductsPage = lazy(() => import("./pages/products/page.jsx"));
const AuthPage = lazy(() => import("./pages/auth/auth.jsx"));
const NotFoundPage = lazy(() => import("./pages/404/page.jsx"));
const ContactFormModal = lazy(() => import("./modals/ContactFormModal.jsx"));
const AdminDashboard = lazy(() => import("./pages/dashboard/Dashboard.jsx"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard.jsx"));
const ProtectedRoute = lazy(() => import('./context/ProtectedRoute.jsx'));

// Keep AuthProvider non-lazy as it's needed immediately
import { AuthProvider } from './context/AuthContext.jsx';

// Loading component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
);

const AppContent = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    // Check if current route is an admin route
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div>
            <Routes>
                {/* Public routes with header and footer */}
                <Route path="/" element={
                    <>
                        {!isAdminRoute && (
                            <>
                                <TopBar />
                                <TopNavbar />
                            </>
                        )}
                        <LandingPage onContactClick={openModal} />
                        {!isAdminRoute && (
                            <>
                                <Footer />
                                <FloatingActionMenu onContactClick={openModal} />
                                <ScrollToTop />
                            </>
                        )}
                    </>
                } />
                <Route path="/solutions" element={
                    <>
                        {!isAdminRoute && (
                            <>
                                <TopBar />
                                <TopNavbar />
                            </>
                        )}
                        <SolutionsPage onContactClick={openModal} />
                        {!isAdminRoute && (
                            <>
                                <Footer />
                                <FloatingActionMenu onContactClick={openModal} />
                                <ScrollToTop />
                            </>
                        )}
                    </>
                } />
                <Route path="/contact-us" element={
                    <>
                        {!isAdminRoute && (
                            <>
                                <TopBar />
                                <TopNavbar />
                            </>
                        )}
                        <ContactPage />
                        {!isAdminRoute && (
                            <>
                                <Footer />
                                <FloatingActionMenu onContactClick={openModal} />
                                <ScrollToTop />
                            </>
                        )}
                    </>
                } />
                <Route path="/about-us" element={
                    <>
                        {!isAdminRoute && (
                            <>
                                <TopBar />
                                <TopNavbar />
                            </>
                        )}
                        <AboutPage onContactClick={openModal} />
                        {!isAdminRoute && (
                            <>
                                <Footer />
                                <FloatingActionMenu onContactClick={openModal} />
                                <ScrollToTop />
                            </>
                        )}
                    </>
                } />
                <Route path="/products" element={
                    <>
                        {!isAdminRoute && (
                            <>
                                <TopBar />
                                <TopNavbar />
                            </>
                        )}
                        <ProductsPage onContactClick={openModal} />
                        {!isAdminRoute && (
                            <>
                                <Footer />
                                <FloatingActionMenu onContactClick={openModal} />
                                <ScrollToTop />
                            </>
                        )}
                    </>
                } />

                {/* Auth routes without header and footer */}
                <Route path="/admin/login" element={<AuthPage />} />
                <Route path="/admin/create" element={<AuthPage />} />

                {/* Protected routes */}
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/user/dashboard" element={
                    <ProtectedRoute>
                        <UserDashboard />
                    </ProtectedRoute>
                } />

                {/* 404 route */}
                <Route path="*" element={
                    <>
                        {!isAdminRoute && (
                            <>
                                <TopBar />
                                <TopNavbar />
                            </>
                        )}
                        <NotFoundPage />
                        {!isAdminRoute && (
                            <>
                                <Footer />
                                <FloatingActionMenu onContactClick={openModal} />
                                <ScrollToTop />
                            </>
                        )}
                    </>
                } />
            </Routes>

            {/* 3. Render the Modal at the AppContent root level */}
            {modalOpen && <ContactFormModal isOpen={modalOpen} onClose={closeModal} />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider> {/* Wrap the entire app with AuthProvider */}
            <Router>
                <Suspense fallback={<LoadingSpinner />}>
                    <AppContent />
                </Suspense>
            </Router>
        </AuthProvider>
    );
}

export default App;
