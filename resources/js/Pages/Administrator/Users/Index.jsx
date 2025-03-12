import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const UsersIndex = ({ users }) => {
    const { auth } = usePage().props; // Obtenim l'usuari autenticat
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleDelete = (id) => {
        setSelectedUserId(id);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (selectedUserId) {
            // Envia una sol·licitud DELETE per eliminar l'usuari
            usePage().props.inertia.delete(route('administrator.users.destroy', selectedUserId));
        }
        setShowDeleteDialog(false);
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Capçalera amb botons de navegació */}
            <section className="w-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Gestió d'Usuaris
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Llista de tots els usuaris registrats
                    </p>

                    {/* Botons de navegació */}
                    <div className="flex justify-center gap-4">
                        <Link
                            href={route('administrator.users.index')}
                            className={`
                                bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300
                                border border-white/20 hover:border-white/40
                                shadow-sm hover:shadow-md
                                ${route().current('administrator.users.index') ?
                                'bg-gradient-to-r from-[#3b82f6] to-[#1e40af] border-white/40 shadow-lg' :
                                'hover:bg-gradient-to-r hover:from-[#3b82f6]/20 hover:to-[#1e40af]/20'
                            }
                            `}
                        >
                            Usuaris
                        </Link>
                        <Link
                            href={route('administrator.services.index')}
                            className={`
                                bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300
                                border border-white/20 hover:border-white/40
                                shadow-sm hover:shadow-md
                                ${route().current('administrator.services.index') ?
                                'bg-gradient-to-r from-[#3b82f6] to-[#1e40af] border-white/40 shadow-lg' :
                                'hover:bg-gradient-to-r hover:from-[#3b82f6]/20 hover:to-[#1e40af]/20'
                            }
                            `}
                        >
                            Serveis
                        </Link>
                        <Link
                            href={route('administrator.workers.index')}
                            className={`
                                bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300
                                border border-white/20 hover:border-white/40
                                shadow-sm hover:shadow-md
                                ${route().current('administrator.workers.index') ?
                                'bg-gradient-to-r from-[#3b82f6] to-[#1e40af] border-white/40 shadow-lg' :
                                'hover:bg-gradient-to-r hover:from-[#3b82f6]/20 hover:to-[#1e40af]/20'
                            }
                            `}
                        >
                            Workers
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Llista d'Usuaris
                        </h2>
                        <Link
                            href={route('administrator.users.create')}
                            className="bg-[#1e40af] hover:bg-[#3b82f6] text-white px-5 py-2.5 rounded-lg font-medium"
                        >
                            Crear Usuari
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {users.map(user => (
                            <div key={user.id} className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {user.name}
                                </h3>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-gray-600">Rol: {user.role}</p>
                                <div className="mt-2 flex gap-2">
                                    <Link
                                        href={route('administrator.users.show', user.id)}
                                        className="text-[#1e40af] hover:text-[#3b82f6]"
                                    >
                                        Veure
                                    </Link>
                                    <Link
                                        href={route('administrator.users.edit', user.id)}
                                        className="text-[#1e40af] hover:text-[#3b82f6]"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        disabled={user.id === auth.user.id} // Deshabilita el botó si és l'usuari actual
                                        className={`text-red-600 hover:text-red-800 ${
                                            user.id === auth.user.id ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Diàleg de confirmació per eliminar */}
            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Eliminar Usuari
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Estàs segur que vols eliminar aquest usuari? Aquesta acció no es pot desfer.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2.5 rounded-lg font-medium"
                            >
                                Cancel·lar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersIndex;
