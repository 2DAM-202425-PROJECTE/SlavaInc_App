"use client"

import { useState, useEffect } from "react"
import { Link } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer.jsx"
import AdminHeader from "@/Pages/Administrator/Components/Header.jsx"
import { Search, Plus, Eye, Edit, Trash2, X, UserCircle, Shield, Mail, Calendar, AlertCircle } from 'lucide-react'
import Pagination from "@/Pages/Administrator/Components/Pagination"

const AdminsIndex = ({ admins, auth }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [selectedAdminId, setSelectedAdminId] = useState(null)
    const [selectedAdmin, setSelectedAdmin] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredAdmins, setFilteredAdmins] = useState(admins)

    // Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [paginatedAdmins, setPaginatedAdmins] = useState([])

    // Apply search filter
    useEffect(() => {
        if (searchTerm) {
            const results = admins.filter(
                (admin) =>
                    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredAdmins(results)
        } else {
            setFilteredAdmins(admins)
        }
        // Resetear a la primera página cuando cambian los filtros
        setCurrentPage(1)
    }, [searchTerm, admins])

    // Aplicar paginación a los administradores filtrados
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedAdmins(filteredAdmins.slice(startIndex, endIndex))
    }, [filteredAdmins, currentPage, itemsPerPage])

    const handleDelete = (admin) => {
        setSelectedAdminId(admin.id)
        setSelectedAdmin(admin)
        setShowDeleteDialog(true)
    }

    const confirmDelete = () => {
        if (selectedAdminId) {
            Link.delete(route('administrator.admins.destroy', selectedAdminId))
        }
        setShowDeleteDialog(false)
    }

    const cancelDelete = () => {
        setShowDeleteDialog(false)
        setSelectedAdmin(null)
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
                            <h1 className="text-2xl font-bold text-gray-800">Gestió d'Administradors</h1>
                            <p className="text-gray-500 mt-1">Administra els administradors del sistema</p>
                        </div>
                        <Link
                            href={route('administrator.admins.create')}
                            className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span>Nou Administrador</span>
                        </Link>
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
                                placeholder="Cercar administradors..."
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
                            {filteredAdmins.length} {filteredAdmins.length === 1 ? "administrador trobat" : "administradors trobats"}
                        </div>
                    </div>

                    {/* Llista d'administradors */}
                    <div className="divide-y divide-gray-200">
                        {paginatedAdmins.length > 0 ? (
                            paginatedAdmins.map((admin) => {
                                const isCurrentAdmin = admin.id === auth.user?.id;

                                return (
                                    <div key={admin.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="hidden sm:flex h-12 w-12 rounded-full bg-blue-100 text-blue-600 items-center justify-center flex-shrink-0">
                                                    <UserCircle size={28} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-semibold text-gray-800">{admin.name}</h3>
                                                        {isCurrentAdmin && (
                                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full border border-blue-200">
                                                                Tu
                                                            </span>
                                                        )}
                                                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                                                            <Shield size={14} />
                                                            Administrador
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-gray-600 text-sm flex items-center gap-1.5">
                                                            <Mail size={14} className="text-gray-400" />
                                                            {admin.email}
                                                        </p>
                                                        {admin.created_at && (
                                                            <p className="text-gray-500 text-xs flex items-center gap-1.5">
                                                                <Calendar size={14} className="text-gray-400" />
                                                                Registrat: {new Date(admin.created_at).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                                                <Link
                                                    href={route('administrator.admins.show', admin.id)}
                                                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                                                >
                                                    <Eye size={16} />
                                                    <span className="hidden sm:inline">Veure</span>
                                                </Link>
                                                <Link
                                                    href={route('administrator.admins.edit', admin.id)}
                                                    className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                                                >
                                                    <Edit size={16} />
                                                    <span className="hidden sm:inline">Editar</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(admin)}
                                                    disabled={isCurrentAdmin}
                                                    className={`flex items-center gap-1 ${
                                                        isCurrentAdmin
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
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No s'han trobat administradors</h3>
                                <p className="text-gray-500">Prova amb uns altres termes de cerca o crea un nou administrador.</p>
                            </div>
                        )}
                    </div>

                    {/* Paginación */}
                    {filteredAdmins.length > 0 && (
                        <div className="px-6 border-t border-gray-200">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredAdmins.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredAdmins.length}
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
                            <h2 className="text-xl font-bold">Eliminar Administrador</h2>
                        </div>

                        {selectedAdmin && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                                <p className="font-medium text-gray-900">{selectedAdmin.name}</p>
                                <p className="text-gray-600 text-sm">{selectedAdmin.email}</p>
                            </div>
                        )}

                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols eliminar aquest administrador?
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

export default AdminsIndex
