"use client"

import { useState, useEffect } from "react"
import {
    UserCircleIcon,
    BuildingOffice2Icon,
    PhoneIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    MapPinIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline"

export default function ProfileSection({ company }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const companyInfo = company.info
    const plans = company.plans || []

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <UserCircleIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                    Perfil de l'Empresa
                </h2>
                <button className="inline-flex items-center px-4 py-2 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all duration-300 hover:bg-[#8a2329] shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    <PencilSquareIcon className="h-5 w-5 mr-2" />
                    Editar Perfil
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Company Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <BuildingOffice2Icon className="h-6 w-6 mr-2 text-[#9e2a2f]" />
                            Informació General
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Nom de l'empresa</p>
                                <p className="text-lg font-semibold text-gray-800">{companyInfo.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">CIF</p>
                                <p className="text-lg font-semibold text-gray-800">{companyInfo.vat_number || "No especificat"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Any de fundació</p>
                                <p className="text-lg font-semibold text-gray-800">{companyInfo.founded_year || "No especificat"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Tipus d'empresa</p>
                                <p className="text-lg font-semibold text-gray-800">{companyInfo.company_type || "No especificat"}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-500 mb-1">Descripció</p>
                            <p className="text-gray-700">{companyInfo.description || "No hi ha descripció disponible."}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <MapPinIcon className="h-6 w-6 mr-2 text-[#9e2a2f]" />
                            Ubicació i Contacte
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <MapPinIcon className="h-5 w-5 mr-3 text-[#9e2a2f] mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Adreça</p>
                                    <p className="text-gray-800">{companyInfo.address}</p>
                                    <p className="text-gray-800">
                                        {companyInfo.city}, {companyInfo.state} {companyInfo.zip_code}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <PhoneIcon className="h-5 w-5 mr-3 text-[#9e2a2f] mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Telèfon</p>
                                    <p className="text-gray-800">{companyInfo.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <EnvelopeIcon className="h-5 w-5 mr-3 text-[#9e2a2f] mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                                    <p className="text-gray-800">{companyInfo.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <GlobeAltIcon className="h-5 w-5 mr-3 text-[#9e2a2f] mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Web</p>
                                    <p className="text-gray-800">{companyInfo.website || "No especificat"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription Plans */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <UserCircleIcon className="h-6 w-6 mr-2 text-[#9e2a2f]" />
                            Pla de Subscripció
                        </h3>

                        <div className="space-y-4">
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`p-4 rounded-lg border ${
                                        plan.isActive ? "border-[#9e2a2f] bg-[#9e2a2f]/5" : "border-gray-200 hover:border-gray-300"
                                    }
                                        transition-all duration-300`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-gray-900">{plan.name}</h4>
                                        {plan.isActive && (
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#9e2a2f] text-white">Actiu</span>
                                        )}
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800 mb-3">
                                        {plan.price}€<span className="text-sm font-normal text-gray-500">/mes</span>
                                    </p>

                                    <ul className="space-y-2">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg
                                                    className="h-5 w-5 text-[#9e2a2f] mr-2 mt-0.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {!plan.isActive && (
                                        <button className="w-full mt-4 px-4 py-2 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all duration-300 hover:bg-[#8a2329] shadow-md hover:shadow-lg">
                                            Canviar a aquest pla
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
