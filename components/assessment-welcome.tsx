"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, BookOpen, FileText, Building2, ArrowRight } from "lucide-react"
import { AssessmentForm } from "./assessment-form"

export function AssessmentWelcome() {
  const [showAssessment, setShowAssessment] = useState(false)

  if (showAssessment) {
    return <AssessmentForm onBack={() => setShowAssessment(false)} />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
          <Building2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Your Financial Journey</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We'll help you access banking services tailored to your needs. Let's start by understanding your current
          situation.
        </p>
      </div>

      {/* Assessment Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardHeader className="text-center pb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Banking Awareness</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              We'll assess your knowledge of banking services and help you discover new opportunities.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardHeader className="text-center pb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Education Level</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Understanding your background helps us provide information in the most helpful way.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardHeader className="text-center pb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Document Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              We'll check what documents you have and help you get any missing ones.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* What to Expect Section */}
      <Card className="mb-8 bg-card/50">
        <CardHeader>
          <CardTitle className="text-2xl text-center">What to Expect</CardTitle>
          <CardDescription className="text-center text-base">
            This assessment takes about 5-10 minutes and will help us create a personalized plan for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Quick Questions</h4>
              <p className="text-muted-foreground">Answer simple questions about your banking experience and needs.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Personalized Results</h4>
              <p className="text-muted-foreground">
                Get recommendations tailored to your specific situation and goals.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Action Plan</h4>
              <p className="text-muted-foreground">
                Receive step-by-step guidance to access the banking services you need.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <Button onClick={() => setShowAssessment(true)} size="lg" className="text-lg px-8 py-6 h-auto">
          Start Your Assessment
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          Your information is secure and will only be used to provide personalized recommendations.
        </p>
      </div>
    </div>
  )
}
