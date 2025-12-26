// pages/products/components/AquavaultProduct.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion, useInView } from "framer-motion";

const AquavaultProduct = ({ onContactClick }) => {
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
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.5
            },
        },
    };

    // Button variants for staggered entrance
    const buttonVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 120,
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
                     backgroundImage: `url('/.netlify/images?url=/images/colorful-abstract-textured-background-design.jpg&w=800&fm=webp')`,
                     backgroundSize: 'cover'
                 }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Product Header - Image Right, Content Left (Zig-zag) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Product Title & Description */}
                    <motion.div
                        variants={itemVariants}
                        className="order-2 lg:order-1"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-text-dark font-extrabold text-3xl md:text-4xl mb-6 leading-tight"
                        >
                            Aquavault Storage Tanks
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-charcoal text-lg mb-6 leading-relaxed"
                        >
                            Aquavault's Water and Sewage Storage Tank is meticulously engineered to elevate
                            water treatment and sewage containment to the highest industry standards.
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-charcoal text-lg mb-8 leading-relaxed"
                        >
                            Efficient, dual-function storage for water and sewage. Compact, durable, and versatile -
                            designed to meet all your storage needs with reliability and efficiency.
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            variants={buttonContainerVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <motion.button
                                variants={buttonVariants}
                                onClick={onContactClick}
                                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Contact Us
                            </motion.button>
                            <motion.button
                                variants={buttonVariants}
                                className="bg-transparent border-2 border-[#2E8B57] text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => navigate('/solutions')}
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Product Image */}
                    <motion.div
                        variants={itemVariants}
                        className="order-1 lg:order-2"
                    >
                        <div className="bg-background rounded-xl overflow-hidden shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow duration-500">
                            <motion.img
                                initial={{ scale: 1.05 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                src="/.netlify/images?url=/images/landing_img3.jpeg&w=800&fm=webp"
                                srcSet="/.netlify/images?url=/images/landing_img3.jpeg&w=400&fm=webp 400w, /.netlify/images?url=/images/landing_img3.jpeg&w=800&fm=webp 800w, /.netlify/images?url=/images/landing_img3.jpeg&w=1200&fm=webp 1200w"
                                sizes="(max-width: 768px) 90vw, 50vw"
                                alt="Aquavault Storage Tanks"
                                loading="lazy"
                                width="800"
                                height="450"
                                className="w-full aspect-video object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Benefits Section */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
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
                        Efficient, dual-function storage for water and sewage. Compact, durable, and versatile with easy installation.
                        Ensures clean water quality, effective sewage containment, and environmental sustainability.
                        Cost-effective and compliant with industry standards.
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
                        Aquavault Specifications
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex items-center justify-center bg-gray-50 w-11/12 max-w-3xl mx-auto p-4 rounded-lg shadow-md"
                    >
                        <img
                            src="/.netlify/images?url=/images/Hexatreat-Septic-Tank-Specifications.png&w=800&fm=webp"
                            alt="Hexatreat Septic Tank Specifications"
                            loading="lazy"
                            width="800"
                            height="600"
                            className="w-full h-auto max-h-96 object-contain rounded"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AquavaultProduct;
