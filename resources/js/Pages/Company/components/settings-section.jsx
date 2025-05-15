"use client"

import { useState, useEffect } from "react"
import {
    Cog6ToothIcon,
    BellIcon,
    LockClosedIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline"

export default function SettingsSection({ company }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeTab, setActiveTab] = useState("notifications")

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const tabs = [
        { id: "notifications", name: "Notificacions", icon: BellIcon },
        { id: "security", name: "Seguretat", icon: LockClosedIcon },
        { id: "privacy", name: "Privacitat", icon: DocumentTextIcon },
        { id: "team", name: "Equip", icon: UserGroupIcon },
        { id: "integrations", name: "Integracions", icon: ArrowPathIcon },
    ]

    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
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
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Notificacions per email</p>
                                            <p className="text-sm text-gray-500">Rebràs emails sobre activitat important</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9e2a2f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9e2a2f]"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Notificacions de noves cites</p>
                                            <p className="text-sm text-gray-500">Rebràs notificacions quan un client sol·liciti una cita</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9e2a2f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9e2a2f]"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Notificacions de valoracions</p>
                                            <p className="text-sm text-gray-500">Rebràs notificacions quan un client deixi una valoració</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9e2a2f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9e2a2f]"></div>
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
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nova contrasenya</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Confirmar nova contrasenya
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                />
                                            </div>
                                            <button className="px-4 py-2 bg-[#9e2a2f] text-white rounded-md hover:bg-[#8a2329] transition-colors duration-300">
                                                Actualitzar contrasenya
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-gray-200">
                                        <h4 className="text-md font-medium text-gray-800 mb-2">Verificació en dos passos</h4>
                                        <p className="text-sm text-gray-500 mb-4">Afegeix una capa addicional de seguretat al teu compte</p>
                                        <button className="px-4 py-2 bg-[#9e2a2f] text-white rounded-md hover:bg-[#8a2329] transition-colors duration-300">
                                            Activar verificació en dos passos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "privacy" && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Configuració de privacitat</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Perfil públic</p>
                                            <p className="text-sm text-gray-500">
                                                Fes que el teu perfil sigui visible per a clients potencials
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9e2a2f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9e2a2f]"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Mostrar valoracions</p>
                                            <p className="text-sm text-gray-500">
                                                Permet que els clients vegin les valoracions del teu perfil
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9e2a2f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9e2a2f]"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Compartir dades amb tercers</p>
                                            <p className="text-sm text-gray-500">Permet compartir dades anònimes per millorar el servei</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9e2a2f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9e2a2f]"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "team" && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Configuració d'equip</h3>
                                <p className="text-sm text-gray-500 mb-4">Gestiona els permisos i rols dels membres del teu equip</p>
                                <button className="px-4 py-2 bg-[#9e2a2f] text-white rounded-md hover:bg-[#8a2329] transition-colors duration-300 mb-6">
                                    Afegir membre a l'equip
                                </button>

                                <div className="border border-gray-200 rounded-md overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Nom
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Rol
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Accions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {company.workers.slice(0, 3).map((worker) => (
                                            <tr key={worker.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-[#9e2a2f]">{worker.name.charAt(0)}</span>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{worker.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {worker.is_admin ? "Administrador" : "Treballador"}
                            </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                                                    <button className="text-red-600 hover:text-red-900">Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "integrations" && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Integracions</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Connecta amb altres serveis per millorar la teva experiència
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-medium text-gray-800">Facebook</h4>
                                                <p className="text-sm text-gray-500">Connecta amb el teu compte de Facebook</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                                            Connectar
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M7.8 2h8.4c1.94 0 3.5 1.56 3.5 3.5v13c0 1.94-1.56 3.5-3.5 3.5h-8.4c-1.94 0-3.5-1.56-3.5-3.5v-13c0-1.94 1.56-3.5 3.5-3.5zm-1.5 3.5v13c0 .83.67 1.5 1.5 1.5h8.4c.83 0 1.5-.67 1.5-1.5v-13c0-.83-.67-1.5-1.5-1.5h-8.4c-.83 0-1.5.67-1.5 1.5zm4.2 3.5c0-.55.45-1 1-1h3.6c.55 0 1 .45 1 1s-.45 1-1 1h-3.6c-.55 0-1-.45-1-1zm0 4c0-.55.45-1 1-1h3.6c.55 0 1 .45 1 1s-.45 1-1 1h-3.6c-.55 0-1-.45-1-1zm0 4c0-.55.45-1 1-1h3.6c.55 0 1 .45 1 1s-.45 1-1 1h-3.6c-.55 0-1-.45-1-1z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-medium text-gray-800">Google Calendar</h4>
                                                <p className="text-sm text-gray-500">Sincronitza les teves cites amb Google Calendar</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
                                            Connectar
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                                                <svg className="h-6 w-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-medium text-gray-800">Discord</h4>
                                                <p className="text-sm text-gray-500">Connecta amb el teu servidor de Discord</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300">
                                            Connectar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
