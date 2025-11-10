import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PaymentDialog from "@/components/PaymentDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import calculatorIcon from "@/assets/calculator-icon.jpg";
import trackerIcon from "@/assets/tracker-icon.jpg";
import recoveryIcon from "@/assets/recovery-icon.jpg";
import letterIcon from "@/assets/letter-icon.jpg";

const Tools = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; price: string } | null>(null);

  const products = [
    {
      id: 1,
      title: "TCF Loan Repayment Calculator App",
      description: "Interactive web-based calculator with amortization schedule and payment tracking.",
      price: "2,500",
      image: calculatorIcon,
      category: "app"
    },
    {
      id: 2,
      title: "Loan Restructuring Letter Template",
      description: "Professional template for requesting loan restructuring from NMFB.",
      price: "1,500",
      image: letterIcon,
      category: "template"
    },
    {
      id: 3,
      title: "Repayment Tracker Spreadsheet",
      description: "Excel spreadsheet to track payments, balances, and due dates.",
      price: "2,000",
      image: trackerIcon,
      category: "template"
    },
    {
      id: 4,
      title: "Business Recovery Plan Template",
      description: "Comprehensive template to rebuild your business after financial setbacks.",
      price: "3,000",
      image: recoveryIcon,
      category: "template"
    },
    {
      id: 5,
      title: "GSI Dispute Letter Sample",
      description: "Template letter for disputing incorrect entries in your credit report.",
      price: "1,500",
      image: letterIcon,
      category: "template"
    },
    {
      id: 6,
      title: "Loan Repayment Reminder App",
      description: "Set due dates and receive SMS/email alerts for upcoming payments.",
      price: "3,500",
      image: calculatorIcon,
      category: "app"
    },
    {
      id: 7,
      title: "Income & Expense Budget Planner",
      description: "Excel/Google Sheets version tailored to micro-entrepreneurs.",
      price: "2,000",
      image: trackerIcon,
      category: "template"
    },
    {
      id: 8,
      title: "Loan Reconciliation Worksheet",
      description: "Match NMFB repayment records with your personal bank statements.",
      price: "1,800",
      image: trackerIcon,
      category: "template"
    },
    {
      id: 9,
      title: "Debt Prioritization Toolkit",
      description: "Organize multiple debts and determine optimal repayment order.",
      price: "2,200",
      image: recoveryIcon,
      category: "template"
    },
    {
      id: 10,
      title: "CBN Intervention Loan Comparison Chart",
      description: "Downloadable guide comparing TCF, AGSMEIS, and other schemes.",
      price: "1,000",
      image: letterIcon,
      category: "guide"
    },
    {
      id: 11,
      title: "Credit Score Improvement Guide",
      description: "eBook with practical steps to rebuild credit after default.",
      price: "2,500",
      image: recoveryIcon,
      category: "guide"
    },
    {
      id: 12,
      title: "Personal Financial Recovery Workbook",
      description: "Guided PDF planner for post-loan cashflow management.",
      price: "2,800",
      image: trackerIcon,
      category: "workbook"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuy = (productTitle: string, price: string) => {
    setSelectedProduct({ title: productTitle, price });
    setPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedProduct) {
      navigate(`/loan-restructure-form?product=${encodeURIComponent(selectedProduct.title)}&price=${selectedProduct.price}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Digital Tools & Templates</h1>
              <p className="text-lg text-muted-foreground">
                Affordable resources designed specifically for NIRSAL TCF loan beneficiaries and borrowers.
              </p>
              
              {/* Search */}
              <div className="relative max-w-md mx-auto mt-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools and templates..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  onBuy={() => handleBuy(product.title, product.price)}
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {selectedProduct && (
        <PaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          productTitle={selectedProduct.title}
          price={selectedProduct.price}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Tools;
