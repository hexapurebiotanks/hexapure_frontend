import React, { useState } from 'react';
import { WhatsApp, Phone, ChatBubbleOutlined, Close, SupportAgent } from '@mui/icons-material';



const FloatingActionMenu = ({ onContactClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleWhatsAppClick = () => {
        // Replace with your WhatsApp number
        window.open('https://wa.me/8903488003', '_blank');
    };

    const handleContactClick = () => {
        if (onContactClick) {
            onContactClick();
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {/* Floating Action Menu Items */}
            <div className={`
                flex flex-col items-center space-y-4 mb-4 
                transition-all duration-300 ease-in-out
                ${isOpen
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible translate-y-4'
            }
            `}>
                {/* WhatsApp Button */}
                <button
                    onClick={handleWhatsAppClick}
                    className="
                        w-14 h-14
                        bg-green-500 hover:bg-green-600
                        text-white
                        rounded-full
                        flex items-center justify-center
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        hover:scale-110
                    "
                    title="WhatsApp"
                >
                    <WhatsApp className="text-2xl" />
                </button>

                {/* Contact Button */}
                <button
                    onClick={handleContactClick}
                    className="
                        w-14 h-14
                        bg-gray-600 hover:bg-gray-700
                        text-white
                        rounded-full
                        flex items-center justify-center
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        hover:scale-110
                    "
                    title="Contact"
                >
                    <Phone className="text-2xl" />
                </button>
            </div>

            {/* Main Floating Action Button */}
            <button
                onClick={toggleMenu}
                className="
                    w-16 h-16
                    bg-primary hover:bg-primary-dark
                    text-white
                    rounded-full
                    flex items-center justify-center
                    shadow-lg hover:shadow-xl
                    transition-all duration-300
                    hover:scale-110
                "
                title="Quick Actions"
            >
                {isOpen ? (
                    <Close className="text-2xl" />
                ) : (
                    <SupportAgent className="text-2xl" />
                )}
            </button>
        </div>
    );
};

export default FloatingActionMenu;
