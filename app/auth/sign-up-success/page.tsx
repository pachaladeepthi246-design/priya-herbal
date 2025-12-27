import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl"></div>
            <CheckCircle className="w-16 h-16 text-secondary relative" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Account Created!</h1>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-sm mb-1">Verify Your Email</p>
              <p className="text-sm text-muted-foreground">
                We've sent a confirmation link to your email. Click it to verify your account and start shopping.
              </p>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-8">
          Can't find the email? Check your spam folder or{" "}
          <button className="text-primary hover:underline font-semibold">resend confirmation</button>
        </p>

        <Link href="/">
          <Button className="w-full">Continue Shopping</Button>
        </Link>

        <p className="text-sm text-muted-foreground mt-6">
          Have questions?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
