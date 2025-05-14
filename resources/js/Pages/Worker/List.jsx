import { useState } from "react"
import { usePage, router } from "@inertiajs/react"
import {
    UsersIcon,
    PhoneIcon,
    ClockIcon,
    ChevronDownIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline"

const WorkerList = () => {
    const { workers } = usePage().props
    const [loading, setLoading] = useState(false)

    // Protecció per si no arriba bé
    const workerItems = workers?.data ?? []
    const nextPageUrl = workers?.next_page_url ?? null

    const handleListWorkers = () => {
        if (loading || !nextPageUrl) return

        setLoading(true)
        router.get(nextPageUrl, {}, {
            preserveScroll: true,
            onSuccess: () => setLoading(false),
        })
    }

    const handleEditWorker = (workerId) => {
        router.get(route("worker.edit", { worker: workerId }))
    }

    const handleDeleteWorker = (workerId) => {
        if (window.confirm("Estàs segur que vols eliminar aquest treballador?")) {
            router.delete(route("worker.destroy", { worker: workerId }))
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
                <UsersIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                Llistat de Treballadors
            </h2>

            {workerItems.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workerItems.map((worker) => (
                            <div
                                key={worker.id}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center mr-4">
                                        <span className="text-xl font-bold text-[#9e2a2f]">
                                            {worker.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900">{worker.name}</h3>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {worker.schedule && (
                                        <div className="flex items-center text-gray-700">
                                            <ClockIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                            <span>{worker.schedule}</span>
                                        </div>
                                    )}
                                    {worker.phone && (
                                        <div className="flex items-center text-gray-700">
                                            <PhoneIcon className="h-5 w-5 mr-3 text-[#9e2a2f]" />
                                            <span>{worker.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleEditWorker(worker.id)}
                                        className="inline-flex items-center px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium transition-all hover:bg-indigo-100"
                                    >
                                        <PencilSquareIcon className="h-4 w-4 mr-2" />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteWorker(worker.id)}
                                        className="inline-flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-700 font-medium transition-all hover:bg-red-100"
                                    >
                                        <TrashIcon className="h-4 w-4 mr-2" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {nextPageUrl && (
                        <div className="mt-10 text-center">
                            <button
                                onClick={handleListWorkers}
                                className="inline-flex items-center px-6 py-3 rounded-lg bg-[#9e2a2f] text-white font-medium transition-all hover:bg-[#8a2329] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Carregant...
                                    </>
                                ) : (
                                    <>
                                        <ChevronDownIcon className="h-5 w-5 mr-2" />
                                        Veure més treballadors
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                        <UsersIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No hi ha treballadors disponibles</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        No s'han trobat treballadors per mostrar en aquesta llista.
                    </p>
                </div>
            )}
        </div>
    )
}

export default WorkerList
