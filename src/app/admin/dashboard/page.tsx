"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Tarjetas existentes
import AdminCard from "@/components/AdminCard";

// Iconos
import { Package, Boxes, DollarSign, Wrench, Users, BarChart2 } from "lucide-react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);

    // Módulos actuales
    const [totalProductos, setTotalProductos] = useState(0);
    const [totalStock, setTotalStock] = useState(0);
    const [totalVentas, setTotalVentas] = useState(0);
    const [serviciosPendientes, setServiciosPendientes] = useState(0);
    const [ventasRecientes, setVentasRecientes] = useState<any[]>([]);
    const [stockBajo, setStockBajo] = useState<any[]>([]);

    // 🚀 NUEVOS MÓDULOS
    const [topClientes, setTopClientes] = useState<any[]>([]);
    const [ventasPorEmpleado, setVentasPorEmpleado] = useState<any[]>([]);
    const [valorInventario, setValorInventario] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            // Total productos (conteo)
            const { count: countProductos } = await supabase
                .from("Producto")
                .select("*", { count: "exact", head: true });
            setTotalProductos(countProductos || 0);

            // Total Stock (sumar cantidades de Inventario)
            const { data: inventario } = await supabase
                .from("Inventario")
                .select("Cantidad");
            setTotalStock(inventario?.reduce((acc, i) => acc + Number(i.Cantidad), 0) || 0);

            // Total Ventas Dinero
            const { data: ventas } = await supabase
                .from("Venta")
                .select("TotalVenta");
            setTotalVentas(ventas?.reduce((acc, v) => acc + Number(v.TotalVenta), 0) || 0);

            // Servicios pendientes
            const { count: countServicios } = await supabase
                .from("ServicioTecnico")
                .select("*", { count: "exact" })
                .eq("Estado", "Ingresado");
            setServiciosPendientes(countServicios || 0);

            // Ventas recientes (últimas 5)
            const { data: ventas_r } = await supabase
                .from("Venta")
                .select("IdVenta, FechaVenta, TotalVenta")
                .order("FechaVenta", { ascending: false })
                .limit(5);
            setVentasRecientes(ventas_r || []);

            // Stock bajo (Inventario < 5) - trae Producto (array)
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

            // -----------------------------------------
            // 🚀 NUEVO MÓDULO 1 — TOP 3 CLIENTES
            // -----------------------------------------
            const { data: topClientesData } = await supabase
                .from("Venta")
                .select(`
                    TotalVenta,
                    Cliente (
                        Nombre,
                        Apellido
                    )
                `);

            const clientesSummed: Record<string, number> = {};

            topClientesData?.forEach((v: any) => {
                const key = `${v.Cliente?.Nombre ?? "SinNombre"} ${v.Cliente?.Apellido ?? ""}`.trim();
                clientesSummed[key] = (clientesSummed[key] || 0) + Number(v.TotalVenta);
            });

            const top3 = Object.entries(clientesSummed)
                .map(([cliente, total]) => ({ cliente, total }))
                .sort((a, b) => b.total - a.total)
                .slice(0, 3);

            setTopClientes(top3);

            // -----------------------------------------
            // 🚀 NUEVO MÓDULO 2 — VENTAS POR EMPLEADO
            // -----------------------------------------
            const { data: ventasEmpleado } = await supabase
                .from("Venta")
                .select(`
                    TotalVenta,
                    Empleado (
                        Nombre,
                        Apellidos
                    )
                `);

            const empleadoSum: Record<string, number> = {};

            ventasEmpleado?.forEach((v: any) => {
                const key = `${v.Empleado?.Nombre ?? "SinNombre"} ${v.Empleado?.Apellidos ?? ""}`.trim();
                empleadoSum[key] = (empleadoSum[key] || 0) + Number(v.TotalVenta);
            });

            const empleadosOrdenados = Object.entries(empleadoSum)
                .map(([empleado, total]) => ({ empleado, total }))
                .sort((a, b) => b.total - a.total);

            setVentasPorEmpleado(empleadosOrdenados);

            // -----------------------------------------
            // 🚀 NUEVO MÓDULO 3 — VALOR TOTAL INVENTARIO
            // -----------------------------------------
            const { data: inventarioCompleto } = await supabase
                .from("Inventario")
                .select(`
                    Cantidad,
                    Producto (
                        PrecioCosto
                    )
                `);

            // CORRECCIÓN: Producto viene como ARRAY -> usar [0]
            const totalValor =
                inventarioCompleto?.reduce((acc: number, item: any) => {
                    const precio = Number(item.Producto?.PrecioCosto || 0);
                    const cantidad = Number(item.Cantidad || 0);
                    return acc + cantidad * precio;
                }, 0) || 0;

            setValorInventario(totalValor);

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

            {/* Botón Atrás */}
            <button
                onClick={() => window.history.back()}
                className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition"
            >
                ← Atrás
            </button>

            <h1 className="text-4xl font-bold text-gray-800 mb-10">
                Dashboard Administrativo
            </h1>

            {/* TARJETAS SUPERIORES */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-14">
                <AdminCard title="Productos" value={totalProductos} icon={<Package size={32} />} color="blue" />
                <AdminCard title="Stock total" value={totalStock} icon={<Boxes size={32} />} color="green" />
                <AdminCard title="Ventas totales ($)" value={totalVentas.toFixed(2)} icon={<DollarSign size={32} />} color="yellow" />
                <AdminCard title="Servicios pendientes" value={serviciosPendientes} icon={<Wrench size={32} />} color="red" />
                <AdminCard title="Valor inventario ($)" value={valorInventario.toFixed(2)} icon={<BarChart2 size={32} />} color="purple" />
                <AdminCard title="Top clientes" value={topClientes.length} icon={<Users size={32} />} color="pink" />
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* VENTAS POR EMPLEADO */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4">Ventas por empleado</h2>

                    {ventasPorEmpleado.length === 0 && <p className="text-gray-600">No hay datos.</p>}
                    {ventasPorEmpleado.map((e, idx) => (
                        <div key={idx} className="flex justify-between py-3 border-b">
                            <span>{e.empleado}</span>
                            <span className="font-bold text-gray-800">${e.total.toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="mt-4 text-sm text-gray-500">Actualizado con los totales por empleado.</div>
                </div>

                {/* TOP 3 CLIENTES */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4">Top 3 Clientes</h2>

                    {topClientes.length === 0 && <p className="text-gray-600">No hay clientes con ventas.</p>}
                    {topClientes.map((c, idx) => (
                        <div key={idx} className="flex justify-between py-3 border-b">
                            <span>#{idx + 1} {c.cliente}</span>
                            <span className="font-bold text-gray-800">${c.total.toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="mt-4 text-sm text-gray-500">Top clientes por monto gastado.</div>
                </div>

                {/* VENTAS RECIENTES */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 md:col-span-2">
                    <h2 className="text-2xl font-semibold mb-4">Ventas recientes</h2>

                    {ventasRecientes.length === 0 && <p className="text-gray-600">No hay ventas registradas.</p>}
                    {ventasRecientes.map((v) => (
                        <div key={v.IdVenta} className="flex justify-between py-3 border-b">
                            <span className="text-sm text-gray-600">{new Date(v.FechaVenta).toLocaleString()}</span>
                            <span className="font-bold text-gray-800">${Number(v.TotalVenta).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                {/* STOCK BAJO */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 md:col-span-2">
                    <h2 className="text-2xl font-semibold mb-4">Productos con stock bajo</h2>

                    {stockBajo.length === 0 && <p className="text-gray-600">Todos los productos tienen stock suficiente.</p>}
                    {stockBajo.map((p: any, i: number) => (
                        <div key={i} className="flex justify-between py-3 border-b">
                            <span>
                                {p.Producto?.[0]?.Nombre ?? "Producto desconocido"} {p.Producto?.[0]?.Marca ? `(${p.Producto?.[0]?.Marca})` : ""}
                            </span>
                            <span className="text-red-600 font-bold">{Number(p.Cantidad)} unidades</span>
                        </div>
                    ))}

                    <div className="mt-3 text-sm text-gray-500">Productos con cantidad menor a 5.</div>
                </div>

            </div>
        </div>
    );
}
