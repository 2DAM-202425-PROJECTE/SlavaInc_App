"use client"
import axios from 'axios'

import {useState, useEffect} from "react"
import {
    UserCircleIcon,
    BuildingOffice2Icon,
    PhoneIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    MapPinIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline"

export default function ProfileSection({company, addNotification, requestPlanChange}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [companyInfo, setCompanyInfo] = useState({...company.info})
    const [formData, setFormData] = useState({...company.info})
    const [errors, setErrors] = useState({})

    const [plans, setPlans] = useState(company.plans || [])

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleSave = async () => {
        try {
            const data = new FormData();
            data.append('_method', 'PUT');

            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'logo' && !(value instanceof File)) return;
                const cleanedValue = (value === 'null' || value === '') ? null : value;

                data.append(key, value);
            });

            const response = await axios.post('/company/profile', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setCompanyInfo(response.data.company);
            setIsEditing(false);
            setErrors({});
            addNotification(response.data.message || "Perfil actualitzat correctament", "success");
        } catch (error) {
            if (error.response?.status === 422) {
                console.log("Errors de validació:", error.response.data.errors);
                setErrors(error.response.data.errors || {});
            } else {
                console.error("Error al actualitzar el perfil:", error);
                addNotification("Hi ha hagut un error en desar els canvis.", "error");
            }
        }
    };



    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <UserCircleIcon className="h-8 w-8 mr-3 text-[#9e2a2f]"/>
                    Perfil de l'Empresa
                </h2>
                <button
                    onClick={() => {
                        if (!isEditing) {
                            const cleanedInfo = Object.fromEntries(
                                Object.entries(companyInfo).map(([key, val]) => [key, val ?? ""])
                            )
                            setFormData(cleanedInfo);                        }
                        setIsEditing(!isEditing)
                    }}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all duration-300 hover:bg-[#8a2329] shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                    <PencilSquareIcon className="h-5 w-5 mr-2"/>
                    {isEditing ? "Cancel·la" : "Editar Perfil"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Company Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <BuildingOffice2Icon className="h-6 w-6 mr-2 text-[#9e2a2f]"/>
                            Informació General
                        </h3>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo de
                                        l'empresa</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFormData({...formData, logo: e.target.files[0]})}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                    {formData.logo instanceof File === false && companyInfo.logo && (
                                        <div className="mt-2">
                                            <img
                                                src={`/storage/${companyInfo.logo}`}
                                                alt="Logo actual"
                                                className="h-20 w-auto rounded-md border border-gray-200 shadow-sm"
                                            />
                                        </div>
                                    )}
                                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name[0]}</p>}

                                </div>
                                {[
                                    {label: "Nom de l'empresa", key: "name"},
                                    {label: "CIF", key: "vat_number"},
                                    {label: "Any de fundació", key: "founded_year"},
                                    {label: "Tipus d'empresa", key: "company_type"},
                                    {label: "Descripció", key: "description", textarea: true},
                                ].map(({label, key, textarea}) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

                                        {textarea ? (
                                            <>
                                        <textarea
                                            value={formData[key] || ""}
                                            onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                            className={`block w-full border rounded-md shadow-sm p-2 ${
                                                errors[key] ? "border-red-500" : "border-gray-300"
                                            }`}
                                        />
                                                {errors[key] && (
                                                    <p className="text-sm text-red-600 mt-1">{errors[key][0]}</p>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    value={formData[key] || ""}
                                                    onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                                    className={`block w-full border rounded-md shadow-sm p-2 ${
                                                        errors[key] ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                />
                                                {errors[key] && (
                                                    <p className="text-sm text-red-600 mt-1">{errors[key][0]}</p>
                                                )}
                                            </>
                                        )}
                                    </div>

                                ))}


                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Nom de l'empresa</p>
                                        <p className="text-lg font-semibold text-gray-800">{companyInfo.name}</p>
                                        {companyInfo.logo && (
                                            <img
                                                src={`/storage/${companyInfo.logo}`}
                                                alt="Logo empresa"
                                                className="h-20 w-auto rounded-md border border-gray-200 shadow-sm mt-2"
                                            />
                                        )}


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
                            </>
                        )}
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <MapPinIcon className="h-6 w-6 mr-2 text-[#9e2a2f]"/>
                            Ubicació i Contacte
                        </h3>

                        {isEditing ? (
                            <div className="space-y-4">
                                {[
                                    {label: "Adreça", key: "address"},
                                    {label: "Ciutat", key: "city"},
                                    {label: "Província/Estat", key: "state"},
                                    {label: "Codi Postal", key: "zip_code"},
                                    {label: "Telèfon", key: "phone"},
                                    {label: "Email", key: "email"},
                                    {label: "Web", key: "website"},

                                ].map(({label, key}) => (

                                    <div key={key}>

                                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                        <input
                                            type="text"
                                            value={formData[key] || ""}
                                            onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        />
                                        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name[0]}</p>}

                                    </div>

                                ))}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Desa Canvis
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFormData({...companyInfo})
                                            setIsEditing(false)
                                        }}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                                    >
                                        Cancel·la
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <MapPinIcon className="h-5 w-5 mr-3 text-[#9e2a2f] mt-1"/>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Adreça</p>
                                        <p className="text-gray-800">{companyInfo.address}</p>
                                        <p className="text-gray-800">
                                            {companyInfo.city}, {companyInfo.state} {companyInfo.zip_code}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <PhoneIcon className="h-5 w-5 mr-3 text-[#9e2a2f] mt-1"/>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Telèfon</p>
                                        <p className="text-gray-800">{companyInfo.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <EnvelopeIcon className="h-5 w-5 mr-3 text-[#9e2a2f] mt-1"/>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                                        <p className="text-gray-800">{companyInfo.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <GlobeAltIcon className="h-5 w-5 mr-3 text-[#9e2a2f] mt-1"/>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Web</p>
                                        <p className="text-gray-800">{companyInfo.website || "No especificat"}</p>
                                    </div>
                                </div>

                            </div>

                        )}

                    </div>

                </div>

                {/* Subscription Plans */}
                <div className="lg:col-span-1">
                    <div
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <UserCircleIcon className="h-6 w-6 mr-2 text-[#9e2a2f]"/>
                            Pla de Subscripció
                        </h3>

                        <div className="space-y-4">
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`p-4 rounded-lg border ${
                                        plan.isActive ? "border-[#9e2a2f] bg-[#9e2a2f]/5" : "border-gray-200 hover:border-gray-300"
                                    } transition-all duration-300`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-gray-900">{plan.name}</h4>
                                        {plan.isActive && (
                                            <span
                                                className="px-2 py-1 text-xs font-medium rounded-full bg-[#9e2a2f] text-white">Actiu</span>
                                        )}
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800 mb-3">
                                        {plan.price}€<span className="text-sm font-normal text-gray-500">/mes</span>
                                    </p>

                                    <ul className="space-y-2">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg className="h-5 w-5 text-[#9e2a2f] mr-2 mt-0.5" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {!plan.isActive && (
                                        <button
                                            className="w-full mt-4 px-4 py-2 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all duration-300 hover:bg-[#8a2329] shadow-md hover:shadow-lg"
                                            onClick={() => requestPlanChange(plan)}
                                        >
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
