/**
 * Nebius AI Client
 * Uses OpenAI SDK to connect to Nebius API
 */

import OpenAI from 'openai'

// Initialize Nebius client
export const nebiusClient = new OpenAI({
  baseURL: 'https://api.tokenfactory.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY || ''
})

export const NEBIUS_MODEL = 'Qwen/Qwen3-Coder-480B-A35B-Instruct'

/**
 * Call Nebius AI with system and user prompts
 */
export async function callNebiusAI(
  systemPrompt: string,
  userMessage: string
): Promise<{
  content: string
  tokens_used: number
  generation_time_seconds: number
}> {
  const startTime = Date.now()

  try {
    const response = await nebiusClient.chat.completions.create({
      model: NEBIUS_MODEL,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })

    const endTime = Date.now()
    const generationTime = (endTime - startTime) / 1000 // Convert to seconds

    const content = response.choices[0]?.message?.content || ''
    const tokensUsed = response.usage?.total_tokens || 0

    return {
      content,
      tokens_used: tokensUsed,
      generation_time_seconds: generationTime
    }
  } catch (error) {
    console.error('Nebius AI Error:', error)
    throw new Error('Failed to generate AI content')
  }
}

/**
 * Parse JSON response from AI (handles markdown code blocks)
 */
export function parseAIResponse(content: string): any {
  try {
    // Remove markdown code blocks if present
    const cleaned = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    return JSON.parse(cleaned)
  } catch (error) {
    console.error('Failed to parse AI response:', error)
    console.error('Raw content:', content)
    throw new Error('Invalid JSON response from AI')
  }
}