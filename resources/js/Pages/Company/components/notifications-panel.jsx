"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
    BellIcon,
    StarIcon,
    ShoppingCartIcon,
    CogIcon,
    XMarkIcon,
    ClockIcon,
    ChevronRightIcon,
    UserPlusIcon,
    WrenchScrewdriverIcon,
    BuildingOffice2Icon,
    ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"
import { router } from "@inertiajs/react"

export default function NotificationsPanel({ isOpen, onClose, notifications = [], showSystemNotifications = true }) {
    const [activeTab, setActiveTab] = useState("all")
    const [isVisible, setIsVisible] = useState(false)
    const [allNotifications, setAllNotifications] = useState(notifications)

    useEffect(() => {
        setAllNotifications(notifications)
    }, [notifications])

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 10)
        } else {
            setIsVisible(false)
        }
    }, [isOpen])

    const formatRelativeTime = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diff = Math.floor((now - date) / 1000)
        if (diff < 60) return "Fa uns segons"
        if (diff < 3600) return `Fa ${Math.floor(diff / 60)} minuts`
        if (diff < 86400) return `Fa ${Math.floor(diff / 3600)} hores`
        if (diff < 604800) return `Fa ${Math.floor(diff / 86400)} dies`
        return date.toLocaleDateString("ca-ES", { day: "numeric", month: "short" })
    }

    const markAsRead = async (id) => {
        try {
            await axios.patch(`/notifications/${id}/read`)
            router.reload({ only: ['company'] }) // 🔁 refresca les notificacions
        } catch (error) {
            console.error("Error marcant com a llegida:", error)
        }
    }


    const markAllAsRead = async () => {
        try {
            await axios.patch('/notifications/mark-all-read')
            router.reload({ only: ['company'] }) // 🔁 refresca les notificacions
        } catch (error) {
            console.error("Error marcant totes com a llegides:", error)
        }
    }


    const filteredNotifications = allNotifications.filter((notif) => {
        if (!showSystemNotifications && notif.type === "system") return false
        if (activeTab === "all") return !notif.read
        return notif.type === activeTab && !notif.read
    })

    const getNotificationIcon = (notification) => {
        const cls = "h-6 w-6 text-[#9e2a2f]"
        switch (notification.type) {
            case "review": return <ChatBubbleLeftIcon className={cls} />
            case "service":
            case "appointment": return <ShoppingCartIcon className={cls} />
            case "system":
                if (notification.action === "worker_added") return <UserPlusIcon className={cls} />
                if (notification.action === "service_added") return <WrenchScrewdriverIcon className={cls} />
                return <CogIcon className={cls} />
            default: return <BellIcon className={cls} />
        }
    }

    const renderNotificationContent = (notification) => {
        const data = notification.data || {}

        switch (notification.type) {
            case "review":
                return (
                    <>
                        <div className="mb-1">
                            <span className="font-semibold">{data.clientName}</span> ha deixat una valoració
                        </div>
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) =>
                                i < (data.rating || 0)
                                    ? <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
                                    : <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                            )}
                            <span className="ml-2 text-sm text-gray-500">per a {data.serviceName}</span>
                        </div>
                        {data.comment && (
                            <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded-md">"{data.comment}"</p>
                        )}
                        <button
                            onClick={() => markAsRead(notification.id)}
                            className="mt-1 text-xs text-[#9e2a2f] hover:underline"
                        >
                            Marcar com a llegida
                        </button>
                    </>
                )

            case "appointment":
            case "service":
                return (
                    <>
                        <div className="mb-1 font-semibold text-sm text-[#9e2a2f]">Servei contractat</div>
                        {data.serviceName && (
                            <div className="text-sm text-gray-700 mb-1">
                                <WrenchScrewdriverIcon className="h-4 w-4 inline-block mr-1 text-gray-500" />
                                <span>{data.serviceName}</span>
                            </div>
                        )}
                        {data.location && (
                            <div className="text-sm text-gray-600 mb-1">
                                <BuildingOffice2Icon className="h-4 w-4 inline-block mr-1 text-gray-500" />
                                {data.location}
                            </div>
                        )}
                        {data.date && data.time && (
                            <div className="text-sm text-gray-600 mb-2">
                                <ClockIcon className="h-4 w-4 inline-block mr-1 text-gray-500" />
                                {data.date} — {data.time}
                            </div>
                        )}
                        <button
                            onClick={() => markAsRead(notification.id)}
                            className="mt-1 text-xs text-[#9e2a2f] hover:underline"
                        >
                            Marcar com a llegida
                        </button>
                    </>
                )

            case "system":
                let actionText = notification.message || ""
                if (notification.action === "worker_added" && data.workerName) {
                    actionText = `S'ha afegit un nou treballador: ${data.workerName}`
                } else if (notification.action === "service_added" && data.serviceName) {
                    actionText = `S'ha afegit un nou servei: ${data.serviceName}`
                }
                return (
                    <>
                        <div className="mb-1">{actionText}</div>
                        <button
                            onClick={() => markAsRead(notification.id)}
                            className="mt-1 text-xs text-[#9e2a2f] hover:underline"
                        >
                            Marcar com a llegida
                        </button>
                    </>
                )

            default:
                return <div className="mb-1">{notification.message}</div>
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden"
            onClick={onClose}
            style={{
                opacity: isVisible ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
                transition: 'opacity 0.3s ease'
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-25 transition-opacity" style={{ opacity: isVisible ? 1 : 0 }} />
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <div
                    className={`w-screen max-w-md transform transition-all duration-500 ease-in-out ${
                        isVisible ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex h-full flex-col bg-white shadow-xl">
                        <div className="px-4 py-6 bg-[#9e2a2f] sm:px-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium text-white">Notificacions</h2>
                                <button
                                    type="button"
                                    className="rounded-md bg-[#9e2a2f] text-white hover:bg-[#8a2329]"
                                    onClick={onClose}
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-4 flex space-x-1 border-b border-[#8a2329]">
                                {["all", "review", "service", "system"].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`px-3 py-2 text-sm font-medium rounded-t-md transition-colors ${
                                            activeTab === tab
                                                ? "bg-white text-[#9e2a2f]"
                                                : "text-white hover:bg-[#8a2329]"
                                        }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab === "all"
                                            ? "Totes"
                                            : tab === "review"
                                                ? "Valoracions"
                                                : tab === "service"
                                                    ? "Serveis"
                                                    : "Sistema"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <div className="divide-y divide-gray-200">
                                {filteredNotifications.length > 0 ? (
                                    filteredNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className="p-4 hover:bg-gray-50 transition-colors bg-[#9e2a2f]/5"
                                        >
                                            <div className="flex">
                                                <div className="flex-shrink-0 mr-4">
                                                    <div className="h-10 w-10 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center">
                                                        {getNotificationIcon(notification)}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {renderNotificationContent(notification)}
                                                    <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <ClockIcon className="h-4 w-4 mr-1" />
                                                            <span>{formatRelativeTime(notification.created_at)}</span>
                                                        </div>
                                                        {notification.actionUrl && (
                                                            <a
                                                                href={notification.actionUrl}
                                                                className="flex items-center text-[#9e2a2f] hover:text-[#8a2329] font-medium"
                                                            >
                                                                <span>Veure</span>
                                                                <ChevronRightIcon className="h-4 w-4 ml-1" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                        <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                            <BellIcon className="h-10 w-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No hi ha notificacions</h3>
                                        <p className="text-gray-500">
                                            {activeTab === "all"
                                                ? "No tens cap notificació en aquest moment."
                                                : `No tens cap notificació de tipus "${
                                                    activeTab === "review"
                                                        ? "valoracions"
                                                        : activeTab === "service"
                                                            ? "serveis"
                                                            : "sistema"
                                                }".`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {filteredNotifications.length > 0 && (
                            <div className="border-t border-gray-200 p-4">
                                <button
                                    onClick={markAllAsRead}
                                    type="button"
                                    className="w-full rounded-md bg-white px-3 py-2 text-sm font-medium text-[#9e2a2f] shadow-sm ring-1 ring-inset ring-[#9e2a2f] hover:bg-[#9e2a2f]/5"
                                >
                                    Marcar totes com a llegides
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
