import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Icons required by the user, retained from MUI (but now unused in this file)
import SpaIcon from '@mui/icons-material/Spa';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Hero = ({ onContactClick }) => {
    const navigate = useNavigate();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const titleVariants = {
        hidden: { y: -100, opacity: 0 },
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

    const paragraphVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                delay: 0.4,
                duration: 0.8
            }
        }
    };

    const leftButtonVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.6,
                duration: 0.8
            }
        }
    };

    const rightButtonVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.8,
                duration: 0.8
            }
        }
    };

    const backgroundVariants = {
        hidden: { scale: 1 },
        visible: {
            scale: 1.05, // Reduced scale for subtlety
            transition: {
                duration: 0.3, // Fast GPU-friendly animation
                ease: "ease-out"
            }
        }
    };

    return (
        <section className="relative w-full overflow-hidden z-10">
            {/* --- Main Hero Background Area --- */}
            <div className="relative min-h-[60vh] md:min-h-[600px] flex items-center justify-center text-center text-white">

                {/* Background Image with very slow zoom animation - REPLACED WITH IMG TAG FOR LCP */}
                <motion.img
                    src="/.netlify/images?url=/images/banner4.jpg&w=1200&fm=webp&q=75"
                    width="1200"
                    height="600"
                    fetchPriority="high"
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Hexapure wastewater treatment solutions"
                    style={{
                        transform: backgroundVariants.visible.scale ? `scale(${backgroundVariants.visible.scale})` : 'scale(1)',
                        transition: 'transform 300ms ease-out',
                        willChange: 'transform' // GPU acceleration
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1F5A36]/60 to-[#2E8B57]/60 z-10" />

                {/* --- Hero Text Content --- */}
                <motion.div
                    className="relative z-20 max-w-5xl px-4 py-16 md:py-20 mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    {/* Title with top-to-bottom animation */}
                    <motion.h1
                        className="font-extrabold mb-4 uppercase leading-tight
                                   text-4xl sm:text-5xl md:text-6xl drop-shadow-md"
                        variants={titleVariants}
                    >
                        The 6-Chambered <br/> Advanced Bio Septic Tank
                    </motion.h1>

                    {/* Paragraph with fade-up animation */}
                    <motion.p
                        className="mb-8 text-lg md:text-xl max-w-3xl mx-auto opacity-95 drop-shadow-sm"
                        variants={paragraphVariants}
                    >
                        Hexapure's commitment to continuous innovation, leveraging research and development to lead in wastewater treatment advancements.
                    </motion.p>

                    {/* Buttons Container */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        {/* Left button coming from left */}
                        <motion.button
                            onClick={onContactClick}
                            className="bg-primary hover:bg-primary-dark text-white font-semibold
                                       px-8 py-3 rounded-lg text-lg transition-all duration-300
                                       shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            variants={leftButtonVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Us
                        </motion.button>

                        {/* Right button coming from right */}
                        <motion.button
                            className="border-2 border-white text-white font-semibold
                                       px-8 py-3 rounded-lg text-lg transition-all duration-300
                                       hover:bg-white/10 hover:-translate-y-0.5 mt-3 sm:mt-0"
                            onClick={() => navigate('/products')}
                            variants={rightButtonVariants}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
