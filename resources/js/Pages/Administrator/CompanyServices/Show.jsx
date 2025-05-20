"use client"

import { useState } from "react"
import { router } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import { Building, Briefcase, Tag, DollarSign, Package, ArrowLeft, Edit, Trash2, Calendar, Clock, AlertCircle, ExternalLink } from 'lucide-react'

const CompanyServicesShow = ({ companyService }) => {
    const [showDialog, setShowDialog] = useState(false)

    const formatDate = (dateString) => {
        if (!dateString) return "No disponible"
        const date = new Date(dateString)
        return date.toLocaleDateString('ca-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const formatTime = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleTimeString('ca-ES', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Format price display
    const formatPrice = () => {
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

    const handleDelete = () => {
        setShowDialog(true)
    }

    const confirmDelete = () => {
        router.delete(`/admin/company-services/${companyService.id}`)
        setShowDialog(false)
    }

    const cancelDelete = () => {
        setShowDialog(false)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header amb títol i botons d'acció */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => router.visit("/admin/company-services")}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <ArrowLeft size={20} className="text-gray-600" />
                                </button>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {companyService.custom_name || companyService.service?.name || "Servei personalitzat"}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-1">
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
                            </div>
                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                                <button
                                    onClick={() => router.visit(`/admin/company-services/${companyService.id}/edit`)}
                                    className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Edit size={16} />
                                    <span>Editar</span>
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Informació detallada */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Columna 1: Informació bàsica */}
                            <div className="col-span-2">
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Informació del servei</h2>

                                    <div className="space-y-6">
                                        {/* Descripció */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-1">Descripció</h3>
                                            <p className="text-gray-800">
                                                {companyService.description || companyService.service?.description || "Sense descripció disponible"}
                                            </p>
                                        </div>

                                        {/* Preu */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-1">Preu</h3>
                                            <div className="flex items-center gap-2">
                                                <DollarSign size={18} className="text-gray-400" />
                                                <span className="text-gray-800 font-medium">{formatPrice()}</span>
                                            </div>

                                            {/* Detalls de preu */}
                                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {companyService.price_per_unit && (
                                                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                        <span className="text-xs text-gray-500 block">Preu per unitat</span>
                                                        <span className="font-medium">{companyService.price_per_unit}€</span>
                                                    </div>
                                                )}
                                                {companyService.unit && (
                                                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                        <span className="text-xs text-gray-500 block">Unitat</span>
                                                        <span className="font-medium">{companyService.unit}</span>
                                                    </div>
                                                )}
                                                {companyService.min_price && (
                                                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                        <span className="text-xs text-gray-500 block">Preu mínim</span>
                                                        <span className="font-medium">{companyService.min_price}€</span>
                                                    </div>
                                                )}
                                                {companyService.max_price && (
                                                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                        <span className="text-xs text-gray-500 block">Preu màxim</span>
                                                        <span className="font-medium">{companyService.max_price}€</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Data de creació</h3>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={18} className="text-gray-400" />
                                                    <span className="text-gray-800">{formatDate(companyService.created_at)}</span>
                                                    <Clock size={16} className="text-gray-400 ml-2" />
                                                    <span className="text-gray-600 text-sm">{formatTime(companyService.created_at)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Última actualització</h3>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={18} className="text-gray-400" />
                                                    <span className="text-gray-800">{formatDate(companyService.updated_at)}</span>
                                                    <Clock size={16} className="text-gray-400 ml-2" />
                                                    <span className="text-gray-600 text-sm">{formatTime(companyService.updated_at)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Informació del servei original */}
                                {companyService.service && (
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-6">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Servei original</h2>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Nom del servei</h3>
                                                <p className="text-gray-800 font-medium">{companyService.service.name}</p>
                                            </div>

                                            {companyService.service.description && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Descripció original</h3>
                                                    <p className="text-gray-800">{companyService.service.description}</p>
                                                </div>
                                            )}

                                            {companyService.service.type && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Tipus</h3>
                                                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full border border-purple-200 inline-flex items-center gap-1">
                                                        <Tag size={12} />
                                                        {companyService.service.type}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="pt-2">
                                                <button
                                                    onClick={() => router.visit(`/admin/services/${companyService.service.id}`)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
                                                >
                                                    Veure detalls del servei
                                                    <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Columna 2: Logo i empresa */}
                            <div className="col-span-1">
                                {/* Logo */}
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Logo</h2>

                                    <div className="flex justify-center p-4 bg-white rounded-lg border border-gray-200">
                                        {companyService.logo ? (
                                            <img
                                                src={companyService.logo || "/placeholder.svg"}
                                                alt={companyService.custom_name || "Logo"}
                                                className="max-h-48 object-contain"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-400 py-8">
                                                <Package size={48} className="mb-2" />
                                                <span className="text-sm">Sense logo</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Informació de l'empresa */}
                                {companyService.company && (
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Empresa</h2>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Nom de l'empresa</h3>
                                                <p className="text-gray-800 font-medium">{companyService.company.name}</p>
                                            </div>

                                            {companyService.company.email && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                                                    <p className="text-gray-800">{companyService.company.email}</p>
                                                </div>
                                            )}

                                            {companyService.company.phone && (
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Telèfon</h3>
                                                    <p className="text-gray-800">{companyService.company.phone}</p>
                                                </div>
                                            )}

                                            <div className="pt-2">
                                                <button
                                                    onClick={() => router.visit(`/admin/companies/${companyService.company.id}`)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
                                                >
                                                    Veure detalls de l'empresa
                                                    <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
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

                        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-gray-900">
                                    {companyService.custom_name || companyService.service?.name}
                                </p>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                    {companyService.company?.name}
                                </span>
                            </div>
                            {companyService.description && (
                                <p className="text-gray-600 text-sm line-clamp-2">{companyService.description}</p>
                            )}
                        </div>

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

export default CompanyServicesShow
