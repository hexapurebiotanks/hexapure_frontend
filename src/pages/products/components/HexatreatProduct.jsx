// pages/products/components/HexatreatProduct.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

const HexatreatProduct = ({ onContactClick }) => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`py-10 md:py-20 bg-white relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                 style={{
                     backgroundImage: `url('/images/bg_pattern.png')`,
                     backgroundSize: 'cover'
                 }}>
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="black" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* 1. Product Header & Key Info */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
                    {/* Column 1: Product Image */}
                    <div className="w-full lg:order-1">
                        <div className={`bg-background rounded-xl overflow-hidden shadow-xl md:shadow-2xl border border-gray-200 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-[1.02] hover:shadow-3xl`}>
                            <img
                                src="/images/landing_img5.jpeg"
                                alt="Hexapure Bio Septic Tank"
                                className="w-full h-auto min-h-[300px] md:min-h-[400px] object-cover transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Column 2: Product Title, Description, and Buttons */}
                    <div className="w-full lg:order-2 lg:sticky lg:top-4">
                        <h2 className={`text-text-dark font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            Hexapure Bio Septic Tank
                        </h2>

                        <p className={`text-charcoal text-base md:text-lg mb-4 md:mb-6 leading-relaxed transition-all duration-700 delay-150 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            Hexapure's 6-Chambered Bio Septic Tank is an innovation in wastewater management.
                            Crafted with <strong>100% FRP</strong>, polyoxynide lining, and bio media, it excels
                            in microorganism growth. It offers superior septic water treatment, minimal maintenance,
                            and cost savings.
                        </p>

                        <p className={`text-charcoal text-base md:text-lg mb-6 md:mb-8 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <strong>Technology in the Tank:</strong> An anaerobic reactor is a system that breaks
                            down organic matter without the presence of oxygen, producing biogas as a byproduct.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <button
                                onClick={onContactClick}
                                className={`bg-primary hover:bg-primary-dark text-white font-semibold px-6 md:px-8 py-3 rounded-lg transition-all duration-300 shadow-md text-sm md:text-base transform hover:scale-105 active:scale-95 hover:shadow-lg delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            >
                                Contact Us
                            </button>

                            <button
                                className={`bg-transparent border-2 border-[#2E8B57] text-primary hover:bg-primary hover:text-white font-semibold px-6 md:px-8 py-3 rounded-lg transition-all duration-300 text-sm md:text-base transform hover:scale-105 active:scale-95 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                onClick={() => navigate('/solutions')}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Benefits Box */}
                <div className={`bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200 mb-8 md:mb-12 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:shadow-lg hover:-translate-y-1`}>
                    <h3 className={`text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4 transition-all duration-700 delay-550 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                        Product Benefits
                    </h3>

                    <p className={`text-charcoal text-base md:text-lg leading-relaxed transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                        This system uses advanced biological treatment technology to deliver an economical,
                        zero-maintenance solution. Designed with safety in mind, it features low-level
                        visibility, a lockable child-proof cover, and FRP-reinforced manholes for superior
                        durability.
                        Its highly stable multi-stage process supports enhanced microorganism growth through
                        fill-pack media and polygrass lining. The Textura Tough Microbial Habitat provides a
                        sand-like finish, increasing surface area and significantly improving water quality.
                    </p>
                </div>

                {/* --- Animated Separator --- */}
                <div className={`my-8 md:my-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent transition-all duration-1000 delay-650 ${isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />

                {/* 3. Flow Process & Highlights */}
                <div className="mb-12 md:mb-16">
                    <h2 className={`text-text-dark font-extrabold text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12 text-center transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Treatment Process & Key Features
                    </h2>

                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Flow Process Diagram */}
                        <div className={`p-4 md:p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200 transition-all duration-700 delay-750 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:shadow-xl hover:-translate-y-1`}>
                            <h3 className={`text-xl md:text-2xl text-center font-bold text-text-dark mb-4 transition-all duration-700 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                                Flow Process Diagram
                            </h3>

                            <div className={`flex items-center justify-center h-64 md:h-96 transition-all duration-700 delay-850 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                                <img
                                    src="/images/Flow-process-diagram.png"
                                    alt="Hexapure Flow Process Diagram"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>

                            <div className={`mt-3 md:mt-4 text-center transition-all duration-700 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                                <p className="text-charcoal text-sm md:text-base">
                                    Visual representation of the 8-stage wastewater treatment process
                                </p>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className={`p-4 md:p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200 transition-all duration-700 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:shadow-xl hover:-translate-y-1`}>
                            <h3 className={`text-xl md:text-2xl text-center font-bold text-text-dark mb-4 transition-all duration-700 delay-850 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                                Highlights
                            </h3>

                            <div className={`flex items-center justify-center h-64 md:h-96 transition-all duration-700 delay-900 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                                <img
                                    src="/images/Highlights.png"
                                    alt="Hexatreat Product Highlights"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>

                            <div className={`mt-3 md:mt-4 text-center transition-all duration-700 delay-950 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                                <p className="text-charcoal text-sm md:text-base">
                                    Key features and benefits of Hexatreat Bio Septic Tank
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Specification Table (Image) */}
                <div className="mb-12 md:mb-16">
                    <h3 className={`text-xl md:text-2xl font-bold text-text-dark mb-4 md:mb-6 text-center transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Hexapure Septic Tank Specifications
                    </h3>

                    <div className={`flex items-center justify-center bg-gray-50 w-full max-w-3xl mx-auto p-2 md:p-4 rounded-lg transition-all duration-700 delay-1050 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
                        <img
                            src="/images/Hexapure-Septic-Tank-Specifications.jpeg"
                            alt="Hexatreat Septic Tank Specifications"
                            className="w-full h-auto transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HexatreatProduct;