import React from "react";
// Import NavLink from react-router-dom for internal navigation
import { NavLink } from "react-router-dom";
// Import MUI components only if you need icons later.
// For now, no icons are used, but keeping the instruction in mind.
const currentYear = new Date().getFullYear();

// Define the menu items that correspond to the main routes
// This helps ensure consistency if routes change.
const companyLinks = [
    { text: "Home", href: "/" },
    { text: "About us", href: "/about-us" },
    { text: "Solutions", href: "/solutions" },
    { text: "Products", href: "/products" },
    // Technical Resources links to an external PDF, so it will use a standard 'a' tag.
    { text: "Technical Resources", href: "/documents/Hexapure-Brochure.pdf", isExternal: true },
    { text: "Contact Us", href: "/contact-us" },
];

// Product links, assuming these are placeholder links for now
const productLinks = [
    { text: "Hexapure Septic Tank", href: "/products" },
    { text: "Aquavault", href: "/products" },
    { text: "Hexapit", href: "/products" },
    { text: "BioReed+", href: "/products" },
];

// Helper function to render a link item
const renderLink = (item) => {
    // Determine if it's an external file (e.g., PDF)
    const isExternalFile = (href) => href.includes('.pdf') || href.startsWith('http');

    const linkContent = (
        <>
            <span className="text-[#2E8B57] mr-1">»</span>
            {item.text}
        </>
    );

    if (item.isExternal || isExternalFile(item.href)) {
        // Use a standard 'a' tag for external files
        return (
            <a
                key={item.text}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#2E8B57] transition-colors duration-300"
            >
                {linkContent}
            </a>
        );
    } else if (item.href && item.href !== '#') {
        // Use NavLink for internal routes
        // Note: NavLink active class styling is typically applied here, but for simplicity in the footer,
        // we'll primarily rely on the white text for all links for now, as active state is less critical in a footer.
        // The hover effect is added for visual feedback.
        return (
            <NavLink
                key={item.text}
                to={item.href}
                className="text-white hover:text-[#2E8B57] transition-colors duration-300"
            >
                {linkContent}
            </NavLink>
        );
    } else {
        // Use a standard 'a' tag for placeholder links ('#')
        return (
            <a
                key={item.text}
                href={item.href}
                className="text-white hover:text-[#2E8B57] transition-colors duration-300"
            >
                {linkContent}
            </a>
        );
    }
};


const Footer = () => (

    // Main Footer Wrapper (Replaced MUI Container/Box)
    <footer className="bg-[#2A2A2A] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Main Grid Layout (Replaced MUI Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 pb-10 border-b border-[#333333]">

                {/* 1. Company Info Column (1/1 on xs, 4/12 on md) */}
                <div className="col-span-1 md:col-span-4 order-1">
                    {/* --- Logo Replacement --- */}
                    <div className="mb-4">
                        {/* Use NavLink to make the logo go to the home page */}
                        <NavLink to="/">
                            <img
                                src="/.netlify/images?url=/images/footer_logo_withoutbg.webp&w=200&fm=webp"
                                alt="Hexapure Logo"
                                // Set height and potentially width, adjust classes as needed for your specific SVG size
                                className="h-8 md:h-10 w-auto "
                                loading="lazy"
                                width="200"
                                height="40"
                                // `filter brightness-[1.5]` is added to make the logo visible against the dark background, adjust or remove if your SVG is white.
                            />
                        </NavLink>
                    </div>
                    {/* ------------------------ */}
                    <p className="text-[#CCCCCC] text-sm mb-6 md:pr-8">
                        Leaders in eco-friendly wastewater solutions. Pioneering innovation, quality, and community engagement for sustainable futures.
                    </p>

                    {/* NEW: Contact Details Added Here */}
                    <div className="space-y-2 text-sm text-[#CCCCCC]">
                        <p>
                            Address: Edaiyanvillai, Santhaiyadi Post, Kanyakumari District - 629703
                        </p>
                        <p>
                            <a href="tel:+918903488003" className="hover:text-[#2E8B57] transition-colors cursor-pointer">
                                Tel: +91 8903488003
                            </a>
                        </p>
                        <p>
                            <a href="mailto:Hexapure@gmail.com" className="hover:text-[#2E8B57] transition-colors cursor-pointer">
                                Email: Hexapure@gmail.com
                            </a>
                        </p>
                    </div>
                    {/* END NEW CONTACT DETAILS */}
                </div>

                {/* 2. Company Links Column (1/2 on xs, 2/12 on md) */}
                <div className="col-span-1 xs:col-span-6 md:col-span-2 order-2">
                    <h6 className="text-white font-semibold text-lg mb-4">
                        Company
                    </h6>
                    {/* UPDATED: Links now use renderLink to correctly handle NavLink and 'a' tags */}
                    <ul className="space-y-3 text-sm">
                        {companyLinks.map(item => (
                            <li key={item.text}>
                                {renderLink(item)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Products Links Column (1/2 on xs, 2/12 on md) */}
                <div className="col-span-1 xs:col-span-6 md:col-span-2 order-3">
                    <h6 className="text-white font-semibold text-lg mb-4">
                        Products
                    </h6>
                    {/* UPDATED: Links now use renderLink */}
                    <ul className="space-y-3 text-sm">
                        {productLinks.map(item => (
                            <li key={item.text}>
                                {renderLink(item)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 4. Location Column (1/1 on xs, 4/12 on md) */}
                <div className="col-span-1 md:col-span-4 order-4">
                    <h6 className="text-white font-semibold text-lg mb-4">
                        Location
                    </h6>
                    {/* Map Placeholder REPLACED with Google Maps Embed with Pin */}
                    <div className="bg-[#333333] h-36 md:h-40 rounded w-full overflow-hidden relative shadow-md">
                        <iframe
                            // The 'q=' parameter is used to query the location, which Google Maps typically pins.
                            src="https://maps.google.com/maps?q=Edaiyanvillai,+Santhaiyadi+Post,+Kanyakumari+District+-+629703&t=&z=14&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Hexapure Location on Google Maps"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="pt-6 text-center text-[#CCCCCC] text-xs">
                Copyright © {currentYear}  Hexapure. All rights reserved. Powered by Hexapure.
            </div>
        </div>
    </footer>
);

export default Footer;
