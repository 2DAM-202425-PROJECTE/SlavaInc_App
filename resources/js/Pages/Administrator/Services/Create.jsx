import React from 'react';
import { Link, useForm } from '@inertiajs/react';

const ServicesCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        type: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('administrator.services.store'));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Crear Nou Servei
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Omple el formulari per afegir un nou servei
                    </p>
                </div>
            </section>

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
        </div>
    );
};

export default ServicesCreate;
