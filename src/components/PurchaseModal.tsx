"use client";

import React, { useEffect, useState } from "react";
import { X, ShoppingBag, CheckCircle, AlertCircle } from "lucide-react";

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any;
    onBuy: (product: any) => Promise<void>;
}

export default function PurchaseModal({ isOpen, onClose, product, onBuy }: PurchaseModalProps) {
    const [isBuying, setIsBuying] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSuccess(false);
            setIsBuying(false);
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const stock = Array.isArray(product.Inventario)
        ? product.Inventario[0]?.Cantidad
        : product.Inventario?.Cantidad;

    const handleBuyClick = async () => {
        setIsBuying(true);
        try {
            await onBuy(product);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Purchase failed", error);
        } finally {
            setIsBuying(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div
                className="
                    bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden
                    transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95
                    border border-gray-100
                "
            >
                {/* Header Decoration */}
                <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 absolute top-0 w-full mb-10"></div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="pt-16 px-8 pb-8 flex flex-col items-center text-center relative z-10">
                    <div className="bg-white p-3 rounded-2xl shadow-lg mb-4 -mt-12">
                        <span className="text-4xl">💻</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{product.Nombre}</h2>
                    <p className="text-gray-500 text-sm mb-6">{product.Marca} • {product.Modelo}</p>

                    <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 flex justify-between items-center">
                        <div className="text-left">
                            <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Precio</p>
                            <p className="text-2xl font-bold text-gray-900">${product.PrecioVenta}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Disponibles</p>
                            <p className={`text-lg font-bold ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {stock}
                            </p>
                        </div>
                    </div>

                    {success ? (
                        <div className="w-full bg-green-50 text-green-700 py-3 rounded-xl flex items-center justify-center gap-2 font-medium animate-pulse">
                            <CheckCircle size={20} />
                            ¡Compra realizada con éxito!
                        </div>
                    ) : (stock > 0 ? (
                        <button
                            onClick={handleBuyClick}
                            disabled={isBuying}
                            className={`
                                w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30
                                flex items-center justify-center gap-2 transition-all active:scale-95
                                ${isBuying
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/50 hover:-translate-y-0.5'
                                }
                            `}
                        >
                            {isBuying ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                                    Procesando...
                                </span>
                            ) : (
                                <>
                                    <ShoppingBag size={20} />
                                    Comprar Ahora
                                </>
                            )}
                        </button>
                    ) : (
                        <div className="w-full bg-red-50 text-red-700 py-3 rounded-xl flex items-center justify-center gap-2 font-medium">
                            <AlertCircle size={20} />
                            Producto Agotado
                        </div>
                    ))}

                    <p className="mt-4 text-xs text-gray-400 mx-auto max-w-[80%]">
                        Al hacer clic en "Comprar Ahora", el stock se actualizará automáticamente en nuestra base de datos.
                    </p>
                </div>
            </div>
        </div>
    );
}
