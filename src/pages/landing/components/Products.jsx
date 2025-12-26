import React from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Products = () => {
    const navigate = useNavigate();
    const products = [
        { title: "Hexapure Bio Septic tank", desc: "The 6-Chamber Design: Unleash Cleaner Water, Reduce Waste, and Embrace Nature", img: "/images/landing_img1.jpeg" },
        { title: "Hexapit", desc: "Rethink Recharge: Unlocking Nature's Secrets with the Hexapit.", img: "/images/landing_img2.jpeg" },
        { title: "Aquavault", desc: "Sustainable Water Storage Solutions: Preserving water and treated septic resources.", img: "/images/landing_img3.jpeg" },
        { title: "BioReed+", desc: "Nature's Filter: Reed Beds Beyond Tertiary Treatment", img: "/images/landing_img4.jpeg" },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const headerVariants = {
        hidden: { y: -50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
            }
        }
    };

    const productVariants = {
        hidden: { y: 100, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            }
        }
    };

    const imageVariants = {
        hidden: { scale: 1 },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(31, 90, 54, 0.3)",
            transition: {
                duration: 0.2
            }
        },
        tap: { scale: 0.95 }
    };

    return (
        // Main Section: Background image is applied here
        <motion.section
            className="py-20 bg-background relative overflow-hidden"
            style={{
                backgroundImage: `url('/.netlify/images?url=/images/Tank-line-diagram-e1702289598280.png&w=1200&fm=webp')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* FIX: New overlay using bg-black/5 for a subtle darkening effect. */}
            <motion.div
                className="absolute inset-0 bg-[#F2F2F2]/95 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* --- Section Header --- */}
                <motion.div
                    className="text-center mb-16"
                    variants={headerVariants}
                >
                    <motion.p
                        className="text-primary text-lg font-bold mb-3 tracking-wider"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Our Products
                    </motion.p>
                    <motion.h2
                        className="text-primary font-extrabold text-4xl md:text-5xl leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                        }}
                    >
                        Innovative Eco-Friendly <br className="hidden sm:inline"/> Wastewater Solutions
                    </motion.h2>
                </motion.div>

                {/* --- Products Grid --- */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                >
                    {products.map((prod, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg
                                       hover:shadow-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 group"
                            variants={productVariants}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                boxShadow: "0 25px 50px -12px rgba(31, 90, 54, 0.25)",
                                transition: {
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 200
                                }
                            }}
                        >
                            {/* Image Container */}
                            <div className="bg-background h-48 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                                <motion.img
                                    src={`/.netlify/images?url=${prod.img}&w=400&fm=webp`}
                                    srcSet={`/.netlify/images?url=${prod.img}&w=400&fm=webp 400w, /.netlify/images?url=${prod.img}&w=800&fm=webp 800w`}
                                    sizes="(max-width: 768px) 90vw, 400px"
                                    alt={prod.title}
                                    loading="lazy"
                                    width="400"
                                    height="300"
                                    className="max-h-full max-w-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    variants={imageVariants}
                                    initial="hidden"
                                    whileHover="hover"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <motion.h3
                                    className="text-text-dark font-extrabold text-xl mb-2"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {prod.title}
                                </motion.h3>
                                <motion.p
                                    className="text-charcoal text-sm mb-6 flex-grow"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {prod.desc}
                                </motion.p>

                                <motion.button
                                    className="bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-lg text-sm self-start transition-all duration-300"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => navigate('/products')}
                                >
                                    Learn more
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Products Button */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.button
                        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg text-lg transition-all duration-300"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 15px 30px rgba(31, 90, 54, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/products')}
                    >
                        View All Products
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Products;
