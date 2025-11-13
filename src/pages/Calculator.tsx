import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, Download, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Calculator = () => {
  const [searchParams] = useSearchParams();
  const { toast: toastHook } = useToast();
  const [loanAmount, setLoanAmount] = useState("1000000");
  const [interestRate, setInterestRate] = useState("9");
  const [tenor, setTenor] = useState("12");
  const [moratorium, setMoratorium] = useState("3");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const productTitle = searchParams.get("product") || "TCF Loan Repayment Calculator";
  const price = searchParams.get("price") || "0";

  const calculateRepayment = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const months = parseInt(tenor);
    const moratoriumMonths = parseInt(moratorium);
    const activeMonths = months - moratoriumMonths;

    if (activeMonths <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalAmount: 0, schedule: [] };
    }

    // Calculate monthly payment using amortization formula
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, activeMonths)) / (Math.pow(1 + rate, activeMonths) - 1);
    
    // Generate amortization schedule
    let balance = principal;
    const schedule = [];
    
    // Moratorium period (interest only)
    for (let i = 1; i <= moratoriumMonths; i++) {
      const interest = balance * rate;
      schedule.push({
        month: i,
        payment: interest,
        principal: 0,
        interest,
        balance,
        type: "Moratorium"
      });
    }

    // Regular payment period
    for (let i = 1; i <= activeMonths; i++) {
      const interest = balance * rate;
      const principalPayment = monthlyPayment - interest;
      balance -= principalPayment;
      
      schedule.push({
        month: moratoriumMonths + i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest,
        balance: Math.max(0, balance),
        type: "Regular"
      });
    }

    const totalInterest = schedule.reduce((sum, item) => sum + item.interest, 0);
    const totalAmount = principal + totalInterest;

    return { monthlyPayment, totalInterest, totalAmount, schedule };
  };

  const results = calculateRepayment();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleDownloadSchedule = () => {
    toast.success("Downloading repayment schedule...", {
      description: "Your PDF will be ready shortly."
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-product-email", {
        body: {
          email,
          phone,
          productTitle,
          productId: crypto.randomUUID(),
        },
      });

      if (error) throw error;

      setEmailSent(true);
      toastHook({
        title: "Schedule Sent!",
        description: `Your repayment schedule has been sent to ${email}`,
      });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toastHook({
        title: "Error",
        description: error.message || "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold">TCF Loan Calculator</h1>
              <p className="text-lg text-muted-foreground">
                Calculate your NIRSAL TCF loan repayment schedule
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalcIcon className="h-5 w-5 text-primary" />
                    Loan Details
                  </CardTitle>
                  <CardDescription>Enter your loan information below</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Loan Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="1000000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rate">Interest Rate (% per annum)</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="9"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tenor">Tenor (Months)</Label>
                    <Input
                      id="tenor"
                      type="number"
                      value={tenor}
                      onChange={(e) => setTenor(e.target.value)}
                      placeholder="12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="moratorium">Moratorium Period (Months)</Label>
                    <Input
                      id="moratorium"
                      type="number"
                      value={moratorium}
                      onChange={(e) => setMoratorium(e.target.value)}
                      placeholder="3"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Results Summary */}
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle>Repayment Summary</CardTitle>
                  <CardDescription>Your calculated repayment details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(results.monthlyPayment)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Principal</p>
                      <p className="text-lg font-semibold">{formatCurrency(parseFloat(loanAmount))}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.totalInterest)}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Total Amount to Pay</p>
                    <p className="text-2xl font-bold text-secondary">{formatCurrency(results.totalAmount)}</p>
                  </div>
                  
                  <Button 
                    onClick={handleDownloadSchedule}
                    variant="hero" 
                    className="w-full mt-4"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Schedule (PDF)
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Amortization Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Amortization Schedule</CardTitle>
                <CardDescription>Month-by-month breakdown of your repayment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Month</th>
                        <th className="text-left p-3">Type</th>
                        <th className="text-right p-3">Payment</th>
                        <th className="text-right p-3">Principal</th>
                        <th className="text-right p-3">Interest</th>
                        <th className="text-right p-3">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.schedule.map((item) => (
                        <tr key={item.month} className="border-b hover:bg-muted/50">
                          <td className="p-3">{item.month}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              item.type === 'Moratorium' 
                                ? 'bg-secondary/20 text-secondary-foreground' 
                                : 'bg-primary/20 text-primary-foreground'
                            }`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="text-right p-3">{formatCurrency(item.payment)}</td>
                          <td className="text-right p-3">{formatCurrency(item.principal)}</td>
                          <td className="text-right p-3">{formatCurrency(item.interest)}</td>
                          <td className="text-right p-3 font-semibold">{formatCurrency(item.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Email Delivery Section */}
            {emailSent ? (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>Schedule Sent Successfully!</CardTitle>
                  <CardDescription>
                    Your repayment schedule has been sent to {email}
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Deliver to Email</CardTitle>
                  <CardDescription>
                    Get your personalized calculator results sent to your email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
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
                          placeholder="080XXXXXXXX"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Schedule to Email
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calculator;
