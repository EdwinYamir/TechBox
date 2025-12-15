"use client";

import { LucideIcon } from "lucide-react";

interface AdminCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    onClick?: () => void;
    subtext?: string;
}

const AdminCard = ({ title, value, icon: Icon, color, onClick, subtext }: AdminCardProps) => {
    // Definir temas de color con Tailwind
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 ring-blue-100",
        green: "bg-emerald-50 text-emerald-600 ring-emerald-100",
        yellow: "bg-amber-50 text-amber-600 ring-amber-100",
        red: "bg-rose-50 text-rose-600 ring-rose-100",
        purple: "bg-violet-50 text-violet-600 ring-violet-100",
        pink: "bg-pink-50 text-pink-600 ring-pink-100",
    };

    const theme = colorClasses[color] || colorClasses.blue;

    return (
        <div
            onClick={onClick}
            className={`
                relative bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] 
                hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] transition-all duration-300 group
                ${onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''}
            `}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
                    {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
                </div>
                <div className={`p-3 rounded-xl ${theme} ring-1 group-hover:ring-2 transition-all`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
};

export default AdminCard;
