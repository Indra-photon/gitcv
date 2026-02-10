'use client';

import { useEffect, useState } from 'react';
import { Search, Pencil, Trash2, X, Loader2 } from 'lucide-react';

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

const ROLES = ['frontend', 'backend', 'fullstack', 'mobile', 'devops'];
const TEMPLATES = ['default', 'modern', 'minimal', 'creative', 'academic', 'executive', 'harvard'];

export default function AdminResumesPage() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [editingResume, setEditingResume] = useState<Resume | null>(null);
    const [deletingResume, setDeletingResume] = useState<Resume | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    // Edit form state
    const [editForm, setEditForm] = useState({
        title: '',
        role: '',
        template: ''
    });

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

    const openEditModal = (resume: Resume) => {
        setEditingResume(resume);
        setEditForm({
            title: resume.title,
            role: resume.role,
            template: resume.template
        });
    };

    const handleUpdate = async () => {
        if (!editingResume) return;

        setActionLoading(true);
        try {
            const response = await fetch('/api/admin/resumes', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resumeId: editingResume._id,
                    updates: editForm
                })
            });

            const data = await response.json();

            if (data.success) {
                setResumes(resumes.map(r =>
                    r._id === editingResume._id
                        ? { ...r, ...editForm }
                        : r
                ));
                setEditingResume(null);
            } else {
                setError(data.error || 'Failed to update resume');
            }
        } catch (err) {
            setError('Failed to update resume');
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingResume) return;

        setActionLoading(true);
        try {
            const response = await fetch(`/api/admin/resumes?resumeId=${deletingResume._id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                setResumes(resumes.filter(r => r._id !== deletingResume._id));
                setDeletingResume(null);
                if (pagination) {
                    setPagination({
                        ...pagination,
                        totalCount: pagination.totalCount - 1
                    });
                }
            } else {
                setError(data.error || 'Failed to delete resume');
            }
        } catch (err) {
            setError('Failed to delete resume');
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
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                        <X className="h-4 w-4" />
                    </button>
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
                        ) : resumes.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                                    No resumes found
                                </td>
                            </tr>
                        ) : (
                            resumes.map((resume) => (
                                <tr key={resume._id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3 font-medium text-neutral-900">
                                        {resume.title}
                                    </td>
                                    <td className="px-4 py-3 text-neutral-600 capitalize">
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
                                        <span className="inline-flex rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700 capitalize">
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
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditModal(resume)}
                                                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                                                title="Edit resume"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeletingResume(resume)}
                                                className="rounded-lg p-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                                                title="Delete resume"
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
            {editingResume && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-neutral-900">Edit Resume</h2>
                            <button
                                onClick={() => setEditingResume(null)}
                                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Role</label>
                                <select
                                    value={editForm.role}
                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none capitalize"
                                >
                                    {ROLES.map(role => (
                                        <option key={role} value={role} className="capitalize">{role}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Template</label>
                                <select
                                    value={editForm.template}
                                    onChange={(e) => setEditForm({ ...editForm, template: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none capitalize"
                                >
                                    {TEMPLATES.map(template => (
                                        <option key={template} value={template} className="capitalize">{template}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setEditingResume(null)}
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
            {deletingResume && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-neutral-900">Delete Resume</h2>
                            <button
                                onClick={() => setDeletingResume(null)}
                                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="text-neutral-600 mb-2">
                            Are you sure you want to delete this resume?
                        </p>
                        <div className="rounded-lg bg-neutral-50 p-3 mb-6">
                            <p className="font-medium text-neutral-900">{deletingResume.title}</p>
                            <p className="text-sm text-neutral-500">By {deletingResume.user?.full_name || 'Unknown'}</p>
                        </div>

                        <p className="text-sm text-red-600 mb-6">
                            ⚠️ This action is irreversible. The resume will be permanently deleted.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeletingResume(null)}
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
                                Delete Resume
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
