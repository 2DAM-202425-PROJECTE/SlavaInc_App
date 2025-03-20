import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendarAlt, faClock, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

const CitesClients = ({ company, service }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [notes, setNotes] = useState('');

    // Generar dies del mes
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Generar horari
    const generateTimeSlots = () => {
        const slots = [];
        // Matí: 09:00 - 12:30
        for (let hour = 9; hour <= 12; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
            if (hour !== 12) slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        // Tarda: 15:00 - 17:30
        for (let hour = 15; hour <= 17; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
            slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    if (!company || !service) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
                    <div className="text-4xl mb-4 text-red-500">⚠️</div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Dades no disponibles
                    </h2>
                    <p className="text-gray-600 mb-4">
                        No s'han trobat les dades necessàries per a la reserva
                    </p>
                    <button
                        onClick={() => Inertia.visit(route('client.services.show', service?.id))}
                        className="bg-[#1f7275] text-white px-6 py-2 rounded-lg hover:bg-[#156568] transition"
                    >
                        Tornar als serveis
                    </button>
                </div>
            </div>
        );
    }

    const calculatePrice = () => {
        const pivot = company.services?.[0]?.pivot;
        if (!pivot) return 0;

        if (['casa', 'garatge', 'altres'].includes(service.type)) {
            const unitValue = service.type === 'altres' ? 1 : 100;
            return (pivot.price_per_unit || 0) * unitValue;
        }
        return ((pivot.min_price || 0) + (pivot.max_price || 0)) / 2;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) {
            alert('Si us plau, selecciona una data i hora');
            return;
        }

        Inertia.post('/client/cita', {
            company_id: company.id,
            service_id: service.id,
            date: format(selectedDate, 'yyyy-MM-dd'),
            time: selectedTime,
            price: calculatePrice(),
            notes
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Secció superior amb info */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Info Empresa */}
                        <div className="flex items-start gap-4 flex-1">
                            <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-r from-[#1f7275] to-[#01a0a6] rounded-lg flex items-center justify-center">
                                {company.services?.[0]?.pivot?.logo ? (
                                    <img
                                        src={`/${company.services[0].pivot.logo}`}
                                        alt={company.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faBuilding} className="text-white text-xl" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{company.name}</h1>
                                <p className="text-gray-600">{company.address}</p>
                                <p className="text-gray-600">{company.city}, {company.state}</p>
                            </div>
                        </div>

                        {/* Info Servei */}
                        <div className="flex-1">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faEuroSign} className="text-gray-500" />
                                    <p className="text-lg font-semibold text-gray-800">
                                        Preu estimat: {calculatePrice().toFixed(2)} €
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                                    <p className="text-lg text-gray-800">
                                        {service.name} ({service.type})
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendari */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecciona una data</h2>
                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'].map(day => (
                                    <div key={day} className="text-center text-gray-500 font-medium py-2">
                                        {day}
                                    </div>
                                ))}
                                {daysInMonth.map(day => (
                                    <button
                                        type="button"
                                        key={day}
                                        onClick={() => setSelectedDate(day)}
                                        className={`
                                            p-3 rounded-lg text-center transition
                                            ${isSameMonth(day, currentMonth) ? 'text-gray-800' : 'text-gray-400'}
                                            ${selectedDate && isSameDay(day, selectedDate)
                                            ? 'bg-[#1f7275] text-white'
                                            : 'hover:bg-gray-100'}
                                            ${!isSameMonth(day, currentMonth) && 'opacity-50'}
                                        `}
                                        disabled={!isSameMonth(day, currentMonth)}
                                    >
                                        {format(day, 'd')}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() - 1)))}
                                    className="text-gray-600 hover:text-[#1f7275]"
                                >
                                    ◀ Mes anterior
                                </button>
                                <span className="text-xl font-semibold text-gray-800">
                                    {format(currentMonth, 'MMMM yyyy', { locale: es })}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() + 1)))}
                                    className="text-gray-600 hover:text-[#1f7275]"
                                >
                                    Mes següent ▶
                                </button>
                            </div>
                        </div>

                        {selectedDate && (
                            <div className="pt-6 border-t border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecciona una hora</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {timeSlots.map(time => (
                                        <button
                                            type="button"
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`
                                                p-3 rounded-lg text-center transition
                                                ${selectedTime === time
                                                ? 'bg-[#1f7275] text-white'
                                                : 'bg-gray-100 hover:bg-gray-200'}
                                            `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Observacions (opcional)
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6]"
                                rows="3"
                                placeholder="Detalls específics de la teva reserva..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white px-6 py-3 rounded-lg hover:from-[#01a0a6] hover:to-[#1f7275] transition-all shadow-md text-lg"
                        >
                            Confirmar reserva
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CitesClients;
