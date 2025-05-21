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
import { Link } from "@inertiajs/react"

export default function OngoingServicesSection({ company, onConfirmComplete, onConfirmCancel, onConfirmAccept  }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const appointments = company.appointments?.data || []
    const paginationLinks = company.appointments?.links || []

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <ClipboardDocumentListIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                    Serveis en Curs
                </h2>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                    <div className="text-sm font-medium text-gray-500">
                        Total: {appointments.length} serveis actius
                    </div>
                    <Link
                        href="/quotes"
                        className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all duration-300 hover:bg-[#8a2329] shadow-md hover:shadow-lg"
                    >
                        Veure Pressupostos
                    </Link>
                </div>
            </div>


            {appointments.length > 0 ? (
                <div className="space-y-6">
                    {appointments.map((appt, index) => (
                        <div
                            key={appt.id}
                            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-1 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{transitionDelay: `${index * 100}ms`}}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">{appt.service}</h3>
                                    <div className="flex items-center text-gray-600">
                                        <UserIcon className="h-4 w-4 mr-2 text-[#9e2a2f]"/>
                                        <span>{appt.user}</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <div
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            appt.status === "confirmed"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {appt.status === "confirmed" ? "Confirmat" : "Pendent"}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center text-gray-700">
                                    <CalendarIcon className="h-5 w-5 mr-2 text-[#9e2a2f]"/>
                                    <div>
                                        <p className="text-xs text-gray-500">Data</p>
                                        <p>{new Date(appt.date).toLocaleDateString("ca-ES")} — {appt.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <UserIcon className="h-5 w-5 mr-2 text-[#9e2a2f]"/>
                                    <div>
                                        <p className="text-xs text-gray-500">Treballador</p>
                                        <p>{appt.worker || "No assignat"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <MapPinIcon className="h-5 w-5 mr-2 text-[#9e2a2f]"/>
                                    <div>
                                        <p className="text-xs text-gray-500">Notes</p>
                                        <p>{appt.notes || "Sense notes"}</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-gray-100">
                                <span className="text-gray-700 font-medium">Preu: {appt.price} €</span>
                                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                                    {appt.status !== "confirmed" && (
                                        <button
                                            onClick={() => onConfirmAccept(appt.id)}
                                            className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium transition hover:bg-blue-100 hover:shadow-md"
                                        >
                                            <CheckCircleIcon className="h-4 w-4 mr-2"/>
                                            Acceptar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onConfirmComplete(appt.id)}
                                        className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-green-50 text-green-700 font-medium transition hover:bg-green-100 hover:shadow-md"
                                    >
                                        <CheckCircleIcon className="h-4 w-4 mr-2"/>
                                        Completar
                                    </button>
                                    <button
                                        onClick={() => onConfirmCancel(appt.id)}
                                        className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-red-50 text-red-700 font-medium transition hover:bg-red-100 hover:shadow-md"
                                    >
                                        <XCircleIcon className="h-4 w-4 mr-2"/>
                                        Cancel·lar
                                    </button>
                                </div>
                            </div>


                        </div>
                    ))}
                    {paginationLinks.length > 0 && (
                        <div className="mt-8 flex justify-center w-full">
                            <div className="inline-flex flex-wrap gap-2 justify-center">
                                {paginationLinks.map((link, index) =>
                                    link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            preserveScroll
                                            preserveState
                                            className={`px-4 py-2 border rounded ${
                                                link.active ? "bg-[#9e2a2f] text-white" : "bg-white text-gray-800"
                                            } hover:bg-[#9e2a2f]/90 hover:text-white transition-all`}
                                        >
                                            <span dangerouslySetInnerHTML={{__html: link.label}}/>
                                        </Link>
                                    ) : (
                                        <span
                                            key={index}
                                            className="px-4 py-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}

                </div>
            ) : (
                <div
                    className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                    <div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 animate-pulse">
                        <ClipboardDocumentListIcon className="h-10 w-10 text-gray-400"/>
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
