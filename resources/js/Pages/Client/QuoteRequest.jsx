import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { route } from "ziggy-js";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function QuoteRequest({ serviceId, companyId }) {
    const [description, setDescription] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        Inertia.post(route('client.quotes.store'), {
            service_id: serviceId,
            company_id: companyId,
            description,
            preferred_date: preferredDate,
            preferred_time: preferredTime,
        }, {
            onFinish: () => setIsSubmitting(false),
        });
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />

            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Solicita Pressupost</h1>
                        <p className="text-lg text-white/90">Detalla la teva sol·licitud per al servei</p>
                    </div>
                    <Link
                        href={route('client.services.show', { service: serviceId })}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Tornar al servei
                    </Link>
                </div>
            </section>

            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6">
                            <label className="block">
                                <span className="block text-gray-700 font-medium mb-2">Detalls de la sol·licitud</span>
                                <textarea
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-transparent"
                                    rows={5}
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                />
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="block text-gray-700 font-medium mb-2">Data preferida</span>
                                    <input
                                        type="date"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f7275]"
                                        value={preferredDate}
                                        onChange={e => setPreferredDate(e.target.value)}
                                    />
                                </label>

                                <label className="block">
                                    <span className="block text-gray-700 font-medium mb-2">Hora preferida</span>
                                    <input
                                        type="time"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f7275]"
                                        value={preferredTime}
                                        onChange={e => setPreferredTime(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white py-3 rounded-xl font-medium transition-opacity ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                            }`}
                        >
                            {isSubmitting ? 'Enviant...' : 'Enviar sol·licitud'}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
