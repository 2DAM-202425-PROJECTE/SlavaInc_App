"use client"
import { router, usePage } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts"

const AdminDashboard = ({ stats, chartData }) => {
    // Colors for charts
    const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f97316", "#ef4444", "#f59e0b"]
    const { props } = usePage()
    const { route } = props

    // Sample data for charts (in a real app, this would come from the backend)
    const userRegistrationData = chartData?.userRegistrations || [
        { month: "Gen", count: 65 },
        { month: "Feb", count: 59 },
        { month: "Mar", count: 80 },
        { month: "Abr", count: 81 },
        { month: "Mai", count: 56 },
        { month: "Jun", count: 55 },
        { month: "Jul", count: 40 },
    ]

    const servicesByTypeData = chartData?.servicesByType || [
        { name: "Consultoria", value: 35 },
        { name: "Desenvolupament", value: 45 },
        { name: "Disseny", value: 20 },
        { name: "Màrqueting", value: 15 },
    ]

    const companyGrowthData = chartData?.companyGrowth || [
        { month: "Gen", count: 10 },
        { month: "Feb", count: 15 },
        { month: "Mar", count: 18 },
        { month: "Abr", count: 25 },
        { month: "Mai", count: 30 },
        { month: "Jun", count: 35 },
        { month: "Jul", count: 42 },
    ]

    const workersByDepartmentData = chartData?.workersByDepartment || [
        { name: "IT", value: 25 },
        { name: "Vendes", value: 15 },
        { name: "Màrqueting", value: 10 },
        { name: "RRHH", value: 8 },
        { name: "Administració", value: 12 },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Panell d'Administració</h1>
                    <p className="text-xl text-white/90 mb-8">Vista general del sistema i accés ràpid a la gestió de dades</p>

                    {/* Navegació ràpida */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => router.visit(route("administrator.users.index"))}
                            className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Usuaris
                        </button>
                        <button
                            onClick={() => router.visit(route("administrator.workers.index"))}
                            className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Treballadors
                        </button>
                        <button
                            onClick={() => router.visit(route("administrator.services.index"))}
                            className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Serveis
                        </button>
                        <button
                            onClick={() => router.visit(route("administrator.companies.index"))}
                            className="admin-nav-link bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Companyies
                        </button>
                    </div>
                </div>
            </section>

            {/* Estadístiques */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard title="Usuaris" value={stats.users} color="blue" />
                    <DashboardCard title="Treballadors" value={stats.workers} color="green" />
                    <DashboardCard title="Serveis" value={stats.services} color="purple" />
                    <DashboardCard title="Companyies" value={stats.companies} color="orange" />
                </div>
            </section>

            {/* Charts Section */}
            <section className="max-w-7xl mx-auto px-6 pb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Estadístiques Detallades</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <ChartCard title="Registre d'Usuaris (Mensual)">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={userRegistrationData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    name="Usuaris"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Serveis per Tipus">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={servicesByTypeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {servicesByTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Creixement de Companyies">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={companyGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="count" name="Companyies" stroke="#f97316" fill="#fdba74" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Treballadors per Departament">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={workersByDepartmentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" name="Treballadors" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </section>

            {/* Recent Activity */}
            <section className="max-w-7xl mx-auto px-6 pb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Activitat Recent</h2>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="space-y-4">
                        <ActivityItem
                            title="Nou usuari registrat"
                            description="Joan Martí s'ha registrat com a nou usuari"
                            time="Fa 2 hores"
                        />
                        <ActivityItem
                            title="Nou servei creat"
                            description="S'ha afegit el servei 'Consultoria SEO'"
                            time="Fa 5 hores"
                        />
                        <ActivityItem
                            title="Nova companyia"
                            description="S'ha registrat la companyia 'TechSolutions SL'"
                            time="Ahir"
                        />
                        <ActivityItem
                            title="Treballador actualitzat"
                            description="S'ha actualitzat la informació del treballador Marc Vidal"
                            time="Fa 2 dies"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

// Component per a cada targeta de resum
const DashboardCard = ({ title, value, color }) => {
    const colors = {
        blue: "from-blue-500 to-blue-700",
        green: "from-green-500 to-green-700",
        purple: "from-purple-500 to-purple-700",
        orange: "from-orange-500 to-orange-700",
    }

    return (
        <div className={`rounded-xl p-6 bg-gradient-to-br ${colors[color]} text-white shadow-lg`}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    )
}

// Chart card component
const ChartCard = ({ title, children }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    )
}

// Activity item component
const ActivityItem = ({ title, description, time }) => {
    return (
        <div className="flex">
            <div className="mr-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                </div>
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>
                <p className="text-xs text-gray-400 mt-1">{time}</p>
            </div>
        </div>
    )
}

export default AdminDashboard
