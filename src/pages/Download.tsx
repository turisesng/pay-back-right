import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download as DownloadIcon, CheckCircle, Package } from "lucide-react";
import { toast } from "sonner";
import bookCover from "@/assets/book-cover.jpg";

const Download = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate download
    toast.success("Download started!", {
      description: "Check your email for the download link."
    });
    setIsSubmitted(true);
  };

  const recommendedProducts = [
    {
      title: "TCF Loan Calculator App",
      description: "Calculate your exact repayment schedule",
      link: "/calculator"
    },
    {
      title: "Repayment Tracker",
      description: "Track all your loan payments in one place",
      link: "/tools"
    },
    {
      title: "Business Recovery Template",
      description: "Rebuild your business with proven strategies",
      link: "/tools"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {!isSubmitted ? (
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Book Preview */}
                <div className="space-y-4">
                  <img 
                    src={bookCover} 
                    alt="Paying Back Right Book Cover"
                    className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
                  />
                  <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                    <h3 className="font-semibold text-lg">What's Included:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Complete guide to NIRSAL TCF loan repayment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Step-by-step repayment strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Sample letters and templates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Real case studies and examples</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Download Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Download Your Free Copy</CardTitle>
                    <CardDescription>
                      Enter your details to receive the book instantly in your email
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDownload} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <Button type="submit" variant="hero" className="w-full" size="lg">
                        <DownloadIcon className="mr-2 h-5 w-5" />
                        Download Free Book
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By downloading, you agree to receive occasional updates about financial literacy resources.
                        You can unsubscribe anytime.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold">Thank You!</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    We've sent the book to <strong>{email}</strong>. 
                    Check your inbox (and spam folder) for the download link.
                  </p>
                </div>

                {/* Recommended Products */}
                <div className="max-w-3xl mx-auto mt-12">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Package className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Recommended Tools</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {recommendedProducts.map((product, index) => (
                      <Card key={index} className="hover:border-primary transition-all duration-300">
                        <CardContent className="p-6 space-y-3">
                          <h3 className="font-semibold">{product.title}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <Button asChild variant="outline" className="w-full">
                            <Link to={product.link}>Learn More</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Download;
