/**
 * Sanitize and clean HTML output from Tiptap editor
 * Removes wrapper <p> tags for cleaner inline rendering
 */
export function sanitizeTiptapHTML(html: string): string {
    if (!html) return ''

    // Remove wrapping <p></p> tags for single-line content
    let cleaned = html.trim()
    if (cleaned.startsWith('<p>') && cleaned.endsWith('</p>') && cleaned.split('<p>').length === 2) {
        cleaned = cleaned.slice(3, -4)
    }

    // Basic sanitization - only allow safe tags
    const allowedTags = ['strong', 'em', 'b', 'i', 'u', 'br', 'p']
    const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi

    cleaned = cleaned.replace(tagRegex, (match, tag) => {
        if (allowedTags.includes(tag.toLowerCase())) {
            return match
        }
        return '' // Remove disallowed tags
    })

    // Remove any potentially dangerous attributes
    cleaned = cleaned.replace(/on\w+="[^"]*"/gi, '')
    cleaned = cleaned.replace(/javascript:/gi, '')

    return cleaned
}

/**
 * Convert Tiptap HTML to plain text (for fallback or export)
 */
export function tiptapToPlainText(html: string): string {
    if (!html) return ''
    return html
        .replace(/<[^>]*>/g, '') // Remove all HTML tags
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()
}
