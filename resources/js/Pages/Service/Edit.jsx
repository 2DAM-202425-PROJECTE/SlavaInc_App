// resources/js/Pages/Service/Edit.jsx

import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Header from "@/Components/Header.jsx";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Edit() {
    const { service, company } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        price_per_unit: service.pivot?.price_per_unit || "",
        unit: service.pivot?.unit || "",
        min_price: service.pivot?.min_price || "",
        max_price: service.pivot?.max_price || "",
        logo: service.pivot?.logo || ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("company.services.update", service.id));
    };

    return (
        <div className="min-h-screen bg-gray-50">
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
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">
                            Editar Servei: {service.name}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Preu per unitat (€)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.price_per_unit}
                                    onChange={(e) => setData("price_per_unit", e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                />
                                {errors.price_per_unit && <p className="text-red-600 text-sm mt-1">{errors.price_per_unit}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Unitat (m², h, etc.)
                                </label>
                                <input
                                    type="text"
                                    value={data.unit}
                                    onChange={(e) => setData("unit", e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                />
                                {errors.unit && <p className="text-red-600 text-sm mt-1">{errors.unit}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preu mínim (€)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.min_price}
                                        onChange={(e) => setData("min_price", e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    />
                                    {errors.min_price && <p className="text-red-600 text-sm mt-1">{errors.min_price}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preu màxim (€)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.max_price}
                                        onChange={(e) => setData("max_price", e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    />
                                    {errors.max_price && <p className="text-red-600 text-sm mt-1">{errors.max_price}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Logo (URL)
                                </label>
                                <input
                                    type="text"
                                    value={data.logo}
                                    onChange={(e) => setData("logo", e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                />
                                {errors.logo && <p className="text-red-600 text-sm mt-1">{errors.logo}</p>}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 px-6 rounded-lg bg-[#9e2a2f] text-white font-semibold hover:bg-[#8a1e25] transition-all shadow-md hover:shadow-lg"
                                >
                                    Desar Canvis
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
