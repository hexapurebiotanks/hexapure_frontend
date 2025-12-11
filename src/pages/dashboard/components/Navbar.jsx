// Navbar.jsx (UPDATED)
import React, { useState, useRef, useEffect } from 'react';
import { Search,  Logout } from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext.jsx'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({ searchQuery, onSearchChange }) => {
    // 1. Get Auth Context and Navigation
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // State for the profile dropdown menu
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const profileButtonRef = useRef(null);

    // Get the user's initials for the avatar display
    const userInitials = currentUser?.displayName
        ? currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : 'AD'; // Default to 'AD' (Admin) if no display name

    // Toggle menu visibility
    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(prev => !prev);
    };

    // 2. Handle Logout
    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileMenuOpen(false); // Close menu
            navigate('/admin/login'); // Redirect to login page
        } catch (error) {
            console.error("Failed to log out:", error);
            // Optionally display a logout error message
        }
    };

    // Close the dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target) &&
                profileButtonRef.current &&
                !profileButtonRef.current.contains(event.target)
            ) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center h-16 px-4 sm:px-6 bg-white shadow-sm border-b">
                {/* Left Side - Logo */}
                <div className="flex items-center">
                    <img
                        src="/images/hexapure_logo.png"
                        alt="Company Logo"
                        className="h-8 w-auto"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    {/* Fallback if logo doesn't exist */}
                    <div className="hidden bg-indigo-600 text-white font-bold text-lg px-3 py-1 rounded">
                        LOGO
                    </div>
                </div>

                {/* Search Input - Hidden on mobile, visible on medium screens and up */}
                <div className="hidden md:block relative w-72 mx-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Right Side - Icons and Profile Menu */}
                <div className="flex items-center space-x-3 sm:space-x-6">

                    <div className="relative">
                        <button
                            ref={profileButtonRef}
                            onClick={toggleProfileMenu}
                            className="flex items-center space-x-1 sm:space-x-2 cursor-pointer focus:outline-none"
                        >
                            {/* User Avatar (Initials) */}
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                                {userInitials}
                            </div>
                            {/* User Display Name */}
                            <span className="hidden sm:block text-sm font-medium text-gray-700">
                                {currentUser?.displayName || 'Admin User'}
                            </span>
                        </button>

                        {/* Profile Dropdown Menu */}
                        {isProfileMenuOpen && (
                            <div
                                ref={profileMenuRef}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
                            >
                                {/* Display User Email */}
                                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100 truncate">
                                    {currentUser?.email || 'admin@example.com'}
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition duration-150"
                                >
                                    <Logout className="mr-3 h-4 w-4" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar - Always visible on mobile */}
            <div className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white border-b px-4 py-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
        </>
    );
};

export default TopNavbar;
