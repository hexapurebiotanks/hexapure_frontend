import HeroSection from "./components/Hero.jsx"
import WhoWeAre from "./components/WhoWeAre.jsx";
import Products from "./components/Products.jsx";
import CoreValues from "./components/CoreValues.jsx";
import Standards from "./components/Standards.jsx";
import Testimonials from "./components/Testimonials.jsx";

import React from "react";

const  LandingPage = ({onContactClick}) => {

    return(
        <div>
            <HeroSection onContactClick={onContactClick} />
            <WhoWeAre onContactClick={onContactClick} />
            <Products />
            <CoreValues />
            <Standards onContactClick={onContactClick} />
            <Testimonials />
        </div>
    )
}

export default LandingPage;