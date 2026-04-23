import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NextAuthProvider } from "./providers"
import { ChatWidget } from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Campus Companion - Your Smart Academic Organizer",
  description: "All-in-one personal academic assistant for college students",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <ChatWidget />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
