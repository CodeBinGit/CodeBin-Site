import { createClient } from '@supabase/supabase-js';
import 'server-only';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer a server-only secret key; fall back to the publishable key the
// original site used.
const key =
  process.env.SUPABASE_SECRET_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    'Missing Supabase configuration. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).'
  );
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false }
});

export default supabase;
