import React, { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function WorkerDashboard() {
    const [date, setDate] = useState(new Date());

    const tasks = [
        {
            id: 1,
            title: "Neteja del Pis",
            image: "https://info.vivendex.com/wp-content/uploads/2022/12/mejor-orientacion-piso-barcelona2.jpg",
            date: "10 de Febrer, 14:00",
            priority: true,
            description: "Neteja a fons d'un pis per a nous inquilins.",
        },
        {
            id: 2,
            title: "Desinfecció Oficina",
            image: "https://www.ofitipo.com/modules/dbblog/views/img/post/117-como-elegir-muebles-oficina-para-mejorar-productividad.png",
            date: "11 de Febrer, 09:30",
            priority: false,
            description: "Desinfecció de superfícies i espais comuns de l'oficina.",
        },
        {
            id: 3,
            title: "Manteniment Hotel",
            image: "https://www.hotelescenter.es/wp-content/blogs.dir/1601/files/home//header-home-mb.jpg",
            date: "12 de Febrer, 16:00",
            priority: false,
            description: "Manteniment i neteja de les habitacions d'un hotel.",
        },
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto flex gap-6">
            {/* Calendari */}
            <div className="w-1/3 bg-white shadow-md p-4 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Agenda de Treball</h1>
                <Calendar onChange={setDate} value={date} />
            </div>

            {/* Llista de treballs */}
            <div className="w-2/3 space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`flex shadow-md p-4 rounded-lg items-center ${task.priority ? 'bg-red-200' : 'bg-blue-200'}`}
                    >
                        <img src={task.image} alt={task.title} className="w-20 h-20 rounded-lg mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">{task.title}</h2>
                            <p className="text-gray-600">{task.date}</p>
                            <p className="text-gray-700 text-sm">{task.description}</p>
                            {/*<Link to={`/task/${task.id}`} className="text-blue-600 hover:underline text-sm">Més informació</Link>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
