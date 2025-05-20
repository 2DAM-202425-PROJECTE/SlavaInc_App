import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { route } from "ziggy-js";
import Header from "@/Components/Header.jsx";
import HeaderCompany from "@/Components/HeaderCompany.jsx";
import Footer from "@/Components/Footer.jsx";

export default function QuotesList({ quotes, userType }) {
    const [selectedFilter, setSelectedFilter] = useState('pending');
    const statusFilters = ['pending', 'quoted', 'accepted', 'declined'];
    const filteredQuotes = quotes.filter(quote => quote.status === selectedFilter);

    const theme = userType === 'client'
        ? 'bg-gradient-to-r from-[#1f7275] to-[#01a0a6]'
        : 'bg-gradient-to-r from-[#b91c1c] to-[#dc2626]';

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {userType === 'client'
                ? <Header theme={`${theme} text-white`} />
                : <HeaderCompany theme={`${theme} text-white`} />
            }
            <section className={`w-full ${theme} py-8 px-6 sticky top-0 z-40`}>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-white">
                        {userType === 'client' ? 'Els meus pressupostos' : 'Pressupostos rebuts'}
                    </h1>

                    {/* Filtres */}
                    <div className="flex gap-2 mt-4">
                        {statusFilters.map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedFilter(status)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedFilter === status
                                        ? `bg-white ${userType === 'client' ? 'text-[#1f7275]' : 'text-[#b91c1c]'}`
                                        : 'text-white hover:bg-white hover:text-gray-800'
                                }`}
                            >
                                {{
                                    pending: 'Pendent',
                                    quoted: 'Pressupostat',
                                    accepted: 'Acceptat',
                                    declined: 'Rebutjat'
                                }[status]}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredQuotes.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-4">
                            No hi ha pressupostos en aquest estat.
                        </div>
                    ) : (
                        filteredQuotes.map(quote => (
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
                                        {{
                                            pending: 'Pendent',
                                            quoted: 'Pressupostat',
                                            accepted: 'Acceptat',
                                            declined: 'Rebutjat'
                                        }[quote.status]}
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
                        ))
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
