import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Header from "@/Components/HeaderCompany";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Create({ services, company }) {
    const { data, setData, post, processing, errors } = useForm({
        service_id: "",
        price_per_unit: "",
        unit: "",
        min_price: "",
        max_price: "",
        custom_name: "",
        custom_description: "",
    });

    const [selectedType, setSelectedType] = useState(null);

    const handleServiceChange = (e) => {
        const selectedId = e.target.value;
        setData("service_id", selectedId);
        const selectedService = services.find(s => String(s.id) === selectedId);
        setSelectedType(selectedService?.type || null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("company.services.store"));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#600f0f] to-[#b81b1b] text-white" />
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Afegir Servei a {company.name}</h2>

                    {errors.limit && (
                        <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
                            {errors.limit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Servei base</label>
                            <select
                                value={data.service_id}
                                onChange={handleServiceChange}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                required
                            >
                                <option value="">Selecciona un servei</option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            {errors.service_id && <p className="text-red-600 text-sm mt-1">{errors.service_id}</p>}
                        </div>

                        {selectedType === "altres" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom del servei personalitzat</label>
                                    <input
                                        type="text"
                                        value={data.custom_name}
                                        onChange={(e) => setData("custom_name", e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    />
                                    {errors.custom_name && <p className="text-red-600 text-sm mt-1">{errors.custom_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripció</label>
                                    <textarea
                                        value={data.custom_description}
                                        onChange={(e) => setData("custom_description", e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                        rows="4"
                                    />
                                    {errors.custom_description && <p className="text-red-600 text-sm mt-1">{errors.custom_description}</p>}
                                </div>
                            </>
                        )}

                        {selectedType !== "altres" && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preu per unitat (€)</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Unitat (m², h, etc.)</label>
                                        <input
                                            type="text"
                                            value={data.unit}
                                            onChange={(e) => setData("unit", e.target.value)}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                        />
                                        {errors.unit && <p className="text-red-600 text-sm mt-1">{errors.unit}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preu mínim (€)</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preu màxim (€)</label>
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
                            </>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 px-6 rounded-lg bg-[#9e2a2f] text-white font-semibold hover:bg-[#8a1e25] transition-all shadow-md hover:shadow-lg"
                            >
                                Guardar Servei
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
