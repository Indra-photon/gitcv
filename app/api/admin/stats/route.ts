import { NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/app/api/models/UserModel';
import SubscriptionModel from '@/app/api/models/subscriptionModel';
import ResumeModel from '@/app/api/models/resumeModel';

export async function GET() {
    try {
        await requireAdminAccess();
        await dbConnect();

        // Get counts
        const [totalUsers, totalResumes, totalSubscriptions] = await Promise.all([
            UserModel.countDocuments(),
            ResumeModel.countDocuments(),
            SubscriptionModel.countDocuments()
        ]);

        // Get subscription breakdown by tier
        const subscriptionsByTier = await SubscriptionModel.aggregate([
            {
                $group: {
                    _id: '$tier',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get recent users (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentUsers = await UserModel.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        // Get recent resumes (last 7 days)
        const recentResumes = await ResumeModel.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        return NextResponse.json({
            success: true,
            data: {
                totalUsers,
                totalResumes,
                totalSubscriptions,
                subscriptionsByTier: subscriptionsByTier.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {} as Record<string, number>),
                recentActivity: {
                    newUsersLast7Days: recentUsers,
                    newResumesLast7Days: recentResumes
                }
            }
        });
    } catch (error) {
        console.error('Admin stats error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
