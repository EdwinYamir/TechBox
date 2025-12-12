"use client";
import Link from "next/link";
import { FaLaptop, FaTools, FaChartBar } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-start py-12 px-8 sm:py-20 sm:px-16 bg-white">

        {/* Header */}
        <header className="w-full flex justify-between items-center pb-12 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-blue-600">TechBox </h1>

          <nav className="flex space-x-6">
            <Link href="/" className="font-semibold text-gray-900 hover:text-blue-600">
              Inicio
            </Link>
            <Link href="/productos" className="font-semibold text-gray-900 hover:text-blue-600">
              Catálogo
            </Link>
            <Link
              href="/admin/dashboard"
              className="font-semibold px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Admin
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="flex flex-col items-center text-center pt-20 pb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Tecnología y Servicio al Instante
          </h2>
          <p className="max-w-3xl mt-4 text-xl text-gray-600">
            TechBox es tu fuente confiable para Laptops, Componentes y Accesorios.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/productos"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              <FaLaptop /> Ver Catálogo
            </Link>
            <Link
              href="#mision"
              className="flex h-12 items-center justify-center rounded-full border border-gray-300 px-6 text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Conoce Nuestra Misión
            </Link>
          </div>
        </section>

        {/* Pilares */}
        <section id="mision" className="w-full pt-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Nuestros Pilares</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

            {/* Pilar 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
              <FaLaptop className="text-5xl text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Catálogo</h4>
              <p className="text-gray-600">
                Los productos se cargan directamente desde la tabla "Producto" en Supabase.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
              <FaChartBar className="text-5xl text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Control de Stock</h4>
              <p className="text-gray-600">
                Verificación del inventario en tiempo real con lógica de negocio aplicada.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
              <FaTools className="text-5xl text-yellow-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Soporte y Servicio</h4>
              <p className="text-gray-600">
                Gestión de clientes y servicios técnicos desde Supabase.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full text-center mt-20 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-500">
            TechBox - Todos los derechos reservados.
          </p>
        </footer>

      </main>
    </div>
  );
}
