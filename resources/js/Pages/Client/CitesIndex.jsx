import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faBuilding, faEuroSign, faInfoCircle, faPlus, faStar, faFilter } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';
import { ca } from 'date-fns/locale';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

const CitesIndex = ({ appointments, statusFilter: initialStatusFilter }) => {
    const [statusFilter, setStatusFilter] = useState(initialStatusFilter || 'all');

    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800'
    };

    const statusLabels = {
        pending: 'Pendent',
        confirmed: 'Confirmada',
        cancelled: 'Cancel·lada',
        completed: 'Completada'
    };

    const formatPrice = (price) => {
        const numericPrice = typeof price === 'number' ? price : parseFloat(price);
        return isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);
    };

    const handleFilterChange = (newStatus) => {
        setStatusFilter(newStatus);
        window.location.href = route('client.appointments.index', { filter: newStatus });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />

            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
                        Les meves cites
                    </h1>
                    <Link
                        href={route('dashboard')}
                        className="bg-white/90 text-[#1f7275] px-6 py-2 rounded-full shadow-md hover:bg-white transition-all flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Nova reserva
                    </Link>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-8 flex-grow">
                <div className="mb-6">
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                        Filtrar per estat:
                    </label>
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="w-full md:w-48 p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                    >
                        <option value="all">Totes</option>
                        <option value="pending">Pendents</option>
                        <option value="completed">Completades</option>
                        <option value="pending_review">Pendent Review</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.length === 0 ? (
                        <div className="text-center bg-white p-8 rounded-xl shadow-lg col-span-2">
                            <div className="text-6xl text-gray-300 mb-4">📅</div>
                            <p className="text-gray-600 text-lg">
                                No tens cites programades actualment
                            </p>
                        </div>
                    ) : (
                        appointments.map((appointment) => (
                            <div key={appointment.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                                <Link href={route('client.appointments.show', appointment.id)} className="block p-6 flex-grow">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon icon={faBuilding} className="text-[#1f7275]" />
                                                <h2 className="text-xl font-semibold text-gray-800">
                                                    {appointment.company?.name || 'Empresa no especificada'}
                                                </h2>
                                            </div>
                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                                    <span>
                                                        {appointment.date ? format(parseISO(appointment.date), 'EEEE d MMMM yyyy', { locale: ca }) : 'Data no disponible'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                                                    <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                                                    <span>{appointment.time || 'Hora no disponible'}</span>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {appointment.service?.name || 'Servei no especificat'}
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
                                        <div className="mt-4 md:mt-0 md:text-right space-y-3">
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[appointment.status] || 'bg-gray-100 text-gray-800'} inline-block`}>
                                                {statusLabels[appointment.status] || 'Estat desconegut'}
                                            </div>
                                            {appointment.status === 'completed' && !appointment.review && (
                                                <div className="text-sm text-red-600 font-medium">
                                                    Pendent de ressenya
                                                </div>
                                            )}
                                            <div className="text-2xl font-bold text-[#1f7275]">
                                                {formatPrice(appointment.price)} €
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                {appointment.status === 'completed' && appointment.company_service_id && (
                                    <div className="p-4 border-t">
                                        <Link
                                            href={route('client.reviews.create', {
                                                companyServiceId: appointment.company_service_id,
                                                appointmentId: appointment.id
                                            })}
                                            className="bg-[#1f7275] text-white px-4 py-2 rounded-lg hover:bg-[#01a0a6] transition-colors flex items-center gap-2"
                                        >
                                            <FontAwesomeIcon icon={faStar} />
                                            {appointment.review ? 'Editar ressenya' : 'Afegir ressenya'}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CitesIndex;
