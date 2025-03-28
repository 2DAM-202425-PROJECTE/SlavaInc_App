import React from 'react';
import { Link } from '@inertiajs/react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";

const WorkersShow = ({ worker }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            {/* Capçalera amb botons de navegació */}
            <section className="w-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Detalls del Worker
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Informació completa del worker
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
                    <div className="space-y-6">
                        {/* Nom del worker */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Nom</h2>
                            <p className="text-gray-600">{worker.name}</p>
                        </div>

                        {/* Horari */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Horari</h2>
                            <p className="text-gray-600">{worker.schedule}</p>
                        </div>

                        {/* Adreça */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Adreça</h2>
                            <p className="text-gray-600">{worker.address}</p>
                        </div>

                        {/* Ciutat */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Ciutat</h2>
                            <p className="text-gray-600">{worker.city}</p>
                        </div>

                        {/* Estat */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Estat</h2>
                            <p className="text-gray-600">{worker.state}</p>
                        </div>

                        {/* Codi Postal */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Codi Postal</h2>
                            <p className="text-gray-600">{worker.zip_code}</p>
                        </div>

                        {/* Telèfon */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Telèfon</h2>
                            <p className="text-gray-600">{worker.phone}</p>
                        </div>

                        {/* Botons */}
                        <div className="flex justify-end gap-4">
                            <Link
                                href={route('administrator.workers.index')}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2.5 rounded-lg font-medium"
                            >
                                Tornar
                            </Link>
                            <Link
                                href={route('administrator.workers.edit', worker.id)}
                                className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-5 py-2.5 rounded-lg font-medium"
                            >
                                Editar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default WorkersShow;
