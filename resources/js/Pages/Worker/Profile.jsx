import React from 'react';
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendarAlt, faEdit, faMapMarkerAlt, faPhone, faLock, faCamera, faShieldAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

const Profile = ({ auth }) => {
    // Colors del tema
    const primaryColor = '#7f1d1d';
    const secondaryColor = '#dc2626';
    const gradient = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;

    // Dades de l'usuari
    const user = auth.user;
    const createdAt = new Date(user.created_at);
    const updatedAt = new Date(user.updated_at);

    // Comprovar si les rutes estan disponibles
    const routes = {
        editProfile: route().has('profile.update') ? route('profile.update') : null,
        updatePassword: route().has('password.update') ? route('password.update') : null,
        updatePhoto: route().has('profile.photo.update') ? route('profile.photo.update') : null,
        twoFactor: {
            enable: route().has('two-factor.enable') ? route('two-factor.enable') : null,
            disable: route().has('two-factor.disable') ? route('two-factor.disable') : null,
        },
        logout: route().has('logout') ? route('logout') : null
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header theme={`bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white`} />

            {/* Capçalera amb gradient */}
            <section className="w-full py-12 px-6" style={{ background: gradient }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">El meu perfil</h1>
                        <p className="text-lg text-white/90">Gestiona la teva informació personal</p>
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
                                <div className="w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center mb-6 overflow-hidden">
                                    {user.profile_photo_path ? (
                                        <img
                                            src={user.profile_photo_path}
                                            alt={`${user.name} avatar`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center" style={{ background: gradient }}>
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                className="text-6xl text-white"
                                            />
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
                                <p className="text-gray-600 mb-6">{user.role || 'Usuari'}</p>

                                <div className="w-full space-y-4">
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="text-gray-500"
                                        />
                                        <div>
                                            <p className="text-sm text-gray-500">Membre des de</p>
                                            <p className="text-gray-700">
                                                {createdAt.toLocaleDateString('ca-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="text-gray-500"
                                        />
                                        <div>
                                            <p className="text-sm text-gray-500">Última actualització</p>
                                            <p className="text-gray-700">
                                                {updatedAt.toLocaleDateString('ca-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secció informació detallada */}
                            <div className="lg:w-2/3 p-8">
                                {/* Secció "Informació personal" */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: secondaryColor }}>
                                        Informació Personal
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                    className="text-xl"
                                                    style={{ color: secondaryColor }}
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Nom complet</p>
                                                    <p className="text-gray-600">{user.name}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                    className="text-xl"
                                                    style={{ color: secondaryColor }}
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Correu electrònic</p>
                                                    <a
                                                        href={`mailto:${user.email}`}
                                                        className="text-gray-600 hover:text-[#dc2626] transition-colors"
                                                    >
                                                        {user.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {user.phone && (
                                            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                                <div className="flex items-center gap-3">
                                                    <FontAwesomeIcon
                                                        icon={faPhone}
                                                        className="text-xl"
                                                        style={{ color: secondaryColor }}
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">Telèfon</p>
                                                        <a
                                                            href={`tel:${user.phone}`}
                                                            className="text-gray-600 hover:text-[#dc2626] transition-colors"
                                                        >
                                                            {user.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {user.address && (
                                            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                                <div className="flex items-center gap-3">
                                                    <FontAwesomeIcon
                                                        icon={faMapMarkerAlt}
                                                        className="text-xl"
                                                        style={{ color: secondaryColor }}
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">Adreça</p>
                                                        <p className="text-gray-600">{user.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Secció "Configuració del compte" */}
                                <div>
                                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: secondaryColor }}>
                                        Configuració del compte
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {routes.updatePassword && (
                                            <Link
                                                href={routes.updatePassword}
                                                className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#dc2626]"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon
                                                        icon={faLock}
                                                        className="text-xl mt-1"
                                                        style={{ color: secondaryColor }}
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">
                                                            Canviar contrasenya
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            Actualitza la teva contrasenya periòdicament per mantenir el compte segur
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}

                                        {routes.updatePhoto && (
                                            <Link
                                                href={routes.updatePhoto}
                                                className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#dc2626]"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon
                                                        icon={faCamera}
                                                        className="text-xl mt-1"
                                                        style={{ color: secondaryColor }}
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">
                                                            Canviar foto de perfil
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            Puja una nova imatge per personalitzar el teu perfil
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}

                                        {user.two_factor_enabled && routes.twoFactor.disable ? (
                                            <Link
                                                href={routes.twoFactor.disable}
                                                className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#dc2626]"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon
                                                        icon={faShieldAlt}
                                                        className="text-xl mt-1"
                                                        style={{ color: secondaryColor }}
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">
                                                            Desactivar autenticació en dos passos
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            Actualment activada - Clica per desactivar
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : routes.twoFactor.enable ? (
                                            <Link
                                                href={routes.twoFactor.enable}
                                                className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#dc2626]"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon
                                                        icon={faShieldAlt}
                                                        className="text-xl mt-1"
                                                        style={{ color: secondaryColor }}
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">
                                                            Activar autenticació en dos passos
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            Afegeix una capa extra de seguretat al teu compte
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : null}

                                        {routes.logout && (
                                            <Link
                                                href={routes.logout}
                                                method="post"
                                                as="button"
                                                className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-red-400"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon
                                                        icon={faSignOutAlt}
                                                        className="text-xl mt-1 text-red-500"
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2 text-red-500">
                                                            Tancar sessió
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            Tanca la sessió actual del teu compte
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
