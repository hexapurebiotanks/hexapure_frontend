// AuthContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lazy load Firebase ONLY when needed
  const loadFirebase = useCallback(async () => {
    const [
      { initFirebase },
      {
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        updateProfile
      },
      { doc, setDoc }
    ] = await Promise.all([
      import("../firebase/config"),
      import("firebase/auth"),
      import("firebase/firestore")
    ]);

    const { auth, db } = initFirebase();
    return { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, doc, setDoc };
  }, []);

  // SIGN UP
  const signup = async (email, password, name) => {
    setLoading(true);
    try {
      const {
        auth,
        db,
        createUserWithEmailAndPassword,
        updateProfile,
        doc,
        setDoc
      } = await loadFirebase();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName: name });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        role: "user",
        status: "active",
        createdAt: new Date().toISOString()
      });

      setCurrentUser(userCredential.user);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { auth, signInWithEmailAndPassword } = await loadFirebase();
      const result = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    setLoading(true);
    try {
      const { auth, signOut } = await loadFirebase();
      await signOut(auth);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};








// // AuthContext.jsx (UPDATED - DELAYED FIREBASE LOADING FOR PERFORMANCE)
// import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// // Create the context
// const AuthContext = createContext();

// // Custom hook to use the auth context
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// // Provider component
// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [firebaseLoaded, setFirebaseLoaded] = useState(false);
//     const [firebaseAuth, setFirebaseAuth] = useState(null);
//     const [firebaseDb, setFirebaseDb] = useState(null);

//     // Lazy load Firebase only when needed
//     const loadFirebase = useCallback(async () => {
//         if (firebaseLoaded) return { auth: firebaseAuth, db: firebaseDb };

//         try {
//             // Dynamically import Firebase modules
//             const [
//                 { initializeApp },
//                 { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile },
//                 { getFirestore, doc, setDoc }
//             ] = await Promise.all([
//                 import('firebase/app'),
//                 import('firebase/auth'),
//                 import('firebase/firestore')
//             ]);

//             // Import Firebase config
//             const { firebaseConfig } = await import('../firebase/config.js');

//             // Initialize Firebase
//             const app = initializeApp(firebaseConfig);
//             const auth = getAuth(app);
//             const db = getFirestore(app);

//             setFirebaseAuth(auth);
//             setFirebaseDb(db);
//             setFirebaseLoaded(true);

//             return { auth, db };
//         } catch (error) {
//             console.error('Failed to load Firebase:', error);
//             throw error;
//         }
//     }, [firebaseLoaded, firebaseAuth, firebaseDb]);

//     // 1. Firebase Sign Up - Load Firebase first
//     const signup = async (email, password, name) => {
//         const { auth, db } = await loadFirebase();
//         setLoading(true);

//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Set display name
//             await updateProfile(user, { displayName: name });

//             // Create user document in Firestore
//             await setDoc(doc(db, "users", user.uid), {
//                 uid: user.uid,
//                 name: name,
//                 email: email,
//                 role: 'user',
//                 status: 'active',
//                 createdAt: new Date().toISOString(),
//             });

//             return userCredential;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 2. Firebase Log In - Load Firebase first
//     const login = async (email, password) => {
//         const { auth } = await loadFirebase();
//         setLoading(true);

//         try {
//             return await signInWithEmailAndPassword(auth, email, password);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 3. Firebase Log Out - Load Firebase first
//     const logout = async () => {
//         const { auth } = await loadFirebase();
//         setLoading(true);

//         try {
//             return await signOut(auth);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 4. Set up Auth State Listener - Only after Firebase is loaded
//     useEffect(() => {
//         let unsubscribe = () => {};

//         const initAuth = async () => {
//             try {
//                 const { auth } = await loadFirebase();

//                 const unsubscribeFn = onAuthStateChanged(auth, user => {
//                     setCurrentUser(user);
//                     setLoading(false);
//                 }, (error) => {
//                     console.error('Auth state change error:', error);
//                     setLoading(false);
//                 });

//                 unsubscribe = unsubscribeFn;
//             } catch (error) {
//                 console.error('Failed to initialize auth:', error);
//                 setLoading(false);
//             }
//         };

//         // Only initialize if user interacts with auth-related features
//         // For now, we'll initialize immediately but this could be delayed further
//         initAuth();

//         return () => unsubscribe();
//     }, [loadFirebase]);

//     // The context value that will be exposed to consumers
//     const value = {
//         currentUser,
//         login,
//         signup,
//         logout,
//         loading
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
