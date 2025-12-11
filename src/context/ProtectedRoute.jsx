// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx'; // Import the custom hook

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    // If there is no user, redirect to the login page
    if (!currentUser) {
        return <Navigate to="/admin/login" replace />;
    }

    // Otherwise, render the children (the protected page)
    return children;
};

export default ProtectedRoute;