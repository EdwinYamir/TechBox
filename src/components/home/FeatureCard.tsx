import { Laptop, BarChart3, Wrench } from "lucide-react";

interface Props {
    icon: string;
    color: string;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, color, title, description }: Props) {
    const colorStyles: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        green: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
        amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    };

    const Icon = icon === "Laptop" ? Laptop : icon === "BarChart3" ? BarChart3 : Wrench;

    return (
        <div className="feature-card group p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 cursor-default">
            <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-5 md:mb-6 transition-colors duration-300 ${colorStyles[color]}`}
            >
                <Icon size={24} className="md:w-7 md:h-7" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{title}</h4>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">{description}</p>
        </div>
    );
}
