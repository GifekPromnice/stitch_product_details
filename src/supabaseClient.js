import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Fallback for legacy

// Prioritize the publishable key as requested by the user
const key = supabaseKey || supabaseAnonKey || 'placeholder-key';
const url = supabaseUrl || 'https://placeholder.supabase.co';

console.log('Supabase Client Initializing:', {
    url,
    keyEnvName: supabaseKey ? 'VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY' : 'VITE_SUPABASE_ANON_KEY',
    keyPrefix: key.substring(0, 15) + '...'
});

export const supabase = createClient(url, key);
