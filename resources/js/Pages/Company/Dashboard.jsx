"use client"

import { useEffect, useState } from "react"
import { usePage, router } from "@inertiajs/react"
import { route } from "ziggy-js"
import {
    ChartBarIcon,
    UsersIcon,
    WrenchScrewdriverIcon,
    ClipboardDocumentListIcon,
    StarIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    TrashIcon,
    ArrowLeftIcon,
    BellIcon,
    XCircleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline"

import DashboardStats from "./components/dashboard-stats"
import WorkersSection from "./components/workers-section"
import ServicesSection from "./components/services-section"
import OngoingServicesSection from "./components/ongoing-services-section"
import RatingsSection from "./components/ratings-section"
import ProfileSection from "./components/profile-section"
import SettingsSection from "./components/settings-section"
import Notification from "./components/Notification"
import NotificationsPanel from "./components/notifications-panel"

export default function CompanyProfileAdmin() {
    const { company, flash } = usePage().props
    const [activeTab, setActiveTab] = useState("dashboard")
    const [internalFlash, setInternalFlash] = useState({ success: null, error: null })

    const [selectedWorker, setSelectedWorker] = useState(null)
    const [workerToDelete, setWorkerToDelete] = useState(null)
    const [showWorkerModal, setShowWorkerModal] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [serviceToDelete, setServiceToDelete] = useState(null)
    const [showServiceModal, setShowServiceModal] = useState(false)
    const [appointmentToAction, setAppointmentToAction] = useState(null)
    const [actionType, setActionType] = useState(null)
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState([])
    const unreadCount = company.notifications?.filter((n) => !n.read).length || 0
    const [planToChange, setPlanToChange] = useState(null)

    const addNotification = (message, type = "success", duration = 4000) => {
        const id = Date.now()
        setNotifications((prev) => [...prev, { id, message, type, duration }])
    }

    useEffect(() => {
        if (flash.success || flash.error) {
            setInternalFlash({
                success: flash.success || null,
                error: flash.error || null,
            })
        }
    }, [flash])

    useEffect(() => {
        if (internalFlash.success) {
            addNotification(internalFlash.success, "success")
            setInternalFlash((prev) => ({ ...prev, success: null }))
        }
        if (internalFlash.error) {
            addNotification(internalFlash.error, "error")
            setInternalFlash((prev) => ({ ...prev, error: null }))
        }
    }, [internalFlash])

    const tabs = [
        { id: "dashboard", name: "Dashboard", icon: ChartBarIcon },
        { id: "workers", name: "Treballadors", icon: UsersIcon },
        { id: "services", name: "Serveis", icon: WrenchScrewdriverIcon },
        { id: "ongoing", name: "Serveis en curs", icon: ClipboardDocumentListIcon },
        { id: "ratings", name: "Valoracions", icon: StarIcon },
        { id: "profile", name: "Perfil", icon: UserCircleIcon },
        { id: "settings", name: "Configuració", icon: Cog6ToothIcon },
    ]

    const renderActiveSection = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardStats company={company} onRequestUpgrade={() => setActiveTab("profile")} />
            case "workers":
                return (
                    <WorkersSection
                        company={company}
                        onViewWorkerInfo={setSelectedWorker}
                        onDeleteWorker={setWorkerToDelete}
                        showDeleteModal={() => setShowWorkerModal(true)}
                    />
                )
            case "services":
                return (
                    <ServicesSection
                        company={company}
                        onViewServiceInfo={setSelectedService}
                        onDeleteService={setServiceToDelete}
                        showDeleteModal={() => setShowServiceModal(true)}
                    />
                )

            case "ongoing":
                return (
                    <OngoingServicesSection
                        company={company}
                        onConfirmComplete={(id) => {
                            setAppointmentToAction(id)
                            setActionType("complete")
                        }}
                        onConfirmCancel={(id) => {
                            setAppointmentToAction(id)
                            setActionType("cancel")
                        }}
                        onConfirmAccept={(id) => {
                            setAppointmentToAction(id)
                            setActionType("confirmed")
                        }}
                    />
                )

            case "ratings":
                return <RatingsSection company={company} />
            case "profile":
                return (
                    <ProfileSection company={company} addNotification={addNotification} requestPlanChange={setPlanToChange} />
                )

            case "settings":
                return <SettingsSection company={company} addNotification={addNotification} />

            default:
                return <DashboardStats company={company} />
        }
    }
    const confirmAppointmentAction = () => {
        if (!appointmentToAction || !actionType) return

        let routeName
        if (actionType === "complete") routeName = "appointments.complete"
        else if (actionType === "cancel") routeName = "appointments.cancel"
        else if (actionType === "confirmed") routeName = "appointments.confirmed"

        router.patch(
            route(routeName, appointmentToAction),
            {},
            {
                preserveScroll: true,
                onSuccess: () =>
                    addNotification(
                        `Cita ${actionType === "complete" ? "completada" : actionType === "cancel" ? "cancel·lada" : "acceptada"} correctament`,
                        "success",
                    ),
                onError: () =>
                    addNotification(
                        `Error al ${actionType === "complete" ? "completar" : actionType === "cancel" ? "cancel·lar" : "acceptar"} la cita`,
                        "error",
                    ),
            },
        )

        setAppointmentToAction(null)
        setActionType(null)
    }

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <header className="w-full bg-gradient-to-r from-[#600f0f] via-[#9e2a2f] to-[#b81b1b] shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.visit(route("dashboard"))}
                                className="flex items-center justify-center h-9 w-9 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <ChartBarIcon className="h-5 w-5 text-white" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-white">{company.info.name}</h1>
                                <p className="text-sm text-white/80">Panell d'administració</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-2">
                <span className="px-3 py-1 bg-white/15 text-white rounded-full font-medium text-sm">
{company.plan ? company.plan.name : "Pla Bàsic"}
                </span>
                            </div>
                            <button
                                onClick={() => router.visit(route("dashboard"))}
                                className="hidden sm:flex items-center text-white text-sm font-medium hover:text-white/80 transition-colors"
                            >
                                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                                Tornar al Dashboard
                            </button>
                            <button
                                onClick={() => setShowNotifications(true)}
                                className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <BellIcon className="h-6 w-6 text-white" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-[#9e2a2f] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="bg-[#9e2a2f] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Benvingut al teu panell d'administració</h2>
                            <p className="mt-3 text-lg text-white/80">
                                Gestiona la teva empresa, treballadors i serveis fàcilment des d'un sol lloc
                            </p>
                        </div>
                        <div className="mt-6 md:mt-0">
                            <div className="inline-flex rounded-md shadow">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#9e2a2f] bg-white hover:bg-gray-50"
                                >
                                    Veure perfil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex overflow-x-auto py-3 space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? "bg-[#9e2a2f]/10 text-[#9e2a2f] border-b-2 border-[#9e2a2f]"
                                        : "text-gray-600 hover:text-[#9e2a2f] hover:bg-[#9e2a2f]/5"
                                }`}
                            >
                                <tab.icon className="h-5 w-5 mr-2" />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderActiveSection()}</div>

            {notifications.map((n) => (
                <Notification
                    key={n.id}
                    id={n.id}
                    message={n.message}
                    type={n.type}
                    duration={n.duration}
                    onClose={(id) => setNotifications((prev) => prev.filter((x) => x.id !== id))}
                />
            ))}
            <NotificationsPanel
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
                notifications={company.notifications || []}
                showSystemNotifications={company.info.notifications_system}
                onRead={() => router.reload({ only: ["company"] })}
            />

            {/* Modal Confirmació Cita */}
            {/* Modal Confirmació Cita */}
            {appointmentToAction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-scaleIn text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                            {actionType === "complete" && <CheckCircleIcon className="h-8 w-8 text-green-600" />}
                            {actionType === "cancel" && <XCircleIcon className="h-8 w-8 text-red-600" />}
                            {actionType === "confirmed" && <CheckCircleIcon className="h-8 w-8 text-blue-600" />}
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {actionType === "complete" && "Completar cita"}
                            {actionType === "cancel" && "Cancel·lar cita"}
                            {actionType === "confirmed" && "Acceptar cita"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {actionType === "complete" && "Estàs segur que vols marcar com a completada aquesta cita?"}
                            {actionType === "cancel" && "Estàs segur que vols cancel·lar aquesta cita?"}
                            {actionType === "confirmed" && "Estàs segur que vols acceptar aquesta cita?"}
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setAppointmentToAction(null)
                                    setActionType(null)
                                }}
                                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={confirmAppointmentAction}
                                className={`px-5 py-2 rounded-lg ${
                                    actionType === "complete"
                                        ? "bg-green-600 hover:bg-green-700"
                                        : actionType === "cancel"
                                            ? "bg-red-600 hover:bg-red-700"
                                            : "bg-blue-600 hover:bg-blue-700"
                                } text-white`}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Worker Info Modal */}
            {selectedWorker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-scaleIn">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center">
                            <UsersIcon className="h-10 w-10 text-[#9e2a2f]" />
                        </div>
                        <h3 className="text-2xl font-bold text-center text-gray-900 pt-8 mb-6">Informació del Treballador</h3>
                        <div className="space-y-3 divide-y divide-gray-100">
                            <div className="py-2 flex">
                                <span className="w-1/3 text-gray-500">Nom:</span>
                                <span className="w-2/3">{selectedWorker.name}</span>
                            </div>
                            <div className="py-2 flex">
                                <span className="w-1/3 text-gray-500">Correu:</span>
                                <span className="w-2/3">{selectedWorker.email}</span>
                            </div>
                            <div className="py-2 flex">
                                <span className="w-1/3 text-gray-500">Telèfon:</span>
                                <span className="w-2/3">{selectedWorker.phone}</span>
                            </div>
                            {selectedWorker.schedule && (
                                <div className="py-2 flex">
                                    <span className="w-1/3 text-gray-500">Horari:</span>
                                    <span className="w-2/3">{selectedWorker.schedule}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setSelectedWorker(null)}
                                className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
                            >
                                Tancar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Worker Delete Modal */}
            {showWorkerModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-scaleIn">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <TrashIcon className="h-8 w-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Eliminar Treballador</h3>
                            <p className="text-gray-600 mb-6">Estàs segur que vols eliminar aquest treballador?</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowWorkerModal(false)}
                                    className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                                >
                                    Cancel·lar
                                </button>
                                <button
                                    onClick={() => {
                                        router.delete(route("worker.destroy", workerToDelete))
                                        setShowWorkerModal(false)
                                    }}
                                    className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-scaleIn">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center">
                            <WrenchScrewdriverIcon className="h-10 w-10 text-[#9e2a2f]" />
                        </div>
                        <h3 className="text-2xl font-bold text-center text-gray-900 pt-8 mb-6">Informació del Servei</h3>
                        <div className="space-y-3 divide-y divide-gray-100">
                            <div className="py-2 flex">
                                <span className="w-1/3 text-gray-500">Nom:</span>
                                <span className="w-2/3">{selectedService.custom_name || selectedService.name}</span>
                            </div>
                            {selectedService.description && (
                                <div className="py-2 flex">
                                    <span className="w-1/3 text-gray-500">Descripció:</span>
                                    <span className="w-2/3">{selectedService.description}</span>
                                </div>
                            )}
                            {selectedService.unit && (
                                <div className="py-2 flex">
                                    <span className="w-1/3 text-gray-500">Unitat:</span>
                                    <span className="w-2/3">{selectedService.unit}</span>
                                </div>
                            )}
                            {selectedService.price_per_unit && (
                                <div className="py-2 flex">
                                    <span className="w-1/3 text-gray-500">Preu/unitat:</span>
                                    <span className="w-2/3">{selectedService.price_per_unit} €</span>
                                </div>
                            )}
                            {selectedService.min_price && (
                                <div className="py-2 flex">
                                    <span className="w-1/3 text-gray-500">Preu mínim:</span>
                                    <span className="w-2/3">{selectedService.min_price} €</span>
                                </div>
                            )}
                            {selectedService.max_price && (
                                <div className="py-2 flex">
                                    <span className="w-1/3 text-gray-500">Preu màxim:</span>
                                    <span className="w-2/3">{selectedService.max_price} €</span>
                                </div>
                            )}
                            {selectedService.type && (
                                <div className="py-2 flex">
                                    <span className="w-1/3 text-gray-500">Tipus:</span>
                                    <span className="w-2/3">{selectedService.type}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setSelectedService(null)}
                                className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
                            >
                                Tancar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showServiceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-scaleIn">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <TrashIcon className="h-8 w-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Eliminar Servei</h3>
                            <p className="text-gray-600 mb-6">Estàs segur que vols eliminar aquest servei?</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowServiceModal(false)}
                                    className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                                >
                                    Cancel·lar
                                </button>
                                <button
                                    onClick={() => {
                                        router.delete(route("company.services.destroy", serviceToDelete))
                                        setShowServiceModal(false)
                                    }}
                                    className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {planToChange && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-scaleIn text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                            <CheckCircleIcon className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Canviar de Pla</h3>
                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols canviar al pla <strong>{planToChange.name}</strong> per {planToChange.price}€/mes?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setPlanToChange(null)}
                                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        await axios.put("/company/change-plan", { plan_id: planToChange.id })
                                        setPlanToChange(null)
                                        addNotification("Subscripció canviada correctament", "success")
                                        window.location.reload()
                                    } catch (error) {
                                        console.error("Error al canviar de pla", error)
                                        addNotification("Error al canviar de pla", "error")
                                    }
                                }}
                                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-pulse {
                    animation: pulse 3s infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 0.9; }
                }
            `}</style>
        </div>
    )
}
