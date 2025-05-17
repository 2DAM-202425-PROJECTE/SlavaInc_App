"use client"

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import {
    Cog6ToothIcon,
    BellIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline"

export default function SettingsSection({ company }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeTab, setActiveTab] = useState("notifications")

    const [notificationPrefs, setNotificationPrefs] = useState({
        system: Boolean(company.notifications_system),
        appointments: Boolean(company.notifications_appointments),
        reviews: Boolean(company.notifications_reviews),
    })



    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleToggle = (key) => {
        const fieldMap = {
            system: "notifications_system",
            appointments: "notifications_appointments",
            reviews: "notifications_reviews",
        }

        const field = fieldMap[key]
        const newValue = !notificationPrefs[key]

        setNotificationPrefs((prev) => ({
            ...prev,
            [key]: newValue,
        }))

        router.patch(
            route("company.notifications.update"),
            {
                field,
                value: newValue,
            },
            {
                preserveScroll: true,
                onError: () => {
                    setNotificationPrefs((prev) => ({
                        ...prev,
                        [key]: !newValue,
                    }))
                },
            }
        )
    }

    const tabs = [
        { id: "notifications", name: "Notificacions", icon: BellIcon },
        { id: "security", name: "Seguretat", icon: LockClosedIcon },
        { id: "clientView", name: "Vista client", icon: Cog6ToothIcon },
    ]

    return (
        <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <Cog6ToothIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                    Configuració
                </h2>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? "bg-[#9e2a2f]/10 text-[#9e2a2f]"
                                            : "text-gray-600 hover:text-[#9e2a2f] hover:bg-[#9e2a2f]/5"
                                    }`}
                                >
                                    <tab.icon className="h-5 w-5 mr-3" />
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                        {activeTab === "notifications" && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Preferències de notificacions</h3>
                                <div className="space-y-4">
                                    {/* Sistema */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Notificacions del Sistema</p>
                                            <p className="text-sm text-gray-500">Rebràs notificacions quan es crea, modifica o elimina un servei o treballador.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={notificationPrefs.system}
                                                onChange={() => handleToggle("system")}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9e2a2f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9e2a2f]" />
                                        </label>
                                    </div>

                                    {/* Cites */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Notificacions de noves cites</p>
                                            <p className="text-sm text-gray-500">Rebràs notificacions quan un client sol·liciti una cita</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={notificationPrefs.appointments}
                                                onChange={() => handleToggle("appointments")}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9e2a2f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9e2a2f]" />
                                        </label>
                                    </div>

                                    {/* Valoracions */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Notificacions de valoracions</p>
                                            <p className="text-sm text-gray-500">Rebràs notificacions quan un client deixi una valoració</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={notificationPrefs.reviews}
                                                onChange={() => handleToggle("reviews")}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9e2a2f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9e2a2f]" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Configuració de seguretat</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-md font-medium text-gray-800 mb-2">Canviar contrasenya</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Contrasenya actual</label>
                                                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9e2a2f] focus:border-[#9e2a2f]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nova contrasenya</label>
                                                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9e2a2f] focus:border-[#9e2a2f]" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nova contrasenya</label>
                                                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9e2a2f] focus:border-[#9e2a2f]" />
                                            </div>
                                            <button className="px-4 py-2 bg-[#9e2a2f] text-white rounded-md hover:bg-[#8a2329] transition-colors duration-300">
                                                Actualitzar contrasenya
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "clientView" && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Vista com a client</h3>
                                <p className="text-gray-600 mb-6">
                                    Pots veure com un client visualitza els serveis disponibles. És una simulació segura, sense necessitat de tancar sessió.
                                </p>
                                <button
                                    onClick={() => router.get(route("company.previewClient"))}
                                    className="px-4 py-2 bg-[#1f7275] text-white rounded-md hover:bg-[#155e61] transition"
                                >
                                    Inicia vista com a client
                                </button>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}
