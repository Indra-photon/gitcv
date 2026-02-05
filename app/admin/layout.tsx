'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useUser();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAdminAccess = async () => {
            if (!isLoaded) return;

            if (!isSignedIn) {
                router.push('/sign-in');
                return;
            }

            try {
                const response = await fetch('/api/admin/verify');
                const data = await response.json();

                if (data.success && data.data.isAdmin) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                    router.push('/');
                }
            } catch (error) {
                console.error('Admin check failed:', error);
                setIsAdmin(false);
                router.push('/');
            } finally {
                setIsChecking(false);
            }
        };

        checkAdminAccess();
    }, [isLoaded, isSignedIn, router]);

    // Loading state
    if (!isLoaded || isChecking || isAdmin === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-900" />
                    <p className="text-sm text-neutral-600">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    // Not admin - will redirect
    if (!isAdmin) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-neutral-900">Access Denied</h1>
                    <p className="mt-2 text-neutral-600">You don&apos;t have permission to access this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <AdminSidebar />
            <main className="ml-64 min-h-screen p-8 pt-24">
                {children}
            </main>
        </div>
    );
}
