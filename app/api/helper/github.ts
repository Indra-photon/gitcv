/**
 * GitHub API Helper Functions
 * Handles fetching repository data and README content
 */

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  topics: string[]
  stargazers_count: number
}

export interface GitHubRepoWithReadme extends GitHubRepo {
  readme: string
}

/**
 * Fetch README content for a GitHub repository
 * @param repoFullName - Format: "owner/repo"
 * @returns README content as string or empty string if not found
 */
export async function fetchGitHubReadme(repoFullName: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoFullName}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw',
          'User-Agent': 'GitHub-Resume-Builder'
        }
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`No README found for ${repoFullName}`)
        return ''
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const readmeContent = await response.text()
    return readmeContent
  } catch (error) {
    console.error(`Error fetching README for ${repoFullName}:`, error)
    return ''
  }
}

/**
 * Fetch repository data from GitHub API
 * @param repoFullName - Format: "owner/repo"
 * @returns Repository data or null if not found
 */
export async function fetchGitHubRepo(repoFullName: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoFullName}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Resume-Builder'
        }
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Repository not found: ${repoFullName}`)
        return null
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repo = await response.json()
    return {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || 'No description provided',
      html_url: repo.html_url,
      language: repo.language || 'Unknown',
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count || 0
    }
  } catch (error) {
    console.error(`Error fetching repo ${repoFullName}:`, error)
    return null
  }
}

/**
 * Fetch multiple repositories with their README content
 * @param repoUrls - Array of GitHub repository URLs
 * @returns Array of repositories with README content
 */
export async function fetchRepositoriesWithReadme(
  repoUrls: string[]
): Promise<GitHubRepoWithReadme[]> {
  const results: GitHubRepoWithReadme[] = []

  for (const url of repoUrls) {
    // Extract owner/repo from URL
    // Expected format: https://github.com/owner/repo
    const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/)
    if (!match) {
      console.error(`Invalid GitHub URL: ${url}`)
      continue
    }

    const repoFullName = match[1]
    
    // Fetch repo data and README in parallel
    const [repo, readme] = await Promise.all([
      fetchGitHubRepo(repoFullName),
      fetchGitHubReadme(repoFullName)
    ])

    if (repo) {
      results.push({
        ...repo,
        readme: readme || 'No README available'
      })
    }
  }

  return results
}

/**
 * Extract repository full name from GitHub URL
 * @param url - GitHub repository URL
 * @returns Full name (owner/repo) or null
 */
export function extractRepoFullName(url: string): string | null {
  const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/)
  return match ? match[1] : null
}