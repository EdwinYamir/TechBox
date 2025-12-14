"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);

    //  Datos cliente
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    const handleSubmit = async () => {
        if (!email || !password) {
            alert("Completa email y contraseña");
            return;
        }

        if (isRegister && (!nombre || !apellido)) {
            alert("Completa nombre y apellido");
            return;
        }

        setLoading(true);

        // REGISTRO
        if (isRegister) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                alert(error.message);
                setLoading(false);
                return;
            }

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
                    alert("Error creando el cliente");
                    setLoading(false);
                    return;
                }
            }

            alert("Registro exitoso ✅");
            window.location.href = "/productos";
        }

        // LOGIN
        else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert(error.message);
                setLoading(false);
                return;
            }

            alert("Login exitoso ✅");
            window.location.href = "/productos";
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-6 rounded-xl shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-center">
                    {isRegister ? "Crear cuenta" : "Iniciar sesión"}
                </h2>

                {isRegister && (
                    <>
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="w-full mb-2 p-2 border rounded"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Apellido"
                            className="w-full mb-2 p-2 border rounded"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Teléfono"
                            className="w-full mb-2 p-2 border rounded"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Dirección"
                            className="w-full mb-3 p-2 border rounded"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full mb-4 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                    {loading
                        ? "Procesando..."
                        : isRegister
                            ? "Registrarse"
                            : "Entrar"}
                </button>

                <p className="text-sm text-center mt-4">
                    {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-blue-600 underline"
                    >
                        {isRegister ? "Inicia sesión" : "Regístrate"}
                    </button>
                </p>
            </div>
        </div>
    );
}
