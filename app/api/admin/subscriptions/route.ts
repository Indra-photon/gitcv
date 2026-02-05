import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin';
import dbConnect from '@/lib/dbConnect';
import SubscriptionModel from '@/app/api/models/subscriptionModel';
import UserModel from '@/app/api/models/UserModel';

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
