import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx";

const WorkersEdit = ({ worker, companies }) => {
    const { data, setData, put, processing, errors } = useForm({
        company_id: worker.company_id,
        name: worker.name,
        email: worker.email,
        password: '',
        password_confirmation: '',
        schedule: worker.schedule,
        address: worker.address,
        city: worker.city,
        state: worker.state,
        zip_code: worker.zip_code,
        phone: worker.phone,
        status: worker.status || 'active',
        is_admin: worker.is_admin || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('administrator.workers.update', worker.id));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Treballador</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Companyia */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Companyia <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.company_id}
                                    onChange={(e) => setData('company_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                >
                                    <option value="">Selecciona una companyia</option>
                                    {companies.map(company => (
                                        <option key={company.id} value={company.id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.company_id && (
                                    <p className="mt-2 text-sm text-red-600">{errors.company_id}</p>
                                )}
                            </div>

                            {/* Nom del worker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nom del Treballador <span className="text-red-500">*</span>
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
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    El correu ha de ser únic en tot el sistema (no pot existir a usuaris, treballadors, empreses o administradors).
                                </p>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Contrasenya */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contrasenya (deixa en blanc si no vols canviar-la)
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Mínim 8 caràcters.
                                </p>
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
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Horari */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Horari <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.schedule}
                                    onChange={(e) => setData('schedule', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                    placeholder="Ex: Dilluns a Divendres, 9:00 - 18:00"
                                />
                                {errors.schedule && (
                                    <p className="mt-2 text-sm text-red-600">{errors.schedule}</p>
                                )}
                            </div>

                            {/* Adreça */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Adreça <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.address && (
                                    <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                                )}
                            </div>

                            {/* Ciutat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Ciutat <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.city && (
                                    <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                                )}
                            </div>

                            {/* Estat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Estat <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.state}
                                    onChange={(e) => setData('state', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.state && (
                                    <p className="mt-2 text-sm text-red-600">{errors.state}</p>
                                )}
                            </div>

                            {/* Codi Postal */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Codi Postal <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.zip_code}
                                    onChange={(e) => setData('zip_code', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.zip_code && (
                                    <p className="mt-2 text-sm text-red-600">{errors.zip_code}</p>
                                )}
                            </div>

                            {/* Telèfon */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Telèfon <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.phone && (
                                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                                )}
                            </div>

                            {/* Estat (Actiu/Inactiu) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Estat del Treballador
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="active"
                                            checked={data.status === 'active'}
                                            onChange={() => setData('status', 'active')}
                                            className="form-radio h-4 w-4 text-[#1e40af] border-gray-300 focus:ring-[#1e40af]"
                                        />
                                        <span className="ml-2 text-gray-700">Actiu</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="inactive"
                                            checked={data.status === 'inactive'}
                                            onChange={() => setData('status', 'inactive')}
                                            className="form-radio h-4 w-4 text-[#1e40af] border-gray-300 focus:ring-[#1e40af]"
                                        />
                                        <span className="ml-2 text-gray-700">Inactiu</span>
                                    </label>
                                </div>
                                {errors.status && (
                                    <p className="mt-2 text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>

                            {/* És Administrador */}
                            <div>
                                <div className="flex items-center">
                                    <input
                                        id="is_admin"
                                        type="checkbox"
                                        checked={data.is_admin}
                                        onChange={(e) => setData('is_admin', e.target.checked)}
                                        className="h-4 w-4 text-[#1e40af] border-gray-300 rounded focus:ring-[#1e40af]"
                                    />
                                    <label htmlFor="is_admin" className="ml-2 block text-sm text-gray-700">
                                        És administrador de la companyia
                                    </label>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Els administradors tenen permisos addicionals dins de la seva companyia.
                                </p>
                                {errors.is_admin && (
                                    <p className="mt-2 text-sm text-red-600">{errors.is_admin}</p>
                                )}
                            </div>

                            {/* Botons del formulari */}
                            <div className="flex justify-end gap-4 pt-4">
                                <Link
                                    href={route('administrator.workers.index')}
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

export default WorkersEdit;
