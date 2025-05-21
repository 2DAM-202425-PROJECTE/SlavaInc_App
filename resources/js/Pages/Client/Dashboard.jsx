import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faWrench, faSwimmingPool, faInfoCircle, faSearch, faStar, faFrown, faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

const Dashboard = ({ services, impersonating_client = false }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("generals");
    const [showFilters, setShowFilters] = useState(false);

    // Tipus principals del seeder
    const mainServiceTypes = ['casa', 'cotxe', 'garatge', 'piscina'];

    // Opcions de filtre actualitzades
    const filterOptions = [
        { label: "Generals", value: "generals", icon: faFilter },
        { label: "Casa", value: "casa", icon: faHome },
        { label: "Cotxe", value: "cotxe", icon: faCar },
        { label: "Garatge", value: "garatge", icon: faWrench },
        { label: "Piscina", value: "piscina", icon: faSwimmingPool },
        { label: "Altres", value: "altres", icon: faPlus },
    ];

    // Funció de filtrat actualitzada
    const filteredServices = services.filter(service => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = service.name.toLowerCase().includes(searchLower) ||
            service.description.toLowerCase().includes(searchLower);

        let matchesFilter;
        if (selectedFilter === "generals") {
            matchesFilter = mainServiceTypes.includes(service.type?.toLowerCase());
        } else if (selectedFilter === "altres") {
            matchesFilter = !mainServiceTypes.includes(service.type?.toLowerCase());
        } else {
            matchesFilter = service.type?.toLowerCase() === selectedFilter.toLowerCase();
        }

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {!impersonating_client && (
                <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />
            )}            <div className="flex-1">
                {/* Capçalera millorada */}
                <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-dm-serif font-bold text-white mb-2">
                            Descobreix els Nostres Serveis de Neteja
                        </h1>
                        <p className="text-xl md:text-2xl font-dm-serif text-white/90 mb-6">
                            Professionals qualificats per a cada necessitat
                        </p>

                        {/* Barra de cerca amb icona */}
                        <div className="relative max-w-2xl mx-auto mb-6">
                            <input
                                type="text"
                                placeholder="Cerca serveis (ex: 'neteja de piscina')..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-0 rounded-full bg-white/90 focus:ring-2 focus:ring-white focus:bg-white transition-all"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contingut principal */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Botó per mostrar/ocultar filtres en mòbil */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden bg-[#1f7275] text-white px-4 py-2 rounded-lg mb-4 shadow-md flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faFilter} />
                        {showFilters ? 'Amagar filtres' : 'Mostrar filtres'}
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Filtres (ocults en mòbil per defecte) */}
                        <div className={`${showFilters ? 'block' : 'hidden'} md:block md:col-span-1`}>
                            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Filtres
                                </h3>
                                <div className="space-y-3">
                                    {filterOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSelectedFilter(option.value)}
                                            className={`w-full px-4 py-2 rounded-lg flex items-center gap-3 transition-all ${
                                                selectedFilter === option.value
                                                    ? "bg-[#1f7275] text-white font-bold"
                                                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            <FontAwesomeIcon icon={option.icon} className="text-lg" />
                                            <span>{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Llistat de serveis */}
                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                                {filteredServices.map((service) => {
                                    const isRecommended = service.type === "casa";
                                    const typeColors = {
                                        casa: "bg-[#1f7275] text-white",
                                        cotxe: "bg-blue-100 text-blue-800",
                                        garatge: "bg-amber-100 text-amber-800",
                                        piscina: "bg-cyan-100 text-cyan-800",
                                    };

                                    return (
                                        <div
                                            key={service.id}
                                            className={`relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow ${
                                                isRecommended ? "ring-4 ring-[#1f7275] ring-opacity-50" : ""
                                            }`}
                                        >
                                            {isRecommended && (
                                                <div className="absolute top-4 right-4 bg-[#1f7275] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <span>Recomanat</span>
                                                </div>
                                            )}

                                            <div className="p-6 flex flex-col h-full">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className={`text-xl font-bold mb-1 ${
                                                            isRecommended ? "text-[#1f7275]" : "text-gray-800"
                                                        }`}>
                                                            {service.name}
                                                        </h3>
                                                        <span className={`${
                                                            typeColors[service.type] || "bg-gray-100 text-gray-600"
                                                        } px-3 py-1 rounded-full text-sm font-medium`}>
                                                            {service.type || "General"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                                                    {service.description}
                                                </p>

                                                <Link
                                                    href={route('client.services.show', service.id)} // Usar el helper route()
                                                    className="w-full bg-[#1f7275] hover:bg-[#01a0a6] text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                                                >
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                    <span>Més info!</span>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {filteredServices.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-4">😕</div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                        No s'han trobat resultats
                                    </h2>
                                    <p className="text-gray-600">
                                        Prova amb altres paraules clau o canvia els filtres
                                    </p>
                                </div>
                            )}
                            {impersonating_client && (
                                <div className="fixed bottom-6 right-6 z-50">
                                    <button
                                        onClick={() => window.location.href = route('company.exitPreview')}
                                        className="px-4 py-2 bg-[#9e2a2f] text-white rounded-lg shadow-lg hover:bg-[#7c1e22] transition"
                                    >
                                        Tornar com a empresa
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;
