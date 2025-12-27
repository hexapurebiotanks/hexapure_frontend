import React, { Suspense, lazy } from "react";

// Keep HeroSection non-lazy as it's above the fold and critical for LCP
import HeroSection from "./components/Hero.jsx";

// Lazy load components below the fold for better performance
const WhoWeAre = lazy(() => import("./components/WhoWeAre.jsx"));
const Products = lazy(() => import("./components/Products.jsx"));
const CoreValues = lazy(() => import("./components/CoreValues.jsx"));
const Standards = lazy(() => import("./components/Standards.jsx"));
const Testimonials = lazy(() => import("./components/Testimonials.jsx"));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
    <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
);

const LandingPage = ({onContactClick}) => {
    return(
        <div>
            {/* Above the fold - load immediately */}
            <HeroSection onContactClick={onContactClick} />

            {/* Below the fold - lazy load with Suspense */}
            <Suspense fallback={<SectionLoader />}>
                <WhoWeAre onContactClick={onContactClick} />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Products />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <CoreValues />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Standards onContactClick={onContactClick} />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
                <Testimonials />
            </Suspense>
        </div>
    )
}

export default LandingPage;
