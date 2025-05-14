import React from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faBuilding, faEuroSign, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

const CitesIndex = ({ appointments }) => {
    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800'
    };

    // Función para formatear el precio de manera segura
    const formatPrice = (price) => {
        // Convertir a número si no lo es
        const numericPrice = typeof price === 'number' ? price : parseFloat(price);
        // Verificar que sea un número válido
        return isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);
    };

    return (
        <div className="min-h-screen bg-gray-50 min-h-screen flex flex-col">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />

            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
                        Mis Citas
                    </h1>
                    <Link
                        href={route('dashboard')}
                        className="bg-white/90 text-[#1f7275] px-6 py-2 rounded-full shadow-md hover:bg-white transition-all flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Nueva Reserva
                    </Link>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-6 py-8 flex-grow">
                <div className="grid grid-cols-1 gap-6">
                    {appointments.length === 0 ? (
                        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-6xl text-gray-300 mb-4">📅</div>
                            <p className="text-gray-600 text-lg">
                                No tienes citas programadas actualmente
                            </p>
                        </div>
                    ) : (
                        appointments.map((appointment) => (
                            <Link
                                href={route('client.appointments.show', appointment.id)}
                                key={appointment.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow block"
                            >
                                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                                    {/* Información principal */}
                                    <div className="space-y-3 flex-1">
                                        <div className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faBuilding} className="text-[#1f7275]" />
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                {appointment.company.name}
                                            </h2>
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                                <span className="text-gray-700">
                                                    {format(parseISO(appointment.date), 'EEEE d MMMM yyyy', { locale: es })}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                                <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                                                <span className="text-gray-700">{appointment.time}</span>
                                            </div>
                                        </div>

                                        {appointment.notes && (
                                            <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                                                <p className="text-gray-600 italic">
                                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                                                    {appointment.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Detalles laterales */}
                                    <div className="mt-4 md:mt-0 md:text-right space-y-3">
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[appointment.status]} inline-block`}>
                                            {appointment.status === 'pending' && 'Pendiente'}
                                            {appointment.status === 'confirmed' && 'Confirmada'}
                                            {appointment.status === 'cancelled' && 'Cancelada'}
                                            {appointment.status === 'completed' && 'Completada'}
                                        </div>

                                        <div className="text-2xl font-bold text-[#1f7275]">
                                            {formatPrice(appointment.price)} €
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {appointment.service.name}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default CitesIndex;
