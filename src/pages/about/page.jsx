// pages/about/Page.jsx
import React, { Suspense, lazy } from 'react';

// Keep hero section non-lazy as it's above the fold
import AboutHero from "./components/AboutHero.jsx";

// Lazy load components below the fold
const OurStory = lazy(() => import("./components/OurStory.jsx"));
const MissionVision = lazy(() => import("./components/MissionVision.jsx"));
const TeamValues = lazy(() => import("./components/TeamValues.jsx"));

// Loading component for sections
const SectionLoader = () => (
    <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
);

const AboutPage = ({ onContactClick }) => {
    return (
        <div className="font-sans text-gray-800">
            <AboutHero />

            {/* Lazy load components below the fold */}
            <Suspense fallback={<SectionLoader />}>
                <OurStory />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <MissionVision />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <TeamValues onContactClick={onContactClick} />
            </Suspense>
        </div>
    );
};

export default AboutPage;
