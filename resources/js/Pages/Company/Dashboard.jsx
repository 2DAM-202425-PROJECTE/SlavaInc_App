"use client"

import { useState } from "react"
import { usePage } from "@inertiajs/react"
import {
    ChartBarIcon,
    UsersIcon,
    WrenchScrewdriverIcon,
    ClipboardDocumentListIcon,
    StarIcon,
    UserCircleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline"

import DashboardStats from "./components/dashboard-stats"
import WorkersSection from "./components/workers-section"
import ServicesSection from "./components/services-section"
import OngoingServicesSection from "./components/ongoing-services-section"
import RatingsSection from "./components/ratings-section"
import ProfileSection from "./components/profile-section"
import SettingsSection from "./components/settings-section"

export default function CompanyProfileAdmin() {
    const { company } = usePage().props
    const [activeTab, setActiveTab] = useState("dashboard")

    // Tabs configuration
    const tabs = [
        { id: "dashboard", name: "Dashboard", icon: ChartBarIcon },
        { id: "workers", name: "Treballadors", icon: UsersIcon },
        { id: "services", name: "Serveis", icon: WrenchScrewdriverIcon },
        { id: "ongoing", name: "Serveis en curs", icon: ClipboardDocumentListIcon },
        { id: "ratings", name: "Valoracions", icon: StarIcon },
        { id: "profile", name: "Perfil", icon: UserCircleIcon },
        { id: "settings", name: "Configuració", icon: Cog6ToothIcon },
    ]

    // Render the active section based on the selected tab
    const renderActiveSection = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardStats company={company} />
            case "workers":
                return <WorkersSection company={company} />
            case "services":
                return <ServicesSection company={company} />
            case "ongoing":
                return <OngoingServicesSection company={company} />
            case "ratings":
                return <RatingsSection company={company} />
            case "profile":
                return <ProfileSection company={company} />
            case "settings":
                return <SettingsSection company={company} />
            default:
                return <DashboardStats company={company} />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            {/* Hero Section with Animated Gradient Background */}
            <section className="relative w-full bg-gradient-to-br from-[#9e2a2f] via-[#b83e43] to-[#9e2a2f] py-12 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjMDAwIiBvcGFjaXR5PSIuMDUiIGQ9Ik0wIDBoMTQ0MHY3NjBIMHoiLz48cGF0aCBkPSJNLTcwLjUgNDg5LjVjMTkuMzMzLTI0LjY2NyA0MC42NjctNDQgNjQtNTggNzAtNDIgMTE3IDAgMTY4IDMyIDUxLjMzMyAzMiAxMDIuNjY3IDI4IDE1NC0xMiA1MS4zMzMtNDAgMTAyLjY2Ny01MiAxNTQtMzYgNTEuMzMzIDE2IDEwMi42NjcgNjggMTU0IDE1NiA1MS4zMzMgODggMTAyLjY2NyAxMzIgMTU0IDEzMiA1MS4zMzMgMCAxMDIuNjY3LTQ0IDE1NC0xMzIgNTEuMzMzLTg4IDEwMi42NjctMTQwIDE1NC0xNTYgNTEuMzMzLTE2IDEwMi42NjcgNCAxNTQgNjAgNTEuMzMzIDU2IDEwMi42NjcgNzYgMTU0IDYwIDUxLjMzMy0xNiAxMDIuNjY3LTY4IDE1NC0xNTYgNTEuMzMzLTg4IDEwMi42NjctMTMyIDE1NC0xMzIgNTEuMzMzIDAgMTAyLjY2NyA0NCAxNTQgMTMyIDUxLjMzMyA4OCAxMDIuNjY3IDE0MCAxNTQgMTU2IDUxLjMzMyAxNiAxMDIuNjY3LTQgMTU0LTYwIDUxLjMzMy01NiAxMDIuNjY3LTc2IDE1NC02MCIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#9e2a2f]/30"></div>

                <div className="max-w-6xl mx-auto text-center relative z-10 transition-all duration-1000 opacity-100 translate-y-0">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">{company.info.name}</h1>
                    <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                        Gestiona la teva empresa, treballadors i serveis fàcilment des d'un sol lloc
                    </p>
                </div>
            </section>

            {/* Navigation Tabs */}
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

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderActiveSection()}</div>

            {/* Add CSS animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
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
