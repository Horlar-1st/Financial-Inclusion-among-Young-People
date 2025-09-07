"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, MapPin, Phone, Globe, Star, Filter, Search } from "lucide-react"
import { BankDetails } from "./bank-details"

interface Bank {
  id: string
  name: string
  type: "Traditional Bank" | "Credit Union" | "Online Bank" | "Community Bank"
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

export function BankingDirectory() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [maxDistance, setMaxDistance] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const banks: Bank[] = [
    {
      id: "1",
      name: "Community First Bank",
      type: "Community Bank",
      rating: 4.5,
      reviewCount: 1247,
      distance: "0.8 miles",
      address: "123 Main Street, Downtown",
      phone: "(555) 123-4567",
      website: "www.communityfirst.com",
      services: ["Checking Accounts", "Savings Accounts", "Personal Loans", "Mobile Banking", "ATM Network"],
      accountTypes: [
        {
          name: "Basic Checking",
          minDeposit: 25,
          monthlyFee: 0,
          features: ["No monthly fee", "Free online banking", "Mobile app", "Direct deposit"],
        },
        {
          name: "Premium Savings",
          minDeposit: 100,
          monthlyFee: 5,
          features: ["Higher interest rate", "Free checks", "Priority customer service"],
        },
      ],
      requirements: {
        documents: ["Government ID", "Proof of Address"],
        creditCheck: false,
        minAge: 18,
        citizenship: false,
      },
      specialPrograms: ["Second Chance Banking", "Student Accounts", "Senior Discounts"],
      pros: ["Local community focus", "Personal service", "Low fees", "Easy account opening"],
      cons: ["Limited ATM network", "Fewer digital features", "Limited hours"],
      bestFor: ["First-time bank customers", "Local community members", "Personal service seekers"],
    },
    {
      id: "2",
      name: "Metro Credit Union",
      type: "Credit Union",
      rating: 4.7,
      reviewCount: 892,
      distance: "1.2 miles",
      address: "456 Oak Avenue, Midtown",
      phone: "(555) 234-5678",
      website: "www.metrocu.org",
      services: ["Checking Accounts", "Savings Accounts", "Auto Loans", "Credit Cards", "Financial Counseling"],
      accountTypes: [
        {
          name: "Member Checking",
          minDeposit: 5,
          monthlyFee: 0,
          features: ["No monthly fee", "Free ATMs nationwide", "Dividend earnings", "Shared branching"],
        },
        {
          name: "High-Yield Savings",
          minDeposit: 25,
          monthlyFee: 0,
          features: ["Competitive rates", "No monthly fee", "Online access", "Automatic transfers"],
        },
      ],
      requirements: {
        documents: ["Government ID", "Proof of Address", "Membership Eligibility"],
        creditCheck: false,
        minAge: 18,
        citizenship: false,
      },
      specialPrograms: ["Financial Literacy Classes", "First-Time Homebuyer Program", "Youth Accounts"],
      pros: ["Member-owned", "Better rates", "Lower fees", "Community focused"],
      cons: ["Membership requirements", "Fewer locations", "Limited business services"],
      bestFor: ["Members seeking better rates", "Community-minded individuals", "Lower fee preferences"],
    },
    {
      id: "3",
      name: "Digital First Bank",
      type: "Online Bank",
      rating: 4.3,
      reviewCount: 3456,
      distance: "Online only",
      address: "Online Banking Platform",
      phone: "(555) 345-6789",
      website: "www.digitalfirst.com",
      services: ["Checking Accounts", "Savings Accounts", "CDs", "Mobile Banking", "24/7 Support"],
      accountTypes: [
        {
          name: "Digital Checking",
          minDeposit: 0,
          monthlyFee: 0,
          features: ["No fees", "ATM fee reimbursement", "Mobile check deposit", "Budgeting tools"],
        },
        {
          name: "High-Interest Savings",
          minDeposit: 1,
          monthlyFee: 0,
          features: ["High interest rate", "No minimum balance", "Automatic savings", "Goal tracking"],
        },
      ],
      requirements: {
        documents: ["Government ID", "Proof of Address"],
        creditCheck: true,
        minAge: 18,
        citizenship: true,
      },
      specialPrograms: ["Cashback Rewards", "Savings Challenges", "Financial Planning Tools"],
      pros: ["High interest rates", "No fees", "Advanced mobile app", "24/7 access"],
      cons: ["No physical branches", "Online only", "Limited cash deposit options"],
      bestFor: ["Tech-savvy users", "High interest seekers", "Mobile-first banking"],
    },
    {
      id: "4",
      name: "National Trust Bank",
      type: "Traditional Bank",
      rating: 4.1,
      reviewCount: 5678,
      distance: "2.1 miles",
      address: "789 Business Blvd, Financial District",
      phone: "(555) 456-7890",
      website: "www.nationaltrust.com",
      services: [
        "Checking Accounts",
        "Savings Accounts",
        "Credit Cards",
        "Mortgages",
        "Investment Services",
        "Business Banking",
      ],
      accountTypes: [
        {
          name: "Essential Checking",
          minDeposit: 100,
          monthlyFee: 12,
          features: ["Nationwide ATMs", "Online banking", "Mobile app", "Overdraft protection"],
        },
        {
          name: "Preferred Savings",
          minDeposit: 300,
          monthlyFee: 5,
          features: ["Tiered interest rates", "Free transfers", "Account alerts", "Financial planning"],
        },
      ],
      requirements: {
        documents: ["Government ID", "Proof of Address", "Proof of Income"],
        creditCheck: true,
        minAge: 18,
        citizenship: false,
      },
      specialPrograms: ["Student Banking", "Military Benefits", "Senior Services"],
      pros: ["Nationwide presence", "Full service banking", "Investment options", "Established reputation"],
      cons: ["Higher fees", "Less personal service", "Complex fee structure"],
      bestFor: ["Full-service banking needs", "Frequent travelers", "Investment services"],
    },
  ]

  const serviceTypes = [
    "Checking Accounts",
    "Savings Accounts",
    "Personal Loans",
    "Credit Cards",
    "Auto Loans",
    "Mortgages",
    "Mobile Banking",
    "Investment Services",
    "Business Banking",
    "Financial Counseling",
  ]

  const filteredBanks = banks.filter((bank) => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || bank.type === selectedType
    const matchesServices =
      selectedServices.length === 0 || selectedServices.some((service) => bank.services.includes(service))
    const matchesDistance = maxDistance === "all" || Number.parseFloat(bank.distance) <= Number.parseFloat(maxDistance)

    return matchesSearch && matchesType && matchesServices && matchesDistance
  })

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  if (selectedBank) {
    const bank = banks.find((b) => b.id === selectedBank)
    if (bank) {
      return <BankDetails bank={bank} onBack={() => setSelectedBank(null)} />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Banking Service Directory</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find the perfect banking services tailored to your needs and location
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Banking Services
            </CardTitle>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Bar */}
          <div>
            <Label htmlFor="search">Search by bank name</Label>
            <Input
              id="search"
              placeholder="Search banks and credit unions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-6 pt-4 border-t">
              <div>
                <Label>Institution Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Traditional Bank">Traditional Bank</SelectItem>
                    <SelectItem value="Credit Union">Credit Union</SelectItem>
                    <SelectItem value="Online Bank">Online Bank</SelectItem>
                    <SelectItem value="Community Bank">Community Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Maximum Distance</Label>
                <Select value={maxDistance} onValueChange={setMaxDistance}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Distance</SelectItem>
                    <SelectItem value="1">Within 1 mile</SelectItem>
                    <SelectItem value="5">Within 5 miles</SelectItem>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-3 block">Services Needed</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {serviceTypes.slice(0, 5).map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <Label htmlFor={service} className="text-sm">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Found {filteredBanks.length} banking {filteredBanks.length === 1 ? "option" : "options"}
        </p>
        <div className="flex items-center gap-2">
          <Label htmlFor="sort">Sort by:</Label>
          <Select defaultValue="rating">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bank Listings */}
      <div className="space-y-6">
        {filteredBanks.map((bank) => (
          <Card key={bank.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Bank Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{bank.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <Badge variant="outline">{bank.type}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{bank.rating}</span>
                          <span>({bank.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{bank.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{bank.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Services Offered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {bank.services.slice(0, 4).map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {bank.services.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{bank.services.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Account Highlights */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Account Options:</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {bank.accountTypes.slice(0, 2).map((account, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="font-medium text-sm">{account.name}</h5>
                            <div className="text-right">
                              <div className="text-xs text-muted-foreground">Min. Deposit</div>
                              <div className="font-semibold text-sm">${account.minDeposit}</div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Monthly Fee: ${account.monthlyFee === 0 ? "Free" : account.monthlyFee}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Best For:</h4>
                    <div className="flex flex-wrap gap-2">
                      {bank.bestFor.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:w-48 flex flex-col gap-3">
                  <Button onClick={() => setSelectedBank(bank.id)} className="w-full">
                    View Details
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBanks.length === 0 && (
        <Card className="p-8 text-center">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No banks found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
          <Button variant="outline" onClick={() => setShowFilters(true)}>
            Modify Filters
          </Button>
        </Card>
      )}
    </div>
  )
}
