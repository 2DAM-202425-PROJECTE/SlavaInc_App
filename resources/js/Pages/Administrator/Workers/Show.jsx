import React from 'react';
import { Link } from '@inertiajs/react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx";
import { Building, Calendar, Mail, Phone, MapPin, Clock, User, Shield, CheckCircle, XCircle } from 'lucide-react';

const WorkersShow = ({ worker }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Capçalera */}
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                <User size={32} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{worker.name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        worker.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {worker.status === 'active' ? (
                                            <CheckCircle size={14} className="mr-1" />
                                        ) : (
                                            <XCircle size={14} className="mr-1" />
                                        )}
                                        {worker.status === 'active' ? 'Actiu' : 'Inactiu'}
                                    </span>
                                    {worker.is_admin && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            <Shield size={14} className="mr-1" />
                                            Administrador
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Columna 1 - Informació personal */}
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Informació Personal</h2>

                                <div className="space-y-4">
                                    {/* Email */}
                                    <div className="flex items-start gap-3">
                                        <Mail size={18} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-700">Email</h3>
                                            <p className="text-gray-600">{worker.email}</p>
                                        </div>
                                    </div>

                                    {/* Telèfon */}
                                    <div className="flex items-start gap-3">
                                        <Phone size={18} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-700">Telèfon</h3>
                                            <p className="text-gray-600">{worker.phone}</p>
                                        </div>
                                    </div>

                                    {/* Horari */}
                                    <div className="flex items-start gap-3">
                                        <Clock size={18} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-700">Horari</h3>
                                            <p className="text-gray-600">{worker.schedule}</p>
                                        </div>
                                    </div>

                                    {/* Companyia */}
                                    {worker.company && (
                                        <div className="flex items-start gap-3">
                                            <Building size={18} className="text-gray-500 mt-0.5" />
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-700">Companyia</h3>
                                                <p className="text-gray-600">{worker.company.name}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Data de creació */}
                                    {worker.created_at && (
                                        <div className="flex items-start gap-3">
                                            <Calendar size={18} className="text-gray-500 mt-0.5" />
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-700">Data de creació</h3>
                                                <p className="text-gray-600">
                                                    {new Date(worker.created_at).toLocaleDateString('ca-ES', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Columna 2 - Adreça */}
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Adreça</h2>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-start gap-3 mb-4">
                                        <MapPin size={18} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="text-gray-700">{worker.address}</p>
                                            <p className="text-gray-700">{worker.city}, {worker.state}</p>
                                            <p className="text-gray-700">{worker.zip_code}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Estat i permisos */}
                                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-8">Estat i Permisos</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Estat:</span>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            worker.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {worker.status === 'active' ? 'Actiu' : 'Inactiu'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Administrador:</span>
                                        {worker.is_admin ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                <Shield size={14} className="mr-1" />
                                                Sí
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                No
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botons */}
                        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
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
