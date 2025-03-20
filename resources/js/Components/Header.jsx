import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = ({ theme = 'bg-black text-white' }) => {
    const { auth } = usePage().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <header className={`${theme} w-full py-4 px-6 shadow-lg`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo a l'esquerra */}
                <Link href="/" className="text-2xl font-bold">
                    SLAVA Inc.
                </Link>

                {/* Dropdown d'usuari a la dreta */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition-colors"
                    >
                        <div className="bg-white/20 p-2 rounded-full">
                            <FontAwesomeIcon icon={faUser} className="text-lg" />
                        </div>
                        <span className="hidden sm:inline">{auth.user.name}</span>
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
        </header>
    );
};

export default Header;
