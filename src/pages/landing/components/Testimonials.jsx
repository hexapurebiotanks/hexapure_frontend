import React from "react";

const Testimonials = () => {
    const testimonials = [
        { name: "Frankie Mills", quote: "Hexapure's innovation transformed our wastewater treatment, ensuring quality, reliability, and a sustainable future." },
        { name: "Lydia Morris", quote: "Impressed with Hexapure's integrity, their eco-friendly products exceeded expectations. Exceptional customer satisfaction." },
        { name: "Scarlett Jackson", quote: "Hexapure delivers on its promises - innovative, top-quality solutions. Their commitment to sustainability sets them apart." }
    ];

    return (
        <section className="py-20 relative overflow-hidden bg-green-900">
            {/* Dark Green Overlay for contrast and readability */}
            <div className="absolute inset-0 bg-green-900/70"></div>

            {/* Content Wrapper */}
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center text-white mb-12">
                    <p className="text-lg opacity-80 mb-2 uppercase tracking-wider">
                        Testimonial
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Customer Stories: Trusted Solutions.
                    </h2>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((test, i) => (
                        <div
                            key={i}
                            className="col-span-1 opacity-0 animate-fade-in-up"
                            style={{
                                animationDelay: `${i * 0.2}s`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            <div className="bg-white p-8 rounded-lg text-center h-full flex flex-col items-center shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                                {/* Quote */}
                                <p className="text-gray-600 text-base italic mb-6 flex-grow hover:text-primary transition-colors duration-300">
                                    {test.quote}
                                </p>

                                {/* Author Info */}
                                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100 w-full justify-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden shrink-0 hover:scale-110 transition-transform duration-300">
                                        <img
                                            src={`https://i.pravatar.cc/70?img=${i + 10}`}
                                            alt={test.name}
                                            width="70"
                                            height="70"
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-primary font-bold text-sm hover:scale-105 transition-transform duration-300">
                                        {test.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
