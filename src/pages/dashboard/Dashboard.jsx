// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import StatCard from './components/StatCard';
import UsersTable from './components/Table.jsx';
import TopNavbar from './components/Navbar.jsx';
import {
    subscribeToContacts,
    subscribeToUsers,
    subscribeToStats
} from '../../services/firestoreService.js';
import { People, Email, CheckCircle, Pending } from '@mui/icons-material';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('registrations');
    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        newRegistrations: 0,
        contacted: 0,
        pending: 0
    });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Set up real-time listeners
        const setupListeners = async () => {
            const unsubscribeContacts = await subscribeToContacts((data) => {
                setContacts(data);
                setLoading(false);
            });

            const unsubscribeUsers = await subscribeToUsers((data) => {
                setUsers(data);
            });

            const unsubscribeStats = await subscribeToStats((data) => {
                setStats(data);
            });

            // Cleanup function
            return () => {
                unsubscribeContacts();
                unsubscribeUsers();
                unsubscribeStats();
            };
        };

        const cleanup = setupListeners();

        // Cleanup function
        return () => {
            cleanup.then(cleanupFn => cleanupFn && cleanupFn());
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E8B57] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <TopNavbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <main className="pt-16 p-4 sm:p-6 mt-9 md:p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 mt-12 md:mt-6 lg:mt-6">
                    <StatCard
                        title="Total Enquires"
                        value={stats.totalUsers.toString()}
                        subText="From contact forms"
                        icon={<People className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />}
                        colorClass="text-purple-600"
                    />
                    <StatCard
                        title="New Enquires"
                        value={stats.newRegistrations.toString()}
                        subText="Require attention"
                        icon={<Email className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
                        colorClass="text-green-600"
                    />
                    <StatCard
                        title="Contacted Enquires"
                        value={stats.contacted.toString()}
                        subText={`${stats.totalUsers ? Math.round((stats.contacted / stats.totalUsers) * 100) : 0}% of total`}
                        icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
                        colorClass="text-blue-600"
                    />
                    <StatCard
                        title="Pending Enquires"
                        value={stats.pending.toString()}
                        subText="Need follow-up"
                        icon={<Pending className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />}
                        colorClass="text-pink-600"
                    />
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('registrations')}
                                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'registrations'
                                        ? 'border-[#2E8B57] text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Enquires ({contacts.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'users'
                                        ? 'border-[#2E8B57] text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                User Management ({users.length})
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Table */}
                <UsersTable
                    activeTab={activeTab}
                    contacts={contacts}
                    users={users}
                    searchQuery={searchQuery}
                />
            </main>
        </div>
    );
};

export default Dashboard;
