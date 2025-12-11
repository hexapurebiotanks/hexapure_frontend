import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopNavbar from "./shared/TopNavbar/TopNavbar.jsx";
import Footer from "./shared/footer/Footer.jsx";
import LandingPage from "./pages/landing/page.jsx";
import SolutionsPage from "./pages/solutions/Page.jsx";
import ContactPage from "./pages/contact/page.jsx";
import TopBar from "./shared/Topbar/Topbar.jsx";
import AboutPage from "./pages/about/page.jsx";
import FloatingActionMenu from "./shared/FloatingActionMenu.jsx";
import ScrollToTop from "./shared/ScrollToTop.jsx";
import ProductsPage from "./pages/products/page.jsx";
import AuthPage from "./pages/auth/auth.jsx";
import NotFoundPage from "./pages/404/page.jsx";
import ContactFormModal from "./modals/ContactFormModal.jsx";
import AdminDashboard from "./pages/dashboard/Dashboard.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import { AuthProvider } from './context/AuthContext.jsx'; // Check this path
import ProtectedRoute from './context/ProtectedRoute.jsx'; // Check this path

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
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
