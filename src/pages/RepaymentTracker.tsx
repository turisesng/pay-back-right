import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Download, CheckCircle2, Plus, Trash2 } from "lucide-react";

interface Payment {
  id: number;
  date: string;
  amount: string;
  status: string;
}

const RepaymentTracker = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  // Contact fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [borrowerName, setBorrowerName] = useState("");
  
  // Loan details
  const [loanAmount, setLoanAmount] = useState("");
  const [outstandingBalance, setOutstandingBalance] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  
  // Payment tracking
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, date: "", amount: "", status: "pending" }
  ]);

  const productTitle = searchParams.get("product") || "Repayment Tracker";
  const price = searchParams.get("price") || "0";

  const addPaymentRow = () => {
    setPayments([...payments, { id: Date.now(), date: "", amount: "", status: "pending" }]);
  };

  const removePaymentRow = (id: number) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const updatePayment = (id: number, field: keyof Payment, value: string) => {
    setPayments(payments.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Tracker Generated!",
      description: "Your repayment tracker has been sent to your email.",
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
                <CardTitle className="text-2xl">Tracker Created Successfully!</CardTitle>
                <CardDescription>
                  Your personalized repayment tracker has been sent to {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold">Your Tracker Includes:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Complete payment schedule with dates</li>
                    <li>• Outstanding balance tracking</li>
                    <li>• Payment status indicators</li>
                    <li>• Excel format for easy editing</li>
                    <li>• Auto-calculated totals and summaries</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={() => window.location.href = "/tools"} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Tracker (Excel)
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
        <div className="container max-w-4xl">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-4xl font-bold">Loan Repayment Tracker</h1>
            <p className="text-lg text-muted-foreground">
              Set up your personalized payment tracking spreadsheet
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configure Your Tracker</CardTitle>
              <CardDescription>
                Enter your loan details and payment schedule
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

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="borrowerName">Your Name *</Label>
                      <Input
                        id="borrowerName"
                        value={borrowerName}
                        onChange={(e) => setBorrowerName(e.target.value)}
                        required
                      />
                    </div>
                    
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

                {/* Loan Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Loan Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Original Loan Amount *</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="1000000"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="outstandingBalance">Outstanding Balance *</Label>
                      <Input
                        id="outstandingBalance"
                        type="number"
                        value={outstandingBalance}
                        onChange={(e) => setOutstandingBalance(e.target.value)}
                        placeholder="750000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyPayment">Monthly Payment Amount *</Label>
                      <Input
                        id="monthlyPayment"
                        type="number"
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(e.target.value)}
                        placeholder="125000"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nextDueDate">Next Due Date *</Label>
                      <Input
                        id="nextDueDate"
                        type="date"
                        value={nextDueDate}
                        onChange={(e) => setNextDueDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Schedule */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Payment History (Optional)</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addPaymentRow}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Payment
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {payments.map((payment) => (
                      <div key={payment.id} className="flex gap-2 items-start">
                        <Input
                          type="date"
                          value={payment.date}
                          onChange={(e) => updatePayment(payment.id, 'date', e.target.value)}
                          placeholder="Date"
                        />
                        <Input
                          type="number"
                          value={payment.amount}
                          onChange={(e) => updatePayment(payment.id, 'amount', e.target.value)}
                          placeholder="Amount"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePaymentRow(payment.id)}
                          disabled={payments.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Generate & Send Tracker
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

export default RepaymentTracker;
