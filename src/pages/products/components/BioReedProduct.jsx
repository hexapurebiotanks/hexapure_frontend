// pages/products/components/BioReedProduct.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion, useInView } from "framer-motion";

const BioReedProduct = ({ onContactClick }) => {
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
                staggerChildren: 0.12,
                delayChildren: 0.15,
            },
        },
    };

    // Main item variant with smooth spring animation (natural feel for eco-friendly product)
    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 14,
                duration: 0.6
            },
        },
    };

    // Special variant for natural/elemental feel
    const naturalItemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 12,
                duration: 0.7
            },
        },
    };

    // Button variants with slight bounce
    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 110,
                damping: 15,
            },
        },
    };

    // Container for button group to stagger children
    const buttonContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    // Image hover animation variant (gentle for natural theme)
    const imageHoverVariants = {
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    // Wavy line animation for natural theme
    const waveLineVariants = {
        hidden: { width: 0 },
        visible: {
            width: "100%",
            transition: {
                duration: 0.8,
                ease: "easeInOut",
                delay: 0.3
            }
        }
    };

    return (
        <motion.section
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="py-20 bg-[#f8fafc] relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]"
                 style={{
                     backgroundImage: `url('/images/colorful-abstract-textured-background-design.jpg')`,
                     backgroundSize: 'cover'
                 }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Product Header - Image Right, Content Left (Zig-zag) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Product Title & Description */}
                    <motion.div
                        variants={itemVariants}
                        className="order-2 lg:order-1"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-text-dark font-extrabold text-3xl md:text-4xl mb-6 leading-tight"
                        >
                            BioReed+ Filtration System
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-charcoal text-lg mb-8 leading-relaxed"
                        >
                            A reed bed is a filtration process used with a Hexatreat bioseptic tank system
                            to enhance effluent quality. This natural filtration method uses reed plants
                            to further purify wastewater through biological processes, providing an
                            eco-friendly and efficient tertiary treatment solution.
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
                                className="bg-transparent border-2 border-[#2E8B57] text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-primary"
                                onClick={() => navigate('/solutions')}
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Product Image with natural growth animation */}
                    <motion.div
                        variants={naturalItemVariants}
                        className="order-1 lg:order-2"
                    >
                        <motion.div
                            variants={imageHoverVariants}
                            whileHover="hover"
                            className="bg-background rounded-xl overflow-hidden shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500"
                        >
                            <motion.img
                                initial={{ scale: 1.08, opacity: 0.8 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    duration: 0.9,
                                    ease: "easeOut",
                                    opacity: { duration: 0.6 }
                                }}
                                src="/images/landing_img4.jpeg"
                                alt="BioReed+ Filtration System"
                                className="w-full aspect-video object-cover"
                            />
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
                        A reed bed is a filtration process with product benefits used in conjunction with a hexatreat bioseptic tank system to further enhance the quality of the effluent migrating into a drainage field or surrounding watercourse.
                    </motion.p>
                </motion.div>

                {/* Animated separator line */}
                <motion.div
                    variants={waveLineVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="my-16 relative"
                >
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </motion.div>

                {/* Specifications Section */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8"
                >
                    <motion.h3
                        variants={itemVariants}
                        className="text-2xl font-bold text-text-dark mb-6 text-center"
                    >
                        Bio Reed Specifications
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.4
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex items-center justify-center bg-gray-50 w-11/12 max-w-3xl mx-auto p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
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

export default BioReedProduct;