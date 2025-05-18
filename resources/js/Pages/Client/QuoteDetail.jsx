import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { route } from "ziggy-js";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function QuoteDetail({ quote, userType }) {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const theme = userType === 'client'
        ? 'bg-gradient-to-r from-[#1f7275] to-[#01a0a6]'
        : 'bg-gradient-to-r from-[#b91c1c] to-[#dc2626]';

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        Inertia.post(route('company.quotes.respond', { quote: quote.id }), {
            amount,
            message,
        }, {
            onFinish: () => setIsSubmitting(false),
        });
    }

    function handleStatusUpdate(status) {
        Inertia.put(route('client.quotes.updateStatus', { quote: quote.id }), { status });
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme={`${theme} text-white`} />
            <section className={`w-full ${theme} py-8 px-6 sticky top-0 z-50`}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Detalls del pressupost</h1>
                        <p className="text-lg text-white/90">{quote.service.name}</p>
                    </div>
                    <Link
                        href={route('quotes.index')}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Tornar als pressupostos
                    </Link>
                </div>
            </section>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold">{quote.service.name}</h2>
                    <p className="text-gray-600">
                        {userType === 'client' ? `Empresa: ${quote.company.name}` : `Client: ${quote.user.name}`}
                    </p>
                    <p className="text-gray-600">Descripció: {quote.description}</p>
                    <p className="text-gray-600">Data preferida: {quote.preferred_date || 'No especificada'}</p>
                    <p className="text-gray-600">Hora preferida: {quote.preferred_time || 'No especificada'}</p>
                    <p className="text-gray-600">Estat: {quote.status}</p>

                    {userType === 'company' && quote.status === 'pending' && (
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <label className="block">
                                <span className="text-gray-700">Preu proposat</span>
                                <input
                                    type="number"
                                    className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-[#b91c1c]"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Missatge per al client</span>
                                <textarea
                                    className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-[#b91c1c]"
                                    rows={3}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                            </label>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full ${theme} text-white py-2 rounded-lg hover:from-[#dc2626] hover:to-[#b91c1c] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Enviant...' : 'Enviar resposta'}
                            </button>
                        </form>
                    )}

                    {userType === 'client' && quote.status === 'quoted' && (
                        <div className="mt-4">
                            <p className="text-gray-600">Preu proposat: {quote.amount} €</p>
                            <p className="text-gray-600">Missatge de l'empresa: {quote.message || 'Cap missatge'}</p>
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={() => handleStatusUpdate('accepted')}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Acceptar
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate('declined')}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Rebutjar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
