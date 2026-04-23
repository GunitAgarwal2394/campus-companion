import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
      system: "You are the Campus Companion AI assistant. You help students with their studies, organizing their material, giving advice on placements, and answering questions about their academic progress. Be concise, encouraging, and helpful."
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("AI Chat Error:", error)
    return new Response(JSON.stringify({ error: "Failed to communicate with AI provider. Check your API key." }), { status: 500 })
  }
}
