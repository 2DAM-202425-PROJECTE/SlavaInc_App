import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Header from "@/Components/HeaderCompany";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Edit() {
    const { service, companyService, company } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        price_per_unit: companyService.price_per_unit || "",
        unit: companyService.unit || "",
        min_price: companyService.min_price || "",
        max_price: companyService.max_price || "",
        logo: companyService.logo || "",
        custom_name: companyService.custom_name || "",
        custom_description: companyService.description || "",
    });


    const [selectedType, setSelectedType] = useState(service.type || null);

    useEffect(() => {
        setSelectedType(service.type);
    }, [service]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("company.services.update", companyService.id));
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Editar Servei: {service.name}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {selectedType === "altres" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nom del servei personalitzat
                                    </label>
                                    <input
                                        type="text"
                                        value={data.custom_name}
                                        onChange={(e) => setData("custom_name", e.target.value)}
                                        placeholder={service.pivot?.custom_name}
                                        className="w-full border-gray-300 rounded-lg shadow-sm"
                                    />
                                    {errors.custom_name &&
                                        <p className="text-red-600 text-sm mt-1">{errors.custom_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descripció
                                    </label>
                                    <textarea
                                        value={data.custom_description}
                                        onChange={(e) => setData("custom_description", e.target.value)}
                                        placeholder={service.pivot?.custom_description}
                                        className="w-full border-gray-300 rounded-lg shadow-sm"
                                        rows="4"
                                    />
                                    {errors.custom_description &&
                                        <p className="text-red-600 text-sm mt-1">{errors.custom_description}</p>}
                                </div>
                            </>
                        )}

                        {selectedType !== "altres" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preu per unitat (€)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price_per_unit}
                                        onChange={(e) => setData("price_per_unit", e.target.value)}
                                        placeholder={service.pivot?.price_per_unit}
                                        className="w-full border-gray-300 rounded-lg shadow-sm"
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
                                        placeholder={service.pivot?.unit}
                                        className="w-full border-gray-300 rounded-lg shadow-sm"
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
                                            placeholder={service.pivot?.min_price}
                                            className="w-full border-gray-300 rounded-lg shadow-sm"
                                        />
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
                                            placeholder={service.pivot?.max_price}
                                            className="w-full border-gray-300 rounded-lg shadow-sm"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 rounded-lg bg-[#9e2a2f] text-white font-semibold shadow-md"
                            >
                                Desar Canvis
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
