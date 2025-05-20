"use client"

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"
import {
    UsersIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    PhoneIcon,
    ClockIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline"
import { Link } from "@inertiajs/react"

export default function WorkersSection({ company, onViewWorkerInfo, onDeleteWorker, showDeleteModal }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const workers = company.workers?.data || []
    const paginationLinks = company.workers?.links || []

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleAddWorker = () => {
        router.get(route("worker.create"))
    }

    const handleEditWorker = (workerId) => {
        router.get(route("worker.edit", workerId))
    }

    const filteredWorkers = workers.filter(
        (worker) =>
            worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (worker.phone && worker.phone.includes(searchTerm)),
    )

    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <UsersIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                    Treballadors
                </h2>
                <div className="flex-1 mx-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cercar treballadors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9e2a2f] focus:border-transparent"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleAddWorker}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all duration-300 hover:bg-[#8a2329] shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Nou Treballador
                </button>
            </div>

            {workers.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWorkers.map((worker, index) => (
                            <div
                                key={worker.id}
                                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 hover:scale-[1.02] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center mr-4 transition-all duration-300 hover:bg-[#9e2a2f]/20">
                                        <span className="text-xl font-bold text-[#9e2a2f]">{worker.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900">{worker.name}</h3>
                                        <p className="text-sm text-gray-500">{worker.position || "Treballador"}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-gray-700 group">
                                        <EnvelopeIcon className="h-5 w-5 mr-3 text-[#9e2a2f] group-hover:scale-110 transition-transform duration-300" />
                                        <span>{worker.email}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700 group">
                                        <PhoneIcon className="h-5 w-5 mr-3 text-[#9e2a2f] group-hover:scale-110 transition-transform duration-300" />
                                        <span>{worker.phone}</span>
                                    </div>
                                    {worker.schedule && (
                                        <div className="flex items-center text-gray-700 group">
                                            <ClockIcon className="h-5 w-5 mr-3 text-[#9e2a2f] group-hover:scale-110 transition-transform duration-300" />
                                            <span>{worker.schedule}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-100 space-x-4">
                                    <button
                                        onClick={() => handleEditWorker(worker.id)}
                                        className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium transition-all duration-300 hover:bg-indigo-100 hover:shadow-md"
                                    >
                                        <PencilSquareIcon className="h-4 w-4 mr-2" />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onViewWorkerInfo(worker)}
                                        className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
                                    >
                                        <UsersIcon className="h-4 w-4 mr-2" />
                                        Info
                                    </button>
                                    <button
                                        onClick={() => {
                                            onDeleteWorker(worker.id)
                                            showDeleteModal()
                                        }}
                                        className="inline-flex items-center px-4 py-2 rounded-lg bg-red-50 text-red-700 font-medium transition-all duration-300 hover:bg-red-100 hover:shadow-md"
                                    >
                                        <TrashIcon className="h-4 w-4 mr-2" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination section - moved outside the flex container */}
                    {paginationLinks.length > 0 && (
                        <div className="mt-12 flex justify-center w-full">
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
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </Link>
                                    ) : (
                                        <span
                                            key={index}
                                            className="px-4 py-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 animate-pulse">
                        <UsersIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No hi ha treballadors registrats</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Afegeix el teu primer treballador per començar a gestionar el teu equip
                    </p>
                    <button
                        onClick={handleAddWorker}
                        className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all duration-300 hover:bg-[#8a2329] shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Afegir Treballador
                    </button>
                </div>
            )}
        </div>
    )
}
