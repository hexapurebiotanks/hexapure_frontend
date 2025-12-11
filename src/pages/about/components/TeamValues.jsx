// pages/about/components/TeamValues.jsx
import React from "react";
import { motion } from "framer-motion";
import GroupsIcon from '@mui/icons-material/Groups';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ScienceIcon from '@mui/icons-material/Science';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const TeamValues = ({ onContactClick }) => {
    const values = [
        {
            icon: <GroupsIcon className="w-8 h-8" />,
            title: "Expert Team",
            description: "Our team comprises experienced environmental engineers, microbiologists, and wastewater treatment specialists dedicated to innovation and excellence."
        },
        {
            icon: <EngineeringIcon className="w-8 h-8" />,
            title: "Advanced Technology",
            description: "We continuously invest in R&D to stay at the forefront of wastewater treatment technology and biological processes."
        },
        {
            icon: <ScienceIcon className="w-8 h-8" />,
            title: "Quality Assurance",
            description: "Every product undergoes rigorous testing to ensure it meets the highest standards of performance and durability."
        },
        {
            icon: <EmojiEventsIcon className="w-8 h-8" />,
            title: "Proven Results",
            description: "With thousands of successful installations, our track record speaks for itself in delivering reliable, efficient solutions."
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

    // Animation for left content container
    const leftContentVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
            }
        }
    };

    // Animation for right content container
    const rightContentVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8,
                delay: 0.2
            }
        },
        hover: {
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    // Animation for title
    const titleVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12,
                duration: 0.6
            }
        }
    };

    // Animation for description text
    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0.2
            }
        }
    };

    // Animation for values container
    const valuesContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4
            }
        }
    };

    // Animation for individual value item
    const valueItemVariants = {
        hidden: {
            x: -30,
            opacity: 0,
            scale: 0.9
        },
        visible: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                duration: 0.6
            }
        },
        hover: {
            x: 10,
            backgroundColor: "#f0fdf4",
            borderColor: "#dcfce7",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    // Animation for value icon
    const iconVariants = {
        hidden: { scale: 0, rotate: -90 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
            }
        },
        hover: {
            rotate: 360,
            scale: 1.1,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    // Animation for button
    const buttonVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.8,
                duration: 0.6
            }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(15, 81, 50, 0.3)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 20
            }
        },
        tap: {
            scale: 0.98
        }
    };

    // Animation for promise list container
    const promiseContainerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.7,
                delay: 0.3
            }
        }
    };

    // Animation for promise list items
    const promiseItemVariants = {
        hidden: { x: 30, opacity: 0 },
        visible: (custom) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.5 + custom * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 12
            }
        }),
        hover: {
            x: 5,
            transition: {
                type: "spring",
                stiffness: 400
            }
        }
    };

    // Animation for promise title
    const promiseTitleVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                delay: 0.4
            }
        }
    };

    // Animation for dot in promise list
    const dotVariants = {
        hidden: { scale: 0 },
        visible: (custom) => ({
            scale: 1,
            transition: {
                delay: 0.6 + custom * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        }),
        hover: {
            scale: 1.5,
            backgroundColor: "#ffffff",
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <motion.section
            className="py-20 bg-white relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                 style={{
                     backgroundImage: `url('/images/bg_pattern.png')`,
                     backgroundSize: 'cover'
                 }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        variants={leftContentVariants}
                    >
                        <motion.h2
                            className="text-text-dark font-extrabold text-3xl md:text-4xl mb-6 leading-tight"
                            variants={titleVariants}
                        >
                            Our <span className="text-primary">Expertise</span> & <span className="text-primary">Commitment</span>
                        </motion.h2>

                        <motion.p
                            className="text-charcoal text-lg mb-8 leading-relaxed"
                            variants={textVariants}
                        >
                            At Hexapure, we believe that great solutions come from great people. Our team's expertise in environmental engineering and biological wastewater treatment ensures that every product we deliver meets the highest standards of quality and performance.
                        </motion.p>

                        {/* Values Grid */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                            variants={valuesContainerVariants}
                        >
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100"
                                    variants={valueItemVariants}
                                    whileHover="hover"
                                >
                                    <motion.div
                                        className="bg-primary text-white p-2 rounded-lg shrink-0"
                                        variants={iconVariants}
                                        whileHover="hover"
                                    >
                                        {value.icon}
                                    </motion.div>
                                    <div>
                                        <h4 className="font-bold text-text-dark mb-2">{value.title}</h4>
                                        <p className="text-sm text-charcoal">{value.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            className="mt-8"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <button
                                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-md"
                                onClick={onContactClick}
                            >
                                Get In Touch With Our Experts
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        variants={rightContentVariants}
                        whileHover="hover"
                    >
                        <div
                            className="bg-gradient-to-br from-[#0F5132] to-[#2E8B57] rounded-2xl text-white shadow-2xl p-8 max-w-md mx-auto">
                            <div className="text-center">
                                <motion.h3
                                    className="text-3xl font-extrabold mb-8 border-b border-white/50 pb-3 inline-block"
                                    variants={promiseTitleVariants}
                                >
                                    Our Promise
                                </motion.h3>

                                <motion.ul
                                    className="space-y-4 text-left mx-auto"
                                    variants={promiseContainerVariants}
                                >
                                    {[
                                        "Lifetime warranty on all our products",
                                        "98%+ pollution removal efficiency",
                                        "Zero maintenance requirements",
                                        "Eco-friendly and sustainable solutions",
                                        "Quick one-day installation",
                                        "100% FRP corrosion-resistant construction"
                                    ].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            className="flex items-start gap-4"
                                            variants={promiseItemVariants}
                                            custom={index}
                                            whileHover="hover"
                                        >
                                            <motion.div
                                                className="mt-2 w-3 h-3 bg-white rounded-full flex-shrink-0"
                                                variants={dotVariants}
                                                custom={index}
                                                whileHover="hover"
                                            />
                                            <p className="text-lg font-medium leading-relaxed">
                                                {item}
                                            </p>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default TeamValues;