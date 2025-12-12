//asd
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback for build time if env vars are missing
const url = supabaseUrl || "https://placeholder.supabase.co";
const key = supabaseKey || "placeholder";

export const supabase = createClient(url, key);
