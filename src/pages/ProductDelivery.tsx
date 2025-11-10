import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle2, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDelivery = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productTitle = searchParams.get("product") || "Digital Product";
  const price = searchParams.get("price") || "0";
  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    toast.success("Product Delivered!", {
      description: `${productTitle} has been sent to ${email}`
    });
  };

  const handleDownload = () => {
    toast.success("Download Started!", {
      description: `Downloading ${productTitle}...`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container max-w-2xl">
          {!submitted ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <CardTitle>Payment Successful!</CardTitle>
                </div>
                <CardDescription>
                  Please provide your details to receive "{productTitle}"
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Amount Paid:</span>
                      <span className="text-2xl font-bold text-primary">₦{price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Product: {productTitle}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Digital product will be sent to this email
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/tools")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Tools
                  </Button>
                  <Button type="submit" className="flex-1">
                    <Mail className="mr-2 h-4 w-4" />
                    Send to Email
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <CheckCircle2 className="h-6 w-6" />
                  <CardTitle>Product Delivered!</CardTitle>
                </div>
                <CardDescription>
                  We've sent "{productTitle}" to your email address.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                  <p className="text-sm">
                    <strong>Email:</strong> {email}
                  </p>
                  {phone && (
                    <p className="text-sm mt-1">
                      <strong>Phone:</strong> {phone}
                    </p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">
                  Check your inbox and spam folder. If you don't receive it within 5 minutes, contact our support.
                </p>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Now
                </Button>
                <Button
                  onClick={() => navigate("/tools")}
                  className="flex-1"
                >
                  Browse More Tools
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDelivery;
