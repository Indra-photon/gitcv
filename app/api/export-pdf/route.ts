import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { generateResumeHTML } from '@/lib/resume-html-generator'

export const maxDuration = 60 // Allow up to 60 seconds for PDF generation

export async function POST(request: NextRequest) {
  let browser = null

  try {
    const { resumeId, resumeData, userData, template } = await request.json()

    if (!resumeData || !userData) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      )
    }

    console.log('Starting PDF generation with template:', template || 'default')

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

    // Generate HTML using the shared generator with template support
    const html = generateResumeHTML(resumeData, userData, template)

    // Set the HTML content
    await page.setContent(html, {
      waitUntil: 'networkidle0', // Wait for all resources to load
    })

    // Wait a bit for fonts to load
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate PDF with proper margins for all pages
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true, // Respect @page CSS rules
      margin: {
        top: '48px',    // ~0.5 inch margin on all pages
        right: '48px',
        bottom: '48px',
        left: '48px',
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
