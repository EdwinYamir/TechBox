import { createClient } from "@supabase/supabase-js";

export function supabaseServer() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,            // sin NEXT_PUBLIC_
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!       // sin NEXT_PUBLIC_
    );
}
