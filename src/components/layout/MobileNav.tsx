import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

interface Props {
    user: any;
    onLogout: () => void;
    onOpenAuth: () => void;
    onClose: () => void;
}

export default function MobileNav({ user, onLogout, onOpenAuth, onClose }: Props) {
    return (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 p-4 shadow-xl">
            <nav className="flex flex-col gap-4">
                <Link href="/" onClick={onClose}>Inicio</Link>
                <Link href="/productos" onClick={onClose}>Catálogo</Link>

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
                    Ir al Dashboard
                </Link>
            </nav>
        </div>
    );
}
