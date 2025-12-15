"use client";

import { Boxes, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface InventoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    inventario: any[];
}

export default function InventoryModal({ isOpen, onClose, inventario }: InventoryModalProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredInventario, setFilteredInventario] = useState(inventario);

    useEffect(() => {
        setFilteredInventario(inventario);
    }, [inventario]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (!term) {
            setFilteredInventario(inventario);
            return;
        }

        const filtered = inventario.filter(item => {
            const prod = Array.isArray(item.Producto) ? item.Producto[0] : item.Producto;
            const nombre = prod?.Nombre?.toLowerCase() || "";
            const marca = prod?.Marca?.toLowerCase() || "";
            return nombre.includes(term) || marca.includes(term);
        });
        setFilteredInventario(filtered);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            <Boxes size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Inventario Detallado</h3>
                            <p className="text-slate-500 text-sm">Vista completa del stock disponible.</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Sub-header & Filter */}
                <div className="p-4 border-b border-slate-100 bg-white flex items-center gap-4">
                    <div className="relative w-full max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o marca..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                        />
                    </div>
                    <div className="text-sm text-slate-500 ml-auto">
                        Total: <span className="font-bold text-slate-800">{filteredInventario.length}</span> items
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-y-auto flex-1 p-0">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-slate-50 z-10 shadow-sm">
                            <tr className="text-xs uppercase text-slate-500 font-bold tracking-wider">
                                <th className="px-6 py-4 border-b border-slate-200">Producto</th>
                                <th className="px-6 py-4 border-b border-slate-200">Marca</th>
                                <th className="px-6 py-4 border-b border-slate-200 text-right">Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredInventario.length > 0 ? (
                                filteredInventario.map((item, i) => {
                                    const prod = Array.isArray(item.Producto) ? item.Producto[0] : item.Producto;
                                    return (
                                        <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                                                {prod?.Nombre ?? "Sin nombre"}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">
                                                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-600">
                                                    {prod?.Marca ?? "-"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`
                                                    inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border
                                                    ${item.Cantidad < 5
                                                        ? 'bg-red-50 text-red-600 border-red-100'
                                                        : 'bg-emerald-50 text-emerald-600 border-emerald-100'}
                                                `}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${item.Cantidad < 5 ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                                                    {item.Cantidad} u.
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                                        No se encontraron productos que coincidan con la búsqueda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-slate-800 transition shadow-sm"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
