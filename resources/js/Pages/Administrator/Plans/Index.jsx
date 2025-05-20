"use client"

import React from "react"

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import {
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    X,
    AlertCircle,
    Package,
    CheckCircle,
    Users,
    Briefcase,
    BarChart,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import Pagination from "@/Pages/Administrator/Components/Pagination.jsx";

const PlansIndex = ({ plans }) => {
    const [showDialog, setShowDialog] = useState(false)
    const [selectedPlanId, setSelectedPlanId] = useState(null)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPlans, setFilteredPlans] = useState(plans)

    // Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [paginatedPlans, setPaginatedPlans] = useState([])

    // Apply search filter
    useEffect(() => {
        if (searchTerm) {
            const results = plans.filter(
                (plan) =>
                    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) || plan.price.toString().includes(searchTerm),
            )
            setFilteredPlans(results)
        } else {
            setFilteredPlans(plans)
        }
        setCurrentPage(1) // Reset to first page when filtering
    }, [searchTerm, plans])

    // Apply pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedPlans(filteredPlans.slice(startIndex, endIndex))
    }, [filteredPlans, currentPage, itemsPerPage])

    const handleDelete = (plan) => {
        setSelectedPlanId(plan.id)
        setSelectedPlan(plan)
        setShowDialog(true)
    }

    const confirmDelete = () => {
        if (selectedPlanId) {
            router.delete(`/admin/plans/${selectedPlanId}`)
        }
        setShowDialog(false)
    }

    const cancelDelete = () => {
        setShowDialog(false)
        setSelectedPlan(null)
    }

    // Pagination handlers
    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1)
    }

    const totalPages = Math.ceil(filteredPlans.length / itemsPerPage)

    // Format price to show with 2 decimals and € symbol
    const formatPrice = (price) => {
        return new Intl.NumberFormat("ca-ES", { style: "currency", currency: "EUR" }).format(price)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header amb títol i botó de crear */}
                    <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Gestió de Plans</h1>
                            <p className="text-gray-500 mt-1">Administra els plans disponibles per a les empreses</p>
                        </div>
                        <button
                            onClick={() => router.visit("/admin/plans/create")}
                            className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span>Nou Pla</span>
                        </button>
                    </div>

                    {/* Cercador */}
                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cercar per nom o preu..."
                                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <X size={16} className="text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>

                        {/* Comptador de resultats */}
                        <div className="mt-4 text-sm text-gray-600">
                            {filteredPlans.length} {filteredPlans.length === 1 ? "pla trobat" : "plans trobats"}
                        </div>
                    </div>

                    {/* Llista de plans */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {paginatedPlans.length > 0 ? (
                            paginatedPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
                                >
                                    <div className="p-5 flex-grow">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                    <Package size={20} />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{plan.name}</h3>
                                            </div>
                                            <span className="text-lg font-bold text-blue-600">{formatPrice(plan.price)}</span>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Users size={16} className="text-gray-400" />
                                                <span>
                          {plan.max_workers ? `Fins a ${plan.max_workers} treballadors` : "Treballadors il·limitats"}
                        </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Briefcase size={16} className="text-gray-400" />
                                                <span>{plan.max_services ? `Fins a ${plan.max_services} serveis` : "Serveis il·limitats"}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <BarChart size={16} className="text-gray-400" />
                                                <span>
                          Estadístiques:{" "}
                                                    {plan.can_view_stats ? (
                                                        <span className="text-green-600 font-medium">Incloses</span>
                                                    ) : (
                                                        <span className="text-red-600 font-medium">No incloses</span>
                                                    )}
                        </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <BarChart size={16} className="text-gray-400" />
                                                <span>
                          Estadístiques avançades:{" "}
                                                    {plan.extra_stats ? (
                                                        <span className="text-green-600 font-medium">Incloses</span>
                                                    ) : (
                                                        <span className="text-red-600 font-medium">No incloses</span>
                                                    )}
                        </span>
                                            </div>
                                        </div>

                                        {plan.features && plan.features.length > 0 && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">Característiques:</h4>
                                                <ul className="space-y-1">
                                                    {plan.features.map((feature, index) => (
                                                        <li key={index} className="flex items-start gap-2 text-sm">
                                                            <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-gray-600">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t border-gray-200 p-3 bg-gray-50 flex justify-between">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => router.visit(`/admin/plans/${plan.id}`)}
                                                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors text-xs"
                                            >
                                                <Eye size={14} />
                                                <span>Veure</span>
                                            </button>
                                            <button
                                                onClick={() => router.visit(`/admin/plans/${plan.id}/edit`)}
                                                className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-md transition-colors text-xs"
                                            >
                                                <Edit size={14} />
                                                <span>Editar</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(plan)}
                                            className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded-md transition-colors text-xs"
                                        >
                                            <Trash2 size={14} />
                                            <span>Eliminar</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 p-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <Search size={24} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No s'han trobat plans</h3>
                                <p className="text-gray-500">Prova amb uns altres termes de cerca o crea un nou pla.</p>
                            </div>
                        )}
                    </div>

                    {/* Paginación */}
                    {filteredPlans.length > 0 && (
                        <div className="px-6 border-t border-gray-200">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredPlans.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredPlans.length}
                                onItemsPerPageChange={handleItemsPerPageChange}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de confirmació d'eliminació */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <AlertCircle size={24} />
                            <h2 className="text-xl font-bold">Eliminar Pla</h2>
                        </div>

                        {selectedPlan && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                                <p className="font-medium text-gray-900">{selectedPlan.name}</p>
                                <p className="text-gray-600 text-sm">{formatPrice(selectedPlan.price)}</p>
                            </div>
                        )}

                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols eliminar aquest pla? Aquesta acció no es pot desfer i s'eliminaran totes les dades
                            associades.
                            <br />
                            <br />
                            <strong className="text-red-600">Nota:</strong> No es poden eliminar plans que estiguin assignats a
                            empreses.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg font-medium transition-colors"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default PlansIndex
