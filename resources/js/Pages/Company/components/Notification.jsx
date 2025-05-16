"use client"

import { useEffect, useState } from "react"
import {
    CheckCircleIcon,
    XCircleIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"

export default function Notification({ id, message, type = "success", duration = 4000, onClose }) {
    const [isVisible, setIsVisible] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)

    const notificationConfig = {
        success: {
            icon: CheckCircleIcon,
            bgColor: "bg-white",
            textColor: "text-green-800",
            borderColor: "border-green-500",
            iconColor: "text-green-500",
        },
        error: {
            icon: XCircleIcon,
            bgColor: "bg-white",
            textColor: "text-[#9e2a2f]",
            borderColor: "border-[#9e2a2f]",
            iconColor: "text-[#9e2a2f]",
        },
        info: {
            icon: InformationCircleIcon,
            bgColor: "bg-white",
            textColor: "text-blue-800",
            borderColor: "border-blue-500",
            iconColor: "text-blue-500",
        },
        warning: {
            icon: ExclamationTriangleIcon,
            bgColor: "bg-white",
            textColor: "text-amber-800",
            borderColor: "border-amber-500",
            iconColor: "text-amber-500",
        },
    }

    const config = notificationConfig[type]
    const Icon = config.icon

    useEffect(() => {
        const entryTimeout = setTimeout(() => {
            setIsVisible(true)
        }, 10)

        return () => clearTimeout(entryTimeout)
    }, [])

    useEffect(() => {
        if (!duration) return

        const hideTimeout = setTimeout(() => {
            handleClose()
        }, duration)

        return () => clearTimeout(hideTimeout)
    }, [duration])

    const handleClose = () => {
        setIsLeaving(true)
        setTimeout(() => {
            setIsVisible(false)
            if (onClose) onClose(id)
        }, 500)
    }

    if (!isVisible && isLeaving) return null

    return (
        <div
            className={`fixed top-20 right-6 z-50 flex items-center max-w-md transform transition-all duration-500 ease-in-out ${
                isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
            role="alert"
            aria-live="assertive"
        >

            <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4 ${config.bgColor} ${config.textColor} ${config.borderColor}`}
            >
                <Icon className={`h-5 w-5 ${config.iconColor}`} />
                <p className="font-medium">{message}</p>
                <button
                    onClick={handleClose}
                    className="ml-3 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Tancar notificació"
                >
                    <XMarkIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
