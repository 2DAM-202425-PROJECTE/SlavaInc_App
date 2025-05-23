import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx";


const ServicesEdit = ({ service }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: service.name,
        description: service.description,
        type: service.type,
    });

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('administrator.services.update', service.id));
    };

    const handleDelete = () => {
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        // Elimina el servei
        usePage().props.inertia.delete(route('administrator.services.destroy', service.id));
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Nom del servei */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nom del Servei
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Descripció del servei */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Descripció
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Tipus de servei */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tipus de Servei
                                </label>
                                <input
                                    type="text"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.type && (
                                    <p className="mt-2 text-sm text-red-600">{errors.type}</p>
                                )}
                            </div>

                            {/* Botons */}
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium"
                                >
                                    Eliminar
                                </button>
                                <Link
                                    href={route('administrator.services.index')}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2.5 rounded-lg font-medium"
                                >
                                    Cancel·lar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-5 py-2.5 rounded-lg font-medium"
                                >
                                    {processing ? 'Guardant...' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Diàleg de confirmació per eliminar */}
            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Eliminar Servei
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols eliminar aquest servei? Aquesta acció no es pot desfer.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2.5 rounded-lg font-medium"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default ServicesEdit;
