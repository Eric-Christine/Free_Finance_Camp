import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseConfig = !!(supabaseUrl && supabaseAnonKey);
const isDev = !!import.meta.env.DEV;

if (!hasSupabaseConfig && isDev) {
    console.warn('Supabase credentials not found in development. Using mock auth.');
}

if (!hasSupabaseConfig && !isDev) {
    console.error('Supabase credentials missing in production. Authentication is disabled.');
}

export const isRealAuth = hasSupabaseConfig;
export const isMockAuth = !hasSupabaseConfig && isDev;
export const isAuthAvailable = isRealAuth || isMockAuth;

export const supabase = isRealAuth
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
