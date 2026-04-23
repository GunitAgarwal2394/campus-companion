import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const text = await req.text()
    const params = new URLSearchParams(text)
    
    const body = params.get("Body")
    const from = params.get("From")

    console.log(`Received WhatsApp message from ${from}: ${body}`)

    const twiml = `
      <Response>
        <Message>
          Campus Companion: We received your message! Log into the app to manage your study schedule.
        </Message>
      </Response>
    `

    return new NextResponse(twiml, {
      headers: {
        "Content-Type": "text/xml",
      },
    })
  } catch (error) {
    console.error("WhatsApp Webhook Error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
