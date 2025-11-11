import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Tools from "./pages/Tools";
import Calculator from "./pages/Calculator";
import Download from "./pages/Download";
import Contact from "./pages/Contact";
import Consultation from "./pages/Consultation";
import LoanRestructureForm from "./pages/LoanRestructureForm";
import ProductDelivery from "./pages/ProductDelivery";
import CalculatorProductDelivery from "./pages/CalculatorProductDelivery";
import TrackerProductDelivery from "./pages/TrackerProductDelivery";
import GuideProductDelivery from "./pages/GuideProductDelivery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/download" element={<Download />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/loan-restructure-form" element={<LoanRestructureForm />} />
          <Route path="/product-delivery" element={<ProductDelivery />} />
          <Route path="/calculator-product-delivery" element={<CalculatorProductDelivery />} />
          <Route path="/tracker-product-delivery" element={<TrackerProductDelivery />} />
          <Route path="/guide-product-delivery" element={<GuideProductDelivery />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
