"use client"

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import Pagination from "@/Pages/Administrator/Components/Pagination.jsx"
import {
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    X,
    ChevronDown,
    Building,
    Briefcase,
    Tag,
    DollarSign,
    AlertCircle,
    Package,
} from "lucide-react"

const CompanyServicesIndex = ({ companyServices, companies, services }) => {
    const [showDialog, setShowDialog] = useState(false)
    const [selectedCompanyServiceId, setSelectedCompanyServiceId] = useState(null)
    const [selectedCompanyService, setSelectedCompanyService] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCompany, setSelectedCompany] = useState("")
    const [selectedService, setSelectedService] = useState("")
    const [filteredCompanyServices, setFilteredCompanyServices] = useState(companyServices)
    const [showCompanyFilter, setShowCompanyFilter] = useState(false)
    const [showServiceFilter, setShowServiceFilter] = useState(false)

    // Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [paginatedCompanyServices, setPaginatedCompanyServices] = useState([])

    // Apply filters whenever search term, selected company, or selected service changes
    useEffect(() => {
        let results = companyServices

        // Filter by search term (service name or company name)
        if (searchTerm) {
            results = results.filter(
                (cs) =>
                    (cs.service && cs.service.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (cs.company && cs.company.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (cs.custom_name && cs.custom_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (cs.description && cs.description.toLowerCase().includes(searchTerm.toLowerCase())),
            )
        }

        // Filter by company
        if (selectedCompany) {
            results = results.filter((cs) => cs.company_id === Number.parseInt(selectedCompany))
        }

        // Filter by service
        if (selectedService) {
            results = results.filter((cs) => cs.service_id === Number.parseInt(selectedService))
        }

        setFilteredCompanyServices(results)
        // Resetear a la primera página cuando cambian los filtros
        setCurrentPage(1)
    }, [searchTerm, selectedCompany, selectedService, companyServices])

    // Aplicar paginación a los servicios de empresa filtrados
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedCompanyServices(filteredCompanyServices.slice(startIndex, endIndex))
    }, [filteredCompanyServices, currentPage, itemsPerPage])

    const handleDelete = (companyService) => {
        setSelectedCompanyServiceId(companyService.id)
        setSelectedCompanyService(companyService)
        setShowDialog(true)
    }

    const confirmDelete = () => {
        if (selectedCompanyServiceId) {
            router.delete(`/admin/company-services/${selectedCompanyServiceId}`)
        }
        setShowDialog(false)
    }

    const cancelDelete = () => {
        setShowDialog(false)
        setSelectedCompanyService(null)
    }

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedCompany("")
        setSelectedService("")
    }

    // Format price display
    const formatPrice = (companyService) => {
        if (companyService.price_per_unit && companyService.unit) {
            return `${companyService.price_per_unit}€/${companyService.unit}`
        } else if (companyService.min_price && companyService.max_price) {
            return `${companyService.min_price}€ - ${companyService.max_price}€`
        } else if (companyService.min_price) {
            return `Des de ${companyService.min_price}€`
        } else if (companyService.max_price) {
            return `Fins a ${companyService.max_price}€`
        } else {
            return "Preu no especificat"
        }
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
                            <h1 className="text-2xl font-bold text-gray-800">Serveis d'Empreses</h1>
                            <p className="text-gray-500 mt-1">Gestiona els serveis personalitzats per empreses</p>
                        </div>
                        <button
                            onClick={() => router.visit("/admin/company-services/create")}
                            className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span>Nou Servei d'Empresa</span>
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
                                    placeholder="Cercar per nom, empresa o servei..."
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

                            {/* Filtre d'empreses */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowCompanyFilter(!showCompanyFilter)}
                                    className="w-full md:w-auto flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-2">
                                        <Building size={18} className="text-gray-500" />
                                        <span>
                      {selectedCompany
                          ? `Empresa: ${companies.find((c) => c.id === Number.parseInt(selectedCompany))?.name || ""}`
                          : "Filtrar per empresa"}
                    </span>
                                    </div>
                                    <ChevronDown size={16} className="text-gray-500" />
                                </button>

                                {showCompanyFilter && (
                                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <div className="p-2 max-h-60 overflow-y-auto">
                                            <button
                                                onClick={() => {
                                                    setSelectedCompany("")
                                                    setShowCompanyFilter(false)
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                            >
                                                Totes les empreses
                                            </button>
                                            {companies.map((company) => (
                                                <button
                                                    key={company.id}
                                                    onClick={() => {
                                                        setSelectedCompany(company.id.toString())
                                                        setShowCompanyFilter(false)
                                                    }}
                                                    className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded ${
                                                        Number.parseInt(selectedCompany) === company.id ? "bg-blue-50 text-blue-700" : ""
                                                    }`}
                                                >
                                                    {company.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Filtre de serveis */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowServiceFilter(!showServiceFilter)}
                                    className="w-full md:w-auto flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={18} className="text-gray-500" />
                                        <span>
                      {selectedService
                          ? `Servei: ${services.find((s) => s.id === Number.parseInt(selectedService))?.name || ""}`
                          : "Filtrar per servei"}
                    </span>
                                    </div>
                                    <ChevronDown size={16} className="text-gray-500" />
                                </button>

                                {showServiceFilter && (
                                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <div className="p-2 max-h-60 overflow-y-auto">
                                            <button
                                                onClick={() => {
                                                    setSelectedService("")
                                                    setShowServiceFilter(false)
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                            >
                                                Tots els serveis
                                            </button>
                                            {services.map((service) => (
                                                <button
                                                    key={service.id}
                                                    onClick={() => {
                                                        setSelectedService(service.id.toString())
                                                        setShowServiceFilter(false)
                                                    }}
                                                    className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded ${
                                                        Number.parseInt(selectedService) === service.id ? "bg-blue-50 text-blue-700" : ""
                                                    }`}
                                                >
                                                    {service.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Botó per netejar filtres */}
                            {(searchTerm || selectedCompany || selectedService) && (
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
                            {filteredCompanyServices.length}{" "}
                            {filteredCompanyServices.length === 1 ? "servei d'empresa trobat" : "serveis d'empresa trobats"}
                        </div>
                    </div>

                    {/* Llista de serveis d'empresa */}
                    <div className="divide-y divide-gray-200">
                        {paginatedCompanyServices.length > 0 ? (
                            paginatedCompanyServices.map((companyService) => (
                                <div key={companyService.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="hidden sm:flex h-12 w-12 rounded-lg bg-blue-100 text-blue-600 items-center justify-center flex-shrink-0">
                                                {companyService.logo ? (
                                                    <img
                                                        src={companyService.logo || "/placeholder.svg"}
                                                        alt={companyService.custom_name || "Logo"}
                                                        className="h-10 w-10 object-contain rounded"
                                                    />
                                                ) : (
                                                    <Package size={24} />
                                                )}
                                            </div>

                                            <div className="flex-grow">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {companyService.custom_name || companyService.service?.name || "Servei personalitzat"}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                              <Building size={12} />
                                {companyService.company?.name || "Empresa desconeguda"}
                            </span>
                                                        {companyService.service?.type && (
                                                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                                <Tag size={12} />
                                                                {companyService.service.type}
                              </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                                                    {companyService.description ||
                                                        companyService.service?.description ||
                                                        "Sense descripció disponible"}
                                                </p>

                                                <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} className="text-gray-400" />
                              {formatPrice(companyService)}
                          </span>
                                                    {companyService.created_at && (
                                                        <span className="text-xs text-gray-400">
                              Creat: {new Date(companyService.created_at).toLocaleDateString()}
                            </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                                            <button
                                                onClick={() => router.visit(`/admin/company-services/${companyService.id}`)}
                                                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                                            >
                                                <Eye size={16} />
                                                <span className="hidden sm:inline">Veure</span>
                                            </button>
                                            <button
                                                onClick={() => router.visit(`/admin/company-services/${companyService.id}/edit`)}
                                                className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                                            >
                                                <Edit size={16} />
                                                <span className="hidden sm:inline">Editar</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(companyService)}
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
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No s'han trobat serveis d'empresa</h3>
                                <p className="text-gray-500">
                                    Prova amb uns altres filtres o crea un nou servei personalitzat per a una empresa.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Paginación */}
                    {filteredCompanyServices.length > 0 && (
                        <div className="px-6 border-t border-gray-200">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredCompanyServices.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredCompanyServices.length}
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
                            <h2 className="text-xl font-bold">Eliminar Servei d'Empresa</h2>
                        </div>

                        {selectedCompanyService && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium text-gray-900">
                                        {selectedCompanyService.custom_name || selectedCompanyService.service?.name}
                                    </p>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {selectedCompanyService.company?.name}
                  </span>
                                </div>
                                {selectedCompanyService.description && (
                                    <p className="text-gray-600 text-sm line-clamp-2">{selectedCompanyService.description}</p>
                                )}
                            </div>
                        )}

                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols eliminar aquest servei d'empresa? Aquesta acció no es pot desfer i s'eliminaran totes
                            les dades associades.
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

export default CompanyServicesIndex
