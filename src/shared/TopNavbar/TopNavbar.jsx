import { AppBar, Box, Container, Toolbar, IconButton, Collapse } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useLayoutEffect, useState} from "react";
// Import NavLink from react-router-dom
import {NavLink, useLocation} from "react-router-dom";

const TopNavbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth" // Use "instant" or "auto" instead of "smooth"
        });
    }, [location.pathname]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: "Home", href: "/", isRoute: true },
        { text: "Solutions", href: "/solutions", isRoute: true },
        // Placeholder links do not have 'isRoute: true'
        { text: "Products", href: "/products", isRoute: true },
        {
            text: "Technical Resources",
            href: "/documents/Hexapure-Brochure.pdf",
            isExternal: true // Mark this as external file
        },
        { text: "Contact Us", href: "/contact-us" },
        { text: "About Us", href: "/about-us" },
    ];

    // --- Helper function to determine if a link is an actual route ---
    const isRouteLink = (href) => href !== '#' && !href.includes('.pdf');

    // --- Helper function to check if link is external file ---
    const isExternalFile = (href) => href.includes('.pdf') || href.startsWith('http');

    // --- Desktop Link Renderer ---
    const renderDesktopLink = (item) => {
        const baseClasses = "transition duration-300 font-medium";
        const inactiveClasses = "text-[#2A2A2A] hover:text-[#2E8B57]";
        const activeClasses = "text-[#2E8B57] font-semibold";

        if (isExternalFile(item.href)) {
            // For PDF files, use a regular anchor tag with download attributes
            return (
                <a
                    key={item.text}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClasses} ${inactiveClasses}`}
                >
                    {item.text}
                </a>
            );
        } else if (isRouteLink(item.href)) {
            return (
                <NavLink
                    key={item.text}
                    to={item.href}
                    // Use a function for className to conditionally apply styles
                    className={({ isActive }) =>
                        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                    }
                    // 'end' ensures exact path matching, e.g., '/' doesn't match '/solutions'
                    end
                >
                    {item.text}
                </NavLink>
            );
        } else {
            // Use a standard 'a' tag for placeholder links that should not have router active styling
            return (
                <a
                    key={item.text}
                    href={item.href}
                    className={`${baseClasses} ${inactiveClasses}`} // Apply only inactive styles
                >
                    {item.text}
                </a>
            );
        }
    };

    // --- Mobile Link Renderer ---
    const renderMobileLink = (item) => {
        const baseClasses = "block py-3 px-4 font-medium transition-all duration-300";
        const hoverClasses = "hover:bg-[#F2F2F2] hover:pl-6";
        const inactiveClasses = "text-[#2A2A2A]";
        const activeClasses = "text-[#2E8B57] font-semibold pl-6";
        const styleProps = {
            textDecoration: 'none',
            borderBottom: '1px solid #E5E5E5'
        };

        if (isExternalFile(item.href)) {
            // For PDF files in mobile, use regular anchor tag
            return (
                <a
                    key={item.text}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDrawerToggle}
                    className={`${baseClasses} ${inactiveClasses} ${hoverClasses}`}
                    style={styleProps}
                >
                    {item.text}
                </a>
            );
        } else if (isRouteLink(item.href)) {
            return (
                <NavLink
                    key={item.text}
                    to={item.href}
                    onClick={handleDrawerToggle}
                    // Use a function for className to apply active state
                    className={({ isActive }) =>
                        // If active, use active classes. If not active, use inactive and hover classes.
                        `${baseClasses} ${isActive ? activeClasses : `${inactiveClasses} ${hoverClasses}`}`
                    }
                    end
                    style={styleProps}
                >
                    {item.text}
                </NavLink>
            );
        } else {
            // Standard 'a' tag for non-routed links
            return (
                <a
                    key={item.text}
                    href={item.href}
                    onClick={handleDrawerToggle}
                    className={`${baseClasses} ${inactiveClasses} ${hoverClasses}`}
                    style={styleProps}
                >
                    {item.text}
                </a>
            );
        }
    };
    // ----------------------------

    return (
        <>
            <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: "white" }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters className="flex justify-between">
                        {/* Logo - Wrap with NavLink to go to home */}
                        <NavLink to="/">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/images/hexapure_logo.png"
                                    alt="Hexapure Logo"
                                    className="h-10 w-auto"
                                />
                            </div>
                        </NavLink>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
                            {menuItems.map(renderDesktopLink)}
                        </div>

                        {/* Mobile Menu Button - unchanged */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{
                                display: { md: "none" },
                                color: "#2A2A2A",
                                transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                        >
                            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    </Toolbar>
                </Container>

                {/* Mobile Slide-down Menu */}
                <Collapse
                    in={mobileOpen}
                    timeout={400}
                    sx={{
                        display: { md: "none" },
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1300
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "white",
                            borderTop: 1,
                            borderColor: '#E5E5E5',
                            boxShadow: 2,
                            py: 1
                        }}
                    >
                        <Container maxWidth="lg">
                            {menuItems.map(renderMobileLink)}
                        </Container>
                    </Box>
                </Collapse>
            </AppBar>
        </>
    );
};

export default TopNavbar;