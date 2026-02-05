import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin';
import dbConnect from '@/lib/dbConnect';
import AdminModel from '@/app/api/models/AdminModel';

// Default admin that cannot be deleted
const DEFAULT_ADMIN_EMAIL = 'adityasingh7402@gmail.com';

// PUT - Update admin email
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdminAccess();
        await dbConnect();

        const { id } = await params;
        const body = await request.json();
        const { email } = body;

        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Find the admin
        const admin = await AdminModel.findById(id);
        if (!admin) {
            return NextResponse.json(
                { success: false, error: 'Admin not found' },
                { status: 404 }
            );
        }

        // Check if trying to update default admin
        if (admin.email === DEFAULT_ADMIN_EMAIL) {
            return NextResponse.json(
                { success: false, error: 'Cannot modify the primary admin' },
                { status: 403 }
            );
        }

        // Check if new email already exists
        const existingAdmin = await AdminModel.findOne({
            email: email.toLowerCase(),
            _id: { $ne: id }
        });
        if (existingAdmin) {
            return NextResponse.json(
                { success: false, error: 'Email already exists' },
                { status: 409 }
            );
        }

        // Update admin
        admin.email = email.toLowerCase();
        await admin.save();

        return NextResponse.json({
            success: true,
            data: { admin }
        });
    } catch (error) {
        console.error('Admin update error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to update admin' },
            { status: 500 }
        );
    }
}

// DELETE - Remove admin
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdminAccess();
        await dbConnect();

        const { id } = await params;

        // Find the admin
        const admin = await AdminModel.findById(id);
        if (!admin) {
            return NextResponse.json(
                { success: false, error: 'Admin not found' },
                { status: 404 }
            );
        }

        // Prevent deletion of default admin
        if (admin.email === DEFAULT_ADMIN_EMAIL) {
            return NextResponse.json(
                { success: false, error: 'Cannot delete the primary admin' },
                { status: 403 }
            );
        }

        await AdminModel.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Admin deleted successfully'
        });
    } catch (error) {
        console.error('Admin delete error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to delete admin' },
            { status: 500 }
        );
    }
}
