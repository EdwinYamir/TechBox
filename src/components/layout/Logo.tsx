import { Zap } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300">
                <Zap size={20} fill="currentColor" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                Tech<span className="text-blue-600">Box</span>
            </h1>
        </div>
    );
}
