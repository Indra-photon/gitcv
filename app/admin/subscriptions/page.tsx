'use client';

import { useEffect, useState } from 'react';
import { Pencil, X, Loader2, Pause, Play, XCircle } from 'lucide-react';

interface Subscription {
    _id: string;
    tier: string;
    status: string;
    generation_attempts_used: number;
    generation_attempts_limit: number;
    saved_resumes_count: number;
    saved_resumes_limit: number;
    monthly_resumes_limit: number;
    current_period_start: string | null;
    current_period_end: string | null;
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

const TIERS = ['free', 'premium_monthly', 'premium_annual', 'lifetime'];
const STATUSES = ['active', 'paused', 'expired', 'cancelled'];

export default function AdminSubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [tierFilter, setTierFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    // Edit form state
    const [editForm, setEditForm] = useState({
        tier: '',
        status: '',
        generation_attempts_limit: 0,
        saved_resumes_limit: 0,
        monthly_resumes_limit: 0
    });

    const fetchSubscriptions = async (page: number, tier: string, status: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20',
                ...(tier && { tier }),
                ...(status && { status })
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
        fetchSubscriptions(currentPage, tierFilter, statusFilter);
    }, [currentPage, tierFilter, statusFilter]);



    const openEditModal = (subscription: Subscription) => {
        setEditingSubscription(subscription);
        setEditForm({
            tier: subscription.tier,
            status: subscription.status,
            generation_attempts_limit: subscription.generation_attempts_limit,
            saved_resumes_limit: subscription.saved_resumes_limit,
            monthly_resumes_limit: subscription.monthly_resumes_limit
        });
    };

    const handleUpdate = async () => {
        if (!editingSubscription) return;

        setActionLoading(true);
        try {
            const response = await fetch('/api/admin/subscriptions', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscriptionId: editingSubscription._id,
                    updates: editForm
                })
            });

            const data = await response.json();

            if (data.success) {
                setSubscriptions(subscriptions.map(s =>
                    s._id === editingSubscription._id
                        ? { ...s, ...editForm }
                        : s
                ));
                setEditingSubscription(null);
                setSuccess('Subscription updated successfully');
                setTimeout(() => setSuccess(null), 3000);
            } else {
                setError(data.error || 'Failed to update subscription');
            }
        } catch (err) {
            setError('Failed to update subscription');
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleAction = async (subscriptionId: string, action: 'pause' | 'resume' | 'cancel') => {
        setActionLoading(true);
        try {
            const response = await fetch('/api/admin/subscriptions', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscriptionId,
                    action
                })
            });

            const data = await response.json();

            if (data.success) {
                // Update the status in the local state
                const newStatus = action === 'pause' ? 'paused' : action === 'resume' ? 'active' : 'cancelled';
                setSubscriptions(subscriptions.map(s =>
                    s._id === subscriptionId
                        ? { ...s, status: newStatus }
                        : s
                ));
                setSuccess(`Subscription ${action}d successfully`);
                setTimeout(() => setSuccess(null), 3000);
            } else {
                setError(data.error || `Failed to ${action} subscription`);
            }
        } catch (err) {
            setError(`Failed to ${action} subscription`);
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-700';
            case 'paused':
                return 'bg-yellow-100 text-yellow-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            case 'expired':
                return 'bg-neutral-100 text-neutral-700';
            default:
                return 'bg-neutral-100 text-neutral-700';
        }
    };

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'lifetime':
                return 'bg-purple-100 text-purple-700';
            case 'premium_annual':
                return 'bg-blue-100 text-blue-700';
            case 'premium_monthly':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-neutral-100 text-neutral-700';
        }
    };

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
            <div className="flex gap-3 flex-wrap">
                <select
                    value={tierFilter}
                    onChange={(e) => {
                        setTierFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                >
                    <option value="">All Tiers</option>
                    {TIERS.map(tier => (
                        <option key={tier} value={tier} className="capitalize">
                            {tier.replace('_', ' ')}
                        </option>
                    ))}
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                >
                    <option value="">All Statuses</option>
                    {STATUSES.map(status => (
                        <option key={status} value={status} className="capitalize">
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Success Message */}
            {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 flex justify-between items-center">
                    <span>✓ {success}</span>
                    <button onClick={() => setSuccess(null)} className="text-green-500 hover:text-green-700">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                        <X className="h-4 w-4" />
                    </button>
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
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                </td>
                            </tr>
                        ) : subscriptions.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
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
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${getTierColor(sub.tier)}`}>
                                            {sub.tier.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusColor(sub.status)}`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {sub.generation_attempts_used} / {sub.generation_attempts_limit === -1 ? '∞' : sub.generation_attempts_limit}
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {sub.saved_resumes_count} / {sub.saved_resumes_limit === -1 ? '∞' : sub.saved_resumes_limit}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-neutral-600">
                                        {new Date(sub.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-1 items-center">
                                            {/* Edit Button */}
                                            <button
                                                onClick={() => openEditModal(sub)}
                                                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                                                title="Edit subscription"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>

                                            {/* Pause/Resume Button */}
                                            {sub.status === 'active' && (
                                                <button
                                                    onClick={() => handleAction(sub._id, 'pause')}
                                                    disabled={actionLoading}
                                                    className="rounded-lg p-2 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 transition-colors disabled:opacity-50"
                                                    title="Pause subscription"
                                                >
                                                    <Pause className="h-4 w-4" />
                                                </button>
                                            )}
                                            {(sub.status === 'paused' || sub.status === 'cancelled' || sub.status === 'expired') && (
                                                <button
                                                    onClick={() => handleAction(sub._id, 'resume')}
                                                    disabled={actionLoading}
                                                    className="rounded-lg p-2 text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors disabled:opacity-50"
                                                    title={sub.status === 'cancelled' ? 'Reactivate subscription' : 'Resume subscription'}
                                                >
                                                    <Play className="h-4 w-4" />
                                                </button>
                                            )}

                                            {/* Cancel Button */}
                                            {sub.status !== 'cancelled' && (
                                                <button
                                                    onClick={() => handleAction(sub._id, 'cancel')}
                                                    disabled={actionLoading}
                                                    className="rounded-lg p-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50"
                                                    title="Cancel subscription"
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </button>
                                            )}
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
            {editingSubscription && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-neutral-900">Edit Subscription</h2>
                                <p className="text-sm text-neutral-500 mt-1">
                                    {editingSubscription.user?.full_name || 'Unknown'} (@{editingSubscription.user?.github_username || 'unknown'})
                                </p>
                            </div>
                            <button
                                onClick={() => setEditingSubscription(null)}
                                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Tier</label>
                                <select
                                    value={editForm.tier}
                                    onChange={(e) => setEditForm({ ...editForm, tier: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none capitalize"
                                >
                                    {TIERS.map(tier => (
                                        <option key={tier} value={tier} className="capitalize">
                                            {tier.replace('_', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                                <select
                                    value={editForm.status}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none capitalize"
                                >
                                    {STATUSES.map(status => (
                                        <option key={status} value={status} className="capitalize">
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">
                                    Generation Attempts Limit
                                    <span className="text-neutral-400 font-normal"> (-1 for unlimited)</span>
                                </label>
                                <input
                                    type="number"
                                    value={editForm.generation_attempts_limit}
                                    onChange={(e) => setEditForm({ ...editForm, generation_attempts_limit: parseInt(e.target.value) || 0 })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                    min="-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">
                                    Saved Resumes Limit
                                    <span className="text-neutral-400 font-normal"> (-1 for unlimited)</span>
                                </label>
                                <input
                                    type="number"
                                    value={editForm.saved_resumes_limit}
                                    onChange={(e) => setEditForm({ ...editForm, saved_resumes_limit: parseInt(e.target.value) || 0 })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                    min="-1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">
                                    Monthly Resumes Limit
                                    <span className="text-neutral-400 font-normal"> (for paid users)</span>
                                </label>
                                <input
                                    type="number"
                                    value={editForm.monthly_resumes_limit}
                                    onChange={(e) => setEditForm({ ...editForm, monthly_resumes_limit: parseInt(e.target.value) || 0 })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setEditingSubscription(null)}
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
        </div>
    );
}
