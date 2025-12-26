import React from "react";
// 1. Import motion from framer-motion
import { motion } from "framer-motion";

const SolutionsHero = () => {

    // 2. Define animation variants for the main card container
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
        <div className="relative h-[400px] w-full z-10">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/.netlify/images?url=/images/banner2.png&w=1200&fm=webp')`
                }}
            />

            <div className="absolute inset-0 bg-primary/10 z-10" />

            {/* Container */}
            <div className="max-w-7xl mx-auto h-full relative">

                {/* 4. Use motion.div for the card container */}
                <motion.div
                    className="absolute bottom-0 left-4 right-4 md:left-6 md:right-auto md:w-auto bg-gradient-to-r from-[#0F5132]/60 to-[#2E8B57]/60 text-white p-8 md:p-12 max-w-xl rounded-l-xl rounded-r-none shadow-lg z-20"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* 5. Use motion.h1 and motion.p for the text elements
                        The staggerChildren property in the parent (cardVariants)
                        will ensure these animate sequentially. */}
                    <motion.h1
                        className="text-3xl md:text-4xl font-extrabold mb-2"
                        variants={textVariants}
                    >
                        Solutions
                    </motion.h1>

                    <motion.p
                        className="text-xl opacity-90"
                        variants={textVariants}
                    >
                        Cutting-edge wastewater treatment solutions.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default SolutionsHero;
