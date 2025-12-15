import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 py-8 md:py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                <div className="flex items-center gap-2 group">
                    <Image
                        src="/logo-techbox.png"
                        alt="TechBox Logo"
                        width={120}
                        height={50}
                        className="w-auto h-10 object-contain transform group-hover:rotate-12 transition-transform duration-300"
                    />
                    <span className="font-bold text-slate-900">TechBox</span>
                </div>

                <p className="text-slate-400 text-sm text-center md:text-left">
                    © {new Date().getFullYear()} TechBox Inc. Todos los derechos reservados.
                </p>

                <div className="flex gap-6">
                    {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                        <a
                            key={social}
                            href="#"
                            className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium"
                        >
                            {social}
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    );
}
