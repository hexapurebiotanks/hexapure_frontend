// pages/about/components/MissionVision.jsx
import React from "react";
import { motion } from "framer-motion";
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

const MissionVision = () => {
    const cards = [
        {
            icon: <CenterFocusStrongIcon className="w-12 h-12" />,
            title: "Our Mission",
            description: "To provide innovative, sustainable wastewater treatment solutions that protect the environment while delivering exceptional value and performance to our customers through advanced technology and unwavering commitment to quality.",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: <VisibilityIcon className="w-12 h-12" />,
            title: "Our Vision",
            description: "To be the global leader in eco-friendly wastewater treatment, setting new standards for environmental sustainability and technological innovation while creating a cleaner, healthier world for future generations.",
            color: "from-green-500 to-green-600"
        },
        {
            icon: <EnergySavingsLeafIcon className="w-12 h-12" />,
            title: "Our Values",
            description: "Sustainability, Innovation, Quality, and Customer Satisfaction drive everything we do. We believe in creating solutions that not only solve today's challenges but also protect tomorrow's environment.",
            color: "from-[#0F5132] to-[#2E8B57]"
        }
    ];

    // Animation variants for section
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    // Animation for header
    const headerVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        }
    };

    // Animation for cards container
    const cardsContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    // Animation for individual card
    const cardVariants = {
        hidden: {
            y: 60,
            opacity: 0,
            scale: 0.9
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15,
                duration: 0.7
            }
        },
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    // Animation for icon in card
    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
            }
        },
        hover: {
            rotate: 360,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    // Animation for content in card
    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0.4
            }
        }
    };

    // Animation for bottom banner
    const bannerVariants = {
        hidden: {
            y: 80,
            opacity: 0,
            scale: 0.95
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.8,
                duration: 0.8
            }
        },
        hover: {
            scale: 1.01,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    return (
        <motion.section
            className="py-20 bg-[#f8fafc] relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
        >
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={headerVariants}
                >
                    <motion.h2
                        className="text-text-dark font-extrabold text-3xl md:text-4xl mb-4"
                        variants={headerVariants}
                    >
                        Driving <span className="text-primary">Environmental Excellence</span>
                    </motion.h2>
                    <motion.p
                        className="text-charcoal text-lg max-w-2xl mx-auto"
                        variants={headerVariants}
                    >
                        Our commitment to innovation and sustainability shapes everything we do, from product design to customer service.
                    </motion.p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={cardsContainerVariants}
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            {/* Icon */}
                            <motion.div
                                className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${card.color} text-white mb-6`}
                                variants={iconVariants}
                                whileHover="hover"
                            >
                                {card.icon}
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                                className="text-xl font-bold text-text-dark mb-4"
                                variants={contentVariants}
                            >
                                {card.title}
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                                className="text-charcoal leading-relaxed"
                                variants={contentVariants}
                            >
                                {card.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    className="mt-16 text-center"
                    variants={bannerVariants}
                    whileHover="hover"
                >
                    <div className="bg-gradient-to-r from-[#0F5132] to-[#2E8B57] text-white p-8 rounded-2xl shadow-lg">
                        <motion.h3
                            className="text-2xl font-bold mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Why Choose Hexapure?
                        </motion.h3>
                        <motion.p
                            className="text-lg opacity-90 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                        >
                            We combine cutting-edge technology with environmental responsibility to deliver wastewater solutions that are not only effective but also sustainable. Our lifetime warranty and zero-maintenance design ensure peace of mind for years to come.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default MissionVision;