// AuthContext.jsx (UPDATED)
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
// ** NEW: Firestore Imports **
import { doc, setDoc } from 'firebase/firestore';
// ** UPDATED: Import auth and db (Firestore) **
// You may need to adjust the path to your config.js
import { auth, db } from '../firebase/config.js' ;

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Firebase Sign Up - UPDATED to write to Firestore
    const signup = (email, password, name) => {
        // Create user with email and password
        return createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // 1a. Set display name on the Firebase Auth user object
                await updateProfile(user, {
                    displayName: name
                });

                // 1b. Create a document in the 'users' Firestore collection
                // The document ID is set to the Firebase Auth user's UID (user.uid)
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: name,
                    email: email,
                    role: 'user', // Default role
                    status: 'active', // ** User account status set to active **
                    createdAt: new Date().toISOString(),
                });

                return userCredential; // Return the user credential to the caller
            });
    };

    // 2. Firebase Log In
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // 3. Firebase Log Out
    const logout = () => {
        return signOut(auth);
    };

    // 4. Set up Auth State Listener
    useEffect(() => {
        // Add a timeout to prevent infinite loading
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 10000); // 10 second timeout

        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
            clearTimeout(loadingTimeout);
        }, (error) => {
            console.error('Auth state change error:', error);
            setLoading(false);
            clearTimeout(loadingTimeout);
        });

        return () => {
            unsubscribe();
            clearTimeout(loadingTimeout);
        };
    }, []);

    // The context value that will be exposed to consumers
    const value = {
        currentUser,
        login,
        signup,
        logout,
        auth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
