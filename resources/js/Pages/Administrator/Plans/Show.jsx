"use client"

import { router } from "@inertiajs/react"
import Header from "@/Components/Header"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import {
    ArrowLeft,
    Edit,
    Trash2,
    Package,
    CheckCircle,
    Users,
    Briefcase,
    BarChart,
    Building,
    Calendar,
    X,
} from "lucide-react"
import { useState } from "react"

const ShowPlan = ({ plan }) => {
    const [showDialog, setShowDialog] = useState(false)

    const confirmDelete = () => {
        router.delete(`/admin/plans/${plan.id}`)
        setShowDialog(false)
    }

    const cancelDelete = () => {
        setShowDialog(false)
    }

    // Format price to show with 2 decimals and € symbol
    const formatPrice = (price) => {
        return new Intl.NumberFormat("ca-ES", { style: "currency", currency: "EUR" }).format(price)
    }

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("ca-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header amb títol */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <button onClick={() => router.visit("/admin/plans")} className="p-2 rounded-full hover:bg-gray-100">
                                <ArrowLeft size={20} className="text-gray-500" />
                            </button>
                            <div className="flex-grow">
                                <h1 className="text-2xl font-bold text-gray-800">Detalls del Pla</h1>
                                <p className="text-gray-500 mt-1">Informació completa del pla</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => router.visit(`/admin/plans/${plan.id}/edit`)}
                                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Edit size={16} />
                                    <span>Editar</span>
                                </button>
                                <button
                                    onClick={() => setShowDialog(true)}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Informació del pla */}
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Columna esquerra - Detalls bàsics */}
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-16 w-16 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <Package size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>
                                        <p className="text-xl font-semibold text-blue-600">{formatPrice(plan.price)}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-md font-medium text-gray-700 mb-2">Límits i permisos</h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Users size={18} className="text-gray-500" />
                                                <span className="text-gray-700">
                          {plan.max_workers ? `Fins a ${plan.max_workers} treballadors` : "Treballadors il·limitats"}
                        </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Briefcase size={18} className="text-gray-500" />
                                                <span className="text-gray-700">
                          {plan.max_services ? `Fins a ${plan.max_services} serveis` : "Serveis il·limitats"}
                        </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <BarChart size={18} className="text-gray-500" />
                                                <span className="text-gray-700">
                          Estadístiques bàsiques:{" "}
                                                    {plan.can_view_stats ? (
                                                        <span className="text-green-600 font-medium">Incloses</span>
                                                    ) : (
                                                        <span className="text-red-600 font-medium">No incloses</span>
                                                    )}
                        </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <BarChart size={18} className="text-gray-500" />
                                                <span className="text-gray-700">
                          Estadístiques avançades:{" "}
                                                    {plan.extra_stats ? (
                                                        <span className="text-green-600 font-medium">Incloses</span>
                                                    ) : (
                                                        <span className="text-red-600 font-medium">No incloses</span>
                                                    )}
                        </span>
                                            </div>
                                        </div>
                                    </div>

                                    {plan.features && plan.features.length > 0 && (
                                        <div>
                                            <h3 className="text-md font-medium text-gray-700 mb-2">Característiques</h3>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <ul className="space-y-2">
                                                    {plan.features.map((feature, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-gray-700">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="text-md font-medium text-gray-700 mb-2">Informació addicional</h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-gray-500" />
                                                <span className="text-gray-600">Creat: {formatDate(plan.created_at)}</span>
                                            </div>
                                            {plan.updated_at && (
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} className="text-gray-500" />
                                                    <span className="text-gray-600">Actualitzat: {formatDate(plan.updated_at)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columna dreta - Empreses que utilitzen aquest pla */}
                            <div className="flex-1">
                                <h3 className="text-md font-medium text-gray-700 mb-3">Empreses que utilitzen aquest pla</h3>

                                {plan.companies && plan.companies.length > 0 ? (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <ul className="divide-y divide-gray-200">
                                            {plan.companies.map((company) => (
                                                <li key={company.id} className="py-3 first:pt-0 last:pb-0">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                            <Building size={20} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-gray-800">{company.name}</h4>
                                                            {company.email && <p className="text-sm text-gray-500">{company.email}</p>}
                                                        </div>
                                                        <button
                                                            onClick={() => router.visit(`/admin/companies/${company.id}`)}
                                                            className="ml-auto text-blue-600 hover:text-blue-800 text-sm"
                                                        >
                                                            Veure
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                                        <Building size={32} className="mx-auto text-gray-400 mb-2" />
                                        <p className="text-gray-500">Cap empresa utilitza aquest pla actualment.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmació d'eliminació */}
            {showDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Confirmar eliminació</h3>
                            <button
                                onClick={cancelDelete}
                                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Estàs segur que vols eliminar aquest pla? Aquesta acció no es pot desfer i pot afectar a les empreses
                                que utilitzen aquest pla.
                            </p>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowPlan
