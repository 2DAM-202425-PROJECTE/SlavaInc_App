"use client"

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import { Building, Briefcase, Tag, DollarSign, Package, ArrowLeft, Upload, X, Check, AlertCircle, ChevronDown } from 'lucide-react'

const CompanyServicesEdit = ({ companyService, companies, services }) => {
    const [formData, setFormData] = useState({
        company_id: companyService.company_id || "",
        service_id: companyService.service_id || "",
        custom_name: companyService.custom_name || "",
        description: companyService.description || "",
        price_per_unit: companyService.price_per_unit || "",
        unit: companyService.unit || "",
        min_price: companyService.min_price || "",
        max_price: companyService.max_price || "",
        logo: null,
    })
    const [errors, setErrors] = useState({})
    const [logoPreview, setLogoPreview] = useState(companyService.logo || null)
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false)
    const [showServiceDropdown, setShowServiceDropdown] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(
        companyService.company_id ? companies.find(c => c.id === companyService.company_id) : null
    )
    const [selectedService, setSelectedService] = useState(
        companyService.service_id ? services.find(s => s.id === companyService.service_id) : null
    )
    const [priceType, setPriceType] = useState(() => {
        if (companyService.price_per_unit && companyService.unit) return "per_unit"
        if (companyService.min_price && companyService.max_price) return "range"
        if (companyService.min_price) return "min"
        if (companyService.max_price) return "max"
        return "per_unit" // default
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleCompanySelect = (company) => {
        setSelectedCompany(company)
        setFormData((prev) => ({
            ...prev,
            company_id: company.id,
        }))
        setShowCompanyDropdown(false)
    }

    const handleServiceSelect = (service) => {
        setSelectedService(service)
        setFormData((prev) => ({
            ...prev,
            service_id: service.id,
        }))
        setShowServiceDropdown(false)
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
            _removeExistingLogo: true, // Flag to remove existing logo on the server
        }))
        setLogoPreview(null)
    }

    const handlePriceTypeChange = (type) => {
        setPriceType(type)

        // Reset price fields based on selected type
        setFormData((prev) => ({
            ...prev,
            price_per_unit: type === "per_unit" ? prev.price_per_unit : "",
            unit: type === "per_unit" ? prev.unit : "",
            min_price: ["range", "min"].includes(type) ? prev.min_price : "",
            max_price: ["range", "max"].includes(type) ? prev.max_price : "",
        }))
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

        // Add method spoofing for PUT request
        submitData.append('_method', 'PUT')

        router.post(`/administrator/company-services/${companyService.id}`, submitData, {
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
                                onClick={() => router.visit("/administrator/company-services")}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <ArrowLeft size={20} className="text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Editar Servei d'Empresa</h1>
                                <p className="text-gray-500 mt-1">
                                    {companyService.custom_name || (selectedService && selectedService.name) || "Servei personalitzat"}
                                </p>
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
                            {/* Selecció d'empresa */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Empresa <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                                        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 border rounded-lg bg-white hover:bg-gray-50 text-left ${
                                            errors.company_id ? "border-red-500" : "border-gray-300"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Building size={18} className="text-gray-500" />
                                            <span className={selectedCompany ? "text-gray-900" : "text-gray-500"}>
                                                {selectedCompany ? selectedCompany.name : "Selecciona una empresa"}
                                            </span>
                                        </div>
                                        <ChevronDown size={16} className="text-gray-500" />
                                    </button>

                                    {showCompanyDropdown && (
                                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                            <div className="p-2 max-h-60 overflow-y-auto">
                                                {companies.map((company) => (
                                                    <button
                                                        key={company.id}
                                                        type="button"
                                                        onClick={() => handleCompanySelect(company)}
                                                        className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 ${
                                                            selectedCompany && selectedCompany.id === company.id ? "bg-blue-50 text-blue-700" : ""
                                                        }`}
                                                    >
                                                        {company.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.company_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.company_id}</p>
                                )}
                            </div>

                            {/* Selecció de servei */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Servei <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                                        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 border rounded-lg bg-white hover:bg-gray-50 text-left ${
                                            errors.service_id ? "border-red-500" : "border-gray-300"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Briefcase size={18} className="text-gray-500" />
                                            <span className={selectedService ? "text-gray-900" : "text-gray-500"}>
                                                {selectedService ? selectedService.name : "Selecciona un servei"}
                                            </span>
                                        </div>
                                        <ChevronDown size={16} className="text-gray-500" />
                                    </button>

                                    {showServiceDropdown && (
                                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                            <div className="p-2 max-h-60 overflow-y-auto">
                                                {services.map((service) => (
                                                    <button
                                                        key={service.id}
                                                        type="button"
                                                        onClick={() => handleServiceSelect(service)}
                                                        className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 ${
                                                            selectedService && selectedService.id === service.id ? "bg-blue-50 text-blue-700" : ""
                                                        }`}
                                                    >
                                                        <span>{service.name}</span>
                                                        {service.type && (
                                                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                                                                {service.type}
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.service_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.service_id}</p>
                                )}
                            </div>

                            {/* Nom personalitzat */}
                            <div className="col-span-1 md:col-span-2">
                                <label htmlFor="custom_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom personalitzat
                                </label>
                                <input
                                    type="text"
                                    id="custom_name"
                                    name="custom_name"
                                    value={formData.custom_name}
                                    onChange={handleChange}
                                    placeholder="Nom personalitzat del servei (opcional)"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                        errors.custom_name ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.custom_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.custom_name}</p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    Deixa-ho en blanc per utilitzar el nom original del servei
                                </p>
                            </div>

                            {/* Descripció */}
                            <div className="col-span-1 md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripció
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Descripció detallada del servei personalitzat"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                        errors.description ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Tipus de preu */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipus de preu
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handlePriceTypeChange("per_unit")}
                                        className={`px-4 py-2 rounded-lg border ${
                                            priceType === "per_unit"
                                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                                : "bg-white border-gray-300 text-gray-700"
                                        }`}
                                    >
                                        Preu per unitat
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePriceTypeChange("range")}
                                        className={`px-4 py-2 rounded-lg border ${
                                            priceType === "range"
                                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                                : "bg-white border-gray-300 text-gray-700"
                                        }`}
                                    >
                                        Rang de preus
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePriceTypeChange("min")}
                                        className={`px-4 py-2 rounded-lg border ${
                                            priceType === "min"
                                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                                : "bg-white border-gray-300 text-gray-700"
                                        }`}
                                    >
                                        Preu mínim
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePriceTypeChange("max")}
                                        className={`px-4 py-2 rounded-lg border ${
                                            priceType === "max"
                                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                                : "bg-white border-gray-300 text-gray-700"
                                        }`}
                                    >
                                        Preu màxim
                                    </button>
                                </div>
                            </div>

                            {/* Camps de preu segons el tipus seleccionat */}
                            {priceType === "per_unit" && (
                                <>
                                    <div className="col-span-1">
                                        <label htmlFor="price_per_unit" className="block text-sm font-medium text-gray-700 mb-1">
                                            Preu per unitat
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <DollarSign size={16} className="text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                id="price_per_unit"
                                                name="price_per_unit"
                                                value={formData.price_per_unit}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                                    errors.price_per_unit ? "border-red-500" : "border-gray-300"
                                                }`}
                                            />
                                        </div>
                                        {errors.price_per_unit && (
                                            <p className="mt-1 text-sm text-red-600">{errors.price_per_unit}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                                            Unitat
                                        </label>
                                        <input
                                            type="text"
                                            id="unit"
                                            name="unit"
                                            value={formData.unit}
                                            onChange={handleChange}
                                            placeholder="hora, dia, unitat, etc."
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                                errors.unit ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                        {errors.unit && (
                                            <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
                                        )}
                                    </div>
                                </>
                            )}

                            {(priceType === "range" || priceType === "min") && (
                                <div className="col-span-1">
                                    <label htmlFor="min_price" className="block text-sm font-medium text-gray-700 mb-1">
                                        Preu mínim
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign size={16} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            id="min_price"
                                            name="min_price"
                                            value={formData.min_price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                                errors.min_price ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                    </div>
                                    {errors.min_price && (
                                        <p className="mt-1 text-sm text-red-600">{errors.min_price}</p>
                                    )}
                                </div>
                            )}

                            {(priceType === "range" || priceType === "max") && (
                                <div className="col-span-1">
                                    <label htmlFor="max_price" className="block text-sm font-medium text-gray-700 mb-1">
                                        Preu màxim
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign size={16} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            id="max_price"
                                            name="max_price"
                                            value={formData.max_price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                                errors.max_price ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                    </div>
                                    {errors.max_price && (
                                        <p className="mt-1 text-sm text-red-600">{errors.max_price}</p>
                                    )}
                                </div>
                            )}

                            {/* Logo */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Logo
                                </label>
                                {!logoPreview ? (
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                        <div className="space-y-1 text-center">
                                            <div className="flex justify-center">
                                                <Package className="mx-auto h-12 w-12 text-gray-400" />
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
                                onClick={() => router.visit("/administrator/company-services")}
                                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                            >
                                Cancel·lar
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-[#1e40af] hover:bg-[#3b82f6] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <Check size={18} />
                                Guardar Canvis
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CompanyServicesEdit
