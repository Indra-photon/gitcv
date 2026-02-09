'use client';

import { useEffect, useState } from 'react';
import { Search, Pencil, Trash2, X, Loader2 } from 'lucide-react';

interface User {
    _id: string;
    clerk_id: string;
    github_username: string;
    full_name: string | null;
    phone: string | null;
    location: string | null;
    portfolio_url: string | null;
    linkedin_url: string | null;
    professional_headline: string | null;
    createdAt: string;
    subscription: {
        tier: string;
        status: string;
    } | null;
}

interface Pagination {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    // Edit form state
    const [editForm, setEditForm] = useState({
        full_name: '',
        phone: '',
        location: '',
        portfolio_url: '',
        linkedin_url: '',
        professional_headline: ''
    });

    const fetchUsers = async (page: number, searchQuery: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20',
                ...(searchQuery && { search: searchQuery })
            });

            const response = await fetch(`/api/admin/users?${params}`);
            const data = await response.json();

            if (data.success) {
                setUsers(data.data.users);
                setPagination(data.data.pagination);
            } else {
                setError(data.error || 'Failed to load users');
            }
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage, search);
    }, [currentPage]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchUsers(1, search);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setEditForm({
            full_name: user.full_name || '',
            phone: user.phone || '',
            location: user.location || '',
            portfolio_url: user.portfolio_url || '',
            linkedin_url: user.linkedin_url || '',
            professional_headline: user.professional_headline || ''
        });
    };

    const handleUpdate = async () => {
        if (!editingUser) return;

        setActionLoading(true);
        try {
            const response = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: editingUser._id,
                    updates: editForm
                })
            });

            const data = await response.json();

            if (data.success) {
                setUsers(users.map(u =>
                    u._id === editingUser._id
                        ? { ...u, ...editForm }
                        : u
                ));
                setEditingUser(null);
            } else {
                setError(data.error || 'Failed to update user');
            }
        } catch (err) {
            setError('Failed to update user');
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingUser) return;

        setActionLoading(true);
        try {
            const response = await fetch(`/api/admin/users?userId=${deletingUser._id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                setUsers(users.filter(u => u._id !== deletingUser._id));
                setDeletingUser(null);
                if (pagination) {
                    setPagination({
                        ...pagination,
                        totalCount: pagination.totalCount - 1
                    });
                }
            } else {
                setError(data.error || 'Failed to delete user');
            }
        } catch (err) {
            setError('Failed to delete user');
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Users</h1>
                    <p className="mt-1 text-neutral-600">
                        {pagination?.totalCount || 0} total users
                    </p>
                </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search by name or GitHub username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-neutral-400 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                >
                    Search
                </button>
            </form>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Users Table */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <table className="w-full">
                    <thead className="border-b border-neutral-200 bg-neutral-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">User</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">GitHub</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Location</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Subscription</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Joined</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium text-neutral-900">
                                                {user.full_name || 'No name'}
                                            </p>
                                            <p className="text-xs text-neutral-500">{user.clerk_id}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <a
                                            href={`https://github.com/${user.github_username}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            @{user.github_username}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {user.location || '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${user.subscription?.tier === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-neutral-100 text-neutral-700'
                                            }`}>
                                            {user.subscription?.tier || 'free'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-neutral-600">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                                                title="Edit user"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeletingUser(user)}
                                                className="rounded-lg p-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                                                title="Delete user"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-neutral-600">
                        Page {pagination.page} of {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                            disabled={currentPage === pagination.totalPages}
                            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-neutral-900">Edit User</h2>
                            <button
                                onClick={() => setEditingUser(null)}
                                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editForm.full_name}
                                    onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={editForm.location}
                                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Portfolio URL</label>
                                <input
                                    type="url"
                                    value={editForm.portfolio_url}
                                    onChange={(e) => setEditForm({ ...editForm, portfolio_url: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">LinkedIn URL</label>
                                <input
                                    type="url"
                                    value={editForm.linkedin_url}
                                    onChange={(e) => setEditForm({ ...editForm, linkedin_url: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Professional Headline</label>
                                <input
                                    type="text"
                                    value={editForm.professional_headline}
                                    onChange={(e) => setEditForm({ ...editForm, professional_headline: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="flex-1 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={actionLoading}
                                className="flex-1 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-neutral-900">Delete User</h2>
                            <button
                                onClick={() => setDeletingUser(null)}
                                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="text-neutral-600 mb-2">
                            Are you sure you want to delete this user?
                        </p>
                        <div className="rounded-lg bg-neutral-50 p-3 mb-6">
                            <p className="font-medium text-neutral-900">{deletingUser.full_name || 'No name'}</p>
                            <p className="text-sm text-neutral-500">@{deletingUser.github_username}</p>
                        </div>

                        <p className="text-sm text-red-600 mb-6">
                            ⚠️ This action is irreversible. This will also delete all associated data including subscriptions and resumes.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeletingUser(null)}
                                className="flex-1 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={actionLoading}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
