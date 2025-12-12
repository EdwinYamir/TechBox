"use client";

import React, { useEffect, useState } from "react";
import { X, ShoppingBag, CheckCircle2, AlertCircle, Plus, Minus, Package, CreditCard } from "lucide-react";

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any;
    onBuy: (product: any, quantity: number) => Promise<void>;
}

export default function PurchaseModal({ isOpen, onClose, product, onBuy }: PurchaseModalProps) {
    const [isBuying, setIsBuying] = useState(false);
    const [success, setSuccess] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (isOpen) {
            setSuccess(false);
            setIsBuying(false);
            setQuantity(1);
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const stock = Array.isArray(product.Inventario)
        ? product.Inventario[0]?.Cantidad
        : product.Inventario?.Cantidad;

    const handleBuyClick = async () => {
        setIsBuying(true);
        try {
            await onBuy(product, quantity);
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

    const isOutOfStock = stock <= 0;
    const isLowStock = stock > 0 && stock < 5;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-all duration-300">
            <div
                className="
                    bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden
                    transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95
                    border border-slate-100 ring-4 ring-slate-50
                "
            >
                {/* Header Decoration with Mesh Gradient */}
                <div className="h-32 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 absolute top-0 w-full">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"></div>
                </div>

                <button
                    onClick={onClose}
                    type="button"
                    className="absolute top-4 right-4 z-20 text-white/90 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors backdrop-blur-sm"
                    aria-label="Cerrar modal"
                >
                    <X size={22} />
                </button>

                <div className="pt-20 px-8 pb-8 flex flex-col items-center relative z-10">

                    {/* Icon Circle */}
                    <div className="bg-white p-4 rounded-3xl shadow-xl shadow-blue-900/5 mb-6 ring-4 ring-white">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <Package size={32} />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center mb-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">
                            {product.Marca}
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                            {product.Nombre}
                        </h2>
                        <p className="text-slate-400 text-sm font-medium">Modelo: {product.Modelo}</p>
                    </div>

                    {/* Price & Stock Stats */}
                    <div className="w-full bg-slate-50/80 rounded-2xl p-4 mb-6 border border-slate-100 flex justify-between items-center group hover:bg-slate-50 transition-colors">
                        <div className="text-left">
                            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Precio Unitario</p>
                            <p className="text-2xl font-black text-slate-800 tracking-tight">${Number(product.PrecioVenta).toFixed(2)}</p>
                        </div>
                        <div className="w-px h-10 bg-slate-200/60"></div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Stock</p>
                            <div className={`
                                inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-bold
                                ${isOutOfStock
                                    ? 'bg-red-100 text-red-600'
                                    : isLowStock
                                        ? 'bg-amber-100 text-amber-700'
                                        : 'bg-emerald-100 text-emerald-700'
                                }
                            `}>
                                {stock} u.
                            </div>
                        </div>
                    </div>

                    {!isOutOfStock && (
                        <div className="w-full space-y-6">
                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 font-semibold">Cantidad a comprar</span>
                                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        disabled={quantity <= 1 || isBuying}
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-12 text-center font-bold text-slate-900 text-lg tabular-nums">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                                        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        disabled={quantity >= stock || isBuying}
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Divider with Total */}
                            <div className="border-t border-slate-100 pt-4 flex justify-between items-end">
                                <span className="text-sm font-medium text-slate-500">Total estimado</span>
                                <span className="text-3xl font-black text-blue-600 tracking-tight">
                                    ${(product.PrecioVenta * quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="w-full mt-8">
                        {success ? (
                            <div className="w-full bg-emerald-50 text-emerald-600 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold border border-emerald-100 animate-in zoom-in duration-300">
                                <CheckCircle2 size={24} />
                                <div className="flex flex-col text-left leading-4">
                                    <span>¡Compra Exitosa!</span>
                                    <span className="text-xs font-medium text-emerald-500/80">Stock actualizado correctamente</span>
                                </div>
                            </div>
                        ) : (isOutOfStock ? (
                            <div className="w-full bg-red-50 text-red-600 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold border border-red-100">
                                <AlertCircle size={20} />
                                Producto Agotado
                            </div>
                        ) : (
                            <button
                                onClick={handleBuyClick}
                                disabled={isBuying}
                                className={`
                                    w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-blue-500/25
                                    flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]
                                    ${isBuying
                                        ? 'bg-slate-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-blue-500/40 hover:-translate-y-1'
                                    }
                                `}
                            >
                                {isBuying ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                        <span>Procesando...</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={20} />
                                        Confirmar Compra
                                    </>
                                )}
                            </button>
                        ))}
                    </div>

                    {!success && !isOutOfStock && (
                        <p className="mt-5 text-center text-xs text-slate-400 max-w-[90%]">
                            <span className="flex items-center justify-center gap-1.5 mb-1">
                                <CreditCard size={12} /> Pago seguro procesado al instante
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
