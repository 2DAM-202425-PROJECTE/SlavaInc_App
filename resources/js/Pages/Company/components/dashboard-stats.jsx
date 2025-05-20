"use client"

import { useState, useEffect, useMemo } from "react"
import {
    UsersIcon,
    WrenchScrewdriverIcon,
    ClipboardDocumentListIcon,
    StarIcon,
    CurrencyEuroIcon,
    ArrowTrendingUpIcon,
    BuildingOffice2Icon,
    CalendarIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    UserGroupIcon,
    ChartPieIcon,
    ChartBarIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line,
    AreaChart,
    Area,
} from "recharts"

export default function DashboardStats({ company, onRequestUpgrade }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeFilter, setActiveFilter] = useState("empresa")
    const monthlyAdvancedData = company.monthlyAdvancedStats || []
    const plan = company?.plan || {}
    const isBasicPlan = plan.name?.toLowerCase() === "bàsic"
    const canViewStats = plan.can_view_stats ?? false
    const hasExtraStats = plan.extra_stats ?? false
    const basicStats = !hasExtraStats && canViewStats
    const advancedStats = hasExtraStats
    const [tooltipPayload, setTooltipPayload] = useState(null)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    if (!canViewStats || isBasicPlan) {
        return (
            <div className="bg-yellow-50 p-6 rounded-xl text-center border border-yellow-200 mt-6">
                <h2 className="text-2xl font-semibold text-yellow-800 mb-2">Accés restringit</h2>
                <p className="text-sm text-yellow-700 mb-4">
                    El teu pla actual no permet accedir a les estadístiques. Actualitza per desbloquejar aquesta funcionalitat.
                </p>
                <a
                    onClick={onRequestUpgrade}
                    className="inline-block cursor-pointer bg-[#9e2a2f] text-white px-4 py-2 rounded-md font-medium hover:bg-[#7e1f23] transition"
                >
                    Actualitza el teu pla
                </a>
            </div>
        )
    }

    function PieCard({ icon: Icon, title, data, valueSuffix = "", labelType = "value", COLORS, delay }) {
        return (
            <div
                className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-1000 delay-[${delay}ms] opacity-100 translate-y-0`}
            >
                <div className="flex items-center mb-6">
                    <Icon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="label"
                                label={({ name, value, percent }) =>
                                    labelType === "percent"
                                        ? `${name}: ${(percent * 100).toFixed(0)}%`
                                        : `${name}: ${value}${valueSuffix}`
                                }
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <RechartsTooltip content={<CustomPieTooltip payload={tooltipPayload} active={!!tooltipPayload} />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

    // Prepare chart data
    const chartData = useMemo(() => {
        return (company.monthlyStats ?? []).map((stat) => ({
            name: stat.month,
            ingressos: stat.income,
            projectes: stat.projects,
            treballadors: stat.workers,
        }))
    }, [company.monthlyStats])

    // Colors for charts
    const COLORS = ["#9e2a2f", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#6366f1", "#14b8a6"]

    // Format number with commas
    const formatNumber = (num) => {
        return num?.toLocaleString() || "0"
    }

    // Custom tooltip for pie charts
    const CustomPieTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
                    <p className="font-semibold">{payload[0].name}</p>
                    <p className="text-[#9e2a2f]">{`Valor: ${payload[0].value}`}</p>
                </div>
            )
        }
        return null
    }

    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                        <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex gap-2">
                        <button
                            className={`px-3 py-2 text-sm rounded-md ${activeFilter === "empresa" ? "bg-[#9e2a2f] text-white" : "bg-gray-100 text-gray-700"}`}
                            onClick={() => setActiveFilter("empresa")}
                        >
                            Empresa
                        </button>
                        <button
                            className={`px-3 py-2 text-sm rounded-md ${activeFilter === "revenue" ? "bg-[#9e2a2f] text-white" : "bg-gray-100 text-gray-700"}`}
                            onClick={() => setActiveFilter("revenue")}
                        >
                            Ingressos
                        </button>
                        <button
                            className={`px-3 py-2 text-sm rounded-md ${activeFilter === "ratings" ? "bg-[#9e2a2f] text-white" : "bg-gray-100 text-gray-700"}`}
                            onClick={() => setActiveFilter("ratings")}
                        >
                            Valoracions
                        </button>
                        <button
                            className={`px-3 py-2 text-sm rounded-md ${activeFilter === "servicesAppointments" ? "bg-[#9e2a2f] text-white" : "bg-gray-100 text-gray-700"}`}
                            onClick={() => setActiveFilter("servicesAppointments")}
                        >
                            Serveis i Cites
                        </button>
                    </div>
                </div>
            </div>

            {/* First Row - Workers */}
            {(activeFilter === "empresa") && (basicStats || advancedStats) && (
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <StatCard
                        title="Treballadors"
                        value={`${company.stats.activeWorkers} / ${company.stats.totalWorkers}`}
                        description="Actius / Total"
                        icon={UsersIcon}
                        color="#9e2a2f"
                        delay={0}
                    />
                </div>
            )}

            {/* Second Row - Services, Projects, Ratings */}
            {(basicStats || advancedStats) &&
                (activeFilter === "empresa" || activeFilter === "servicesAppointments" || activeFilter === "ratings") && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard
                            title="Serveis"
                            value={` ${company.stats.totalServices}`}
                            description="Total"
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
                )}

            {/* Third Row - Income, Growth, Most Requested Service */}
            {(basicStats || advancedStats) &&  (activeFilter === "empresa" || activeFilter === "revenue") && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard
                        title="Ingressos mensuals"
                        value={`${formatNumber(company.stats.monthlyIncome)} €`}
                        description="Aquest mes"
                        icon={CurrencyEuroIcon}
                        color="#9e2a2f"
                        delay={600}
                    />
                    <StatCard
                        title="Creixement anual"
                        value={`${company.stats.yearlyGrowth}%`}
                        description="Respecte l'any anterior"
                        icon={ArrowTrendingUpIcon}
                        color="#9e2a2f"
                        delay={750}
                    />
                    <StatCard
                        title="Servei més sol·licitat"
                        value={company.stats.mostRequestedService}
                        icon={BuildingOffice2Icon}
                        color="#9e2a2f"
                        delay={900}
                    />
                </div>
            )}

            {/* Fourth Row - Cancellation, Completion, Time to Appointment, Clients */}
            {(activeFilter === "empresa" || activeFilter === "servicesAppointments") && (
                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    {!advancedStats && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Estadístiques avançades</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                                Actualitza el teu pla per accedir a estadístiques detallades sobre les teves cites i clients.
                            </p>
                            <button
                                onClick={onRequestUpgrade}
                                className="bg-[#9e2a2f] text-white px-4 py-2 rounded-md font-medium hover:bg-[#7e1f23] transition"
                            >
                                Actualitza ara
                            </button>
                        </div>
                    )}
                    <StatCard
                        title="Taxa de cancel·lació"
                        value={advancedStats ? `${company.advancedStats.cancelRate}%` : "?"}
                        description="Cites cancel·lades"
                        icon={XCircleIcon}
                        color="#9e2a2f"
                        delay={1050}
                    />
                    <StatCard
                        title="Taxa de finalització"
                        value={advancedStats ? `${company.advancedStats.completionRate}%` : "?"}
                        description="Cites completades"
                        icon={CheckCircleIcon}
                        color="#9e2a2f"
                        delay={1200}
                    />
                    <StatCard
                        title="Temps mitjà fins cita"
                        value={advancedStats ? `${company.advancedStats.avgTimeToAppointment} dies` : "?"}
                        description="Entre reserva i execució"
                        icon={ClockIcon}
                        color="#9e2a2f"
                        delay={1350}
                    />
                    <StatCard
                        title="Clients"
                        value={
                            advancedStats ? `${company.advancedStats.uniqueClients} / ${company.advancedStats.repeatClients}` : "?"
                        }
                        description="Únics / Recurrents"
                        icon={UserGroupIcon}
                        color="#9e2a2f"
                        delay={1500}
                    />
                </div>
            )}

            {/* Pie Charts Section */}
            {(activeFilter === "revenue" || activeFilter === "servicesAppointments" || activeFilter === "ratings") && (
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {!advancedStats && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Gràfics avançats</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                                Actualitza el teu pla per visualitzar gràfics detallats sobre els teus serveis i ingressos.
                            </p>
                            <button
                                onClick={onRequestUpgrade}
                                className="bg-[#9e2a2f] text-white px-4 py-2 rounded-md font-medium hover:bg-[#7e1f23] transition"
                            >
                                Actualitza ara
                            </button>
                        </div>
                    )}
                    {(activeFilter === "revenue" || activeFilter === "servicesAppointments") && (
                        <>
                            {/* Most Requested Services */}
                            <PieCard
                                icon={ChartPieIcon}
                                title="Serveis més sol·licitats"
                                data={
                                    advancedStats
                                        ? company.charts.mostRequestedServicesPie
                                        : [
                                            { label: "Exemple 1", value: 40 },
                                            { label: "Exemple 2", value: 30 },
                                            { label: "Exemple 3", value: 30 },
                                        ]
                                }
                                valueSuffix="%"
                                labelType="percent"
                                COLORS={COLORS}
                                delay={1650}
                            />

                            {/* Revenue Per Service */}
                            <PieCard
                                icon={CurrencyEuroIcon}
                                title="Ingressos per servei"
                                data={
                                    advancedStats
                                        ? company.charts.revenuePerServicePie
                                        : [
                                            { label: "Exemple 1", value: 5000 },
                                            { label: "Exemple 2", value: 3000 },
                                            { label: "Exemple 3", value: 2000 },
                                        ]
                                }
                                valueSuffix="€"
                                labelType="value"
                                COLORS={COLORS}
                                delay={1950}
                            />
                        </>
                    )}

                    {(activeFilter === "ratings" || activeFilter === "servicesAppointments") && (
                        <>
                            {/* Top Rated Services */}
                            <PieCard
                                icon={StarIcon}
                                title="Serveis millor valorats"
                                data={
                                    advancedStats
                                        ? company.charts.topRatedServicesPie
                                        : [
                                            { label: "Exemple 1", value: 4.8 },
                                            { label: "Exemple 2", value: 4.5 },
                                            { label: "Exemple 3", value: 4.2 },
                                        ]
                                }
                                labelType="value"
                                COLORS={COLORS}
                                delay={1800}
                            />

                            {/* Reviews Per Service */}
                            <PieCard
                                icon={ClipboardDocumentListIcon}
                                title="Ressenyes per servei"
                                data={
                                    advancedStats
                                        ? company.charts.reviewsPerServicePie
                                        : [
                                            { label: "Exemple 1", value: 45 },
                                            { label: "Exemple 2", value: 30 },
                                            { label: "Exemple 3", value: 25 },
                                        ]
                                }
                                labelType="value"
                                COLORS={COLORS}
                                delay={2100}
                            />
                        </>
                    )}
                </div>
            )}

            {/* Monthly Average Ratings Chart */}
            {activeFilter === "ratings" && (
                <div
                    className={`relative bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10 transition-all duration-1000 delay-[2400ms] ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {!advancedStats && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Evolució de valoracions</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                                Actualitza el teu pla per veure l'evolució de les valoracions dels teus clients al llarg del temps.
                            </p>
                            <button
                                onClick={onRequestUpgrade}
                                className="bg-[#9e2a2f] text-white px-4 py-2 rounded-md font-medium hover:bg-[#7e1f23] transition"
                            >
                                Actualitza ara
                            </button>
                        </div>
                    )}
                    <div className="flex items-center mb-6">
                        <StarIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">Valoració mitjana mensual</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={
                                    advancedStats
                                        ? company.advancedStats.monthlyAverageRatings
                                        : [
                                            { month: "Gen", value: 4.2 },
                                            { month: "Feb", value: 4.3 },
                                            { month: "Mar", value: 4.1 },
                                            { month: "Abr", value: 4.4 },
                                            { month: "Mai", value: 4.5 },
                                            { month: "Jun", value: 4.6 },
                                        ]
                                }
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[0, 5]} />
                                <RechartsTooltip formatter={(value) => [`${value}`, "Valoració mitjana"]} />
                                <Area type="monotone" dataKey="value" stroke="#9e2a2f" fill="#9e2a2f" fillOpacity={0.2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
            {/* Appointments by Status */}
            {activeFilter === "servicesAppointments" && (
                <div
                    className={`relative bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10 transition-all duration-1000 delay-[2550ms] ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {!advancedStats && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Anàlisi de cites</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                                Actualitza el teu pla per analitzar l'estat de les teves cites i millorar la gestió del teu negoci.
                            </p>
                            <button
                                onClick={onRequestUpgrade}
                                className="bg-[#9e2a2f] text-white px-4 py-2 rounded-md font-medium hover:bg-[#7e1f23] transition"
                            >
                                Actualitza ara
                            </button>
                        </div>
                    )}
                    <div className="flex items-center mb-6">
                        <CalendarIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">Cites per estat</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={
                                    advancedStats
                                        ? Object.entries(company.advancedStats.appointmentsByStatus).map(([key, value]) => ({
                                            name:
                                                key === "pending"
                                                    ? "Pendents"
                                                    : key === "confirmed"
                                                        ? "Confirmades"
                                                        : key === "completed"
                                                            ? "Completades"
                                                            : "Cancel·lades",
                                            value: value,
                                        }))
                                        : [
                                            { name: "Pendents", value: 15 },
                                            { name: "Confirmades", value: 25 },
                                            { name: "Completades", value: 40 },
                                            { name: "Cancel·lades", value: 10 },
                                        ]
                                }
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip formatter={(value) => [`${value}`, "Cites"]} />
                                <Bar dataKey="value" fill="#9e2a2f" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
            {/* Services with Cancellations */}
            {activeFilter === "servicesAppointments" && (
                <div
                    className={`relative bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10 transition-all duration-1000 delay-[2700ms] ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {!advancedStats && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Anàlisi de cancel·lacions</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                                Actualitza el teu pla per identificar els serveis amb més cancel·lacions i millorar la teva oferta.
                            </p>
                            <button
                                onClick={onRequestUpgrade}
                                className="bg-[#9e2a2f] text-white px-4 py-2 rounded-md font-medium hover:bg-[#7e1f23] transition"
                            >
                                Actualitza ara
                            </button>
                        </div>
                    )}
                    <div className="flex items-center mb-6">
                        <XCircleIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">Serveis amb més cancel·lacions</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={
                                    advancedStats
                                        ? company.advancedStats.servicesWithCancellations
                                        : [
                                            { label: "Servei Exemple 1", value: 12 },
                                            { label: "Servei Exemple 2", value: 8 },
                                            { label: "Servei Exemple 3", value: 6 },
                                            { label: "Servei Exemple 4", value: 4 },
                                        ]
                                }
                                layout="vertical"
                                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="label" width={100} />
                                <RechartsTooltip formatter={(value) => [`${value}`, "Cancel·lacions"]} />
                                <Bar dataKey="value" fill="#9e2a2f" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {activeFilter === "empresa" && (
                <div
                    className={`relative bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10 transition-all duration-1000 delay-[2250ms] ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {!advancedStats && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Evolució mensual</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                                Actualitza el teu pla per veure l'evolució mensual dels teus ingressos, projectes i treballadors.
                            </p>
                            <button
                                onClick={onRequestUpgrade}
                                className="bg-[#9e2a2f] text-white px-4 py-2 rounded-md font-medium hover:bg-[#7e1f23] transition"
                            >
                                Actualitza ara
                            </button>
                        </div>
                    )}
                    <div className="flex items-center mb-6">
                        <ChartBarIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">Evolució mensual</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip
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
            )}
            {activeFilter === "empresa" && (
                <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10">
                    {!advancedStats && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Evolució de rendiment</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                                Actualitza el teu pla per accedir a l'evolució detallada del rendiment del teu negoci al llarg del
                                temps.
                            </p>
                            <button
                                onClick={onRequestUpgrade}
                                className="bg-[#9e2a2f] text-white px-4 py-2 rounded-md font-medium hover:bg-[#7e1f23] transition"
                            >
                                Actualitza ara
                            </button>
                        </div>
                    )}
                    <div className="flex items-center mb-6">
                        <ChartBarIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">Evolució de rendiment mensual</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={
                                    advancedStats
                                        ? monthlyAdvancedData
                                        : [
                                            { month: "Gen", cancelRate: 15, completionRate: 85, avgTimeToAppointment: 3 },
                                            { month: "Feb", cancelRate: 12, completionRate: 88, avgTimeToAppointment: 2.5 },
                                            { month: "Mar", cancelRate: 10, completionRate: 90, avgTimeToAppointment: 2 },
                                            { month: "Abr", cancelRate: 8, completionRate: 92, avgTimeToAppointment: 1.5 },
                                            { month: "Mai", cancelRate: 7, completionRate: 93, avgTimeToAppointment: 1 },
                                            { month: "Jun", cancelRate: 5, completionRate: 95, avgTimeToAppointment: 1 },
                                        ]
                                }
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <RechartsTooltip />
                                <Legend />
                                <Line type="monotone" dataKey="cancelRate" stroke="#ef4444" name="Taxa cancel·lació" />
                                <Line type="monotone" dataKey="completionRate" stroke="#10b981" name="Taxa finalització" />
                                <Line type="monotone" dataKey="avgTimeToAppointment" stroke="#3b82f6" name="Temps mitjà fins cita" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Additional Stats */}
            {activeFilter === "empresa" && (
                <div
                    className={`relative bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-1000 delay-[2850ms] ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {!advancedStats && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Estadístiques addicionals</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center max-w-md">
                                Actualitza el teu pla per accedir a estadístiques addicionals sobre el teu negoci.
                            </p>
                            <button
                                onClick={onRequestUpgrade}
                                className="bg-[#9e2a2f] text-white px-4 py-2 rounded-md font-medium hover:bg-[#7e1f23] transition"
                            >
                                Actualitza ara
                            </button>
                        </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Estadístiques addicionals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            )}
        </div>
    )
}

// Stat Card Component
function StatCard({ title, value, description, icon: Icon, color, delay, className = "" }) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div
            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 hover:scale-[1.02] ${className} ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
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
