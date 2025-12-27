import React, { Suspense, lazy } from 'react';

// Keep hero section non-lazy as it's above the fold
import SolutionsHero from "./components/SolutionsHero.jsx";

// Lazy load components below the fold
const BioSepticIntro = lazy(() => import("./components/BioSepticIntro.jsx"));
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"));
const HowItWorks = lazy(() => import("./components/HowItWorks.jsx"));

// Loading component for sections
const SectionLoader = () => (
    <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
);

const SolutionsPage = ({ onContactClick }) => {
    return (
        <div className="font-sans text-gray-800">
            <SolutionsHero />

            {/* Lazy load components below the fold */}
            <Suspense fallback={<SectionLoader />}>
                <BioSepticIntro onContactClick={onContactClick} />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <ProductDetails />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <HowItWorks />
            </Suspense>
        </div>
    );
};

export default SolutionsPage;
