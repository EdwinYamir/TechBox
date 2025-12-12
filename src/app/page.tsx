"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Laptop, Wrench, BarChart3, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-text-1", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1
      })
        .from(".hero-subtext", {
          y: 30,
          opacity: 0,
          duration: 0.8
        }, "-=0.6")
        .from(".hero-btn", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2
        }, "-=0.4");

      // Floating Animation for background elements
      gsap.to(".floating-shape", {
        y: -30,
        rotation: 10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Features Scroll Trigger (Simple staggered entrance)
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] floating-shape"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[100px] floating-shape" style={{ animationDelay: '-2s' }}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300">
              <Zap size={20} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tech<span className="text-blue-600">Box</span></h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Inicio', 'Catálogo'].map((item) => (
              <Link
                key={item}
                href={item === 'Inicio' ? '/' : '/productos'}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/admin/dashboard"
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10 w-full">

        {/* Hero Section */}
        <section ref={heroRef} className="flex flex-col items-center text-center py-20 md:py-32">
          <div className="hero-text-1 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold tracking-wide uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Nueva Colección 2025
          </div>

          <h1 className="hero-text-1 text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 max-w-4xl tracking-tight">
            Tecnología que impulsa <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">tu productividad.</span>
          </h1>

          <p className="hero-subtext text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
            Descubre nuestra selección premium de laptops, componentes y accesorios.
            Calidad garantizada y soporte técnico especializado al alcance de un click.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/productos"
              className="hero-btn group relative px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold overflow-hidden transition-all hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.5)] hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver Catálogo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="#mision"
              className="hero-btn px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all hover:-translate-y-1"
            >
              Conocer más
            </Link>
          </div>
        </section>

        {/* Features Pillars */}
        <section id="mision" ref={featuresRef} className="py-20 border-t border-slate-100">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">¿Por qué elegir TechBox?</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">La plataforma integral diseñada para potenciar tus necesidades tecnológicas con eficiencia y estilo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Laptop}
              color="blue"
              title="Catálogo Premium"
              description="Acceso directo a productos de última generación cargados dinámicamente desde nuestra base de datos."
            />
            <FeatureCard
              icon={BarChart3}
              color="green"
              title="Control Total"
              description="Sistema de inventario inteligente que monitorea el stock en tiempo real para evitar quiebres."
            />
            <FeatureCard
              icon={Wrench}
              color="amber"
              title="Soporte Experto"
              description="Gestión integral de garantías y servicio técnico para asegurar la vida útil de tus equipos."
            />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <Zap size={20} className="text-blue-600" fill="currentColor" />
            <span className="font-bold text-slate-900">TechBox</span>
          </div>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} TechBox Inc. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
              <a key={social} href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// Subcomponente para las Features (mejora la legibilidad)
const FeatureCard = ({ icon: Icon, color, title, description }: any) => {
  const colorStyles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    green: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
  };

  return (
    <div className="feature-card group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 cursor-default">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${colorStyles[color]}`}>
        <Icon size={28} />
      </div>
      <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-500 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};
