"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
    Package,
    Boxes,
    DollarSign,
    Wrench,
    Users,
    BarChart2,
    ArrowLeft,
    TrendingUp,
    AlertTriangle,
} from "lucide-react";
import AdminCard from "@/components/AdminCard";
import InventoryModal from "@/components/InventoryModal";

// Supabase config
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);

    // Módulos de datos
    const [totalProductos, setTotalProductos] = useState(0);
    const [totalStock, setTotalStock] = useState(0);
    const [totalVentas, setTotalVentas] = useState(0);
    const [serviciosPendientes, setServiciosPendientes] = useState(0);
    const [ventasRecientes, setVentasRecientes] = useState<any[]>([]);
    const [stockBajo, setStockBajo] = useState<any[]>([]);
    const [topClientes, setTopClientes] = useState<any[]>([]);
    const [ventasPorEmpleado, setVentasPorEmpleado] = useState<any[]>([]);
    const [valorInventario, setValorInventario] = useState(0);
    const [verStockTodos, setVerStockTodos] = useState(false);
    const [inventario, setInventario] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // 1. Total productos
            const { count: countProductos } = await supabase
                .from("Producto")
                .select("*", { count: "exact", head: true });

            setTotalProductos(countProductos || 0);

            // 2. Total Stock
            const { data: inventarioStock } = await supabase
                .from("Inventario")
                .select("Cantidad");

            setTotalStock(inventarioStock?.reduce((acc, i) => acc + Number(i.Cantidad), 0) || 0);

            // 3. Total Ventas ($)
            const { data: ventas } = await supabase
                .from("Venta")
                .select("TotalVenta");

            setTotalVentas(ventas?.reduce((acc, v) => acc + Number(v.TotalVenta), 0) || 0);

            // 4. Servicios pendientes
            const { count: countServicios } = await supabase
                .from("ServicioTecnico")
                .select("*", { count: "exact" })
                .eq("Estado", "Ingresado");

            setServiciosPendientes(countServicios || 0);

            // 5. Ventas recientes (últimas 5)
            const { data: ventas_r } = await supabase
                .from("Venta")
                .select("IdVenta, FechaVenta, TotalVenta")
                .order("FechaVenta", { ascending: false })
                .limit(5);

            setVentasRecientes(ventas_r || []);

            // 6. Stock bajo (< 5)
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

            // 7. Top Clientes
            const { data: ventasClientes } = await supabase
                .from("Venta")
                .select(`
        TotalVenta,
        IdCliente,
        Cliente (
            IdCliente,
            Nombre,
            Apellido,
            Email
        )
    `)
                .not("IdCliente", "is", null);

            const clientesMap: Record<number, { nombre: string; total: number }> = {};

            ventasClientes?.forEach((v: any) => {
                const id = v.IdCliente;
                const nombreCompleto = `${v.Cliente?.Nombre ?? "Cliente"} ${v.Cliente?.Apellido ?? ""}`.trim();

                if (!clientesMap[id]) {
                    clientesMap[id] = {
                        nombre: nombreCompleto,
                        total: 0,
                    };
                }

                clientesMap[id].total += Number(v.TotalVenta);
            });

            const top3 = Object.values(clientesMap)
                .sort((a, b) => b.total - a.total)
                .slice(0, 3);

            setTopClientes(top3);

            // 8. Ventas por Empleado
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
                const key = `${v.Empleado?.Nombre ?? "Desconocido"} ${v.Empleado?.Apellidos ?? ""}`.trim();
                empleadoSum[key] = (empleadoSum[key] || 0) + Number(v.TotalVenta);
            });

            const empleadosOrdenados = Object.entries(empleadoSum)
                .map(([empleado, total]) => ({ empleado, total }))
                .sort((a, b) => b.total - a.total);

            setVentasPorEmpleado(empleadosOrdenados);

            // 9. Valor Inventario
            const { data: inventarioCompleto } = await supabase
                .from("Inventario")
                .select(`
                    Cantidad,
                    Producto (
                        PrecioCosto,
                        Nombre,
                        Marca
                    )
                `);

            const totalValor = inventarioCompleto?.reduce((acc: number, item: any) => {
                const prod = Array.isArray(item.Producto) ? item.Producto[0] : item.Producto;
                const precio = Number(prod?.PrecioCosto || 0);
                const cantidad = Number(item.Cantidad || 0);
                return acc + cantidad * precio;
            }, 0) || 0;

            setValorInventario(totalValor);
            setInventario(inventarioCompleto || []);

            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium">Cargando métricas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 font-sans text-slate-900">

            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={() => window.history.back()}
                            className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition shadow-sm group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard General</h1>
                            <p className="text-slate-500">Resumen administrativo y métricas clave.</p>
                        </div>
                    </div>
                </div>

                {/* KPIs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    <AdminCard
                        title="Productos"
                        value={totalProductos}
                        icon={Package}
                        color="blue"
                    />
                    <AdminCard
                        title="Stock Total"
                        value={totalStock}
                        icon={Boxes}
                        color="green"
                        subtext="Click ver inventario"
                        onClick={() => setVerStockTodos(true)}
                    />
                    <AdminCard
                        title="Ingresos"
                        value={`$${totalVentas.toLocaleString()}`}
                        icon={DollarSign}
                        color="yellow"
                    />
                    <AdminCard
                        title="Servicios"
                        value={serviciosPendientes}
                        icon={Wrench}
                        color="red"
                        subtext="Pendientes"
                    />
                    <AdminCard
                        title="Valor Inventario"
                        value={`$${valorInventario.toLocaleString()}`}
                        icon={BarChart2}
                        color="purple"
                    />
                    <AdminCard
                        title="Top Clientes"
                        value={topClientes.length}
                        icon={Users}
                        color="pink"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

                    {/* Left Column (2/3) */}
                    <div className="xl:col-span-2 space-y-8">

                        {/* Ventas Recientes */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-blue-600" />
                                    Ventas Recientes
                                </h3>
                                <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">En tiempo real</span>
                            </div>
                            <div className="p-0">
                                {ventasRecientes.length === 0 ? (
                                    <p className="p-6 text-slate-500 text-center">No hay ventas registradas aún.</p>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-xs uppercase text-slate-400 bg-slate-50 border-b border-slate-100">
                                                <th className="px-6 py-4 font-semibold">ID Venta</th>
                                                <th className="px-6 py-4 font-semibold">Fecha</th>
                                                <th className="px-6 py-4 font-semibold text-right">Monto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ventasRecientes.map((v) => (
                                                <tr key={v.IdVenta} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-slate-700">#{v.IdVenta}</td>
                                                    <td className="px-6 py-4 text-slate-500 text-sm">
                                                        {new Date(v.FechaVenta).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-bold text-slate-800">
                                                        ${Number(v.TotalVenta).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (1/3) */}
                    <div className="space-y-8">

                        {/* Top Clientes Widget */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                                <Users size={20} className="text-pink-500" />
                                Top Clientes
                            </h3>
                            <div className="space-y-6">
                                {topClientes.map((c, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md
                                            ${idx === 0 ? 'bg-amber-400 shadow-amber-200' : idx === 1 ? 'bg-slate-300' : 'bg-orange-300'}
                                        `}>
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-800 leading-tight">{c.nombre}</p>
                                            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                                <div
                                                    className="bg-pink-500 h-full rounded-full"
                                                    style={{ width: `${(c.total / (topClientes[0]?.total || 1)) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="font-bold text-slate-700 text-sm">${c.total.toLocaleString()}</span>
                                    </div>
                                ))}
                                {topClientes.length === 0 && <p className="text-slate-400 text-center text-sm">Sin datos de clientes.</p>}
                            </div>
                        </div>

                        {/* Ventas por Empleado Widget */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                                <Users size={20} className="text-purple-500" />
                                Rendimiento Equipo
                            </h3>
                            <div className="flex flex-col gap-3">
                                {ventasPorEmpleado.map((e, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-colors cursor-default">
                                        <span className="text-sm font-medium text-slate-700">{e.empleado}</span>
                                        <span className="text-sm font-bold text-purple-700">${e.total.toLocaleString()}</span>
                                    </div>
                                ))}
                                {ventasPorEmpleado.length === 0 && <p className="text-slate-400 text-sm">Sin datos aún.</p>}
                            </div>
                        </div>

                        {/* Alerta Stock Bajo */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-10 -mt-10 z-0 opacity-50"></div>
                            <h3 className="font-bold text-lg text-red-600 mb-4 flex items-center gap-2 relative z-10">
                                <AlertTriangle size={20} />
                                Stock Crítico
                            </h3>
                            <div className="space-y-3 relative z-10">
                                {stockBajo.length === 0 ? (
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <p className="text-green-700 text-sm font-medium">Todo el inventario OK</p>
                                    </div>
                                ) : (
                                    stockBajo.map((item: any, i: number) => {
                                        const prod = Array.isArray(item.Producto) ? item.Producto[0] : item.Producto;
                                        return (
                                            <div key={i} className="flex justify-between items-center p-3 bg-red-50/50 rounded-xl border border-red-100">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-red-800">
                                                        {prod?.Nombre ?? "Desc."}
                                                    </span>
                                                    <span className="text-[10px] text-red-500 uppercase">{prod?.Marca}</span>
                                                </div>
                                                <span className="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold shadow-sm border border-red-100">
                                                    {Number(item.Cantidad)} u.
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Modals */}
                <InventoryModal
                    isOpen={verStockTodos}
                    onClose={() => setVerStockTodos(false)}
                    inventario={inventario}
                />

            </div>
        </div>
    );
}
