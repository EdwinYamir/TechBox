"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AuthModal from "@/components/auth/AuthModal";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden relative">
      <Header onOpenAuth={() => setIsAuthModalOpen(true)} />

      <main className="pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto relative z-10 w-full">
        <HeroSection />
        <FeaturesSection />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
