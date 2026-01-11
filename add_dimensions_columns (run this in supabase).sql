-- Migration to add dimensions columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS height NUMERIC;
ALTER TABLE products ADD COLUMN IF NOT EXISTS width NUMERIC;
ALTER TABLE products ADD COLUMN IF NOT EXISTS depth NUMERIC;
