import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faInfoCircle,
    faUser,
    faBuilding,
    faEuroSign,
    faPhone
} from '@fortawesome/free-solid-svg-icons';
import { Link, usePage, router } from '@inertiajs/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer.jsx";

// Configura moment para usar la localización correcta
moment.locale('ca', {
    months: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
    weekdays: 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
    weekdaysShort: 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
});

const localizer = momentLocalizer(moment);

const Dashboard = () => {
    const { auth, appointments } = usePage().props;
    const userId = auth.user.id;
    const [events, setEvents] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        // Filtrar appointments para este worker
        const workerAppointments = appointments.filter(app =>
            app.workers?.some(worker => worker.id === userId)
        );
        setFilteredAppointments(workerAppointments);

        // Preparar eventos para el calendario
        const calendarEvents = workerAppointments.map(app => {
            const [hours, minutes] = app.time.split(':').map(Number);
            const startDate = new Date(app.date);
            startDate.setHours(hours, minutes);

            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + 1);

            return {
                title: `${app.service.name} - ${app.user.name}`,
                start: startDate,
                end: endDate,
                allDay: false,
                resource: app
            };
        });

        setEvents(calendarEvents);
    }, [userId, appointments]);

    // Configuración de estilos para los eventos del calendario
    const eventStyleGetter = (event) => {
        let backgroundColor = '#7f1d1d'; // Color por defecto
        let opacity = 0.8;

        if (event.resource.status === 'confirmed') {
            backgroundColor = '#15803d'; // Verde
        } else if (event.resource.status === 'pending') {
            backgroundColor = '#d97706'; // Amarillo
        } else if (event.resource.status === 'cancelled') {
            backgroundColor = '#dc2626'; // Rojo
            opacity = 0.5; // Más tenue para indicar cancelación
        } else if (event.resource.status === 'completed') {
            backgroundColor = '#1e40af'; // Azul
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity,
                color: 'white',
                border: '0px',
                display: 'block',
                fontSize: '0.75rem', // Smaller font for mobile
            }
        };
    };

    // Mapa de estilos y etiquetas para los estados
    const statusStyles = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendent' },
        confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmada' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancel·lada' },
        completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completada' }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] text-white" />

            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] py-8 sm:py-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                        Calendari de Cites
                    </h1>
                    <p className="text-lg sm:text-xl text-white/90">
                        Benvingut/da, {auth.user.name}
                    </p>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '60vh', minHeight: '400px', maxHeight: '600px' }}
                        defaultView={window.innerWidth < 640 ? 'agenda' : 'month'}
                        views={['day', 'week', 'month', 'agenda']}
                        min={new Date(0, 0, 0, 8, 0, 0)}
                        max={new Date(0, 0, 0, 20, 0, 0)}
                        eventPropGetter={eventStyleGetter}
                        onSelectEvent={(event) => {
                            router.visit(route('worker.appointments.show', event.resource.id));
                        }}
                        messages={{
                            today: 'Avui',
                            previous: 'Anterior',
                            next: 'Següent',
                            month: 'Mes',
                            week: 'Setmana',
                            day: 'Dia',
                            agenda: 'Agenda',
                            date: 'Data',
                            time: 'Hora',
                            event: 'Esdeveniment',
                            noEventsInRange: 'No hi ha cites en aquest rang de dates.'
                        }}
                    />
                </div>

                {/* Llistat de cites */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">Cites Assignades</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredAppointments.map(appointment => (
                            <div key={appointment.id} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                <div className="p-4 sm:p-5">
                                    <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                                {appointment.service.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm sm:text-base">
                                                {moment(appointment.date).format('DD/MM/YYYY')} - {appointment.time}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0 ${
    statusStyles[appointment.status]?.bg || 'bg-gray-100'
} ${statusStyles[appointment.status]?.text || 'text-gray-800'}`}>
                                            {statusStyles[appointment.status]?.label || appointment.status}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faUser} className="text-gray-400 text-sm sm:text-base" />
                                            <p className="text-gray-600 text-sm sm:text-base">
                                                {appointment.user.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faBuilding} className="text-gray-400 text-sm sm:text-base" />
                                            <p className="text-gray-600 text-sm sm:text-base">
                                                {appointment.company.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faEuroSign} className="text-gray-400 text-sm sm:text-base" />
                                            <p className="text-gray-600 text-sm sm:text-base">
                                                {Number(appointment.price).toFixed(2)} €
                                            </p>
                                        </div>
                                    </div>

                                    {appointment.notes && (
                                        <div className="bg-blue-50 p-2 rounded mb-3">
                                            <p className="text-gray-600 italic text-sm sm:text-base">{appointment.notes}</p>
                                        </div>
                                    )}

                                    <Link
                                        href={route('worker.appointments.show', appointment.id)}
                                        className="w-full bg-[#7f1d1d] hover:bg-[#dc2626] text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                                        <span>Detalls</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredAppointments.length === 0 && (
                        <div className="text-center py-8">
                            <div className="text-5xl mb-3">📅</div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                                No tens cites
                            </h3>
                            <p className="text-gray-500 text-sm sm:text-base">Les teves cites apareixeran aquí</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
