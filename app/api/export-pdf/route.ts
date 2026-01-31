import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export const maxDuration = 60 // Allow up to 60 seconds for PDF generation

export async function POST(request: NextRequest) {
  let browser = null

  try {
    const { resumeId, resumeData, userData } = await request.json()

    if (!resumeData || !userData) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      )
    }

    console.log('Starting PDF generation...')

    // Launch Puppeteer browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    })

    const page = await browser.newPage()

    // Set viewport to A4 dimensions (in pixels at 96 DPI)
    await page.setViewport({
      width: 794, // A4 width at 96 DPI
      height: 1123, // A4 height at 96 DPI
      deviceScaleFactor: 2, // High resolution
    })

    // Create HTML content with the resume template
    const html = generateResumeHTML(resumeData, userData)

    // Set the HTML content
    await page.setContent(html, {
      waitUntil: 'networkidle0', // Wait for all resources to load
    })

    // Wait a bit for fonts to load
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
    })

    await browser.close()
    browser = null

    console.log('PDF generated successfully')

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeData.title || 'resume'}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error('Error generating PDF:', error)

    if (browser) {
      await browser.close()
    }

    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * Sanitize Tiptap HTML for PDF generation
 */
function sanitizeTiptapHTML(html: string): string {
  if (!html) return ''

  // Remove wrapping <p></p> tags for single-line content
  let cleaned = html.trim()
  if (cleaned.startsWith('<p>') && cleaned.endsWith('</p>') && cleaned.split('<p>').length === 2) {
    cleaned = cleaned.slice(3, -4)
  }

  // Basic sanitization
  const safeHTML = cleaned
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '')

  return safeHTML
}

function generateResumeHTML(resumeData: any, userData: any) {
  const { content, role } = resumeData

  const allSkills = [
    ...(content.skills.frontend || []),
    ...(content.skills.backend || []),
    ...(content.skills.databases || []),
    ...(content.skills.tools || []),
    ...(content.skills.other || []),
  ]

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 10pt;
      line-height: 1.6;
      color: #171717;
      background: white;
    }
    
    .container {
      padding: 48px;
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
    
    .contact-info span {
      margin-right: 8px;
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
    
    .separator {
      margin: 0 4px;
      color: #525252;
    }
    
    /* Sections */
    .section {
      margin-bottom: 20px;
    }
    
    .section-title {
      font-size: 12pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      color: #171717;
    }
    
    /* Projects */
    .project-item {
      margin-bottom: 14px;
    }
    
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    
    .project-name {
      font-size: 14pt;
      font-weight: 700;
      color: #171717;
    }
    
    .technologies {
      font-size: 9pt;
      color: #525252;
      font-style: italic;
    }
    
    .description {
      font-size: 10pt;
      color: #171717;
      margin-bottom: 4px;
    }
    
    .bullet-list {
      margin-top: 4px;
      margin-left: 0;
      padding-left: 0;
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
      display: inline-block;
      margin-right: 8px;
      margin-bottom: 8px;
    }
    
    /* Work Experience */
    .work-item {
      margin-bottom: 14px;
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
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="name">${userData?.full_name || userData?.github_username || 'Your Name'}</div>
      <div class="contact-info">
        <span>${userData?.professional_headline || `${role.charAt(0).toUpperCase() + role.slice(1)} Developer`}</span>
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
    ${content.projects.length > 0 ? `
    <div class="section">
      <div class="section-title">Projects</div>
      ${content.projects.map((project: any) => `
        <div class="project-item">
          <div class="project-header">
            <div class="project-name">${project.repo_name}</div>
            ${project.technologies.length > 0 ? `<div class="technologies">${project.technologies.slice(0, 3).join(', ')}</div>` : ''}
          </div>
          ${project.description ? `<div class="description">${sanitizeTiptapHTML(project.description)}</div>` : ''}
          ${project.bullets.length > 0 ? `
            <ul class="bullet-list">
              ${project.bullets.map((bullet: string) => `
                <li class="bullet-item">
                  <span class="bullet">•</span>
                  <span class="bullet-text">${sanitizeTiptapHTML(bullet)}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Problems Solved -->
    ${content.problems_solved.length > 0 ? `
    <div class="section">
      <div class="section-title">Key Achievements</div>
      <ul class="bullet-list">
        ${content.problems_solved.map((problem: string) => `
          <li class="bullet-item">
            <span class="bullet">•</span>
            <span class="bullet-text">${sanitizeTiptapHTML(problem)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- Skills -->
    ${allSkills.length > 0 ? `
    <div class="section">
      <div class="section-title">Technical Skills</div>
      <div class="skills-container">
        ${allSkills.map((skill: string) => `<span class="skill-tag">${skill}</span>`).join('')}
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
          ${work.description ? `<div class="description">${sanitizeTiptapHTML(work.description)}</div>` : ''}
          ${work.responsibilities && work.responsibilities.length > 0 ? `
            <ul class="bullet-list">
              ${work.responsibilities.map((resp: string) => `
                <li class="bullet-item">
                  <span class="bullet">•</span>
                  <span class="bullet-text">${sanitizeTiptapHTML(resp)}</span>
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
          ${edu.gpa ? `<div class="date-text">GPA: ${edu.gpa}</div>` : ''}
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
