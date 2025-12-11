import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { Home, ArrowBack } from '@mui/icons-material';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center">
                {/* Lottie Animation */}
                <div className="w-96 h-96 mx-auto mb-8">
                    <Lottie
                        animationData={null}
                        path="/animations/404.json"
                        loop={true}
                        autoplay={true}
                        className="w-full h-full"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2"
                    >
                        <ArrowBack />
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2"
                    >
                        <Home />
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;