-- FINAL CONSOLIDATED SCHEMA FIX (VERSION 2)
-- Run this in Supabase SQL Editor to fix missing columns

-- 1. Fix Profiles Table (users)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;
-- Ensure timestamps exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Fix Products Table (listings)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS height NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS width NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS depth NUMERIC;
-- Ensure timestamps exist
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Update existing data to have defaults (optional)
UPDATE public.products SET status = 'active' WHERE status IS NULL;
UPDATE public.profiles SET status = 'active' WHERE status IS NULL;
UPDATE public.profiles SET role = 'customer' WHERE role IS NULL;
-- Set updated_at if null so sorting works
UPDATE public.profiles SET updated_at = NOW() WHERE updated_at IS NULL;
