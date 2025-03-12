import React from 'react';
import { Link, useForm } from '@inertiajs/react';

const WorkersEdit = ({ worker, companies }) => {
    const { data, setData, put, processing, errors } = useForm({
        company_id: worker.company_id,
        name: worker.name,
        schedule: worker.schedule,
        address: worker.address,
        city: worker.city,
        state: worker.state,
        zip_code: worker.zip_code,
        phone: worker.phone,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('administrator.workers.update', worker.id));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Capçalera amb botons de navegació */}
            <section className="w-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Editar Worker
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Modifica les dades del worker
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
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Companyia */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Companyia
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
                                    Nom del Worker
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

                            {/* Horari */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Horari
                                </label>
                                <input
                                    type="text"
                                    value={data.schedule}
                                    onChange={(e) => setData('schedule', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e40af] focus:ring-[#1e40af] sm:text-sm"
                                />
                                {errors.schedule && (
                                    <p className="mt-2 text-sm text-red-600">{errors.schedule}</p>
                                )}
                            </div>

                            {/* Adreça */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Adreça
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
                                    Ciutat
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
                                    Estat
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
                                    Codi Postal
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
                                    Telèfon
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

                            {/* Botons del formulari */}
                            <div className="flex justify-end gap-4">
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
        </div>
    );
};

export default WorkersEdit;
