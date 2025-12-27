import React, {useRef, Suspense, lazy} from 'react';
import { motion, useInView } from "framer-motion";

// Keep hero section non-lazy as it's above the fold
import ProductsHero from "./components/ProductsHero.jsx";

// Lazy load heavy product components
const HexatreatProduct = lazy(() => import("./components/HexatreatProduct.jsx"));
const AquavaultProduct = lazy(() => import("./components/AquavaultProduct.jsx"));
const HexapitProduct = lazy(() => import("./components/HexapitProduct.jsx"));
const BioReedProduct = lazy(() => import("./components/BioReedProduct.jsx"));

// Loading component for product sections
const ProductLoader = () => (
    <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
);


// Data for the Product Sections based on reference images
const productsData = [
    {
        id: 'bio-septic-tank',
        subtitle: 'Hexatreat Bio Septic Tank',
        title: 'Domestic BioSeptic Tank',
        description: 'Hexatreat\'s 6-Chambered Bio Septic Tank: an innovation in wastewater management. Crafted with 100% FRP, polyacrylate lining, and Essential bio media. It excels in microorganism growth, offering superior septic water treatment. It features a modern design, quick installation, and zero maintenance. With advanced civil design and eco-friendly materials, it stands as the market\'s top choice for sustainable, efficient, and reliable wastewater solutions.',
        imageSrc: '/images/landing_img1.jpeg', // Placeholder for the actual image
        isReversed: false,
        specTitle: 'Hexatreat Septic Tank Specifications',
        specs: [
            { 'Model Reference': 'HT-1.2', Volume: '1200', 'No of People (150L/P)': '8', Length: '1700', Width: '1000', Height: '1250', 'Thickness (mm)': '5' },
            { 'Model Reference': 'HT-1.5', Volume: '1500', 'No of People (150L/P)': '10', Length: '1700', Width: '1200', Height: '1250', 'Thickness (mm)': '6' },
            { 'Model Reference': 'HT-3', Volume: '3000', 'No of People (150L/P)': '20', Length: '2800', Width: '1300', Height: '1300', 'Thickness (mm)': '8' },
            { 'Model Reference': 'HT-4', Volume: '4000', 'No of People (150L/P)': '27', Length: '3750', Width: '1300', Height: '1300', 'Thickness (mm)': '8' },
        ],
        benefits: {
            title: 'Product Benefits',
            description: 'Featuring advanced biological treatment technology, this system offers an economical solution with zero maintenance costs. Safety is prioritized with low-level visibility, a lockable childproof cover, and FRP-reinforced manholes. Known for stability, it stands as one of the most reliable processes in the market. Microorganism growth is enhanced through fill, pack media, and a polygrain lining. The Texture Tough Microbial Habitat provides a sand-like finish, increasing surface area and improving water quality.',
            details: (
                // Applied better styling for the details section
                <div className="text-charcoal space-y-4 p-6 bg-white border border-gray-200 rounded-lg shadow-inner">
                    <h4 className="font-extrabold text-2xl mb-2 text-primary tracking-wide">The Technology in the Tank</h4>
                    <p className="text-lg border-l-4 border-primary pl-4">
                        The tank utilizes a **6-Chambered Anaerobic Reactor** design . This system breaks down organic matter efficiently without oxygen, significantly reducing pollutants before the effluent is released.
                    </p>
                    <p className="text-lg border-l-4 border-primary pl-4">
                        It incorporates **Essential Bio Media** and a **Polyacrylate Lining** to maximize the surface area for superior microorganism growth, ensuring the highest level of wastewater treatment effectiveness.
                    </p>
                </div>
            )
        }
    },
    {
        id: 'domestic-tertiary-filtration',
        subtitle: 'BioReed+',
        title: 'Domestic Tertiary Filtration System (Reed Bed)',
        description: 'The BioReed+ system uses a specially constructed reed bed  in conjunction with the BioSeptic Tank to further polish the effluent. This natural filtration step significantly enhances water quality before migrating into a drainage field or watercourse, making it a highly eco-friendly solution.',
        imageSrc: '/images/landing_img4.jpeg', // Placeholder for the actual image
        isReversed: true,
        specTitle: 'BioReed+ Specifications',
        specs: [
            { 'Model Reference': 'BR-0.5KL', Length: '1000', Width: '1000', Height: '600', 'Thickness (mm)': '5' },
            { 'Model Reference': 'BR-2.0KL', Length: '2400', Width: '1000', Height: '600', 'Thickness (mm)': '6' },
        ],
        benefits: {
            title: 'BioReed+ Advantages',
            description: 'Offers superior tertiary effluent quality using natural processes, ensuring minimal environmental impact. The system is passive, requiring very little maintenance and providing substantial long-term cost savings compared to mechanical filtration systems.',
        }
    },
    {
        id: 'hexapit',
        subtitle: 'Hexapit',
        title: 'Domestic Tertiary Filtration System (Percolation Pit)',
        description: 'The Hexapit is an egg-shaped percolation pit crafted from FRP, designed to provide a robust and efficient final filtration step. It facilitates the safe and gradual infiltration of treated effluent into the soil, minimizing the risk of groundwater contamination and acting as a reliable drainage field alternative.',
        imageSrc: '/images/landing_img2.jpeg', // Placeholder for the actual image
        isReversed: false,
        specTitle: 'Hexapit Specifications',
        specs: [
            { 'Model Reference': 'HP-1', Height: '1200', Width: '1000', 'Thickness (mm)': '5' },
            { 'Model Reference': 'HP-2', Height: '1400', Width: '1500', 'Thickness (mm)': '6' },
        ],
        benefits: {
            title: 'Hexapit Advantages',
            description: 'The unique egg shape provides self-cleaning properties, minimizing maintenance. FRP construction ensures corrosion resistance and incredible structural strength, allowing installation in diverse environments. It optimizes underground space and offers an aesthetically pleasing, cost-effective solution.',
        }
    },
    {
        id: 'aquavault',
        subtitle: 'Aquavault',
        title: 'Domestic Water Storage Tank and Sewage Collection Tank',
        description: 'Aquavault is a meticulously engineered tank system for both clean water storage and sewage collection. Built with FRP and designed for durability and unparalleled efficiency, it meets the highest industry standards. It represents one of the most cost-effective, high-capacity storage solutions available today.',
        imageSrc: '/images/landing_img3.jpeg', // Placeholder for the actual image
        isReversed: true,
        specTitle: 'Aquavault Specifications',
        specs: [
            { 'Model Reference': 'AV-1.5KL', 'Capacity in Litter': '1500', Length: '1750', Width: '1250', Height: '1500', 'Height to Manhole (mm)': '150', 'Thickness (mm)': '3' },
            { 'Model Reference': 'AV-2.0KL', 'Capacity in Litter': '2000', Length: '1750', Width: '1250', Height: '1800', 'Height to Manhole (mm)': '400', 'Thickness (mm)': '4' },
            { 'Model Reference': 'AV-4KL', 'Capacity in Litter': '4000', Length: '2000', Width: '1800', Height: '1830', 'Height to Manhole (mm)': '1430', 'Thickness (mm)': '6' },
        ],
        benefits: {
            title: 'Aquavault Key Features',
            description: 'Efficient, space-saving design with dual-functionality (storage/collection). Durable FRP material guarantees a long service life and resistance to corrosion. Installation is quick and simple, offering low lifetime costs and full compliance with industry and environmental standards.',
        }
    }
];

const ProductsPage = ({ onContactClick }) => {
    const titleRef = useRef(null);
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
    return (
        <div className="font-sans text-gray-800">
            {/* Hero Section */}
            <ProductsHero  />
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.8,
                    delay: 0.2
                }}
                className="relative pt-20 bg-white"
            >
                <h2 className="text-text-dark font-extrabold text-4xl md:text-6xl text-center mt-6 max-w-5xl mx-auto px-4">
                    Our Products
                </h2>

                {/* Lazy load product components with Suspense */}
                <Suspense fallback={<ProductLoader />}>
                    <HexatreatProduct onContactClick={onContactClick} />
                </Suspense>

                <Suspense fallback={<ProductLoader />}>
                    <AquavaultProduct onContactClick={onContactClick} />
                </Suspense>

                <Suspense fallback={<ProductLoader />}>
                    <HexapitProduct onContactClick={onContactClick} />
                </Suspense>

                <Suspense fallback={<ProductLoader />}>
                    <BioReedProduct onContactClick={onContactClick} />
                </Suspense>
            </motion.div>

            {/*<div className="relative pt-20 bg-white">*/}
            {/*    /!* Enhanced heading size and spacing *!/*/}
            {/*    <h2 className="text-text-dark font-extrabold text-4xl md:text-6xl text-center mb-20 max-w-5xl mx-auto px-4">*/}
            {/*        Our Innovative Product Lineup*/}
            {/*    </h2>*/}

            {/*    /!* --- Product 1: Domestic BioSeptic Tank --- *!/*/}
            {/*    <ProductSection*/}
            {/*        key={productsData[0].id}*/}
            {/*        {...productsData[0]}*/}
            {/*    >*/}
            {/*        /!* Additional Technology Details (before benefits/specs) *!/*/}
            {/*        {productsData[0].benefits.details}*/}

            {/*        <ProductBenefits*/}
            {/*            title={productsData[0].benefits.title}*/}
            {/*            description={productsData[0].benefits.description}*/}
            {/*        />*/}
            {/*        <SpecsTable*/}
            {/*            title={productsData[0].specTitle}*/}
            {/*            data={productsData[0].specs}*/}
            {/*        />*/}
            {/*    </ProductSection>*/}
            {/*    /!* Improved Separator: thicker and more spaced out *!/*/}
            {/*    <div className="border-b-4 border-gray-100 max-w-7xl mx-auto my-16" />*/}


            {/*    /!* --- Product 2: BioReed+ (Domestic Tertiary Filtration System) --- *!/*/}
            {/*    <ProductSection*/}
            {/*        key={productsData[1].id}*/}
            {/*        {...productsData[1]}*/}
            {/*    >*/}
            {/*        <ProductBenefits*/}
            {/*            title={productsData[1].benefits.title}*/}
            {/*            description={productsData[1].benefits.description}*/}
            {/*        />*/}
            {/*        <SpecsTable*/}
            {/*            title={productsData[1].specTitle}*/}
            {/*            data={productsData[1].specs}*/}
            {/*        />*/}
            {/*    </ProductSection>*/}
            {/*    <div className="border-b-4 border-gray-100 max-w-7xl mx-auto my-16" />*/}


            {/*    /!* --- Product 3: Hexapit (Domestic Tertiary Filtration System) --- *!/*/}
            {/*    <ProductSection*/}
            {/*        key={productsData[2].id}*/}
            {/*        {...productsData[2]}*/}
            {/*    >*/}
            {/*        <ProductBenefits*/}
            {/*            title={productsData[2].benefits.title}*/}
            {/*            description={productsData[2].benefits.description}*/}
            {/*        />*/}
            {/*        <SpecsTable*/}
            {/*            title={productsData[2].specTitle}*/}
            {/*            data={productsData[2].specs}*/}
            {/*        />*/}
            {/*    </ProductSection>*/}
            {/*    <div className="border-b-4 border-gray-100 max-w-7xl mx-auto my-16" />*/}


            {/*    /!* --- Product 4: Aquavault (Domestic Water Storage Tank) --- *!/*/}
            {/*    <ProductSection*/}
            {/*        key={productsData[3].id}*/}
            {/*        {...productsData[3]}*/}
            {/*    >*/}
            {/*        <ProductBenefits*/}
            {/*            title={productsData[3].benefits.title}*/}
            {/*            description={productsData[3].benefits.description}*/}
            {/*        />*/}
            {/*        <SpecsTable*/}
            {/*            title={productsData[3].specTitle}*/}
            {/*            data={productsData[3].specs}*/}
            {/*        />*/}
            {/*    </ProductSection>*/}
            {/*</div>*/}
        </div>
    );
};

export default ProductsPage;
