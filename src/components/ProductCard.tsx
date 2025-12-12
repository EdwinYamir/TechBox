"use client";

import React from "react";

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
    return (
        <article
            onClick={onClick}
            className="
                bg-white rounded-xl p-6 border border-[#eef1f5] w-full flex flex-col gap-5
                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]
                relative overflow-hidden cursor-pointer
                hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]
                hover:border-[#bce3eb]
                group
            "
        >
            <div
                className="
                    absolute top-0 left-0 w-full h-1 opacity-0
                    bg-gradient-to-r from-[#4bb5c8] to-[#0a4c78]
                    transition-opacity duration-300 group-hover:opacity-100
                "
            ></div>

            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-gray-900">{nombre}</h3>
                <p className="text-[#4bb5c8] text-sm font-medium">
                    {marca} — {modelo}
                </p>
            </div>

            <hr className="border-t border-gray-100" />

            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                    <span className="text-lg bg-gray-50 w-9 h-9 flex items-center justify-center rounded-lg">📦</span>
                    <div>
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Categoría</span>
                        <p className="text-gray-600 text-sm font-medium">{categoria}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg bg-gray-50 w-9 h-9 flex items-center justify-center rounded-lg">💲</span>
                    <div>
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Precio</span>
                        <p className="text-gray-700 font-semibold text-lg">
                            ${precio.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg bg-gray-50 w-9 h-9 flex items-center justify-center rounded-lg">📊</span>
                    <div>
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Stock</span>
                        <p
                            className={`font-semibold px-3 py-0.5 rounded-full text-xs inline-block ${stock > 0
                                ? "text-green-700 bg-green-50"
                                : "text-red-700 bg-red-50"
                                }`}
                        >
                            {stock > 0 ? `${stock} unidades` : "Agotado"}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
