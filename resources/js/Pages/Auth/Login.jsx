"use client"
import { useState, useEffect } from "react"
import { Head, Link, useForm } from "@inertiajs/react"
import { motion } from "framer-motion"
import { EnvelopeIcon, LockClosedIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    })

    const [focused, setFocused] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("login"))
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

    // Usamos un gradiente azul neutro que funcione para todos los usuarios
    const gradient = "from-blue-500 via-indigo-600 to-purple-700"

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white">
            <Head title="Login" />

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl transform transition-all duration-700 ease-in-out`}
                ></div>
                <div
                    className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr ${gradient} opacity-20 blur-3xl transform transition-all duration-700 ease-in-out`}
                ></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="relative h-20">
                        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} transition-all duration-700`}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-2xl font-bold text-white">Iniciar Sessió</h1>
                        </div>
                    </div>

                    {/* Form content */}
                    <div className="p-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Benvingut de nou!</h2>
                                <p className="mt-2 text-gray-600">Accedeix al teu compte per continuar</p>
                            </div>
                        </motion.div>

                        <motion.form
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {/* Email field */}
                            <motion.div variants={itemVariants} className="relative">
                                <div
                                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                                        focused === "email" || data.email ? `text-indigo-600 -translate-y-10 text-xs` : "text-gray-400"
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
                                        focused === "email" ? "border-indigo-500 ring-4 ring-indigo-500/20" : "border-gray-200"
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
                            </motion.div>

                            {/* Password field */}
                            <motion.div variants={itemVariants} className="relative">
                                <div
                                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                                        focused === "password" || data.password
                                            ? `text-indigo-600 -translate-y-10 text-xs`
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
                                        focused === "password" ? "border-indigo-500 ring-4 ring-indigo-500/20" : "border-gray-200"
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
                            </motion.div>

                            {/* Remember me and forgot password */}
                            <motion.div variants={itemVariants} className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        name="remember"
                                    />
                                    <span>Recorda'm</span>
                                </label>
                                <a href={route("password.request")} className="text-sm text-indigo-600 hover:underline">
                                    Has oblidat la contrasenya?
                                </a>
                            </motion.div>

                            {/* Submit button */}
                            <motion.div variants={itemVariants}>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full py-4 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    <span>Iniciar Sessió</span>
                                    <ArrowRightIcon className="h-5 w-5" />
                                </button>
                            </motion.div>

                            {/* Register link */}
                            <motion.div variants={itemVariants} className="text-center mt-6">
                                <p className="text-gray-600">
                                    No tens compte?{" "}
                                    <Link href={route("register")} className="font-medium text-indigo-600 hover:underline">
                                        Registra't ara
                                    </Link>
                                </p>
                            </motion.div>
                        </motion.form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
