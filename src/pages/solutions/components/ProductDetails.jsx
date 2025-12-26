import React from "react";
// Import motion and useInView
import { motion, useInView } from "framer-motion";

// Material UI Icons (Retained as requested)
import SpaIcon from '@mui/icons-material/Spa';
import GppGoodIcon from '@mui/icons-material/GppGood';
import HexagonIcon from '@mui/icons-material/Hexagon';

const ProductDetails = () => {
    // Setup ref and inView hook
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 }); // Animate when 20% visible

    const features = [
        "Versatile design with burial site serving as parking or garden space",
        "100% FRP system for durability, lightweight, and corrosion resistance",
        "No civil construction for fast, cost-effective installation",
        "Minimal excavation for environmental friendliness",
        "Available in modular units for increased capacity",
        "Advanced odour control for smell elimination",
        "Eco-friendly materials for sustainability",
        "Zero maintenance for low lifetime costs",
        "Long lifespan for reliability",
        "Quick one-day installation to minimize disruption"
    ];

    // 1. Updated fadeSlideUp to use a Spring transition for smoother main elements
    const fadeSlideUp = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70, // Lower stiffness for a softer, more floating feel
                damping: 15,
            },
        },
    };

    // Container variant to stagger the children
    const rightContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    // 2. Updated featureItemVariant to use a Spring transition for smooth list items
    const featureItemVariant = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100, // A bit more snappy for the smaller list items
                damping: 20,
            }
        },
    };


    return (
        // Attach ref and control animation state with isInView
        <motion.section
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="py-20 bg-[#fcfcfc] relative"
        >
            <div className="absolute inset-0 opacity-[0.09]"
                 style={{
                    backgroundImage: `url('/.netlify/images?url=/images/colorful-abstract-textured-background-design.jpg&w=800&fm=webp')`, // Texture placeholder
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

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

                    {/* Left Side: Tank Diagram (Now uses Spring) */}
                    <motion.div
                        variants={fadeSlideUp}
                        className="delay-100"
                    >
                        <div className="relative">
                            <div
                                className="border border-gray-200 rounded-xl overflow-hidden shadow-xl"
                            >
                                <img
                                    src="/.netlify/images?url=/images/hexapure_features.png&w=800&fm=webp"
                                    srcSet="/.netlify/images?url=/images/hexapure_features.png&w=400&fm=webp 400w, /.netlify/images?url=/images/hexapure_features.png&w=800&fm=webp 800w, /.netlify/images?url=/images/hexapure_features.png&w=1200&fm=webp 1200w"
                                    sizes="(max-width: 768px) 90vw, 50vw"
                                    alt="Hexapure Features"
                                    loading="lazy"
                                    width="800"
                                    height="600"
                                    className="w-full h-auto object-cover "
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Features List */}
                    <motion.div
                        variants={rightContainerVariants}
                    >
                        {/* Title (Now uses Spring) */}
                        <motion.h3
                            variants={fadeSlideUp}
                            className="text-text-dark font-extrabold text-3xl md:text-4xl mb-8 leading-tight"
                        >
                            Advanced Technical Features
                        </motion.h3>

                        {/* Differentiators Grid (Now uses Spring) */}
                        <motion.div
                            variants={fadeSlideUp}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                        >
                            <div className="p-4 bg-background rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex gap-4 items-start">
                                    <GppGoodIcon className="text-primary w-8 h-8 mt-1 shrink-0" />
                                    <div>
                                        <h6 className="text-text-dark font-bold text-lg mb-2">
                                            Superior Quality
                                        </h6>
                                        <p className="text-charcoal text-sm">
                                            100% FRP, long-lifespan, and zero maintenance requirements.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-background rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex gap-4 items-start">
                                    <SpaIcon className="text-primary w-8 h-8 mt-1 shrink-0" />
                                    <div>
                                        <h6 className="text-text-dark font-bold text-lg mb-2">
                                            Innovative Design
                                        </h6>
                                        <p className="text-charcoal text-sm">
                                            Unique 6-chamber baffle system and advanced odour control.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Value Proposition Section (Now uses Spring) */}
                        <motion.div
                            variants={fadeSlideUp}
                            className="mt-8 pt-6 border-t border-gray-200"
                        >
                            <motion.h6
                                variants={featureItemVariant}
                                className="text-primary font-bold text-xl mb-4"
                            >
                                Value Proposition
                            </motion.h6>

                            {/* Feature List (2 columns) - Individual list items now use Spring */}
                            <motion.ul
                                className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6"
                                variants={rightContainerVariants}
                            >
                                {features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        variants={featureItemVariant} // Now uses Spring transition
                                        className="flex items-start gap-3"
                                    >
                                        <HexagonIcon className="text-primary w-4 h-4 shrink-0 mt-1" />
                                        <p className="text-charcoal text-sm">
                                            {feature}
                                        </p>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default ProductDetails;
