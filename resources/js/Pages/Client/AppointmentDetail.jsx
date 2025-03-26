import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faClock,
    faBuilding,
    faEuroSign,
    faArrowLeft,
    faInfoCircle,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

const AppointmentDetail = ({ appointment }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />

            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Detall de la cita</h1>
                            <p className="text-xl text-white/90">Informació completa de la teva reserva</p>
                        </div>
                        <button
                            onClick={() => Inertia.visit(route('client.appointments.index'))}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Tornar al llistat
                        </button>
                    </div>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Informació de la cita */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#1f7275] text-white rounded-lg flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {format(parseISO(appointment.date), 'EEEE d MMMM yyyy', { locale: es })}
                                    </h2>
                                    <p className="text-lg text-gray-600">
                                        {appointment.time}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faBuilding} className="text-gray-500" />
                                    <div>
                                        <p className="text-gray-600">Empresa:</p>
                                        <p className="text-lg font-semibold">{appointment.company.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                                    <div>
                                        <p className="text-gray-600">Professional:</p>
                                        <p className="text-lg font-semibold">
                                            {appointment.worker
                                                ? `${appointment.worker.name || 'Professional'} ${appointment.worker.surname || ''}`
                                                : 'Professional per defecte'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faEuroSign} className="text-gray-500" />
                                    <div>
                                        <p className="text-gray-600">Preu:</p>
                                        <p className="text-lg font-semibold">
                                            {typeof appointment.price === 'number'
                                                ? appointment.price.toFixed(2)
                                                : parseFloat(appointment.price || 0).toFixed(2)} €
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500" />
                                    <div>
                                        <p className="text-gray-600">Servei:</p>
                                        <p className="text-lg font-semibold">
                                            {appointment.service.name} ({appointment.service.type})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informació addicional */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Estat de la reserva</h3>
                                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                }`}>
                                    {appointment.status === 'pending' ? 'Pendent' :
                                        appointment.status === 'confirmed' ? 'Confirmada' : 'Cancel·lada'}
                                </div>
                            </div>

                            {appointment.notes && (
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Notes</h3>
                                    <p className="text-gray-600 italic">{appointment.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AppointmentDetail;
