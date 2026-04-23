import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          You must be logged in to access this page. Please return to the home page and log in using the button in the navigation bar.
        </p>
        <Link href="/">
          <Button className="w-full">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}
