import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Content based on the Hexapure Bio Septic Tank process
const steps = [
    {
        number: 1,
        day: "Day 1",
        title: "Facultative Reactor - I",
        description: "In a facultative reactor, microbes break down waste, and solids settle to produce cleaner water. The upper section is aerobic (with oxygen), while the lower section is anaerobic (without oxygen).",
        image: "/.netlify/images?url=/images/step_img1.jpg&w=800&fm=webp", // Placeholder image for tank diagram
    },
    {
        number: 2,
        day: "Day 2",
        title: "Facultative Reactor - II",
        description: "This continues the process with a combination of aerobic and anaerobic chambers. The bacteria present are capable of functioning in either environment, which significantly enhances the overall treatment efficiency.",
        image: "/.netlify/images?url=/images/step_img2.jpg&w=800&fm=webp",
    },
    {
        number: 3,
        day: "Day 3",
        title: "Anaerobic Reactor - I",
        description: "The anaerobic reactor promotes further anaerobic digestion, effectively assisting in the breakdown of organic matter and the reduction of harmful pathogens. This aids in sludge treatment and improves waste management.",
        image: "/.netlify/images?url=/images/step_img3.jpg&w=800&fm=webp",
    },
    {
        number: 4,
        day: "Day 4",
        title: "Anaerobic Reactor - II",
        description: "This reactor efficiently treats wastewater by enhancing the overall effectiveness of the system and is designed to handle higher sludge volumes and more complex waste types.",
        image: "/.netlify/images?url=/images/step_img4.jpg&w=800&fm=webp",
    },
    {
        number: 5,
        day: "Day 5",
        title: "Sludge Polishing Reactor",
        description: "This reactor continues anaerobic digestion, fostering the further breakdown of organic matter. It enhances the quality of effluent by removing remaining solids and reducing residual contaminants.",
        image: "/.netlify/images?url=/images/step_img5.jpg&w=800&fm=webp",
    },
    {
        number: 6,
        day: "Day 6",
        title: "Settling Tank",
        description: "The Settling Tank facilitates sedimentation, allowing solid particles to settle at the bottom, resulting in clear water in the final stage. This step effectively removes suspended solids before discharge.",
        image: "/.netlify/images?url=/images/step_img6.jpg&w=800&fm=webp",
    },
];

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    // Auto-advance functionality
    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            setActiveStep((current) => (current + 1) % steps.length);
        }, 4000); // Change step every 4 seconds

        return () => clearInterval(interval);
    }, [autoPlay]);

    const handleStepClick = (i) => {
        setActiveStep(i);
        setAutoPlay(false); // Stop auto-play when user manually selects a step
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-text-dark font-extrabold text-3xl md:text-4xl text-center mb-4 leading-tight"
                    variants={itemVariants}
                >
                    How the Bio Septic Tank Works
                </motion.h2>
                <motion.p
                    className="text-charcoal text-lg max-w-3xl mx-auto text-center mb-16"
                    variants={itemVariants}
                >
                    Our advanced system uses a 6-day retention, 6-chambered anaerobic reactor process to achieve over 98% pollution removal.
                </motion.p>

                {/* Progress Bar (Timeline) */}
                <motion.div
                    className="relative mb-16"
                    variants={containerVariants}
                >
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <motion.div
                                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center text-xs font-semibold cursor-pointer transition-all duration-300 transform ${
                                        index <= activeStep
                                            ? "bg-primary text-white shadow-xl scale-105"
                                            : "bg-white border-4 border-primary/30 text-primary hover:scale-105"
                                    }`}
                                    onClick={() => handleStepClick(index)}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="text-sm font-bold">{step.number}</span>
                                    <span className="text-[10px] sm:text-xs font-medium mt-[-2px]">{step.day}</span>
                                </motion.div>

                                {index < steps.length - 1 && (
                                    <div className="flex-1 h-1.5 bg-gray-300 relative mx-2 sm:mx-4 overflow-hidden rounded-full">
                                        {/* Animated Line Progress */}
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: index < activeStep ? "100%" : "0%" }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>

                {/* Content Section (Animated Slider) */}
                <div className="flex flex-col items-center text-center space-y-8 lg:flex-row lg:items-start lg:text-left lg:space-y-0 lg:space-x-12">

                    {/* Image/Diagram */}
                    <div className="w-full max-w-lg lg:w-1/2 relative overflow-hidden rounded-xl">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={steps[activeStep].image}
                                src={steps[activeStep].image}
                                alt={steps[activeStep].title}
                                className="w-full rounded-xl shadow-2xl border border-gray-100 object-cover"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 lg:w-1/2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={steps[activeStep].title}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4 }}
                                className="lg:pt-4"
                            >
                                <p className="text-primary font-bold text-sm uppercase mb-2">
                                    {steps[activeStep].day} | Stage {steps[activeStep].number}
                                </p>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-text-dark mb-4 leading-snug">
                                    {steps[activeStep].title}
                                </h3>
                                <p className="text-charcoal text-lg">
                                    {steps[activeStep].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <motion.div variants={itemVariants} className="text-center mt-12 pt-8 border-t border-gray-200">
                    <p className="text-xl font-semibold text-text-dark">
                        Final Outcome: Clean, Treated Water Outlet
                    </p>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default HowItWorks;
