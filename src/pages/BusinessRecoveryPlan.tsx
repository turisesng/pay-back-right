import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Download, CheckCircle2 } from "lucide-react";

const BusinessRecoveryPlan = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  // Form fields
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [currentChallenges, setCurrentChallenges] = useState("");
  const [recoveryGoals, setRecoveryGoals] = useState("");
  const [proposedActions, setProposedActions] = useState("");
  const [fundingNeeds, setFundingNeeds] = useState("");
  const [timeline, setTimeline] = useState("");

  const productTitle = searchParams.get("product") || "Business Recovery Plan Template";
  const price = searchParams.get("price") || "0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Recovery Plan Generated!",
      description: "Your personalized business recovery plan has been sent to your email.",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-16">
          <div className="container max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Recovery Plan Generated!</CardTitle>
                <CardDescription>
                  Your personalized business recovery plan for {businessName} has been sent to {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold">What's Included in Your Plan:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Comprehensive situational analysis</li>
                    <li>• SMART recovery goals and milestones</li>
                    <li>• Action plan with timelines</li>
                    <li>• Funding requirements breakdown</li>
                    <li>• Risk mitigation strategies</li>
                    <li>• Progress tracking template</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={() => window.location.href = "/tools"} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Recovery Plan (PDF)
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = "/tools"} className="w-full">
                    Back to Tools
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-4xl font-bold">Business Recovery Plan</h1>
            <p className="text-lg text-muted-foreground">
              Create a comprehensive recovery plan for your business
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recovery Plan Template</CardTitle>
              <CardDescription>
                Fill in your business details to generate a personalized recovery plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{productTitle}</span>
                    <span className="text-lg font-bold">₦{price}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner Name *</Label>
                      <Input
                        id="ownerName"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type/Industry *</Label>
                    <Input
                      id="businessType"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      placeholder="e.g., Retail, Agriculture, Services"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentChallenges">Current Challenges *</Label>
                    <Textarea
                      id="currentChallenges"
                      value={currentChallenges}
                      onChange={(e) => setCurrentChallenges(e.target.value)}
                      placeholder="Describe the main challenges your business is facing..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recoveryGoals">Recovery Goals *</Label>
                    <Textarea
                      id="recoveryGoals"
                      value={recoveryGoals}
                      onChange={(e) => setRecoveryGoals(e.target.value)}
                      placeholder="What are your primary goals for business recovery?"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proposedActions">Proposed Actions *</Label>
                    <Textarea
                      id="proposedActions"
                      value={proposedActions}
                      onChange={(e) => setProposedActions(e.target.value)}
                      placeholder="What steps do you plan to take?"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fundingNeeds">Funding Requirements *</Label>
                      <Input
                        id="fundingNeeds"
                        value={fundingNeeds}
                        onChange={(e) => setFundingNeeds(e.target.value)}
                        placeholder="e.g., ₦500,000"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Recovery Timeline *</Label>
                      <Input
                        id="timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        placeholder="e.g., 6 months"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Generate & Send Recovery Plan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessRecoveryPlan;
