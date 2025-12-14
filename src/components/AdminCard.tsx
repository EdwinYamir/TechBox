import { ReactNode } from "react";

interface AdminCardProps {
    title: string;
    value: number | string;
    icon?: ReactNode;
    color?: string;
    onClick?: () => void;
}

export default function AdminCard({ title, value, icon, color = "blue", onClick }: AdminCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 border border-gray-100 hover:shadow-lg transition cursor-pointer"
        >
            <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
                {icon}
            </div>

            <div>
                <p className="text-gray-600 text-sm">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}

