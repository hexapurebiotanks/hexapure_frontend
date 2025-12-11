import React from 'react';

import SolutionsHero from "./components/SolutionsHero.jsx";
import BioSepticIntro from "./components/BioSepticIntro.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import HowItWorks from "./components/HowItWorks.jsx";


const SolutionsPage = ({ onContactClick }) => {
    return (
        <div className="font-sans text-gray-800">
            <SolutionsHero />
            <BioSepticIntro onContactClick = {onContactClick} />
            <ProductDetails />
            <HowItWorks/>
        </div>
    );
};

export default SolutionsPage;