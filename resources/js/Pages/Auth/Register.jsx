"use client"
import { useState, useEffect } from "react"
import { Head, Link, useForm } from "@inertiajs/react"
import { motion, AnimatePresence } from "framer-motion"
import {
    BuildingOffice2Icon,
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline"

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "client",
    })

    const [focused, setFocused] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [step, setStep] = useState(1)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    useEffect(() => {
        // Simple password strength calculator
        if (!data.password) {
            setPasswordStrength(0)
            return
        }

        let strength = 0
        // Length check
        if (data.password.length >= 8) strength += 1
        // Contains number
        if (/\d/.test(data.password)) strength += 1
        // Contains special char
        if (/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) strength += 1
        // Contains uppercase
        if (/[A-Z]/.test(data.password)) strength += 1

        setPasswordStrength(strength)
    }, [data.password])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (step < 3) {
            setStep(step + 1)
            return
        }
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        })
    }

    const goBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
            },
        },
    }

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 500 : -500,
            opacity: 0,
        }),
    }

    const clientGradient = "from-emerald-400 via-teal-500 to-cyan-600"
    const companyGradient = "from-rose-500 via-red-600 to-rose-700"
    const currentGradient = data.role === "client" ? clientGradient : companyGradient

    const getStepTitle = () => {
        switch (step) {
            case 1:
                return "Crea el teu compte"
            case 2:
                return "Configura la teva contrasenya"
            case 3:
                return "Confirma les teves dades"
            default:
                return "Registre"
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white">
            <Head title="Register" />

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${currentGradient} opacity-20 blur-3xl transform transition-all duration-700 ease-in-out`}
                ></div>
                <div
                    className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr ${currentGradient} opacity-20 blur-3xl transform transition-all duration-700 ease-in-out`}
                ></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjMDAwIiBvcGFjaXR5PSIuMDIiIGQ9Ik0wIDBoMTQ0MHY3NjBIMHoiLz48cGF0aCBkPSJNLTcwLjUgNDg5LjVjMTkuMzMzLTI0LjY2NyA0MC42NjctNDQgNjQtNTggNzAtNDIgMTE3IDAgMTY4IDMyIDUxLjMzMyAzMiAxMDIuNjY3IDI4IDE1NC0xMiA1MS4zMzMtNDAgMTAyLjY2Ny01MiAxNTQtMzYgNTEuMzMzIDE2IDEwMi42NjcgNjggMTU0IDE1NiA1MS4zMzMgODggMTAyLjY2NyAxMzIgMTU0IDEzMiA1MS4zMzMgMCAxMDIuNjY3LTQ0IDE1NC0xMzIgNTEuMzMzLTg4IDEwMi42NjctMTQwIDE1NC0xNTYgNTEuMzMzLTE2IDEwMi42NjcgNCAxNTQgNjAgNTEuMzMzIDU2IDEwMi42NjcgNzYgMTU0IDYwIDUxLjMzMy0xNiAxMDIuNjY3LTY4IDE1NC0xNTYgNTEuMzMzLTg4IDEwMi42NjctMTMyIDE1NC0xMzIgNTEuMzMzIDAgMTAyLjY2NyA0NCAxNTQgMTMyIDUxLjMzMyA4OCAxMDIuNjY3IDE0MCAxNTQgMTU2IDUxLjMzMyAxNiAxMDIuNjY3LTQgMTU0LTYwIDUxLjMzMy01NiAxMDIuNjY3LTc2IDE1NC02MCIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Role selector */}
                    <div className="relative h-20">
                        <div className={`absolute inset-0 bg-gradient-to-r ${currentGradient} transition-all duration-700`}></div>
                        <div className="absolute inset-0 flex">
                            <button
                                type="button"
                                onClick={() => setData("role", "client")}
                                className={`flex-1 flex items-center justify-center transition-all duration-300 ${
                                    data.role === "client" ? "text-white font-bold" : "text-white/70 hover:text-white/90"
                                }`}
                            >
                                <motion.div
                                    animate={data.role === "client" ? { scale: 1.05 } : { scale: 1 }}
                                    className="flex items-center space-x-2"
                                >
                                    <UserIcon className="h-5 w-5" />
                                    <span>Client</span>
                                </motion.div>
                            </button>

                            <div className="w-px bg-white/20 self-stretch mx-2"></div>

                            <button
                                type="button"
                                onClick={() => setData("role", "company")}
                                className={`flex-1 flex items-center justify-center transition-all duration-300 ${
                                    data.role === "company" ? "text-white font-bold" : "text-white/70 hover:text-white/90"
                                }`}
                            >
                                <motion.div
                                    animate={data.role === "company" ? { scale: 1.05 } : { scale: 1 }}
                                    className="flex items-center space-x-2"
                                >
                                    <BuildingOffice2Icon className="h-5 w-5" />
                                    <span>Empresa</span>
                                </motion.div>
                            </button>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="px-8 pt-6">
                        <div className="flex items-center justify-between mb-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            i < step
                                                ? `bg-${data.role === "client" ? "teal" : "red"}-500 text-white`
                                                : i === step
                                                    ? `bg-${data.role === "client" ? "teal" : "red"}-100 text-${
                                                        data.role === "client" ? "teal" : "red"
                                                    }-500`
                                                    : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        {i < step ? <CheckCircleIcon className="h-5 w-5" /> : <span>{i}</span>}
                                    </div>
                                    <div
                                        className={`text-xs mt-1 ${
                                            i <= step ? `text-${data.role === "client" ? "teal" : "red"}-500 font-medium` : "text-gray-400"
                                        }`}
                                    >
                                        {i === 1 ? "Compte" : i === 2 ? "Seguretat" : "Confirmar"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form content */}
                    <div className="p-8 pt-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${data.role}-${step}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">{getStepTitle()}</h1>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence mode="wait" custom={step > 1 ? 1 : -1}>
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        custom={1}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="space-y-6"
                                    >
                                        {/* Name field */}
                                        <div className="relative">
                                            <div
                                                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                                                    focused === "name" || data.name
                                                        ? `text-${data.role === "client" ? "teal" : "red"}-500 -translate-y-10 text-xs`
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                <UserIcon className="h-5 w-5 inline mr-2" />
                                                <span>Nom complet</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData("name", e.target.value)}
                                                onFocus={() => setFocused("name")}
                                                onBlur={() => setFocused(null)}
                                                className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-4 pt-6 outline-none transition-all duration-300 ${
                                                    focused === "name"
                                                        ? data.role === "client"
                                                            ? "border-teal-500 ring-4 ring-teal-500/20"
                                                            : "border-red-500 ring-4 ring-red-500/20"
                                                        : "border-gray-200"
                                                } ${data.name ? "pt-6" : ""}`}
                                                required
                                            />
                                            {errors.name && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-500 text-sm mt-1"
                                                >
                                                    {errors.name}
                                                </motion.p>
                                            )}
                                        </div>

                                        {/* Email field */}
                                        <div className="relative">
                                            <div
                                                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                                                    focused === "email" || data.email
                                                        ? `text-${data.role === "client" ? "teal" : "red"}-500 -translate-y-10 text-xs`
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                <EnvelopeIcon className="h-5 w-5 inline mr-2" />
                                                <span>Email</span>
                                            </div>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData("email", e.target.value)}
                                                onFocus={() => setFocused("email")}
                                                onBlur={() => setFocused(null)}
                                                className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-4 pt-6 outline-none transition-all duration-300 ${
                                                    focused === "email"
                                                        ? data.role === "client"
                                                            ? "border-teal-500 ring-4 ring-teal-500/20"
                                                            : "border-red-500 ring-4 ring-red-500/20"
                                                        : "border-gray-200"
                                                } ${data.email ? "pt-6" : ""}`}
                                                required
                                            />
                                            {errors.email && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-500 text-sm mt-1"
                                                >
                                                    {errors.email}
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        custom={1}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="space-y-6"
                                    >
                                        {/* Password field */}
                                        <div className="relative">
                                            <div
                                                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                                                    focused === "password" || data.password
                                                        ? `text-${data.role === "client" ? "teal" : "red"}-500 -translate-y-10 text-xs`
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                <LockClosedIcon className="h-5 w-5 inline mr-2" />
                                                <span>Contrasenya</span>
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={data.password}
                                                onChange={(e) => setData("password", e.target.value)}
                                                onFocus={() => setFocused("password")}
                                                onBlur={() => setFocused(null)}
                                                className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-4 pt-6 outline-none transition-all duration-300 ${
                                                    focused === "password"
                                                        ? data.role === "client"
                                                            ? "border-teal-500 ring-4 ring-teal-500/20"
                                                            : "border-red-500 ring-4 ring-red-500/20"
                                                        : "border-gray-200"
                                                } ${data.password ? "pt-6" : ""}`}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? "Ocultar" : "Mostrar"}
                                            </button>
                                            {errors.password && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-500 text-sm mt-1"
                                                >
                                                    {errors.password}
                                                </motion.p>
                                            )}

                                            {/* Password strength indicator */}
                                            {data.password && (
                                                <div className="mt-2">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-xs text-gray-500">Força de la contrasenya</span>
                                                        <span
                                                            className={`text-xs font-medium ${
                                                                passwordStrength === 0
                                                                    ? "text-red-500"
                                                                    : passwordStrength === 1
                                                                        ? "text-orange-500"
                                                                        : passwordStrength === 2
                                                                            ? "text-yellow-500"
                                                                            : passwordStrength === 3
                                                                                ? "text-green-500"
                                                                                : "text-emerald-500"
                                                            }`}
                                                        >
                              {passwordStrength === 0
                                  ? "Molt feble"
                                  : passwordStrength === 1
                                      ? "Feble"
                                      : passwordStrength === 2
                                          ? "Mitjana"
                                          : passwordStrength === 3
                                              ? "Forta"
                                              : "Molt forta"}
                            </span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                                                            className={`h-full ${
                                                                passwordStrength === 0
                                                                    ? "bg-red-500"
                                                                    : passwordStrength === 1
                                                                        ? "bg-orange-500"
                                                                        : passwordStrength === 2
                                                                            ? "bg-yellow-500"
                                                                            : passwordStrength === 3
                                                                                ? "bg-green-500"
                                                                                : "bg-emerald-500"
                                                            }`}
                                                        ></motion.div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Confirm Password field */}
                                        <div className="relative">
                                            <div
                                                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                                                    focused === "password_confirmation" || data.password_confirmation
                                                        ? `text-${data.role === "client" ? "teal" : "red"}-500 -translate-y-10 text-xs`
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                <LockClosedIcon className="h-5 w-5 inline mr-2" />
                                                <span>Confirma la contrasenya</span>
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={data.password_confirmation}
                                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                                onFocus={() => setFocused("password_confirmation")}
                                                onBlur={() => setFocused(null)}
                                                className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-4 pt-6 outline-none transition-all duration-300 ${
                                                    focused === "password_confirmation"
                                                        ? data.role === "client"
                                                            ? "border-teal-500 ring-4 ring-teal-500/20"
                                                            : "border-red-500 ring-4 ring-red-500/20"
                                                        : "border-gray-200"
                                                } ${data.password_confirmation ? "pt-6" : ""}`}
                                                required
                                            />
                                            {errors.password_confirmation && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-500 text-sm mt-1"
                                                >
                                                    {errors.password_confirmation}
                                                </motion.p>
                                            )}
                                            {data.password && data.password_confirmation && (
                                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                    {data.password === data.password_confirmation ? (
                                                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <XCircleIcon className="h-5 w-5 text-red-500" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        custom={1}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-gray-50 p-6 rounded-xl">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirma les teves dades</h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Nom:</span>
                                                    <span className="font-medium text-gray-900">{data.name}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Email:</span>
                                                    <span className="font-medium text-gray-900">{data.email}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Tipus de compte:</span>
                                                    <span className={`font-medium ${data.role === "client" ? "text-teal-500" : "text-red-500"}`}>
                            {data.role === "client" ? "Client" : "Empresa"}
                          </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                id="terms"
                                                type="checkbox"
                                                className={`rounded border-gray-300 text-${
                                                    data.role === "client" ? "teal" : "red"
                                                }-500 focus:ring-${data.role === "client" ? "teal" : "red"}-500`}
                                            />
                                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                                Accepto els{" "}
                                                <a
                                                    href={route("terms")}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`text-${data.role === "client" ? "teal" : "red"}-500 hover:underline`}
                                                >
                                                    termes i condicions
                                                </a>{" "}
                                                i la{" "}
                                                <a
                                                    href={route("privacy")}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`text-${data.role === "client" ? "teal" : "red"}-500 hover:underline`}
                                                >
                                                    política de privacitat
                                                </a>
                                            </label>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation buttons */}
                            <div className="flex justify-between pt-4">
                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={goBack}
                                        className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
                                    >
                                        Enrere
                                    </button>
                                ) : (
                                    <Link
                                        href={route("login")}
                                        className={`text-${data.role === "client" ? "teal" : "red"}-500 hover:underline flex items-center`}
                                    >
                                        Ja tens compte?
                                    </Link>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-6 py-3 rounded-xl bg-gradient-to-r ${currentGradient} text-white font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    <span>{step < 3 ? "Següent" : "Registrar-me"}</span>
                                    <ArrowRightIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
