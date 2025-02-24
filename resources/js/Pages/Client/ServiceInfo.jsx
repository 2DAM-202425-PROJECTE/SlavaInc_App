import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBuilding, faMapMarkerAlt, faFilter } from '@fortawesome/free-solid-svg-icons';

const ServiceInfo = ({ service, companies }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const [stateFilter, setStateFilter] = useState("");

    // Obtenir valors únics per als filtres
    const cities = [...new Set(companies.map(c => c.city))];
    const states = [...new Set(companies.map(c => c.state))];

    // Filtrar empreses
    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.address.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCity = cityFilter ? company.city === cityFilter : true;
        const matchesState = stateFilter ? company.state === stateFilter : true;

        return matchesSearch && matchesCity && matchesState;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <Link
                        href="/dashboard"
                        className="text-[#1f7275] hover:text-[#01a0a6] font-medium flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Tornar al dashboard
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        {service.name}
                    </h1>
                    <p className="text-xl text-gray-600">
                        Empreses disponibles per aquest servei
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Columna de Filtres */}
                    <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit sticky top-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faFilter} className="text-[#1f7275]" />
                                Filtres
                            </h3>

                            {/* Cerca General */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Cerca empresa..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#1f7275]"
                                />
                            </div>

                            {/* Filtre per Ciutat */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ciutat</label>
                                <select
                                    value={cityFilter}
                                    onChange={(e) => setCityFilter(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275]"
                                >
                                    <option value="">Totes les ciutats</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtre per Regió */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Comunitat</label>
                                <select
                                    value={stateFilter}
                                    onChange={(e) => setStateFilter(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275]"
                                >
                                    <option value="">Totes les regions</option>
                                    {states.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Botó de Neteja */}
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setCityFilter("");
                                    setStateFilter("");
                                }}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                            >
                                Netejar filtres
                            </button>
                        </div>
                    </div>

                    {/* Llistat d'Empreses */}
                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 gap-6">
                            {filteredCompanies.map((company) => (
                                <div key={company.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="bg-[#1f7275] text-white p-3 rounded-lg">
                                            <FontAwesomeIcon icon={faBuilding} className="text-xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">{company.name}</h2>
                                            <div className="text-gray-600 mt-2 flex items-center gap-2">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                                                <div>
                                                    <p>{company.address}</p>
                                                    <p>{company.city}, {company.state} {company.zip_code}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredCompanies.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4 text-gray-400">🏢</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Cap empresa coincideix amb els filtres
                                </h3>
                                <p className="text-gray-600">
                                    Prova amb altres criteris de cerca
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceInfo;
