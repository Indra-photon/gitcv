/**
 * Shared Resume HTML Generator
 * Used by both the PDF preview page and the PDF export API
 * to ensure they look exactly the same
 */

export interface ResumeData {
  title?: string
  role?: string
  content: {
    projects?: Array<{
      repo_name: string
      repo_url?: string
      live_url?: string
      description?: string
      bullets?: string[]
      technologies?: string[]
    }>
    skills?: {
      frontend?: string[]
      backend?: string[]
      databases?: string[]
      tools?: string[]
      other?: string[]
    }
    problems_solved?: string[]
  }
}

// Use a flexible type that accepts the actual UserProfile from the store
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UserData = any

/**
 * Sanitize Tiptap HTML for safe rendering
 */
export function sanitizeHTML(html: string): string {
  if (!html) return ''
  let cleaned = html.trim()
  if (cleaned.startsWith('<p>') && cleaned.endsWith('</p>') && cleaned.split('<p>').length === 2) {
    cleaned = cleaned.slice(3, -4)
  }
  return cleaned
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '')
}

/**
 * Format date string to readable format
 */
export function formatDate(dateString: string | null): string | null {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * SVG Icons for GitHub and Globe links
 */
export const ICONS = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
}

/**
 * CSS Styles for the resume - used by both preview and PDF
 */
export const RESUME_STYLES = `
  /* Page margins for PDF - applies to all pages */
  @page {
    size: A4;
    margin: 48px;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 10pt;
    line-height: 1.6;
    color: #171717;
    background: white;
  }
  
  .resume-content {
    /* No padding here - @page margins handle it for PDF */
    /* Padding is only for preview iframe */
  }
  
  /* Header */
  .header {
    margin-bottom: 24px;
    border-bottom: 2px solid #171717;
    padding-bottom: 16px;
  }
  
  .name {
    font-size: 28pt;
    font-weight: 800;
    margin-bottom: 8px;
    color: #171717;
  }
  
  .contact-info {
    font-size: 9pt;
    color: #525252;
    margin-bottom: 4px;
  }
  
  .separator {
    margin: 0 4px;
    color: #525252;
  }
  
  .links {
    font-size: 9pt;
    margin-top: 4px;
  }
  
  .links a {
    color: #2563eb;
    text-decoration: none;
    margin-right: 8px;
  }
  
  /* Sections */
  .section {
    margin-bottom: 24px;
    /* Prevent section titles from being orphaned at bottom of page */
    break-inside: avoid-column;
  }
  
  .section-title {
    font-size: 12pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
    color: #171717;
    /* Keep section title with its content */
    break-after: avoid;
  }
  
  /* Projects */
  .project-item {
    margin-bottom: 16px;
    /* Try to keep project together, but allow break if needed */
    break-inside: avoid;
  }
  
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 4px;
  }
  
  .project-name {
    font-size: 13pt;
    font-weight: 700;
    color: #171717;
  }
  
  .project-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }
  
  .technologies {
    font-size: 9pt;
    color: #525252;
    font-style: italic;
    text-align: right;
  }
  
  .project-links {
    display: flex;
    gap: 8px;
  }
  
  .project-links a {
    color: #737373;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
  }
  
  .description {
    font-size: 10pt;
    color: #171717;
    margin-bottom: 6px;
    font-weight: 600;
  }
  
  /* Bullet lists */
  .bullet-list {
    margin-top: 4px;
    margin-left: 0;
    padding-left: 0;
    list-style: none;
  }
  
  .bullet-item {
    display: flex;
    margin-bottom: 4px;
    font-size: 10pt;
    color: #404040;
  }
  
  .bullet {
    color: #a3a3a3;
    margin-right: 8px;
    flex-shrink: 0;
  }
  
  .bullet-text {
    flex: 1;
  }
  
  /* Skills */
  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .skill-tag {
    background-color: #f5f5f5;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 9pt;
    color: #404040;
  }
  
  /* Work Experience */
  .work-item {
    margin-bottom: 16px;
    break-inside: avoid;
  }
  
  .work-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }
  
  .job-title {
    font-size: 11pt;
    font-weight: 700;
    color: #171717;
  }
  
  .date-text {
    font-size: 9pt;
    color: #525252;
  }
  
  .company {
    font-size: 10pt;
    font-weight: 600;
    color: #404040;
    margin-bottom: 4px;
  }
  
  /* Education */
  .edu-item {
    margin-bottom: 12px;
    break-inside: avoid;
  }
  
  .edu-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }
  
  .degree {
    font-size: 11pt;
    font-weight: 700;
    color: #171717;
  }
  
  .school {
    font-size: 10pt;
    color: #404040;
  }
  
  .gpa {
    font-size: 9pt;
    color: #525252;
  }
  
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
  
  /* For preview iframe - add padding since @page doesn't work there */
  @media screen {
    .resume-content {
      padding: 48px;
    }
  }
`

/**
 * Harvard ATS Template Styles - Ultra ATS-optimized
 */
export const HARVARD_STYLES = `
  /* Page margins for PDF - applies to all pages */
  @page {
    size: A4;
    margin: 48px;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    font-family: 'Times New Roman', Georgia, 'Garamond', serif;
    font-size: 11pt;
    line-height: 1.4;
    color: #000000;
    background: white;
  }
  
  .resume-content {
    /* No padding here - @page margins handle it for PDF */
  }
  
  /* Harvard Header - Centered name, contact on one line */
  .harvard-header {
    text-align: center;
    border-bottom: 1px solid #000000;
    padding-bottom: 12px;
    margin-bottom: 16px;
  }
  
  .harvard-name {
    font-size: 20pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 4px;
    color: #000000;
  }
  
  .harvard-contact {
    font-size: 10pt;
    color: #000000;
  }
  
  .harvard-divider {
    margin: 0 6px;
    color: #000000;
  }
  
  /* Section styling */
  .harvard-section {
    margin-bottom: 14px;
    break-inside: avoid;
  }
  
  .harvard-section-title {
    font-size: 11pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 8px;
    color: #000000;
  }
  
  /* Experience/Project items */
  .harvard-item {
    margin-bottom: 10px;
    break-inside: avoid;
  }
  
  .harvard-item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  
  .harvard-item-title {
    font-size: 11pt;
    font-weight: bold;
    color: #000000;
  }
  
  .harvard-item-date {
    font-size: 10pt;
    font-style: italic;
    color: #000000;
  }
  
  .harvard-item-subtitle {
    font-size: 10pt;
    font-style: italic;
    color: #333333;
    margin-bottom: 3px;
  }
  
  /* Bullet lists */
  .harvard-bullets {
    margin-left: 18px;
    margin-top: 3px;
  }
  
  .harvard-bullets li {
    font-size: 10pt;
    color: #000000;
    margin-bottom: 2px;
    line-height: 1.3;
  }
  
  /* Skills - Simple inline list */
  .harvard-skills-text {
    font-size: 10pt;
    color: #000000;
    line-height: 1.4;
  }
  
  .harvard-skill-category {
    font-weight: bold;
  }
  
  /* Education */
  .harvard-edu-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  
  .harvard-degree {
    font-size: 11pt;
    font-weight: bold;
    color: #000000;
  }
  
  .harvard-school {
    font-size: 10pt;
    font-style: italic;
    color: #333333;
  }
  
  .harvard-gpa {
    font-size: 10pt;
    color: #000000;
  }
  
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
  
  /* For preview iframe - add padding since @page doesn't work there */
  @media screen {
    .resume-content {
      padding: 48px;
    }
  }
`

/**
 * Generate Harvard ATS template HTML
 */
function generateHarvardTemplate(resumeData: ResumeData, userData: UserData): string {
  const { content, role } = resumeData

  const roleDisplay = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : 'Full Stack'

  // Group skills by category for Harvard format
  const skillCategories = []
  if (content.skills?.frontend?.length) {
    skillCategories.push({ label: 'Frontend', skills: content.skills.frontend })
  }
  if (content.skills?.backend?.length) {
    skillCategories.push({ label: 'Backend', skills: content.skills.backend })
  }
  if (content.skills?.databases?.length) {
    skillCategories.push({ label: 'Databases', skills: content.skills.databases })
  }
  if (content.skills?.tools?.length) {
    skillCategories.push({ label: 'Tools', skills: content.skills.tools })
  }
  if (content.skills?.other?.length) {
    skillCategories.push({ label: 'Other', skills: content.skills.other })
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap" rel="stylesheet">
  <style>${HARVARD_STYLES}</style>
</head>
<body>
  <div class="resume-content">
    <!-- Header -->
    <div class="harvard-header">
      <div class="harvard-name">${userData?.full_name || userData?.github_username || 'Your Name'}</div>
      <div class="harvard-contact">
        ${userData?.location ? `${userData.location}` : ''}
        ${userData?.phone ? `<span class="harvard-divider">|</span>${userData.phone}` : ''}
        ${userData?.email ? `<span class="harvard-divider">|</span>${userData.email}` : ''}
        ${userData?.linkedin_url ? `<span class="harvard-divider">|</span>${userData.linkedin_url.replace('https://', '').replace('http://', '').replace('www.', '')}` : ''}
        ${userData?.github_username ? `<span class="harvard-divider">|</span>github.com/${userData.github_username}` : ''}
      </div>
    </div>

    <!-- Summary/Objective -->
    ${userData?.professional_headline ? `
    <div class="harvard-section">
      <div class="harvard-section-title">Summary</div>
      <p class="harvard-skills-text">${roleDisplay} Developer with expertise in building scalable web applications. ${userData.professional_headline}</p>
    </div>
    ` : ''}

    <!-- Work Experience -->
    ${userData?.work_experience && userData.work_experience.length > 0 ? `
    <div class="harvard-section">
      <div class="harvard-section-title">Professional Experience</div>
      ${userData.work_experience.map((work: any) => `
        <div class="harvard-item">
          <div class="harvard-item-header">
            <span class="harvard-item-title">${work.job_title || 'Position'}</span>
            <span class="harvard-item-date">${work.start_date ? `${formatDate(work.start_date)} - ${work.end_date ? formatDate(work.end_date) : 'Present'}` : ''}</span>
          </div>
          <div class="harvard-item-subtitle">${work.company || 'Company Name'}</div>
          ${work.description || work.responsibilities?.length > 0 ? `
            <ul class="harvard-bullets">
              ${work.description ? `<li>${sanitizeHTML(work.description)}</li>` : ''}
              ${work.responsibilities ? work.responsibilities.map((resp: any) => `<li>${sanitizeHTML(resp)}</li>`).join('') : ''}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Projects -->
    ${content.projects && content.projects.length > 0 ? `
    <div class="harvard-section">
      <div class="harvard-section-title">Projects</div>
      ${content.projects.map(project => `
        <div class="harvard-item">
          <div class="harvard-item-header">
            <span class="harvard-item-title">${project.repo_name}${project.technologies && project.technologies.length > 0 ? ` (${project.technologies.slice(0, 3).join(', ')})` : ''}</span>
            ${project.repo_url || project.live_url ? `<span class="harvard-item-date">${project.live_url ? project.live_url.replace('https://', '').replace('http://', '') : project.repo_url?.replace('https://', '').replace('http://', '')}</span>` : ''}
          </div>
          ${project.description || (project.bullets && project.bullets.length > 0) ? `
            <ul class="harvard-bullets">
              ${project.description ? `<li>${sanitizeHTML(project.description)}</li>` : ''}
              ${project.bullets && project.bullets.length > 0 ? project.bullets.map(bullet => `<li>${sanitizeHTML(bullet)}</li>`).join('') : ''}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Education -->
    ${userData?.education && userData.education.length > 0 ? `
    <div class="harvard-section">
      <div class="harvard-section-title">Education</div>
      ${userData.education.map((edu: any) => `
        <div class="harvard-item">
          <div class="harvard-edu-header">
            <span class="harvard-degree">${edu.degree || 'Degree'}</span>
            <span class="harvard-item-date">${edu.start_year && edu.end_year ? `${edu.start_year} - ${edu.end_year}` : edu.start_year ? `${edu.start_year} - Present` : edu.end_year || ''}</span>
          </div>
          <div class="harvard-school">${edu.school || 'University'}</div>
          ${edu.gpa ? `<div class="harvard-gpa">GPA: ${edu.gpa}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Technical Skills - ATS-friendly inline format -->
    ${skillCategories.length > 0 ? `
    <div class="harvard-section">
      <div class="harvard-section-title">Technical Skills</div>
      <p class="harvard-skills-text">
        ${skillCategories.map(cat => `<span class="harvard-skill-category">${cat.label}:</span> ${cat.skills.join(', ')}`).join(' | ')}
      </p>
    </div>
    ` : ''}

    <!-- Key Achievements -->
    ${content.problems_solved && content.problems_solved.length > 0 ? `
    <div class="harvard-section">
      <div class="harvard-section-title">Key Achievements</div>
      <ul class="harvard-bullets">
        ${content.problems_solved.map(problem => `<li>${sanitizeHTML(problem)}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- Certifications -->
    ${userData?.certifications && userData.certifications.length > 0 ? `
    <div class="harvard-section">
      <div class="harvard-section-title">Certifications</div>
      <ul class="harvard-bullets">
        ${userData.certifications.map((cert: any) => `<li>${cert.name || cert.title || cert}${cert.issuer ? ` - ${cert.issuer}` : ''}${cert.year ? ` (${cert.year})` : ''}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- Languages -->
    ${userData?.languages && userData.languages.length > 0 ? `
    <div class="harvard-section">
      <div class="harvard-section-title">Languages</div>
      <p class="harvard-skills-text">${userData.languages.map((lang: any) => typeof lang === 'string' ? lang : `${lang.name} (${lang.proficiency})`).join(', ')}</p>
    </div>
    ` : ''}
  </div>
</body>
</html>
  `
}

/**
 * Generate the complete resume HTML
 * This is the single source of truth for resume rendering
 */
export function generateResumeHTML(resumeData: ResumeData, userData: UserData, template?: string): string {
  // Check if Harvard template is selected
  if (template === 'harvard') {
    return generateHarvardTemplate(resumeData, userData)
  }

  // Default/Classic template
  const { content, role } = resumeData

  const allSkills = [
    ...(content.skills?.frontend || []),
    ...(content.skills?.backend || []),
    ...(content.skills?.databases || []),
    ...(content.skills?.tools || []),
    ...(content.skills?.other || []),
  ]

  const roleDisplay = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : 'Full Stack'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${RESUME_STYLES}</style>
</head>
<body>
  <div class="resume-content">
    <!-- Header -->
    <div class="header">
      <div class="name">${userData?.full_name || userData?.github_username || 'Your Name'}</div>
      <div class="contact-info">
        <span>${userData?.professional_headline || `${roleDisplay} Developer`}</span>
        ${userData?.location ? `<span class="separator">|</span><span>${userData.location}</span>` : ''}
        ${userData?.phone ? `<span class="separator">|</span><span>${userData.phone}</span>` : ''}
        ${userData?.email ? `<span class="separator">|</span><span>${userData.email}</span>` : ''}
      </div>
      <div class="links">
        ${userData?.github_username ? `<a href="https://github.com/${userData.github_username}">github.com/${userData.github_username}</a>` : ''}
        ${userData?.linkedin_url ? `${userData?.github_username ? '<span class="separator">|</span>' : ''}<a href="${userData.linkedin_url}">${userData.linkedin_url.replace('https://', '').replace('http://', '').replace('www.', '')}</a>` : ''}
        ${userData?.portfolio_url ? `${userData?.github_username || userData?.linkedin_url ? '<span class="separator">|</span>' : ''}<a href="${userData.portfolio_url}">${userData.portfolio_url.replace('https://', '').replace('http://', '').replace('www.', '')}</a>` : ''}
      </div>
    </div>

    <!-- Projects -->
    ${content.projects && content.projects.length > 0 ? `
    <div class="section">
      <div class="section-title">Projects</div>
      ${content.projects.map(project => `
        <div class="project-item">
          <div class="project-header">
            <div class="project-name">${project.repo_name}</div>
            <div class="project-right">
              ${project.technologies && project.technologies.length > 0 ? `<div class="technologies">${project.technologies.slice(0, 3).join(', ')}</div>` : ''}
              <div class="project-links">
                ${project.repo_url ? `<a href="${project.repo_url}" title="GitHub">${ICONS.github}</a>` : ''}
                ${project.live_url ? `<a href="${project.live_url}" title="Live Demo">${ICONS.globe}</a>` : ''}
              </div>
            </div>
          </div>
          ${project.description ? `<div class="description">${sanitizeHTML(project.description)}</div>` : ''}
          ${project.bullets && project.bullets.length > 0 ? `
            <ul class="bullet-list">
              ${project.bullets.map(bullet => `
                <li class="bullet-item">
                  <span class="bullet">•</span>
                  <span class="bullet-text">${sanitizeHTML(bullet)}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Key Achievements -->
    ${content.problems_solved && content.problems_solved.length > 0 ? `
    <div class="section">
      <div class="section-title">Key Achievements</div>
      <ul class="bullet-list">
        ${content.problems_solved.map(problem => `
          <li class="bullet-item">
            <span class="bullet">•</span>
            <span class="bullet-text">${sanitizeHTML(problem)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- Technical Skills -->
    ${allSkills.length > 0 ? `
    <div class="section">
      <div class="section-title">Technical Skills</div>
      <div class="skills-container">
        ${allSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Work Experience -->
    ${userData?.work_experience && userData.work_experience.length > 0 ? `
    <div class="section">
      <div class="section-title">Work Experience</div>
      ${userData.work_experience.map((work: any) => `
        <div class="work-item">
          <div class="work-header">
            <div class="job-title">${work.job_title || 'Position'}</div>
            <div class="date-text">${work.start_date ? `${formatDate(work.start_date)} - ${work.end_date ? formatDate(work.end_date) : 'Present'}` : 'Date'}</div>
          </div>
          <div class="company">${work.company || 'Company Name'}</div>
          ${work.description ? `<div class="description">${sanitizeHTML(work.description)}</div>` : ''}
          ${work.responsibilities && work.responsibilities.length > 0 ? `
            <ul class="bullet-list">
              ${work.responsibilities.map((resp: any) => `
                <li class="bullet-item">
                  <span class="bullet">•</span>
                  <span class="bullet-text">${sanitizeHTML(resp)}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Education -->
    ${userData?.education && userData.education.length > 0 ? `
    <div class="section">
      <div class="section-title">Education</div>
      ${userData.education.map((edu: any) => `
        <div class="edu-item">
          <div class="edu-header">
            <div class="degree">${edu.degree || 'Degree'}</div>
            ${edu.start_year || edu.end_year ? `<div class="date-text">${edu.start_year && edu.end_year ? `${edu.start_year} - ${edu.end_year}` : edu.start_year ? `${edu.start_year} - Present` : edu.end_year || ''}</div>` : ''}
          </div>
          ${edu.school ? `<div class="school">${edu.school}</div>` : ''}
          ${edu.gpa ? `<div class="gpa">GPA: ${edu.gpa}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Certifications -->
    ${userData?.certifications && userData.certifications.length > 0 ? `
    <div class="section">
      <div class="section-title">Certifications</div>
      <ul class="bullet-list">
        ${userData.certifications.map((cert: any) => `
          <li class="bullet-item">
            <span class="bullet">•</span>
            <span class="bullet-text">${cert.name || cert.title}${cert.issuer ? ` - ${cert.issuer}` : ''}${cert.year ? ` (${cert.year})` : ''}</span>
          </li>
        `).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- Languages -->
    ${userData?.languages && userData.languages.length > 0 ? `
    <div class="section">
      <div class="section-title">Languages</div>
      <div class="skills-container">
        ${userData.languages.map((lang: any) => `<span class="skill-tag">${typeof lang === 'string' ? lang : `${lang.name} (${lang.proficiency})`}</span>`).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
  `
}

