import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
        password: '',   // Afegit per al password
        company_id: '', // Afegit per al company_id
        is_admin: false, // Afegit per al camp is_admin, tot i que serà false per defecte
    });

    // Gestionar el submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Optional: Especifica automàticament el company_id per a l'empresa actual
        setData('company_id', window.CompanyId);  // Supon que `CompanyId` és un valor passat pel backend
        post(route('worker.store'));
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-4 text-white">Afegir Treballador</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correu electrònic</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Horari</label>
                        <input
                            type="text"
                            value={data.schedule}
                            onChange={(e) => setData('schedule', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                            required
                        />
                        {errors.schedule && <p className="text-red-500 text-sm">{errors.schedule}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Adreça</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                            required
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ciutat</label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                                required
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estat</label>
                            <input
                                type="text"
                                value={data.state}
                                onChange={(e) => setData('state', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                                required
                            />
                            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Codi Postal</label>
                        <input
                            type="text"
                            value={data.zip_code}
                            onChange={(e) => setData('zip_code', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                            required
                        />
                        {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telèfon</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                            required
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contrasenya</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-[#9e2a2f] text-white p-3 rounded-lg shadow-sm hover:bg-[#9e2a2f]/90 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9e2a2f]"
                            disabled={processing}
                        >
                            {processing ? 'Guardant...' : 'Afegir Treballador'}
                        </button>
                    </div>
                </form>

                {/* Resumen de errors */}
                {Object.keys(errors).length > 0 && (
                    <div className="mt-6 bg-red-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-sm font-bold text-red-600">Errors en el formulari:</h2>
                        <ul className="list-inside text-red-600">
                            {Object.values(errors).map((error, index) => (
                                <li key={index} className="text-sm">{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
