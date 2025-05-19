import React, { useState, useEffect } from 'react';
import { Link, router } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendarAlt, faEdit, faMapMarkerAlt, faPhone, faLock, faCamera, faShieldAlt, faSignOutAlt, faCity } from '@fortawesome/free-solid-svg-icons';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

const Profile = ({ auth }) => {
    const primaryColor = '#1f7275';
    const secondaryColor = '#01a0a6';
    const gradient = `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;

    // Estats per a edició
    const [editingName, setEditingName] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingCity, setEditingCity] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);
    const [name, setName] = useState(auth.user.name);
    const [email, setEmail] = useState(auth.user.email);
    const [city, setCity] = useState(auth.user.city || '');
    const [address, setAddress] = useState(auth.user.address || '');

    // Sincronitzar dades amb props
    useEffect(() => {
        setName(auth.user.name);
        setEmail(auth.user.email);
        setCity(auth.user.city || '');
        setAddress(auth.user.address || '');
    }, [auth.user]);

    // Funcions per guardar canvis
    const handleSubmit = (e, field) => {
        e.preventDefault();
        const data = { name, email, city, address };
        router.patch(route('profile.update'), data, {
            onSuccess: () => {
                if (field === 'name') setEditingName(false);
                if (field === 'email') setEditingEmail(false);
                if (field === 'city') setEditingCity(false);
                if (field === 'address') setEditingAddress(false);
            },
            preserveScroll: true,
            onError: (errors) => {
                console.error('Errors:', errors);
            }
        });
    };

    const user = auth.user;
    const createdAt = new Date(user.created_at);
    const updatedAt = new Date(user.updated_at);

    const routes = {
        editProfile: route().has('profile.update') ? route('profile.update') : null,
        updatePassword: route().has('password.request') ? route('password.request') : '/forgot-password',
        updatePhoto: route().has('profile.photo.update') ? route('profile.photo.update') : null,
        twoFactor: {
            enable: route().has('two-factor.enable') ? route('two-factor.enable') : null,
            disable: route().has('two-factor.disable') ? route('two-factor.disable') : null,
        },
        logout: route().has('logout') ? route('logout') : null,
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header theme={`bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white`} />

            <section className="w-full py-12 px-6" style={{ background: gradient }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">El meu perfil</h1>
                        <p className="text-lg text-white/90">Gestiona la teva informació personal</p>
                    </div>
                </div>
            </section>

            <div className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
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
                                            <FontAwesomeIcon icon={faUser} className="text-6xl text-white" />
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
                                <p className="text-gray-600 mb-6">{user.role || 'Usuari'}</p>

                                <div className="w-full space-y-4">
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Membre des de</p>
                                            <p className="text-gray-700">
                                                {createdAt.toLocaleDateString('ca-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Última actualització</p>
                                            <p className="text-gray-700">
                                                {updatedAt.toLocaleDateString('ca-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-2/3 p-8">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: secondaryColor }}>
                                        Informació Personal
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Camp Nom */}
                                        <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            {editingName ? (
                                                <form onSubmit={(e) => handleSubmit(e, 'name')} className="flex flex-col gap-3 w-full">
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faUser} className="text-xl" style={{ color: secondaryColor }} />
                                                        <div className="flex-grow">
                                                            <label className="font-semibold text-gray-800 block">Nom complet</label>
                                                            <input
                                                                type="text"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01a0a6]"
                                                                autoFocus
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-[#01a0a6] text-white rounded-lg hover:bg-[#01878c] transition-colors"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingName(false);
                                                                setName(user.name);
                                                            }}
                                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel·lar
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="flex items-center gap-3 w-full">
                                                    <FontAwesomeIcon icon={faUser} className="text-xl" style={{ color: secondaryColor }} />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold text-gray-800">Nom complet</p>
                                                        <p className="text-gray-600">{name}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingName(true)}
                                                        className="text-[#01a0a6] hover:text-[#01878c] transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Camp Correu */}
                                        <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            {editingEmail ? (
                                                <form onSubmit={(e) => handleSubmit(e, 'email')} className="flex flex-col gap-3 w-full">
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faEnvelope} className="text-xl" style={{ color: secondaryColor }} />
                                                        <div className="flex-grow">
                                                            <label className="font-semibold text-gray-800 block">Correu electrònic</label>
                                                            <input
                                                                type="email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01a0a6]"
                                                                autoFocus
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-[#01a0a6] text-white rounded-lg hover:bg-[#01878c] transition-colors"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingEmail(false);
                                                                setEmail(user.email);
                                                            }}
                                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel·lar
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="flex items-center gap-3 w-full">
                                                    <FontAwesomeIcon icon={faEnvelope} className="text-xl" style={{ color: secondaryColor }} />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold text-gray-800">Correu electrònic</p>
                                                        <a href={`mailto:${email}`} className="text-gray-600 hover:text-[#01a0a6] transition-colors">
                                                            {email}
                                                        </a>
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingEmail(true)}
                                                        className="text-[#01a0a6] hover:text-[#01878c] transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Camp Ciutat */}
                                        <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            {editingCity ? (
                                                <form onSubmit={(e) => handleSubmit(e, 'city')} className="flex flex-col gap-3 w-full">
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faCity} className="text-xl" style={{ color: secondaryColor }} />
                                                        <div className="flex-grow">
                                                            <label className="font-semibold text-gray-800 block">Ciutat</label>
                                                            <input
                                                                type="text"
                                                                value={city}
                                                                onChange={(e) => setCity(e.target.value)}
                                                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01a0a6]"
                                                                autoFocus
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-[#01a0a6] text-white rounded-lg hover:bg-[#01878c] transition-colors"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingCity(false);
                                                                setCity(user.city || '');
                                                            }}
                                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel·lar
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="flex items-center gap-3 w-full">
                                                    <FontAwesomeIcon icon={faCity} className="text-xl" style={{ color: secondaryColor }} />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold text-gray-800">Ciutat</p>
                                                        <p className="text-gray-600">{city || 'No especificat'}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingCity(true)}
                                                        className="text-[#01a0a6] hover:text-[#01878c] transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Camp Adreça */}
                                        <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            {editingAddress ? (
                                                <form onSubmit={(e) => handleSubmit(e, 'address')} className="flex flex-col gap-3 w-full">
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl" style={{ color: secondaryColor }} />
                                                        <div className="flex-grow">
                                                            <label className="font-semibold text-gray-800 block">Adreça</label>
                                                            <input
                                                                type="text"
                                                                value={address}
                                                                onChange={(e) => setAddress(e.target.value)}
                                                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01a0a6]"
                                                                autoFocus
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-[#01a0a6] text-white rounded-lg hover:bg-[#01878c] transition-colors"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingAddress(false);
                                                                setAddress(user.address || '');
                                                            }}
                                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel·lar
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="flex items-center gap-3 w-full">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl" style={{ color: secondaryColor }} />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold text-gray-800">Adreça</p>
                                                        <p className="text-gray-600">{address || 'No especificat'}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingAddress(true)}
                                                        className="text-[#01a0a6] hover:text-[#01878c] transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {user.phone && (
                                            <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                                <div className="flex items-center gap-3">
                                                    <FontAwesomeIcon icon={faPhone} className="text-xl" style={{ color: secondaryColor }} />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">Telèfon</p>
                                                        <a href={`tel:${user.phone}`} className="text-gray-600 hover:text-[#01a0a6] transition-colors">
                                                            {user.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b" style={{ borderColor: secondaryColor }}>
                                        Configuració del compte
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {routes.updatePassword && (
                                            <Link href={routes.updatePassword} className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#01a0a6]">
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon icon={faLock} className="text-xl mt-1" style={{ color: secondaryColor }} />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">Canviar contrasenya</h3>
                                                        <p className="text-gray-600 text-sm">Actualitza la teva contrasenya periòdicament per mantenir el compte segur</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}

                                        {routes.updatePhoto && (
                                            <Link href={routes.updatePhoto} className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#01a0a6]">
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon icon={faCamera} className="text-xl mt-1" style={{ color: secondaryColor }} />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">Canviar foto de perfil</h3>
                                                        <p className="text-gray-600 text-sm">Puja una nova imatge per personalitzar el teu perfil</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}

                                        {user.two_factor_enabled && routes.twoFactor.disable ? (
                                            <Link href={routes.twoFactor.disable} className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#01a0a6]">
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon icon={faShieldAlt} className="text-xl mt-1" style={{ color: secondaryColor }} />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">Desactivar autenticació en dos passos</h3>
                                                        <p className="text-gray-600 text-sm">Actualment activada - Clica per desactivar</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : routes.twoFactor.enable ? (
                                            <Link href={routes.twoFactor.enable} className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#01a0a6]">
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon icon={faShieldAlt} className="text-xl mt-1" style={{ color: secondaryColor }} />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">Activar autenticació en dos passos</h3>
                                                        <p className="text-gray-600 text-sm">Afegeix una capa extra de seguretat al teu compte</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : null}

                                        {routes.logout && (
                                            <Link href={routes.logout} method="post" as="button" className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-red-400">
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon icon={faSignOutAlt} className="text-xl mt-1 text-red-500" />
                                                    <div>
                                                        <h3 className="font-semibold text-red-500 mb-2">Tancar sessió</h3>
                                                        <p className="text-gray-600 text-sm">Tanca la sessió actual del teu compte</p>
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
