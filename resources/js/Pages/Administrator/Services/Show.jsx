import React from 'react';
import { Link } from '@inertiajs/react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx";

const ServicesShow = ({ service }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="space-y-6">
                        {/* Nom del servei */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Nom del Servei</h2>
                            <p className="text-gray-600">{service.name}</p>
                        </div>

                        {/* Descripció del servei */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Descripció</h2>
                            <p className="text-gray-600">{service.description}</p>
                        </div>

                        {/* Tipus de servei */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Tipus de Servei</h2>
                            <p className="text-gray-600">{service.type}</p>
                        </div>

                        {/* Botons */}
                        <div className="flex justify-end gap-4">
                            <Link
                                href={route('administrator.services.index')}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2.5 rounded-lg font-medium"
                            >
                                Tornar
                            </Link>
                            <Link
                                href={route('administrator.services.edit', service.id)}
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

export default ServicesShow;
