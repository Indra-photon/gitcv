'use client'

interface Project {
  repo_name: string
  repo_url: string
  description: string
  bullets: string[]
  technologies: string[]
}

interface Skills {
  frontend?: string[]
  backend?: string[]
  databases?: string[]
  tools?: string[]
  other?: string[]
}

interface ClassicTemplateProps {
  content: {
    projects: Project[]
    skills: Skills
    problems_solved: string[]
  }
  role: string
}

export default function ClassicTemplate({ content, role }: ClassicTemplateProps) {
  const allSkills = [
    ...(content.skills.frontend || []),
    ...(content.skills.backend || []),
    ...(content.skills.databases || []),
    ...(content.skills.tools || []),
    ...(content.skills.other || [])
  ]

  return (
    <div className="p-12 space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b-2 border-neutral-900 pb-4">
        <h1 className="text-3xl font-bold text-neutral-900 text-balance">
          Your Name
        </h1>
        <p className="text-sm text-neutral-600">
          {role.charAt(0).toUpperCase() + role.slice(1)} Developer
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
          <span>email@example.com</span>
          <span>•</span>
          <span>+1 (555) 123-4567</span>
          <span>•</span>
          <span>City, State</span>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
          Professional Summary
        </h2>
        <p className="text-sm text-neutral-700 text-pretty leading-relaxed">
          {role.charAt(0).toUpperCase() + role.slice(1)} developer with experience building scalable applications. 
          Passionate about creating efficient solutions and collaborating with cross-functional teams.
        </p>
      </div>

      {/* Skills */}
      {allSkills.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {content.projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-4">
            {content.projects.map((project, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-bold text-neutral-900">
                    {project.repo_name}
                  </h3>
                  {project.technologies.length > 0 && (
                    <span className="text-sm text-neutral-600 italic">
                      {project.technologies.slice(0, 3).join(', ')}
                    </span>
                  )}
                </div>
                
                {project.description && (
                  <p className="text-sm text-neutral-700 text-pretty">
                    {project.description}
                  </p>
                )}

                {project.bullets.length > 0 && (
                  <ul className="space-y-1">
                    {project.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="text-sm text-neutral-700 text-pretty flex gap-2">
                        <span className="text-neutral-400 select-none">•</span>
                        <span className="flex-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Problems Solved */}
      {content.problems_solved.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
            Key Achievements
          </h2>
          <ul className="space-y-1">
            {content.problems_solved.map((problem, idx) => (
              <li key={idx} className="text-sm text-neutral-700 text-pretty flex gap-2">
                <span className="text-neutral-400 select-none">•</span>
                <span className="flex-1">{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Education Placeholder */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
          Education
        </h2>
        <div className="space-y-1">
          <div className="flex items-baseline justify-between">
            <p className="font-bold text-neutral-900">Bachelor of Science in Computer Science</p>
            <p className="text-sm text-neutral-600">2020 - 2024</p>
          </div>
          <p className="text-sm text-neutral-700">University Name</p>
        </div>
      </div>
    </div>
  )
}