import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faCalendarAlt,
    faClock,
    faEuroSign,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isBefore,
    isToday
} from 'date-fns';
import { es } from 'date-fns/locale';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

const CitesClients = ({ company, service }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [notes, setNotes] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);

    // Función para verificar si una fecha está deshabilitada
    const isDateDisabled = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return !isSameMonth(day, currentMonth) || isBefore(day, today);
    };

    // Generar días del mes
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Generar horario con validación de horas pasadas para el día actual
    const generateTimeSlots = () => {
        const slots = [];
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const isTodaySelected = selectedDate && isToday(selectedDate);

        // Matí: 09:00 - 12:30
        for (let hour = 9; hour <= 12; hour++) {
            if (!isTodaySelected || hour > currentHour || (hour === currentHour && 0 > currentMinute)) {
                slots.push(`${hour.toString().padStart(2, '0')}:00`);
            }
            if (hour !== 12 && (!isTodaySelected || hour > currentHour || (hour === currentHour && 30 > currentMinute))) {
                slots.push(`${hour.toString().padStart(2, '0')}:30`);
            }
        }

        // Tarda: 15:00 - 17:30
        for (let hour = 15; hour <= 17; hour++) {
            if (!isTodaySelected || hour > currentHour || (hour === currentHour && 0 > currentMinute)) {
                slots.push(`${hour.toString().padStart(2, '0')}:00`);
            }
            if (!isTodaySelected || hour > currentHour || (hour === currentHour && 30 > currentMinute)) {
                slots.push(`${hour.toString().padStart(2, '0')}:30`);
            }
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    if (!company || !service) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
                        <div className="text-4xl mb-4 text-red-500">⚠️</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Dades no disponibles
                        </h2>
                        <p className="text-gray-600 mb-4">
                            No s'han trobat les dades necessàries per a la reserva
                        </p>
                        <button
                            onClick={() => router.visit(route('dashboard'))
                            }  // Canviat a dashboard
                            className="bg-[#1f7275] text-white px-6 py-2 rounded-lg hover:bg-[#156568] transition"
                        >
                            Tornar al dashboard
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const calculatePrice = () => {
        const pivot = company.services?.find(s => s.id === service.id)?.pivot;

        if (!pivot) return 0;

        let price;
        if (['casa', 'garatge', 'altres'].includes(service.type)) {
            const unitValue = service.type === 'altres' ? 1 : 100;
            price = (parseFloat(pivot.price_per_unit) || 0) * unitValue;
        } else {
            price = ((parseFloat(pivot.min_price) || 0) + (parseFloat(pivot.max_price) || 0)) / 2;
        }

        // Asegurarse de que es un número con 2 decimales
        return parseFloat(price.toFixed(2));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDate || !selectedTime) {
            alert('Por favor selecciona fecha y hora');
            return;
        }

        const price = calculatePrice();

        try {
            router.post(route('client.appointments.store'), {
                company_id: company.id,
                service_id: service.id,
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: selectedTime,
                price: price,
                notes: notes
            }, {
                onSuccess: () => {
                    // Éxito - la redirección se maneja desde el controlador
                },
                onError: (errors) => {
                    if (errors.error) {
                        alert(errors.error);
                    } else {
                        alert('Error al procesar la reserva');
                        console.error(errors);
                    }
                }
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Error inesperado');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />

            {/* Capçalera de la pàgina */}
            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Reserva de cita</h1>
                            <p className="text-xl text-white/90">Selecciona data i hora per al teu servei</p>
                        </div>
                        <button
                            onClick={() => router.visit(route('client.services.show', service.id))}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Tornar enrere
                        </button>
                    </div>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
                {/* Secció superior amb info */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Info Empresa */}
                        <div className="flex items-start gap-4 flex-1">
                            <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-r from-[#1f7275] to-[#01a0a6] rounded-lg flex items-center justify-center">
                                {company.services?.[0]?.pivot?.logo ? (
                                    <img
                                        src={company.services[0].pivot.logo?.startsWith('http')
                                            ? company.services[0].pivot.logo
                                            : `/${company.services[0].pivot.logo}`
                                        }
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

                {/* Calendario */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecciona una data</h2>
                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'].map(day => (
                                    <div key={day} className="text-center text-gray-500 font-medium py-2">
                                        {day}
                                    </div>
                                ))}
                                {daysInMonth.map(day => {
                                    const disabled = isDateDisabled(day);
                                    return (
                                        <button
                                            type="button"
                                            key={day}
                                            onClick={() => !disabled && setSelectedDate(day)}
                                            className={`
                                                p-3 rounded-lg text-center transition
                                                ${isSameMonth(day, currentMonth) ? 'text-gray-800' : 'text-gray-400'}
                                                ${selectedDate && isSameDay(day, selectedDate)
                                                ? 'bg-[#1f7275] text-white'
                                                : disabled
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'hover:bg-gray-100'
                                            }
                                            `}
                                            disabled={disabled}
                                            aria-label={`Día ${format(day, 'd')}${disabled ? ' (no disponible)' : ''}`}
                                        >
                                            {format(day, 'd')}
                                        </button>
                                    );
                                })}
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
                                {timeSlots.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                        {timeSlots.map(time => {
                                            const isBooked = bookedSlots.some(slot => slot.time === time);
                                            return (
                                                <button
                                                    type="button"
                                                    key={time}
                                                    onClick={() => !isBooked && setSelectedTime(time)}
                                                    className={`
                                                        p-3 rounded-lg text-center transition
                                                        ${selectedTime === time
                                                        ? 'bg-[#1f7275] text-white'
                                                        : isBooked
                                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed line-through'
                                                            : 'bg-gray-100 hover:bg-gray-200'
                                                    }
                                                    `}
                                                    disabled={isBooked}
                                                    title={isBooked ? 'Aquesta hora ja està reservada' : ''}
                                                >
                                                    {time}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">
                                        No hi ha horaris disponibles per aquest dia
                                    </p>
                                )}
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

            <Footer />
        </div>
    );
};

export default CitesClients;
