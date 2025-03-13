import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PlusIcon, UserGroupIcon, BuildingOfficeIcon, PhoneIcon, MapPinIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
    const { companyData } = usePage().props;
    const companyInfo = companyData.company_details.info;
    const workers = companyData.company_details.workers;

    const [showModal, setShowModal] = useState(false);
    const [workerToDelete, setWorkerToDelete] = useState(null);

    const handleAddWorker = () => {
        router.get(route('worker.create'));
    };

    const handleEditWorker = (workerId) => {
        router.get(route('worker.edit', workerId));
    };

    const handleDeleteWorker = (workerId) => {
        setWorkerToDelete(workerId);
        setShowModal(true);  // Mostrem la modal de confirmació
    };

    const confirmDeleteWorker = () => {
        if (workerToDelete) {
            router.delete(route('worker.destroy', workerToDelete)); // Enviem la petició DELETE
        }
        setShowModal(false);  // Tanquem la modal després de l'eliminació
    };

    const cancelDeleteWorker = () => {
        setShowModal(false);  // Tanquem la modal si es cancela
    };

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col min-h-screen bg-white">
                <section className="w-full bg-gradient-to-r from-[#9e2a2f] to-[#9e2a2f] py-12 px-6 flex-shrink-0">
                    <div className="max-w-6xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Benvingut, {companyData.user_info.name}!
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            Gestiona la teva empresa i treballadors fàcilment
                        </p>
                        <button
                            onClick={handleAddWorker}
                            className="inline-flex items-center px-5 py-2.5 rounded-full border-2 bg-white text-[#9e2a2f] border-white font-bold transition-all hover:bg-[#9e2a2f] hover:text-white"
                        >
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Afegir Treballador
                        </button>
                    </div>
                </section>

                <div className="flex-grow max-w-7xl mx-auto px-6 py-12">
                    <div className="mb-8 bg-white overflow-hidden shadow-lg sm:rounded-xl">
                        <div className="p-6 border-b border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                                    <span>{companyInfo.address}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                                    <span>{companyInfo.city}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                                    <span>{companyInfo.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-xl">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                <UserGroupIcon className="h-6 w-6 inline-block mr-2 text-[#9e2a2f]" />
                                Treballadors
                            </h2>
                            {workers.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {workers.map(worker => (
                                        <div key={worker.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                            <h3 className="font-medium text-lg text-gray-900 mb-2">{worker.name}</h3>
                                            <p className="text-gray-600 flex items-center">
                                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {worker.schedule}
                                            </p>
                                            <p className="text-gray-600 flex items-center mt-1">
                                                <PhoneIcon className="h-4 w-4 mr-2" />
                                                {worker.phone}
                                            </p>

                                            <div className="mt-4 flex space-x-4">
                                                <button
                                                    onClick={() => handleEditWorker(worker.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <PencilIcon className="h-5 w-5 inline-block mr-2" />
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteWorker(worker.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <TrashIcon className="h-5 w-5 inline-block mr-2" />
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-4">😕</div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                        No hi ha treballadors registrats
                                    </h2>
                                    <p className="text-gray-600">
                                        Afegeix un nou treballador per començar
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal de confirmació d'eliminació */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Estàs segur que vols eliminar aquest treballador?
                            </h3>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={cancelDeleteWorker}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel·lar
                                </button>
                                <button
                                    onClick={confirmDeleteWorker}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
