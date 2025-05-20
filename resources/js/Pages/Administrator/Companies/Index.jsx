"use client"

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import { Search, Plus, Eye, Edit, Trash2, X, Building, Mail, Phone, MapPin, AlertCircle } from "lucide-react"
import Pagination from "@/Pages/Administrator/Components/Pagination"

const CompaniesIndex = ({ companies }) => {
    const [showDialog, setShowDialog] = useState(false)
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredCompanies, setFilteredCompanies] = useState(companies)

    // Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [paginatedCompanies, setPaginatedCompanies] = useState([])

    // Apply filters whenever search term changes
    useEffect(() => {
        let results = companies

        // Filter by search term (name, email, city, etc.)
        if (searchTerm) {
            results = results.filter(
                (company) =>
                    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (company.email && company.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (company.city && company.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (company.state && company.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (company.phone && company.phone.toLowerCase().includes(searchTerm.toLowerCase())),
            )
        }

        setFilteredCompanies(results)
        // Resetear a la primera página cuando cambian los filtros
        setCurrentPage(1)
    }, [searchTerm, companies])

    // Aplicar paginación a las empresas filtradas
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedCompanies(filteredCompanies.slice(startIndex, endIndex))
    }, [filteredCompanies, currentPage, itemsPerPage])

    const handleDelete = (company) => {
        setSelectedCompanyId(company.id)
        setSelectedCompany(company)
        setShowDialog(true)
    }

    const confirmDelete = () => {
        if (selectedCompanyId) {
            router.delete(`/admin/companies/${selectedCompanyId}`)
        }
        setShowDialog(false)
    }

    const cancelDelete = () => {
        setShowDialog(false)
        setSelectedCompany(null)
    }

    const clearFilters = () => {
        setSearchTerm("")
    }

    // Manejar cambio de página
    const handlePageChange = (page) => {
        setCurrentPage(page)
        // Scroll al inicio de la lista
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Manejar cambio de elementos por página
    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1) // Resetear a la primera página
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
                            <h1 className="text-2xl font-bold text-gray-800">Empreses</h1>
                            <p className="text-gray-500 mt-1">Gestiona les empreses registrades al sistema</p>
                        </div>
                        <button
                            onClick={() => router.visit("/admin/companies/create")}
                            className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span>Nova Empresa</span>
                        </button>
                    </div>

                    {/* Filtres i cercador */}
                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Cercador */}
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Cercar per nom, email, ciutat..."
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <X size={16} className="text-gray-400 hover:text-gray-600" />
                                    </button>
                                )}
                            </div>

                            {/* Botó per netejar filtres */}
                            {searchTerm && (
                                <button
                                    onClick={clearFilters}
                                    className="text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                                >
                                    Netejar filtres
                                </button>
                            )}
                        </div>

                        {/* Comptador de resultats */}
                        <div className="mt-4 text-sm text-gray-600">
                            {filteredCompanies.length} {filteredCompanies.length === 1 ? "empresa trobada" : "empreses trobades"}
                        </div>
                    </div>

                    {/* Llista d'empreses */}
                    <div className="divide-y divide-gray-200">
                        {paginatedCompanies.length > 0 ? (
                            paginatedCompanies.map((company) => (
                                <div key={company.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="hidden sm:flex h-12 w-12 rounded-lg bg-blue-100 text-blue-600 items-center justify-center flex-shrink-0">
                                                {company.logo ? (
                                                    <img
                                                        src={company.logo || "/placeholder.svg"}
                                                        alt={company.name || "Logo"}
                                                        className="h-10 w-10 object-contain rounded"
                                                    />
                                                ) : (
                                                    <Building size={24} />
                                                )}
                                            </div>

                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{company.name}</h3>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                                                    {company.email && (
                                                        <div className="flex items-center gap-1">
                                                            <Mail size={14} className="text-gray-400" />
                                                            <span>{company.email}</span>
                                                        </div>
                                                    )}
                                                    {company.phone && (
                                                        <div className="flex items-center gap-1">
                                                            <Phone size={14} className="text-gray-400" />
                                                            <span>{company.phone}</span>
                                                        </div>
                                                    )}
                                                    {(company.city || company.state) && (
                                                        <div className="flex items-center gap-1">
                                                            <MapPin size={14} className="text-gray-400" />
                                                            <span>{[company.city, company.state].filter(Boolean).join(", ")}</span>
                                                        </div>
                                                    )}
                                                    {company.created_at && (
                                                        <div className="text-xs text-gray-400">
                                                            Registrada: {new Date(company.created_at).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                                            <button
                                                onClick={() => router.visit(`/admin/companies/${company.id}`)}
                                                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                                            >
                                                <Eye size={16} />
                                                <span className="hidden sm:inline">Veure</span>
                                            </button>
                                            <button
                                                onClick={() => router.visit(`/admin/companies/${company.id}/edit`)}
                                                className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                                            >
                                                <Edit size={16} />
                                                <span className="hidden sm:inline">Editar</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(company)}
                                                className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                                <span className="hidden sm:inline">Eliminar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <Search size={24} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No s'han trobat empreses</h3>
                                <p className="text-gray-500">Prova amb uns altres filtres o crea una nova empresa.</p>
                            </div>
                        )}
                    </div>

                    {/* Paginación */}
                    {filteredCompanies.length > 0 && (
                        <div className="px-6 border-t border-gray-200">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredCompanies.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredCompanies.length}
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
                            <h2 className="text-xl font-bold">Eliminar Empresa</h2>
                        </div>

                        {selectedCompany && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium text-gray-900">{selectedCompany.name}</p>
                                </div>
                                {selectedCompany.email && <p className="text-gray-600 text-sm">{selectedCompany.email}</p>}
                            </div>
                        )}

                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols eliminar aquesta empresa? Aquesta acció no es pot desfer i s'eliminaran totes les
                            dades associades, incloent serveis personalitzats i treballadors.
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

export default CompaniesIndex
