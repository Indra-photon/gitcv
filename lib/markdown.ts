import { marked } from 'marked'

// Configure marked for inline parsing only
marked.setOptions({
    breaks: false,
    gfm: true,
})

/**
 * Parse inline markdown formatting (bold, italic, etc.)
 * Converts markdown syntax to HTML
 * - **text** or __text__ → <strong>text</strong>
 * - *text* or _text_ → <em>text</em>
 */
export function parseInlineMarkdown(text: string): string {
    if (!text) return ''

    // Use marked's inline parser
    const parsed = marked.parseInline(text) as string

    return parsed
}

/**
 * Sanitize HTML to prevent XSS attacks
 * Only allows safe formatting tags
 */
export function sanitizeHTML(html: string): string {
    // Remove any potentially dangerous tags/attributes
    // Only keep basic formatting tags
    const allowedTags = ['strong', 'em', 'b', 'i', 'u', 'br', 'code']
    const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi

    return html.replace(tagRegex, (match, tag) => {
        if (allowedTags.includes(tag.toLowerCase())) {
            return match
        }
        return '' // Remove disallowed tags
    })
}

/**
 * Combined function: parse and sanitize
 */
export function parseAndSanitize(text: string): string {
    const parsed = parseInlineMarkdown(text)
    return sanitizeHTML(parsed)
}
