"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AssessmentResults } from "./assessment-results"

interface AssessmentFormProps {
  onBack: () => void
}

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

export function AssessmentForm({ onBack }: AssessmentFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    bankingAwareness: {
      hasAccount: "",
      servicesKnown: [],
      primaryConcern: "",
    },
    education: {
      level: "",
      financialLiteracy: "",
      preferredLearning: "",
    },
    documents: {
      hasId: false,
      hasProofOfAddress: false,
      hasIncomeProof: false,
      hasOtherDocs: [],
    },
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  if (showResults) {
    return (
      <AssessmentResults
        data={assessmentData}
        onRestart={() => {
          setCurrentStep(1)
          setShowResults(false)
        }}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={handlePrevious}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </div>

      {/* Step 1: Banking Awareness */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Banking Awareness</CardTitle>
            <CardDescription>Let's understand your current banking experience and knowledge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Do you currently have a bank account?</Label>
              <RadioGroup
                value={assessmentData.bankingAwareness.hasAccount}
                onValueChange={(value) =>
                  setAssessmentData((prev) => ({
                    ...prev,
                    bankingAwareness: { ...prev.bankingAwareness, hasAccount: value },
                  }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="account-yes" />
                  <Label htmlFor="account-yes">Yes, I have a bank account</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="account-no" />
                  <Label htmlFor="account-no">No, I don't have a bank account</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="had" id="account-had" />
                  <Label htmlFor="account-had">I had one before but not anymore</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">
                Which banking services are you familiar with? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Savings accounts",
                  "Checking accounts",
                  "Loans (personal, auto, home)",
                  "Credit cards",
                  "Mobile banking",
                  "Online banking",
                  "Money transfers",
                  "Investment services",
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={assessmentData.bankingAwareness.servicesKnown.includes(service)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAssessmentData((prev) => ({
                            ...prev,
                            bankingAwareness: {
                              ...prev.bankingAwareness,
                              servicesKnown: [...prev.bankingAwareness.servicesKnown, service],
                            },
                          }))
                        } else {
                          setAssessmentData((prev) => ({
                            ...prev,
                            bankingAwareness: {
                              ...prev.bankingAwareness,
                              servicesKnown: prev.bankingAwareness.servicesKnown.filter((s) => s !== service),
                            },
                          }))
                        }
                      }}
                    />
                    <Label htmlFor={service}>{service}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">What's your primary concern about banking?</Label>
              <RadioGroup
                value={assessmentData.bankingAwareness.primaryConcern}
                onValueChange={(value) =>
                  setAssessmentData((prev) => ({
                    ...prev,
                    bankingAwareness: { ...prev.bankingAwareness, primaryConcern: value },
                  }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fees" id="concern-fees" />
                  <Label htmlFor="concern-fees">High fees and charges</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="access" id="concern-access" />
                  <Label htmlFor="concern-access">Difficulty accessing branches/ATMs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="requirements" id="concern-requirements" />
                  <Label htmlFor="concern-requirements">Complex requirements to open accounts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trust" id="concern-trust" />
                  <Label htmlFor="concern-trust">Trust and security concerns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="understanding" id="concern-understanding" />
                  <Label htmlFor="concern-understanding">Not understanding how banking works</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Education Level */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Education & Learning Preferences</CardTitle>
            <CardDescription>This helps us provide information in the most helpful way for you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">What's your highest level of education?</Label>
              <RadioGroup
                value={assessmentData.education.level}
                onValueChange={(value) =>
                  setAssessmentData((prev) => ({
                    ...prev,
                    education: { ...prev.education, level: value },
                  }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="primary" id="edu-primary" />
                  <Label htmlFor="edu-primary">Primary school</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="secondary" id="edu-secondary" />
                  <Label htmlFor="edu-secondary">Secondary/High school</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vocational" id="edu-vocational" />
                  <Label htmlFor="edu-vocational">Vocational/Trade school</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="college" id="edu-college" />
                  <Label htmlFor="edu-college">College/University</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="edu-other" />
                  <Label htmlFor="edu-other">Other/Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">How would you rate your financial knowledge?</Label>
              <RadioGroup
                value={assessmentData.education.financialLiteracy}
                onValueChange={(value) =>
                  setAssessmentData((prev) => ({
                    ...prev,
                    education: { ...prev.education, financialLiteracy: value },
                  }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="lit-beginner" />
                  <Label htmlFor="lit-beginner">Beginner - I'm just starting to learn</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic" id="lit-basic" />
                  <Label htmlFor="lit-basic">Basic - I know some basics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="lit-intermediate" />
                  <Label htmlFor="lit-intermediate">Intermediate - I understand most concepts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="lit-advanced" />
                  <Label htmlFor="lit-advanced">Advanced - I'm comfortable with financial topics</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">How do you prefer to learn new information?</Label>
              <RadioGroup
                value={assessmentData.education.preferredLearning}
                onValueChange={(value) =>
                  setAssessmentData((prev) => ({
                    ...prev,
                    education: { ...prev.education, preferredLearning: value },
                  }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="visual" id="learn-visual" />
                  <Label htmlFor="learn-visual">Visual (pictures, diagrams, videos)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reading" id="learn-reading" />
                  <Label htmlFor="learn-reading">Reading (articles, guides, text)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="interactive" id="learn-interactive" />
                  <Label htmlFor="learn-interactive">Interactive (step-by-step, hands-on)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="learn-personal" />
                  <Label htmlFor="learn-personal">Personal guidance (talking to someone)</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Document Availability */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Document Availability</CardTitle>
            <CardDescription>Let's check what documents you have available for banking services.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">
                Which of these documents do you currently have? (Check all that apply)
              </Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="doc-id"
                    checked={assessmentData.documents.hasId}
                    onCheckedChange={(checked) =>
                      setAssessmentData((prev) => ({
                        ...prev,
                        documents: { ...prev.documents, hasId: !!checked },
                      }))
                    }
                  />
                  <Label htmlFor="doc-id" className="font-medium">
                    Government-issued ID
                  </Label>
                  <span className="text-sm text-muted-foreground">(Driver's license, passport, national ID)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="doc-address"
                    checked={assessmentData.documents.hasProofOfAddress}
                    onCheckedChange={(checked) =>
                      setAssessmentData((prev) => ({
                        ...prev,
                        documents: { ...prev.documents, hasProofOfAddress: !!checked },
                      }))
                    }
                  />
                  <Label htmlFor="doc-address" className="font-medium">
                    Proof of address
                  </Label>
                  <span className="text-sm text-muted-foreground">(Utility bill, lease agreement, bank statement)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="doc-income"
                    checked={assessmentData.documents.hasIncomeProof}
                    onCheckedChange={(checked) =>
                      setAssessmentData((prev) => ({
                        ...prev,
                        documents: { ...prev.documents, hasIncomeProof: !!checked },
                      }))
                    }
                  />
                  <Label htmlFor="doc-income" className="font-medium">
                    Proof of income
                  </Label>
                  <span className="text-sm text-muted-foreground">(Pay stubs, tax returns, employment letter)</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">
                Do you have any of these additional documents? (Check all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Social Security card",
                  "Birth certificate",
                  "Employment authorization document",
                  "Student ID",
                  "Military ID",
                  "Previous bank statements",
                ].map((doc) => (
                  <div key={doc} className="flex items-center space-x-2">
                    <Checkbox
                      id={doc}
                      checked={assessmentData.documents.hasOtherDocs.includes(doc)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAssessmentData((prev) => ({
                            ...prev,
                            documents: {
                              ...prev.documents,
                              hasOtherDocs: [...prev.documents.hasOtherDocs, doc],
                            },
                          }))
                        } else {
                          setAssessmentData((prev) => ({
                            ...prev,
                            documents: {
                              ...prev.documents,
                              hasOtherDocs: prev.documents.hasOtherDocs.filter((d) => d !== doc),
                            },
                          }))
                        }
                      }}
                    />
                    <Label htmlFor={doc}>{doc}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 1 ? "Back to Welcome" : "Previous"}
        </Button>
        <Button onClick={handleNext}>
          {currentStep === totalSteps ? "View Results" : "Next"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
