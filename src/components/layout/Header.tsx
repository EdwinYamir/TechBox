"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import Logo from "./Logo";
import DesktopNav from "./Nav";
import MobileNav from "./MobileNav";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
    onOpenAuth: () => void;
}

export default function Header({ onOpenAuth }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        window.location.reload();
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                <Logo />

                <DesktopNav
                    user={user}
                    onLogout={handleLogout}
                    onOpenAuth={onOpenAuth}
                />

                <button
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <MobileNav
                    user={user}
                    onLogout={handleLogout}
                    onOpenAuth={onOpenAuth}
                    onClose={() => setIsMobileMenuOpen(false)}
                />
            )}
        </header>
    );
}
