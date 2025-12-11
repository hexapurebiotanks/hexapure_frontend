import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
    const testimonials = [
        { name: "Frankie Mills", quote: "Hexapure's innovation transformed our wastewater treatment, ensuring quality, reliability, and a sustainable future." },
        { name: "Lydia Morris", quote: "Impressed with Hexapure's integrity, their eco-friendly products exceeded expectations. Exceptional customer satisfaction." },
        { name: "Scarlett Jackson", quote: "Hexapure delivers on its promises - innovative, top-quality solutions. Their commitment to sustainability sets them apart." }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2
            }
        }
    };

    const backgroundVariants = {
        hidden: { scale: 1 },
        visible: {
            scale: 1.05,
            transition: {
                duration: 15,
                ease: "linear"
            }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8
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

    const testimonialCardVariants = {
        hidden: { y: 80, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 12
            }
        },
        hover: {
            y: -15,
            scale: 1.03,
            boxShadow: "0 30px 60px -12px rgba(31, 90, 54, 0.3)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        }
    };

    const quoteVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.1
            }
        }
    };

    const avatarVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: 0.3
            }
        },
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        // Main Section: py-20 for vertical padding, relative for positioning children
        <motion.section
            className="py-20 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Green Background Image Overlay with subtle zoom */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef38ec?auto=format&fit=crop&q=80&w=1600')`
                }}
                variants={backgroundVariants}
            ></motion.div>

            {/* Dark Green Overlay for contrast and readability */}
            <motion.div
                className="absolute inset-0 bg-green-900/70"
                variants={overlayVariants}
            />

            {/* Content Wrapper (Replaced MUI Container) */}
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Header (Replaced MUI Typography) */}
                <motion.div
                    className="text-center text-white mb-12"
                    variants={headerVariants}
                >
                    <motion.p
                        className="text-lg opacity-80 mb-2 uppercase tracking-wider"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Testimonial
                    </motion.p>
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
                    >
                        Customer Stories: Trusted Solutions.
                    </motion.h2>
                </motion.div>

                {/* Testimonial Grid (Replaced MUI Grid) */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {testimonials.map((test, i) => (
                        // Testimonial Card
                        <motion.div
                            key={i}
                            className="col-span-1"
                            variants={testimonialCardVariants}
                            whileHover="hover"
                        >
                            <div className="bg-white p-8 rounded-lg text-center h-full flex flex-col items-center shadow-2xl transition-all duration-300 hover:shadow-primary/50">
                                {/* Quote (Replaced MUI Typography) */}
                                <motion.p
                                    className="text-gray-600 text-base italic mb-6 flex-grow"
                                    variants={quoteVariants}
                                    whileHover={{ color: "#1F5A36" }}
                                >
                                    {test.quote}
                                </motion.p>

                                {/* Author Info */}
                                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100 w-full justify-center">
                                    <motion.div
                                        className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden shrink-0"
                                        variants={avatarVariants}
                                        whileHover="hover"
                                    >
                                        <img
                                            src={`https://i.pravatar.cc/150?img=${i + 10}`}
                                            alt={test.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    {/* Name (Replaced MUI Typography) */}
                                    <motion.p
                                        className="text-primary font-bold text-sm"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {test.name}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>


            </div>
        </motion.section>
    );
};

export default Testimonials;