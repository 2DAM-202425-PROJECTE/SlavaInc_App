"use client"

import { useState, useEffect } from "react"
import { router, Link } from "@inertiajs/react"
import { route } from "ziggy-js"
import {
    WrenchScrewdriverIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    BanknotesIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline"

export default function ServicesSection({ company, onViewServiceInfo, onDeleteService, showDeleteModal }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const services = company.services?.data || []
    const paginationLinks = company.services?.links || []

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleAddService = () => {
        router.get(route("company.services.create"))
    }

    const handleEditService = (serviceId) => {
        router.get(route("company.services.edit", serviceId))
    }

    return (
        <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <WrenchScrewdriverIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                    Serveis
                </h2>
                <button
                    onClick={handleAddService}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all duration-300 hover:bg-[#8a2329] shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Nou Servei
                </button>
            </div>

            {services.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={service.id || `service-${index}`}
                            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 hover:scale-[1.02] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-xl text-gray-900">{service.custom_name || service.name}</h3>
                                <div className="px-3 py-1 rounded-full bg-[#9e2a2f]/10 text-[#9e2a2f] font-semibold text-sm transition-all duration-300 hover:bg-[#9e2a2f]/20 hover:scale-105">
                                    {service.price_per_unit} €/{service.unit}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {service.description && <p className="text-gray-600 text-sm mb-4">{service.description}</p>}
                                <div className="flex items-center text-gray-700 group">
                                    <BanknotesIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                    <span>Preu: {service.price_per_unit} €/{service.unit}</span>
                                </div>
                                {service.min_price && (
                                    <div className="flex items-center text-gray-700 group">
                                        <BanknotesIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                        <span>Preu mínim: {service.min_price} €</span>
                                    </div>
                                )}
                                {service.max_price && (
                                    <div className="flex items-center text-gray-700 group">
                                        <BanknotesIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                        <span>Preu màxim: {service.max_price} €</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleEditService(service.id)}
                                    className="inline-flex items-center px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium transition-all duration-300 hover:bg-indigo-100 hover:shadow-md"
                                >
                                    <PencilSquareIcon className="h-4 w-4 mr-2" />
                                    Editar
                                </button>
                                <button
                                    onClick={() => onViewServiceInfo(service)}
                                    className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
                                >
                                    <InformationCircleIcon className="h-4 w-4 mr-2" />
                                    Info
                                </button>
                                <button
                                    onClick={() => {
                                        onDeleteService(service.id)
                                        showDeleteModal()
                                    }}
                                    className="inline-flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-700 font-medium transition-all duration-300 hover:bg-red-100 hover:shadow-md"
                                >
                                    <TrashIcon className="h-4 w-4 mr-2" />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 animate-pulse">
                        <WrenchScrewdriverIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No hi ha serveis registrats</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Afegeix el teu primer servei per començar a gestionar la teva oferta
                    </p>
                    <button
                        onClick={handleAddService}
                        className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all duration-300 hover:bg-[#8a2329] shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Afegir Servei
                    </button>
                </div>
            )}

            {paginationLinks.length > 0 && (
                <div className="mt-8 flex justify-center w-full">
                    <div className="inline-flex flex-wrap gap-2 justify-center">
                        {paginationLinks.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                    preserveState
                                    className={`px-4 py-2 border rounded ${
                                        link.active ? "bg-[#9e2a2f] text-white" : "bg-white text-gray-800"
                                    } hover:bg-[#9e2a2f]/90 hover:text-white transition-all`}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    className="px-4 py-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
