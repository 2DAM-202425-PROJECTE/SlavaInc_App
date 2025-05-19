"use client"

import { router } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import {
    ArrowLeft,
    Edit,
    Trash2,
    Briefcase,
    Clock,
    Calendar,
    DollarSign,
    Tag,
    FileText,
    User,
    MapPin,
    CheckCircle,
    AlertCircle,
} from "lucide-react"

const ServicesShow = ({ service }) => {
    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return "No disponible"
        const date = new Date(dateString)
        return date.toLocaleDateString("ca-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    // Function to get category badge styling
    const getCategoryBadge = (category) => {
        const categories = {
            neteja: {
                icon: <Tag size={16} />,
                class: "bg-green-100 text-green-800 border-green-200",
            },
            manteniment: {
                icon: <Tag size={16} />,
                class: "bg-blue-100 text-blue-800 border-blue-200",
            },
            seguretat: {
                icon: <Tag size={16} />,
                class: "bg-purple-100 text-purple-800 border-purple-200",
            },
            consultoria: {
                icon: <Tag size={16} />,
                class: "bg-yellow-100 text-yellow-800 border-yellow-200",
            },
        }

        // Default styling if category is not in our mapping
        const defaultStyle = {
            icon: <Tag size={16} />,
            class: "bg-gray-100 text-gray-800 border-gray-200",
        }

        // Convert category to lowercase for case-insensitive matching
        const categoryLower = category ? category.toLowerCase() : ""
        return categories[categoryLower] || defaultStyle
    }

    // Get badge for service type/category
    const categoryBadge = service.type
        ? getCategoryBadge(service.type)
        : service.category
            ? getCategoryBadge(service.category)
            : getCategoryBadge()

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                {/* Breadcrumbs i accions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <button
                        onClick={() => router.visit("/admin/services")}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>Tornar a la llista de serveis</span>
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={() => router.visit(`/admin/services/${service.id}/edit`)}
                            className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                        >
                            <Edit size={16} />
                            <span>Editar</span>
                        </button>
                        <button
                            onClick={() => {
                                if (confirm("Estàs segur que vols eliminar aquest servei? Aquesta acció no es pot desfer.")) {
                                    router.delete(`/admin/services/${service.id}`)
                                }
                            }}
                            className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors"
                        >
                            <Trash2 size={16} />
                            <span>Eliminar</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Informació principal */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white p-6">
                            <div className="flex items-start gap-4">
                                <div className="h-14 w-14 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Briefcase size={28} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-1">{service.name}</h1>
                                    <div className="flex items-center gap-2">
                    <span
                        className={`flex items-center gap-1 text-sm px-2.5 py-1 rounded-full border ${categoryBadge.class}`}
                    >
                      {categoryBadge.icon}
                        {service.type || service.category || "Servei general"}
                    </span>
                                        {service.status && (
                                            <span
                                                className={`flex items-center gap-1 text-sm px-2.5 py-1 rounded-full border ${
                                                    service.status.toLowerCase() === "actiu"
                                                        ? "bg-green-100 text-green-800 border-green-200"
                                                        : "bg-gray-100 text-gray-800 border-gray-200"
                                                }`}
                                            >
                        {service.status.toLowerCase() === "actiu" ? (
                            <CheckCircle size={16} />
                        ) : (
                            <AlertCircle size={16} />
                        )}
                                                {service.status}
                      </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <FileText size={18} className="text-gray-500" />
                                    Descripció
                                </h2>
                                <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-line">
                                    {service.description || "No hi ha descripció disponible per aquest servei."}
                                </div>
                            </div>

                            {/* Detalls addicionals */}
                            {(service.requirements || service.benefits || service.notes) && (
                                <div className="space-y-6">
                                    {service.requirements && (
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Requisits</h2>
                                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">{service.requirements}</div>
                                        </div>
                                    )}

                                    {service.benefits && (
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Beneficis</h2>
                                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">{service.benefits}</div>
                                        </div>
                                    )}

                                    {service.notes && (
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Notes addicionals</h2>
                                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">{service.notes}</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Informació lateral */}
                    <div className="space-y-6">
                        {/* Detalls del servei */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalls del servei</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <DollarSign size={18} className="text-gray-500 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700">Preu</h3>
                                        <p className="text-gray-600">
                                            {service.price ? `${service.price}€` : "Preu no especificat"}
                                            {service.price_type && ` (${service.price_type})`}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock size={18} className="text-gray-500 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700">Duració</h3>
                                        <p className="text-gray-600">{service.duration || "No especificada"}</p>
                                    </div>
                                </div>

                                {service.location && (
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-700">Ubicació</h3>
                                            <p className="text-gray-600">{service.location}</p>
                                        </div>
                                    </div>
                                )}

                                {service.provider && (
                                    <div className="flex items-start gap-3">
                                        <User size={18} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-700">Proveïdor</h3>
                                            <p className="text-gray-600">{service.provider}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Informació temporal */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Informació temporal</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar size={18} className="text-gray-500 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700">Data de creació</h3>
                                        <p className="text-gray-600">{formatDate(service.created_at)}</p>
                                    </div>
                                </div>

                                {service.updated_at && (
                                    <div className="flex items-start gap-3">
                                        <Calendar size={18} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-700">Última actualització</h3>
                                            <p className="text-gray-600">{formatDate(service.updated_at)}</p>
                                        </div>
                                    </div>
                                )}

                                {service.available_from && (
                                    <div className="flex items-start gap-3">
                                        <Calendar size={18} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-700">Disponible des de</h3>
                                            <p className="text-gray-600">{formatDate(service.available_from)}</p>
                                        </div>
                                    </div>
                                )}

                                {service.available_until && (
                                    <div className="flex items-start gap-3">
                                        <Calendar size={18} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-700">Disponible fins</h3>
                                            <p className="text-gray-600">{formatDate(service.available_until)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ServicesShow
