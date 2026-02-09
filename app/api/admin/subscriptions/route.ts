import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin';
import dbConnect from '@/lib/dbConnect';
import SubscriptionModel from '@/app/api/models/subscriptionModel';
import UserModel from '@/app/api/models/UserModel';
import { SUBSCRIPTION_STATUS } from '@/constants/limit';

export async function GET(request: NextRequest) {
    try {
        await requireAdminAccess();
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const tier = searchParams.get('tier') || '';
        const status = searchParams.get('status') || '';

        const skip = (page - 1) * limit;

        // Build filter query
        const filterQuery: Record<string, unknown> = {};
        if (tier) filterQuery.tier = tier;
        if (status) filterQuery.status = status;

        // Get subscriptions with pagination
        const [subscriptions, totalCount] = await Promise.all([
            SubscriptionModel.find(filterQuery)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            SubscriptionModel.countDocuments(filterQuery)
        ]);

        // Get user info for these subscriptions
        const userIds = subscriptions.map(s => s.user_id);
        const users = await UserModel.find({
            _id: { $in: userIds }
        }).lean();

        // Map users to subscriptions
        const userMap = new Map(
            users.map(u => [u._id.toString(), u])
        );

        const subscriptionsWithUser = subscriptions.map(sub => ({
            ...sub,
            user: userMap.get(sub.user_id.toString()) || null
        }));

        return NextResponse.json({
            success: true,
            data: {
                subscriptions: subscriptionsWithUser,
                pagination: {
                    page,
                    limit,
                    totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                }
            }
        });
    } catch (error) {
        console.error('Admin subscriptions error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to fetch subscriptions' },
            { status: 500 }
        );
    }
}

// Update subscription (for updating limits, tier, etc.)
export async function PUT(request: NextRequest) {
    try {
        await requireAdminAccess();
        await dbConnect();

        const body = await request.json();
        const { subscriptionId, updates } = body;

        if (!subscriptionId) {
            return NextResponse.json(
                { success: false, error: 'Subscription ID is required' },
                { status: 400 }
            );
        }

        // Allowed fields to update
        const allowedFields = [
            'tier',
            'status',
            'generation_attempts_limit',
            'saved_resumes_limit',
            'monthly_resumes_limit',
            'current_period_start',
            'current_period_end'
        ];
        const sanitizedUpdates: Record<string, unknown> = {};

        for (const field of allowedFields) {
            if (updates[field] !== undefined) {
                sanitizedUpdates[field] = updates[field];
            }
        }

        const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(
            subscriptionId,
            { $set: sanitizedUpdates },
            { new: true }
        ).lean();

        if (!updatedSubscription) {
            return NextResponse.json(
                { success: false, error: 'Subscription not found' },
                { status: 404 }
            );
        }

        // Get user info
        const user = await UserModel.findById(updatedSubscription.user_id).lean();

        return NextResponse.json({
            success: true,
            data: {
                subscription: {
                    ...updatedSubscription,
                    user
                }
            }
        });
    } catch (error) {
        console.error('Admin update subscription error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to update subscription' },
            { status: 500 }
        );
    }
}

// Subscription actions: pause, resume, cancel
export async function PATCH(request: NextRequest) {
    try {
        await requireAdminAccess();
        await dbConnect();

        const body = await request.json();
        const { subscriptionId, action } = body;

        if (!subscriptionId) {
            return NextResponse.json(
                { success: false, error: 'Subscription ID is required' },
                { status: 400 }
            );
        }

        const validActions = ['pause', 'resume', 'cancel'];
        if (!action || !validActions.includes(action)) {
            return NextResponse.json(
                { success: false, error: 'Invalid action. Use: pause, resume, or cancel' },
                { status: 400 }
            );
        }

        // Map action to status
        let newStatus: string;
        switch (action) {
            case 'pause':
                newStatus = SUBSCRIPTION_STATUS.PAUSED;
                break;
            case 'resume':
                newStatus = SUBSCRIPTION_STATUS.ACTIVE;
                break;
            case 'cancel':
                newStatus = SUBSCRIPTION_STATUS.CANCELLED;
                break;
            default:
                newStatus = SUBSCRIPTION_STATUS.ACTIVE;
        }

        const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(
            subscriptionId,
            { $set: { status: newStatus } },
            { new: true }
        ).lean();

        if (!updatedSubscription) {
            return NextResponse.json(
                { success: false, error: 'Subscription not found' },
                { status: 404 }
            );
        }

        // Get user info
        const user = await UserModel.findById(updatedSubscription.user_id).lean();

        return NextResponse.json({
            success: true,
            message: `Subscription ${action}d successfully`,
            data: {
                subscription: {
                    ...updatedSubscription,
                    user
                }
            }
        });
    } catch (error) {
        console.error('Admin subscription action error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to perform subscription action' },
            { status: 500 }
        );
    }
}

