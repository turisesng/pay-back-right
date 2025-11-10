import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const LoanRestructureForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productTitle = searchParams.get("product") || "Digital Product";
  const price = searchParams.get("price") || "0";
  
  const [formData, setFormData] = useState({
    fullName: "",
    bvn: "",
    loanAccountNumber: "",
    originalLoanAmount: "",
    outstandingBalance: "",
    currentMonthlyPayment: "",
    proposedMonthlyPayment: "",
    reasonForRestructuring: "",
    businessStatus: "",
    preferredTenor: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success("Form Submitted Successfully!", {
      description: "Proceeding to product delivery..."
    });

    // Navigate to product delivery with form data
    setTimeout(() => {
      navigate(`/product-delivery?product=${encodeURIComponent(productTitle)}&price=${price}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container max-w-3xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle>Loan Restructuring Information</CardTitle>
              </div>
              <CardDescription>
                Please provide your loan details to customize your restructuring letter template
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bvn">BVN (Bank Verification Number) *</Label>
                    <Input
                      id="bvn"
                      name="bvn"
                      value={formData.bvn}
                      onChange={handleChange}
                      placeholder="12345678901"
                      maxLength={11}
                      required
                    />
                  </div>
                </div>

                {/* Loan Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Loan Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loanAccountNumber">Loan Account Number *</Label>
                    <Input
                      id="loanAccountNumber"
                      name="loanAccountNumber"
                      value={formData.loanAccountNumber}
                      onChange={handleChange}
                      placeholder="NMFB/TCF/2023/12345"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originalLoanAmount">Original Loan Amount (₦) *</Label>
                      <Input
                        id="originalLoanAmount"
                        name="originalLoanAmount"
                        type="number"
                        value={formData.originalLoanAmount}
                        onChange={handleChange}
                        placeholder="500000"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="outstandingBalance">Outstanding Balance (₦) *</Label>
                      <Input
                        id="outstandingBalance"
                        name="outstandingBalance"
                        type="number"
                        value={formData.outstandingBalance}
                        onChange={handleChange}
                        placeholder="350000"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Restructuring Proposal */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Restructuring Proposal</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentMonthlyPayment">Current Monthly Payment (₦) *</Label>
                      <Input
                        id="currentMonthlyPayment"
                        name="currentMonthlyPayment"
                        type="number"
                        value={formData.currentMonthlyPayment}
                        onChange={handleChange}
                        placeholder="25000"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="proposedMonthlyPayment">Proposed Monthly Payment (₦) *</Label>
                      <Input
                        id="proposedMonthlyPayment"
                        name="proposedMonthlyPayment"
                        type="number"
                        value={formData.proposedMonthlyPayment}
                        onChange={handleChange}
                        placeholder="15000"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredTenor">Preferred New Tenor (months) *</Label>
                    <Input
                      id="preferredTenor"
                      name="preferredTenor"
                      type="number"
                      value={formData.preferredTenor}
                      onChange={handleChange}
                      placeholder="24"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessStatus">Current Business Status *</Label>
                    <Input
                      id="businessStatus"
                      name="businessStatus"
                      value={formData.businessStatus}
                      onChange={handleChange}
                      placeholder="e.g., Recovering from COVID-19 impact, seasonal downturn"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reasonForRestructuring">Reason for Restructuring Request *</Label>
                    <Textarea
                      id="reasonForRestructuring"
                      name="reasonForRestructuring"
                      value={formData.reasonForRestructuring}
                      onChange={handleChange}
                      placeholder="Briefly explain why you need loan restructuring (e.g., business challenges, income reduction, family emergency)"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full" size="lg">
                  Generate Template & Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoanRestructureForm;
