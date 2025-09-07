"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen, Video, FileText, Users, Play } from "lucide-react"

interface LearningModuleProps {
  module: {
    id: string
    title: string
    description: string
    difficulty: string
    duration: string
    format: string
    topics: string[]
    icon: any
    color: string
  }
  progress: {
    completed: boolean
    progress: number
    timeSpent: number
  }
  onBack: () => void
  onProgressUpdate: (progress: { progress: number; timeSpent: number; completed: boolean }) => void
}

export function LearningModule({ module, progress, onBack, onProgressUpdate }: LearningModuleProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [sectionProgress, setSectionProgress] = useState<boolean[]>(new Array(module.topics.length).fill(false))

  const handleSectionComplete = (sectionIndex: number) => {
    const newSectionProgress = [...sectionProgress]
    newSectionProgress[sectionIndex] = true
    setSectionProgress(newSectionProgress)

    const completedSections = newSectionProgress.filter(Boolean).length
    const newProgress = Math.round((completedSections / module.topics.length) * 100)
    const isCompleted = completedSections === module.topics.length

    onProgressUpdate({
      progress: newProgress,
      timeSpent: progress.timeSpent + 5, // Simulate time spent
      completed: isCompleted,
    })
  }

  const handleNext = () => {
    if (currentSection < module.topics.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Video":
        return Video
      case "Interactive":
        return Play
      case "Reading":
        return FileText
      case "Personal":
        return Users
      default:
        return BookOpen
    }
  }

  const FormatIcon = getFormatIcon(module.format)
  const currentTopic = module.topics[currentSection]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hub
        </Button>
        <div className="flex-1">
          <Progress value={(currentSection / module.topics.length) * 100} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground">
          {currentSection + 1} of {module.topics.length}
        </span>
      </div>

      {/* Module Info */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 ${module.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <module.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{module.title}</CardTitle>
              <CardDescription className="text-base mb-4">{module.description}</CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {module.duration}
                </div>
                <div className="flex items-center gap-1">
                  <FormatIcon className="w-4 h-4" />
                  {module.format}
                </div>
                <Badge variant="outline">{module.difficulty}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Learning Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
              {currentSection + 1}
            </span>
            {currentTopic}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content based on format */}
          {module.format === "Interactive" && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Interactive Learning: {currentTopic}</h4>
                <p className="text-muted-foreground mb-4">
                  Let's explore {currentTopic.toLowerCase()} through hands-on activities and real-world examples.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h5 className="font-medium mb-2">Key Concept</h5>
                    <p className="text-sm text-muted-foreground">
                      Understanding the fundamentals of {currentTopic.toLowerCase()} and how it applies to your
                      financial life.
                    </p>
                  </Card>
                  <Card className="p-4">
                    <h5 className="font-medium mb-2">Real Example</h5>
                    <p className="text-sm text-muted-foreground">
                      See how {currentTopic.toLowerCase()} works in practice with relatable scenarios.
                    </p>
                  </Card>
                </div>
              </div>
              <Button
                onClick={() => handleSectionComplete(currentSection)}
                disabled={sectionProgress[currentSection]}
                className="w-full"
              >
                {sectionProgress[currentSection] ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Section Completed
                  </>
                ) : (
                  "Complete Interactive Activity"
                )}
              </Button>
            </div>
          )}

          {module.format === "Video" && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
                  <h4 className="font-semibold mb-2">Video: {currentTopic}</h4>
                  <p className="text-muted-foreground">Watch and learn about {currentTopic.toLowerCase()}</p>
                </div>
              </div>
              <Button
                onClick={() => handleSectionComplete(currentSection)}
                disabled={sectionProgress[currentSection]}
                className="w-full"
              >
                {sectionProgress[currentSection] ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Video Watched
                  </>
                ) : (
                  "Mark Video as Watched"
                )}
              </Button>
            </div>
          )}

          {module.format === "Reading" && (
            <div className="space-y-4">
              <div className="prose max-w-none">
                <h4 className="font-semibold mb-4">Reading: {currentTopic}</h4>
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <p>
                    This section covers the essential aspects of {currentTopic.toLowerCase()}. Understanding these
                    concepts will help you make informed financial decisions.
                  </p>
                  <h5 className="font-medium">Key Points:</h5>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Fundamental principles of {currentTopic.toLowerCase()}</li>
                    <li>How it affects your financial well-being</li>
                    <li>Best practices and common mistakes to avoid</li>
                    <li>Steps to implement what you've learned</li>
                  </ul>
                  <div className="bg-primary/10 p-4 rounded border-l-4 border-primary">
                    <p className="text-sm">
                      <strong>Pro Tip:</strong> Take notes as you read to help remember important concepts.
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleSectionComplete(currentSection)}
                disabled={sectionProgress[currentSection]}
                className="w-full"
              >
                {sectionProgress[currentSection] ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Reading Completed
                  </>
                ) : (
                  "Mark as Read"
                )}
              </Button>
            </div>
          )}

          {module.format === "Personal" && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Personal Guidance: {currentTopic}</h4>
                <p className="text-muted-foreground mb-4">
                  Connect with a financial advisor to discuss {currentTopic.toLowerCase()} in detail.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-background rounded border">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Schedule a consultation</p>
                      <p className="text-sm text-muted-foreground">Get personalized advice from experts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background rounded border">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Download preparation guide</p>
                      <p className="text-sm text-muted-foreground">Prepare questions for your session</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleSectionComplete(currentSection)}
                disabled={sectionProgress[currentSection]}
                className="w-full"
              >
                {sectionProgress[currentSection] ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Session Scheduled
                  </>
                ) : (
                  "Schedule Personal Session"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentSection === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentSection === module.topics.length - 1}>
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
