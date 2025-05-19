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
        Inertia.post(
            route('company.quotes.respond', { quote: quote.id }),
            { amount, message },
            {
                onSuccess: () => {
                    // Reload the current page to reflect updated status
                    window.location.reload();
                },
                onFinish: () => setIsSubmitting(false),
            }
        );
    }

    function handleStatusUpdate(status) {
        Inertia.put(
            route('client.quotes.updateStatus', { quote: quote.id }),
            { status },
            {
                onSuccess: () => {
                    // Reload the page after accepting or declining
                    window.location.reload();
                },
            }
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header theme={`${theme} text-white`} />

            <section className={`w-full ${theme} py-8 px-6 sticky top-0 z-40`}>
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

            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-bold text-gray-800">{quote.service.name}</h2>
                        <p className="text-gray-600 mt-2">
                            {userType === 'client'
                                ? `Empresa: ${quote.company.name}`
                                : `Client: ${quote.user.name}`}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600"><strong>Descripció:</strong> {quote.description}</p>
                            <p className="text-gray-600 mt-2"><strong>Estat:</strong> {quote.status}</p>
                        </div>
                        <div>
                            <p className="text-gray-600"><strong>Data preferida:</strong> {quote.preferred_date || 'No especificada'}</p>
                            <p className="text-gray-600 mt-2"><strong>Hora preferida:</strong> {quote.preferred_time || 'No especificada'}</p>
                        </div>
                    </div>

                    {/* Formulari empresa */}
                    {userType === 'company' && quote.status === 'pending' && (
                        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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
                                className={`w-full ${theme} text-white py-3 rounded-xl font-medium transition-opacity ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                                }`}
                            >
                                {isSubmitting ? 'Enviant...' : 'Enviar resposta'}
                            </button>
                        </form>
                    )}

                    {/* Accions client */}
                    {userType === 'client' && quote.status === 'quoted' && (
                        <div className="mt-8 bg-gray-50 p-6 rounded-xl">
                            <p className="text-lg font-semibold text-gray-800">Resposta de l'empresa</p>
                            <p className="text-gray-600 mt-2"><strong>Preu proposat:</strong> {quote.amount} €</p>
                            <p className="text-gray-600 mt-2"><strong>Missatge:</strong> {quote.message || 'Cap missatge'}</p>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={() => handleStatusUpdate('accepted')}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Acceptar
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate('declined')}
                                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Rebutjar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
