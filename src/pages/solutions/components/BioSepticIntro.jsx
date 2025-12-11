import React from "react";
// 1. Import motion and useInView from framer-motion
import { motion, useInView } from "framer-motion";

const BioSepticIntro = ({ onContactClick }) => {
    // 2. Create a ref to attach to the section
    const ref = React.useRef(null);

    // 3. Use useInView to detect when the section enters the viewport
    const isInView = useInView(ref, { once: true, amount: 0.3 }); // Only animate once, when 30% of the element is visible

    // 4. Container variant to stagger the children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // Stagger the animation of the children elements by 0.2 seconds
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    // 5. Item variant for individual elements (title, paragraph, button, image)
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        // 6. Attach the ref and use motion.section with the variants
        <motion.section
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="py-20 bg-[#eee] relative overflow-hidden"
        >
            {/* Topographic Background Pattern Simulation - Retaining SVG as requested */}
            <div className="absolute inset-0 opacity-[0.09]"
                 style={{
                     backgroundImage: `url('/images/bg_pattern.png')`, // Texture placeholder
                     backgroundSize: 'cover'
                 }}>
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="black" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Replaced MUI Container/Grid with Tailwind container/grid */}
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Left Content */}
                    <div>
                        {/* Apply itemVariants to individual motion elements */}
                        <motion.h2
                            variants={itemVariants}
                            className="text-text-dark font-extrabold text-3xl md:text-4xl mb-3 leading-tight mt-5"
                        >
                            Bio Septic Tank: Sustainable, Efficient, and Proven.
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-charcoal text-lg mb-6"
                        >
                            Our advanced FRP Bio Septic system is engineered for superior domestic wastewater treatment, reducing pollutants through optimized anaerobic processes.
                        </motion.p>

                        <motion.button
                            variants={itemVariants}
                            onClick={onContactClick}
                            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-md"
                        >
                            Contact Us
                        </motion.button>
                    </div>

                    {/* Right Image */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-background rounded-xl overflow-hidden shadow-xl border border-gray-200"
                    >
                        <img
                            src="/images/overall.jpg"
                            alt="Septic System Diagram"
                            className="w-full h-auto object-cover rounded mix-blend-multiply"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default BioSepticIntro;