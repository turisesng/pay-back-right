import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Download } from "lucide-react";
import bookCover from "@/assets/book-cover.jpg";

const About = () => {
  const chapters = [
    "Understanding the NIRSAL TCF Loan Structure",
    "Interest Rates and Repayment Terms Explained",
    "Creating a Realistic Repayment Plan",
    "Managing Business Cashflow During Repayment",
    "Options for Loan Restructuring and Renegotiation",
    "Dealing with Default and Credit Bureau Reports",
    "Business Recovery Strategies After Financial Setbacks",
    "Leveraging Other CBN Intervention Programs",
    "Building Financial Resilience for the Future"
  ];

  const benefits = [
    "Clear explanation of loan terms and obligations",
    "Step-by-step repayment planning strategies",
    "Templates for restructuring requests",
    "Credit repair and restoration guidance",
    "Business recovery frameworks",
    "Real-world case studies and examples"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={bookCover} 
                  alt="Paying Back Right Book Cover"
                  className="rounded-lg shadow-2xl max-w-md mx-auto"
                />
              </div>
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-sm font-semibold text-primary">FREE DOWNLOAD</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  Paying Back Right
                </h1>
                <p className="text-xl text-muted-foreground">
                  A Practical Guide to Repaying the NIRSAL TCF Loan Successfully
                </p>
                <p className="text-lg leading-relaxed">
                  This comprehensive guide was created to help NIRSAL Microfinance Bank TCF loan beneficiaries 
                  understand their obligations, manage repayments effectively, and recover from financial challenges. 
                  Drawing from real experiences and proven strategies, it provides actionable solutions for every stage 
                  of your loan journey.
                </p>
                <Button asChild variant="hero" size="lg">
                  <Link to="/download">
                    <Download className="mr-2 h-5 w-5" />
                    Download Free Book
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Topics Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Inside</h2>
                <p className="text-lg text-muted-foreground">
                  Comprehensive coverage of essential topics for successful loan management
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {chapters.map((chapter, index) => (
                  <Card key={index} className="hover:border-primary transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{chapter}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Gain</h2>
                <p className="text-lg text-muted-foreground">
                  Practical knowledge and tools to manage your loan successfully
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container">
            <Card className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground">
              <CardContent className="p-12 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Take Control of Your Loan?
                </h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Download your free copy now and gain the knowledge you need to successfully manage 
                  and repay your NIRSAL TCF loan.
                </p>
                <Button asChild size="lg" variant="secondary">
                  <Link to="/download">
                    <Download className="mr-2 h-5 w-5" />
                    Get Your Free Copy
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
