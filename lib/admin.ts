import { currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/dbConnect';
import AdminModel from '@/app/api/models/AdminModel';

// Default admin email - seeded on first check
const DEFAULT_ADMIN_EMAIL = 'adityasingh7402@gmail.com';

/**
 * Ensures the default admin email exists in the database
 */
export async function ensureDefaultAdmin(): Promise<void> {
    await dbConnect();

    const existingAdmin = await AdminModel.findOne({ email: DEFAULT_ADMIN_EMAIL });
    if (!existingAdmin) {
        await AdminModel.create({ email: DEFAULT_ADMIN_EMAIL });
        console.log('Default admin created:', DEFAULT_ADMIN_EMAIL);
    }
}

/**
 * Check if an email is an admin
 */
export async function isAdminEmail(email: string): Promise<boolean> {
    await dbConnect();
    await ensureDefaultAdmin();

    const admin = await AdminModel.findOne({ email: email.toLowerCase() });
    return !!admin;
}

/**
 * Check if the current authenticated user is an admin
 * Returns { isAdmin: boolean, email: string | null }
 */
export async function checkAdminAccess(): Promise<{ isAdmin: boolean; email: string | null }> {
    const user = await currentUser();

    if (!user) {
        return { isAdmin: false, email: null };
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
        return { isAdmin: false, email: null };
    }

    const isAdmin = await isAdminEmail(email);
    return { isAdmin, email };
}

/**
 * Require admin access - throws error if not admin
 */
export async function requireAdminAccess(): Promise<string> {
    const { isAdmin, email } = await checkAdminAccess();

    if (!isAdmin) {
        throw new Error('Admin access required');
    }

    return email!;
}
