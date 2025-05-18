"use client"

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
    Briefcase,
    Clock,
    Tag,
    AlertCircle,
    Calendar,
    DollarSign,
} from "lucide-react"

const ServicesIndex = ({ services }) => {
    const [showDialog, setShowDialog] = useState(false)
    const [selectedServiceId, setSelectedServiceId] = useState(null)
    const [selectedService, setSelectedService] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredServices, setFilteredServices] = useState(services)

    // Apply search filter
    useEffect(() => {
        if (searchTerm) {
            const results = services.filter(
                (service) =>
                    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (service.category && service.category.toLowerCase().includes(searchTerm.toLowerCase())),
            )
            setFilteredServices(results)
        } else {
            setFilteredServices(services)
        }
    }, [searchTerm, services])

    const handleDelete = (service) => {
        setSelectedServiceId(service.id)
        setSelectedService(service)
        setShowDialog(true)
    }

    const confirmDelete = () => {
        if (selectedServiceId) {
            router.delete(`/administrator/services/${selectedServiceId}`)
        }
        setShowDialog(false)
    }

    const cancelDelete = () => {
        setShowDialog(false)
        setSelectedService(null)
    }

    // Function to get category badge styling
    const getCategoryBadge = (category) => {
        const categories = {
            neteja: {
                icon: <Tag size={14} />,
                class: "bg-green-100 text-green-800 border-green-200",
            },
            manteniment: {
                icon: <Tag size={14} />,
                class: "bg-blue-100 text-blue-800 border-blue-200",
            },
            seguretat: {
                icon: <Tag size={14} />,
                class: "bg-purple-100 text-purple-800 border-purple-200",
            },
            consultoria: {
                icon: <Tag size={14} />,
                class: "bg-yellow-100 text-yellow-800 border-yellow-200",
            },
        }

        // Default styling if category is not in our mapping
        const defaultStyle = {
            icon: <Tag size={14} />,
            class: "bg-gray-100 text-gray-800 border-gray-200",
        }

        // Convert category to lowercase for case-insensitive matching
        const categoryLower = category ? category.toLowerCase() : ""
        return categories[categoryLower] || defaultStyle
    }

    // Function to truncate text
    const truncateText = (text, maxLength = 150) => {
        if (!text) return ""
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
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
                            <h1 className="text-2xl font-bold text-gray-800">Gestió de Serveis</h1>
                            <p className="text-gray-500 mt-1">Administra els serveis disponibles</p>
                        </div>
                        <button
                            onClick={() => router.visit("/administrator/services/create")}
                            className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span>Nou Servei</span>
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
                                placeholder="Cercar per nom, descripció o categoria..."
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
                            {filteredServices.length} {filteredServices.length === 1 ? "servei trobat" : "serveis trobats"}
                        </div>
                    </div>

                    {/* Llista de serveis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => {
                                const categoryBadge = service.category ? getCategoryBadge(service.category) : getCategoryBadge()

                                return (
                                    <div
                                        key={service.id}
                                        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
                                    >
                                        <div className="p-5 flex-grow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                        <Briefcase size={20} />
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{service.name}</h3>
                                                </div>
                                                {service.category && (
                                                    <span
                                                        className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${categoryBadge.class}`}
                                                    >
                            {categoryBadge.icon}
                                                        {service.category}
                          </span>
                                                )}
                                            </div>

                                            <div className="mt-3 text-gray-600 text-sm line-clamp-3">{truncateText(service.description)}</div>

                                            <div className="mt-4 grid grid-cols-2 gap-2">
                                                {service.duration && (
                                                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                        <Clock size={14} className="text-gray-400" />
                                                        <span>Duració: {service.duration}</span>
                                                    </div>
                                                )}
                                                {service.price && (
                                                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                        <DollarSign size={14} className="text-gray-400" />
                                                        <span>Preu: {service.price}€</span>
                                                    </div>
                                                )}
                                                {service.created_at && (
                                                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                        <Calendar size={14} className="text-gray-400" />
                                                        <span>Creat: {new Date(service.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 p-3 bg-gray-50 flex justify-between">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => router.visit(`/administrator/services/${service.id}`)}
                                                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors text-xs"
                                                >
                                                    <Eye size={14} />
                                                    <span>Veure</span>
                                                </button>
                                                <button
                                                    onClick={() => router.visit(`/administrator/services/${service.id}/edit`)}
                                                    className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-md transition-colors text-xs"
                                                >
                                                    <Edit size={14} />
                                                    <span>Editar</span>
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(service)}
                                                className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded-md transition-colors text-xs"
                                            >
                                                <Trash2 size={14} />
                                                <span>Eliminar</span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 p-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <Search size={24} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No s'han trobat serveis</h3>
                                <p className="text-gray-500">Prova amb uns altres termes de cerca o crea un nou servei.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de confirmació d'eliminació */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <AlertCircle size={24} />
                            <h2 className="text-xl font-bold">Eliminar Servei</h2>
                        </div>

                        {selectedService && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                                <p className="font-medium text-gray-900">{selectedService.name}</p>
                                {selectedService.description && (
                                    <p className="text-gray-600 text-sm line-clamp-2">{selectedService.description}</p>
                                )}
                            </div>
                        )}

                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols eliminar aquest servei? Aquesta acció no es pot desfer i s'eliminaran totes les dades
                            associades.
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

export default ServicesIndex
