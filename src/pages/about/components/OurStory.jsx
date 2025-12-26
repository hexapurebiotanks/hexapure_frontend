// pages/about/components/OurStory.jsx
import React from "react";
import { motion } from "framer-motion";

const OurStory = () => {
    // Animation variants for the entire section
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    // Animation for content container
    const contentVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
            }
        }
    };

    // Animation for image container
    const imageContainerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
                duration: 1
            }
        }
    };

    // Animation for image itself
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: 0.3
            }
        },
        hover: {
            scale: 1.03,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    // Animation for title
    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12,
                duration: 0.6
            }
        }
    };

    // Animation for paragraphs
    const paragraphVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    // Animation for stats container
    const statsContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5
            }
        }
    };

    // Animation for individual stat items
    const statItemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 300
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
            {/* Background Image - REPLACED WITH IMG TAG FOR PERFORMANCE */}
            <img
                src="/.netlify/images?url=/images/bg_pattern.png&w=800&fm=webp&q=75"
                width="800"
                height="600"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.03]"
                alt="Background pattern"
            />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    {/* Left Image */}
                    <motion.div
                        className="order-2 md:order-1"
                        variants={imageContainerVariants}
                    >
                        <motion.div
                            className="bg-background rounded-xl overflow-hidden shadow-xl border border-gray-200"
                            variants={imageVariants}
                            whileHover="hover"
                        >
                            <img
                                src="/.netlify/images?url=/images/aboutus_img_hexapure.webp&w=800&fm=webp"
                                srcSet="/.netlify/images?url=/images/aboutus_img_hexapure.webp&w=400&fm=webp 400w, /.netlify/images?url=/images/aboutus_img_hexapure.webp&w=800&fm=webp 800w, /.netlify/images?url=/images/aboutus_img_hexapure.webp&w=1200&fm=webp 1200w"
                                sizes="(max-width: 768px) 90vw, 50vw"
                                alt="Hexapure Innovation"
                                loading="lazy"
                                width="800"
                                height="600"
                                className="w-full h-auto object-cover rounded mix-blend-multiply"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        className="order-1 md:order-2"
                        variants={contentVariants}
                    >
                        <motion.h2
                            className="text-text-dark font-extrabold text-3xl md:text-4xl mb-6 mt-6 leading-tight"
                            variants={titleVariants}
                        >
                            Our Journey in <span className="text-primary">Wastewater Innovation</span>
                        </motion.h2>

                        <div className="space-y-4 text-charcoal">
                            <motion.p
                                className="text-lg leading-relaxed"
                                variants={paragraphVariants}
                            >
                                Founded with a vision to revolutionize wastewater treatment, Hexapure has been at the forefront of sustainable environmental solutions. Our journey began with a simple yet powerful mission: to create efficient, eco-friendly wastewater treatment systems that serve communities while protecting our planet.
                            </motion.p>

                            <motion.p
                                className="text-lg leading-relaxed"
                                variants={paragraphVariants}
                            >
                                Through years of research and development, we've perfected our 6-chamber advanced bio septic tank technology, combining cutting-edge biological treatment processes with durable FRP construction to deliver unmatched performance and reliability.
                            </motion.p>

                            <motion.p
                                className="text-lg leading-relaxed"
                                variants={paragraphVariants}
                            >
                                Today, we're proud to serve thousands of customers across residential, commercial, and public sectors, providing solutions that not only meet but exceed environmental standards while ensuring cost-effectiveness and long-term sustainability.
                            </motion.p>
                        </div>

                        {/* Stats Section */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200"
                            variants={statsContainerVariants}
                        >
                            <motion.div
                                className="text-center"
                                variants={statItemVariants}
                                whileHover="hover"
                            >
                                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                                <div className="text-sm text-charcoal">Pollution Removal</div>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                variants={statItemVariants}
                                whileHover="hover"
                            >
                                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                                <div className="text-sm text-charcoal">Installations</div>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                variants={statItemVariants}
                                whileHover="hover"
                            >
                                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                                <div className="text-sm text-charcoal">Years Experience</div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default OurStory;
