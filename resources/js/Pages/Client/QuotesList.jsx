import React from 'react';
import { Link } from '@inertiajs/react';
import { route } from "ziggy-js";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

export default function QuotesList({ quotes, userType }) {
    const theme = userType === 'client'
        ? 'bg-gradient-to-r from-[#1f7275] to-[#01a0a6]'
        : 'bg-gradient-to-r from-[#b91c1c] to-[#dc2626]';

    return (
        <div className="min-h-screen bg-gray-50">
            <Header theme={`${theme} text-white`} />
            <section className={`w-full ${theme} py-8 px-6 sticky top-0 z-50`}>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-white">
                        {userType === 'client' ? 'Els meus pressupostos' : 'Pressupostos rebuts'}
                    </h1>
                </div>
            </section>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="space-y-4">
                    {quotes.map(quote => (
                        <div key={quote.id} className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-bold">{quote.service.name}</h2>
                            <p className="text-gray-600">
                                {userType === 'client' ? `Empresa: ${quote.company.name}` : `Client: ${quote.user.name}`}
                            </p>
                            <p className="text-gray-600">Estat: {quote.status}</p>
                            <Link
                                href={route('quotes.show', { quote: quote.id })}
                                className="text-blue-500 hover:underline"
                            >
                                Veure detalls
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
