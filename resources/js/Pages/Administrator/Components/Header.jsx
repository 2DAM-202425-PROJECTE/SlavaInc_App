"use client"

import { router } from "@inertiajs/react"
import { Building, Users, Briefcase, Home, Package } from "lucide-react"

const AdminHeader = ({ theme = "bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" }) => {
    return (
        <section className={`w-full ${theme} py-12 px-6`}>
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Panell d'Administració</h1>
                <p className="text-xl text-white/90 mb-8">Vista general del sistema i accés ràpid a la gestió de dades</p>

                {/* Navegació ràpida */}
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => router.visit("/admin/")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Home size={18} />
                        <span>Estadístiques</span>
                    </button>
                    <button
                        onClick={() => router.visit("/admin/users")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Users size={18} />
                        <span>Usuaris</span>
                    </button>
                    <button
                        onClick={() => router.visit("/admin/admins")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Users size={18} />
                        <span>Administradors</span>
                    </button>
                    <button
                        onClick={() => router.visit("/admin/companies")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Building size={18} />
                        <span>Companyies</span>
                    </button>
                    <button
                        onClick={() => router.visit("/admin/plans")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Building size={18} />
                        <span>Plans</span>
                    </button>
                    <button
                        onClick={() => router.visit("/admin/workers")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Users size={18} />
                        <span>Treballadors</span>
                    </button>
                    <button
                        onClick={() => router.visit("/admin/services")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Briefcase size={18} />
                        <span>Serveis</span>
                    </button>
                    <button
                        onClick={() => router.visit("/admin/company-services")}
                        className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Package size={18} />
                        <span>Serveis d'Empreses</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default AdminHeader
