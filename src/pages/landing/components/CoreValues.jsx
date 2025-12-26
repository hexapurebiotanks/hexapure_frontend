import React from "react";
import { motion } from "framer-motion";
// MUI Icons retained for use
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import GroupsIcon from "@mui/icons-material/Groups";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";

const CoreValues = () => {
    // Define the color classes that correspond to your palette
    // Assuming: text-primary = Green, text-text-dark = Dark text color
    const PRIMARY_COLOR = "text-primary";
    const DARK_TEXT_COLOR = "text-text-dark";

    const values = [
        { icon: <LightbulbIcon sx={{ fontSize: 40 }} className={PRIMARY_COLOR} />, title: "Innovation", desc: "We are committed to continuous innovation, investing in research and development." },
        { icon: <VerifiedUserIcon sx={{ fontSize: 40 }} className={PRIMARY_COLOR} />, title: "Quality", desc: "Hexapure is synonymous with quality. We adhere to the highest standards in manufacturing." },
        { icon: <NaturePeopleIcon sx={{ fontSize: 40 }} className={PRIMARY_COLOR} />, title: "Environmental Responsibility", desc: "We understand the importance of preserving the environment for a sustainable future." },
        { icon: <GroupsIcon sx={{ fontSize: 40 }} className={PRIMARY_COLOR} />, title: "Customer Satisfaction", desc: "Hexapure places customer satisfaction at the core of its business." },
        { icon: <HandshakeIcon sx={{ fontSize: 40 }} className={PRIMARY_COLOR} />, title: "Integrity", desc: "Our business practices are guided by integrity and transparency." },
        { icon: <EmojiNatureIcon sx={{ fontSize: 40 }} className={PRIMARY_COLOR} />, title: "Community Engagement", desc: "Hexapure actively participates in community initiatives related to conservation." },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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

    const valueCardVariants = {
        hidden: { y: 60, opacity: 0, scale: 0.9 },
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
            y: -10,
            scale: 1.03,
            boxShadow: "0 25px 50px -12px rgba(31, 90, 54, 0.2)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        }
    };

    const iconVariants = {
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
            rotate: 360,
            scale: 1.1,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        // Replaced MUI Box/Section with div/section and Tailwind classes
        <section className="py-20 bg-white overflow-hidden relative z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* --- Section Header (Replaced Typography) --- */}
                <motion.div
                    className="text-center mb-16"
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.p
                        className={`text-lg font-bold mb-2 uppercase tracking-wider ${PRIMARY_COLOR}`}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Core Values
                    </motion.p>
                    <motion.h2
                        className={`font-extrabold text-3xl md:text-4xl leading-tight ${DARK_TEXT_COLOR}`}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
                    >
                        Pioneering Excellence: Innovation, Quality, and <br className="hidden sm:inline"/> Sustainability.
                    </motion.h2>
                </motion.div>

                {/* --- Values Grid (Replaced MUI Grid) --- */}
                {/* Responsive grid: 1 col on xs, 2 cols on md, 3 cols on lg */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {values.map((val, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                            variants={valueCardVariants}
                            whileHover="hover"
                        >
                            {/* Icon Wrapper */}
                            <motion.div
                                className={`w-16 h-16 rounded-full bg-background shadow-inner flex items-center justify-center mb-4`}
                                variants={iconVariants}
                                whileHover="hover"
                            >
                                {/* MUI Icon with primary color class applied */}
                                {val.icon}
                            </motion.div>

                            {/* Title (Replaced Typography) */}
                            <motion.h3
                                className={`text-xl font-bold mb-2 ${DARK_TEXT_COLOR}`}
                                variants={textVariants}
                                whileHover={{ color: "#1F5A36" }}
                            >
                                {val.title}
                            </motion.h3>

                            {/* Description (Replaced Typography) */}
                            <motion.p
                                className="text-gray-500 text-sm leading-relaxed"
                                variants={textVariants}
                                custom={idx}
                            >
                                {val.desc}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CoreValues;
