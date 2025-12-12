"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import PurchaseModal from "@/components/PurchaseModal";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProductosPage() {
    const [productos, setProductos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
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

            console.log("DATA SUPABASE:", data);

            if (error) {
                console.error("Error cargando productos:", error);
            } else {
                setProductos(data);
            }

            setLoading(false);
        };

        fetchProductos();
    }, []);

    const handleBuy = async (product: any, quantity: number) => {
        if (!product) return;

        // 1. Get current stock
        const currentStock = Array.isArray(product.Inventario)
            ? product.Inventario[0]?.Cantidad
            : product.Inventario?.Cantidad;

        if (currentStock < quantity) return;

        const newStock = currentStock - quantity;

        const { error } = await supabase
            .from("Inventario")
            .update({ Cantidad: newStock })
            .eq("IdProducto", product.IdProducto);

        if (error) {
            console.error("Error updating stock:", error);
            alert("Hubo un error al realizar la compra.");
            throw error;
        }

        setProductos((prev) =>
            prev.map((p) => {
                if (p.IdProducto === product.IdProducto) {
                    const newInventario = Array.isArray(p.Inventario)
                        ? [{ ...p.Inventario[0], Cantidad: newStock }]
                        : { ...p.Inventario, Cantidad: newStock };

                    const updatedProduct = { ...p, Inventario: newInventario };

                    setSelectedProduct(updatedProduct);

                    return updatedProduct;
                }
                return p;
            })
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
                Cargando productos...
            </div>
        );
    }

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
            <h1 className="text-4xl font-bold text-gray-900 mb-10">Catálogo de Productos</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {productos.map((p) => (
                    <ProductCard
                        key={p.IdProducto}
                        nombre={p.Nombre}
                        marca={p.Marca}
                        modelo={p.Modelo}
                        categoria={p.Categoria}
                        precio={p.PrecioVenta}
                        stock={(Array.isArray(p.Inventario) ? p.Inventario[0]?.Cantidad : p.Inventario?.Cantidad) ?? 0}
                        onClick={() => setSelectedProduct(p)}
                    />
                ))}
            </div>
        </div>
    );
}
