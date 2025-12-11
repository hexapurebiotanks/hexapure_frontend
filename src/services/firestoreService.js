// utils/firestoreService.js
import { db } from '../firebase/config.js';
import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    where
} from 'firebase/firestore';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CACHE_KEYS = {
    CONTACTS: 'cached_contacts',
    USERS: 'cached_users',
    STATS: 'cached_stats'
};

// Helper functions for caching
const getCachedData = (key) => {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    } catch (error) {
        console.error('Error reading cache:', error);
        return null;
    }
};

const setCachedData = (key, data) => {
    try {
        const cache = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(cache));
    } catch (error) {
        console.error('Error setting cache:', error);
    }
};

export const addContact = async (contactData) => {
    try {
        const docRef = await addDoc(collection(db, 'contacts'), {
            ...contactData,
            createdAt: serverTimestamp(),
            status: 'new'
        });
        console.log('Registration saved with ID: ', docRef.id);

        // Invalidate contacts cache since we added new data
        localStorage.removeItem(CACHE_KEYS.CONTACTS);
        localStorage.removeItem(CACHE_KEYS.STATS);

        return docRef.id;
    } catch (error) {
        console.error('Error while registering: ', error);
        throw error;
    }
};

// Real-time contacts listener with caching
export const subscribeToContacts = (callback) => {
    // Try to get cached data first
    const cachedContacts = getCachedData(CACHE_KEYS.CONTACTS);
    if (cachedContacts) {
        callback(cachedContacts);
    }

    const q = query(
        collection(db, 'contacts'),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
        const contacts = [];
        querySnapshot.forEach((doc) => {
            contacts.push({
                id: doc.id,
                ...doc.data(),
                // Convert Firestore timestamp to readable date
                date: doc.data().createdAt?.toDate?.().toISOString().split('T')[0] || 'N/A'
            });
        });

        // Update cache
        setCachedData(CACHE_KEYS.CONTACTS, contacts);
        callback(contacts);
    });
};

// Real-time users listener with caching
export const subscribeToUsers = (callback) => {
    const cachedUsers = getCachedData(CACHE_KEYS.USERS);
    if (cachedUsers) {
        callback(cachedUsers);
    }

    const q = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data()
            });
        });

        setCachedData(CACHE_KEYS.USERS, users);
        callback(users);
    });
};

// Stats calculation with caching
export const subscribeToStats = (callback) => {
    const cachedStats = getCachedData(CACHE_KEYS.STATS);
    if (cachedStats) {
        callback(cachedStats);
    }

    const unsubscribeContacts = subscribeToContacts((contacts) => {
        const stats = calculateStats(contacts);
        setCachedData(CACHE_KEYS.STATS, stats);
        callback(stats);
    });

    return unsubscribeContacts;
};

const calculateStats = (contacts) => {
    const totalUsers = contacts.length;
    const newRegistrations = contacts.filter(contact =>
        contact.status === 'new'
    ).length;
    const contacted = contacts.filter(contact =>
        contact.status === 'contacted' || contact.status === 'resolved'
    ).length;
    const pending = contacts.filter(contact =>
        contact.status === 'pending'
    ).length;

    return {
        totalUsers,
        newRegistrations,
        contacted,
        pending
    };
};