import React from 'react';
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faPhone, faEnvelope, faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import { route } from "ziggy-js";

const CompanyInfo = ({ company, serviceId }) => {
    // Function to render star icons based on average rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Full stars
        const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star if decimal >= 0.5
        const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

        return (
            <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                    <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-400" />
                ))}
                {halfStar === 1 && (
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 opacity-50" />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-gray-300" />
                ))}
            </div>
        );
    };

    // Get top 3 reviews sorted by rating
    const topReviews = company.reviews
        ? company.reviews.sort((a, b) => b.rate - a.rate).slice(0, 3)
        : [];

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
                        href={route('client.services.show', { service: serviceId })}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Tornar al servei
                    </Link>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1f7275] to-[#01a0a6] z-0" />

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

                            {/* Average Rating and Stars */}
                            {company.average_rating && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-[#1f7275] pl-4">
                                        Valoració Mitjana
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        {renderStars(company.average_rating)}
                                        <span className="text-gray-800 font-semibold">
                                            {company.average_rating.toFixed(1)}/5
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Top 3 Reviews */}
                            {topReviews.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-[#1f7275] pl-4">
                                        Millors Ressenyes
                                    </h2>
                                    <div className="space-y-4">
                                        {topReviews.map((review, index) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded-xl">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {renderStars(review.rate)}
                                                    <span className="text-gray-800">{review.rate.toFixed(1)}/5</span>
                                                </div>
                                                <p className="text-gray-600">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
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
