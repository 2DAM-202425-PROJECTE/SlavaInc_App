"use client"

import { useState } from "react"
import { router } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import { Building, Mail, Phone, MapPin, Lock, ArrowLeft, Upload, X, Check, AlertCircle } from 'lucide-react'

const CompaniesCreate = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
        logo: null,
    })
    const [errors, setErrors] = useState({})
    const [logoPreview, setLogoPreview] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData((prev) => ({
                ...prev,
                logo: file,
            }))

            // Create preview
            const reader = new FileReader()
            reader.onload = (e) => {
                setLogoPreview(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeLogo = () => {
        setFormData((prev) => ({
            ...prev,
            logo: null,
        }))
        setLogoPreview(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Create FormData object for file upload
        const submitData = new FormData()
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                submitData.append(key, formData[key])
            }
        })

        router.post('/administrator/companies', submitData, {
            onError: (errors) => {
                setErrors(errors)
                window.scrollTo(0, 0)
            },
            forceFormData: true
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header amb títol */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.visit("/administrator/companies")}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <ArrowLeft size={20} className="text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Crear Empresa</h1>
                                <p className="text-gray-500 mt-1">Afegeix una nova empresa al sistema</p>
                            </div>
                        </div>
                    </div>

                    {/* Errors de validació */}
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded-md">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                <div>
                                    <h3 className="text-red-800 font-medium">Hi ha errors al formulari:</h3>
                                    <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                                        {Object.entries(errors).map(([field, message]) => (
                                            <li key={field}>{message}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Formulari */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Informació bàsica */}
                            <div className="col-span-1 md:col-span-2">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Informació bàsica</h2>
                            </div>

                            {/* Nom */}
                            <div className="col-span-1 md:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom de l'empresa <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Nom de l'empresa"
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            errors.name ? "border-red-500" : "border-gray-300"
                                        }`}
                                        required
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="col-span-1">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="email@empresa.com"
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            errors.email ? "border-red-500" : "border-gray-300"
                                        }`}
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Telèfon */}
                            <div className="col-span-1">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Telèfon
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Telèfon de contacte"
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            errors.phone ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                )}
                            </div>

                            {/* Contrasenya */}
                            <div className="col-span-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contrasenya <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Contrasenya"
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            errors.password ? "border-red-500" : "border-gray-300"
                                        }`}
                                        required
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirmar Contrasenya */}
                            <div className="col-span-1">
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmar Contrasenya <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        placeholder="Confirmar contrasenya"
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            errors.password_confirmation ? "border-red-500" : "border-gray-300"
                                        }`}
                                        required
                                    />
                                </div>
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Adreça */}
                            <div className="col-span-1 md:col-span-2 pt-4">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Adreça</h2>
                            </div>

                            {/* Adreça */}
                            <div className="col-span-1 md:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Adreça
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Adreça completa"
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            errors.address ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                </div>
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                                )}
                            </div>

                            {/* Ciutat */}
                            <div className="col-span-1">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ciutat
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Ciutat"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                        errors.city ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.city && (
                                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                )}
                            </div>

                            {/* Província */}
                            <div className="col-span-1">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                    Província
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Província"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                        errors.state ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.state && (
                                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                                )}
                            </div>

                            {/* Codi Postal */}
                            <div className="col-span-1">
                                <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                                    Codi Postal
                                </label>
                                <input
                                    type="text"
                                    id="zip_code"
                                    name="zip_code"
                                    value={formData.zip_code}
                                    onChange={handleChange}
                                    placeholder="Codi Postal"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                        errors.zip_code ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.zip_code && (
                                    <p className="mt-1 text-sm text-red-600">{errors.zip_code}</p>
                                )}
                            </div>

                            {/* Logo */}
                            <div className="col-span-1 md:col-span-2 pt-4">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Logo</h2>
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Logo de l'empresa
                                </label>
                                {!logoPreview ? (
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                        <div className="space-y-1 text-center">
                                            <div className="flex justify-center">
                                                <Building className="mx-auto h-12 w-12 text-gray-400" />
                                            </div>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="logo"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                                >
                                                    <span>Puja un logo</span>
                                                    <input
                                                        id="logo"
                                                        name="logo"
                                                        type="file"
                                                        accept="image/*"
                                                        className="sr-only"
                                                        onChange={handleLogoChange}
                                                    />
                                                </label>
                                                <p className="pl-1">o arrossega i deixa anar</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF fins a 2MB</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-1 flex items-center">
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                                            <img
                                                src={logoPreview || "/placeholder.svg"}
                                                alt="Logo preview"
                                                className="w-full h-full object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeLogo}
                                                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <label
                                            htmlFor="logo-change"
                                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
                                        >
                                            Canviar
                                            <input
                                                id="logo-change"
                                                name="logo"
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                                onChange={handleLogoChange}
                                            />
                                        </label>
                                    </div>
                                )}
                                {errors.logo && (
                                    <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
                                )}
                            </div>
                        </div>

                        {/* Botons */}
                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => router.visit("/administrator/companies")}
                                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                            >
                                Cancel·lar
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-[#1e40af] hover:bg-[#3b82f6] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <Check size={18} />
                                Crear Empresa
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CompaniesCreate
