import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Download, CheckCircle2, BookOpen, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const GuideReader = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const productTitle = searchParams.get("product") || "Digital Guide";
  const price = searchParams.get("price") || "0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-product-email", {
        body: {
          email,
          phone,
          productTitle,
          productId: crypto.randomUUID(),
          userName: name,
        },
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Guide Delivered!",
        description: "Your digital guide has been sent to your email.",
      });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                <CardTitle className="text-2xl">Guide Delivered Successfully!</CardTitle>
                <CardDescription>
                  {productTitle} has been sent to {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold">What You'll Find Inside:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Comprehensive guide content in PDF format</li>
                    <li>• Step-by-step instructions and strategies</li>
                    <li>• Real-world examples and case studies</li>
                    <li>• Actionable tips and best practices</li>
                    <li>• Additional resources and references</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={() => window.location.href = "/tools"} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Guide (PDF)
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
            <BookOpen className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-4xl font-bold">{productTitle}</h1>
            <p className="text-lg text-muted-foreground">
              Access your comprehensive digital guide
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Get Your Guide</CardTitle>
              <CardDescription>
                Enter your details to receive the guide via email
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

                {/* Guide Preview */}
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold">What's Covered:</h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <p>Understanding the current financial landscape and challenges</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <p>Strategic approaches to improvement and recovery</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <p>Actionable steps and implementation guidelines</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">4</span>
                      </div>
                      <p>Tools, templates, and additional resources</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Guide to Email
                    </>
                  )}
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

export default GuideReader;
