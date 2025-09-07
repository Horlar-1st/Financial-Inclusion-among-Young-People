"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Video, FileText, Users, CheckCircle, Clock, Star, ArrowRight, Play, Download } from "lucide-react"
import { LearningModule } from "./learning-module"

interface LearningProgress {
  [key: string]: {
    completed: boolean
    progress: number
    timeSpent: number
  }
}

export function EducationalHub() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [learningProgress, setLearningProgress] = useState<LearningProgress>({
    "banking-basics": { completed: false, progress: 0, timeSpent: 0 },
    "account-types": { completed: false, progress: 25, timeSpent: 8 },
    "digital-banking": { completed: false, progress: 0, timeSpent: 0 },
    "credit-basics": { completed: false, progress: 0, timeSpent: 0 },
    "saving-strategies": { completed: true, progress: 100, timeSpent: 45 },
    "loan-fundamentals": { completed: false, progress: 60, timeSpent: 22 },
  })

  const learningModules = [
    {
      id: "banking-basics",
      title: "Banking Basics",
      description: "Understanding what banks do and how they help you manage money",
      difficulty: "Beginner",
      duration: "15 min",
      format: "Interactive",
      topics: ["What is a bank?", "How banks work", "Banking safety", "Choosing a bank"],
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      id: "account-types",
      title: "Types of Bank Accounts",
      description: "Learn about different account types and which one is right for you",
      difficulty: "Beginner",
      duration: "20 min",
      format: "Visual",
      topics: ["Savings accounts", "Checking accounts", "Money market accounts", "CDs"],
      icon: FileText,
      color: "bg-green-500",
    },
    {
      id: "digital-banking",
      title: "Digital Banking",
      description: "Using online and mobile banking safely and effectively",
      difficulty: "Intermediate",
      duration: "25 min",
      format: "Video",
      topics: ["Mobile apps", "Online banking", "Digital payments", "Security tips"],
      icon: Video,
      color: "bg-purple-500",
    },
    {
      id: "credit-basics",
      title: "Understanding Credit",
      description: "How credit works, credit scores, and building good credit",
      difficulty: "Intermediate",
      duration: "30 min",
      format: "Reading",
      topics: ["Credit scores", "Credit reports", "Building credit", "Credit cards"],
      icon: Star,
      color: "bg-yellow-500",
    },
    {
      id: "saving-strategies",
      title: "Smart Saving Strategies",
      description: "Practical tips for saving money and reaching your financial goals",
      difficulty: "Beginner",
      duration: "18 min",
      format: "Interactive",
      topics: ["Emergency funds", "Goal setting", "Budgeting", "Automatic savings"],
      icon: CheckCircle,
      color: "bg-emerald-500",
    },
    {
      id: "loan-fundamentals",
      title: "Loans and Borrowing",
      description: "Understanding different types of loans and responsible borrowing",
      difficulty: "Advanced",
      duration: "35 min",
      format: "Personal",
      topics: ["Personal loans", "Auto loans", "Mortgages", "Interest rates"],
      icon: Users,
      color: "bg-red-500",
    },
  ]

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateOverallProgress = () => {
    const modules = Object.values(learningProgress)
    const totalProgress = modules.reduce((sum, module) => sum + module.progress, 0)
    return Math.round(totalProgress / modules.length)
  }

  const completedModules = Object.values(learningProgress).filter((module) => module.completed).length
  const totalTimeSpent = Object.values(learningProgress).reduce((sum, module) => sum + module.timeSpent, 0)

  if (selectedModule) {
    const module = learningModules.find((m) => m.id === selectedModule)
    if (module) {
      return (
        <LearningModule
          module={module}
          progress={learningProgress[selectedModule]}
          onBack={() => setSelectedModule(null)}
          onProgressUpdate={(progress) => {
            setLearningProgress((prev) => ({
              ...prev,
              [selectedModule]: { ...prev[selectedModule], ...progress },
            }))
          }}
        />
      )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Financial Education Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn at your own pace with personalized content designed for your learning style
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Learning Progress</CardTitle>
          <CardDescription>Track your journey to financial literacy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{calculateOverallProgress()}%</div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <Progress value={calculateOverallProgress()} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {completedModules}/{learningModules.length}
              </div>
              <p className="text-sm text-muted-foreground">Modules Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{totalTimeSpent}</div>
              <p className="text-sm text-muted-foreground">Minutes Learned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Modules</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningModules.map((module) => {
              const progress = learningProgress[module.id]
              const FormatIcon = getFormatIcon(module.format)

              return (
                <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                        {progress.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{module.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <FormatIcon className="w-4 h-4" />
                          {module.format}
                        </div>
                      </div>

                      {progress.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{progress.progress}%</span>
                          </div>
                          <Progress value={progress.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {module.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {module.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{module.topics.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => setSelectedModule(module.id)}
                        variant={progress.completed ? "outline" : "default"}
                      >
                        {progress.completed ? "Review" : progress.progress > 0 ? "Continue" : "Start Learning"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="beginner" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningModules
              .filter((module) => module.difficulty === "Beginner")
              .map((module) => {
                const progress = learningProgress[module.id]
                const FormatIcon = getFormatIcon(module.format)

                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                          {progress.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <FormatIcon className="w-4 h-4" />
                            {module.format}
                          </div>
                        </div>

                        {progress.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{progress.progress}%</span>
                            </div>
                            <Progress value={progress.progress} className="h-2" />
                          </div>
                        )}

                        <Button
                          className="w-full"
                          onClick={() => setSelectedModule(module.id)}
                          variant={progress.completed ? "outline" : "default"}
                        >
                          {progress.completed ? "Review" : progress.progress > 0 ? "Continue" : "Start Learning"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="intermediate" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningModules
              .filter((module) => module.difficulty === "Intermediate")
              .map((module) => {
                const progress = learningProgress[module.id]
                const FormatIcon = getFormatIcon(module.format)

                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                          {progress.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <FormatIcon className="w-4 h-4" />
                            {module.format}
                          </div>
                        </div>

                        {progress.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{progress.progress}%</span>
                            </div>
                            <Progress value={progress.progress} className="h-2" />
                          </div>
                        )}

                        <Button
                          className="w-full"
                          onClick={() => setSelectedModule(module.id)}
                          variant={progress.completed ? "outline" : "default"}
                        >
                          {progress.completed ? "Review" : progress.progress > 0 ? "Continue" : "Start Learning"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningModules
              .filter((module) => module.difficulty === "Advanced")
              .map((module) => {
                const progress = learningProgress[module.id]
                const FormatIcon = getFormatIcon(module.format)

                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                          {progress.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <FormatIcon className="w-4 h-4" />
                            {module.format}
                          </div>
                        </div>

                        {progress.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{progress.progress}%</span>
                            </div>
                            <Progress value={progress.progress} className="h-2" />
                          </div>
                        )}

                        <Button
                          className="w-full"
                          onClick={() => setSelectedModule(module.id)}
                          variant={progress.completed ? "outline" : "default"}
                        >
                          {progress.completed ? "Review" : progress.progress > 0 ? "Continue" : "Start Learning"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Additional resources to support your learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Download className="w-6 h-6" />
              <span>Download Study Guide</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Users className="w-6 h-6" />
              <span>Join Study Group</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <BookOpen className="w-6 h-6" />
              <span>Banking Glossary</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
