'use client';

import { useEffect, useState } from 'react';

interface Subscription {
    _id: string;
    tier: string;
    status: string;
    generation_attempts_used: number;
    generation_attempts_limit: number;
    saved_resumes_count: number;
    saved_resumes_limit: number;
    createdAt: string;
    user: {
        full_name: string | null;
        github_username: string;
    } | null;
}

interface Pagination {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}

export default function AdminSubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tierFilter, setTierFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchSubscriptions = async (page: number, tier: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20',
                ...(tier && { tier })
            });

            const response = await fetch(`/api/admin/subscriptions?${params}`);
            const data = await response.json();

            if (data.success) {
                setSubscriptions(data.data.subscriptions);
                setPagination(data.data.pagination);
            } else {
                setError(data.error || 'Failed to load subscriptions');
            }
        } catch (err) {
            setError('Failed to fetch subscriptions');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions(currentPage, tierFilter);
    }, [currentPage, tierFilter]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Subscriptions</h1>
                    <p className="mt-1 text-neutral-600">
                        {pagination?.totalCount || 0} total subscriptions
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                <select
                    value={tierFilter}
                    onChange={(e) => {
                        setTierFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                >
                    <option value="">All Tiers</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                </select>
            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            {/* Subscriptions Table */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <table className="w-full">
                    <thead className="border-b border-neutral-200 bg-neutral-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">User</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Tier</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Generations Used</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Resumes Saved</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Created</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : subscriptions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                                    No subscriptions found
                                </td>
                            </tr>
                        ) : (
                            subscriptions.map((sub) => (
                                <tr key={sub._id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-neutral-900">
                                                {sub.user?.full_name || 'Unknown'}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                @{sub.user?.github_username || 'unknown'}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${sub.tier === 'paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-neutral-100 text-neutral-700'
                                            }`}>
                                            {sub.tier}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${sub.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {sub.generation_attempts_used} / {sub.generation_attempts_limit}
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {sub.saved_resumes_count} / {sub.saved_resumes_limit}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-neutral-600">
                                        {new Date(sub.createdAt).toLocaleDateString()}
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
