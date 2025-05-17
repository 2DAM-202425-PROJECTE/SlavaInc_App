"use client"

import { useState, useEffect } from "react"
import { usePage } from "@inertiajs/react"

// Dades que s'obtindrien de les taules de la base de dades
// Aquestes dades s'haurien d'obtenir mitjançant una API o Server Action
const companyData = {
    // De la taula 'companies'
    info: {
        id: 1,
        name: "Empresa Example",
        email: "info@empresaexample.com",
        phone: "+34 93 123 45 67",
        website: "www.empresaexample.com",
        address: "Carrer Principal, 123",
        city: "Barcelona",
        state: "Catalunya",
        zip_code: "08001",
        logo: "/placeholder.svg?height=200&width=200",
        description:
            "Som una empresa líder en el sector de la neteja, oferint serveis de qualitat des de 2010. La nostra missió és proporcionar solucions innovadores i eficients per als nostres clients.",
        founded_year: 2010,
        vat_number: "B12345678",
        company_type: "SL",
        is_verified: true,
        is_active: true,
        latitude: 41.3851,
        longitude: 2.1734,
        notes: "Empresa amb bona reputació i creixement constant",
    },
    // Estadístiques calculades a partir de les taules
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
        mostRequestedService: "Neteja d'Oficines",
        averageProjectDuration: 45, // dies
        clientRetentionRate: 85, // percentatge
        currentPlan: "Premium", // Tarifa actual
    },
    // Dades que s'obtindrien de consultes agregades per mesos
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
    // De la taula 'workers'
    workers: [
        {
            id: 1,
            company_id: 1,
            name: "Joan Garcia",
            position: "Director General",
            schedule: "Dilluns a Divendres, 9:00 - 17:00",
            address: "Carrer Exemple, 10",
            city: "Barcelona",
            state: "Catalunya",
            zip_code: "08001",
            phone: "+34 93 123 45 68",
            email: "joan@empresaexample.com",
            is_admin: true,
            logo: "/placeholder.svg?height=200&width=200",
            status: "active",
            projectsCompleted: 32,
            clientRating: 4.9,
            startDate: "2010-01-15",
        },
        {
            id: 2,
            company_id: 1,
            name: "Maria López",
            position: "Cap de Projectes",
            schedule: "Dilluns a Divendres, 9:00 - 17:00",
            address: "Avinguda Central, 25",
            city: "Barcelona",
            state: "Catalunya",
            zip_code: "08005",
            phone: "+34 93 123 45 69",
            email: "maria@empresaexample.com",
            is_admin: false,
            logo: "/placeholder.svg?height=200&width=200",
            status: "active",
            projectsCompleted: 48,
            clientRating: 4.7,
            startDate: "2012-03-10",
        },
        {
            id: 3,
            company_id: 1,
            name: "Pau Martí",
            position: "Tècnic Especialista",
            schedule: "Dilluns a Divendres, 8:00 - 16:00",
            address: "Carrer Nou, 15",
            city: "Barcelona",
            state: "Catalunya",
            zip_code: "08010",
            phone: "+34 93 123 45 70",
            email: "pau@empresaexample.com",
            is_admin: false,
            logo: "/placeholder.svg?height=200&width=200",
            status: "active",
            projectsCompleted: 36,
            clientRating: 4.8,
            startDate: "2015-06-22",
        },
    ],
    // Combinació de 'services' i 'companies_services'
    services: [
        {
            id: 1,
            service_id: 1,
            company_id: 1,
            name: "Neteja d'Oficines",
            custom_name: "Neteja Professional d'Oficines",
            description: "Servei complet de neteja per a espais d'oficina",
            type: "Neteja",
            price_per_unit: 25.0,
            unit: "hora",
            min_price: 100.0,
            max_price: 500.0,
            logo: "/placeholder.svg?height=300&width=400",
            status: "active",
            completedProjects: 36,
            averageRating: 4.6,
            totalRevenue: 54000,
        },
        {
            id: 2,
            service_id: 2,
            company_id: 1,
            name: "Neteja de Locals",
            custom_name: "Neteja Integral de Locals Comercials",
            description: "Servei especialitzat per a locals comercials i botigues",
            type: "Neteja",
            price_per_unit: 30.0,
            unit: "hora",
            min_price: 150.0,
            max_price: 600.0,
            logo: "/placeholder.svg?height=300&width=400",
            status: "active",
            completedProjects: 48,
            averageRating: 4.9,
            totalRevenue: 120000,
        },
        {
            id: 3,
            service_id: 3,
            company_id: 1,
            name: "Neteja de Vidres",
            custom_name: "Neteja Especialitzada de Vidres",
            description: "Neteja professional de vidres i superfícies cristal·lines",
            type: "Neteja",
            price_per_unit: 35.0,
            unit: "hora",
            min_price: 80.0,
            max_price: 300.0,
            logo: "/placeholder.svg?height=300&width=400",
            status: "active",
            completedProjects: 32,
            averageRating: 4.7,
            totalRevenue: 76800,
        },
    ],
    // Aquestes dades no estan a les taules proporcionades, s'haurien de crear
    clientReviews: [
        {
            id: 1,
            clientName: "Empresa ABC",
            rating: 5,
            comment: "Excel·lent servei, molt professionals i eficients.",
            date: "2023-10-15",
            service: "Neteja d'Oficines",
        },
        {
            id: 2,
            clientName: "Botiga XYZ",
            rating: 4,
            comment: "Bona experiència en general, recomanable.",
            date: "2023-09-22",
            service: "Neteja de Locals",
        },
        {
            id: 3,
            clientName: "Restaurant 123",
            rating: 5,
            comment: "Resultats impressionants, han superat les nostres expectatives.",
            date: "2023-11-05",
            service: "Neteja de Vidres",
        },
    ],
    // Informació de plans/tarifes
    plans: [
        {
            id: 1,
            name: "Bàsic",
            price: 49.99,
            features: ["Fins a 5 treballadors", "Fins a 3 serveis", "Suport bàsic"],
            isActive: false,
        },
        {
            id: 2,
            name: "Professional",
            price: 99.99,
            features: ["Fins a 15 treballadors", "Fins a 10 serveis", "Suport prioritari", "Estadístiques bàsiques"],
            isActive: false,
        },
        {
            id: 3,
            name: "Premium",
            price: 199.99,
            features: [
                "Treballadors il·limitats",
                "Serveis il·limitats",
                "Suport 24/7",
                "Estadístiques avançades",
                "API d'integració",
            ],
            isActive: true,
        },
    ],
}

export default function CompanyProfileAdmin() {
    const { company } = usePage().props
    const [formData, setFormData] = useState(company.info)

    const [isLoaded, setIsLoaded] = useState(false)
    const [activeSection, setActiveSection] = useState("dashboard")
    const [animateStats, setAnimateStats] = useState(false)
    const [editMode, setEditMode] = useState(false)
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

    const CreditCardIcon = (props) => (
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
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    )

    const CleaningIcon = (props) => (
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
            <path d="M3 22v-3" />
            <path d="M7 22v-3" />
            <path d="M11 22v-3" />
            <path d="M15 22v-3" />
            <path d="M19 22v-3" />
            <path d="M3 14h18" />
            <path d="M3 4h18" />
            <path d="M4 4v10" />
            <path d="M20 4v10" />
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
                                            <CleaningIcon className="h-5 w-5 mr-3" />
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
                                <div className="pt-2 mt-2 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Tarifa Actual:</span>
                                        <span className="text-sm font-medium text-[#9e2a2f]">{companyData.stats.currentPlan}</span>
                                    </div>
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
                                                        <CleaningIcon className="h-6 w-6 text-green-600" />
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
                                                                    <CleaningIcon className="h-5 w-5 text-[#9e2a2f]" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex justify-between">
                                                                        <p className="font-medium text-gray-800">{service.custom_name || service.name}</p>
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
                                                                    <p className="text-gray-800">{formData.founded_year}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Lloc web</p>
                                                                    <p className="text-gray-800">{formData.website}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">NIF/CIF</p>
                                                                    <p className="text-gray-800">{formData.vat_number}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Tipus d&apos;empresa</p>
                                                                    <p className="text-gray-800">{formData.company_type}</p>
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
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-500">Estat</p>
                                                                <div className="flex items-center mt-1">
                                  <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                          formData.is_active
                                              ? "bg-green-100 text-green-800"
                                              : "bg-red-100 text-red-800"
                                      }`}
                                  >
                                    {formData.is_active ? "Actiu" : "Inactiu"}
                                  </span>
                                                                    <span
                                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${
                                                                            formData.is_verified
                                                                                ? "bg-blue-100 text-blue-800"
                                                                                : "bg-gray-100 text-gray-800"
                                                                        }`}
                                                                    >
                                    {formData.is_verified ? "Verificat" : "No verificat"}
                                  </span>
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
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-500">Coordenades</p>
                                                                <p className="text-gray-800">
                                                                    {formData.latitude}, {formData.longitude}
                                                                </p>
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
                                                            <p className="text-sm font-medium text-gray-500 mb-2">Notes</p>
                                                            <p className="text-gray-800">{formData.notes || "No hi ha notes disponibles."}</p>
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
                                                                <label htmlFor="founded_year" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Any de fundació
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    id="founded_year"
                                                                    name="founded_year"
                                                                    value={formData.founded_year}
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
                                                            <div className="mb-4">
                                                                <label htmlFor="vat_number" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    NIF/CIF
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="vat_number"
                                                                    name="vat_number"
                                                                    value={formData.vat_number}
                                                                    onChange={handleInputChange}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                />
                                                            </div>
                                                            <div className="mb-4">
                                                                <label htmlFor="company_type" className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Tipus d&apos;empresa
                                                                </label>
                                                                <select
                                                                    id="company_type"
                                                                    name="company_type"
                                                                    value={formData.company_type}
                                                                    onChange={handleInputChange}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                >
                                                                    <option value="SL">Societat Limitada (SL)</option>
                                                                    <option value="SA">Societat Anònima (SA)</option>
                                                                    <option value="Autònom">Autònom</option>
                                                                    <option value="Cooperativa">Cooperativa</option>
                                                                    <option value="Altres">Altres</option>
                                                                </select>
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
                                                            <div className="mb-4">
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Estat</label>
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="flex items-center">
                                                                        <input
                                                                            id="is_active"
                                                                            name="is_active"
                                                                            type="checkbox"
                                                                            checked={formData.is_active}
                                                                            onChange={(e) =>
                                                                                setFormData({ ...formData, is_active: e.target.checked })
                                                                            }
                                                                            className="h-4 w-4 text-[#9e2a2f] focus:ring-[#9e2a2f] border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                                                                            Actiu
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <input
                                                                            id="is_verified"
                                                                            name="is_verified"
                                                                            type="checkbox"
                                                                            checked={formData.is_verified}
                                                                            onChange={(e) =>
                                                                                setFormData({ ...formData, is_verified: e.target.checked })
                                                                            }
                                                                            className="h-4 w-4 text-[#9e2a2f] focus:ring-[#9e2a2f] border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="is_verified" className="ml-2 block text-sm text-gray-700">
                                                                            Verificat
                                                                        </label>
                                                                    </div>
                                                                </div>
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
                                                        <div className="mb-4">
                                                            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Latitud
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="latitude"
                                                                name="latitude"
                                                                value={formData.latitude}
                                                                onChange={handleInputChange}
                                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Longitud
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="longitude"
                                                                name="longitude"
                                                                value={formData.longitude}
                                                                onChange={handleInputChange}
                                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {activeTab === "additional" && (
                                                    <div className="space-y-4">
                                                        <div className="mb-4">
                                                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Notes
                                                            </label>
                                                            <textarea
                                                                id="notes"
                                                                name="notes"
                                                                value={formData.notes}
                                                                onChange={handleInputChange}
                                                                rows="4"
                                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                placeholder="Afegeix notes internes sobre l'empresa..."
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
                                                                        src={worker.logo || "/placeholder.svg"}
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
                                                            {worker.is_admin && (
                                                                <span className="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    Admin
                                  </span>
                                                            )}
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
                                                <CleaningIcon className="h-4 w-4 mr-2" />
                                                Afegir Servei
                                            </Button>
                                        </div>

                                        {/* Services Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <div className="bg-blue-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                                <div className="flex items-center mb-4">
                                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                        <CleaningIcon className="h-6 w-6 text-blue-600" />
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
                                                            src={service.logo || "/placeholder.svg"}
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
                                                            <h3 className="text-lg font-bold text-gray-800">{service.custom_name || service.name}</h3>
                                                            <span className="text-[#9e2a2f] font-semibold">{service.price_per_unit} €/{service.unit}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                                                        <div className="space-y-2 mb-4">
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-500">Tipus:</span>
                                                                <span className="text-gray-800">{service.type}</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-500">Preu mínim:</span>
                                                                <span className="text-gray-800">{service.min_price} €</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-500">Preu màxim:</span>
                                                                <span className="text-gray-800">{service.max_price} €</span>
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

                        {/* Settings Section */}
                        {activeSection === "settings" && (
                            <div className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuració</h2>

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
                                                    General
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab("subscription")}
                                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                                        activeTab === "subscription"
                                                            ? "border-[#9e2a2f] text-[#9e2a2f]"
                                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                    }`}
                                                >
                                                    Subscripció
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab("security")}
                                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                                        activeTab === "security"
                                                            ? "border-[#9e2a2f] text-[#9e2a2f]"
                                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                    }`}
                                                >
                                                    Seguretat
                                                </button>
                                            </nav>
                                        </div>

                                        {activeTab === "general" && (
                                            <div className="space-y-6">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Preferències de Notificacions</h3>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-700">Notificacions per Email</p>
                                                                <p className="text-xs text-gray-500">
                                                                    Rebràs emails sobre noves valoracions, projectes i més
                                                                </p>
                                                            </div>
                                                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                                <input
                                                                    type="checkbox"
                                                                    name="emailNotifications"
                                                                    id="emailNotifications"
                                                                    defaultChecked
                                                                    className="sr-only"
                                                                />
                                                                <label
                                                                    htmlFor="emailNotifications"
                                                                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                                                >
                                                                    <span className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out translate-x-4"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-700">Notificacions Push</p>
                                                                <p className="text-xs text-gray-500">
                                                                    Rebràs notificacions al navegador sobre activitat important
                                                                </p>
                                                            </div>
                                                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                                <input
                                                                    type="checkbox"
                                                                    name="pushNotifications"
                                                                    id="pushNotifications"
                                                                    className="sr-only"
                                                                />
                                                                <label
                                                                    htmlFor="pushNotifications"
                                                                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                                                >
                                                                    <span className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Idioma i Regió</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Idioma
                                                            </label>
                                                            <select
                                                                id="language"
                                                                name="language"
                                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                defaultValue="ca"
                                                            >
                                                                <option value="ca">Català</option>
                                                                <option value="es">Español</option>
                                                                <option value="en">English</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Zona Horària
                                                            </label>
                                                            <select
                                                                id="timezone"
                                                                name="timezone"
                                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                                defaultValue="Europe/Madrid"
                                                            >
                                                                <option value="Europe/Madrid">Europe/Madrid (UTC+1)</option>
                                                                <option value="Europe/London">Europe/London (UTC+0)</option>
                                                                <option value="America/New_York">America/New_York (UTC-5)</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "subscription" && (
                                            <div className="space-y-6">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h3 className="text-lg font-medium text-gray-800">Pla Actual</h3>
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Actiu
                            </span>
                                                    </div>
                                                    <div className="flex items-center mb-4">
                                                        <div className="w-12 h-12 rounded-full bg-[#9e2a2f]/10 flex items-center justify-center mr-4">
                                                            <CreditCardIcon className="h-6 w-6 text-[#9e2a2f]" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-700">
                                                                {companyData.plans.find((plan) => plan.isActive)?.name || "Premium"}
                                                            </p>
                                                            <p className="text-2xl font-bold text-gray-800">
                                                                {companyData.plans.find((plan) => plan.isActive)?.price || 199.99}€/mes
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Característiques incloses:</h4>
                                                        <ul className="space-y-2">
                                                            {companyData.plans
                                                                .find((plan) => plan.isActive)
                                                                ?.features.map((feature, index) => (
                                                                    <li key={index} className="flex items-center text-sm text-gray-600">
                                                                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                                                                        {feature}
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Plans Disponibles</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        {companyData.plans.map((plan) => (
                                                            <div
                                                                key={plan.id}
                                                                className={`border rounded-lg p-4 transition-all duration-300 hover:shadow-md ${
                                                                    plan.isActive ? "border-[#9e2a2f] bg-[#9e2a2f]/5" : "border-gray-200"
                                                                }`}
                                                            >
                                                                <h4 className="text-lg font-bold text-gray-800">{plan.name}</h4>
                                                                <p className="text-2xl font-bold text-gray-800 my-2">{plan.price}€/mes</p>
                                                                <ul className="space-y-2 mb-4">
                                                                    {plan.features.map((feature, index) => (
                                                                        <li key={index} className="flex items-center text-sm text-gray-600">
                                                                            <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                                                                            {feature}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                                <Button
                                                                    className={`w-full py-2 rounded-lg ${
                                                                        plan.isActive
                                                                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                                                            : "bg-[#9e2a2f] text-white"
                                                                    }`}
                                                                    disabled={plan.isActive}
                                                                >
                                                                    {plan.isActive ? "Pla Actual" : "Canviar Pla"}
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Historial de Facturació</h3>
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-50">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                >
                                                                    Data
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                >
                                                                    Descripció
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                >
                                                                    Import
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
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">01/04/2023</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    Subscripció Premium - Abril 2023
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">199,99 €</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button className="text-indigo-600 hover:text-indigo-900">Descarregar</button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">01/03/2023</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    Subscripció Premium - Març 2023
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">199,99 €</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button className="text-indigo-600 hover:text-indigo-900">Descarregar</button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">01/02/2023</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    Subscripció Premium - Febrer 2023
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">199,99 €</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button className="text-indigo-600 hover:text-indigo-900">Descarregar</button>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "security" && (
                                            <div className="space-y-6">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Canviar Contrasenya</h3>
                                                    <form className="space-y-4">
                                                        <div>
                                                            <label
                                                                htmlFor="current-password"
                                                                className="block text-sm font-medium text-gray-700 mb-1"
                                                            >
                                                                Contrasenya Actual
                                                            </label>
                                                            <input
                                                                type="password"
                                                                id="current-password"
                                                                name="current-password"
                                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Nova Contrasenya
                                                            </label>
                                                            <input
                                                                type="password"
                                                                id="new-password"
                                                                name="new-password"
                                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="confirm-password"
                                                                className="block text-sm font-medium text-gray-700 mb-1"
                                                            >
                                                                Confirmar Nova Contrasenya
                                                            </label>
                                                            <input
                                                                type="password"
                                                                id="confirm-password"
                                                                name="confirm-password"
                                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                                            />
                                                        </div>
                                                        <Button className="bg-[#9e2a2f] text-white px-4 py-2 rounded-lg">
                                                            Actualitzar Contrasenya
                                                        </Button>
                                                    </form>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Verificació en Dos Passos</h3>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-700">Verificació en Dos Passos</p>
                                                            <p className="text-xs text-gray-500">
                                                                Afegeix una capa addicional de seguretat al teu compte
                                                            </p>
                                                        </div>
                                                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                                            <input
                                                                type="checkbox"
                                                                name="twoFactorAuth"
                                                                id="twoFactorAuth"
                                                                className="sr-only"
                                                            />
                                                            <label
                                                                htmlFor="twoFactorAuth"
                                                                className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                                            >
                                                                <span className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                                                        Configurar Verificació
                                                    </Button>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Sessions Actives</h3>
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-5 w-5 text-blue-600"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        <p className="text-sm text-gray-900">Chrome en Windows</p>
                                                                        <p className="text-xs text-gray-500">Barcelona, Espanya · Activa ara</p>
                                                                    </div>
                                                                </div>
                                                                <Button className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm">
                                                                    Tancar Sessió
                                                                </Button>
                                                            </div>
                                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                                                <div className="flex items-center">
                                                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5 text-green-600"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm text-gray-900">Safari en iPhone</p>
                                                                        <p className="text-xs text-gray-500">Barcelona, Espanya · Fa 2 dies</p>
                                                                    </div>
                                                                </div>
                                                                <Button className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm">
                                                                    Tancar Sessió
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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
