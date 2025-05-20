import React, { useState, useEffect, useRef } from 'react';
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
    faBars,
    faStar,
    faFileInvoice
} from '@fortawesome/free-solid-svg-icons';

const Header = ({ theme = 'bg-black text-white' }) => {
    const { auth } = usePage().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const profileRef = useRef(null);
    const servicesRef = useRef(null);

    const isClient = auth.guard === 'web' && auth.user;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const serviceTypes = [
        { name: 'Casa', value: 'casa', icon: faHome },
        { name: 'Cotxe', value: 'cotxe', icon: faCar },
        { name: 'Garatge', value: 'garatge', icon: faWrench },
        { name: 'Piscina', value: 'piscina', icon: faSwimmingPool },
        { name: 'Altres', value: 'altres', icon: faBroom }
    ];

    // Handle F12 key press and resize events
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'F12') {
                setIsProfileOpen(false);
                setIsServicesOpen(false);
                setIsMobileMenuOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
                setIsProfileOpen(false);
                setIsServicesOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Handle click outside for dropdowns
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsProfileOpen(false);
            }
            if (servicesRef.current && !servicesRef.current.contains(e.target)) {
                setIsServicesOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={`${theme} w-full py-4 px-6 shadow-md`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    SLAVA Inc.
                </Link>

                {/* Navegació escriptori */}
                {isClient && (
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href={route('dashboard')} className="hover:text-white/80 transition">Inici</Link>

                        <div className="relative" ref={servicesRef}>
                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                onMouseEnter={() => setIsServicesOpen(true)}
                                className="flex items-center gap-1 hover:text-white/80 transition"
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

                        <Link href={route('client.appointments.index')} className="hover:text-white/80 transition flex items-center gap-1">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span>Les meves cites</span>
                        </Link>

                        <Link
                            href={route('client.appointments.index', { filter: 'pending_review' })}
                            className="hover:text-white/80 transition flex items-center gap-1"
                        >
                            <FontAwesomeIcon icon={faStar} />
                            <span>Reviews pendents</span>
                        </Link>

                        <Link
                            href={route('quotes.index')}
                            className="hover:text-white/80 transition flex items-center gap-1"
                        >
                            <FontAwesomeIcon icon={faFileInvoice} />
                            <span>Pressupostos</span>
                        </Link>
                    </nav>
                )}

                {/* Botó hamburguesa mòbil */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-white">
                        <FontAwesomeIcon icon={faBars} className="text-xl" />
                    </button>
                </div>

                {/* Perfil escriptori */}
                <div className="relative hidden md:block" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition"
                    >
                        <div className="bg-white/20 p-2 rounded-full">
                            <FontAwesomeIcon icon={faUser} className="text-lg" />
                        </div>
                        <span className="hidden sm:inline">{auth.user?.name}</span>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 text-gray-800">
                            <Link href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
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

            {/* PANEL LLISCANT MÒBIL */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Panell blanc */}
                    <div className="w-72 bg-white text-gray-900 h-full p-6 shadow-xl relative z-50">
                        {/* Botó tancar */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        <div className="mt-10 space-y-4">
                            {isClient && (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="block px-2 py-2 rounded hover:bg-gray-100"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Inici
                                    </Link>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 mb-2">Serveis</p>
                                        {serviceTypes.map((service) => (
                                            <Link
                                                key={service.value}
                                                href={route('client.services.show', service.value)}
                                                className="block px-2 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <FontAwesomeIcon icon={service.icon} className="text-sm" />
                                                <span>Neteja de {service.name}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <Link
                                        href={route('client.appointments.index')}
                                        className="block px-2 py-2 rounded hover:bg-gray-100"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Les meves cites
                                    </Link>

                                    <Link
                                        href={route('client.appointments.index', { filter: 'pending_review' })}
                                        className="block px-2 py-2 rounded hover:bg-gray-100"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Reviews pendents
                                    </Link>

                                    <Link
                                        href={route('quotes.index')}
                                        className="block px-2 py-2 rounded hover:bg-gray-100"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Pressupostos
                                    </Link>
                                </>
                            )}

                            {/* Perfil i logout */}
                            <div className="border-t pt-4 mt-4 space-y-2">
                                <Link
                                    href={route('profile')}
                                    className="block px-2 py-2 rounded hover:bg-gray-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Perfil
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMobileMenuOpen(false);
                                        router.post(route('logout'));
                                    }}
                                    className="block w-full text-left px-2 py-2 rounded hover:bg-gray-100 text-red-600"
                                >
                                    Tancar sessió
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Capa fosca per fora */}
                    <div className="flex-1 bg-black bg-opacity-40" onClick={() => setIsMobileMenuOpen(false)} />
                </div>
            )}
        </header>
    );
};

export default Header;
