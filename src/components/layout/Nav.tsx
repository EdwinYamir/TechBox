import { LogIn, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Props {
    user: any;
    onLogout: () => void;
    onOpenAuth: () => void;
}

export default function DesktopNav({ user, onLogout, onOpenAuth }: Props) {
    return (
        <nav className="hidden md:flex items-center gap-8">
            <Link
                href="/"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group"
            >
                Inicio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <div className="relative group">
                <Link
                    href="/productos"
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                    Catálogo
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </Link>

                <div className="absolute top-full left-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden py-1">
                        {[
                            { name: "Accesorios", href: "/Categorias/Accesorios" },
                            { name: "Celulares / Tabletas", href: "/Categorias/Telefonos - Tablets" },
                            { name: "Componentes", href: "/Categorias/Componentes" },
                            { name: "Computadoras", href: "/Categorias/Computadoras" },
                            { name: "Inteligencia Artificial", href: "/Categorias/Inteligencia - Artificial" },
                        ].map((category) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

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
                Dashboard
            </Link>
        </nav>
    );
}
