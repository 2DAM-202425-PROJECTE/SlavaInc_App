import { useState } from "react"
import { router } from "@inertiajs/react"
import {
    WrenchScrewdriverIcon,
    BanknotesIcon,
    ClockIcon,
    PencilSquareIcon,
    TrashIcon,
    UsersIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline"

const ServiceList = ({ services, nextPageUrl }) => {
    const [loading, setLoading] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [showServiceModal, setShowServiceModal] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState(null)

    const handleLoadMore = () => {
        if (loading) return
        setLoading(true)
        router.get(nextPageUrl, {}, { onSuccess: () => setLoading(false) })
    }

    const handleEditService = (serviceId) => {
        router.get(`/services/${serviceId}/edit`)
    }

    const handleDeleteService = (pivotId) => {
        setServiceToDelete(pivotId)
        setShowServiceModal(true)
    }

    const confirmDeleteService = () => {
        if (serviceToDelete) {
            router.delete(`/company/services/pivot/${serviceToDelete}`)
        }
        setShowServiceModal(false)
    }

    const cancelDeleteService = () => {
        setShowServiceModal(false)
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
                <WrenchScrewdriverIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                Serveis
            </h2>

            {services.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.pivot?.id || service.id}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-xl text-gray-900">
                                    {service.pivot?.custom_name || service.name}
                                </h3>
                                {service.pivot?.price_per_unit && (
                                    <div className="px-3 py-1 rounded-full bg-[#9e2a2f]/10 text-[#9e2a2f] font-semibold text-sm">
                                        {service.pivot.price_per_unit} €
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 mb-6">
                                {service.pivot?.description && (
                                    <div className="flex items-center text-gray-700">
                                        <ClockIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                        <span>{service.pivot.description}</span>
                                    </div>
                                )}
                                {service.pivot?.unit && (
                                    <div className="flex items-center text-gray-700">
                                        <BanknotesIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                        <span>Unitat: {service.pivot.unit}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 space-x-4">
                                <button
                                    onClick={() => handleEditService(service.id)}
                                    className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium transition-all hover:bg-indigo-100"
                                >
                                    <PencilSquareIcon className="h-4 w-4 mr-2" />
                                    Editar
                                </button>
                                <button
                                    onClick={() => setSelectedService(service)}
                                    className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium transition-all hover:bg-blue-100"
                                >
                                    <UsersIcon className="h-4 w-4 mr-2" />
                                    Info
                                </button>
                                <button
                                    onClick={() => handleDeleteService(service.pivot.id)}
                                    className="inline-flex items-center px-4 py-2 rounded-lg bg-red-50 text-red-700 font-medium transition-all hover:bg-red-100"
                                >
                                    <TrashIcon className="h-4 w-4 mr-2" />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                        <WrenchScrewdriverIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No hi ha serveis disponibles</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        No s'han trobat serveis per mostrar en aquesta llista.
                    </p>
                </div>
            )}

            {nextPageUrl && (
                <div className="mt-10 text-center">
                    <button
                        onClick={handleLoadMore}
                        className="inline-flex items-center px-6 py-3 rounded-lg bg-[#9e2a2f] text-white font-medium transition hover:bg-[#8a2329] shadow-md hover:shadow-lg disabled:opacity-70"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Carregant...
                            </>
                        ) : (
                            <>
                                <ChevronDownIcon className="h-5 w-5 mr-2" />
                                Veure més serveis
                            </>
                        )}
                    </button>
                </div>
            )}

            {showServiceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
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
                                className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium transition-all hover:bg-gray-200"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={confirmDeleteService}
                                className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium transition-all hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all space-y-3">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                            Informació del Servei d'Empresa
                        </h3>
                        <div className="space-y-2">
                            <p><strong>Nom:</strong> {selectedService.pivot?.custom_name || selectedService.name}</p>
                            {selectedService.pivot?.description && (
                                <p><strong>Descripció:</strong> {selectedService.pivot.description}</p>
                            )}
                            {selectedService.pivot?.unit && (
                                <p><strong>Unitat:</strong> {selectedService.pivot.unit}</p>
                            )}
                            {selectedService.pivot?.price_per_unit && (
                                <p><strong>Preu per unitat:</strong> {selectedService.pivot.price_per_unit} €</p>
                            )}
                            {selectedService.pivot?.min_price && (
                                <p><strong>Preu mínim:</strong> {selectedService.pivot.min_price} €</p>
                            )}
                            {selectedService.pivot?.max_price && (
                                <p><strong>Preu màxim:</strong> {selectedService.pivot.max_price} €</p>
                            )}
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setSelectedService(null)}
                                className="px-6 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-800"
                            >
                                Tancar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ServiceList
