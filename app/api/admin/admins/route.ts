import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin';
import dbConnect from '@/lib/dbConnect';
import AdminModel from '@/app/api/models/AdminModel';

// GET - List all admins
export async function GET() {
    try {
        await requireAdminAccess();
        await dbConnect();

        const admins = await AdminModel.find().sort({ createdAt: -1 }).lean();

        return NextResponse.json({
            success: true,
            data: { admins }
        });
    } catch (error) {
        console.error('Admin list error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to fetch admins' },
            { status: 500 }
        );
    }
}

// POST - Add new admin
export async function POST(request: NextRequest) {
    try {
        await requireAdminAccess();
        await dbConnect();

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

        // Check if admin already exists
        const existingAdmin = await AdminModel.findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
            return NextResponse.json(
                { success: false, error: 'Admin already exists' },
                { status: 409 }
            );
        }

        // Create new admin
        const newAdmin = await AdminModel.create({ email: email.toLowerCase() });

        return NextResponse.json({
            success: true,
            data: { admin: newAdmin }
        });
    } catch (error) {
        console.error('Admin create error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create admin' },
            { status: 500 }
        );
    }
}
