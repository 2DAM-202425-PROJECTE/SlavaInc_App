"use client"

import { useState } from "react"
import { router } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import { Building, Mail, Phone, MapPin, ArrowLeft, Edit, Trash2, Calendar, Clock, AlertCircle, ExternalLink, Briefcase, Users, Package } from 'lucide-react'

const CompaniesShow = ({ company }) => {
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

    const handleDelete = () => {
        setShowDialog(true)
    }

    const confirmDelete = () => {
        router.delete(`/administrator/companies/${company.id}`)
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
                                    onClick={() => router.visit("/administrator/companies")}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <ArrowLeft size={20} className="text-gray-600" />
                                </button>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {company.name}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-1">
                                        {company.email && (
                                            <span className="text-gray-500 text-sm flex items-center gap-1">
                                                <Mail size={14} className="text-gray-400" />
                                                {company.email}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                                <button
                                    onClick={() => router.visit(`/administrator/companies/${company.id}/edit`)}
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
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Informació de l'empresa</h2>

                                    <div className="space-y-6">
                                        {/* Dades de contacte */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Nom</h3>
                                                <div className="flex items-center gap-2">
                                                    <Building size={18} className="text-gray-400" />
                                                    <span className="text-gray-800 font-medium">{company.name}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                                                <div className="flex items-center gap-2">
                                                    <Mail size={18} className="text-gray-400" />
                                                    <span className="text-gray-800">{company.email || "No disponible"}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Telèfon</h3>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={18} className="text-gray-400" />
                                                    <span className="text-gray-800">{company.phone || "No disponible"}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Verificació d'email</h3>
                                                <div className="flex items-center gap-2">
                                                    {company.email_verified_at ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Verificat el {formatDate(company.email_verified_at)}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            No verificat
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Adreça */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-1">Adreça</h3>
                                            <div className="flex items-start gap-2">
                                                <MapPin size={18} className="text-gray-400 mt-0.5" />
                                                <div>
                                                    {company.address ? (
                                                        <div>
                                                            <p className="text-gray-800">{company.address}</p>
                                                            <p className="text-gray-600">
                                                                {[company.city, company.state, company.zip_code].filter(Boolean).join(", ")}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-500">Adreça no disponible</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Data de creació</h3>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={18} className="text-gray-400" />
                                                    <span className="text-gray-800">{formatDate(company.created_at)}</span>
                                                    <Clock size={16} className="text-gray-400 ml-2" />
                                                    <span className="text-gray-600 text-sm">{formatTime(company.created_at)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Última actualització</h3>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={18} className="text-gray-400" />
                                                    <span className="text-gray-800">{formatDate(company.updated_at)}</span>
                                                    <Clock size={16} className="text-gray-400 ml-2" />
                                                    <span className="text-gray-600 text-sm">{formatTime(company.updated_at)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Serveis de l'empresa */}
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-gray-800">Serveis personalitzats</h2>
                                        <button
                                            onClick={() => router.visit(`/administrator/company-services/create?company_id=${company.id}`)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
                                        >
                                            Afegir servei
                                            <ExternalLink size={14} />
                                        </button>
                                    </div>

                                    {company.services && company.services.length > 0 ? (
                                        <div className="space-y-4">
                                            {company.services.map((service) => (
                                                <div key={service.id} className="bg-white p-4 rounded-lg border border-gray-200">
                                                    <div className="flex items-start gap-3">
                                                        <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                            {service.pivot.logo ? (
                                                                <img
                                                                    src={service.pivot.logo || "/placeholder.svg"}
                                                                    alt={service.pivot.custom_name || service.name || "Logo"}
                                                                    className="h-8 w-8 object-contain rounded"
                                                                />
                                                            ) : (
                                                                <Briefcase size={20} />
                                                            )}
                                                        </div>
                                                        <div className="flex-grow">
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                                                <h3 className="text-base font-semibold text-gray-800">
                                                                    {service.pivot.custom_name || service.name}
                                                                </h3>
                                                                {service.type && (
                                                                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full border border-purple-200">
                                                                        {service.type}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {service.pivot.description && (
                                                                <p className="text-gray-600 text-sm mb-2">
                                                                    {service.pivot.description}
                                                                </p>
                                                            )}

                                                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                                                {(service.pivot.price_per_unit && service.pivot.unit) ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <span className="text-gray-400">Preu:</span>
                                                                        {service.pivot.price_per_unit}€/{service.pivot.unit}
                                                                    </span>
                                                                ) : (service.pivot.min_price && service.pivot.max_price) ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <span className="text-gray-400">Preu:</span>
                                                                        {service.pivot.min_price}€ - {service.pivot.max_price}€
                                                                    </span>
                                                                ) : service.pivot.min_price ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <span className="text-gray-400">Preu mínim:</span>
                                                                        {service.pivot.min_price}€
                                                                    </span>
                                                                ) : service.pivot.max_price ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <span className="text-gray-400">Preu màxim:</span>
                                                                        {service.pivot.max_price}€
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-gray-400">Preu no especificat</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => router.visit(`/administrator/company-services/${service.pivot.id}`)}
                                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                        >
                                                            Veure
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                                            <Briefcase size={40} className="mx-auto text-gray-300 mb-2" />
                                            <p className="text-gray-500">Aquesta empresa no té serveis personalitzats</p>
                                            <button
                                                onClick={() => router.visit(`/administrator/company-services/create?company_id=${company.id}`)}
                                                className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Afegir el primer servei
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Treballadors de l'empresa */}
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-gray-800">Treballadors</h2>
                                        <button
                                            onClick={() => router.visit(`/administrator/workers/create?company_id=${company.id}`)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
                                        >
                                            Afegir treballador
                                            <ExternalLink size={14} />
                                        </button>
                                    </div>

                                    {company.workers && company.workers.length > 0 ? (
                                        <div className="space-y-4">
                                            {company.workers.map((worker) => (
                                                <div key={worker.id} className="bg-white p-4 rounded-lg border border-gray-200">
                                                    <div className="flex items-start gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                            {worker.avatar ? (
                                                                <img
                                                                    src={worker.avatar || "/placeholder.svg"}
                                                                    alt={worker.name || "Avatar"}
                                                                    className="h-10 w-10 object-cover rounded-full"
                                                                />
                                                            ) : (
                                                                <Users size={20} />
                                                            )}
                                                        </div>
                                                        <div className="flex-grow">
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                                                <h3 className="text-base font-semibold text-gray-800">
                                                                    {worker.name}
                                                                </h3>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {worker.is_admin && (
                                                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full border border-blue-200">
                                                                            Administrador
                                                                        </span>
                                                                    )}
                                                                    {worker.is_company && (
                                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full border border-green-200">
                                                                            Representant
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                                                                {worker.email && (
                                                                    <div className="flex items-center gap-1">
                                                                        <Mail size={14} className="text-gray-400" />
                                                                        <span>{worker.email}</span>
                                                                    </div>
                                                                )}
                                                                {worker.phone && (
                                                                    <div className="flex items-center gap-1">
                                                                        <Phone size={14} className="text-gray-400" />
                                                                        <span>{worker.phone}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => router.visit(`/administrator/workers/${worker.id}`)}
                                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                        >
                                                            Veure
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                                            <Users size={40} className="mx-auto text-gray-300 mb-2" />
                                            <p className="text-gray-500">Aquesta empresa no té treballadors registrats</p>
                                            <button
                                                onClick={() => router.visit(`/administrator/workers/create?company_id=${company.id}`)}
                                                className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Afegir el primer treballador
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Columna 2: Logo i accions ràpides */}
                            <div className="col-span-1">
                                {/* Logo */}
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Logo</h2>

                                    <div className="flex justify-center p-4 bg-white rounded-lg border border-gray-200">
                                        {company.logo ? (
                                            <img
                                                src={company.logo || "/placeholder.svg"}
                                                alt={company.name || "Logo"}
                                                className="max-h-48 object-contain"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-400 py-8">
                                                <Building size={48} className="mb-2" />
                                                <span className="text-sm">Sense logo</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Accions ràpides */}
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Accions ràpides</h2>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => router.visit(`/administrator/companies/${company.id}/edit`)}
                                            className="w-full flex items-center gap-2 p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-left"
                                        >
                                            <Edit size={18} className="text-blue-600" />
                                            <span className="font-medium">Editar empresa</span>
                                        </button>

                                        <button
                                            onClick={() => router.visit(`/administrator/company-services/create?company_id=${company.id}`)}
                                            className="w-full flex items-center gap-2 p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-left"
                                        >
                                            <Briefcase size={18} className="text-purple-600" />
                                            <span className="font-medium">Afegir servei</span>
                                        </button>

                                        <button
                                            onClick={() => router.visit(`/administrator/workers/create?company_id=${company.id}`)}
                                            className="w-full flex items-center gap-2 p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-left"
                                        >
                                            <Users size={18} className="text-green-600" />
                                            <span className="font-medium">Afegir treballador</span>
                                        </button>

                                        <button
                                            onClick={handleDelete}
                                            className="w-full flex items-center gap-2 p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-left"
                                        >
                                            <Trash2 size={18} className="text-red-600" />
                                            <span className="font-medium">Eliminar empresa</span>
                                        </button>
                                    </div>
                                </div>
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
                            <h2 className="text-xl font-bold">Eliminar Empresa</h2>
                        </div>

                        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-gray-900">
                                    {company.name}
                                </p>
                            </div>
                            {company.email && (
                                <p className="text-gray-600 text-sm">{company.email}</p>
                            )}
                        </div>

                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols eliminar aquesta empresa? Aquesta acció no es pot desfer i s'eliminaran totes
                            les dades associades, incloent serveis personalitzats i treballadors.
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

export default CompaniesShow
