"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/productos/ProductCard";
import PurchaseModal from "@/components/productos/PurchaseModal";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProductosPage() {
    const [productos, setProductos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [idCliente, setIdCliente] = useState<number | null>(null);

    // =============================
    // Cargar productos
    // =============================
    const fetchProductos = async () => {
        const { data, error } = await supabase
            .from("Producto")
            .select(`
        IdProducto,
        Nombre,
        Modelo,
        Categoria,
        Marca,
        PrecioVenta,
        Inventario (Cantidad)
      `);

        if (error) {
            console.error("Error cargando productos:", error.message);
        } else {
            setProductos(data || []);
        }
    };

    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: cliente } = await supabase
                .from("Cliente")
                .select("IdCliente")
                .eq("AuthUserId", user.id)
                .single();

            if (cliente) {
                setIdCliente(cliente.IdCliente);
            }
        }
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await Promise.all([fetchProductos(), fetchUser()]);
            setLoading(false);
        };
        init();
    }, []);

    // =============================
    // Comprar producto (RPC)
    // =============================
    const handleBuy = async (product: any, quantity: number) => {
        if (!product || quantity <= 0) return;

        if (!idCliente) {
            alert("Debes iniciar sesión para comprar");
            // Opcional: redirigir a login
            // window.location.href = "/Login"; 
            return;
        }

        const { error } = await supabase.rpc("registrar_venta", {
            p_id_cliente: idCliente, // ID dinámico del usuario logueado
            p_id_empleado: 6,       // Empleado por defecto o dinámico si aplica
            p_id_producto: product.IdProducto,
            p_cantidad: quantity,
            p_metodo_pago: "Tarjeta",
        });

        if (error) {
            console.error("Error en la compra:", error.message);

            if (error.message.includes("Stock")) {
                alert("Stock insuficiente ❌");
            } else {
                alert("Error al realizar la compra");
            }
            return;
        }

        alert("Compra realizada con éxito ✅");

        setSelectedProduct(null);
        fetchProductos();
    };

    // =============================
    // Loading
    // =============================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
                Cargando productos...
            </div>
        );
    }

    // =============================
    // Render
    // =============================
    return (
        <div className="min-h-screen bg-white px-6 py-10 flex flex-col items-center">
            <PurchaseModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
                onBuy={handleBuy}
            />

            <button
                onClick={() => window.history.back()}
                className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 
                   rounded-lg text-gray-700 font-medium transition"
            >
                ← Atrás
            </button>

            <div className="flex justify-between w-full max-w-6xl mb-10 items-center">
                <h1 className="text-4xl font-bold text-gray-900">
                    Catálogo de Productos
                </h1>
                {!idCliente && (
                    <a href="/Login" className="text-blue-600 underline font-medium">
                        Iniciar Sesión
                    </a>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {productos.map((p) => (
                    <ProductCard
                        key={p.IdProducto}
                        nombre={p.Nombre}
                        marca={p.Marca}
                        modelo={p.Modelo}
                        categoria={p.Categoria}
                        precio={p.PrecioVenta}
                        stock={
                            (Array.isArray(p.Inventario)
                                ? p.Inventario[0]?.Cantidad
                                : p.Inventario?.Cantidad) ?? 0
                        }
                        onClick={() => setSelectedProduct(p)}
                    />
                ))}
            </div>
        </div>
    );
}
