// pages/about/components/AboutHero.jsx
import React from "react";

import { motion } from "framer-motion";

const AboutHero = () => {
   
    const cardVariants = {
        hidden: {
            y: "100%",
            opacity: 0,
            scale: 0.95
        },
        visible: {
            y: "50%",
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2,
                when: "beforeChildren"
            }
        }
    };


    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="relative h-[400px] w-full z-10">
            {/* Background Image - REPLACED WITH IMG TAG FOR PERFORMANCE */}
            <img
                src="/.netlify/images?url=/images/33158-1.webp&w=1200&fm=webp&q=75"
                width="1200"
                height="400"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Hexapure about us banner"
            />

            <div className="absolute inset-0 bg-primary/10 z-10" />

            {/* Container */}
            <div className="max-w-7xl mx-auto h-full relative">
                {/* Card Configuration: 改为 motion.div 并添加动画 */}
                <motion.div
                    className="absolute bottom-0 translate-y-1/2 left-4 right-4 md:left-6 md:right-auto md:w-auto bg-gradient-to-r from-[#0F5132]/70 to-[#2E8B57]/60 text-white p-8 md:p-12 max-w-xl rounded-l-xl rounded-r-none shadow-lg z-20"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Title - 改为 motion.h1 */}
                    <motion.h1
                        className="text-3xl md:text-4xl font-extrabold mb-2"
                        variants={textVariants}
                    >
                        About Us
                    </motion.h1>

                    {/* Subtitle - 改为 motion.p */}
                    <motion.p
                        className="text-xl opacity-90"
                        variants={textVariants}
                    >
                        Pioneering Sustainable Wastewater Solutions
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutHero;
