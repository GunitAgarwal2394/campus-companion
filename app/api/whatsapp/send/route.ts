import { NextResponse } from "next/server"
import { twilioClient, twilioPhoneNumber } from "@/lib/twilio"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, toPhoneNumber } = await req.json()

    if (!message || !toPhoneNumber) {
      return NextResponse.json({ error: "Missing message or phone number" }, { status: 400 })
    }

    if (!twilioClient) {
      return NextResponse.json({ error: "Twilio credentials not configured" }, { status: 500 })
    }

    const formattedNumber = toPhoneNumber.startsWith("whatsapp:") ? toPhoneNumber : `whatsapp:${toPhoneNumber}`

    const response = await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedNumber,
    })

    return NextResponse.json({ success: true, messageId: response.sid })
  } catch (error) {
    console.error("WhatsApp Send Error:", error)
    return NextResponse.json({ error: "Failed to send WhatsApp message" }, { status: 500 })
  }
}
