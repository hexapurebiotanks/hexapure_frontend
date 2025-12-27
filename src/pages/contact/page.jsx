// page.jsx
import React, { Suspense, lazy } from 'react';

// Keep hero section non-lazy as it's above the fold
import ContactHeroBanner from "./components/HeroBanner.jsx";

// Lazy load components below the fold
const ContactInfoSection = lazy(() => import("./components/InfoSection.jsx"));
const ContactFormSection = lazy(() => import("./components/ContactFormSection.jsx"));

// Loading component for sections
const SectionLoader = () => (
    <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
);

const ContactPage = () => {
    return (
        <div className="font-sans text-gray-800">

            {/* --- SECTION 1: Hero & Map --- */}

            {/* Hero Banner - Above the fold */}
            <ContactHeroBanner />

            {/* Info & Map Container - Below the fold */}
            <Suspense fallback={<SectionLoader />}>
                <ContactInfoSection />
            </Suspense>

            {/* --- SECTION 2: Form Section - Below the fold --- */}
            <Suspense fallback={<SectionLoader />}>
                <ContactFormSection />
            </Suspense>

        </div>
    );
};

export default ContactPage;
