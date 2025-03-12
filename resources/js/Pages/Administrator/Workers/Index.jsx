import React from 'react';
import { Link } from '@inertiajs/react';

const WorkersIndex = ({ workers }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Capçalera amb botons de navegació */}
            <section className="w-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Gestió de Workers
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Llista de tots els workers disponibles
                    </p>

                    {/* Botons de navegació */}
                    <div className="flex justify-center gap-4">
                        <Link
                            href={route('administrator.users.index')}
                            className={`
                                bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300
                                border border-white/20 hover:border-white/40
                                shadow-sm hover:shadow-md
                                ${route().current('administrator.users.index') ?
                                'bg-gradient-to-r from-[#3b82f6] to-[#1e40af] border-white/40 shadow-lg' :
                                'hover:bg-gradient-to-r hover:from-[#3b82f6]/20 hover:to-[#1e40af]/20'
                            }
                            `}
                        >
                            Usuaris
                        </Link>
                        <Link
                            href={route('administrator.services.index')}
                            className={`
                                bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300
                                border border-white/20 hover:border-white/40
                                shadow-sm hover:shadow-md
                                ${route().current('administrator.services.index') ?
                                'bg-gradient-to-r from-[#3b82f6] to-[#1e40af] border-white/40 shadow-lg' :
                                'hover:bg-gradient-to-r hover:from-[#3b82f6]/20 hover:to-[#1e40af]/20'
                            }
                            `}
                        >
                            Serveis
                        </Link>
                        <Link
                            href={route('administrator.workers.index')}
                            className={`
                                bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300
                                border border-white/20 hover:border-white/40
                                shadow-sm hover:shadow-md
                                ${route().current('administrator.workers.index') ?
                                'bg-gradient-to-r from-[#3b82f6] to-[#1e40af] border-white/40 shadow-lg' :
                                'hover:bg-gradient-to-r hover:from-[#3b82f6]/20 hover:to-[#1e40af]/20'
                            }
                            `}
                        >
                            Workers
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Botó de Crear */}
                    <div className="flex justify-end mb-6">
                        <Link
                            href={route('administrator.workers.create')}
                            className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300"
                        >
                            Crear Worker
                        </Link>
                    </div>

                    {/* Llista de workers */}
                    <div className="space-y-4">
                        {workers.map(worker => (
                            <div key={worker.id} className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {worker.name}
                                </h3>
                                <p className="text-gray-600">
                                    <strong>Horari:</strong> {worker.schedule}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Adreça:</strong> {worker.address}, {worker.city}, {worker.state} {worker.zip_code}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Telèfon:</strong> {worker.phone}
                                </p>
                                <div className="mt-2 flex gap-2">
                                    <Link
                                        href={route('administrator.workers.show', worker.id)}
                                        className="text-[#1e40af] hover:text-[#3b82f6]"
                                    >
                                        Veure
                                    </Link>
                                    <Link
                                        href={route('administrator.workers.edit', worker.id)}
                                        className="text-[#1e40af] hover:text-[#3b82f6]"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(worker.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkersIndex;
