import React from "react";
import { motion } from "framer-motion";
// Imports required for the moved floating icons
import SpaIcon from '@mui/icons-material/Spa';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AssessmentIcon from '@mui/icons-material/Assessment';

const WhoWeAre = ({onContactClick}) => {
    // Features array copied from Hero.jsx
    const features = [
        {
            label: "Innovation",
            icon: <SpaIcon className="text-primary w-7 h-7 md:w-9 md:h-9" />
        },
        {
            label: "Quality",
            icon: <WaterDropIcon className="text-primary w-7 h-7 md:w-9 md:h-9" />
        },
        {
            label: "Environmentalism",
            icon: <HourglassEmptyIcon className="text-primary w-7 h-7 md:w-9 md:h-9" />
        },
        {
            label: "Integrity",
            icon: <AssessmentIcon className="text-primary w-7 h-7 md:w-9 md:h-9" />
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const iconVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const textVariants = {
        hidden: { x: -30, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const imageVariants = {
        hidden: { x: 30, opacity: 0, scale: 0.95 },
        visible: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 15,
                delay: 0.2
            }
        }
    };

    const badgeVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                delay: 0.8
            }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const leftCardVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 15,
                delay: 0.2
            }
        }
    };

    const rightCardVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 15,
                delay: 0.3
            }
        }
    };

    return (

        <motion.section
            className="pb-16 bg-background relative overflow-visible z-30"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
        
            <img
                src="/.netlify/images?url=/images/bg_pattern.png&w=800&fm=webp&q=75"
                width="800"
                height="600"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.03]"
                alt="Background pattern"
            />
            <div className="max-w-6xl mx-auto px-4">
                {/* --- Floating Icons (NEW LOCATION) --- */}
                <motion.div
                    className="-mt-0 md:-mt-10 mb-16 relative z-50"
                    variants={containerVariants}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-4 px-2">
                            {features.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center group text-center -mt-9"
                                    variants={iconVariants}
                                    whileHover={{
                                        y: -10,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {/* Icon Wrapper */}
                                    <motion.div
                                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white shadow-xl flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 border border-gray-100"
                                        whileHover={{
                                            scale: 1.1,
                                            boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                                        }}
                                    >
                                        <motion.div
                                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background flex items-center justify-center shadow-inner"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                    </motion.div>

                                    {/* Label */}
                                    <motion.p
                                        className="text-text-dark mt-3 font-bold
                                                   text-sm sm:text-base whitespace-nowrap"
                                        whileHover={{ color: "#1F5A36" }}
                                    >
                                        {item.label}
                                    </motion.p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Main Content starts here */}
                <div className="flex flex-col lg:flex-row gap-12 mb-16">
                    {/* Left Text Content */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        variants={textVariants}
                    >
                        <motion.p
                            className="text-primary font-bold text-lg mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Who we are
                        </motion.p>
                        <motion.h2
                            className="text-text-dark font-bold text-3xl md:text-4xl mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Innovators in Quality Wastewater Solutions Pioneering Quality Wastewater Solutions through Innovative Bio Septic Tanks
                        </motion.h2>
                        <motion.p
                            className="text-charcoal text-base mb-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Dedicated to environmental responsibility, integrity, and customer satisfaction, we specialize in cutting-edge wastewater treatment technology, ensuring sustainable and efficient solutions.
                        </motion.p>
                        <motion.button
                            onClick={onContactClick}
                            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg mt-4"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 25px rgba(31, 90, 54, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Us
                        </motion.button>
                    </motion.div>

                    {/* Right Image Content */}
                    <motion.div
                        className="w-full lg:w-1/2 relative"
                        variants={imageVariants}
                    >
                        <div>
                            <motion.div
                                className="bg-white rounded-xl shadow-lg text-center overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img
                                    src="/.netlify/images?url=/images/aboutus_img_hexapure.webp&w=800&fm=webp"
                                    srcSet="/.netlify/images?url=/images/aboutus_img_hexapure.webp&w=400&fm=webp 400w, /.netlify/images?url=/images/aboutus_img_hexapure.webp&w=800&fm=webp 800w, /.netlify/images?url=/images/aboutus_img_hexapure.webp&w=1200&fm=webp 1200w"
                                    sizes="(max-width: 768px) 90vw, 50vw"
                                    alt="Tanks"
                                    loading="lazy"
                                    width="800"
                                    height="600"
                                    className="rounded-xl w-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.div>
                            {/* Floating Badge */}
                            <motion.div
                                className="absolute top-[-16px] right-[-16px] md:top-[-20px] md:right-[-20px] lg:top-[-20px] lg:right-[-20px] bg-white rounded-full w-20 h-20 md:w-24 md:h-24 lg:w-25 lg:h-25 flex flex-col items-center justify-center shadow-xl border border-gray-100 z-10 "
                                variants={badgeVariants}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <span className="text-text-dark font-bold text-sm md:text-lx lg:text-2xl">9+</span>
                                <span className="text-[10px] md:text-[12px] text-gray-900 font-medium text-center leading-tight">Years Of<br/>Experience</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* History and Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <motion.div
                        className="bg-primary from-primary-dark to-accent text-white p-8 rounded-lg"
                        variants={leftCardVariants}
                        whileHover={{
                            y: -10,
                            boxShadow: "0 20px 40px rgba(31, 90, 54, 0.3)"
                        }}
                    >
                        <motion.h3
                            className="font-bold text-xl mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Our History
                        </motion.h3>
                        <motion.p
                            className="opacity-90 leading-relaxed text-sm"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Hexapure was founded in 2015 with the vision of revolutionizing the wastewater treatment industry. We are renowned player in the composite materials sector, Hexapure has inherited a legacy of innovation and excellence.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="bg-white border border-primary p-8 rounded-lg shadow-sm"
                        variants={rightCardVariants}
                        whileHover={{
                            y: -10,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                        }}
                    >
                        <motion.h3
                            className="font-bold text-xl text-text-dark mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Our Mission
                        </motion.h3>
                        <motion.p
                            className="text-charcoal leading-relaxed text-sm"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            "At Hexapure, our mission is to provide sustainable and advanced solutions for wastewater treatment, setting new standards for environmental responsibility. We aim to contribute to a cleaner and healthier planet by offering cutting-edge FRP tanks and components."
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default WhoWeAre;
