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
    const [isSubmitting, setIsSubmitting] = useState(false); // Estat per controlar l'enviament

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        Inertia.post(route('client.quotes.store'), {
            service_id: serviceId,
            company_id: companyId,
            description,
        }).then(() => {
            setIsSubmitting(false); // Això es cridarà, però la redirecció ja haurà ocorregut
        });
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />
            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6 sticky top-0 z-50">
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
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Detalla la teva sol·licitud</span>
                            <textarea
                                className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-[#1f7275]"
                                rows={6}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={isSubmitting} // Desactiva el botó durant l'enviament
                            className={`w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white py-2 rounded-lg hover:from-[#01a0a6] hover:to-[#1f7275] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Enviant...' : 'Enviar sol·licitud'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
