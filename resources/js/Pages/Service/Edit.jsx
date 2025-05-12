// resources/js/Pages/Service/Edit.jsx

import React, { useState } from "react"
import { useForm, usePage, router } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Header from "@/Components/Header.jsx"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function Edit() {
    const { service, company } = usePage().props

    const { data, setData, put, processing, errors } = useForm({
        price_per_unit: service.pivot?.price_per_unit || "",
        unit: service.pivot?.unit || "",
        min_price: service.pivot?.min_price || "",
        max_price: service.pivot?.max_price || "",
        logo: service.pivot?.logo || ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route("company.services.update", service.id))
    }

    return (
        <AuthenticatedLayout>
            <Header theme="bg-gradient-to-r from-[#600f0f] to-[#b81b1b] text-white" />

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="text-[#9e2a2f] hover:text-[#7d1f24] flex items-center"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Tornar
                    </button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Servei: {service.name}</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preu per unitat</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price_per_unit}
                                onChange={(e) => setData("price_per_unit", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                            />
                            {errors.price_per_unit && <p className="text-red-500 text-sm">{errors.price_per_unit}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Unitat</label>
                            <input
                                type="text"
                                value={data.unit}
                                onChange={(e) => setData("unit", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                            />
                            {errors.unit && <p className="text-red-500 text-sm">{errors.unit}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preu mínim</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.min_price}
                                onChange={(e) => setData("min_price", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                            />
                            {errors.min_price && <p className="text-red-500 text-sm">{errors.min_price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preu màxim</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.max_price}
                                onChange={(e) => setData("max_price", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                            />
                            {errors.max_price && <p className="text-red-500 text-sm">{errors.max_price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Logo (URL)</label>
                            <input
                                type="text"
                                value={data.logo}
                                onChange={(e) => setData("logo", e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                            />
                            {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#9e2a2f] hover:bg-[#821d24] text-white font-semibold py-3 px-6 rounded-lg shadow-md"
                            >
                                Desar Canvis
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
