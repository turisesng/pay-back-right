-- Remove the foreign key constraint from email_deliveries
ALTER TABLE public.email_deliveries 
DROP CONSTRAINT IF EXISTS email_deliveries_product_id_fkey;

-- Make product_id nullable (it likely already is, but ensuring it)
ALTER TABLE public.email_deliveries 
ALTER COLUMN product_id DROP NOT NULL;