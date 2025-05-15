"use client"
import { router } from "@inertiajs/react"

const Header = () => {
    return (
        <section className="w-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] py-12 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Panell d'Administració</h1>
                <p className="text-xl text-white/90 mb-8">Vista general del sistema i accés ràpid a la gestió de dades</p>

                {/* Navegació ràpida */}
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => router.visit("/administrator/")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Estadístiques
                    </button>
                    <button
                        onClick={() => router.visit("/administrator/users")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Usuaris
                    </button>
                    <button
                        onClick={() => router.visit("/administrator/workers")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Treballadors
                    </button>
                    <button
                        onClick={() => router.visit("/administrator/services")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Serveis
                    </button>
                    <button
                        onClick={() => router.visit("/administrator/companies")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Companyies
                    </button>
                </div>
            </div>
        </section>
    )
}
export default Header
