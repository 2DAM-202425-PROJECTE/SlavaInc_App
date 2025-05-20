import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt, faUser, faPhone, faMapMarkerAlt,
    faInfoCircle, faArrowLeft, faBuilding, faEuroSign, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";

const ServiceDetail = () => {
    const { appointment } = usePage().props;
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleCancel = () => {
        router.patch(route('worker.appointments.cancel', appointment.id));
        setShowCancelModal(false);
    };

    if (!appointment) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] text-white" />

            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] py-12 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
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
            </section>

            {/* Contingut principal */}
            <div className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                    {/* Secció esquerra - Informació bàsica */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-[#7f1d1d] text-white p-3 rounded-lg">
                                <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {format(parseISO(appointment.date), "EEEE d MMMM yyyy", { locale: es })}
                                </h2>
                                <p className="text-lg text-gray-600">{appointment.time}</p>
                                <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                }`}>
                                    {appointment.status === 'pending' && 'Pendent'}
                                    {appointment.status === 'confirmed' && 'Confirmada'}
                                    {appointment.status === 'completed' && 'Completada'}
                                    {appointment.status === 'cancelled' && 'Cancel·lada'}
                                </div>
                            </div>
                        </div>

                        {/* Servei */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Servei</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-bold text-gray-800 mb-1">{appointment.service.name}</h4>
                                <p className="text-gray-600 mb-2">Tipus: <span className="font-medium">{appointment.service.type}</span></p>
                                {appointment.service.description && <p className="text-gray-600">{appointment.service.description}</p>}
                            </div>
                        </div>

                        {/* Client */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Client</h3>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <p className="flex items-center gap-3 text-gray-600">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                                    <span className="font-medium">Nom:</span> {appointment.user.name}
                                </p>
                                <p className="flex items-center gap-3 text-gray-600">
                                    <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                                    <span className="font-medium">Telèfon:</span> {appointment.user.phone || 'No disponible'}
                                </p>
                                <p className="flex items-center gap-3 text-gray-600">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
                                    <span className="font-medium">Adreça:</span> {appointment.user.address || 'No disponible'}
                                </p>
                            </div>
                        </div>


                        {/* Notes */}
                        {appointment.notes && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Notes addicionals</h3>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-gray-600 italic">{appointment.notes}</p>
                                </div>
                            </div>
                        )}

                        {appointment.reviews && appointment.reviews.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Ressenya del client</h3>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg space-y-2">
                                    <p className="text-yellow-800 font-semibold">
                                        Valoració: {appointment.reviews[0].rate.toFixed(1)} / 5
                                    </p>
                                    <p className="text-gray-700 italic">
                                        "{appointment.reviews[0].comment}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Secció dreta */}
                    <div className="space-y-6">
                        {/* Empresa */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Empresa</h3>
                            <div className="flex items-center gap-4">
                                {appointment.company.logo ? (
                                    <img src={`/storage/${appointment.company.logo}`} alt={appointment.company.name}
                                         className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" />
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

                        {/* Preu */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Detalls econòmics</h3>
                            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
                                <span className="text-gray-600">Preu del servei:</span>
                                <span className="font-bold">{Number(appointment.price).toFixed(2)} €</span>
                            </div>
                        </div>

                        {/* Accions */}
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Accions</h3>
                            <div className="space-y-3">
                                {appointment.status === 'pending' && (
                                    <>
                                        <button
                                            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                                            onClick={() => router.patch(route('worker.appointments.confirm', appointment.id))}
                                        >
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            Confirmar cita
                                        </button>
                                        <button
                                            className="w-full bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                                            onClick={() => setShowCancelModal(true)}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                            Cancel·lar cita
                                        </button>
                                    </>
                                )}
                                {appointment.status === 'confirmed' && (
                                    <>
                                        <button
                                            className="w-full bg-[#7f1d1d] hover:bg-[#dc2626] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                                            onClick={() => router.patch(route('worker.appointments.complete', appointment.id))}
                                        >
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            Marcar com a completada
                                        </button>
                                        <button
                                            className="w-full bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                                            onClick={() => setShowCancelModal(true)}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                            Cancel·lar cita
                                        </button>
                                    </>
                                )}
                                {(appointment.status === 'completed' || appointment.status === 'cancelled') && (
                                    <p className="text-gray-600 italic">No hi ha accions disponibles per aquesta cita.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Modal confirmació cancel·lació */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmar cancel·lació</h2>
                        <p className="text-gray-600 mb-6">Estàs segur que vols cancel·lar aquesta cita?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Tornar
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Cancel·la cita
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetail;
