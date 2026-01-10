-- FINAL CONSOLIDATED SCHEMA FIX
-- Run this in Supabase SQL Editor if you see errors or empty lists

-- 1. Fix Products Table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS height NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS width NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS depth NUMERIC;

-- 2. Fix Profiles Table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;

-- 3. Update existing data to have defaults (optional but recommended)
UPDATE public.products SET status = 'active' WHERE status IS NULL;
UPDATE public.profiles SET status = 'active' WHERE status IS NULL;
UPDATE public.profiles SET role = 'customer' WHERE role IS NULL;
