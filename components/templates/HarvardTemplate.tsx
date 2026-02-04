'use client'

import { sanitizeTiptapHTML } from '@/lib/tiptap-utils'

interface Project {
    repo_name: string
    repo_url: string
    live_url?: string
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

interface HarvardTemplateProps {
    content: {
        projects: Project[]
        skills: Skills
        problems_solved: string[]
    }
    role: string
    userData?: any
}

export default function HarvardTemplate({ content, role, userData }: HarvardTemplateProps) {
    // Group skills by category for Harvard format
    const skillCategories: { label: string; skills: string[] }[] = []
    if (content.skills.frontend?.length) {
        skillCategories.push({ label: 'Frontend', skills: content.skills.frontend })
    }
    if (content.skills.backend?.length) {
        skillCategories.push({ label: 'Backend', skills: content.skills.backend })
    }
    if (content.skills.databases?.length) {
        skillCategories.push({ label: 'Databases', skills: content.skills.databases })
    }
    if (content.skills.tools?.length) {
        skillCategories.push({ label: 'Tools', skills: content.skills.tools })
    }
    if (content.skills.other?.length) {
        skillCategories.push({ label: 'Other', skills: content.skills.other })
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const roleDisplay = role
        ? role.charAt(0).toUpperCase() + role.slice(1)
        : 'Full Stack'

    return (
        <div className="p-12 font-serif" style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
            {/* Header - Centered name with border */}
            <div className="text-center border-b border-black pb-4 mb-6">
                <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">
                    {userData?.full_name || userData?.github_username || 'Your Name'}
                </h1>
                <div className="text-sm flex flex-wrap justify-center gap-x-2">
                    {userData?.location && <span>{userData.location}</span>}
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
                    {userData?.linkedin_url && (
                        <>
                            <span>|</span>
                            <span>{userData.linkedin_url.replace('https://', '').replace('http://', '').replace('www.', '')}</span>
                        </>
                    )}
                    {userData?.github_username && (
                        <>
                            <span>|</span>
                            <span>github.com/{userData.github_username}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Summary */}
            {userData?.professional_headline && (
                <div className="mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-1 mb-2">
                        Summary
                    </h2>
                    <p className="text-sm leading-relaxed">
                        {roleDisplay} Developer with expertise in building scalable web applications. {userData.professional_headline}
                    </p>
                </div>
            )}

            {/* Work Experience */}
            {userData?.work_experience && userData.work_experience.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
                        Professional Experience
                    </h2>
                    <div className="space-y-4">
                        {userData.work_experience.map((work: any, idx: number) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-sm">{work.job_title || 'Position'}</span>
                                    <span className="text-sm italic">
                                        {work.start_date
                                            ? `${formatDate(work.start_date)} - ${work.end_date ? formatDate(work.end_date) : 'Present'}`
                                            : ''}
                                    </span>
                                </div>
                                <div className="text-sm italic text-gray-700 mb-1">{work.company || 'Company Name'}</div>
                                {(work.description || work.responsibilities?.length > 0) && (
                                    <ul className="list-disc ml-5 text-sm space-y-1">
                                        {work.description && (
                                            <li dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(work.description) }} />
                                        )}
                                        {work.responsibilities?.map((resp: string, respIdx: number) => (
                                            <li key={respIdx} dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(resp) }} />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {content.projects.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {content.projects.map((project, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-sm">
                                        {project.repo_name}
                                        {project.technologies.length > 0 && (
                                            <span className="font-normal"> ({project.technologies.slice(0, 3).join(', ')})</span>
                                        )}
                                    </span>
                                    {(project.live_url || project.repo_url) && (
                                        <span className="text-sm italic">
                                            {(project.live_url || project.repo_url || '').replace('https://', '').replace('http://', '')}
                                        </span>
                                    )}
                                </div>
                                {(project.description || project.bullets?.length > 0) && (
                                    <ul className="list-disc ml-5 text-sm space-y-1 mt-1">
                                        {project.description && (
                                            <li dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(project.description) }} />
                                        )}
                                        {project.bullets?.map((bullet, bulletIdx) => (
                                            <li key={bulletIdx} dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(bullet) }} />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {userData?.education && userData.education.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-1 mb-3">
                        Education
                    </h2>
                    <div className="space-y-3">
                        {userData.education.map((edu: any, idx: number) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-sm">{edu.degree || 'Degree'}</span>
                                    <span className="text-sm italic">
                                        {edu.start_year && edu.end_year
                                            ? `${edu.start_year} - ${edu.end_year}`
                                            : edu.start_year
                                                ? `${edu.start_year} - Present`
                                                : edu.end_year || ''}
                                    </span>
                                </div>
                                <div className="text-sm italic text-gray-700">{edu.school || 'University'}</div>
                                {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Technical Skills - ATS-friendly inline format */}
            {skillCategories.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-1 mb-2">
                        Technical Skills
                    </h2>
                    <p className="text-sm leading-relaxed">
                        {skillCategories.map((cat, idx) => (
                            <span key={cat.label}>
                                <strong>{cat.label}:</strong> {cat.skills.join(', ')}
                                {idx < skillCategories.length - 1 && ' | '}
                            </span>
                        ))}
                    </p>
                </div>
            )}

            {/* Key Achievements */}
            {content.problems_solved.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-1 mb-2">
                        Key Achievements
                    </h2>
                    <ul className="list-disc ml-5 text-sm space-y-1">
                        {content.problems_solved.map((problem, idx) => (
                            <li key={idx} dangerouslySetInnerHTML={{ __html: sanitizeTiptapHTML(problem) }} />
                        ))}
                    </ul>
                </div>
            )}

            {/* Certifications */}
            {userData?.certifications && userData.certifications.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-1 mb-2">
                        Certifications
                    </h2>
                    <ul className="list-disc ml-5 text-sm space-y-1">
                        {userData.certifications.map((cert: any, idx: number) => (
                            <li key={idx}>
                                {cert.name || cert.title || cert}
                                {cert.issuer && ` - ${cert.issuer}`}
                                {cert.year && ` (${cert.year})`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Languages */}
            {userData?.languages && userData.languages.length > 0 && (
                <div className="mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-1 mb-2">
                        Languages
                    </h2>
                    <p className="text-sm">
                        {userData.languages
                            .map((lang: any) => (typeof lang === 'string' ? lang : `${lang.name} (${lang.proficiency})`))
                            .join(', ')}
                    </p>
                </div>
            )}
        </div>
    )
}
