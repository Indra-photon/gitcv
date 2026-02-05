'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface User {
    _id: string;
    clerk_id: string;
    github_username: string;
    full_name: string | null;
    phone: string | null;
    location: string | null;
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
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
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
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
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
        </div>
    );
}
