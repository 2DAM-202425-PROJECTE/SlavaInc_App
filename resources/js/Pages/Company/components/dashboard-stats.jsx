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
    ArrowPathIcon,
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

export default function DashboardStats({ company }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeFilter, setActiveFilter] = useState("all")
    const [serviceFilter, setServiceFilter] = useState("all")

    const filterChartByService = (chart) => {
        if (serviceFilter === "all") return chart;
        return chart.filter(entry => entry.service_id === Number(serviceFilter));
    };

    const filteredRequested = useMemo(() => filterChartByService(company.charts.mostRequestedServicesPie), [company.charts.mostRequestedServicesPie, serviceFilter]);
    const filteredRated = useMemo(() => filterChartByService(company.charts.topRatedServicesPie), [company.charts.topRatedServicesPie, serviceFilter]);
    const filteredRevenue = useMemo(() => filterChartByService(company.charts.revenuePerServicePie), [company.charts.revenuePerServicePie, serviceFilter]);
    const filteredReviews = useMemo(() => filterChartByService(company.charts.reviewsPerServicePie), [company.charts.reviewsPerServicePie, serviceFilter]);


    useEffect(() => {
        setIsLoaded(true)
    }, [])

    // Extract service names for filter dropdown
    const serviceNames = useMemo(() => {
        if (!company?.services) return []
        return [
            { id: "all", name: "Tots els serveis" },
            ...company.services.map(service => ({
                id: service.service_id,
                name: service.name || service.custom_name,
            })),
        ]
    }, [company?.services])

    // Prepare chart data
    const chartData = useMemo(() => {
        return company.monthlyStats.map((stat) => ({
            name: stat.month,
            ingressos: stat.income,
            projectes: stat.projects * 1000,
            treballadors: stat.workers * 2000,
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
                            className={`px-3 py-2 text-sm rounded-md ${activeFilter === 'all' ? 'bg-[#9e2a2f] text-white' : 'bg-gray-100 text-gray-700'}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            Totes
                        </button>
                        <button
                            className={`px-3 py-2 text-sm rounded-md ${activeFilter === 'revenue' ? 'bg-[#9e2a2f] text-white' : 'bg-gray-100 text-gray-700'}`}
                            onClick={() => setActiveFilter('revenue')}
                        >
                            Ingressos
                        </button>
                        <button
                            className={`px-3 py-2 text-sm rounded-md ${activeFilter === 'ratings' ? 'bg-[#9e2a2f] text-white' : 'bg-gray-100 text-gray-700'}`}
                            onClick={() => setActiveFilter('ratings')}
                        >
                            Valoracions
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Stats Cards */}
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
                    value={`${formatNumber(company.stats.monthlyIncome)} €`}
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

            {/* Advanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Taxa de cancel·lació"
                    value={`${company.advancedStats.cancelRate}%`}
                    description="Cites cancel·lades"
                    icon={XCircleIcon}
                    color="#9e2a2f"
                    delay={1050}
                />
                <StatCard
                    title="Taxa de finalització"
                    value={`${company.advancedStats.completionRate}%`}
                    description="Cites completades"
                    icon={CheckCircleIcon}
                    color="#9e2a2f"
                    delay={1200}
                />
                <StatCard
                    title="Temps mitjà fins cita"
                    value={`${company.advancedStats.avgTimeToAppointment} dies`}
                    description="Entre reserva i execució"
                    icon={ClockIcon}
                    color="#9e2a2f"
                    delay={1350}
                />
                <StatCard
                    title="Clients"
                    value={`${company.advancedStats.uniqueClients} / ${company.advancedStats.repeatClients}`}
                    description="Únics / Recurrents"
                    icon={UserGroupIcon}
                    color="#9e2a2f"
                    delay={1500}
                />
            </div>

            {/* Pie Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Most Requested Services Pie Chart */}
                <div
                    className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-1000 delay-[1650ms] ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="flex items-center mb-6">
                        <ChartPieIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">Serveis més sol·licitats</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={filteredRequested}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="label"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {filteredRequested.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <RechartsTooltip content={<CustomPieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Rated Services Pie Chart */}
                <div
                    className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-1000 delay-[1800ms] ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="flex items-center mb-6">
                        <StarIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">Serveis millor valorats</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={filteredRated}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="label"
                                    label={({ name, value }) => `${name}: ${value}`}
                                >
                                    {filteredRated.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <RechartsTooltip content={<CustomPieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Per Service Pie Chart */}
                <div
                    className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-1000 delay-[1950ms] ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="flex items-center mb-6">
                        <CurrencyEuroIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">Ingressos per servei</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={filteredRevenue}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="label"
                                    label={({ name, value }) => `${name}: ${value}€`}
                                >
                                    {filteredRevenue.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <RechartsTooltip content={<CustomPieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Reviews Per Service Pie Chart */}
                <div
                    className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-1000 delay-[2100ms] ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="flex items-center mb-6">
                        <ClipboardDocumentListIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">Ressenyes per servei</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={filteredReviews}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="label"
                                    label={({ name, value }) => `${name}: ${value}`}
                                >
                                    {filteredReviews.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <RechartsTooltip content={<CustomPieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Monthly Evolution Chart */}
            <div
                className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10 transition-all duration-1000 delay-[2250ms] ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
                <div className="flex items-center mb-6">
                    <ChartBarIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                    <h3 className="text-xl font-bold text-gray-800">Evolució mensual</h3>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

            {/* Monthly Average Ratings Chart */}
            <div
                className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10 transition-all duration-1000 delay-[2400ms] ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
                <div className="flex items-center mb-6">
                    <StarIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                    <h3 className="text-xl font-bold text-gray-800">Valoració mitjana mensual</h3>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={company.advancedStats.monthlyAverageRatings}
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

            {/* Appointments by Status */}
            <div
                className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10 transition-all duration-1000 delay-[2550ms] ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
                <div className="flex items-center mb-6">
                    <CalendarIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                    <h3 className="text-xl font-bold text-gray-800">Cites per estat</h3>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={Object.entries(company.advancedStats.appointmentsByStatus).map(([key, value]) => ({
                                name: key === "pending"
                                    ? "Pendents"
                                    : key === "confirmed"
                                        ? "Confirmades"
                                        : key === "completed"
                                            ? "Completades"
                                            : "Cancel·lades",
                                value: value,
                            }))}
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

            {/* Services with Cancellations */}
            <div
                className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10 transition-all duration-1000 delay-[2700ms] ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
                <div className="flex items-center mb-6">
                    <XCircleIcon className="h-6 w-6 text-[#9e2a2f] mr-2" />
                    <h3 className="text-xl font-bold text-gray-800">Serveis amb més cancel·lacions</h3>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={company.advancedStats.servicesWithCancellations}
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

            {/* Additional Stats */}
            <div
                className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-1000 delay-[2850ms] ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
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
