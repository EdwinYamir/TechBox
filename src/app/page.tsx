"use client";

import { Laptop, Wrench, BarChart3, ArrowRight, Zap, Menu, X, LogIn, LogOut } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuthModal from "@/components/AuthModal";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check active session
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-text-1",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
      )
        .fromTo(".hero-subtext",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(".hero-btn",
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

      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        clearProps: "transform,opacity"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden relative">

      {/* Background Decor - Fixed z-index and overflow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-400/10 rounded-full blur-[80px] md:blur-[100px] floating-shape"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-400/10 rounded-full blur-[80px] md:blur-[100px] floating-shape" style={{ animationDelay: '-2s' }}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300">
              <Zap size={20} fill="currentColor" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Tech<span className="text-blue-600">Box</span></h1>
          </div>

          {/* Desktop Nav */}
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

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700">Hola, {user.email?.split('@')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                >
                  <LogOut size={18} />
                  <span className="hidden lg:inline">Salir</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <LogIn size={18} />
                <span className="hidden lg:inline">Ingresar</span>
              </button>
            )}

            <Link
              href="/admin/dashboard"
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Admin Dashboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú principal"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 p-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="p-3 bg-slate-50 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/productos"
                className="p-3 bg-slate-50 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Catálogo
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="p-3 bg-slate-50 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors text-left flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Cerrar Sesión
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="p-3 bg-slate-50 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors text-left flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Ingresar / Registrarse
                </button>
              )}
              <Link
                href="/admin/dashboard"
                className="p-3 bg-slate-900 rounded-xl text-white font-medium text-center shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-transform"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ir al Dashboard
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto relative z-10 w-full">

        {/* Hero Section */}
        <section ref={heroRef} className="flex flex-col items-center text-center py-12 md:py-32">

          <div className="hero-text-1 inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs md:text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Nueva Colección 2025
          </div>

          <h1 className="hero-text-1 text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.15] mb-6 md:mb-8 max-w-4xl tracking-tight">
            Tecnología que impulsa <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">tu productividad.</span>
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
                Ver Catálogo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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

        {/* Features Pillars */}
        <section id="mision" ref={featuresRef} className="py-16 md:py-20 border-t border-slate-100/60">
          <div className="text-center mb-10 md:mb-16 px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">¿Por qué elegir TechBox?</h3>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">La plataforma integral diseñada para potenciar tus necesidades tecnológicas con eficiencia y estilo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2">
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
      <footer className="bg-white border-t border-slate-100 py-8 md:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <Zap size={20} className="text-blue-600" fill="currentColor" />
            <span className="font-bold text-slate-900">TechBox</span>
          </div>
          <p className="text-slate-400 text-sm text-center md:text-left">
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
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

// Subcomponente para las Features
const FeatureCard = ({ icon: Icon, color, title, description }: any) => {
  const colorStyles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    green: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
  };

  return (
    <div className="feature-card group p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 cursor-default">
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-5 md:mb-6 transition-colors duration-300 ${colorStyles[color]}`}>
        <Icon size={24} className="md:w-7 md:h-7" />
      </div>
      <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{title}</h4>
      <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};
