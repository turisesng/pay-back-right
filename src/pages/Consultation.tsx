import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Clock, User, Calendar as CalendarIcon, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Consultation = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedPackage, setSelectedPackage] = useState<string>("single");
  const { toast } = useToast();

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const packages = [
    {
      id: "single",
      name: "Single Session",
      price: "₦15,000",
      duration: "1 hour",
      features: [
        "Personalized repayment review",
        "Loan account reconciliation",
        "Basic restructuring guidance",
        "Q&A session"
      ]
    },
    {
      id: "standard",
      name: "Standard Package",
      price: "₦40,000",
      duration: "3 sessions",
      features: [
        "Everything in Single Session",
        "Detailed restructuring plan",
        "Letter drafting assistance",
        "GSI/BVN account review",
        "Follow-up support (2 weeks)"
      ],
      popular: true
    },
    {
      id: "premium",
      name: "Premium Package",
      price: "₦75,000",
      duration: "6 sessions",
      features: [
        "Everything in Standard Package",
        "Comprehensive financial recovery plan",
        "Multiple letter drafts and reviews",
        "NMFB negotiation strategy",
        "Monthly check-ins (3 months)",
        "Priority email support"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Chioma Okafor",
      role: "Small Business Owner, Lagos",
      content: "The consultation helped me understand my TCF loan repayment better. I was able to restructure my loan and avoid default. Highly recommended!",
      rating: 5
    },
    {
      name: "Ibrahim Musa",
      role: "Farmer, Kano",
      content: "I was confused about my repayment schedule. The personalized guidance helped me create a realistic payment plan that works for my business.",
      rating: 5
    },
    {
      name: "Blessing Eze",
      role: "Trader, Enugu",
      content: "Professional service! They helped me draft a restructuring letter that was accepted by NMFB. My business is back on track now.",
      rating: 5
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your consultation.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Booking Confirmed!",
      description: "You will be redirected to payment...",
    });
    
    // Here you would integrate with Stripe/Paystack/Flutterwave
    console.log("Booking:", { selectedDate, selectedTime, selectedPackage });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Personalized TCF Loan Consultation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert guidance to help you successfully manage and repay your NIRSAL TCF loan
            </p>
          </div>
        </div>
      </section>

      {/* Services Description */}
      <section className="py-16 container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Personalized Repayment Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive analysis of your current loan status, repayment history, and financial capacity to create a realistic payment plan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Loan Restructuring Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Step-by-step assistance in preparing and submitting loan restructuring requests to NMFB, including documentation and strategy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Letter Drafting Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional help in drafting formal letters to NMFB, including restructuring requests, dispute letters, and repayment proposals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>GSI/BVN Account Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detailed review of your GSI account and BVN records to identify discrepancies and ensure accurate repayment tracking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Package</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Select the consultation package that best fits your needs and budget
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`relative ${pkg.popular ? 'border-primary border-2 shadow-lg' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {pkg.duration}
                  </CardDescription>
                  <div className="text-3xl font-bold text-primary mt-4">
                    {pkg.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6"
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 container">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Book Your Consultation</CardTitle>
              <CardDescription>
                Fill out the form below to schedule your personalized consultation session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="080XXXXXXXX" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loan-amount">Loan Amount (₦)</Label>
                    <Input id="loan-amount" type="number" placeholder="Enter loan amount" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Package</Label>
                  <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
                    {packages.map((pkg) => (
                      <div key={pkg.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={pkg.id} id={pkg.id} />
                        <Label htmlFor={pkg.id} className="cursor-pointer">
                          {pkg.name} - {pkg.price}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <div className="border rounded-lg p-3">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="pointer-events-auto"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Time Slot</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your specific situation or concerns..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Proceed to Payment
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  You will be redirected to secure payment gateway (Paystack/Stripe)
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
          <p className="text-center text-muted-foreground mb-12">
            Hear from clients who successfully navigated their TCF loan repayment
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consultation;
