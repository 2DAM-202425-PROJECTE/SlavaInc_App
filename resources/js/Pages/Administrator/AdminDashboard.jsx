"use client"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx";
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

const AdminDashboard = ({ stats = {}, chartData = {} }) => {
    // Colors for charts
    const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f97316", "#ef4444", "#f59e0b"]

    // Get data from props or use fallbacks
    const userRegistrationData = chartData?.userRegistrations || []
    const servicesByTypeData = chartData?.servicesByType || []
    const companyGrowthData = chartData?.companyGrowthByMonth || []
    const workersByLocationData = chartData?.workersByLocation || []
    const recentActivity = chartData?.recentActivity || []

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white"/>
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Estadístiques */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard title="Usuaris" value={stats?.users || 0} color="blue" />
                    <DashboardCard title="Treballadors" value={stats?.workers || 0} color="green" />
                    <DashboardCard title="Serveis" value={stats?.services || 0} color="purple" />
                    <DashboardCard title="Companyies" value={stats?.companies || 0} color="orange" />
                </div>
            </section>

            {/* Charts Section */}
            <section className="max-w-7xl mx-auto px-6 pb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Estadístiques Detallades</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <ChartCard title="Registre d'Usuaris (Mensual)">
                        {userRegistrationData.length > 0 ? (
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
                        ) : (
                            <EmptyChart message="No hi ha dades d'usuaris disponibles" />
                        )}
                    </ChartCard>

                    <ChartCard title="Serveis per Tipus">
                        {servicesByTypeData.length > 0 ? (
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
                        ) : (
                            <EmptyChart message="No hi ha dades de serveis disponibles" />
                        )}
                    </ChartCard>

                    <ChartCard title="Creixement de Companyies">
                        {companyGrowthData.length > 0 ? (
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
                        ) : (
                            <EmptyChart message="No hi ha dades de companyies disponibles" />
                        )}
                    </ChartCard>

                    <ChartCard title="Treballadors per Ciutat">
                        {workersByLocationData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={workersByLocationData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" name="Treballadors" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <EmptyChart message="No hi ha dades de treballadors disponibles" />
                        )}
                    </ChartCard>
                </div>
            </section>

            {/* Recent Activity */}
            <section className="max-w-7xl mx-auto px-6 pb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Activitat Recent</h2>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    {recentActivity.length > 0 ? (
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <ActivityItem
                                    key={index}
                                    title={activity.title}
                                    description={activity.description}
                                    time={activity.time}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No hi ha activitat recent per mostrar</div>
                    )}
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

// Empty chart component
const EmptyChart = ({ message }) => {
    return (
        <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">{message}</p>
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
