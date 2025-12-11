// page.jsx
import React from 'react';
import ContactHeroBanner from "./components/HeroBanner.jsx";
import ContactInfoSection from "./components/InfoSection.jsx";
import ContactFormSection from "./components/ContactFormSection.jsx"; // Import the new component

const ContactPage = () => {
    return (
        <div className="font-sans text-gray-800">

            {/* --- SECTION 1: Hero & Map --- */}

            {/* Hero Banner */}
            <ContactHeroBanner />

            {/* Info & Map Container */}
            <ContactInfoSection />

            {/* --- SECTION 2: Form Section --- */}
            <ContactFormSection />

        </div>
    );
};

export default ContactPage;