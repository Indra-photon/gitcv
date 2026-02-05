import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin';
import dbConnect from '@/lib/dbConnect';
import ResumeModel from '@/app/api/models/resumeModel';
import UserModel from '@/app/api/models/UserModel';

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
                    { title: { $regex: search, $options: 'i' } },
                    { role: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        // Get resumes with pagination
        const [resumes, totalCount] = await Promise.all([
            ResumeModel.find(searchQuery)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            ResumeModel.countDocuments(searchQuery)
        ]);

        // Get user info for these resumes
        const userIds = [...new Set(resumes.map(r => r.user_id.toString()))];
        const users = await UserModel.find({
            _id: { $in: userIds }
        }).lean();

        // Map users to resumes
        const userMap = new Map(
            users.map(u => [u._id.toString(), u])
        );

        const resumesWithUser = resumes.map(resume => ({
            ...resume,
            user: userMap.get(resume.user_id.toString()) || null
        }));

        return NextResponse.json({
            success: true,
            data: {
                resumes: resumesWithUser,
                pagination: {
                    page,
                    limit,
                    totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                }
            }
        });
    } catch (error) {
        console.error('Admin resumes error:', error);

        if (error instanceof Error && error.message === 'Admin access required') {
            return NextResponse.json(
                { success: false, error: 'Admin access required' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to fetch resumes' },
            { status: 500 }
        );
    }
}
