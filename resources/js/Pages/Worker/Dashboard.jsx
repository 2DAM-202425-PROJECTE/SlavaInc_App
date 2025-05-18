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
            // Combina fecha y hora para crear el objeto Date correctamente
            const [hours, minutes] = app.time.split(':').map(Number);
            const startDate = new Date(app.date);
            startDate.setHours(hours, minutes);

            // Establece la duración de la cita (1 hora por defecto)
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
        let backgroundColor = '#7f1d1d'; // Color por defecto (rojo oscuro)

        if (event.resource.status === 'confirmed') {
            backgroundColor = '#15803d'; // Verde para citas confirmadas
        } else if (event.resource.status === 'cancelled') {
            backgroundColor = '#6b7280'; // Gris para citas canceladas
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] text-white" />

            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Calendari de Cites
                    </h1>
                    <p className="text-xl text-white/90">
                        Benvingut/da, {auth.user.name}
                    </p>
                </div>
            </section>

            {/* Calendari */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 600 }}
                        defaultView="month"
                        views={['day', 'week', 'month', 'agenda']}
                        min={new Date(0, 0, 0, 8, 0, 0)} // Hora de inicio 8:00
                        max={new Date(0, 0, 0, 20, 0, 0)} // Hora fin 20:00
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
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cites Assignades</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredAppointments.map(appointment => (
                            <div key={appointment.id} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {appointment.service.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {moment(appointment.date).format('DD/MM/YYYY')} - {appointment.time}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                    appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'}`}>
                                                {appointment.status === 'pending' ? 'Pendent' :
                                                    appointment.status === 'confirmed' ? 'Confirmada' :
                                                        appointment.status === 'completed' ? 'Completada' :
                                                            'Cancel·lada'}
                                            </span>
                                    </div>

                                    <div className="space-y-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faUser} className="text-gray-400 text-sm" />
                                            <p className="text-gray-600 text-sm">
                                                {appointment.user.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faBuilding} className="text-gray-400 text-sm" />
                                            <p className="text-gray-600 text-sm">
                                                {appointment.company.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faEuroSign} className="text-gray-400 text-sm" />
                                            <p className="text-gray-600 text-sm">
                                                {Number(appointment.price).toFixed(2)} €
                                            </p>
                                        </div>
                                    </div>

                                    {appointment.notes && (
                                        <div className="bg-blue-50 p-2 rounded mb-3">
                                            <p className="text-gray-600 italic text-sm">{appointment.notes}</p>
                                        </div>
                                    )}

                                    <Link
                                        href={route('worker.appointments.show', appointment.id)}
                                        className="w-full bg-[#7f1d1d] hover:bg-[#dc2626] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
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
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                No tens cites assignades
                            </h3>
                            <p className="text-gray-500">Quan et assignin cites, apareixeran aquí</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Dashboard;
