"use client";

import { LogIn, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
    user: any;
    onLogout: () => void;
    onOpenAuth: () => void;
    onClose: () => void;
}

export default function MobileNav({ user, onLogout, onOpenAuth, onClose }: Props) {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);

    return (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 p-4 shadow-xl">
            <nav className="flex flex-col gap-4">
                <Link href="/" onClick={onClose}>Inicio</Link>

                <div className="flex flex-col">
                    <button
                        onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                        className="flex items-center justify-between text-left"
                    >
                        Catálogo
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${isCatalogOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${isCatalogOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col gap-2 pl-4 border-l-2 border-slate-100 ml-1">
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
                                    className="text-sm text-slate-600 hover:text-blue-600 py-1"
                                    onClick={onClose}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {user ? (
                    <button onClick={onLogout} className="text-red-600 flex gap-2">
                        <LogOut size={18} /> Cerrar sesión
                    </button>
                ) : (
                    <button onClick={onOpenAuth} className="flex gap-2">
                        <LogIn size={18} /> Ingresar / Registrarse
                    </button>
                )}

                <Link
                    href="/admin"
                    className="bg-slate-900 text-white text-center py-2 rounded-xl"
                    onClick={onClose}
                >
                    Dashboard
                </Link>
            </nav>
        </div>
    );
}
