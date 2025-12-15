"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturesSection() {
    const featuresRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!featuresRef.current) return;

        gsap.from(".feature-card", {
            scrollTrigger: {
                trigger: featuresRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            clearProps: "transform,opacity",
        });
    }, []);

    return (
        <section id="mision" ref={featuresRef} className="py-16 md:py-20 border-t border-slate-100/60">
            <div className="text-center mb-10 md:mb-16 px-4">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">¿Por qué elegir TechBox?</h3>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
                    La plataforma integral diseñada para potenciar tus necesidades tecnológicas con eficiencia y estilo.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2">
                <FeatureCard
                    icon="Laptop"
                    color="blue"
                    title="Catálogo Premium"
                    description="Acceso directo a productos de última generación cargados dinámicamente desde nuestra base de datos."
                />
                <FeatureCard
                    icon="BarChart3"
                    color="green"
                    title="Control Total"
                    description="Sistema de inventario inteligente que monitorea el stock en tiempo real para evitar quiebres."
                />
                <FeatureCard
                    icon="Wrench"
                    color="amber"
                    title="Soporte Experto"
                    description="Gestión integral de garantías y servicio técnico para asegurar la vida útil de tus equipos."
                />
            </div>
        </section>
    );
}
