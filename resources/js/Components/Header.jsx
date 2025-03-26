import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faSignOutAlt,
    faCalendarAlt,
    faHome,
    faCar,
    faWrench,
    faSwimmingPool,
    faChevronDown,
    faChevronUp,
    faBroom,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

const Header = ({ theme = 'bg-black text-white' }) => {
    const { auth } = usePage().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    // Tipos de servicios basados en tu dashboard
    const serviceTypes = [
        { name: 'Casa', value: 'casa', icon: faHome },
        { name: 'Cotxe', value: 'cotxe', icon: faCar },
        { name: 'Garatge', value: 'garatge', icon: faWrench },
        { name: 'Piscina', value: 'piscina', icon: faSwimmingPool },
        { name: 'Altres', value: 'altres', icon: faBroom }
    ];

    // Verificar si el usuario es un cliente (usa guard 'web' y no es admin)
    const isClient = auth.user &&
        auth.user.guard === 'web' &&
        !auth.user.is_admin &&
        !auth.user.is_company;

    return (
        <header className={`${theme} w-full py-4 px-6 shadow-lg`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo a l'esquerra */}
                <Link href="/" className="text-2xl font-bold">
                    SLAVA Inc.
                </Link>

                {/* Barra de navegació central (només per a clients) */}
                {isClient && (
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href={route('dashboard')}
                            className="hover:text-white/80 transition-colors"
                        >
                            Inici
                        </Link>

                        {/* Menú desplegable de Serveis */}
                        <div className="relative">
                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                onMouseEnter={() => setIsServicesOpen(true)}
                                className="flex items-center gap-1 hover:text-white/80 transition-colors"
                            >
                                Serveis
                                <FontAwesomeIcon
                                    icon={isServicesOpen ? faChevronUp : faChevronDown}
                                    className="text-xs ml-1"
                                />
                            </button>

                            {isServicesOpen && (
                                <div
                                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 text-gray-800"
                                    onMouseLeave={() => setIsServicesOpen(false)}
                                >
                                    {serviceTypes.map((service) => (
                                        <Link
                                            key={service.value}
                                            href={route('client.services.show', service.value)}
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                        >
                                            <FontAwesomeIcon icon={service.icon} />
                                            <span>Neteja de {service.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href={route('client.appointments.index')}
                            className="flex items-center gap-1 hover:text-white/80 transition-colors"
                        >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span>Les meves cites</span>
                        </Link>
                    </nav>
                )}

                {/* Dropdown d'usuari a la dreta (visible para todos) */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition-colors"
                    >
                        <div className="bg-white/20 p-2 rounded-full">
                            <FontAwesomeIcon icon={faUser} className="text-lg" />
                        </div>
                        <span className="hidden sm:inline">{auth.user?.name}</span>
                    </button>

                    {isProfileOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 text-gray-800"
                            onMouseLeave={() => setIsProfileOpen(false)}
                        >
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={faUser} />
                                <span>Perfil</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span>Tancar sessió</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Menú mòbil (només per a clients) */}
            {isClient && (
                <div className="md:hidden mt-4">
                    <div className="flex flex-col gap-2">
                        <Link
                            href={route('dashboard')}
                            className="hover:bg-white/10 p-2 rounded transition-colors"
                        >
                            Inici
                        </Link>

                        <button
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                            className="flex items-center justify-between hover:bg-white/10 p-2 rounded transition-colors"
                        >
                            <span>Serveis</span>
                            <FontAwesomeIcon
                                icon={isServicesOpen ? faChevronUp : faChevronDown}
                                className="text-xs"
                            />
                        </button>

                        {isServicesOpen && (
                            <div className="ml-4 space-y-1">
                                {serviceTypes.map((service) => (
                                    <Link
                                        key={service.value}
                                        href={route('client.services.show', service.value)}
                                        className="block hover:bg-white/10 p-2 rounded transition-colors flex items-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={service.icon} className="text-sm" />
                                        <span>Neteja de {service.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}

                        <Link
                            href={route('client.appointments.index')}
                            className="flex items-center gap-2 hover:bg-white/10 p-2 rounded transition-colors"
                        >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span>Les meves cites</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
