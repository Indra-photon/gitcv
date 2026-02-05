'use client';

import { useEffect, useState } from 'react';
import { Users, FileText, CreditCard, TrendingUp } from 'lucide-react';

interface Stats {
    totalUsers: number;
    totalResumes: number;
    totalSubscriptions: number;
    subscriptionsByTier: Record<string, number>;
    recentActivity: {
        newUsersLast7Days: number;
        newResumesLast7Days: number;
    };
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/stats');
                const data = await response.json();

                if (data.success) {
                    setStats(data.data);
                } else {
                    setError(data.error || 'Failed to load stats');
                }
            } catch (err) {
                setError('Failed to fetch dashboard stats');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-900" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
                <p className="mt-1 text-neutral-600">Overview of your application</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    icon={Users}
                    subtitle={`+${stats?.recentActivity.newUsersLast7Days || 0} this week`}
                />
                <StatsCard
                    title="Total Resumes"
                    value={stats?.totalResumes || 0}
                    icon={FileText}
                    subtitle={`+${stats?.recentActivity.newResumesLast7Days || 0} this week`}
                />
                <StatsCard
                    title="Subscriptions"
                    value={stats?.totalSubscriptions || 0}
                    icon={CreditCard}
                    subtitle="Active subscriptions"
                />
                <StatsCard
                    title="Paid Users"
                    value={stats?.subscriptionsByTier?.paid || 0}
                    icon={TrendingUp}
                    subtitle={`${stats?.subscriptionsByTier?.free || 0} free tier`}
                />
            </div>

            {/* Subscription Breakdown */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-neutral-900">Subscription Breakdown</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    {Object.entries(stats?.subscriptionsByTier || {}).map(([tier, count]) => (
                        <div key={tier} className="rounded-lg bg-neutral-50 p-4">
                            <p className="text-sm font-medium capitalize text-neutral-600">{tier}</p>
                            <p className="mt-1 text-2xl font-bold text-neutral-900">{count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatsCard({
    title,
    value,
    icon: Icon,
    subtitle
}: {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    subtitle: string;
}) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-neutral-600">{title}</p>
                    <p className="mt-1 text-3xl font-bold text-neutral-900">{value}</p>
                    <p className="mt-1 text-xs text-neutral-500">{subtitle}</p>
                </div>
                <div className="rounded-lg bg-neutral-100 p-3">
                    <Icon className="h-6 w-6 text-neutral-700" />
                </div>
            </div>
        </div>
    );
}
