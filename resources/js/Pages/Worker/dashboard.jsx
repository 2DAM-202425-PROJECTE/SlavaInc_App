import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Simulació de dates per a proves
const fakeDates = [
    {
        id: 1,
        worker_id: 1,
        service_id: 1,
        transaction_id: 1,
        review_id: 1,
        client_id: 1,
        date: '2025-02-26',
        service: {
            id: 1,
            name: 'Neteja de Casa',
            description: 'Neteja a fons de casa',
            type: 'casa'
        }
    },
    // Afegeix més dates per a proves aquí
];

const localizer = momentLocalizer(moment);

const Dashboard = () => {
    const [dates, setDates] = useState([]);

    useEffect(() => {
        // Aquí pots carregar les dates reals des del servidor
        setDates(fakeDates);
    }, []);

    const events = dates.map(date => ({
        title: date.service.name,
        start: new Date(date.date),
        end: new Date(date.date),
        allDay: true,
        resource: date
    }));

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Calendari i Serveis Assignats
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Organitza les teves cites i serveis de manera eficient
                    </p>
                </div>
            </section>

            {/* Calendari */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>

            {/* Llistat de serveis */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Serveis Assignats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {dates.map(date => (
                        <div key={date.id} className="relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 text-gray-800">
                                            {date.service.name}
                                        </h3>
                                        <span className="bg-[#1f7275] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {date.service.type}
                    </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {date.service.description}
                                </p>

                                <Link
                                    href={`/worker/services/${date.service.id}`}
                                    className="w-full bg-[#1f7275] hover:bg-[#01a0a6] text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    <span>Més info!</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {dates.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">😕</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            No s'han trobat serveis assignats
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
