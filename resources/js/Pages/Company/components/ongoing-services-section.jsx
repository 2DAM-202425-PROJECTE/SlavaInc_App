"use client"

import { useState, useEffect } from "react"
import {
    ClipboardDocumentListIcon,
    CalendarIcon,
    UserIcon,
    MapPinIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline"

export default function OngoingServicesSection({ company }) {
    const [isLoaded, setIsLoaded] = useState(false)

    // Simulated ongoing projects data based on the stats
    const ongoingProjects = Array.from({ length: company.stats.ongoingProjects || 0 }, (_, i) => ({
        id: i + 1,
        clientName: `Client ${i + 1}`,
        serviceName: company.services[i % company.services.length]?.name || "Servei",
        startDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        estimatedEndDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        location: "Barcelona",
        status: Math.random() > 0.3 ? "confirmed" : "pending",
        progress: Math.floor(Math.random() * 100),
        assignedWorker: company.workers[i % company.workers.length]?.name || "Treballador",
    }))

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <ClipboardDocumentListIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                    Serveis en Curs
                </h2>
                <div className="text-sm font-medium text-gray-500">Total: {ongoingProjects.length} projectes actius</div>
            </div>

            {ongoingProjects.length > 0 ? (
                <div className="space-y-6">
                    {ongoingProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-1 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">{project.serviceName}</h3>
                                    <div className="flex items-center text-gray-600">
                                        <UserIcon className="h-4 w-4 mr-2 text-[#9e2a2f]" />
                                        <span>{project.clientName}</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <div
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            project.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {project.status === "confirmed" ? "Confirmat" : "Pendent"}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center text-gray-700">
                                    <CalendarIcon className="h-5 w-5 mr-2 text-[#9e2a2f]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Data d'inici</p>
                                        <p>{project.startDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <CalendarIcon className="h-5 w-5 mr-2 text-[#9e2a2f]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Data estimada de finalització</p>
                                        <p>{project.estimatedEndDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <MapPinIcon className="h-5 w-5 mr-2 text-[#9e2a2f]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Ubicació</p>
                                        <p>{project.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">Progrés</span>
                                    <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-[#9e2a2f] h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center text-gray-700">
                                    <UserIcon className="h-5 w-5 mr-2 text-[#9e2a2f]" />
                                    <span>Assignat a: {project.assignedWorker}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="inline-flex items-center px-3 py-2 rounded-lg bg-green-50 text-green-700 font-medium transition-all duration-300 hover:bg-green-100 hover:shadow-md">
                                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                                        Completar
                                    </button>
                                    <button className="inline-flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-700 font-medium transition-all duration-300 hover:bg-red-100 hover:shadow-md">
                                        <XCircleIcon className="h-4 w-4 mr-2" />
                                        Cancel·lar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 animate-pulse">
                        <ClipboardDocumentListIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No hi ha serveis en curs</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Actualment no tens cap servei en curs. Els serveis actius apareixeran aquí.
                    </p>
                </div>
            )}
        </div>
    )
}
