import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {/* Logo */}
                <div className="mb-6">
                    <img
                        src="/images/hexapure_logo.png"
                        alt="Hexapure Logo"
                        className="h-12 w-auto mx-auto mb-4"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/100x40/FFFFFF/333333?text=HEXAPURE";
                        }}
                    />
                </div>

                {/* Welcome Message */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Welcome to Hexapure!
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Thank you for registering with us. Your account has been successfully created.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <p className="text-green-800 text-sm">
                            Your registration is complete. You can now explore our website and contact us for any inquiries about our eco-friendly wastewater solutions.
                        </p>
                    </div>
                </div>

                {/* User Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Information</h3>
                    <p className="text-gray-600 text-sm">
                        <strong>Email:</strong> {currentUser?.email}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <strong>Role:</strong> User
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                    >
                        Explore Our Website
                    </button>
                    <button
                        onClick={() => navigate('/contact-us')}
                        className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                    >
                        Contact Us
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm"
                    >
                        Logout
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-xs">
                        Hexapure - Leaders in Eco-Friendly Wastewater Solutions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
