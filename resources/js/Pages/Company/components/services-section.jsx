"use client"

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"
import {
    WrenchScrewdriverIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    BanknotesIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline"

export default function ServicesSection({ company }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showServiceModal, setShowServiceModal] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState(null)
    const [selectedService, setSelectedService] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const services = company.services || []

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleAddService = () => {
        router.get(route("company.services.create"))
    }

    const handleEditService = (serviceId) => {
        router.get(route("company.services.edit", serviceId))
    }

    const handleDeleteService = (serviceId) => {
        setServiceToDelete(serviceId)
        setShowServiceModal(true)
    }

    const confirmDeleteService = () => {
        if (serviceToDelete) {
            router.delete(route("company.services.destroy", serviceToDelete))
        }
        setShowServiceModal(false)
    }

    const cancelDeleteService = () => {
        setShowServiceModal(false)
    }

    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <WrenchScrewdriverIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                    Serveis
                </h2>
                <div className="flex-1 mx-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cercar serveis..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9e2a2f] focus:border-transparent"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
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
                    {services
                        .filter(
                            (service) =>
                                (service.custom_name && service.custom_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                (service.name && service.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())),
                        )
                        .map((service, index) => (
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
                                        <BanknotesIcon className="h-5 w-5 mr-3 text-[#9e2a2f] group-hover:scale-110 transition-transform duration-300" />
                                        <span>
                      Preu: {service.price_per_unit} €/{service.unit}
                    </span>
                                    </div>
                                    {service.min_price && (
                                        <div className="flex items-center text-gray-700 group">
                                            <BanknotesIcon className="h-5 w-5 mr-3 text-[#9e2a2f] group-hover:scale-110 transition-transform duration-300" />
                                            <span>Preu mínim: {service.min_price} €</span>
                                        </div>
                                    )}
                                    {service.max_price && (
                                        <div className="flex items-center text-gray-700 group">
                                            <BanknotesIcon className="h-5 w-5 mr-3 text-[#9e2a2f] group-hover:scale-110 transition-transform duration-300" />
                                            <span>Preu màxim: {service.max_price} €</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleEditService(service.service_id)}
                                        className="inline-flex items-center px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium transition-all duration-300 hover:bg-indigo-100 hover:shadow-md"
                                    >
                                        <PencilSquareIcon className="h-4 w-4 mr-2" />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => setSelectedService(service)}
                                        className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
                                    >
                                        <InformationCircleIcon className="h-4 w-4 mr-2" />
                                        Info
                                    </button>
                                    <button
                                        onClick={() => handleDeleteService(service.id)}
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

            {/* Modal de Detall del Servei */}
            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
                    <div
                        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 animate-scaleIn space-y-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center">
                                <WrenchScrewdriverIcon className="h-10 w-10 text-[#9e2a2f]" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 pt-8 text-center">Informació del Servei</h3>
                        </div>

                        <div className="space-y-3 divide-y divide-gray-100">
                            <div className="py-2 flex">
                                <span className="font-medium w-1/3 text-gray-500">Nom:</span>
                                <span className="w-2/3">{selectedService.custom_name || selectedService.name}</span>
                            </div>
                            {selectedService.description && (
                                <div className="py-2 flex">
                                    <span className="font-medium w-1/3 text-gray-500">Descripció:</span>
                                    <span className="w-2/3">{selectedService.description}</span>
                                </div>
                            )}
                            {selectedService.unit && (
                                <div className="py-2 flex">
                                    <span className="font-medium w-1/3 text-gray-500">Unitat:</span>
                                    <span className="w-2/3">{selectedService.unit}</span>
                                </div>
                            )}
                            {selectedService.price_per_unit && (
                                <div className="py-2 flex">
                                    <span className="font-medium w-1/3 text-gray-500">Preu per unitat:</span>
                                    <span className="w-2/3">{selectedService.price_per_unit} €</span>
                                </div>
                            )}
                            {selectedService.min_price && (
                                <div className="py-2 flex">
                                    <span className="font-medium w-1/3 text-gray-500">Preu mínim:</span>
                                    <span className="w-2/3">{selectedService.min_price} €</span>
                                </div>
                            )}
                            {selectedService.max_price && (
                                <div className="py-2 flex">
                                    <span className="font-medium w-1/3 text-gray-500">Preu màxim:</span>
                                    <span className="w-2/3">{selectedService.max_price} €</span>
                                </div>
                            )}
                            {selectedService.type && (
                                <div className="py-2 flex">
                                    <span className="font-medium w-1/3 text-gray-500">Tipus:</span>
                                    <span className="w-2/3">{selectedService.type}</span>
                                </div>
                            )}
                            {selectedService.completedProjects && (
                                <div className="py-2 flex">
                                    <span className="font-medium w-1/3 text-gray-500">Projectes completats:</span>
                                    <span className="w-2/3">{selectedService.completedProjects}</span>
                                </div>
                            )}
                            {selectedService.averageRating && (
                                <div className="py-2 flex">
                                    <span className="font-medium w-1/3 text-gray-500">Valoració mitjana:</span>
                                    <span className="w-2/3">{selectedService.averageRating} / 5</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setSelectedService(null)}
                                className="px-6 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                            >
                                Tancar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmació d'eliminació de servei */}
            {showServiceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity animate-fadeIn">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 animate-scaleIn">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-100">
                            <TrashIcon className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Eliminar Servei</h3>
                        <p className="text-gray-600 mb-6 text-center">
                            Estàs segur que vols eliminar aquest servei? Aquesta acció no es pot desfer.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={cancelDeleteService}
                                className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium transition-all duration-300 hover:bg-gray-200 transform hover:scale-105"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={confirmDeleteService}
                                className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium transition-all duration-300 hover:bg-red-700 transform hover:scale-105"
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
