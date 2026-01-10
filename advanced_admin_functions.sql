-- Function to allow administrators to delete users from auth.users via RPC
-- Use with caution. Requires SECURITY DEFINER.
CREATE OR REPLACE FUNCTION delete_user_by_id(user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Perform any cleanup logic here if needed
  DELETE FROM auth.users WHERE id = user_id;
END;
$$;

-- Note: This function can be called via supabase.rpc('delete_user_by_id', { user_id: '...' })
