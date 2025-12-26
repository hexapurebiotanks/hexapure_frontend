import React from "react";
// 1. Import motion from framer-motion
import { motion } from "framer-motion";

const ProductsHero = () => {
    // 2. Define animation variants for the main card container (Copied from SolutionsHero.jsx)
    const cardVariants = {
        // Initial state: Hidden, pushed down, and starting opacity
        hidden: {
            y: "100%", // Starts below the bottom edge of the container
            opacity: 0,
            scale: 0.95
        },
        // Visible state: Moves to its final overlapping position (translate-y-1/2)
        visible: {
            y: "50%",
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring", // Use a spring for a nice, punchy feel
                stiffness: 100, // Controls the stiffness of the spring
                damping: 20,    // Controls the oscillation
                delay: 0.2,     // Delay the start of the card animation slightly
                when: "beforeChildren" // Important: Animate the card before its children
            }
        }
    };

    // 3. Define animation variants for the text elements (to be staggered)
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
        // Added z-10 to the parent to ensure correct stacking context relative to the page
        <div className="relative h-[400px] w-full z-10">
            {/* Background Image - REPLACED WITH IMG TAG FOR PERFORMANCE */}
            <img
                src="/.netlify/images?url=/images/banner.png&w=1200&fm=webp&q=75"
                width="1200"
                height="400"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Hexapure products banner"
            />

            <div className="absolute inset-0 bg-primary/10 z-10" />

            {/* Container */}
            <div className="max-w-7xl mx-auto h-full relative">
                {/* Card Configuration: We now use motion.div */}
                <motion.div
                    className="absolute bottom-0 translate-y-1/2 left-4 right-4 md:left-6 md:right-auto md:w-auto bg-gradient-to-r from-[#0F5132]/80 to-[#2E8B57]/80 text-white p-8 md:p-12 max-w-xl rounded-l-xl rounded-r-none shadow-xl z-20"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Title - now motion.h1 */}
                    <motion.h1
                        className="text-3xl md:text-4xl font-extrabold mb-2"
                        variants={textVariants}
                    >
                        Products
                    </motion.h1>

                    {/* Subtitle - now motion.p */}
                    <motion.p
                        className="text-xl opacity-90"
                        variants={textVariants}
                    >
                        Eco-Friendly, Innovative Wastewater Solutions
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductsHero;
