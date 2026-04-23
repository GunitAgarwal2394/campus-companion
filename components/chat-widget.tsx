"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 p-0 hover:scale-105 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right h-[500px]">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/90 text-white" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
            {messages.length === 0 ? (
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
                <p>Hello! I'm your Campus Companion AI.</p>
                <p>Ask me for study tips, placement advice, or help with your notes.</p>
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 ${m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-tl-none"}`}>
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 focus-visible:ring-primary"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
