-- COMPREHENSIVE FIX FOR EMPTY USERS LIST
-- This script does 3 things:
-- 1. Fixes RLS policies (Permissions) so Admin/Everyone can read profiles.
-- 2. Creates a Trigger to automatically create a profile when a new user signs up.
-- 3. Backfills missing profiles for existing users who might have signed up before the trigger existed.

-- 1. ENABLE ROW LEVEL SECURITY & ADD POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read profiles (needed for marketplace to see seller info)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

-- Allow users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Allow admins/service role to do everything (optional, but good for admin panel stability)
-- Note: 'service_role' bypasses RLS anyway, but authenticated admins might need this.
-- Assuming admins are just regular users with a flag. Since we added "USING (true)" for select, reading is fine.
-- For updating/deleting other users, RLS usually blocks it unless you are a superuser.
-- We'll add a policy that allows updates if the user has role 'admin' (if your auth setup supports it) or just keep it simple for now.

-- 2. CREATE TRIGGER FOR NEW USERS
-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, username, created_at, updated_at)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'username',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. BACKFILL MISSING PROFILES
-- Using a secure function to copy users from auth.users to public.profiles if they don't exist
DO $$
BEGIN
  INSERT INTO public.profiles (id, email, created_at, updated_at)
  SELECT 
    id, 
    email, 
    created_at, 
    last_sign_in_at 
  FROM auth.users
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email, -- Sync email if changed
    updated_at = NOW(); -- Mark as updated
END $$;

-- 4. ENSURE COLUMNS EXIST (Just to be double sure)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer';
