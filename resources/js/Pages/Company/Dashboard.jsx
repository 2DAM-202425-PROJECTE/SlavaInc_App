import React, { useState } from "react"
import { usePage, router } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {
    PlusIcon,
    UsersIcon,
    BuildingOffice2Icon,
    PhoneIcon,
    MapPinIcon,
    PencilSquareIcon,
    TrashIcon,
    WrenchScrewdriverIcon,
    ClockIcon,
    BanknotesIcon,
} from "@heroicons/react/24/outline"
import Header from "@/Components/Header.jsx";

export default function Dashboard() {
    const { companyData } = usePage().props
    const companyInfo = companyData.company_details.info
    const workers = companyData.company_details.workers
    const services = companyData.company_details.services || []

    const [showWorkerModal, setShowWorkerModal] = useState(false)
    const [workerToDelete, setWorkerToDelete] = useState(null)
    const [selectedWorker, setSelectedWorker] = useState(null)
    const [selectedService, setSelectedService] = useState(null)

    const [showServiceModal, setShowServiceModal] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState(null)

    // Worker management functions
    const handleAddWorker = () => {
        router.get(route("worker.create"))
    }

    const handleListWorkers = () => {
        router.get(route("worker.list"))
    }

    const handleEditWorker = (workerId) => {
        router.get(route("worker.edit", workerId))
    }

    const handleDeleteWorker = (workerId) => {
        setWorkerToDelete(workerId)
        setShowWorkerModal(true)
    }

    const handleViewWorkerInfo = (workerId) => {
        // If you want to open a modal to show detailed info
        const worker = workers.find(w => w.id === workerId);
        setSelectedWorker(worker);
    }

    const confirmDeleteWorker = () => {
        if (workerToDelete) {
            router.delete(route("worker.destroy", workerToDelete))
        }
        setShowWorkerModal(false)
    }

    const cancelDeleteWorker = () => {
        setShowWorkerModal(false)
    }

    // Service management functions
    const handleAddService = () => {
        router.get(route("company.services.create"))
    }

    const handleListServices = () => {
        router.get(route("company.services.index"))
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
            router.delete(route("company.services.destroy", serviceToDelete));
        }
        setShowServiceModal(false);
    }


    const cancelDeleteService = () => {
        setShowServiceModal(false)
    }



    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#600f0f] to-[#b81b1b] text-white" />
            {/* Hero Section with Gradient Background */}
            <section className="relative w-full bg-gradient-to-br from-[#9e2a2f] via-[#b83e43] to-[#9e2a2f] py-16 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjMDAwIiBvcGFjaXR5PSIuMDUiIGQ9Ik0wIDBoMTQ0MHY3NjBIMHoiLz48cGF0aCBkPSJNLTcwLjUgNDg5LjVjMTkuMzMzLTI0LjY2NyA0MC42NjctNDQgNjQtNTggNzAtNDIgMTE3IDAgMTY4IDMyIDUxLjMzMyAzMiAxMDIuNjY3IDI4IDE1NC0xMiA1MS4zMzMtNDAgMTAyLjY2Ny01MiAxNTQtMzYgNTEuMzMzIDE2IDEwMi42NjcgNjggMTU0IDE1NiA1MS4zMzMgODggMTAyLjY2NyAxMzIgMTU0IDEzMiA1MS4zMzMgMCAxMDIuNjY3LTQ0IDE1NC0xMzIgNTEuMzMzLTg4IDEwMi42NjctMTQwIDE1NC0xNTYgNTEuMzMzLTE2IDEwMi42NjcgNCAxNTQgNjAgNTEuMzMzIDU2IDEwMi42NjcgNzYgMTU0IDYwIDUxLjMzMy0xNiAxMDIuNjY3LTY4IDE1NC0xNTYgNTEuMzMzLTg4IDEwMi42NjctMTMyIDE1NC0xMzIgNTEuMzMzIDAgMTAyLjY2NyA0NCAxNTQgMTMyIDUxLjMzMyA4OCAxMDIuNjY3IDE0MCAxNTQgMTU2IDUxLjMzMyAxNiAxMDIuNjY3LTQgMTU0LTYwIDUxLjMzMy01NiAxMDIuNjY3LTc2IDE1NC02MCIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')]"></div>
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        Benvingut, {companyData.user_info.name}!
                    </h1>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Gestiona la teva empresa, treballadors i serveis fàcilment des d'un sol lloc
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleAddWorker}
                            className="inline-flex items-center px-6 py-3 rounded-full border-2 bg-white text-[#9e2a2f] border-white font-bold transition-all hover:bg-transparent hover:text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Afegir Treballador
                        </button>
                        <button
                            onClick={handleAddService}
                            className="inline-flex items-center px-6 py-3 rounded-full border-2 bg-transparent text-white border-white font-bold transition-all hover:bg-white hover:text-[#9e2a2f] shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Afegir Servei
                        </button>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Company Info Card */}
                <div className="mb-12 bg-white overflow-hidden rounded-2xl shadow-xl border border-gray-100">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Informació de l'Empresa</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#9e2a2f]/10">
                                    <BuildingOffice2Icon className="h-6 w-6 text-[#9e2a2f]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Adreça</p>
                                    <p className="text-lg font-semibold text-gray-800">{companyInfo.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#9e2a2f]/10">
                                    <MapPinIcon className="h-6 w-6 text-[#9e2a2f]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Ciutat</p>
                                    <p className="text-lg font-semibold text-gray-800">{companyInfo.city}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#9e2a2f]/10">
                                    <PhoneIcon className="h-6 w-6 text-[#9e2a2f]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Telèfon</p>
                                    <p className="text-lg font-semibold text-gray-800">{companyInfo.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Treballadors Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                            <UsersIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                            Treballadors
                        </h2>
                        <button
                            onClick={handleAddWorker}
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all hover:bg-[#8a2329] shadow-md hover:shadow-lg"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Nou Treballador
                        </button>
                    </div>

                    {workers.length > 0 ? (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {workers.slice(0, 3).map((worker) => (
                                    <div
                                        key={worker.id}
                                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center mr-4">
                                                <span className="text-xl font-bold text-[#9e2a2f]">{worker.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xl text-gray-900">{worker.name}</h3>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center text-gray-700">
                                                <ClockIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                                <span>{worker.schedule}</span>
                                            </div>
                                            <div className="flex items-center text-gray-700">
                                                <PhoneIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                                <span>{worker.phone}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 space-x-4">
                                            <button
                                                onClick={() => handleEditWorker(worker.id)}
                                                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium transition-all hover:bg-indigo-100"
                                            >
                                                <PencilSquareIcon className="h-4 w-4 mr-2" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleViewWorkerInfo(worker.id)}
                                                className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium transition-all hover:bg-blue-100"
                                            >
                                                <UsersIcon className="h-4 w-4 mr-2" />
                                                Info
                                            </button>
                                            <button
                                                onClick={() => handleDeleteWorker(worker.id)}
                                                className="inline-flex items-center px-4 py-2 rounded-lg bg-red-50 text-red-700 font-medium transition-all hover:bg-red-100"
                                            >
                                                <TrashIcon className="h-4 w-4 mr-2" />
                                                Eliminar
                                            </button>

                                        </div>


                                    </div>
                                ))}
                            </div>
                            {workers.length > 3 && (
                                <div className="mt-6 text-center col-span-full flex justify-center">
                                    <button
                                        onClick={handleListWorkers}
                                        className="px-5 py-2.5 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all hover:bg-[#8a2329] shadow-md hover:shadow-lg"
                                    >
                                        Veure més
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                                <UsersIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No hi ha treballadors registrats</h2>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                Afegeix el teu primer treballador per començar a gestionar el teu equip
                            </p>
                            <button
                                onClick={handleAddWorker}
                                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all hover:bg-[#8a2329] shadow-md hover:shadow-lg"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Afegir Treballador
                            </button>
                        </div>
                    )}
                </div>

                    {/* Serveis Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                            <WrenchScrewdriverIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                            Serveis
                        </h2>
                        <button
                            onClick={handleAddService}
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all hover:bg-[#8a2329] shadow-md hover:shadow-lg"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Nou Servei
                        </button>
                    </div>

                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.slice(0, 3).map((service) => (
                                <div
                                    key={`company-service-${service.pivot?.id || service.id}`}
                                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-xl text-gray-900">{service.name}</h3>
                                        <div className="px-3 py-1 rounded-full bg-[#9e2a2f]/10 text-[#9e2a2f] font-semibold text-sm">
                                            {service.price} €
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-gray-700">
                                            <ClockIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                            <span>{service.duration || "Duració variable"}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <BanknotesIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                            <span>Preu: {service.price} €</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => handleEditService(service.id)}
                                            className="inline-flex items-center px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium transition-all hover:bg-indigo-100"
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
                                            className="inline-flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-700 font-medium transition-all hover:bg-red-100"
                                        >
                                            <TrashIcon className="h-4 w-4 mr-2" />
                                            Eliminar
                                        </button>
                                    </div>

                                </div>

                            ))}
                            {services.length > 3 && (
                                <div key="view-more-button" className="flex justify-center col-span-full">
                                    <button
                                        onClick={handleListServices}
                                        className="px-5 py-2.5 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all hover:bg-[#8a2329] shadow-md hover:shadow-lg"
                                    >
                                        Veure més
                                    </button>
                                </div>
                            )}

                        </div>


                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                                <WrenchScrewdriverIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No hi ha serveis registrats</h2>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                Afegeix el teu primer servei per començar a gestionar la teva oferta
                            </p>
                            <button
                                onClick={handleAddService}
                                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all hover:bg-[#8a2329] shadow-md hover:shadow-lg"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Afegir Servei
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Detall del Treballador */}
            {selectedWorker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Informació Personal de {selectedWorker.name}</h3>
                        {/* Informació personal */}
                        <p><strong>Nom:</strong> {selectedWorker.name}</p>
                        <p><strong>Telèfon:</strong> {selectedWorker.phone}</p>
                        <p><strong>Horari:</strong> {selectedWorker.schedule}</p>
                        <p><strong>Correu Electrònic:</strong> {selectedWorker.email}</p>
                        <p><strong>Adreça:</strong> {selectedWorker.address}</p>
                        <p><strong>Ciutat:</strong> {selectedWorker.city}</p>
                        <p><strong>Província:</strong> {selectedWorker.state}</p>
                        <p><strong>Codi Postal:</strong> {selectedWorker.zip_code}</p>



                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setSelectedWorker(null)}
                                className="px-6 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-800"
                            >
                                Tancar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmació per esborrar treballador */}
            {showWorkerModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Estàs segur que vols eliminar aquest treballador?</h3>
                        <div className="flex justify-between">
                            <button
                                onClick={cancelDeleteWorker}
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={confirmDeleteWorker}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal de confirmació d'eliminació de servei */}
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

