"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Nuevo componente
import AdminCard from "@/src/components/AdminCard";

// Iconos modernos
import { Package, Boxes, DollarSign, Wrench } from "lucide-react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [totalProductos, setTotalProductos] = useState(0);
    const [totalStock, setTotalStock] = useState(0);
    const [totalVentas, setTotalVentas] = useState(0);
    const [serviciosPendientes, setServiciosPendientes] = useState(0);
    const [ventasRecientes, setVentasRecientes] = useState<any[]>([]);
    const [stockBajo, setStockBajo] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // TOTAL PRODUCTOS
            const { count: countProductos } = await supabase
                .from("Producto")
                .select("*", { count: "exact", head: true });
            setTotalProductos(countProductos || 0);

            // TOTAL STOCK
            const { data: inventario } = await supabase
                .from("Inventario")
                .select("Cantidad");
            const total = inventario?.reduce((acc, i) => acc + i.Cantidad, 0) || 0;
            setTotalStock(total);

            // TOTAL VENTAS
            const { data: ventas } = await supabase.from("Venta").select("TotalVenta");
            const totalV = ventas?.reduce((acc, v) => acc + Number(v.TotalVenta), 0) || 0;
            setTotalVentas(totalV);

            // SERVICIOS PENDIENTES
            const { count: countServicios } = await supabase
                .from("ServicioTecnico")
                .select("*", { count: "exact" })
                .eq("Estado", "Ingresado");
            setServiciosPendientes(countServicios || 0);

            // VENTAS RECIENTES
            const { data: ventas_r } = await supabase
                .from("Venta")
                .select("IdVenta, FechaVenta, TotalVenta")
                .order("FechaVenta", { ascending: false })
                .limit(5);
            setVentasRecientes(ventas_r || []);

            // PRODUCTOS CON STOCK BAJO
            const { data: productosStock } = await supabase
                .from("Inventario")
                .select(`
                    Cantidad,
                    StockMinimo,
                    Producto (
                        Nombre,
                        Marca
                    )
                `)
                .lt("Cantidad", 5);
            setStockBajo(productosStock || []);

            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
                Cargando dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {/* BOTÓN ATRÁS */}
            <button
                onClick={() => window.history.back()}
                className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 
                       rounded-lg text-gray-700 font-medium transition"
            >
                ← Atrás
            </button>

            <h1 className="text-4xl font-bold text-gray-800 mb-10">Dashboard Administrativo</h1>

            {/* TARJETAS SUPERIORES */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
                <AdminCard
                    title="Productos"
                    value={totalProductos}
                    icon={<Package size={32} />}
                    color="blue"
                />
                <AdminCard
                    title="Stock total"
                    value={totalStock}
                    icon={<Boxes size={32} />}
                    color="green"
                />
                <AdminCard
                    title="Ventas totales ($)"
                    value={totalVentas.toFixed(2)}
                    icon={<DollarSign size={32} />}
                    color="yellow"
                />
                <AdminCard
                    title="Servicios pendientes"
                    value={serviciosPendientes}
                    icon={<Wrench size={32} />}
                    color="red"
                />
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* VENTAS RECIENTES */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4">Ventas recientes</h2>

                    {ventasRecientes.map((v) => (
                        <div
                            key={v.IdVenta}
                            className="flex justify-between py-3 border-b border-gray-100"
                        >
                            <span>{new Date(v.FechaVenta).toLocaleString()}</span>
                            <span className="font-bold text-gray-800">${v.TotalVenta}</span>
                        </div>
                    ))}

                    {ventasRecientes.length === 0 && (
                        <p className="text-gray-600">No hay ventas registradas.</p>
                    )}
                </div>

                {/* STOCK BAJO */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4">Productos con stock bajo</h2>

                    {stockBajo.map((p, i) => (
                        <div
                            key={i}
                            className="flex justify-between py-3 border-b border-gray-100"
                        >
                            <span>
                                {p.Producto?.Nombre} ({p.Producto?.Marca})
                            </span>
                            <span className="text-red-600 font-bold">{p.Cantidad} unidades</span>
                        </div>
                    ))}

                    {stockBajo.length === 0 && (
                        <p className="text-gray-600">Todos los productos tienen stock suficiente.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
