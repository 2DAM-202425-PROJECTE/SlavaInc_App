"use client"

import { useState } from "react"
import { useForm, router } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import { ArrowLeft, Plus, Save, X } from "lucide-react"

const CreatePlan = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "",
        features: [],
        max_workers: "",
        max_services: "",
        can_view_stats: false,
        extra_stats: false,
    })

    const [newFeature, setNewFeature] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        post("/admin/plans")
    }

    const addFeature = () => {
        if (newFeature.trim() !== "") {
            setData("features", [...data.features, newFeature.trim()])
            setNewFeature("")
        }
    }

    const removeFeature = (index) => {
        const updatedFeatures = [...data.features]
        updatedFeatures.splice(index, 1)
        setData("features", updatedFeatures)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header amb títol */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <button onClick={() => router.visit("/admin/plans")} className="p-2 rounded-full hover:bg-gray-100">
                                <ArrowLeft size={20} className="text-gray-500" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Crear Nou Pla</h1>
                                <p className="text-gray-500 mt-1">Afegeix un nou pla al sistema</p>
                            </div>
                        </div>
                    </div>

                    {/* Formulari */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nom del pla */}
                            <div className="col-span-1">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom del pla *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                                        errors.name ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Ex: Pla Bàsic"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Preu */}
                            <div className="col-span-1">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Preu (€) *
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="price"
                                        value={data.price}
                                        onChange={(e) => setData("price", e.target.value)}
                                        step="0.01"
                                        min="0"
                                        className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                                            errors.price ? "border-red-500" : "border-gray-300"
                                        }`}
                                        placeholder="0.00"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">€</span>
                                    </div>
                                </div>
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            </div>

                            {/* Màxim de treballadors */}
                            <div className="col-span-1">
                                <label htmlFor="max_workers" className="block text-sm font-medium text-gray-700 mb-1">
                                    Màxim de treballadors
                                </label>
                                <input
                                    type="number"
                                    id="max_workers"
                                    value={data.max_workers}
                                    onChange={(e) => setData("max_workers", e.target.value)}
                                    min="0"
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                                        errors.max_workers ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Deixa en blanc per il·limitat"
                                />
                                {errors.max_workers && <p className="mt-1 text-sm text-red-600">{errors.max_workers}</p>}
                                <p className="mt-1 text-xs text-gray-500">Deixa en blanc per permetre treballadors il·limitats</p>
                            </div>

                            {/* Màxim de serveis */}
                            <div className="col-span-1">
                                <label htmlFor="max_services" className="block text-sm font-medium text-gray-700 mb-1">
                                    Màxim de serveis
                                </label>
                                <input
                                    type="number"
                                    id="max_services"
                                    value={data.max_services}
                                    onChange={(e) => setData("max_services", e.target.value)}
                                    min="0"
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                                        errors.max_services ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Deixa en blanc per il·limitat"
                                />
                                {errors.max_services && <p className="mt-1 text-sm text-red-600">{errors.max_services}</p>}
                                <p className="mt-1 text-xs text-gray-500">Deixa en blanc per permetre serveis il·limitats</p>
                            </div>
                        </div>

                        {/* Opcions d'estadístiques */}
                        <div className="mt-6">
                            <h3 className="text-md font-medium text-gray-700 mb-3">Opcions d'estadístiques</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="can_view_stats"
                                        checked={data.can_view_stats}
                                        onChange={(e) => setData("can_view_stats", e.target.checked)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="can_view_stats" className="ml-2 block text-sm text-gray-700">
                                        Pot veure estadístiques bàsiques
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="extra_stats"
                                        checked={data.extra_stats}
                                        onChange={(e) => setData("extra_stats", e.target.checked)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="extra_stats" className="ml-2 block text-sm text-gray-700">
                                        Pot veure estadístiques avançades
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Característiques */}
                        <div className="mt-6">
                            <h3 className="text-md font-medium text-gray-700 mb-3">Característiques del pla</h3>

                            {/* Llista de característiques */}
                            <div className="mb-4">
                                {data.features.length > 0 ? (
                                    <ul className="space-y-2 mb-4">
                                        {data.features.map((feature, index) => (
                                            <li key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                                <span className="text-gray-700">{feature}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-sm mb-4">No s'han afegit característiques encara.</p>
                                )}
                            </div>

                            {/* Afegir característica */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Afegeix una característica"
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            addFeature()
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    <span>Afegir</span>
                                </button>
                            </div>
                        </div>

                        {/* Botons */}
                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => router.visit("/admin/plans")}
                                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                            >
                                Cancel·lar
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 bg-[#1e40af] hover:bg-[#3b82f6] text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Save size={16} />
                                <span>Guardar Pla</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CreatePlan
