"use client"

import { useState, useEffect } from "react"
import {
    UsersIcon,
    WrenchScrewdriverIcon,
    ClipboardDocumentListIcon,
    StarIcon,
    CurrencyEuroIcon,
    ArrowTrendingUpIcon,
    BuildingOffice2Icon,
} from "@heroicons/react/24/outline"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardStats({ company }) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const chartData = company.monthlyStats.map((stat) => ({
        name: stat.month,
        ingressos: stat.income,
        projectes: stat.projects * 1000,
        treballadors: stat.workers * 2000,
    }))

    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Treballadors"
                    value={`${company.stats.activeWorkers} / ${company.stats.totalWorkers}`}
                    description="Actius / Total"
                    icon={UsersIcon}
                    color="#9e2a2f"
                    delay={0}
                />
                <StatCard
                    title="Serveis"
                    value={`${company.stats.activeServices} / ${company.stats.totalServices}`}
                    description="Actius / Total"
                    icon={WrenchScrewdriverIcon}
                    color="#9e2a2f"
                    delay={150}
                />
                <StatCard
                    title="Projectes en curs"
                    value={company.stats.ongoingProjects}
                    description="Projectes actuals"
                    icon={ClipboardDocumentListIcon}
                    color="#9e2a2f"
                    delay={300}
                />
                <StatCard
                    title="Valoració mitjana"
                    value={`${company.stats.clientsRating} / 5`}
                    description={`${company.stats.totalReviews} valoracions`}
                    icon={StarIcon}
                    color="#9e2a2f"
                    delay={450}
                />
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    title="Ingressos mensuals"
                    value={`${company.stats.monthlyIncome.toLocaleString()} €`}
                    description="Aquest mes"
                    icon={CurrencyEuroIcon}
                    color="#9e2a2f"
                    delay={600}
                    className="md:col-span-1"
                />
                <StatCard
                    title="Creixement anual"
                    value={`${company.stats.yearlyGrowth}%`}
                    description="Respecte l'any anterior"
                    icon={ArrowTrendingUpIcon}
                    color="#9e2a2f"
                    delay={750}
                    className="md:col-span-1"
                />
                <StatCard
                    title="Servei més sol·licitat"
                    value={company.stats.mostRequestedService}
                    description={`Duració mitjana: ${company.stats.averageProjectDuration} dies`}
                    icon={BuildingOffice2Icon}
                    color="#9e2a2f"
                    delay={900}
                    className="md:col-span-1"
                />
            </div>

            {/* Chart */}
            <div
                className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10 transition-all duration-1000 delay-[1050ms] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Evolució mensual</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === "ingressos") return [`${value.toLocaleString()} €`, "Ingressos"]
                                    if (name === "projectes") return [value / 1000, "Projectes"]
                                    if (name === "treballadors") return [value / 2000, "Treballadors"]
                                    return [value, name]
                                }}
                            />
                            <Bar dataKey="ingressos" fill="#9e2a2f" name="Ingressos" />
                            <Bar dataKey="projectes" fill="#f59e0b" name="Projectes" />
                            <Bar dataKey="treballadors" fill="#3b82f6" name="Treballadors" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Additional Stats */}
            <div
                className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-1000 delay-[1200ms] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Estadístiques addicionals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-500">Projectes completats</p>
                        <p className="text-2xl font-bold text-gray-800">{company.stats.completedProjects}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-500">Valoracions positives</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {company.stats.positiveReviews} de {company.stats.totalReviews}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-500">Taxa de retenció de clients</p>
                        <p className="text-2xl font-bold text-gray-800">{company.stats.clientRetentionRate}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Stat Card Component
function StatCard({ title, value, description, icon: Icon, color, delay, className = "" }) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div
            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 hover:scale-[1.02] ${className} ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full bg-[${color}]/10 flex items-center justify-center mr-4`}>
                    <Icon className={`h-6 w-6 text-[${color}]`} />
                </div>
                <div>
                    <h3 className="font-bold text-xl text-gray-900">{title}</h3>
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    )
}
