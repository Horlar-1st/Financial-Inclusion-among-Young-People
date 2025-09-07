"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Eye,
  Trash2,
  Plus,
  Shield,
  HelpCircle,
} from "lucide-react"
import { DocumentUpload } from "./document-upload"
import { DocumentHelp } from "./document-help"

interface Document {
  id: string
  name: string
  type: string
  category: string
  uploadDate: string
  status: "verified" | "pending" | "rejected"
  size: string
  expiryDate?: string
}

export function DocumentManager() {
  const [showUpload, setShowUpload] = useState(false)
  const [showHelp, setShowHelp] = useState<string | null>(null)
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Driver's License.pdf",
      type: "pdf",
      category: "Government ID",
      uploadDate: "2024-01-15",
      status: "verified",
      size: "2.1 MB",
      expiryDate: "2026-03-15",
    },
    {
      id: "2",
      name: "Utility Bill - January.pdf",
      type: "pdf",
      category: "Proof of Address",
      uploadDate: "2024-01-10",
      status: "pending",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Pay Stub - December.pdf",
      type: "pdf",
      category: "Proof of Income",
      uploadDate: "2024-01-08",
      status: "verified",
      size: "1.2 MB",
    },
  ])

  const documentCategories = [
    {
      id: "government-id",
      name: "Government ID",
      description: "Driver's license, passport, state ID, or national ID card",
      required: true,
      examples: ["Driver's License", "Passport", "State ID", "National ID"],
      status: getDocumentStatus("Government ID"),
    },
    {
      id: "proof-address",
      name: "Proof of Address",
      description: "Utility bill, lease agreement, or bank statement with your address",
      required: true,
      examples: ["Utility Bill", "Lease Agreement", "Bank Statement", "Mortgage Statement"],
      status: getDocumentStatus("Proof of Address"),
    },
    {
      id: "proof-income",
      name: "Proof of Income",
      description: "Pay stubs, tax returns, or employment verification letter",
      required: true,
      examples: ["Pay Stubs", "Tax Returns", "Employment Letter", "Social Security Statement"],
      status: getDocumentStatus("Proof of Income"),
    },
    {
      id: "additional",
      name: "Additional Documents",
      description: "Social Security card, birth certificate, or other supporting documents",
      required: false,
      examples: ["Social Security Card", "Birth Certificate", "Military ID", "Student ID"],
      status: getDocumentStatus("Additional Documents"),
    },
  ]

  function getDocumentStatus(category: string) {
    const categoryDocs = documents.filter((doc) => doc.category === category)
    if (categoryDocs.length === 0) return "missing"
    if (categoryDocs.some((doc) => doc.status === "verified")) return "verified"
    if (categoryDocs.some((doc) => doc.status === "pending")) return "pending"
    return "rejected"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Needs Attention</Badge>
      case "missing":
        return <Badge variant="outline">Missing</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const calculateCompletionRate = () => {
    const requiredCategories = documentCategories.filter((cat) => cat.required)
    const completedCategories = requiredCategories.filter((cat) => cat.status === "verified")
    return Math.round((completedCategories.length / requiredCategories.length) * 100)
  }

  const handleDocumentUpload = (newDoc: Omit<Document, "id">) => {
    const doc: Document = {
      ...newDoc,
      id: Date.now().toString(),
      status: "pending",
    }
    setDocuments((prev) => [...prev, doc])
    setShowUpload(false)
  }

  const handleDeleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId))
  }

  if (showUpload) {
    return <DocumentUpload onUpload={handleDocumentUpload} onCancel={() => setShowUpload(false)} />
  }

  if (showHelp) {
    return <DocumentHelp category={showHelp} onBack={() => setShowHelp(null)} />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Document Manager</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Securely store and manage your banking documents in one place
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Document Completion Status
          </CardTitle>
          <CardDescription>Track your progress toward having all required documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{calculateCompletionRate()}%</div>
              <p className="text-sm text-muted-foreground">Complete</p>
              <Progress value={calculateCompletionRate()} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {documents.filter((doc) => doc.status === "verified").length}
              </div>
              <p className="text-sm text-muted-foreground">Verified Documents</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {documents.filter((doc) => doc.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">Document Categories</TabsTrigger>
          <TabsTrigger value="uploaded">My Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-6">
          <div className="space-y-6">
            {documentCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3">
                        {getStatusIcon(category.status)}
                        {category.name}
                        {category.required && <Badge variant="outline">Required</Badge>}
                      </CardTitle>
                      <CardDescription className="mt-2">{category.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">{getStatusBadge(category.status)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Accepted Documents:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => setShowUpload(true)} size="sm" disabled={category.status === "verified"}>
                        <Upload className="w-4 h-4 mr-2" />
                        {category.status === "missing" ? "Upload Document" : "Upload Another"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowHelp(category.name)}>
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Get Help
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="uploaded" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Uploaded Documents ({documents.length})</h3>
              <Button onClick={() => setShowUpload(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Upload New Document
              </Button>
            </div>

            {documents.length === 0 ? (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-semibold mb-2">No documents uploaded yet</h4>
                <p className="text-muted-foreground mb-4">Start by uploading your required banking documents</p>
                <Button onClick={() => setShowUpload(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload First Document
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{doc.category}</span>
                              <span>{doc.size}</span>
                              <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                              {doc.expiryDate && <span>Expires {new Date(doc.expiryDate).toLocaleDateString()}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(doc.status)}
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteDocument(doc.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Security Notice */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-primary mb-2">Your Documents Are Secure</h4>
              <p className="text-sm text-muted-foreground">
                All documents are encrypted and stored securely. We use bank-level security to protect your personal
                information. Your documents are only shared with authorized financial institutions when you give
                explicit permission.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
