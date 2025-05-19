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
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header theme={`${theme} text-white`} />
            <section className={`w-full ${theme} py-8 px-6 sticky top-0 z-40`}>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-white">
                        {userType === 'client' ? 'Els meus pressupostos' : 'Pressupostos rebuts'}
                    </h1>
                </div>
            </section>

            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quotes.map(quote => (
                        <div key={quote.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{quote.service.name}</h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {userType === 'client'
                                            ? `Empresa: ${quote.company.name}`
                                            : `Client: ${quote.user.name}`}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        quote.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                }`}>
                                    {quote.status}
                                </span>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Link
                                    href={route('quotes.show', { quote: quote.id })}
                                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                                >
                                    Veure detalls →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
