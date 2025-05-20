import { Link } from "@inertiajs/react"
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function Header({
                                   theme = "bg-gradient-to-r from-[#600f0f] via-[#9e2a2f] to-[#b81b1b]",
                                   title,
                                   showBackToDashboard = true,
                               }) {
    return (
        <header className={`w-full ${theme} shadow-md`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                        {showBackToDashboard && (
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-center h-9 w-9 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <HomeIcon className="h-5 w-5 text-white" />
                            </Link>
                        )}
                        <h1 className="text-xl font-semibold text-white">{title || "Panell d'Administració"}</h1>
                    </div>

                    {showBackToDashboard && (
                        <Link
                            href="/dashboard"
                            className="flex items-center text-white text-sm font-medium hover:text-white/80 transition-colors"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                            Tornar al Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}
