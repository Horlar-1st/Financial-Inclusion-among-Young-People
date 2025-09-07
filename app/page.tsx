import { AssessmentWelcome } from "@/components/assessment-welcome"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <AssessmentWelcome />
      <div className="container mx-auto px-4 pb-8 max-w-4xl">
        <div className="text-center space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/learn">
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Explore Learning Hub
              </Button>
            </Link>
            <Link href="/documents">
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Manage Documents
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Find Banking Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
