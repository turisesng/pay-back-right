import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, CheckCircle2 } from "lucide-react";

const CalculatorProductDelivery = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const productTitle = searchParams.get("product") || "Calculator/App Product";
  const price = searchParams.get("price") || "0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Product Delivered!",
      description: "Check your email for download instructions and access links.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your calculator/app is being downloaded.",
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
                <CardTitle className="text-2xl">Thank You for Your Purchase!</CardTitle>
                <CardDescription>
                  Your {productTitle} has been delivered to {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold">What's Next?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Check your email for access instructions</li>
                    <li>• Download the app or access the web calculator</li>
                    <li>• Follow the setup guide included in your email</li>
                    <li>• Contact support if you need assistance</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Now
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/tools")} className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
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
      <main className="flex-1 py-16">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Deliver Your Product</CardTitle>
              <CardDescription>
                Enter your contact details to receive {productTitle}
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
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
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
                      placeholder="080XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => navigate("/tools")} className="w-full">
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full">
                    Confirm Delivery
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorProductDelivery;
