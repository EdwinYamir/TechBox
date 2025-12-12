import { createClient } from "@supabase/supabase-js";

export function supabaseServer() {
    return createClient(
        process.env.SUPABASE_URL!,            // sin NEXT_PUBLIC_
        process.env.SUPABASE_ANON_KEY!       // sin NEXT_PUBLIC_
    );
}
