import React from 'react';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faClock,
    faBuilding,
    faEuroSign,
    faArrowLeft,
    faInfoCircle,
    faUser,
    faStar,
    faStarHalfAlt,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';
import { ca } from 'date-fns/locale';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import {route} from "ziggy-js";

const AppointmentDetail = ({ appointment }) => {
    // Funció per renderitzar estrelles amb mitges estrelles
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-1" aria-label={`Valoració: ${rating.toFixed(1)} de 5`}>
                {[...Array(fullStars)].map((_, i) => (
                    <FontAwesomeIcon
                        key={`full-${i}`}
                        icon={faStar}
                        className="text-yellow-400"
                        aria-label="Estrella plena"
                    />
                ))}
                {hasHalfStar && (
                    <FontAwesomeIcon
                        icon={faStarHalfAlt}
                        className="text-yellow-400"
                        aria-label="Mitja estrella"
                    />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <FontAwesomeIcon
                        key={`empty-${i}`}
                        icon={faStar}
                        className="text-gray-300"
                        aria-label="Estrella buida"
                    />
                ))}
            </div>
        );
    };

    const handleDeleteReview = (reviewId) => {
        if (!confirm('Segur que vols eliminar la ressenya?')) return;
        router.delete(route('client.reviews.destroy', reviewId), {
            onSuccess: () => {
                router.visit(route('client.appointments.index', { filter: 'pending_review' }));
            }
        })
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />

            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Detall de la cita</h1>
                            <p className="text-xl text-white/90">Informació completa de la teva reserva</p>
                        </div>
                        <button
                            onClick={() => router.visit(route('client.appointments.index'))}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Tornar al llistat
                        </button>
                    </div>
                </div>
            </section>

            <div className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#1f7275] text-white rounded-lg flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {format(parseISO(appointment.date), 'EEEE d MMMM yyyy', { locale: ca })}
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

                                <div className="flex items-start gap-3">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-500 mt-1" />
                                    <div>
                                        <p className="text-gray-600">Professionals assignats:</p>
                                        {appointment.workers && appointment.workers.length > 0 ? (
                                            <ul className="space-y-1 text-lg font-semibold text-gray-800">
                                                {appointment.workers.map(worker => (
                                                    <li key={worker.id}>{worker.name}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 italic">Cap treballador assignat</p>
                                        )}
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

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Estat de la reserva</h3>
                                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                }`}>
                                    {appointment.status === 'pending' ? 'Pendent' :
                                        appointment.status === 'confirmed' ? 'Confirmada' :
                                            appointment.status === 'completed' ? 'Completada' :
                                                'Cancel·lada'}
                                </div>

                                {/* Botón para cancelar cita (solo si no está ya cancelada) */}
                                {(appointment.status !== 'cancelled' && appointment.status !== 'completed') && (
                                    <button
                                        className="mt-4 w-full bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        onClick={() => {
                                            if (window.confirm('Estàs segur que vols cancel·lar aquesta cita?')) {
                                                router.patch(route('client.appointments.cancel', appointment.id));
                                            }
                                        }}
                                    >
                                        Cancel·lar cita
                                    </button>
                                )}
                            </div>

                            {appointment.status === 'completed' && appointment.company_service_id ? (
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Ressenya</h3>
                                    {appointment.review ? (
                                        <>
                                            <div className="mb-4">
                                                <p className="text-gray-600 font-semibold">La teva valoració:</p>
                                                <div className="flex items-center gap-2">
                                                    {renderStars(appointment.review.rate)}
                                                    <span className="text-gray-800">{appointment.review.rate.toFixed(1)} / 5</span>
                                                </div>
                                                <p className="text-gray-600 mt-2">{appointment.review.comment}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('client.reviews.create', {
                                                        companyServiceId: appointment.company_service_id,
                                                        appointmentId: appointment.id
                                                    })}
                                                    className="bg-[#1f7275] text-white px-4 py-2 rounded-lg hover:bg-[#01a0a6] transition-colors inline-flex items-center gap-2"
                                                >
                                                    <FontAwesomeIcon icon={faStar} />
                                                    Editar ressenya
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteReview(appointment.review.id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors inline-flex items-center gap-2"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    Eliminar
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={route('client.reviews.create', {
                                                companyServiceId: appointment.company_service_id,
                                                appointmentId: appointment.id
                                            })}
                                            className="bg-[#1f7275] text-white px-4 py-2 rounded-lg hover:bg-[#01a0a6] transition-colors inline-flex items-center gap-2"
                                        >
                                            <FontAwesomeIcon icon={faStar} />
                                            Afegir ressenya
                                        </Link>
                                    )}
                                </div>
                            ) : appointment.status === 'completed' ? (
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Ressenya</h3>
                                    <p className="text-red-600">No es pot afegir una ressenya perquè falta informació del servei.</p>
                                </div>
                            ) : null}

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
