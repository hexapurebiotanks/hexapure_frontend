// Table.jsx (Updated to use real data)
import React, { useState } from 'react';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config.js';
import { MoreVert, Edit, Delete, Close } from '@mui/icons-material';

const UsersTable = ({ activeTab, contacts, users, searchQuery }) => {
    const [localContacts, setLocalContacts] = useState(contacts);
    const [localUsers, setLocalUsers] = useState(users);

    // Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);

    // Edit form state
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        role: 'user',
        status: 'active'
    });

    // Date filter state
    const [dateFilter, setDateFilter] = useState({
        fromDate: '',
        toDate: ''
    });

    // Export function
    const exportToCSV = (data) => {
        if (data.length === 0) {
            alert('No data to export');
            return;
        }

        const headers = ['Name', 'Email', 'Company', 'Phone', 'Subject', 'Message', 'Status', 'Date'];
        const csvContent = [
            headers.join(','),
            ...data.map(item => [
                `"${item.name || ''}"`,
                `"${item.email || ''}"`,
                `"${item.company || ''}"`,
                `"${item.phone || ''}"`,
                `"${item.subject || ''}"`,
                `"${item.message || ''}"`,
                `"${item.status || ''}"`,
                `"${item.date || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `enquiries_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Update local state when props change
    React.useEffect(() => {
        setLocalContacts(contacts);
    }, [contacts]);

    React.useEffect(() => {
        setLocalUsers(users);
    }, [users]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            // Optimistic update
            setLocalContacts(prevContacts =>
                prevContacts.map(contact =>
                    contact.id === id ? { ...contact, status: newStatus } : contact
                )
            );

            // Update in Firestore
            await updateDoc(doc(db, 'contacts', id), {
                status: newStatus,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('Error updating status:', error);
            // Revert optimistic update on error
            setLocalContacts(contacts);
        }
    };

    const handleUserStatusChange = async (id, newStatus) => {
        try {
            setLocalUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === id ? { ...user, status: newStatus } : user
                )
            );

            await updateDoc(doc(db, 'users', id), {
                status: newStatus,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('Error updating user status:', error);
            setLocalUsers(users);
        }
    };

    const handleUserRoleChange = async (id, newRole) => {
        try {
            setLocalUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === id ? { ...user, role: newRole } : user
                )
            );

            await updateDoc(doc(db, 'users', id), {
                role: newRole,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error('Error updating user role:', error);
            setLocalUsers(users);
        }
    };

    // Check if user can be deleted (prevent deleting last admin)
    const canDeleteUser = (user) => {
        if (user.role !== 'admin') return true;
        const adminCount = localUsers.filter(u => u.role === 'admin').length;
        return adminCount > 1;
    };

    // Handle edit user
    const handleEditUser = (user) => {
        setEditingUser(user);
        setEditForm({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });
        setShowEditModal(true);
        setDropdownOpen(null);
    };

    // Handle delete user
    const handleDeleteUser = (user) => {
        setDeletingItem({ type: 'user', item: user });
        setShowDeleteModal(true);
        setDropdownOpen(null);
    };

    // Handle delete contact
    const handleDeleteContact = (contact) => {
        setDeletingItem({ type: 'contact', item: contact });
        setShowDeleteModal(true);
    };

    // Confirm delete
    const confirmDelete = async () => {
        // Close modal immediately for better UX
        setShowDeleteModal(false);
        const itemToDelete = deletingItem;
        setDeletingItem(null);

        try {
            if (itemToDelete.type === 'user') {
                // Optimistic update - remove from UI immediately
                setLocalUsers(prevUsers => prevUsers.filter(user => user.id !== itemToDelete.item.id));
                // Then delete from Firestore
                await deleteDoc(doc(db, 'users', itemToDelete.item.id));
            } else if (itemToDelete.type === 'contact') {
                // Optimistic update - remove from UI immediately
                setLocalContacts(prevContacts => prevContacts.filter(contact => contact.id !== itemToDelete.item.id));
                // Then delete from Firestore
                await deleteDoc(doc(db, 'contacts', itemToDelete.item.id));
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            // Revert optimistic update on error
            if (itemToDelete.type === 'user') {
                setLocalUsers(prevUsers => [...prevUsers, itemToDelete.item]);
            } else if (itemToDelete.type === 'contact') {
                setLocalContacts(prevContacts => [...prevContacts, itemToDelete.item]);
            }
        }
    };

    // Handle edit form submission
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, 'users', editingUser.id), {
                name: editForm.name,
                email: editForm.email,
                role: editForm.role,
                status: editForm.status,
                updatedAt: new Date()
            });

            setLocalUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === editingUser.id
                        ? { ...user, ...editForm }
                        : user
                )
            );

            setShowEditModal(false);
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Toggle dropdown
    const toggleDropdown = (userId) => {
        setDropdownOpen(dropdownOpen === userId ? null : userId);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest('.dropdown-container')) {
                setDropdownOpen(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            new: { color: 'bg-blue-100 text-blue-800', label: 'New' },
            contacted: { color: 'bg-yellow-100 text-yellow-800', label: 'Contacted' },
            pending: { color: 'bg-orange-100 text-orange-800', label: 'Pending' },
            resolved: { color: 'bg-green-100 text-green-800', label: 'Resolved' },
            active: { color: 'bg-green-100 text-green-800', label: 'Active' },
            inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' }
        };

        const config = statusConfig[status] || statusConfig.new;
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
        );
    };

    const getRoleBadge = (role) => {
        const roleConfig = {
            admin: { color: 'bg-purple-100 text-purple-800', label: 'Admin' },
            user: { color: 'bg-gray-100 text-gray-800', label: 'User' },
            moderator: { color: 'bg-blue-100 text-blue-800', label: 'Moderator' }
        };

        const config = roleConfig[role] || roleConfig.user;
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
        );
    };

    // Filter data based on search query and date filter
    const filteredContacts = localContacts.filter(contact => {
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesSearch = (
                contact.name?.toLowerCase().includes(query) ||
                contact.email?.toLowerCase().includes(query) ||
                contact.company?.toLowerCase().includes(query) ||
                contact.status?.toLowerCase().includes(query)
            );
            if (!matchesSearch) return false;
        }

        // Date filter
        if (dateFilter.fromDate || dateFilter.toDate) {
            const contactDate = new Date(contact.createdAt?.toDate?.() || contact.createdAt);
            if (isNaN(contactDate.getTime())) return true; // Skip if invalid date

            if (dateFilter.fromDate) {
                const fromDate = new Date(dateFilter.fromDate);
                if (contactDate < fromDate) return false;
            }

            if (dateFilter.toDate) {
                const toDate = new Date(dateFilter.toDate);
                toDate.setHours(23, 59, 59, 999); // End of day
                if (contactDate > toDate) return false;
            }
        }

        return true;
    });

    const filteredUsers = localUsers.filter(user => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            user.name?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.role?.toLowerCase().includes(query)
        );
    });

    const renderTable = () => {
        if (activeTab === 'registrations') {
            return (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 border-b">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                New Enquires ({filteredContacts.length}{searchQuery || dateFilter.fromDate || dateFilter.toDate ? ` of ${localContacts.length}` : ''})
                            </h3>

                            {/* Date Filter and Export Controls */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Date Filter */}
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">From:</label>
                                    <input
                                        type="date"
                                        value={dateFilter.fromDate}
                                        onChange={(e) => setDateFilter({...dateFilter, fromDate: e.target.value})}
                                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <label className="text-sm font-medium text-gray-700">To:</label>
                                    <input
                                        type="date"
                                        value={dateFilter.toDate}
                                        onChange={(e) => setDateFilter({...dateFilter, toDate: e.target.value})}
                                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Export Button */}
                                <button
                                    onClick={() => exportToCSV(filteredContacts)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export CSV
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead>
                            <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Company</th>
                                <th className="px-6 py-3 text-left">Subject</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {filteredContacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {contact.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {contact.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {contact.company}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {contact.subject}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {contact.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(contact.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={contact.status}
                                            onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 mr-2"
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="pending">Pending</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                        <button
                                            onClick={() => handleDeleteContact(contact)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded"
                                            title="Delete enquiry"
                                        >
                                            <Delete className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {localContacts.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No contact Enquires found
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-800 p-6 border-b">
                    User Management ({filteredUsers.length}{searchQuery ? ` of ${localUsers.length}` : ''})
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead>
                        <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Role</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-left">Registration Date</th>
                            <th className="px-6 py-3 text-left">Last Login</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getRoleBadge(user.role)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(user.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {user.createdAt?.split('T')[0] || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {user.lastLogin || 'Never'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 relative">
                                    <div className="relative dropdown-container">
                                        <button
                                            onClick={() => toggleDropdown(user.id)}
                                            className="p-1 rounded hover:bg-gray-200"
                                            title="More actions"
                                        >
                                            <MoreVert className="w-4 h-4" />
                                        </button>

                                        {dropdownOpen === user.id && (
                                            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 dropdown-container">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    disabled={!canDeleteUser(user)}
                                                    className={`flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 ${
                                                        canDeleteUser(user)
                                                            ? 'text-red-600 hover:bg-red-50'
                                                            : 'text-gray-400 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <Delete className="w-4 h-4 mr-2" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {localUsers.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No users found
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            {renderTable()}

            {/* Edit User Modal */}
            {showEditModal && editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Edit User</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <Close className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <select
                                        value={editForm.role}
                                        onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="moderator">Moderator</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && deletingItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <Delete className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Delete Confirmation</h3>
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this {deletingItem.type}?
                                </p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="bg-gray-50 rounded p-3">
                                {deletingItem.type === 'user' ? (
                                    <div>
                                        <p className="font-medium">{deletingItem.item.name}</p>
                                        <p className="text-sm text-gray-600">{deletingItem.item.email}</p>
                                        <p className="text-sm text-gray-600">Role: {deletingItem.item.role}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="font-medium">{deletingItem.item.name}</p>
                                        <p className="text-sm text-gray-600">{deletingItem.item.email}</p>
                                        <p className="text-sm text-gray-600">Subject: {deletingItem.item.subject}</p>
                                    </div>
                                )}
                            </div>
                            {deletingItem.type === 'user' && !canDeleteUser(deletingItem.item) && (
                                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                                    <p className="text-sm text-yellow-800">
                                        ⚠️ Cannot delete the last admin user. At least one admin must remain.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deletingItem.type === 'user' && !canDeleteUser(deletingItem.item)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    // This return statement is no longer needed - using renderTable() instead
};

export default UsersTable;
