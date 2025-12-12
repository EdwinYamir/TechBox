"use client";

import React from "react";
import { Tag, Layers, ShoppingCart, AlertCircle, CheckCircle2, Package } from "lucide-react";

interface ProductCardProps {
    nombre: string;
    marca: string;
    modelo: string;
    categoria: string;
    precio: number;
    stock: number;
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    nombre,
    marca,
    modelo,
    categoria,
    precio,
    stock,
    onClick,
}) => {
    const isOutOfStock = stock === 0;
    const isLowStock = stock > 0 && stock < 5;

    return (
        <article
            onClick={onClick}
            className="
                group relative bg-white rounded-2xl overflow-hidden
                border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]
                transition-all duration-300 ease-out
                hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-blue-100
                cursor-pointer flex flex-col h-full
            "
        >
            {/* Top Hover Gradient Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="p-6 flex flex-col h-full relative">

                {/* Header: Brand & Category badges */}
                <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 border border-slate-100 group-hover:border-blue-100 transition-colors">
                        <Tag size={10} />
                        {marca}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        {categoria}
                    </span>
                </div>

                {/* Main Content */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {nombre}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium flex items-center gap-2">
                        <Layers size={14} />
                        {modelo}
                    </p>
                </div>

                {/* Footer Section (Price & Stock) */}
                <div className="mt-auto space-y-5">

                    {/* Price Row */}
                    <div className="flex items-end justify-between border-t border-slate-50 pt-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">Precio</span>
                            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                ${precio.toFixed(2)}
                            </span>
                        </div>

                        {/* Add to Cart / View Button (Visual) */}
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                            <ShoppingCart size={18} />
                        </div>
                    </div>

                    {/* Stock Status Bar */}
                    <div className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold
                        ${isOutOfStock
                            ? "bg-red-50 border-red-100 text-red-600"
                            : isLowStock
                                ? "bg-amber-50 border-amber-100 text-amber-600"
                                : "bg-emerald-50 border-emerald-100 text-emerald-600"
                        }
                    `}>
                        {isOutOfStock ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                        <span className="flex-1">
                            {isOutOfStock ? "Producto Agotado" : `${stock} unidades disponibles`}
                        </span>
                        {!isOutOfStock && <Package size={14} className="opacity-50" />}
                    </div>

                </div>
            </div>
        </article>
    );
};

export default ProductCard;
