"use client"

import { useState, useCallback } from "react"
import Notification from "./Notification"

export default function NotificationsContainer() {
    const [notifications, setNotifications] = useState([])

    const addNotification = useCallback((message, type = "success", duration = 4000) => {
        const id = Date.now()
        setNotifications((prev) => [...prev, { id, message, type, duration }])
    }, [])

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
    }

    return (
        <>
            {notifications.map((notif) => (
                <Notification
                    key={notif.id}
                    id={notif.id}
                    message={notif.message}
                    type={notif.type}
                    duration={notif.duration}
                    onClose={removeNotification}
                />
            ))}



        </>
    )
}
