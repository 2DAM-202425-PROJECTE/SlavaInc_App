import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBuilding, faCalendarAlt, faClock, faEuroSign} from '@fortawesome/free-solid-svg-icons';

const CitesClients = ({ company, service, priceEstimate }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/client/cita', {
            company_id: company.id,
            service_id: service.id,
            date: selectedDate,
            time: selectedTime,
            price: priceEstimate,
            notes
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Reserva de servei amb {company.name}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Detalls de la reserva */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Detalls de la reserva
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faEuroSign} className="text-gray-500" />
                                        <p className="text-gray-700">
                                            Preu estimat: {priceEstimate.toFixed(2)} €
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                        <p className="text-gray-700">
                                            Servei: {service.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Formulari de reserva */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                        Data de la reserva
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                                        Hora de la reserva
                                    </label>
                                    <select
                                        id="time"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                                        required
                                    >
                                        <option value="">Selecciona una hora</option>
                                        {['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                        Observacions
                                    </label>
                                    <textarea
                                        id="notes"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                                        rows="4"
                                        placeholder="Indica qualsevol detall important..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white px-6 py-3 rounded-lg hover:from-[#01a0a6] hover:to-[#1f7275] transition-all shadow-md"
                                >
                                    Confirmar reserva
                                </button>
                            </form>
                        </div>

                        {/* Informació de l'empresa */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Informació de l'empresa
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white rounded-lg">
                                        {company.pivot.logo ? (
                                            <img src={`/${company.pivot.logo}`} alt={`${company.name} logo`} className="w-12 h-12 rounded-full" />
                                        ) : (
                                            <FontAwesomeIcon icon={faBuilding} className="text-xl" />
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
                                        <p className="text-gray-600">{company.address}</p>
                                        <p className="text-gray-600">{company.city}, {company.state}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitesClients;
