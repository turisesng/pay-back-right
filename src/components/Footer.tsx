import { Link } from "react-router-dom";
import { BookOpen, Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Paying Back Right</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your guide to successfully repaying the NIRSAL TCF loan and achieving financial freedom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Book</Link></li>
              <li><Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">Digital Tools</Link></li>
              <li><Link to="/calculator" className="text-muted-foreground hover:text-primary transition-colors">Loan Calculator</Link></li>
              <li><Link to="/download" className="text-muted-foreground hover:text-primary transition-colors">Free Download</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">Templates</Link></li>
              <li><Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">Calculators</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Coaching</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:info@payingbackright.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Paying Back Right. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
