import React from 'react';
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faPhone, faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import { route } from "ziggy-js";

const CompanyInfo = ({ company, serviceId }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#f0fdfa]">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />

            {/* Secció superior amb navegació dinàmica */}
            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-white">{company.name}</h1>
                        <p className="text-lg text-white/90 mt-2">Informació detallada de l'empresa</p>
                    </div>
                    <Link
                        href={route('client.services.show', { service: serviceId })} // Canvia serviceId per service
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Tornar al servei
                    </Link>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1f727522] to-[#01a0a611] z-0" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                        {/* Secció logo */}
                        <div className="w-full md:w-1/3">
                            <div className="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] p-1 rounded-2xl shadow-lg">
                                {company.logo ? (
                                    <img
                                        src={company.logo}
                                        alt={`${company.name} logo`}
                                        className="w-full h-64 object-cover rounded-xl"
                                    />
                                ) : (
                                    <div className="w-full h-64 flex items-center justify-center bg-white rounded-xl">
                                        <FontAwesomeIcon icon={faBuilding} className="text-6xl text-[#1f7275]" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Secció informació */}
                        <div className="w-full md:w-2/3 space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-[#1f7275] pl-4">
                                    Informació de contacte
                                </h2>

                                {/* Detalls de contacte */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#1f7275] mt-1 text-xl" />
                                            <div>
                                                <p className="font-semibold text-gray-800">Adreça</p>
                                                <p className="text-gray-600">{company.address}</p>
                                                <p className="text-gray-600">{company.city}, {company.state} {company.zip_code}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {company.phone && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon icon={faPhone} className="text-[#1f7275] text-xl" />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Telèfon</p>
                                                    <a href={`tel:${company.phone}`} className="text-gray-600 hover:text-[#01a0a6] transition-colors">
                                                        {company.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {company.email && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon icon={faEnvelope} className="text-[#1f7275] text-xl" />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Correu electrònic</p>
                                                    <a href={`mailto:${company.email}`} className="text-gray-600 hover:text-[#01a0a6] transition-colors">
                                                        {company.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Descripció (si existeix) */}
                            {company.description && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-[#1f7275] pl-4">
                                        Sobre nosaltres
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {company.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CompanyInfo;
