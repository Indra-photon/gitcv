// 'use client'

// interface Project {
//   repo_name: string
//   repo_url: string
//   description: string
//   bullets: string[]
//   technologies: string[]
// }

// interface Skills {
//   frontend?: string[]
//   backend?: string[]
//   databases?: string[]
//   tools?: string[]
//   other?: string[]
// }

// interface ClassicTemplateProps {
//   content: {
//     projects: Project[]
//     skills: Skills
//     problems_solved: string[]
//   }
//   role: string,
//   userData?: any
// }

// export default function ClassicTemplate({ content, role, userData }: ClassicTemplateProps) {
//   const allSkills = [
//     ...(content.skills.frontend || []),
//     ...(content.skills.backend || []),
//     ...(content.skills.databases || []),
//     ...(content.skills.tools || []),
//     ...(content.skills.other || [])
//   ]

//   console.log('Rendering ClassicTemplate with content:', userData);


//   return (
//     <div className="p-12 space-y-6">
//       {/* Header */}
//       <div className="space-y-2 border-b-2 border-neutral-900 pb-4">
//         <h1 className="text-3xl font-bold text-neutral-900 text-balance">
//           {userData?.name || userData?.github_username || 'Your Name'}
//         </h1>
//         <p className="text-sm text-neutral-600">
//           {role.charAt(0).toUpperCase() + role.slice(1)} Developer
//         </p>
//         <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
//           <span>{userData?.email || 'email@example.com'}</span>
//           <span>•</span>
//           <span>{userData?.phone || '+1 (555) 123-4567'}</span>
//           <span>•</span>
//           <span>{userData?.location || 'City, State'}</span>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="space-y-2">
//         <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
//           Professional Summary
//         </h2>
//         <p className="text-sm text-neutral-700 text-pretty leading-relaxed">
//           {role.charAt(0).toUpperCase() + role.slice(1)} developer with experience building scalable applications. 
//           Passionate about creating efficient solutions and collaborating with cross-functional teams.
//         </p>
//       </div>

//       {/* Skills */}
//       {allSkills.length > 0 && (
//         <div className="space-y-2">
//           <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
//             Technical Skills
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {allSkills.map((skill, idx) => (
//               <span
//                 key={idx}
//                 className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Projects */}
//       {content.projects.length > 0 && (
//         <div className="space-y-3">
//           <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
//             Projects
//           </h2>
//           <div className="space-y-4">
//             {content.projects.map((project, idx) => (
//               <div key={idx} className="space-y-2">
//                 <div className="flex items-baseline justify-between gap-4">
//                   <h3 className="font-bold text-neutral-900">
//                     {project.repo_name}
//                   </h3>
//                   {project.technologies.length > 0 && (
//                     <span className="text-sm text-neutral-600 italic">
//                       {project.technologies.slice(0, 3).join(', ')}
//                     </span>
//                   )}
//                 </div>

//                 {project.description && (
//                   <p className="text-sm text-neutral-700 text-pretty">
//                     {project.description}
//                   </p>
//                 )}

//                 {project.bullets.length > 0 && (
//                   <ul className="space-y-1">
//                     {project.bullets.map((bullet, bulletIdx) => (
//                       <li key={bulletIdx} className="text-sm text-neutral-700 text-pretty flex gap-2">
//                         <span className="text-neutral-400 select-none">•</span>
//                         <span className="flex-1">{bullet}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Problems Solved */}
//       {content.problems_solved.length > 0 && (
//         <div className="space-y-2">
//           <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
//             Key Achievements
//           </h2>
//           <ul className="space-y-1">
//             {content.problems_solved.map((problem, idx) => (
//               <li key={idx} className="text-sm text-neutral-700 text-pretty flex gap-2">
//                 <span className="text-neutral-400 select-none">•</span>
//                 <span className="flex-1">{problem}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Education Placeholder */}
//       <div className="space-y-2">
//         <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
//           Education
//         </h2>
//         <div className="space-y-1">
//           <div className="flex items-baseline justify-between">
//             <p className="font-bold text-neutral-900">Bachelor of Science in Computer Science</p>
//             <p className="text-sm text-neutral-600">2020 - 2024</p>
//           </div>
//           <p className="text-sm text-neutral-700">University Name</p>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'
import Link from 'next/link'
import { CalSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { sanitizeTiptapHTML } from '@/lib/tiptap-utils'

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
  userData?: any
}

export default function ClassicTemplate({ content, role, userData }: ClassicTemplateProps) {
  const allSkills = [
    ...(content.skills.frontend || []),
    ...(content.skills.backend || []),
    ...(content.skills.databases || []),
    ...(content.skills.tools || []),
    ...(content.skills.other || [])
  ]

  console.log('Rendering ClassicTemplate with content:', userData)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="p-12 space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b-2 border-neutral-900 pb-4">
        <h1 className={cn("text-3xl font-bold text-neutral-900 text-balance", CalSans.className)}>
          {userData?.full_name || userData?.github_username || 'Your Name'}
        </h1>
        <div className="text-sm text-neutral-600 flex flex-wrap gap-x-2 gap-y-1">
          <span>
            {userData?.professional_headline ||
              `${role.charAt(0).toUpperCase() + role.slice(1)} Developer`}
          </span>

          {userData?.location && (
            <>
              <span>|</span>
              <span>{userData.location}</span>
            </>
          )}

          {userData?.phone && (
            <>
              <span>|</span>
              <span>{userData.phone}</span>
            </>
          )}

          {userData?.email && (
            <>
              <span>|</span>
              <span>{userData.email}</span>
            </>
          )}
        </div>


        <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-neutral-600">
          {userData?.github_username && (
            <Link
              href={`https://github.com/${userData.github_username}`}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              github.com/{userData.github_username}
            </Link>
          )}

          {userData?.linkedin_url && (
            <>
              {userData?.github_username && <span>|</span>}
              <Link
                href={userData.linkedin_url}
                target="_blank"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {userData.linkedin_url.replace('https://', '').replace('http://', '').replace('www.', '')}
              </Link>
            </>
          )}

          {userData?.portfolio_url && (
            <>
              {(userData?.github_username || userData?.linkedin_url) && <span>|</span>}
              <Link
                href={userData.portfolio_url}
                target="_blank"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {userData.portfolio_url.replace('https://', '').replace('http://', '').replace('www.', '')}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {/* <div className="space-y-2">
        <h2 className={cn("text-lg font-bold text-neutral-900 uppercase tracking-wide", CalSans.className)}>
          Professional Summary
        </h2>
        <p className={cn("text-sm text-neutral-700 text-pretty leading-relaxed", CalSans.className)}>
          {userData?.professional_headline 
            ? `${userData.professional_headline} with experience building scalable applications. Passionate about creating efficient solutions and collaborating with cross-functional teams.`
            : `${role.charAt(0).toUpperCase() + role.slice(1)} developer with experience building scalable applications. Passionate about creating efficient solutions and collaborating with cross-functional teams.`
          }
        </p>
      </div> */}


      {/* Projects */}
      {content.projects.length > 0 && (
        <div className="space-y-3">
          <h2 className={cn("text-lg font-bold text-neutral-900 uppercase tracking-wide", CalSans.className)}>
            Projects
          </h2>
          <div className="space-y-4">
            {content.projects.map((project, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className={cn("text-xl text-neutral-900", CalSans.className)}>
                    {project.repo_name}
                  </h3>
                  {project.technologies.length > 0 && (
                    <span className={cn("text-sm text-neutral-600 italic", CalSans.className)}>
                      {project.technologies.slice(0, 3).join(', ')}
                    </span>
                  )}
                </div>

                {project.description && (
                  <p
                    className={cn("text-sm text-neutral-900 text-pretty", CalSans.className)}
                    dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(project.description) }}
                  />
                )}

                {project.bullets.length > 0 && (
                  <ul className="space-y-1">
                    {project.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className={cn("text-sm text-neutral-700 text-pretty flex gap-2 font-regular")}>
                        <span className="text-neutral-400 select-none">•</span>
                        <span
                          className="flex-1"
                          dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(bullet) }}
                        />
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
          <h2 className={cn("text-lg font-bold text-neutral-900 uppercase tracking-wide", CalSans.className)}>
            Key Achievements
          </h2>
          <ul className="space-y-1">
            {content.problems_solved.map((problem, idx) => (
              <li key={idx} className={cn("text-sm text-neutral-700 text-pretty flex gap-2 font-regular")}>
                <span className="text-neutral-400 select-none">•</span>
                <span
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(problem) }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div className="space-y-2">
          <h2 className={cn("text-lg font-bold text-neutral-900 uppercase tracking-wide", CalSans.className)}>
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill, idx) => (
              <span
                key={idx}
                className={cn("px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded", CalSans.className)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience - Conditional */}
      {userData?.work_experience && userData.work_experience.length > 0 && (
        <div className="space-y-3">
          <h2 className={cn("text-lg font-bold text-neutral-900 uppercase tracking-wide", CalSans.className)}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {userData.work_experience.map((work: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className={cn("font-bold text-neutral-900", CalSans.className)}>
                    {work.job_title || 'Position'}
                  </h3>
                  <span className={cn("text-sm text-neutral-600", CalSans.className)}>
                    {work.start_date
                      ? `${formatDate(work.start_date)} - ${work.end_date ? formatDate(work.end_date) : 'Present'}`
                      : 'Date'}
                  </span>
                </div>
                <p className={cn("text-sm text-neutral-700 font-medium", CalSans.className)}>
                  {work.company || 'Company Name'}
                </p>
                {work.description && (
                  <p
                    className={cn("text-sm text-neutral-700 text-pretty", CalSans.className)}
                    dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(work.description) }}
                  />
                )}
                {work.responsibilities && work.responsibilities.length > 0 && (
                  <ul className="space-y-1">
                    {work.responsibilities.map((resp: string, respIdx: number) => (
                      <li key={respIdx} className={cn("text-sm text-neutral-700 text-pretty flex gap-2", CalSans.className)}>
                        <span className="text-neutral-400 select-none">•</span>
                        <span
                          className="flex-1"
                          dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(resp) }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education - Conditional */}
      {userData?.education && userData.education.length > 0 && (
        <div className="space-y-2">
          <h2 className={cn("text-lg font-bold text-neutral-900 uppercase tracking-wide", CalSans.className)}>
            Education
          </h2>
          <div className="space-y-3">
            {userData.education.map((edu: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <p className={cn("font-bold text-neutral-900", CalSans.className)}>
                    {edu.degree || 'Degree'}
                  </p>
                  {(edu.start_year || edu.end_year) && (
                    <p className={cn("text-sm text-neutral-600", CalSans.className)}>
                      {edu.start_year && edu.end_year
                        ? `${edu.start_year} - ${edu.end_year}`
                        : edu.start_year
                          ? `${edu.start_year} - Present`
                          : edu.end_year || ''}
                    </p>
                  )}
                </div>
                {edu.school && (
                  <p className={cn("text-sm text-neutral-700", CalSans.className)}>{edu.school}</p>
                )}
                {edu.gpa && (
                  <p className={cn("text-sm text-neutral-600", CalSans.className)}>GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications - Conditional */}
      {userData?.certifications && userData.certifications.length > 0 && (
        <div className="space-y-2">
          <h2 className={cn("text-lg font-bold text-neutral-900 uppercase tracking-wide", CalSans.className)}>
            Certifications
          </h2>
          <ul className="space-y-1">
            {userData.certifications.map((cert: any, idx: number) => (
              <li key={idx} className={cn("text-sm text-neutral-700 text-pretty flex gap-2", CalSans.className)}>
                <span className="text-neutral-400 select-none">•</span>
                <span className="flex-1">
                  {cert.name || cert.title}
                  {cert.issuer && ` - ${cert.issuer}`}
                  {cert.year && ` (${cert.year})`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages - Conditional */}
      {userData?.languages && userData.languages.length > 0 && (
        <div className="space-y-2">
          <h2 className={cn("text-lg font-bold text-neutral-900 uppercase tracking-wide", CalSans.className)}>
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {userData.languages.map((lang: any, idx: number) => (
              <span
                key={idx}
                className={cn("px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded", CalSans.className)}
              >
                {typeof lang === 'string' ? lang : `${lang.name} (${lang.proficiency})`}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
