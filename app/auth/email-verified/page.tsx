import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EmailVerifiedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
        <p className="text-muted-foreground mb-8">
          Your email has been successfully verified. You can now access all features.
        </p>
        <Link href="/protected/account">
          <Button className="w-full">Go to Your Account</Button>
        </Link>
      </div>
    </div>
  )
}
