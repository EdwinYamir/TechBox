import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex items-center gap-2 cursor-pointer group">
            <Image
                src="/logo-techbox.png"
                alt="TechBox Logo"
                width={120}
                height={60}
                className="w-auto h-12 object-contain transform group-hover:rotate-12 transition-transform duration-300"
                priority
            />
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                Tech<span className="text-blue-600">Box</span>
            </h1>
        </div>
    );
}
