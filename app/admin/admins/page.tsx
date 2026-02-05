'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Shield } from 'lucide-react';

interface Admin {
    _id: string;
    email: string;
    createdAt: string;
}

const PRIMARY_ADMIN_EMAIL = 'adityasingh7402@gmail.com';

export default function AdminManagementPage() {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newEmail, setNewEmail] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [addingLoading, setAddingLoading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingEmail, setEditingEmail] = useState('');

    const fetchAdmins = async () => {
        try {
            const response = await fetch('/api/admin/admins');
            const data = await response.json();

            if (data.success) {
                setAdmins(data.data.admins);
            } else {
                setError(data.error || 'Failed to load admins');
            }
        } catch (err) {
            setError('Failed to fetch admins');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail.trim()) return;

        setAddingLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/admins', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newEmail.trim() })
            });

            const data = await response.json();

            if (data.success) {
                setAdmins([data.data.admin, ...admins]);
                setNewEmail('');
                setIsAdding(false);
            } else {
                setError(data.error || 'Failed to add admin');
            }
        } catch (err) {
            setError('Failed to add admin');
            console.error(err);
        } finally {
            setAddingLoading(false);
        }
    };

    const handleUpdateAdmin = async (id: string) => {
        if (!editingEmail.trim()) return;

        setError(null);

        try {
            const response = await fetch(`/api/admin/admins/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: editingEmail.trim() })
            });

            const data = await response.json();

            if (data.success) {
                setAdmins(admins.map(admin =>
                    admin._id === id ? data.data.admin : admin
                ));
                setEditingId(null);
                setEditingEmail('');
            } else {
                setError(data.error || 'Failed to update admin');
            }
        } catch (err) {
            setError('Failed to update admin');
            console.error(err);
        }
    };

    const handleDeleteAdmin = async (id: string) => {
        if (!confirm('Are you sure you want to remove this admin?')) return;

        setError(null);

        try {
            const response = await fetch(`/api/admin/admins/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                setAdmins(admins.filter(admin => admin._id !== id));
            } else {
                setError(data.error || 'Failed to delete admin');
            }
        } catch (err) {
            setError('Failed to delete admin');
            console.error(err);
        }
    };

    const startEditing = (admin: Admin) => {
        setEditingId(admin._id);
        setEditingEmail(admin.email);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingEmail('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-900" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Admin Management</h1>
                    <p className="mt-1 text-neutral-600">
                        Manage who has admin access to this panel
                    </p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Admin
                    </button>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            {/* Add Admin Form */}
            {isAdding && (
                <form onSubmit={handleAddAdmin} className="rounded-xl border border-neutral-200 bg-white p-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="email"
                            placeholder="Enter admin email..."
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={addingLoading || !newEmail.trim()}
                            className="flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
                        >
                            {addingLoading ? 'Adding...' : 'Add'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsAdding(false);
                                setNewEmail('');
                            }}
                            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Admins List */}
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <table className="w-full">
                    <thead className="border-b border-neutral-200 bg-neutral-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-neutral-500">Added</th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-neutral-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {admins.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-4 py-8 text-center text-neutral-500">
                                    No admins found
                                </td>
                            </tr>
                        ) : (
                            admins.map((admin) => {
                                const isPrimary = admin.email === PRIMARY_ADMIN_EMAIL;
                                const isEditing = editingId === admin._id;

                                return (
                                    <tr key={admin._id} className="hover:bg-neutral-50">
                                        <td className="px-4 py-3">
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={editingEmail}
                                                    onChange={(e) => setEditingEmail(e.target.value)}
                                                    className="w-full rounded border border-neutral-300 px-2 py-1 text-sm focus:border-neutral-400 focus:outline-none"
                                                    autoFocus
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-neutral-900">{admin.email}</span>
                                                    {isPrimary && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                            <Shield className="h-3 w-3" />
                                                            Primary
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-neutral-600">
                                            {new Date(admin.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                {isEditing ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateAdmin(admin._id)}
                                                            className="rounded p-1.5 text-green-600 hover:bg-green-50"
                                                            title="Save"
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={cancelEditing}
                                                            className="rounded p-1.5 text-neutral-600 hover:bg-neutral-100"
                                                            title="Cancel"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => startEditing(admin)}
                                                            disabled={isPrimary}
                                                            className="rounded p-1.5 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                                            title={isPrimary ? 'Cannot edit primary admin' : 'Edit'}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAdmin(admin._id)}
                                                            disabled={isPrimary}
                                                            className="rounded p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed"
                                                            title={isPrimary ? 'Cannot delete primary admin' : 'Delete'}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Info */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                <div className="flex items-start gap-2">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0" />
                    <div>
                        <p className="font-medium">Primary Admin Protected</p>
                        <p className="mt-1 text-amber-700">
                            The primary admin ({PRIMARY_ADMIN_EMAIL}) cannot be edited or deleted to ensure you always have admin access.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
