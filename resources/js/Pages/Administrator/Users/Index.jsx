"use client"

import { useState, useEffect } from "react"
import { router, Link } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import { Search, Plus, Eye, Edit, Trash2, X, UserCircle, Shield, User, Mail, Calendar, AlertCircle } from 'lucide-react'
import Pagination from "@/Pages/Administrator/Components/Pagination"

const UsersIndex = ({ users, admins, auth }) => {
    // Estado para controlar qué pestaña está activa
    const [activeTab, setActiveTab] = useState("users")

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredItems, setFilteredItems] = useState(users)

    // Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [paginatedItems, setPaginatedItems] = useState([])

    // Apply search filter and handle tab changes
    useEffect(() => {
        let items = activeTab === "users" ? users : admins;

        if (searchTerm) {
            const results = items.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (item.role && item.role.toLowerCase().includes(searchTerm.toLowerCase())),
            )
            setFilteredItems(results)
        } else {
            setFilteredItems(items)
        }
        // Resetear a la primera página cuando cambian los filtros o las pestañas
        setCurrentPage(1)
    }, [searchTerm, users, admins, activeTab])

    // Aplicar paginación a los elementos filtrados
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedItems(filteredItems.slice(startIndex, endIndex))
    }, [filteredItems, currentPage, itemsPerPage])

    const handleDelete = (item) => {
        setSelectedUserId(item.id)
        setSelectedUser(item)
        setShowDeleteDialog(true)
    }

    const confirmDelete = () => {
        if (selectedUserId) {
            if (activeTab === "users") {
                router.delete(route('administrator.users.destroy', selectedUserId))
            } else {
                router.delete(route('administrator.admins.destroy', selectedUserId))
            }
        }
        setShowDeleteDialog(false)
    }

    const cancelDelete = () => {
        setShowDeleteDialog(false)
        setSelectedUser(null)
    }

    // Function to get role badge styling
    const getRoleBadge = (role) => {
        const roles = {
            admin: {
                icon: <Shield size={14} />,
                class: "bg-purple-100 text-purple-800 border-purple-200",
            },
            manager: {
                icon: <Shield size={14} />,
                class: "bg-blue-100 text-blue-800 border-blue-200",
            },
            user: {
                icon: <User size={14} />,
                class: "bg-green-100 text-green-800 border-green-200",
            },
        }

        // Default styling if role is not in our mapping
        const defaultStyle = {
            icon: <User size={14} />,
            class: "bg-gray-100 text-gray-800 border-gray-200",
        }

        // Convert role to lowercase for case-insensitive matching
        const roleLower = role ? role.toLowerCase() : ""
        return roles[roleLower] || defaultStyle
    }

    // Manejar cambio de página
    const handlePageChange = (page) => {
        setCurrentPage(page)
        // Scroll al inicio de la lista
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Manejar cambio de elementos por página
    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1) // Resetear a la primera página
    }

    // Función para cambiar entre pestañas
    const handleTabChange = (tab) => {
        setActiveTab(tab)
        setSearchTerm("")
    }

    // Función para obtener la ruta correcta según el tipo de elemento
    const getRoute = (action, id = null) => {
        if (activeTab === "users") {
            if (action === "index") return route('administrator.users.index');
            if (action === "create") return route('administrator.users.create');
            if (action === "show") return route('administrator.users.show', id);
            if (action === "edit") return route('administrator.users.edit', id);
            if (action === "destroy") return route('administrator.users.destroy', id);
        } else {
            if (action === "index") return route('administrator.admins.index');
            if (action === "create") return route('administrator.admins.create');
            if (action === "show") return route('administrator.admins.show', id);
            if (action === "edit") return route('administrator.admins.edit', id);
            if (action === "destroy") return route('administrator.admins.destroy', id);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />
            <AdminHeader theme="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white" />

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header amb títol i botó de crear */}
                    <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {activeTab === "users" ? "Gestió d'Usuaris" : "Gestió d'Administradors"}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                {activeTab === "users"
                                    ? "Administra els usuaris del sistema"
                                    : "Administra els administradors del sistema"}
                            </p>
                        </div>
                        <Link
                            href={getRoute('create')}
                            className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span>{activeTab === "users" ? "Nou Usuari" : "Nou Administrador"}</span>
                        </Link>
                    </div>

                    {/* Pestañas */}
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => handleTabChange("users")}
                            className={`flex-1 py-4 px-6 text-center font-medium ${
                                activeTab === "users"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            Usuaris
                        </button>
                        <button
                            onClick={() => handleTabChange("admins")}
                            className={`flex-1 py-4 px-6 text-center font-medium ${
                                activeTab === "admins"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            Administradors
                        </button>
                    </div>

                    {/* Cercador */}
                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={`Cercar ${activeTab === "users" ? "usuaris" : "administradors"}...`}
                                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <X size={16} className="text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>

                        {/* Comptador de resultats */}
                        <div className="mt-4 text-sm text-gray-600">
                            {filteredItems.length} {filteredItems.length === 1
                            ? (activeTab === "users" ? "usuari trobat" : "administrador trobat")
                            : (activeTab === "users" ? "usuaris trobats" : "administradors trobats")}
                        </div>
                    </div>

                    {/* Llista d'elements */}
                    <div className="divide-y divide-gray-200">
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item) => {
                                const roleBadge = getRoleBadge(item.role)
                                const isCurrentUser = activeTab === "users" && item.id === auth.user.id

                                return (
                                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="hidden sm:flex h-12 w-12 rounded-full bg-blue-100 text-blue-600 items-center justify-center flex-shrink-0">
                                                    <UserCircle size={28} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                                        {isCurrentUser && (
                                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full border border-blue-200">
                                                                Tu
                                                            </span>
                                                        )}
                                                        {activeTab === "admins" && (
                                                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                                                                <Shield size={14} />
                                                                Administrador
                                                            </span>
                                                        )}
                                                        {activeTab === "users" && item.role && (
                                                            <span
                                                                className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${roleBadge.class}`}
                                                            >
                                                                {roleBadge.icon}
                                                                {item.role || "Usuari"}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-gray-600 text-sm flex items-center gap-1.5">
                                                            <Mail size={14} className="text-gray-400" />
                                                            {item.email}
                                                        </p>
                                                        {item.created_at && (
                                                            <p className="text-gray-500 text-xs flex items-center gap-1.5">
                                                                <Calendar size={14} className="text-gray-400" />
                                                                Registrat: {new Date(item.created_at).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                                                <Link
                                                    href={getRoute('show', item.id)}
                                                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                                                >
                                                    <Eye size={16} />
                                                    <span className="hidden sm:inline">Veure</span>
                                                </Link>
                                                <Link
                                                    href={getRoute('edit', item.id)}
                                                    className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                                                >
                                                    <Edit size={16} />
                                                    <span className="hidden sm:inline">Editar</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item)}
                                                    disabled={isCurrentUser}
                                                    className={`flex items-center gap-1 ${
                                                        isCurrentUser
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                            : "bg-red-100 hover:bg-red-200 text-red-700"
                                                    } px-3 py-2 rounded-lg transition-colors`}
                                                >
                                                    <Trash2 size={16} />
                                                    <span className="hidden sm:inline">Eliminar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="p-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <Search size={24} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                    {activeTab === "users"
                                        ? "No s'han trobat usuaris"
                                        : "No s'han trobat administradors"}
                                </h3>
                                <p className="text-gray-500">
                                    Prova amb uns altres termes de cerca o crea un nou {activeTab === "users" ? "usuari" : "administrador"}.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Paginación */}
                    {filteredItems.length > 0 && (
                        <div className="px-6 border-t border-gray-200">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredItems.length}
                                onItemsPerPageChange={handleItemsPerPageChange}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de confirmació d'eliminació */}
            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <AlertCircle size={24} />
                            <h2 className="text-xl font-bold">
                                {activeTab === "users" ? "Eliminar Usuari" : "Eliminar Administrador"}
                            </h2>
                        </div>

                        {selectedUser && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                                <p className="font-medium text-gray-900">{selectedUser.name}</p>
                                <p className="text-gray-600 text-sm">{selectedUser.email}</p>
                            </div>
                        )}

                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols eliminar aquest {activeTab === "users" ? "usuari" : "administrador"}?
                            Aquesta acció no es pot desfer i s'eliminaran totes les dades associades.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg font-medium transition-colors"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default UsersIndex
