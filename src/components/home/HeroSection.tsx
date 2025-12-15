"use client";

import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                ".hero-text-1",
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
            )
                .fromTo(
                    ".hero-subtext",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(
                    ".hero-btn",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, clearProps: "all" },
                    "-=0.4"
                );

            gsap.to(".floating-shape", {
                y: -30,
                rotation: 10,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative">

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-400/10 rounded-full blur-[80px] md:blur-[100px] floating-shape"></div>
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-400/10 rounded-full blur-[80px] md:blur-[100px] floating-shape"
                    style={{ animationDelay: "-2s" }}
                ></div>
            </div>

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="flex flex-col items-center text-center py-12 md:py-32 relative z-10"
            >
                <div className="hero-text-1 inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs md:text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Nueva Colección 2025
                </div>

                <h1 className="hero-text-1 text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.15] mb-6 md:mb-8 max-w-4xl tracking-tight">
                    Tecnología que impulsa <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                        tu productividad.
                    </span>
                </h1>

                <p className="hero-subtext text-base md:text-xl text-slate-500 max-w-2xl mb-8 md:mb-10 leading-relaxed px-2">
                    Descubre nuestra selección premium de laptops, componentes y accesorios.
                    Calidad garantizada y soporte técnico especializado al alcance de un click.
                </p>

                <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 md:gap-4 px-2">
                    <Link
                        href="/productos"
                        className="hero-btn group relative px-6 py-3.5 md:px-8 md:py-4 bg-blue-600 text-white rounded-xl md:rounded-2xl font-bold overflow-hidden transition-all hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.5)] active:scale-[0.98] text-center"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Ver Catálogo
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>

                    <Link
                        href="#mision"
                        className="hero-btn px-6 py-3.5 md:px-8 md:py-4 bg-white text-slate-700 border border-slate-200 rounded-xl md:rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] text-center"
                    >
                        Conocer más
                    </Link>
                </div>
            </section>
        </div>
    );
}
