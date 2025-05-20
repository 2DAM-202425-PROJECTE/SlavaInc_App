import React from 'react';
import { Link } from '@inertiajs/react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx";

const AdminsShow = ({ admin }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="space-y-6">
                        {/* Nom */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Nom</h2>
                            <p className="text-gray-600">{admin.name}</p>
                        </div>

                        {/* Email */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Email</h2>
                            <p className="text-gray-600">{admin.email}</p>
                        </div>

                        {/* Data de creació */}
                        {admin.created_at && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700">Data de creació</h2>
                                <p className="text-gray-600">{new Date(admin.created_at).toLocaleDateString('ca-ES')}</p>
                            </div>
                        )}

                        {/* Botons */}
                        <div className="flex justify-end gap-4">
                            <Link
                                href={route('administrator.admins.index')}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2.5 rounded-lg font-medium"
                            >
                                Tornar
                            </Link>
                            <Link
                                href={route('administrator.admins.edit', admin.id)}
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

export default AdminsShow;
