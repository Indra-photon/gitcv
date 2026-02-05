'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface Resume {
    _id: string;
    title: string;
    role: string;
    template: string;
    status: string;
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

export default function AdminResumesPage() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchResumes = async (page: number, searchQuery: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20',
                ...(searchQuery && { search: searchQuery })
            });

            const response = await fetch(`/api/admin/resumes?${params}`);
            const data = await response.json();

            if (data.success) {
                setResumes(data.data.resumes);
                setPagination(data.data.pagination);
            } else {
                setError(data.error || 'Failed to load resumes');
            }
        } catch (err) {
            setError('Failed to fetch resumes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes(currentPage, search);
    }, [currentPage]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchResumes(1, search);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Resumes</h1>
                    <p className="mt-1 text-neutral-600">
                        {pagination?.totalCount || 0} total resumes
                    </p>
                </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search by title or role..."
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

            {/* Resumes Table */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <table className="w-full">
                    <thead className="border-b border-neutral-200 bg-neutral-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Title</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Role</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">User</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Template</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Status</th>
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
                        ) : resumes.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                                    No resumes found
                                </td>
                            </tr>
                        ) : (
                            resumes.map((resume) => (
                                <tr key={resume._id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3 font-medium text-neutral-900">
                                        {resume.title}
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600">
                                        {resume.role}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="text-sm text-neutral-900">
                                                {resume.user?.full_name || 'Unknown'}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                @{resume.user?.github_username || 'unknown'}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                                            {resume.template}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${resume.status === 'saved'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {resume.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-neutral-600">
                                        {new Date(resume.createdAt).toLocaleDateString()}
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
