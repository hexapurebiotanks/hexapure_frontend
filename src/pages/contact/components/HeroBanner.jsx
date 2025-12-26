import React from "react";
// 1. Import motion from framer-motion
import { motion } from "framer-motion";

const ContactHeroBanner = () => {
    // 2. Define animation variants for the main card container
    const cardVariants = {
        hidden: {
            y: "100%",
            opacity: 0,
            scale: 0.95
        },
        visible: {
            y: "50%",
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2,
                when: "beforeChildren"
            }
        }
    };

    // 3. Define animation variants for the text elements
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="relative h-[400px] w-full z-10">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/.netlify/images?url=/images/call.jpg&w=1200&fm=webp')" }}
            >
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="absolute inset-0 bg-primary/20 z-10" />

            <div className="max-w-7xl mx-auto h-full relative">
                {/* Card Configuration: Changed to motion.div with animation */}
                <motion.div
                    className="absolute bottom-0 translate-y-1/2 left-4 right-4 md:left-6 md:right-auto md:w-auto bg-gradient-to-r from-[#0F5132]/70 to-[#2E8B57]/60 text-white p-8 md:p-12 max-w-xl rounded-l-xl rounded-r-none shadow-lg z-20"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Title - now motion.h1 */}
                    <motion.h1
                        className="text-3xl md:text-4xl font-extrabold mb-2"
                        variants={textVariants}
                    >
                        Contact Us
                    </motion.h1>

                    {/* Subtitle - now motion.p */}
                    <motion.p
                        className="text-xl opacity-90"
                        variants={textVariants}
                    >
                        We would love to hear from you.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    )
}

export default ContactHeroBanner;
