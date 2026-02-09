import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/app/api/models/UserModel';
import SubscriptionModel from '@/app/api/models/subscriptionModel';

export async function GET(request: NextRequest) {
    try {
        await requireAdminAccess();
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const search = searchParams.get('search') || '';

        const skip = (page - 1) * limit;

        // Build search query
        const searchQuery = search
            ? {
                $or: [
                    { github_username: { $regex: search, $options: 'i' } },
                    { full_name: { $regex: search, $options: 'i' } },
                    { clerk_id: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        // Get users with pagination
        const [users, totalCount] = await Promise.all([
            UserModel.find(searchQuery)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            UserModel.countDocuments(searchQuery)
        ]);

        // Get subscriptions for these users
        const userIds = users.map(u => u._id);
        const subscriptions = await SubscriptionModel.find({
            user_id: { $in: userIds }
        }).lean();

        // Map subscriptions to users
        const subscriptionMap = new Map(
            subscriptions.map(s => [s.user_id.toString(), s])
        );

        const usersWithSubscription = users.map(user => ({
            ...user,
            subscription: subscriptionMap.get(user._id.toString()) || null
        }));

        return NextResponse.json({
            success: true,
            data: {
                users: usersWithSubscription,
                pagination: {
                    page,
                    limit,
                    totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                }
            }
        });
    } catch (error) {
        console.error('Admin users error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// Update user
export async function PUT(request: NextRequest) {
    try {
        await requireAdminAccess();
        await dbConnect();

        const body = await request.json();
        const { userId, updates } = body;

        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Allowed fields to update
        const allowedFields = ['full_name', 'phone', 'location', 'portfolio_url', 'linkedin_url', 'professional_headline'];
        const sanitizedUpdates: Record<string, unknown> = {};

        for (const field of allowedFields) {
            if (updates[field] !== undefined) {
                sanitizedUpdates[field] = updates[field];
            }
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: sanitizedUpdates },
            { new: true }
        ).lean();

        if (!updatedUser) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: { user: updatedUser }
        });
    } catch (error) {
        console.error('Admin update user error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

// Delete user
export async function DELETE(request: NextRequest) {
    try {
        await requireAdminAccess();
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Delete user and related data
        const [deletedUser] = await Promise.all([
            UserModel.findByIdAndDelete(userId),
            SubscriptionModel.deleteOne({ user_id: userId }),
            // Import ResumeModel at the top if needed
        ]);

        if (!deletedUser) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Admin delete user error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}

