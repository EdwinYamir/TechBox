import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

interface Props {
    user: any;
    onLogout: () => void;
    onOpenAuth: () => void;
}

export default function DesktopNav({ user, onLogout, onOpenAuth }: Props) {
    return (
        <nav className="hidden md:flex items-center gap-8">
            {["Inicio", "Catálogo"].map((item) => (
                <Link
                    key={item}
                    href={item === "Inicio" ? "/" : "/productos"}
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group"
                >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            ))}

            {user ? (
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-700">
                        Hola, {user.email?.split("@")[0]}
                    </span>
                    <button
                        onClick={onLogout}
                        className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                    >
                        <LogOut size={18} />
                        <span className="hidden lg:inline">Salir</span>
                    </button>
                </div>
            ) : (
                <button
                    onClick={onOpenAuth}
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                    <LogIn size={18} />
                    <span className="hidden lg:inline">Ingresar</span>
                </button>
            )}

            <Link
                href="/admin"
                className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
                Admin Dashboard
            </Link>
        </nav>
    );
}
