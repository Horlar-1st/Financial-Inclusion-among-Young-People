"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, FileText, BookOpen, Building2, ArrowRight, RotateCcw } from "lucide-react"

interface AssessmentData {
  bankingAwareness: {
    hasAccount: string
    servicesKnown: string[]
    primaryConcern: string
  }
  education: {
    level: string
    financialLiteracy: string
    preferredLearning: string
  }
  documents: {
    hasId: boolean
    hasProofOfAddress: boolean
    hasIncomeProof: boolean
    hasOtherDocs: string[]
  }
}

interface AssessmentResultsProps {
  data: AssessmentData
  onRestart: () => void
}

export function AssessmentResults({ data, onRestart }: AssessmentResultsProps) {
  // Calculate readiness score
  const calculateReadinessScore = () => {
    let score = 0

    // Banking awareness (30 points)
    if (data.bankingAwareness.hasAccount === "yes") score += 15
    else if (data.bankingAwareness.hasAccount === "had") score += 10

    score += Math.min(data.bankingAwareness.servicesKnown.length * 2, 15)

    // Education (20 points)
    const eduLevels = { primary: 5, secondary: 10, vocational: 15, college: 20, other: 10 }
    score += eduLevels[data.education.level as keyof typeof eduLevels] || 0

    // Financial literacy (25 points)
    const litLevels = { beginner: 5, basic: 10, intermediate: 18, advanced: 25 }
    score += litLevels[data.education.financialLiteracy as keyof typeof litLevels] || 0

    // Documents (25 points)
    if (data.documents.hasId) score += 10
    if (data.documents.hasProofOfAddress) score += 8
    if (data.documents.hasIncomeProof) score += 7

    return Math.min(score, 100)
  }

  const readinessScore = calculateReadinessScore()

  const getReadinessLevel = (score: number) => {
    if (score >= 80)
      return { level: "High", color: "bg-green-500", description: "You're well-prepared for most banking services!" }
    if (score >= 60)
      return {
        level: "Medium",
        color: "bg-yellow-500",
        description: "You're on the right track with some areas to improve.",
      }
    return { level: "Getting Started", color: "bg-blue-500", description: "Let's build your foundation step by step." }
  }

  const readiness = getReadinessLevel(readinessScore)

  const getRecommendations = () => {
    const recommendations = []

    if (data.bankingAwareness.hasAccount === "no") {
      recommendations.push({
        title: "Open Your First Bank Account",
        description: "Start with a basic savings account to begin your banking journey.",
        priority: "high",
        icon: Building2,
      })
    }

    if (!data.documents.hasId) {
      recommendations.push({
        title: "Get Government-Issued ID",
        description: "This is essential for opening any bank account.",
        priority: "high",
        icon: FileText,
      })
    }

    if (data.education.financialLiteracy === "beginner") {
      recommendations.push({
        title: "Start Financial Education",
        description: "Learn the basics of banking and personal finance.",
        priority: "medium",
        icon: BookOpen,
      })
    }

    if (!data.documents.hasProofOfAddress) {
      recommendations.push({
        title: "Gather Proof of Address",
        description: "Collect utility bills or lease agreements for account opening.",
        priority: "medium",
        icon: FileText,
      })
    }

    return recommendations
  }

  const recommendations = getRecommendations()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Financial Inclusion Assessment</h1>
        <p className="text-muted-foreground">Here's your personalized roadmap to banking services</p>
      </div>

      {/* Readiness Score */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Banking Readiness Score</CardTitle>
          <CardDescription>Based on your current situation and available resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${readinessScore * 2.51} 251`}
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{readinessScore}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Badge variant="secondary" className={`${readiness.color} text-white mb-2`}>
              {readiness.level} Readiness
            </Badge>
            <p className="text-muted-foreground">{readiness.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Banking Awareness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Current Account:</span>
                <Badge variant={data.bankingAwareness.hasAccount === "yes" ? "default" : "secondary"}>
                  {data.bankingAwareness.hasAccount === "yes"
                    ? "Yes"
                    : data.bankingAwareness.hasAccount === "had"
                      ? "Previously"
                      : "No"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Services Known:</span>
                <span className="text-sm font-medium">{data.bankingAwareness.servicesKnown.length}/8</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Main Concern:</span>
                <p className="text-muted-foreground capitalize">
                  {data.bankingAwareness.primaryConcern.replace(/([A-Z])/g, " $1")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Education & Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Education Level:</span>
                <span className="text-sm font-medium capitalize">{data.education.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Financial Knowledge:</span>
                <span className="text-sm font-medium capitalize">{data.education.financialLiteracy}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Learning Style:</span>
                <p className="text-muted-foreground capitalize">{data.education.preferredLearning}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Document Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Government ID:</span>
                {data.documents.hasId ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Proof of Address:</span>
                {data.documents.hasProofOfAddress ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Income Proof:</span>
                {data.documents.hasIncomeProof ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <div className="text-sm">
                <span className="font-medium">Additional Docs:</span>
                <span className="text-muted-foreground ml-1">{data.documents.hasOtherDocs.length} available</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Next Steps</CardTitle>
          <CardDescription>Personalized recommendations based on your assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    rec.priority === "high" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <rec.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{rec.title}</h4>
                    <Badge variant={rec.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                      {rec.priority === "high" ? "High Priority" : "Medium Priority"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="text-lg px-8">
          Start Your Journey
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button variant="outline" size="lg" onClick={onRestart}>
          <RotateCcw className="mr-2 w-5 h-5" />
          Retake Assessment
        </Button>
      </div>
    </div>
  )
}
