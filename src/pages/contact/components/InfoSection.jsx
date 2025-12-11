import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import React from "react";
// 1. Import Framer Motion hooks and component
import { motion, useInView } from "framer-motion";

const ContactInfoSection = () => {
    // Setup ref and useInView hook
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 }); // Animate when 20% visible

    // 2. Define variants for the two main columns (Split Animation)
    const leftColumnVariants = {
        hidden: { opacity: 0, x: -100 }, // Starts left
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 18,
                delay: 0.1,
                when: "beforeChildren", // Animate the column before staggering its content
            },
        },
    };

    const rightColumnVariants = {
        hidden: { opacity: 0, x: 100 }, // Starts right
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 90,
                damping: 18,
                delay: 0.2, // Slight delay after the left column starts
            },
        },
    };

    // 3. Define stagger variants for the Contact Details list
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Stagger the individual items
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 }, // Small vertical slide
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 20,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto px-4 pt-24 pb-16 [perspective:1000px]" // Added perspective for potential 3D effects
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-5">

                {/* Left: Contact Info (Slides in from Left) */}
                <motion.div variants={leftColumnVariants}>

                    {/* Intro text elements */}
                    <motion.p variants={itemVariants} className="text-primary font-medium text-sm mb-2 uppercase tracking-wide ">
                        Get in touch
                    </motion.p>
                    <motion.h2 variants={itemVariants} className="text-text-dark text-4xl font-bold mb-6">
                        Connect Now
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-500 mb-8 leading-relaxed">
                        For inquiries for advanced wastewater solutions. Reach out for eco-friendly, innovative products that redefine wastewater treatment standards.
                    </motion.p>

                    {/* Contact Details (Staggered Children) */}
                    <motion.div
                        className="space-y-8"
                        variants={staggerContainer}
                        // Important: The parent (leftColumnVariants) sets the initial state,
                        // so we only need to handle the staggering here.
                    >
                        {/* Location */}
                        <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                            <div className="bg-primary p-3 rounded-full text-white group-hover:bg-primary-dark transition-colors duration-300">
                                <LocationOnIcon fontSize="medium" />
                            </div>
                            <div>
                                <h5 className="text-text-dark font-bold text-lg">Location</h5>
                                <p className="text-gray-500 text-sm mt-1 w-3/4">
                                    Edaiyanvillai, Santhaiyadi Post, Kanyakumari District - 629703
                                </p>
                            </div>
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                            <div className="bg-primary p-3 rounded-full text-white group-hover:bg-primary-dark group-hover:text-white transition-colors duration-300">
                                <EmailIcon fontSize="medium" />
                            </div>
                            <div>
                                <h5 className="text-text-dark font-bold text-lg">Email us</h5>
                                <p className="text-gray-500 text-sm mt-1">Hexapure@gmail.com</p>
                            </div>
                        </motion.div>

                        {/* Phone */}
                        <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                            <div className="bg-primary p-3 rounded-full text-white group-hover:bg-primary-dark group-hover:text-white transition-colors duration-300">
                                <PhoneIcon fontSize="medium" />
                            </div>
                            <div>
                                <h5 className="text-text-dark font-bold text-lg">Call us</h5>
                                <p className="text-gray-500 text-sm mt-1">+91 8903488003</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right: Google Map (Slides in from Right) */}
                <motion.div
                    variants={rightColumnVariants}
                    className="h-[400px] md:h-[500px] w-full bg-gray-200 rounded-xl overflow-hidden shadow-lg relative"
                >
                    {/* Embed Google Map */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.336370979864!2d77.5080689!3d8.1688439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f12601903271%3A0x4621525712782714!2sEdaiyanvillai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{border:0}}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Hexapure Location"
                    ></iframe>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default ContactInfoSection;