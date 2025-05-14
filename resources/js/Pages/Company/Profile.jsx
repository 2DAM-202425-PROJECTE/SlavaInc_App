    "use client"

    import { useState, useEffect } from "react"

    // Mock data - replace with your actual data fetching
    const companyData = {
        info: {
            name: "Empresa Example",
            email: "info@empresaexample.com",
            address: "Carrer Principal, 123",
            city: "Barcelona",
            state: "Catalunya",
            zip_code: "08001",
            phone: "+34 93 123 45 67",
            description:
                "Som una empresa líder en el sector, oferint serveis de qualitat des de 2010. La nostra missió és proporcionar solucions innovadores i eficients per als nostres clients.",
            logo: "/placeholder.svg?height=200&width=200",
            website: "www.empresaexample.com",
            foundedYear: 2010,
        },
        stats: {
            totalWorkers: 12,
            activeWorkers: 10,
            inactiveWorkers: 2,
            totalServices: 8,
            activeServices: 6,
            completedProjects: 145,
            ongoingProjects: 12,
            clientsRating: 4.8,
            totalReviews: 87,
            positiveReviews: 82,
            negativeReviews: 5,
            monthlyIncome: 24500,
            yearlyGrowth: 18,
            mostRequestedService: "Desenvolupament Web",
            averageProjectDuration: 45, // days
            clientRetentionRate: 85, // percentage
        },
        monthlyStats: [
            { month: "Gen", workers: 8, services: 5, projects: 10, income: 18000 },
            { month: "Feb", workers: 8, services: 5, projects: 12, income: 19500 },
            { month: "Mar", workers: 9, services: 6, projects: 14, income: 21000 },
            { month: "Abr", workers: 9, services: 6, projects: 11, income: 20000 },
            { month: "Mai", workers: 10, services: 7, projects: 13, income: 22000 },
            { month: "Jun", workers: 10, services: 7, projects: 15, income: 23500 },
            { month: "Jul", workers: 11, services: 8, projects: 14, income: 24000 },
            { month: "Ago", workers: 11, services: 8, projects: 12, income: 22500 },
            { month: "Set", workers: 12, services: 8, projects: 13, income: 23000 },
            { month: "Oct", workers: 12, services: 8, projects: 15, income: 24500 },
            { month: "Nov", workers: 12, services: 8, projects: 14, income: 24000 },
            { month: "Des", workers: 12, services: 8, projects: 16, income: 25500 },
        ],
        workers: [
            {
                id: 1,
                name: "Joan Garcia",
                position: "Director General",
                schedule: "Dilluns a Divendres, 9:00 - 17:00",
                phone: "+34 93 123 45 68",
                email: "joan@empresaexample.com",
                image: "/placeholder.svg?height=200&width=200",
                status: "active",
                projectsCompleted: 32,
                clientRating: 4.9,
                startDate: "2010-01-15",
            },
            {
                id: 2,
                name: "Maria López",
                position: "Cap de Projectes",
                schedule: "Dilluns a Divendres, 9:00 - 17:00",
                phone: "+34 93 123 45 69",
                email: "maria@empresaexample.com",
                image: "/placeholder.svg?height=200&width=200",
                status: "active",
                projectsCompleted: 48,
                clientRating: 4.7,
                startDate: "2012-03-10",
            },
            {
                id: 3,
                name: "Pau Martí",
                position: "Tècnic Especialista",
                schedule: "Dilluns a Divendres, 8:00 - 16:00",
                phone: "+34 93 123 45 70",
                email: "pau@empresaexample.com",
                image: "/placeholder.svg?height=200&width=200",
                status: "active",
                projectsCompleted: 36,
                clientRating: 4.8,
                startDate: "2015-06-22",
            },
        ],
        services: [
            {
                id: 1,
                name: "Consultoria Estratègica",
                description: "Assessorament expert per optimitzar els processos del seu negoci",
                duration: "2-4 setmanes",
                price: 1500,
                image: "/placeholder.svg?height=300&width=400",
                status: "active",
                completedProjects: 36,
                averageRating: 4.6,
                totalRevenue: 54000,
            },
            {
                id: 2,
                name: "Desenvolupament Web",
                description: "Creació de pàgines web modernes i responsives",
                duration: "4-8 setmanes",
                price: 2500,
                image: "/placeholder.svg?height=300&width=400",
                status: "active",
                completedProjects: 48,
                averageRating: 4.9,
                totalRevenue: 120000,
            },
            {
                id: 3,
                name: "Màrqueting Digital",
                description: "Estratègies de màrqueting online per augmentar la seva visibilitat",
                duration: "Contracte mensual",
                price: 800,
                image: "/placeholder.svg?height=300&width=400",
                status: "active",
                completedProjects: 32,
                averageRating: 4.7,
                totalRevenue: 76800,
            },
        ],
        clientReviews: [
            {
                id: 1,
                clientName: "Empresa ABC",
                rating: 5,
                comment: "Excel·lent servei, molt professionals i eficients.",
                date: "2023-10-15",
                service: "Desenvolupament Web",
            },
            {
                id: 2,
                clientName: "Botiga XYZ",
                rating: 4,
                comment: "Bona experiència en general, recomanable.",
                date: "2023-09-22",
                service: "Màrqueting Digital",
            },
            {
                id: 3,
                clientName: "Restaurant 123",
                rating: 5,
                comment: "Resultats impressionants, han superat les nostres expectatives.",
                date: "2023-11-05",
                service: "Consultoria Estratègica",
            },
        ],
    }

    export default function CompanyProfileAdmin() {
        const [isLoaded, setIsLoaded] = useState(false)
        const [activeSection, setActiveSection] = useState("dashboard")
        const [animateStats, setAnimateStats] = useState(false)
        const [editMode, setEditMode] = useState(false)
        const [formData, setFormData] = useState(companyData.info)
        const [activeTab, setActiveTab] = useState("general")
        const [showSuccessMessage, setShowSuccessMessage] = useState(false)

        useEffect(() => {
            // Trigger entrance animations after component mounts
            setIsLoaded(true)
            setAnimateStats(true)
        }, [])

        const handleInputChange = (e) => {
            const { name, value } = e.target
            setFormData({
                ...formData,
                [name]: value,
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            // Here you would typically send the data to your backend
            console.log("Form submitted:", formData)
            setEditMode(false)
            setShowSuccessMessage(true)

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        }

        const getMaxValue = (data, key) => {
            return Math.max(...data.map((item) => item[key])) * 1.2
        }

        // Icons components
        const BuildingOffice2Icon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M6 22V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v20" />
                <path d="M12 13V7" />
                <path d="M10 7h4" />
                <path d="M10 22H2V13a2 2 0 0 1 2-2h6" />
                <path d="M22 22h-8" />
                <path d="M18 13v9" />
                <path d="M18 13a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2h-2Z" />
            </svg>
        )

        const UsersIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )

        const PhoneIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        )

        const MapPinIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        )

        const EnvelopeIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        )

        const WrenchScrewdriverIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        )

        const ClockIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        )

        const BanknotesIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <rect width="20" height="12" x="2" y="6" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
            </svg>
        )

        const UserIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        )

        const ChartIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M3 3v18h18" />
                <path d="M18 17V9" />
                <path d="M13 17V5" />
                <path d="M8 17v-3" />
            </svg>
        )

        const StarIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        )

        const EditIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
        )

        const SaveIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
            </svg>
        )

        const CancelIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
        )

        const DashboardIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
            </svg>
        )

        const SettingsIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )

        const CheckIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <polyline points="20 6 9 17 4 12" />
            </svg>
        )

        const GlobeIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        )

        const CalendarIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        )

        const TrendingUpIcon = (props) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        )

        // Button component
        const Button = ({ children, className, onClick, variant = "default" }) => {
            const baseClasses =
                "inline-flex items-center justify-center font-medium transition-all duration-300 transform hover:-translate-y-1"
            const variantClasses =
                variant === "outline" ? "bg-transparent border-2 border-current" : "shadow-md hover:shadow-lg"

            return (
                <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick}>
                    {children}
                </button>
            )
        }

        // Card component
        const Card = ({ children, className }) => {
            return <div className={`bg-white overflow-hidden rounded-xl shadow-md ${className}`}>{children}</div>
        }

        // Render star rating
        const StarRating = ({ rating }) => {
            return (
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                    ))}
                    <span className="ml-1 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
                </div>
            )
        }

        // Render chart
        const Chart = ({ data, height = 200, width = "100%" }) => {
            const maxWorkers = getMaxValue(data, "workers")
            const maxServices = getMaxValue(data, "services")
            const maxProjects = getMaxValue(data, "projects")
            const maxIncome = getMaxValue(data, "income")

            return (
                <div className="relative" style={{ height, width }}>
                    <div className="absolute inset-0 flex items-end justify-between">
                        {data.map((item, index) => (
                            <div key={index} className="flex flex-col items-center w-full">
                                <div className="relative w-full flex justify-center space-x-1">
                                    <div
                                        className="w-2 bg-blue-500 rounded-t transition-all duration-1000 ease-out"
                                        style={{ height: animateStats ? `${(item.workers / maxWorkers) * height * 0.8}px` : "0px" }}
                                    ></div>
                                    <div
                                        className="w-2 bg-green-500 rounded-t transition-all duration-1000 ease-out"
                                        style={{ height: animateStats ? `${(item.services / maxServices) * height * 0.8}px` : "0px" }}
                                    ></div>
                                    <div
                                        className="w-2 bg-purple-500 rounded-t transition-all duration-1000 ease-out"
                                        style={{ height: animateStats ? `${(item.projects / maxProjects) * height * 0.8}px` : "0px" }}
                                    ></div>
                                    <div
                                        className="w-2 bg-[#9e2a2f] rounded-t transition-all duration-1000 ease-out"
                                        style={{ height: animateStats ? `${(item.income / maxIncome) * height * 0.8}px` : "0px" }}
                                    ></div>
                                </div>
                                <div className="text-xs mt-1 text-gray-600">{item.month}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }

        // Render progress bar
        const ProgressBar = ({ value, max, color = "bg-[#9e2a2f]" }) => {
            const percentage = (value / max) * 100
            return (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`${color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: animateStats ? `${percentage}%` : "0%" }}
                    ></div>
                </div>
            )
        }

        return (
            <div className="min-h-screen bg-gray-100 overflow-x-hidden">
                {/* Header */}
                <header className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <BuildingOffice2Icon className="h-8 w-8 text-[#9e2a2f] mr-3" />
                            <h1 className="text-xl font-bold text-gray-900">Perfil d&apos;Empresa</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600">
                                Benvingut, <span className="font-semibold">{formData.name}</span>
                            </div>
                            <img
                                src={formData.logo || "/placeholder.svg?height=40&width=40"}
                                alt="Logo"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="w-full md:w-64 shrink-0">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="p-4 bg-[#9e2a2f] text-white">
                                    <h2 className="font-bold text-lg">Panell d&apos;Administració</h2>
                                </div>
                                <nav className="p-4">
                                    <ul className="space-y-2">
                                        <li>
                                            <button
                                                onClick={() => setActiveSection("dashboard")}
                                                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                                                    activeSection === "dashboard"
                                                        ? "bg-[#9e2a2f]/10 text-[#9e2a2f] font-medium"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                <DashboardIcon className="h-5 w-5 mr-3" />
                                                Dashboard
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveSection("profile")}
                                                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                                                    activeSection === "profile"
                                                        ? "bg-[#9e2a2f]/10 text-[#9e2a2f] font-medium"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                <BuildingOffice2Icon className="h-5 w-5 mr-3" />
                                                Perfil d&apos;Empresa
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveSection("workers")}
                                                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                                                    activeSection === "workers"
                                                        ? "bg-[#9e2a2f]/10 text-[#9e2a2f] font-medium"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                <UsersIcon className="h-5 w-5 mr-3" />
                                                Treballadors
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveSection("services")}
                                                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                                                    activeSection === "services"
                                                        ? "bg-[#9e2a2f]/10 text-[#9e2a2f] font-medium"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                <WrenchScrewdriverIcon className="h-5 w-5 mr-3" />
                                                Serveis
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveSection("reviews")}
                                                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                                                    activeSection === "reviews"
                                                        ? "bg-[#9e2a2f]/10 text-[#9e2a2f] font-medium"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                <StarIcon className="h-5 w-5 mr-3" />
                                                Valoracions
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveSection("settings")}
                                                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                                                    activeSection === "settings"
                                                        ? "bg-[#9e2a2f]/10 text-[#9e2a2f] font-medium"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                <SettingsIcon className="h-5 w-5 mr-3" />
                                                Configuració
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                                <div className="p-4 bg-gray-50 border-b">
                                    <h3 className="font-medium text-gray-700">Resum Ràpid</h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Treballadors Actius</span>
                                            <span className="font-medium">
                          {companyData.stats.activeWorkers}/{companyData.stats.totalWorkers}
                        </span>
                                        </div>
                                        <ProgressBar value={companyData.stats.activeWorkers} max={companyData.stats.totalWorkers} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Serveis Actius</span>
                                            <span className="font-medium">
                          {companyData.stats.activeServices}/{companyData.stats.totalServices}
                        </span>
                                        </div>
                                        <ProgressBar value={companyData.stats.activeServices} max={companyData.stats.totalServices} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Valoració Clients</span>
                                            <span className="font-medium">{companyData.stats.clientsRating}/5</span>
                                        </div>
                                        <ProgressBar value={companyData.stats.clientsRating} max={5} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Projectes Actius</span>
                                            <span className="font-medium">{companyData.stats.ongoingProjects}</span>
                                        </div>
                                        <ProgressBar value={companyData.stats.ongoingProjects} max={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Dashboard Section */}
                            {activeSection === "dashboard" && (
                                <div className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

                                            {/* Key Stats */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                                <div className="bg-blue-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                            <UsersIcon className="h-6 w-6 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-blue-600">Treballadors</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.totalWorkers}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-blue-600">Actius: {companyData.stats.activeWorkers}</span>
                                                        <span className="text-gray-500">Inactius: {companyData.stats.inactiveWorkers}</span>
                                                    </div>
                                                </div>

                                                <div className="bg-green-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                            <WrenchScrewdriverIcon className="h-6 w-6 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-green-600">Serveis</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.totalServices}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-green-600">Actius: {companyData.stats.activeServices}</span>
                                                        <span className="text-gray-500">
                                Més sol·licitat: {companyData.stats.mostRequestedService}
                              </span>
                                                    </div>
                                                </div>

                                                <div className="bg-purple-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                                                            <ChartIcon className="h-6 w-6 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-purple-600">Projectes</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.completedProjects}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-purple-600">En curs: {companyData.stats.ongoingProjects}</span>
                                                        <span className="text-gray-500">
                                Duració mitjana: {companyData.stats.averageProjectDuration} dies
                              </span>
                                                    </div>
                                                </div>

                                                <div className="bg-red-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                                            <StarIcon className="h-6 w-6 text-red-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-red-600">Valoracions</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.clientsRating}/5</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-red-600">Total: {companyData.stats.totalReviews}</span>
                                                        <span className="text-gray-500">Positives: {companyData.stats.positiveReviews}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Chart */}
                                            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
                                                <div className="flex justify-between items-center mb-6">
                                                    <h3 className="text-lg font-bold text-gray-800">Evolució Anual</h3>
                                                    <div className="flex space-x-4 text-sm">
                                                        <div className="flex items-center">
                                                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                                                            <span>Treballadors</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                                                            <span>Serveis</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                                                            <span>Projectes</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="w-3 h-3 bg-[#9e2a2f] rounded-full mr-1"></div>
                                                            <span>Ingressos (€)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Chart data={companyData.monthlyStats} height={250} />
                                            </div>

                                            {/* Recent Activity */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Últimes Valoracions</h3>
                                                    <div className="space-y-4">
                                                        {companyData.clientReviews.map((review) => (
                                                            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                                <div className="flex justify-between items-start">
                                                                    <div>
                                                                        <p className="font-medium text-gray-800">{review.clientName}</p>
                                                                        <p className="text-sm text-gray-500">{review.service}</p>
                                                                    </div>
                                                                    <StarRating rating={review.rating} />
                                                                </div>
                                                                <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                                                                <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Serveis Més Sol·licitats</h3>
                                                    <div className="space-y-4">
                                                        {companyData.services
                                                            .sort((a, b) => b.completedProjects - a.completedProjects)
                                                            .map((service) => (
                                                                <div key={service.id} className="flex items-center">
                                                                    <div className="w-10 h-10 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center mr-3">
                                                                        <WrenchScrewdriverIcon className="h-5 w-5 text-[#9e2a2f]" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="flex justify-between">
                                                                            <p className="font-medium text-gray-800">{service.name}</p>
                                                                            <p className="text-sm font-medium text-[#9e2a2f]">
                                                                                {service.completedProjects} projectes
                                                                            </p>
                                                                        </div>
                                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                                                            <div
                                                                                className="bg-[#9e2a2f] h-1.5 rounded-full transition-all duration-1000 ease-out"
                                                                                style={{
                                                                                    width: animateStats ? `${(service.completedProjects / 50) * 100}%` : "0%",
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                        <div className="pt-4 mt-4 border-t border-gray-100">
                                                            <div className="flex justify-between text-sm">
                                                                <div>
                                                                    <p className="font-medium text-gray-800">Ingressos Mensuals</p>
                                                                    <p className="text-2xl font-bold text-[#9e2a2f]">
                                                                        {companyData.stats.monthlyIncome.toLocaleString()} €
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-end">
                                                                    <TrendingUpIcon className="h-5 w-5 text-green-500 mr-1" />
                                                                    <span className="text-green-500 font-medium">+{companyData.stats.yearlyGrowth}%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Profile Section */}
                            {activeSection === "profile" && (
                                <div className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h2 className="text-2xl font-bold text-gray-800">Perfil d&apos;Empresa</h2>
                                                {!editMode ? (
                                                    <Button
                                                        className="bg-[#9e2a2f] text-white px-4 py-2 rounded-lg"
                                                        onClick={() => setEditMode(true)}
                                                    >
                                                        <EditIcon className="h-4 w-4 mr-2" />
                                                        Editar Perfil
                                                    </Button>
                                                ) : (
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                                                            onClick={() => {
                                                                setEditMode(false)
                                                                setFormData(companyData.info)
                                                            }}
                                                        >
                                                            <CancelIcon className="h-4 w-4 mr-2" />
                                                            Cancel·lar
                                                        </Button>
                                                        <Button className="bg-[#9e2a2f] text-white px-4 py-2 rounded-lg" onClick={handleSubmit}>
                                                            <SaveIcon className="h-4 w-4 mr-2" />
                                                            Guardar
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Success Message */}
                                            {showSuccessMessage && (
                                                <div className="mb-6 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                                                    <CheckIcon className="h-5 w-5 mr-2" />
                                                    <span>Les dades s&apos;han guardat correctament!</span>
                                                </div>
                                            )}

                                            {/* Tabs */}
                                            <div className="border-b border-gray-200 mb-6">
                                                <nav className="flex space-x-8">
                                                    <button
                                                        onClick={() => setActiveTab("general")}
                                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                                            activeTab === "general"
                                                                ? "border-[#9e2a2f] text-[#9e2a2f]"
                                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                        }`}
                                                    >
                                                        Informació General
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab("contact")}
                                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                                            activeTab === "contact"
                                                                ? "border-[#9e2a2f] text-[#9e2a2f]"
                                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                        }`}
                                                    >
                                                        Contacte
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab("additional")}
                                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                                            activeTab === "additional"
                                                                ? "border-[#9e2a2f] text-[#9e2a2f]"
                                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                        }`}
                                                    >
                                                        Informació Addicional
                                                    </button>
                                                </nav>
                                            </div>

                                            {/* Form or Display */}
                                            {!editMode ? (
                                                <div>
                                                    {activeTab === "general" && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <div>
                                                                <div className="flex items-center mb-6">
                                                                    <img
                                                                        src={formData.logo || "/placeholder.svg?height=100&width=100"}
                                                                        alt="Logo"
                                                                        className="h-24 w-24 rounded-lg object-cover mr-6"
                                                                    />
                                                                    <div>
                                                                        <h3 className="text-xl font-bold text-gray-800">{formData.name}</h3>
                                                                        <p className="text-gray-600">{formData.description}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-500">Any de fundació</p>
                                                                        <p className="text-gray-800">{formData.foundedYear}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-500">Lloc web</p>
                                                                        <p className="text-gray-800">{formData.website}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Estadístiques</p>
                                                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                                                        <div className="bg-gray-50 p-4 rounded-lg">
                                                                            <p className="text-sm text-gray-600">Treballadors</p>
                                                                            <p className="text-xl font-bold text-gray-800">{companyData.stats.totalWorkers}</p>
                                                                        </div>
                                                                        <div className="bg-gray-50 p-4 rounded-lg">
                                                                            <p className="text-sm text-gray-600">Serveis</p>
                                                                            <p className="text-xl font-bold text-gray-800">{companyData.stats.totalServices}</p>
                                                                        </div>
                                                                        <div className="bg-gray-50 p-4 rounded-lg">
                                                                            <p className="text-sm text-gray-600">Projectes</p>
                                                                            <p className="text-xl font-bold text-gray-800">
                                                                                {companyData.stats.completedProjects}
                                                                            </p>
                                                                        </div>
                                                                        <div className="bg-gray-50 p-4 rounded-lg">
                                                                            <p className="text-sm text-gray-600">Valoració</p>
                                                                            <p className="text-xl font-bold text-gray-800">
                                                                                {companyData.stats.clientsRating}/5
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === "contact" && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Adreça</p>
                                                                    <p className="text-gray-800">{formData.address}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Ciutat</p>
                                                                    <p className="text-gray-800">{formData.city}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Província</p>
                                                                    <p className="text-gray-800">{formData.state}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Codi Postal</p>
                                                                    <p className="text-gray-800">{formData.zip_code}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Telèfon</p>
                                                                    <p className="text-gray-800">{formData.phone}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                                                    <p className="text-gray-800">{formData.email}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Lloc web</p>
                                                                    <p className="text-gray-800">{formData.website}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === "additional" && (
                                                        <div className="space-y-6">
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-500 mb-2">Descripció</p>
                                                                <p className="text-gray-800">{formData.description}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-500 mb-2">Estadístiques Addicionals</p>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                                        <p className="text-sm text-gray-600">Retenció de Clients</p>
                                                                        <p className="text-xl font-bold text-gray-800">
                                                                            {companyData.stats.clientRetentionRate}%
                                                                        </p>
                                                                    </div>
                                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                                        <p className="text-sm text-gray-600">Duració Mitjana Projectes</p>
                                                                        <p className="text-xl font-bold text-gray-800">
                                                                            {companyData.stats.averageProjectDuration} dies
                                                                        </p>
                                                                    </div>
                                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                                        <p className="text-sm text-gray-600">Creixement Anual</p>
                                                                        <p className="text-xl font-bold text-gray-800">{companyData.stats.yearlyGrowth}%</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSubmit}>
                                                    {activeTab === "general" && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <div>
                                                                <div className="mb-6">
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                                                                    <div className="flex items-center">
                                                                        <img
                                                                            src={formData.logo || "/placeholder.svg?height=100&width=100"}
                                                                            alt="Logo"
                                                                            className="h-24 w-24 rounded-lg object-cover mr-4"
                                                                        />
                                                                        <Button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
                                                                            Canviar Logo
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Nom de l&apos;Empresa
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        name="name"
                                                                        value={formData.name}
                                                                        onChange={handleInputChange}
                                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Any de fundació
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        id="foundedYear"
                                                                        name="foundedYear"
                                                                        value={formData.foundedYear}
                                                                        onChange={handleInputChange}
                                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                    />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Lloc web
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="website"
                                                                        name="website"
                                                                        value={formData.website}
                                                                        onChange={handleInputChange}
                                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Descripció
                                                                    </label>
                                                                    <textarea
                                                                        id="description"
                                                                        name="description"
                                                                        value={formData.description}
                                                                        onChange={handleInputChange}
                                                                        rows="4"
                                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === "contact" && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="mb-4">
                                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Adreça
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    name="address"
                                                                    value={formData.address}
                                                                    onChange={handleInputChange}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Ciutat
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="city"
                                                                    name="city"
                                                                    value={formData.city}
                                                                    onChange={handleInputChange}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Província
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="state"
                                                                    name="state"
                                                                    value={formData.state}
                                                                    onChange={handleInputChange}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Codi Postal
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="zip_code"
                                                                    name="zip_code"
                                                                    value={formData.zip_code}
                                                                    onChange={handleInputChange}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Telèfon
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="phone"
                                                                    name="phone"
                                                                    value={formData.phone}
                                                                    onChange={handleInputChange}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Email
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    id="email"
                                                                    name="email"
                                                                    value={formData.email}
                                                                    onChange={handleInputChange}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === "additional" && (
                                                        <div className="space-y-4">
                                                            <div className="mb-4">
                                                                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Informació Addicional
                                                                </label>
                                                                <textarea
                                                                    id="additionalInfo"
                                                                    name="additionalInfo"
                                                                    rows="4"
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                    placeholder="Afegeix informació addicional sobre la teva empresa..."
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    )}
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Workers Section */}
                            {activeSection === "workers" && (
                                <div className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h2 className="text-2xl font-bold text-gray-800">Treballadors</h2>
                                                <Button className="bg-[#9e2a2f] text-white px-4 py-2 rounded-lg">
                                                    <UserIcon className="h-4 w-4 mr-2" />
                                                    Afegir Treballador
                                                </Button>
                                            </div>

                                            {/* Workers Stats */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                                <div className="bg-blue-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                            <UsersIcon className="h-6 w-6 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-blue-600">Total Treballadors</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.totalWorkers}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-blue-600">Actius: {companyData.stats.activeWorkers}</span>
                                                        <span className="text-gray-500">Inactius: {companyData.stats.inactiveWorkers}</span>
                                                    </div>
                                                </div>

                                                <div className="bg-green-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                            <ChartIcon className="h-6 w-6 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-green-600">Projectes Completats</p>
                                                            <p className="text-2xl font-bold text-gray-800">
                                                                {companyData.workers.reduce((sum, worker) => sum + worker.projectsCompleted, 0)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                              <span className="text-green-600">
                                Mitjana:{" "}
                                  {Math.round(
                                      companyData.workers.reduce((sum, worker) => sum + worker.projectsCompleted, 0) /
                                      companyData.workers.length,
                                  )}
                              </span>
                                                        <span className="text-gray-500">Per treballador</span>
                                                    </div>
                                                </div>

                                                <div className="bg-purple-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                                                            <StarIcon className="h-6 w-6 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-purple-600">Valoració Mitjana</p>
                                                            <p className="text-2xl font-bold text-gray-800">
                                                                {(
                                                                    companyData.workers.reduce((sum, worker) => sum + worker.clientRating, 0) /
                                                                    companyData.workers.length
                                                                ).toFixed(1)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                              <span className="text-purple-600">
                                Millor: {Math.max(...companyData.workers.map((worker) => worker.clientRating))}
                              </span>
                                                        <span className="text-gray-500">Valoració</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Workers List */}
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Treballador
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Posició
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Contacte
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Estat
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Projectes
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Valoració
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Accions
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                    {companyData.workers.map((worker) => (
                                                        <tr key={worker.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        <img
                                                                            className="h-10 w-10 rounded-full"
                                                                            src={worker.image || "/placeholder.svg"}
                                                                            alt={worker.name}
                                                                        />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                                                                        <div className="text-sm text-gray-500">Des de {worker.startDate}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{worker.position}</div>
                                                                <div className="text-sm text-gray-500">{worker.schedule}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{worker.phone}</div>
                                                                <div className="text-sm text-gray-500">{worker.email}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            worker.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                      {worker.status === "active" ? "Actiu" : "Inactiu"}
                                    </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {worker.projectsCompleted}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <StarRating rating={worker.clientRating} />
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                                                                <button className="text-red-600 hover:text-red-900">Eliminar</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Services Section */}
                            {activeSection === "services" && (
                                <div className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h2 className="text-2xl font-bold text-gray-800">Serveis</h2>
                                                <Button className="bg-[#9e2a2f] text-white px-4 py-2 rounded-lg">
                                                    <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                                                    Afegir Servei
                                                </Button>
                                            </div>

                                            {/* Services Stats */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                                <div className="bg-blue-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                            <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-blue-600">Total Serveis</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.totalServices}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-blue-600">Actius: {companyData.stats.activeServices}</span>
                                                        <span className="text-gray-500">
                                Inactius: {companyData.stats.totalServices - companyData.stats.activeServices}
                              </span>
                                                    </div>
                                                </div>

                                                <div className="bg-green-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                            <ChartIcon className="h-6 w-6 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-green-600">Projectes Completats</p>
                                                            <p className="text-2xl font-bold text-gray-800">
                                                                {companyData.services.reduce((sum, service) => sum + service.completedProjects, 0)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-green-600">Més sol·licitat:</span>
                                                        <span className="text-gray-500">{companyData.stats.mostRequestedService}</span>
                                                    </div>
                                                </div>

                                                <div className="bg-purple-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                                                            <BanknotesIcon className="h-6 w-6 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-purple-600">Ingressos Totals</p>
                                                            <p className="text-2xl font-bold text-gray-800">
                                                                {companyData.services
                                                                    .reduce((sum, service) => sum + service.totalRevenue, 0)
                                                                    .toLocaleString()}{" "}
                                                                €
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-purple-600">Mitjana mensual:</span>
                                                        <span className="text-gray-500">{companyData.stats.monthlyIncome.toLocaleString()} €</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Services List */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {companyData.services.map((service) => (
                                                    <div
                                                        key={service.id}
                                                        className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                                                    >
                                                        <div className="relative h-40">
                                                            <img
                                                                src={service.image || "/placeholder.svg"}
                                                                alt={service.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <div className="absolute top-2 right-2">
                                  <span
                                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                          service.status === "active"
                                              ? "bg-green-100 text-green-800"
                                              : "bg-red-100 text-red-800"
                                      }`}
                                  >
                                    {service.status === "active" ? "Actiu" : "Inactiu"}
                                  </span>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                                                                <span className="text-[#9e2a2f] font-semibold">{service.price} €</span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                                                            <div className="space-y-2 mb-4">
                                                                <div className="flex justify-between text-sm">
                                                                    <span className="text-gray-500">Duració:</span>
                                                                    <span className="text-gray-800">{service.duration}</span>
                                                                </div>
                                                                <div className="flex justify-between text-sm">
                                                                    <span className="text-gray-500">Projectes:</span>
                                                                    <span className="text-gray-800">{service.completedProjects}</span>
                                                                </div>
                                                                <div className="flex justify-between text-sm">
                                                                    <span className="text-gray-500">Valoració:</span>
                                                                    <StarRating rating={service.averageRating} />
                                                                </div>
                                                                <div className="flex justify-between text-sm">
                                                                    <span className="text-gray-500">Ingressos:</span>
                                                                    <span className="text-gray-800">{service.totalRevenue.toLocaleString()} €</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <Button className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm">
                                                                    Editar
                                                                </Button>
                                                                <Button className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm">Eliminar</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Reviews Section */}
                            {activeSection === "reviews" && (
                                <div className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Valoracions de Clients</h2>

                                            {/* Reviews Stats */}
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                                <div className="bg-blue-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                            <StarIcon className="h-6 w-6 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-blue-600">Valoració Mitjana</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.clientsRating}/5</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-green-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                            <ChartIcon className="h-6 w-6 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-green-600">Total Valoracions</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.totalReviews}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-purple-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                                                            <CheckIcon className="h-6 w-6 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-purple-600">Valoracions Positives</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.positiveReviews}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-red-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                                            <CancelIcon className="h-6 w-6 text-red-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-red-600">Valoracions Negatives</p>
                                                            <p className="text-2xl font-bold text-gray-800">{companyData.stats.negativeReviews}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Reviews List */}
                                            <div className="space-y-6">
                                                {companyData.clientReviews.map((review) => (
                                                    <div
                                                        key={review.id}
                                                        className="bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-md"
                                                    >
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <h3 className="text-lg font-bold text-gray-800">{review.clientName}</h3>
                                                                <p className="text-sm text-gray-500">
                                                                    {review.date} - {review.service}
                                                                </p>
                                                            </div>
                                                            <StarRating rating={review.rating} />
                                                        </div>
                                                        <p className="text-gray-700 mb-4">{review.comment}</p>
                                                        <div className="flex justify-end space-x-2">
                                                            <Button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                                                                Respondre
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeSection === "settings" && (
                                <div className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Configuració de l'Empresa</h2>

                                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Identificació bàsica */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                {/* Dades de contacte */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Telèfon</label>
                                                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lloc web</label>
                                                    <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                {/* Adreça */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adreça</label>
                                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciutat</label>
                                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Província</label>
                                                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Codi Postal</label>
                                                    <input type="text" name="zip_code" value={formData.zip_code} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                {/* Visuals */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripció</label>
                                                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full border p-2 rounded" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo (URL)</label>
                                                    <input type="text" name="logo" value={formData.logo} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                {/* Informació comercial */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Any de fundació</label>
                                                    <input type="number" name="founded_year" value={formData.founded_year} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">NIF / CIF</label>
                                                    <input type="text" name="vat_number" value={formData.vat_number} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipus d'empresa</label>
                                                    <input type="text" name="company_type" value={formData.company_type} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                {/* Estat i verificació */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Està verificada?</label>
                                                    <select name="is_verified" value={formData.is_verified} onChange={handleInputChange} className="w-full border p-2 rounded">
                                                        <option value={true}>Sí</option>
                                                        <option value={false}>No</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Empresa activa?</label>
                                                    <select name="is_active" value={formData.is_active} onChange={handleInputChange} className="w-full border p-2 rounded">
                                                        <option value={true}>Sí</option>
                                                        <option value={false}>No</option>
                                                    </select>
                                                </div>

                                                {/* Localització */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitud</label>
                                                    <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitud</label>
                                                    <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                                </div>

                                                {/* Notes */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes internes</label>
                                                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full border p-2 rounded" />
                                                </div>

                                                {/* Submit */}
                                                <div className="md:col-span-2">
                                                    <button type="submit" className="bg-[#9e2a2f] text-white px-6 py-2 rounded hover:bg-[#7a1f25] transition">
                                                        Guardar Canvis
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}



                        </div>
                    </div>
                </div>

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
