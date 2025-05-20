import React, { useState, useEffect } from 'react';
import { Link, router } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendarAlt, faEdit, faMapMarkerAlt, faPhone, faLock, faCamera, faShieldAlt, faSignOutAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

const Profile = ({ auth }) => {
    // Colors del tema
    const primaryColor = '#7f1d1d';
    const secondaryColor = '#dc2626';
    const gradient = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;

    // Estats per a edició
    const [editingName, setEditingName] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);
    const [editingPhone, setEditingPhone] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(false); // Nuevo estado para schedule
    const [name, setName] = useState(auth.user.name);
    const [email, setEmail] = useState(auth.user.email);
    const [address, setAddress] = useState(auth.user.address || '');
    const [phone, setPhone] = useState(auth.user.phone || '');
    const [schedule, setSchedule] = useState(auth.user.schedule || ''); // Nuevo estado para schedule
    const [formErrors, setFormErrors] = useState({});

    // Validación del formato de horario
    const validateScheduleFormat = (value) => {
        const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(value);
    };

    // Sincronitzar dades amb props
    useEffect(() => {
        setName(auth.user.name);
        setEmail(auth.user.email);
        setAddress(auth.user.address || '');
        setPhone(auth.user.phone || '');
        setSchedule(auth.user.schedule || ''); // Sincronizar schedule
    }, [auth.user]);

    // Funció per guardar canvis
    const handleSubmit = (e, field) => {
        e.preventDefault();

        // Validar el formato de schedule antes de enviar
        if (field === 'schedule' && !validateScheduleFormat(schedule)) {
            setFormErrors({ schedule: 'El format de l\'horari ha de ser HH:mm-HH:mm (ex. 08:00-16:00)' });
            return;
        }

        const data = { name, email, address, phone, schedule }; // Incluir schedule
        router.patch(route('profile.update'), data, {
            onSuccess: () => {
                if (field === 'name') setEditingName(false);
                if (field === 'email') setEditingEmail(false);
                if (field === 'address') setEditingAddress(false);
                if (field === 'phone') setEditingPhone(false);
                if (field === 'schedule') setEditingSchedule(false); // Cerrar edición de schedule
                setFormErrors({});
            },
            onError: (errors) => {
                console.error('Errors:', errors);
                setFormErrors(errors);
            },
            preserveScroll: true
        });
    };

    // Dades de l'usuari
    const user = auth.user;
    const createdAt = new Date(user.created_at);
    const updatedAt = new Date(user.updated_at);

    // Comprovar si les rutes estan disponibles
    const routes = {
        editProfile: route().has('profile.update') ? route('profile.update') : null,
        updatePassword: route().has('password.request') ? route('password.request') : '/forgot-password',
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
                                            <FontAwesomeIcon icon={faUser} className="text-6xl text-white" />
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
                                <p className="text-gray-600 mb-6">{user.role || 'Treballador'}</p>

                                <div className="w-full space-y-4">
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Membre des de</p>
                                            <p className="text-gray-700">
                                                {createdAt.toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Última actualització</p>
                                            <p className="text-gray-700">
                                                {updatedAt.toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                                                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                                                                autoFocus
                                                            />
                                                            {formErrors.name && (
                                                                <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
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
                                                        className="text-[#dc2626] hover:text-[#b91c1c] transition-colors"
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
                                                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                                                                autoFocus
                                                            />
                                                            {formErrors.email && (
                                                                <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
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
                                                        <a href={`mailto:${email}`} className="text-gray-600 hover:text-[#dc2626] transition-colors">
                                                            {email}
                                                        </a>
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingEmail(true)}
                                                        className="text-[#dc2626] hover:text-[#b91c1c] transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Camp Adreça */}
                                        {user.address && (
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
                                                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                                                                    autoFocus
                                                                />
                                                                {formErrors.address && (
                                                                    <p className="text-red-600 text-sm mt-1">{formErrors.address}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row gap-2">
                                                            <button
                                                                type="submit"
                                                                className="px-4 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
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
                                                            <p className="text-gray-600">{address}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => setEditingAddress(true)}
                                                            className="text-[#dc2626] hover:text-[#b91c1c] transition-colors"
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Camp Telèfon */}
                                        <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            {editingPhone ? (
                                                <form onSubmit={(e) => handleSubmit(e, 'phone')} className="flex flex-col gap-3 w-full">
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faPhone} className="text-xl" style={{ color: secondaryColor }} />
                                                        <div className="flex-grow">
                                                            <label className="font-semibold text-gray-800 block">Telèfon</label>
                                                            <input
                                                                type="tel"
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                                                                autoFocus
                                                            />
                                                            {formErrors.phone && (
                                                                <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingPhone(false);
                                                                setPhone(user.phone || '');
                                                            }}
                                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel·lar
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="flex items-center gap-3 w-full">
                                                    <FontAwesomeIcon icon={faPhone} className="text-xl" style={{ color: secondaryColor }} />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold text-gray-800">Telèfon</p>
                                                        <a href={`tel:${phone}`} className="text-gray-600 hover:text-[#dc2626] transition-colors">
                                                            {phone || 'No especificat'}
                                                        </a>
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingPhone(true)}
                                                        className="text-[#dc2626] hover:text-[#b91c1c] transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Camp Horari */}
                                        <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            {editingSchedule ? (
                                                <form onSubmit={(e) => handleSubmit(e, 'schedule')} className="flex flex-col gap-3 w-full">
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faClock} className="text-xl" style={{ color: secondaryColor }} />
                                                        <div className="flex-grow">
                                                            <label className="font-semibold text-gray-800 block">Horari</label>
                                                            <input
                                                                type="text"
                                                                value={schedule}
                                                                onChange={(e) => setSchedule(e.target.value)}
                                                                placeholder="HH:mm-HH:mm (ex. 08:00-16:00)"
                                                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
                                                                autoFocus
                                                            />
                                                            {formErrors.schedule && (
                                                                <p className="text-red-600 text-sm mt-1">{formErrors.schedule}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <button
                                                            type="submit"
                                                            className="px-4 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingSchedule(false);
                                                                setSchedule(user.schedule || '');
                                                            }}
                                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel·lar
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="flex items-center gap-3 w-full">
                                                    <FontAwesomeIcon icon={faClock} className="text-xl" style={{ color: secondaryColor }} />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold text-gray-800">Horari</p>
                                                        <p className="text-gray-600">{schedule || 'No especificat'}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingSchedule(true)}
                                                        className="text-[#dc2626] hover:text-[#b91c1c] transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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
                                                    <FontAwesomeIcon icon={faLock} className="text-xl mt-1" style={{ color: secondaryColor }} />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">Canviar contrasenya</h3>
                                                        <p className="text-gray-600 text-sm">Actualitza la teva contrasenya periòdicament per mantenir el compte segur</p>
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
                                                    <FontAwesomeIcon icon={faCamera} className="text-xl mt-1" style={{ color: secondaryColor }} />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">Canviar foto de perfil</h3>
                                                        <p className="text-gray-600 text-sm">Puja una nova imatge per personalitzar el teu perfil</p>
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
                                                    <FontAwesomeIcon icon={faShieldAlt} className="text-xl mt-1" style={{ color: secondaryColor }} />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2">Desactivar autenticació en dos passos</h3>
                                                        <p className="text-gray-600 text-sm">Actualment activada - Clica per desactivar</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : routes.twoFactor.enable ? (
                                            <Link
                                                href={routes.twoFactor.enable}
                                                className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#dc2626]"
                                            >
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
                                            <Link
                                                href={routes.logout}
                                                method="post"
                                                as="button"
                                                className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-red-400"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <FontAwesomeIcon icon={faSignOutAlt} className="text-xl mt-1 text-red-500" />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 mb-2 text-red-500">Tancar sessió</h3>
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
