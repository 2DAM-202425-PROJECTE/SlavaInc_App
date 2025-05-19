"use client"

import {useState, useEffect} from "react"
import {Link, useForm} from "@inertiajs/react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faUser,
    faEnvelope,
    faCalendarAlt,
    faEdit,
    faLock,
    faSignOutAlt,
    faShieldAlt,
    faKey,
    faCog,
    faHistory,
    faUserShield,
    faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"
import Header from "@/Components/Header.jsx"
import Footer from "@/Components/Footer.jsx"

const Profile = ({admin}) => {
    // Estados para los modales
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [adminData, setAdminData] = useState(null)

    // Form para cambiar contraseña
    const {data, setData, post, processing, errors, reset} = useForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    })

    // Colors del tema
    const primaryColor = "#1e40af"
    const secondaryColor = "#3b82f6"
    const gradient = `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`

    // Cargar datos del administrador
    useEffect(() => {
        console.log('Dades rebudes:', admin); // Depuració

        if (!admin || !admin.id) {
            setError('No s\'han trobat dades vàlides d\'administrador');
            setLoading(false);
            return;
        }

        setAdminData(admin);
        setLoading(false);
    }, [admin]);

    // Manejar el envío del formulario de cambio de contraseña
    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        post("/admin/change-password", {
            onSuccess: () => {
                reset()
                setShowPasswordModal(false)
            },
        })
    }

    // Mostrar pantalla de carga mientras se verifican los datos
    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <Header theme={`bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white`}/>
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div
                            className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Carregant el teu perfil...</p>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    // Si no hay datos de administrador, mostrar un mensaje de error
    if (!adminData) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <Header theme={`bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white`}/>

                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8 max-w-md">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-6xl text-yellow-500 mb-4"/>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No s'han trobat dades d'administrador</h2>
                        <p className="text-gray-600 mb-6">
                            No s'ha pogut carregar la informació del teu perfil. Si us plau, torna a iniciar sessió o
                            contacta amb
                            suport tècnic.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link
                                href="/admin/login"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Iniciar sessió
                            </Link>
                            <Link href="/support"
                                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                                Contactar suport
                            </Link>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }

    // Preparar fechas
    const createdAt = adminData.created_at ? new Date(adminData.created_at) : null
    const updatedAt = adminData.updated_at ? new Date(adminData.updated_at) : null

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header theme={`bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white`}/>

            {/* Capçalera amb gradient */}
            <section className="w-full py-12 px-6" style={{background: gradient}}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">El meu perfil</h1>
                        <p className="text-lg text-white/90">Gestiona la teva informació d'administrador</p>
                    </div>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            {/* Secció avatar/informació bàsica */}
                            <div className="lg:w-1/3 p-8 bg-gray-50 flex flex-col items-center">
                                <div
                                    className="w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center mb-6 overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center"
                                         style={{background: gradient}}>
                                        <FontAwesomeIcon icon={faUserShield} className="text-6xl text-white"/>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-1">{adminData.name}</h2>
                                <p className="text-gray-600 mb-2">
                  <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <FontAwesomeIcon icon={faShieldAlt} className="mr-1"/> Administrador
                  </span>
                                </p>

                                <div className="w-full space-y-4 mt-6">
                                    {createdAt && (
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500"/>
                                            <div>
                                                <p className="text-sm text-gray-500">Compte creat el</p>
                                                <p className="text-gray-700">
                                                    {createdAt.toLocaleDateString("ca-ES", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {updatedAt && (
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500"/>
                                            <div>
                                                <p className="text-sm text-gray-500">Última actualització</p>
                                                <p className="text-gray-700">
                                                    {updatedAt.toLocaleDateString("ca-ES", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Secció informació detallada */}
                            <div className="lg:w-2/3 p-8">
                                {/* Secció "Informació de l'administrador" */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold pb-2 border-b"
                                            style={{borderColor: secondaryColor}}>
                                            Informació de l'administrador
                                        </h2>
                                        <button
                                            onClick={() => document.getElementById("editAdminModal").showModal()}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faEdit}/>
                                            <span>Editar</span>
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div
                                            className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon icon={faUser} className="text-xl"
                                                                 style={{color: secondaryColor}}/>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Nom</p>
                                                    <p className="text-gray-600">{adminData.name}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon icon={faEnvelope} className="text-xl"
                                                                 style={{color: secondaryColor}}/>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Correu electrònic</p>
                                                    <a
                                                        href={`mailto:${adminData.email}`}
                                                        className="text-gray-600 hover:text-[#3b82f6] transition-colors"
                                                    >
                                                        {adminData.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setShowPasswordModal(true)}
                                            className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#3b82f6] text-left"
                                        >
                                            <div className="flex items-start gap-3">
                                                <FontAwesomeIcon icon={faLock} className="text-xl mt-1"
                                                                 style={{color: secondaryColor}}/>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 mb-2">Canviar
                                                        contrasenya</h3>
                                                    <p className="text-gray-600 text-sm">
                                                        Actualitza la teva contrasenya periòdicament per mantenir el
                                                        compte segur
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-red-400 text-left"
                                        >
                                            <div className="flex items-start gap-3">
                                                <FontAwesomeIcon icon={faSignOutAlt}
                                                                 className="text-xl mt-1 text-red-500"/>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 mb-2 text-red-500">Tancar
                                                        sessió</h3>
                                                    <p className="text-gray-600 text-sm">Tanca la sessió actual del teu
                                                        compte</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de cambio de contraseña */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Canviar contrasenya</h2>

                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="current_password">
                                    Contrasenya actual
                                </label>
                                <input
                                    id="current_password"
                                    type="password"
                                    value={data.current_password}
                                    onChange={(e) => setData("current_password", e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.current_password &&
                                    <p className="text-red-500 text-xs mt-1">{errors.current_password}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new_password">
                                    Nova contrasenya
                                </label>
                                <input
                                    id="new_password"
                                    type="password"
                                    value={data.new_password}
                                    onChange={(e) => setData("new_password", e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.new_password &&
                                    <p className="text-red-500 text-xs mt-1">{errors.new_password}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="new_password_confirmation">
                                    Confirma la nova contrasenya
                                </label>
                                <input
                                    id="new_password_confirmation"
                                    type="password"
                                    value={data.new_password_confirmation}
                                    onChange={(e) => setData("new_password_confirmation", e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancel·lar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Canviar contrasenya
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para editar información del administrador */}
            <dialog id="editAdminModal" className="modal rounded-lg p-0 w-full max-w-md">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-blue-700 to-blue-500">
                        <h3 className="text-xl font-bold text-white">Editar informació de l'administrador</h3>
                    </div>

                    <form method="dialog" className="p-6">
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                                <input
                                    type="text"
                                    defaultValue={adminData.name}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Correu electrònic</label>
                                <input
                                    type="email"
                                    defaultValue={adminData.email}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                                Cancel·lar
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Guardar canvis
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
            <Footer/>
        </div>
    )
}

export default Profile
