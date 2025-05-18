import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx";

const UsersCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'company', // Valor per defecte
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('administrator.users.store'));
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
                            {/* Nom */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nom
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

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Contrasenya */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contrasenya
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirmar Contrasenya */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirmar Contrasenya
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                            </div>

                            {/* Rol */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Rol
                                </label>
                                <select
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                >
                                    <option value="company">Empresa</option>
                                    <option value="admin">Administrador</option>
                                    <option value="worker">Worker</option>
                                </select>
                                {errors.role && (
                                    <p className="mt-2 text-sm text-red-600">{errors.role}</p>
                                )}
                            </div>

                            {/* Botons */}
                            <div className="flex justify-end gap-4">
                                <Link
                                    href={route('administrator.users.index')}
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
            <Footer/>
        </div>
    );
};

export default UsersCreate;
