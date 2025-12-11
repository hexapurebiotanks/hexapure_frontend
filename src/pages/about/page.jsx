// pages/about/Page.jsx
import React from 'react';
import AboutHero from "./components/AboutHero.jsx";
import OurStory from "./components/OurStory.jsx";
import MissionVision from "./components/MissionVision.jsx";
import TeamValues from "./components/TeamValues.jsx";

const AboutPage = ({ onContactClick }) => {
    return (
        <div className="font-sans text-gray-800">
            <AboutHero />
            <OurStory />
            <MissionVision />
            <TeamValues onContactClick={onContactClick} />
        </div>
    );
};

export default AboutPage;
