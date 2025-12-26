import React from "react";
import { motion } from "framer-motion";
// Only the icon is imported from MUI
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Standards = ({onContactClick}) => {

    const features = [
        "Multi-functional design: Tank burial site can double as vehicle parking or gardening space.",
        "100% FRP system: Durable, lightweight, and corrosion-resistant.",
        "No civil construction: Fast, cost-effective installation",
        "Minimal excavation: Environmentally friendly",
        "Advanced odour control: Eliminates smells",
        "Eco-friendly materials: Sustainable",
        "Zero maintenance: Low lifetime costs",
        "Long Lifespan: Reliable",
        "Simple one-day installation: Minimizes disruption"
    ];

    // Animation variants
    const parallaxVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            backgroundColor: "#ffffff",
            color: "#1F5A36",
            borderColor: "#1F5A36",
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const listContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const listItemVariants = {
        hidden: { x: -30, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 12
            }
        },
        hover: {
            x: 10,
            backgroundColor: "#f8f9fa",
            boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -90 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 12
            }
        },
        hover: {
            rotate: 360,
            scale: 1.2,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section>
            {/* 1. Parallax-like Top Section (CTA) */}
            <motion.div
                className="relative py-12 md:py-20 overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Background Image - REPLACED WITH IMG TAG FOR PERFORMANCE */}
                <img
                    src="/.netlify/images?url=/images/standardbg1.png&w=1200&fm=webp&q=75"
                    width="1200"
                    height="400"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Hexapure standards background"
                />
                {/* Dark Overlay with subtle texture */}
                <motion.div
                    className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
                    variants={overlayVariants}
                />

                {/* Content Container */}
                <motion.div
                    className="max-w-xl mx-auto px-4 relative z-10 text-center text-white"
                    variants={parallaxVariants}
                >
                    <motion.h2
                        className="text-2xl md:text-3xl font-extrabold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        We meet and exceed industry standards
                    </motion.h2>

                    <motion.p
                        className="text-base mb-6 opacity-90"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Our FRP-based systems exceed industry standards, with a lifespan of over 30 years. Treated effluent consistently meets or exceeds specifications.
                    </motion.p>

                    <motion.button
                        onClick={onContactClick}
                        className="border-2 border-white text-white font-semibold px-6 py-2.5 rounded transition-colors duration-300
                                   hover:bg-white hover:text-text-dark hover:border-text-dark text-sm"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Contact Now
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* 2. Features List */}
            <motion.div
                className="py-12 md:py-16 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* Content Container */}
                <div className="max-w-5xl mx-auto px-4">
                    {/* Reduced margin: mb-8 */}
                    <motion.div
                        className="text-center mb-8"
                        variants={headerVariants}
                    >
                        <motion.p
                            className="text-primary font-semibold text-base mb-1 uppercase tracking-wider"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Unleash the Power of Our Bio Septic Tank
                        </motion.p>

                        <motion.h3
                            className="text-text-dark font-bold text-2xl md:text-3xl"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 90 }}
                        >
                            Our Bio Septic tank offers
                        </motion.h3>
                    </motion.div>

                    {/* List Container */}
                    <div className="flex justify-center">
                        {/* Narrowed max width for list */}
                        <div className="w-full md:w-10/12 lg:w-9/12">
                            {/* Reduced list item spacing: space-y-3 */}
                            <motion.ul
                                className="space-y-3"
                                variants={listContainerVariants}
                            >
                                {features.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-3 p-3 bg-background/50 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:bg-background cursor-pointer"
                                        variants={listItemVariants}
                                        whileHover="hover"
                                    >
                                        {/* Icon: w-4 h-4 for smaller size */}
                                        <motion.div
                                            variants={iconVariants}
                                            whileHover="hover"
                                        >
                                            <CheckCircleIcon className="text-primary w-4 h-4 shrink-0 mt-[3px]" />
                                        </motion.div>

                                        <span className="text-text-dark text-sm font-medium">{item}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </div>


                </div>
            </motion.div>
        </section>
    );
};

export default Standards;
