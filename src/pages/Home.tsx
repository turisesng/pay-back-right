import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Calculator, Package, TrendingUp, CheckCircle, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bookCover from "@/assets/book-cover.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Understand Your Loan",
      description: "Learn the ins and outs of the NIRSAL TCF loan structure, interest rates, and repayment terms."
    },
    {
      icon: Calculator,
      title: "Plan Your Repayment",
      description: "Use our interactive calculator to create a personalized repayment schedule that fits your budget."
    },
    {
      icon: TrendingUp,
      title: "Rebuild Your Business",
      description: "Access proven strategies and templates to recover from setbacks and grow sustainably."
    },
    {
      icon: Package,
      title: "Digital Tools & Resources",
      description: "Get affordable templates, spreadsheets, and apps designed specifically for TCF beneficiaries."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 bg-gradient-to-br from-primary via-primary-hover to-accent overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Master Your NIRSAL TCF Loan Repayment
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                A practical guide to understanding, managing, and successfully repaying your loan obligations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary" className="text-base">
                  <Link to="/download">
                    <Download className="mr-2 h-5 w-5" />
                    Download Free Book
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-background/10 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/tools">
                    <Package className="mr-2 h-5 w-5" />
                    Explore Digital Tools
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-secondary blur-3xl opacity-30 rounded-full" />
                <img 
                  src={bookCover} 
                  alt="Paying Back Right Book Cover"
                  className="relative rounded-lg shadow-2xl max-w-sm w-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Gain</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to take control of your loan and build a stronger financial future.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-md">
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Author Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <BookOpen className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold">About This Book</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "Paying Back Right" was born from firsthand experience with the challenges faced by NIRSAL TCF loan beneficiaries. 
              This comprehensive guide demystifies the repayment process, offering practical solutions for debt restructuring, 
              business recovery, and credit restoration. Whether you're struggling with repayments or planning ahead, 
              this book provides the knowledge and tools you need to succeed.
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/about">Learn More About the Book</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Take Control?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Download your free copy today and start your journey to financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/download">
                <Download className="mr-2 h-5 w-5" />
                Get Free Book
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/10 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Try Loan Calculator
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
