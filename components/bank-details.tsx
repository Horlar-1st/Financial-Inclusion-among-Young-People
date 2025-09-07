"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Globe,
  CheckCircle,
  XCircle,
  DollarSign,
  CreditCard,
  FileText,
  Users,
  ExternalLink,
} from "lucide-react"

interface Bank {
  id: string
  name: string
  type: string
  rating: number
  reviewCount: number
  distance: string
  address: string
  phone: string
  website: string
  services: string[]
  accountTypes: {
    name: string
    minDeposit: number
    monthlyFee: number
    features: string[]
  }[]
  requirements: {
    documents: string[]
    creditCheck: boolean
    minAge: number
    citizenship: boolean
  }
  specialPrograms: string[]
  pros: string[]
  cons: string[]
  bestFor: string[]
}

interface BankDetailsProps {
  bank: Bank
  onBack: () => void
}

export function BankDetails({ bank, onBack }: BankDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Directory
        </Button>
      </div>

      {/* Bank Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <CardTitle className="text-3xl mb-2">{bank.name}</CardTitle>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="outline" className="text-sm">
                  {bank.type}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{bank.rating}</span>
                  <span className="text-muted-foreground">({bank.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {bank.address} • {bank.distance}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{bank.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{bank.website}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Button className="w-full md:w-48">
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Online
              </Button>
              <Button variant="outline" className="w-full md:w-48 bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline" className="w-full md:w-48 bg-transparent">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Options</CardTitle>
                <CardDescription>Choose the account that best fits your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {bank.accountTypes.map((account, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{account.name}</h3>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-primary" />
                              <span>Min. Deposit: ${account.minDeposit}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CreditCard className="w-4 h-4 text-primary" />
                              <span>Monthly Fee: {account.monthlyFee === 0 ? "Free" : `$${account.monthlyFee}`}</span>
                            </div>
                          </div>
                        </div>
                        <Button>Select Account</Button>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Features & Benefits:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {account.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requirements">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Opening Requirements</CardTitle>
                <CardDescription>What you'll need to open an account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Required Documents
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {bank.requirements.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h5 className="font-semibold">Minimum Age</h5>
                    <p className="text-2xl font-bold text-primary">{bank.requirements.minAge}</p>
                    <p className="text-sm text-muted-foreground">years old</p>
                  </div>

                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                      {bank.requirements.creditCheck ? (
                        <CheckCircle className="w-8 h-8 text-yellow-500" />
                      ) : (
                        <XCircle className="w-8 h-8 text-green-500" />
                      )}
                    </div>
                    <h5 className="font-semibold">Credit Check</h5>
                    <p className="text-lg font-bold text-primary">
                      {bank.requirements.creditCheck ? "Required" : "Not Required"}
                    </p>
                  </div>

                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                      {bank.requirements.citizenship ? (
                        <CheckCircle className="w-8 h-8 text-yellow-500" />
                      ) : (
                        <XCircle className="w-8 h-8 text-green-500" />
                      )}
                    </div>
                    <h5 className="font-semibold">US Citizenship</h5>
                    <p className="text-lg font-bold text-primary">
                      {bank.requirements.citizenship ? "Required" : "Not Required"}
                    </p>
                  </div>
                </div>

                {bank.specialPrograms.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Special Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {bank.specialPrograms.map((program, index) => (
                        <Badge key={index} variant="secondary">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Services</CardTitle>
                <CardDescription>All banking services offered by {bank.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bank.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Pros</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {bank.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Cons</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {bank.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Best For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {bank.bestFor.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>What customers are saying about {bank.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-primary mb-2">{bank.rating}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(bank.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">Based on {bank.reviewCount} reviews</p>
                </div>

                <div className="space-y-4">
                  {/* Sample reviews */}
                  <Card className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">JD</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">John D.</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="text-sm">
                          "Excellent customer service and very helpful staff. The account opening process was smooth and
                          they explained everything clearly."
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">MS</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">Maria S.</span>
                          <div className="flex items-center gap-1">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                          <span className="text-sm text-muted-foreground">1 month ago</span>
                        </div>
                        <p className="text-sm">
                          "Good banking services overall. The mobile app could use some improvements, but the branch
                          staff is always friendly and professional."
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
