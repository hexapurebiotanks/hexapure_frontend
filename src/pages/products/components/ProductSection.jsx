import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'; // Using MUI icon for the arrow

/**
 * Renders a single product section.
 * @param {object} props
 * @param {string} props.title - Main product title (e.g., Domestic BioSeptic Tank)
 * @param {string} props.subtitle - Small title above the main title (e.g., Hexatreat Bio Septic Tank)
 * @param {string} props.description - Main description paragraph
 * @param {string} props.imageSrc - URL for the product image
 * @param {boolean} props.isReversed - If true, image is on the left and content on the right.
 * @param {React.ReactNode} props.children - Optional content (like tables, benefits) to display below the main content.
 */
const ProductSection = ({ title, subtitle, description, imageSrc, isReversed, children }) => {
    // Determine the order of the grid columns based on isReversed prop for responsive design
    const contentOrder = isReversed ? "md:order-2" : "md:order-1";
    const imageOrder = isReversed ? "md:order-1" : "md:order-2";

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* Content Column */}
                    <div className={`space-y-6 ${contentOrder}`}>
                        {/* Subtitle: Primary color for emphasis */}
                        <p className="text-primary font-semibold tracking-wider uppercase text-sm">{subtitle}</p>
                        <h2 className="text-text-dark font-extrabold text-3xl md:text-4xl leading-tight">
                            {title}
                        </h2>
                        <p className="text-charcoal text-lg">{description}</p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 shadow-xl flex items-center justify-center sm:justify-start"
                            >
                                Contact Us
                            </button>
                            <button
                                className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-semibold px-6 py-3 rounded-lg transition-colors duration-300 shadow-sm flex items-center justify-center sm:justify-start"
                            >
                                View Specs
                                <ArrowRightAltIcon className="ml-2 w-5 h-5" />
                            </button>
                        </div>

                        {/* Optional Children (for benefits/tables) */}
                        {children && (
                            <div className="pt-8 border-t border-gray-100 mt-8">
                                {children}
                            </div>
                        )}
                    </div>

                    {/* Image Column */}
                    <div className={`relative ${imageOrder}`}>
                        {/* Image container with rounded corners and shadow, matching UI template */}
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 transform hover:scale-[1.02] transition duration-500 ease-in-out">
                            <img
                                src={`/.netlify/images?url=${imageSrc}&w=800&fm=webp`}
                                srcSet={`/.netlify/images?url=${imageSrc}&w=400&fm=webp 400w, /.netlify/images?url=${imageSrc}&w=800&fm=webp 800w, /.netlify/images?url=${imageSrc}&w=1200&fm=webp 1200w`}
                                sizes="(max-width: 768px) 90vw, 50vw"
                                alt={title}
                                loading="lazy"
                                width="800"
                                height="600"
                                className="w-full h-auto object-cover"
                                // Placeholder for image errors
                                onError={(e) => {
                                    e.target.onerror = null; // Prevents infinite loop
                                    e.target.src = `https://placehold.co/600x400/cccccc/000000?text=${encodeURIComponent(title)}%20Image`;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Subcomponent for displaying product specifications in a table
const SpecsTable = ({ data, title }) => (
    <div className="w-full mt-10">
        <h4 className="text-text-dark font-extrabold text-2xl mb-4 text-center">{title}</h4>
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr className="bg-primary text-white text-sm uppercase tracking-wider">
                    <th className="py-3 px-4 text-left rounded-tl-lg">Model Reference</th>
                    {/* Dynamically generate column headers excluding the reference key */}
                    {Object.keys(data[0] || {}).filter(key => key !== 'Model Reference').map(key => (
                        <th key={key} className="py-3 px-4 text-left">{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition duration-150">
                        <td className="py-3 px-4 font-medium text-text-dark whitespace-nowrap">{row["Model Reference"]}</td>
                        {Object.keys(row).filter(key => key !== 'Model Reference').map((key, i) => (
                            <td key={i} className="py-3 px-4 text-charcoal whitespace-nowrap">{row[key]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);

// Subcomponent for listing product benefits
const ProductBenefits = ({ title, description }) => (
    <div className="bg-gray-50 rounded-xl p-8 my-10 shadow-inner">
        <h3 className="text-text-dark font-extrabold text-3xl md:text-4xl text-center mb-4">
            {title}
        </h3>
        <p className="text-charcoal text-center max-w-4xl mx-auto">
            {description}
        </p>
    </div>
);

// Exporting main component and subcomponents
export { ProductSection, SpecsTable, ProductBenefits };
