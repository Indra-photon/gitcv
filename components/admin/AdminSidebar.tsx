'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    FileText,
    CreditCard,
    ChevronLeft,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users
    },
    {
        title: 'Resumes',
        href: '/admin/resumes',
        icon: FileText
    },
    {
        title: 'Subscriptions',
        href: '/admin/subscriptions',
        icon: CreditCard
    },
    {
        title: 'Admins',
        href: '/admin/admins',
        icon: ShieldCheck
    }
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-neutral-200 bg-white pt-16">
            <div className="flex h-full flex-col px-3 py-4">
                {/* Back to main site */}
                <Link
                    href="/"
                    className="mb-6 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Site
                </Link>

                {/* Admin Title */}
                <div className="mb-4 px-3">
                    <h2 className="text-lg font-semibold text-neutral-900">Admin Panel</h2>
                    <p className="text-xs text-neutral-500">Manage your application</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                                    isActive
                                        ? 'bg-neutral-900 text-white'
                                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
