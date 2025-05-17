import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Header from '@/Components/Header.jsx';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function CreateWorker() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        schedule: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        phone: '',
        password: '',
        company_id: '',
        is_admin: false,
        status: 'active',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setData('company_id', window.CompanyId);
        post(route('worker.store'), {
            onSuccess: () => {
                console.log('Worker creat correctament!');
            },
            onError: (errors) => {
                console.error('Errors:', errors);
            },
        });
    };

    return (
        <div>
            <Header theme="bg-gradient-to-r from-[#600f0f] to-[#b81b1b] text-white" />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => window.history.back()}
                            className="text-[#9e2a2f] hover:text-[#600f0f] transition flex items-center"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Tornar enrere
                        </button>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Afegir Treballador</h2>

                        {errors.limit && (
                            <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
                                {errors.limit}
                            </div>
                        )}


                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    required
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Correu electrònic</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    required
                                />
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horari</label>
                                <input
                                    type="text"
                                    value={data.schedule}
                                    onChange={(e) => setData('schedule', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    required
                                />
                                {errors.schedule && <p className="text-red-600 text-sm mt-1">{errors.schedule}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adreça</label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    required
                                />
                                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciutat</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                        required
                                    />
                                    {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Província</label>
                                    <input
                                        type="text"
                                        value={data.state}
                                        onChange={(e) => setData('state', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                        required
                                    />
                                    {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Codi Postal</label>
                                <input
                                    type="text"
                                    value={data.zip_code}
                                    onChange={(e) => setData('zip_code', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    required
                                />
                                {errors.zip_code && <p className="text-red-600 text-sm mt-1">{errors.zip_code}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telèfon</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    required
                                />
                                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contrasenya</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    required
                                />
                                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estat</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                >
                                    <option value="active">Actiu</option>
                                    <option value="inactive">Inactiu</option>
                                </select>
                                {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 rounded-lg bg-[#9e2a2f] text-white font-semibold hover:bg-[#8a1e25] transition-all shadow-md hover:shadow-lg"
                                    disabled={processing}
                                >
                                    {processing ? 'Guardant...' : 'Afegir Treballador'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
