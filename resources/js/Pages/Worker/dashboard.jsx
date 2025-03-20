import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faInfoCircle,
    faUser,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { Link, usePage, router } from '@inertiajs/react'; // Importa router d'Inertia
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";


// Definir fakeDates dins del component
const fakeDates = [
    {
        id: 1,
        user_id: 1,
        service_id: 1,
        date: '2025-03-26',
        client: {
            name: 'Joan Pérez',
            phone: '123 456 789',
            address: 'Carrer Major, 123, Barcelona'
        },
        service: {
            id: 1,
            name: 'Neteja de Casa',
            description: 'Neteja a fons de casa',
            type: 'casa'
        }
    },
    {
        id: 2,
        user_id: 1,
        service_id: 2,
        date: '2025-03-27',
        client: {
            name: 'Maria García',
            phone: '987 654 321',
            address: 'Avinguda Diagonal, 456, Barcelona'
        },
        service: {
            id: 2,
            name: 'Neteja de Cotxe',
            description: 'Neteja detallada de cotxe',
            type: 'cotxe'
        }
    },
];

const localizer = momentLocalizer(moment);

const Dashboard = () => {
    const { auth } = usePage().props;
    const userId = auth.user.id;
    const [dates, setDates] = useState([]);

    useEffect(() => {
        // Aquí pots carregar les dates reals des del servidor
        const filteredDates = fakeDates.filter(date => date.user_id === userId);
        console.log('Filtered Dates:', filteredDates);
        setDates(filteredDates);
    }, [userId]);

    const events = dates.map(date => ({
        title: date.service.name,
        start: new Date(date.date),
        end: new Date(date.date),
        allDay: true,
        resource: date
    }));

    console.log('Events:', events);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] text-white" />
            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] py-12 px-6">
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
                    onSelectEvent={(event) => {
                        const serviceId = event.resource.service.id;
                        window.location.href = `/worker/services/${serviceId}`;
                    }}
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
                                        <span className="bg-[#7f1d1d] text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {date.service.type}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {date.service.description}
                                </p>

                                <Link
                                    href={`/worker/services/${date.service.id}`}
                                    className="w-full bg-[#7f1d1d] hover:bg-[#dc2626] text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
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
            <Footer/>
        </div>
    );
};

export default Dashboard;
