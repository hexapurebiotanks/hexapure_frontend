// auth.jsx (UPDATED WITH ROLE-BASED AUTHENTICATION)
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// New Import: Assuming AuthContext is located two levels up in a 'context' folder.
// Adjust this path if your file structure is different (e.g., './AuthContext.jsx' if in the same folder)
import { useAuth } from '../../context/AuthContext.jsx';
// Firestore imports for role checking
import { doc, getDoc } from 'firebase/firestore';
// Using MUI Icons as requested
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // For Confirm Password
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // For Name
// *** NEW ICON IMPORTS FOR SHOW/HIDE PASSWORD ***
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Use Firebase auth functions (signup, login, and currentUser state)
    const { signup, login, currentUser } = useAuth();

    // Determine initial mode based on route
    const initialMode = location.pathname === '/admin/create' ? false : true;
    const [isLoginMode, setIsLoginMode] = useState(initialMode);

    // Consolidated Form State (used for both modes)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // *** NEW STATE FOR SHOW PASSWORD FEATURE ***
    const [showPassword, setShowPassword] = useState(false);

    // Toggle function for the new state
    const handleShowPasswordToggle = () => {
        setShowPassword(prev => !prev);
    };

    // Redirect based on user role
    useEffect(() => {
        const checkUserRoleAndRedirect = async () => {
            if (currentUser) {
                try {
                    const { initFirebase } = await import("../../firebase/config");
                    const { db } = initFirebase();
                    // Get user document from Firestore
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const userRole = userData.role;

                        if (userRole === 'admin') {
                            navigate('/admin/dashboard', { replace: true });
                        } else if (userRole === 'user') {
                            // Users are redirected to a user page that shows only a message
                            navigate('/user/dashboard', { replace: true });
                        }
                    }
                } catch (error) {
                    console.error('Error checking user role:', error);
                    // Default to user dashboard if error
                    navigate('/user/dashboard', { replace: true });
                }
            }
        };

        checkUserRoleAndRedirect();
    }, [currentUser, navigate]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);

        const isFormValid = () => {
            if (!isLoginMode) {
                if (password !== confirmPassword) {
                    setError("Passwords do not match.");
                    return false;
                }
                if (password.length < 6) {
                    setError("Password must be at least 6 characters.");
                    return false;
                }
            }
            return true;
        };

        if (!isFormValid()) {
            setIsLoading(false);
            return;
        }

        try {
            if (isLoginMode) {
                // *** FIREBASE LOGIN (AuthContext handles the actual Firebase call) ***
                await login(email, password);
                setSuccessMessage('Login Successful! Redirecting to Dashboard...');
                // Redirection is handled by the useEffect above
            } else {
                // *** FIREBASE SIGNUP (AuthContext handles Auth user creation AND Firestore write) ***
                await signup(email, password, name);
                setSuccessMessage('Account created successfully! Redirecting to login...');

                // Clear form state on success
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setShowPassword(false); // Reset show password state

                // Switch to login mode after successful registration
                navigate('/admin/login');
            }
        } catch (err) {
            // Firebase error handling
            const errorCode = err.code;
            let friendlyError = 'An unexpected error occurred. Please try again.';

            if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
                friendlyError = 'Invalid email or password.';
            } else if (errorCode === 'auth/email-already-in-use') {
                friendlyError = 'Registration Failed: This email is already in use.';
            } else if (errorCode === 'auth/weak-password') {
                friendlyError = 'Password is too weak. Must be at least 6 characters.';
            } else {
                friendlyError = err.message; // Fallback for other errors
            }

            setError(friendlyError);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle mode toggle with navigation
    const handleModeToggle = () => {
        const newMode = !isLoginMode;
        setIsLoginMode(newMode);

        // Navigate to appropriate route
        if (newMode) {
            navigate('/admin/login');
        } else {
            navigate('/admin/create');
        }

        // Clear form state and messages
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        setSuccessMessage('');
        setShowPassword(false); // Reset show password state
    };

    // Placeholder image URL inferred from TopNavbar.jsx
    const logoSrc = "/images/hexapure_logo.png";

    // Dynamic Title and Button Text
    const title = isLoginMode ? 'Sign In' : 'Create Account';
    const buttonText = isLoginMode ? 'Sign In' : 'Register';

    // The shared input styling classes
    // *** UPDATED: Added 'pr-10' to inputClasses for toggle button space ***
    const inputClasses = "w-full pl-10 pr-10 py-3 border border-gray-200 bg-background rounded-md focus:ring-1 focus:ring-primary focus:border-primary transition duration-150 text-charcoal shadow-sm text-sm placeholder-text-light";
    const iconWrapperClasses = "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none";
    const iconClasses = "w-5 h-5 text-text-dark/40";
    // *** NEW CLASS FOR THE TOGGLE BUTTON WRAPPER ***
    const toggleButtonClasses = "absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer";

    return (
        // Outer container: Full screen, centered, using bg-background for contrast
        <div className="h-screen flex items-center justify-center  p-4 sm:p-6">
            {/* Inner Container: Max width for minimalism, no shadows or borders */}
            <div className="w-full max-w-md sm:max-w-s  p-6 sm:p-8 rounded-lg shadow-2xl bg-white/95 backdrop-blur-sm border border-gray-100">

                {/* Header Section (Minimalist & Compact) */}
                <div className="text-center mb-6">
                    <img
                        src="/.netlify/images?url=/images/hexapure_logo.png&w=200&fm=webp"
                        alt="App Logo"
                        className="h-10 w-auto mx-auto mb-3"
                        loading="eager"
                        width="200"
                        height="50"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x40/FFFFFF/333333?text=APP"; }}
                    />
                    <h2 className="text-xl font-bold text-text-dark tracking-tight">
                        {title}
                    </h2>
                </div>

                {/* Form Section */}
                <form onSubmit={handleFormSubmit}>

                    {/* Status Messages */}
                    {(error || successMessage) && (
                        <div className={`p-3 mb-4 rounded-md text-sm transition-all duration-300 ${
                            error ? 'bg-red-50 border border-red-400 text-red-700' : 'bg-green-50 border border-green-400 text-green-700'
                        }`}>
                            {error || successMessage}
                        </div>
                    )}

                    {/* Conditional Form Content */}
                    {isLoginMode ? (
                        // Login Content
                        <div className="space-y-4">

                            {/* Email Input */}
                            <div className="relative">
                                <div className={iconWrapperClasses}>
                                    <AccountCircleIcon className={iconClasses} style={{ fontSize: 20 }} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className={inputClasses}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Input (UPDATED) */}
                            <div className="relative">
                                {/* Icon on the left */}
                                <div className={iconWrapperClasses}>
                                    <LockOutlinedIcon className={iconClasses} style={{ fontSize: 20 }} />
                                </div>
                                {/* The actual input field */}
                                <input
                                    // *** CONDITIONALLY SET INPUT TYPE ***
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className={inputClasses}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {/* Toggle Button on the right */}
                                <div className={toggleButtonClasses} onClick={handleShowPasswordToggle}>
                                    {showPassword ? (
                                        <VisibilityOffIcon className={iconClasses} style={{ fontSize: 20 }} />
                                    ) : (
                                        <VisibilityIcon className={iconClasses} style={{ fontSize: 20 }} />
                                    )}
                                </div>
                            </div>

                            {/* Forgot Password Link (Minimalist) */}
                            <div className="flex justify-end text-xs pt-1">
                                <NavLink
                                    to="/forgot-password"
                                    className="font-medium text-text-dark hover:text-primary transition duration-200"
                                >
                                    Forgot Password?
                                </NavLink>
                            </div>
                        </div>
                    ) : (
                        // Register Content
                        <div className="space-y-4">

                            {/* Name Input */}
                            <div className="relative">
                                <div className={iconWrapperClasses}>
                                    <PersonOutlineIcon className={iconClasses} style={{ fontSize: 20 }} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className={inputClasses}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <div className={iconWrapperClasses}>
                                    <EmailIcon className={iconClasses} style={{ fontSize: 20 }} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className={inputClasses}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Input (UPDATED) */}
                            <div className="relative">
                                {/* Icon on the left */}
                                <div className={iconWrapperClasses}>
                                    <LockOutlinedIcon className={iconClasses} style={{ fontSize: 20 }} />
                                </div>
                                {/* The actual input field */}
                                <input
                                    // *** CONDITIONALLY SET INPUT TYPE ***
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password (min 6 chars)"
                                    className={inputClasses}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {/* Toggle Button on the right */}
                                <div className={toggleButtonClasses} onClick={handleShowPasswordToggle}>
                                    {showPassword ? (
                                        <VisibilityOffIcon className={iconClasses} style={{ fontSize: 20 }} />
                                    ) : (
                                        <VisibilityIcon className={iconClasses} style={{ fontSize: 20 }} />
                                    )}
                                </div>
                            </div>

                            {/* Confirm Password Input (UPDATED) */}
                            <div className="relative">
                                {/* Icon on the left */}
                                <div className={iconWrapperClasses}>
                                    <VpnKeyIcon className={iconClasses} style={{ fontSize: 20 }} />
                                </div>
                                {/* The actual input field */}
                                <input
                                    // *** CONDITIONALLY SET INPUT TYPE (For Confirm Password) ***
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    className={inputClasses}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                {/* Toggle Button on the right (Reusing the same toggle for both password fields) */}
                                <div className={toggleButtonClasses} onClick={handleShowPasswordToggle}>
                                    {showPassword ? (
                                        <VisibilityOffIcon className={iconClasses} style={{ fontSize: 20 }} />
                                    ) : (
                                        <VisibilityIcon className={iconClasses} style={{ fontSize: 20 }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-2 px-2 rounded-md font-bold text-white transition duration-300 shadow-md mt-6 ${
                            isLoading
                                ? 'bg-primary-dark opacity-75 cursor-not-allowed'
                                : 'bg-primary hover:bg-primary-dark active:scale-[0.99] shadow-primary/40'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>{isLoginMode ? 'Signing In...' : 'Registering...'}</span>
                            </div>
                        ) : (
                            buttonText
                        )}
                    </button>
                </form>

                {/* Footer Link (Toggle between forms) */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-text-dark">
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                        <button
                            type="button"
                            onClick={handleModeToggle}
                            className="ml-1 font-semibold text-accent hover:text-primary-dark transition duration-200"
                        >
                            {isLoginMode ? "Create Account" : "Sign In"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
