import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faUser,
    faPhone,
    faMapMarkerAlt,
    faInfoCircle,
    faArrowLeft,
    faBuilding,
    faEuroSign
} from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";

const ServiceDetail = () => {
    const { auth, appointment } = usePage().props;

    if (!appointment) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header theme="bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] text-white" />
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Cita no trobada
                        </h1>
                        <p className="text-gray-600 mb-6">
                            No s'ha pogut trobar la informació de la cita sol·licitada.
                        </p>
                        <Link
                            href="/worker/dashboard"
                            className="bg-[#7f1d1d] hover:bg-[#dc2626] text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Tornar al dashboard
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] text-white" />

            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Detalls de la cita</h1>
                            <p className="text-xl text-white/90">Informació completa del servei assignat</p>
                        </div>
                        <Link
                            href="/worker/dashboard"
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Tornar al dashboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Secció esquerra - Informació bàsica */}
                        <div className="lg:col-span-2 p-8">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="bg-[#7f1d1d] text-white p-3 rounded-lg">
                                    <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {format(parseISO(appointment.date), "EEEE d MMMM yyyy", { locale: es })}
                                    </h2>
                                    <p className="text-lg text-gray-600">
                                        {appointment.time}
                                    </p>
                                    <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                    }`}>
                                        {appointment.status === 'pending' ? 'Pendent' :
                                            appointment.status === 'confirmed' ? 'Confirmada' : 'Cancel·lada'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Servei</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-lg font-bold text-gray-800 mb-1">
                                            {appointment.service.name}
                                        </h4>
                                        <p className="text-gray-600 mb-2">
                                            Tipus: <span className="font-medium">{appointment.service.type}</span>
                                        </p>
                                        {appointment.service.description && (
                                            <p className="text-gray-600">
                                                {appointment.service.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Client</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                                            <p className="text-gray-600">
                                                <span className="font-medium">Nom:</span> {appointment.user.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                                            <p className="text-gray-600">
                                                <span className="font-medium">Telèfon:</span> {appointment.user.phone || 'No disponible'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
                                            <p className="text-gray-600">
                                                <span className="font-medium">Adreça:</span> {appointment.user.address || 'No disponible'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {appointment.notes && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Notes addicionals</h3>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-gray-600 italic">{appointment.notes}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Secció dreta - Informació addicional */}
                        <div className="bg-gray-50 p-8">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Empresa</h3>
                                    <div className="flex items-center gap-4">
                                        {appointment.company.logo ? (
                                            <img
                                                src={`/storage/${appointment.company.logo}`}
                                                alt={appointment.company.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-[#7f1d1d] text-white rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon icon={faBuilding} size="lg" />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800">{appointment.company.name}</h4>
                                            <p className="text-gray-600">{appointment.company.address}</p>
                                            <p className="text-gray-600">{appointment.company.city}, {appointment.company.state}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Detalls econòmics</h3>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Preu del servei:</span>
                                            <span className="font-bold">{Number(appointment.price).toFixed(2)} €</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Accions</h3>
                                    <div className="space-y-3">
                                        <button className="w-full bg-[#7f1d1d] hover:bg-[#dc2626] text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            Marcar com a completada
                                        </button>
                                        <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                                            Contactar client
                                        </button>
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

export default ServiceDetail;
