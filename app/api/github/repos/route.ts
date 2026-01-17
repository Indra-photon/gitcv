import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/api/models/UserModel'

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  fork: boolean
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const user = await UserModel.findOne({ clerk_id: userId })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (!user.github_username) {
      return NextResponse.json(
        { error: 'GitHub username not found. Please update your profile.' },
        { status: 400 }
      )
    }

    // Fetch repos from GitHub API
    const githubResponse = await fetch(
      `https://api.github.com/users/${user.github_username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Resume-Builder'
        }
      }
    )

    if (!githubResponse.ok) {
      if (githubResponse.status === 404) {
        return NextResponse.json(
          { error: 'GitHub user not found. Please check your username in profile settings.' },
          { status: 404 }
        )
      }
      throw new Error(`GitHub API error: ${githubResponse.status}`)
    }

    const repos: GitHubRepo[] = await githubResponse.json()

    // Filter out forks and sort by updated date
    const userRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || 'No description provided',
        html_url: repo.html_url,
        language: repo.language || 'Unknown',
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        topics: repo.topics || []
      }))

    return NextResponse.json({
      success: true,
      data: {
        username: user.github_username,
        repos: userRepos,
        total_count: userRepos.length
      }
    })
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    )
  }
}