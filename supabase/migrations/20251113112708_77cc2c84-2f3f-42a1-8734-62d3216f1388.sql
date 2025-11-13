-- Create storage bucket for digital products
INSERT INTO storage.buckets (id, name, public) 
VALUES ('digital-products', 'digital-products', false);

-- Create products table first
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  file_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
ON public.products FOR SELECT
USING (true);

-- Create user_purchases table
CREATE TABLE public.user_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  purchase_date TIMESTAMPTZ DEFAULT now(),
  payment_status TEXT DEFAULT 'completed',
  amount_paid DECIMAL(10,2) NOT NULL,
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchases"
ON public.user_purchases FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases"
ON public.user_purchases FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create email_deliveries table
CREATE TABLE public.email_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  phone TEXT,
  delivery_status TEXT DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.email_deliveries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own email deliveries"
ON public.email_deliveries FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create email delivery requests"
ON public.email_deliveries FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Now create storage policies after tables exist
CREATE POLICY "Authenticated users can view their purchased products"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'digital-products' 
  AND auth.uid() IN (
    SELECT user_id FROM user_purchases 
    WHERE product_id::text = (storage.foldername(name))[1]
  )
);

CREATE POLICY "Service role can upload products"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'digital-products');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();