import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faWrench, faSwimmingPool, faInfoCircle, faSearch, faStar, faFrown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
const Dashboard = ({ services }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("generals");

    // Tipus principals del seeder
    const mainServiceTypes = ['casa', 'cotxe', 'garatge', 'piscina'];

    // Opcions de filtre actualitzades
    const filterOptions = [
        { label: "Generals", value: "generals" },
        { label: <FontAwesomeIcon icon={faHome} />, value: "casa" },
        { label: <FontAwesomeIcon icon={faCar} />, value: "cotxe" },
        { label: <FontAwesomeIcon icon={faWrench} />, value: "garatge" },
        { label: <FontAwesomeIcon icon={faSwimmingPool} />, value: "piscina" },
        { label: <><FontAwesomeIcon icon={faPlus} /> Altres</>, value: "altres" },
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
        <div className="min-h-screen bg-gray-50">
            {/* Capçalera millorada */}
            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Descobreix els Nostres Serveis de Neteja
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Professionals qualificats per a cada necessitat
                    </p>

                    {/* Barra de cerca amb icona */}
                    <div className="relative max-w-2xl mx-auto mb-8">
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

                    {/* Filtres amb estils millorats */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setSelectedFilter(option.value)}
                                className={`px-5 py-2.5 rounded-full border-2 flex items-center gap-2 transition-all ${
                                    selectedFilter === option.value
                                        ? "bg-white text-[#1f7275] border-white font-bold"
                                        : "bg-transparent text-white border-white/30 hover:border-white/60"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Llistat de serveis millorat */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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

                                <div className="p-6">
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

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <Link
                                        href={`/client/services/${service.id}`}
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
            </div>
        </div>
    );
};

export default Dashboard;
