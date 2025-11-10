import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";

interface ProductDeliveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
}

const ProductDeliveryDialog = ({ open, onOpenChange, productTitle }: ProductDeliveryDialogProps) => {
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

  const resetAndClose = () => {
    setSubmitted(false);
    setEmail("");
    setPhone("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Payment Successful!
              </DialogTitle>
              <DialogDescription>
                Please provide your details to receive "{productTitle}"
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <DialogFooter>
                <Button type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send to Email
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-6 w-6" />
                Product Delivered!
              </DialogTitle>
              <DialogDescription>
                We've sent "{productTitle}" to your email address.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
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
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Now
              </Button>
              <Button
                onClick={resetAndClose}
                className="w-full sm:w-auto"
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeliveryDialog;
