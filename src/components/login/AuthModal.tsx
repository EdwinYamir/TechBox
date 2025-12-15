"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Mail, Lock, User, Phone, MapPin, ArrowRight, Loader2, LogIn } from "lucide-react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);

    // Datos cliente
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    // Reset fields on close or mode switch
    useEffect(() => {
        if (!isOpen) {
            setLoading(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Completa email y contraseña");
            return;
        }

        if (isRegister && (!nombre || !apellido)) {
            alert("Completa nombre y apellido");
            return;
        }

        setLoading(true);

        try {
            // REGISTRO
            if (isRegister) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) throw error;

                // Crear cliente con datos reales
                if (data.user) {
                    const { error: clienteError } = await supabase
                        .from("Cliente")
                        .insert({
                            Nombre: nombre,
                            Apellido: apellido,
                            Email: email,
                            Telefono: telefono || null,
                            Direccion: direccion || null,
                            AuthUserId: data.user.id,
                        });

                    if (clienteError) {
                        console.error("Error creando cliente:", clienteError.message);
                        throw new Error("Error creando el registro de cliente.");
                    }
                }

                alert("Registro exitoso ✅");
                window.location.reload(); // Recargar para detectar sesión
            }
            // =====================
            // LOGIN
            // =====================
            else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                alert("Login exitoso ✅");
                window.location.reload(); // Recargar para detectar sesión
            }
        } catch (error: any) {
            alert(error.message || "Ocurrió un error");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header Decor */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600 to-indigo-600">
                    <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="relative px-8 pt-12 pb-8">

                    {/* Header Text */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-lg mx-auto flex items-center justify-center mb-4 transform -rotate-3">
                            <LogIn size={28} className="text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            {isRegister ? "Crear cuenta" : "Bienvenido de nuevo"}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            {isRegister
                                ? "Únete a TechBox y gestiona tus pedidos."
                                : "Ingresa tus credenciales para continuar."
                            }
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {isRegister && (
                            <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <User className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Apellido"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <Phone className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Teléfono (Opcional)"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </div>

                                <div className="relative group">
                                    <MapPin className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Dirección (Opcional)"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    {isRegister ? "Registrarme" : "Iniciar Sesión"}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-500">
                            {isRegister ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}{" "}
                            <button
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-blue-600 font-bold hover:underline"
                            >
                                {isRegister ? "Ingresa aquí" : "Regístrate gratis"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
