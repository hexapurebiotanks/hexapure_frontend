// pages/products/components/HexapitProduct.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from "framer-motion";

const HexapitProduct = ({ onContactClick }) => {
    const navigate = useNavigate();

    // Setup ref and useInView hook for scroll-triggered animations
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Define animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    // Main item variant with smooth spring animation
    const itemVariants = {
        hidden: { opacity: 0, y: 60, rotateX: 5 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 16,
                duration: 0.5
            },
        },
    };

    // Button variants for staggered entrance
    const buttonVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 130,
                damping: 18,
            },
        },
    };

    // Container for button group to stagger children
    const buttonContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    // Image hover animation variant
    const imageHoverVariants = {
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="py-20 bg-white relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]"
                 style={{
                     backgroundImage: `url('/images/bg_pattern.png')`,
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
                {/* Product Header - Image Left, Content Right (Zig-zag) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Product Image */}
                    <motion.div
                        variants={itemVariants}
                        className="order-1 lg:order-1"
                    >
                        <motion.div
                            variants={imageHoverVariants}
                            whileHover="hover"
                            className="bg-background rounded-xl overflow-hidden shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow duration-500"
                        >
                            <motion.img
                                initial={{ scale: 1.1 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                src="/images/landing_img2.jpeg"
                                alt="Hexapit Filtration System"
                                className="w-full aspect-video object-cover"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Product Title & Description */}
                    <motion.div
                        variants={itemVariants}
                        className="order-2 lg:order-2"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-text-dark font-extrabold text-3xl md:text-4xl mb-6 leading-tight"
                        >
                            Hexapit Filtration System
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-charcoal text-lg mb-8 leading-relaxed"
                        >
                            Hexapit is a percolation pit that functions as a filtration step in wastewater treatment.
                            It serves as an essential tertiary filtration component that enhances the quality of
                            treated water before final discharge or reuse.
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            variants={buttonContainerVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <motion.button
                                variants={buttonVariants}
                                onClick={onContactClick}
                                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
                            >
                                Contact Us
                            </motion.button>
                            <motion.button
                                variants={buttonVariants}
                                className="bg-transparent border-2 border-[#2E8B57] text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => navigate('/solutions')}
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Benefits Section */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                    <motion.h3
                        variants={itemVariants}
                        className="text-2xl font-bold text-gray-800 mb-4"
                    >
                        Product Benefits
                    </motion.h3>

                    <motion.p
                        variants={itemVariants}
                        className="text-charcoal text-lg leading-relaxed"
                    >
                        The egg-shaped percolation pit utilizes FRP for efficient filtration, ensuring treated effluent percolates into soil, reducing groundwater contamination.
                        This design provides robust structural strength for long-term reliability, optimizes underground space, and allows easy, cost-effective installation.
                        The self-cleaning egg shape minimizes maintenance, and FRP's corrosion resistance ensures versatility in various environmental conditions.
                        Beyond functionality, the visually appealing egg shape seamlessly integrates into residential or landscaped areas, emphasizing both form and function.
                    </motion.p>
                </motion.div>

                <hr className="my-16 border-gray-200" />

                {/* Specifications Section */}
                <motion.div
                    variants={itemVariants}
                    className="mb-16"
                >
                    <motion.h3
                        variants={itemVariants}
                        className="text-2xl font-bold text-text-dark mb-6 text-center"
                    >
                        Hexapit Septic Tank Specifications
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.2
                        }}
                        className="flex items-center justify-center bg-gray-50 w-11/12 max-w-3xl mx-auto p-6 rounded-xl shadow-md border border-gray-200"
                    >
                        <img
                            src="/images/Hexatreat-Septic-Tank-Specifications.png"
                            alt="Hexatreat Septic Tank Specifications"
                            className="w-full h-auto max-h-96 object-contain rounded-lg"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default HexapitProduct;