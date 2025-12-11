import React, { useState, useEffect } from 'react';
import { KeyboardArrowUp } from '@mui/icons-material';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="
                        fixed bottom-8 left-8 z-40
                        w-12 h-12
                        bg-primary hover:bg-primary-dark
                        text-white
                        rounded-full
                        flex items-center justify-center
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        hover:scale-110
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    "
                    aria-label="Scroll to top"
                    title="Scroll to top"
                >
                    <KeyboardArrowUp className="text-xl" />
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
