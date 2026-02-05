import { NextResponse } from 'next/server';
import { checkAdminAccess } from '@/lib/admin';

export async function GET() {
    try {
        const { isAdmin, email } = await checkAdminAccess();

        return NextResponse.json({
            success: true,
            data: {
                isAdmin,
                email
            }
        });
    } catch (error) {
        console.error('Admin verify error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to verify admin status' },
            { status: 500 }
        );
    }
}
