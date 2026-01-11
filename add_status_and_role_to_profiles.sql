-- Add status and role columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer';

-- Update RLS if needed, but usually profiles are readable/writable by admins anyway.
-- These columns will allow us to filter and manage users better.
