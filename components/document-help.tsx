"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, MapPin, DollarSign, Plus, ExternalLink, Clock } from "lucide-react"

interface DocumentHelpProps {
  category: string
  onBack: () => void
}

export function DocumentHelp({ category, onBack }: DocumentHelpProps) {
  const getHelpContent = (category: string) => {
    switch (category) {
      case "Government ID":
        return {
          icon: FileText,
          color: "bg-blue-500",
          description: "Official identification issued by government agencies",
          acceptedDocs: [
            { name: "Driver's License", difficulty: "Easy", time: "Same day", cost: "$25-50" },
            { name: "State ID Card", difficulty: "Easy", time: "Same day", cost: "$10-25" },
            { name: "Passport", difficulty: "Medium", time: "6-8 weeks", cost: "$130-165" },
            { name: "Military ID", difficulty: "Easy", time: "Same day", cost: "Free" },
          ],
          requirements: [
            "Proof of identity (birth certificate, previous ID)",
            "Proof of Social Security number",
            "Proof of residency (2 documents)",
            "Payment for fees",
          ],
          whereToGet: [
            { place: "DMV Office", address: "Local Department of Motor Vehicles", hours: "Mon-Fri 8AM-5PM" },
            { place: "Post Office", address: "For passport applications", hours: "Mon-Fri 9AM-5PM" },
            { place: "County Clerk", address: "For state ID cards", hours: "Mon-Fri 8AM-4PM" },
          ],
          tips: [
            "Call ahead to check required documents",
            "Bring multiple forms of identification",
            "Consider getting a REAL ID for future travel",
            "Keep your documents in a safe place",
          ],
        }

      case "Proof of Address":
        return {
          icon: MapPin,
          color: "bg-green-500",
          description: "Documents showing your current residential address",
          acceptedDocs: [
            { name: "Utility Bill", difficulty: "Easy", time: "Monthly", cost: "Free" },
            { name: "Bank Statement", difficulty: "Easy", time: "Monthly", cost: "Free" },
            { name: "Lease Agreement", difficulty: "Easy", time: "At signing", cost: "Free" },
            { name: "Mortgage Statement", difficulty: "Easy", time: "Monthly", cost: "Free" },
          ],
          requirements: [
            "Document must be recent (within 90 days)",
            "Must show your full name and current address",
            "Must be from a recognized institution",
            "Original or official copy preferred",
          ],
          whereToGet: [
            { place: "Utility Company", address: "Electric, gas, water, or internet provider", hours: "24/7 online" },
            { place: "Bank", address: "Request statement from your bank", hours: "Mon-Fri 9AM-5PM" },
            { place: "Landlord", address: "Request copy of lease agreement", hours: "Contact directly" },
          ],
          tips: [
            "Download statements online for faster access",
            "Keep recent bills in a designated folder",
            "Contact utility companies if you need older statements",
            "Cell phone bills are usually accepted too",
          ],
        }

      case "Proof of Income":
        return {
          icon: DollarSign,
          color: "bg-yellow-500",
          description: "Documents verifying your income and employment status",
          acceptedDocs: [
            { name: "Pay Stubs", difficulty: "Easy", time: "Bi-weekly/Monthly", cost: "Free" },
            { name: "Tax Returns", difficulty: "Medium", time: "Annual", cost: "Free-$200" },
            { name: "Employment Letter", difficulty: "Easy", time: "1-3 days", cost: "Free" },
            { name: "Bank Statements", difficulty: "Easy", time: "Monthly", cost: "Free" },
          ],
          requirements: [
            "Recent pay stubs (last 2-3 months)",
            "Complete tax return with all schedules",
            "Employment letter on company letterhead",
            "Bank statements showing regular deposits",
          ],
          whereToGet: [
            { place: "Employer", address: "HR department or payroll office", hours: "Business hours" },
            { place: "Tax Preparer", address: "CPA or tax preparation service", hours: "Seasonal/Year-round" },
            { place: "IRS", address: "Request tax transcripts online", hours: "24/7 online" },
          ],
          tips: [
            "Keep digital copies of all pay stubs",
            "Request employment letters in advance",
            "Tax transcripts are free from IRS.gov",
            "Self-employed? Keep detailed income records",
          ],
        }

      default:
        return {
          icon: Plus,
          color: "bg-gray-500",
          description: "Additional supporting documents that may be helpful",
          acceptedDocs: [
            { name: "Social Security Card", difficulty: "Medium", time: "2-3 weeks", cost: "Free" },
            { name: "Birth Certificate", difficulty: "Easy", time: "1-2 weeks", cost: "$10-25" },
            { name: "Marriage Certificate", difficulty: "Easy", time: "1-2 weeks", cost: "$10-20" },
          ],
          requirements: [
            "Original documents or certified copies",
            "Valid identification to request copies",
            "Payment for replacement fees if needed",
          ],
          whereToGet: [
            { place: "Social Security Office", address: "Local SSA office", hours: "Mon-Fri 9AM-4PM" },
            { place: "Vital Records Office", address: "County or state office", hours: "Mon-Fri 8AM-5PM" },
          ],
          tips: [
            "Order certified copies for important documents",
            "Keep originals in a safe deposit box",
            "Make copies for your records",
          ],
        }
    }
  }

  const content = getHelpContent(category)
  const IconComponent = content.icon

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>
      </div>

      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 ${content.color} rounded-full mb-4`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">How to Get {category}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.description}</p>
      </div>

      {/* Accepted Documents */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Accepted Documents</CardTitle>
          <CardDescription>Any of these documents will work for {category.toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {content.acceptedDocs.map((doc, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{doc.name}</h4>
                  <Badge variant={doc.difficulty === "Easy" ? "default" : "secondary"}>{doc.difficulty}</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Time: {doc.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Cost: {doc.cost}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What You'll Need</CardTitle>
          <CardDescription>Requirements to obtain these documents</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {content.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Where to Get */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Where to Get These Documents</CardTitle>
          <CardDescription>Locations and contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {content.whereToGet.map((location, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold">{location.place}</h4>
                  <p className="text-muted-foreground">{location.address}</p>
                  <p className="text-sm text-muted-foreground">Hours: {location.hours}</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Find Location
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Helpful Tips</CardTitle>
          <CardDescription>Make the process easier with these suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {content.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-primary">{index + 1}</span>
                </div>
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
