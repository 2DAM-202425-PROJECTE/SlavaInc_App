import React from 'react';
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faPhone, faEnvelope, faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import { route } from "ziggy-js";

const CompanyInfo = ({ company, serviceId }) => {
    // Colors del tema
    const primaryColor = '#1f7275';
    const secondaryColor = '#01a0a6';
    const gradient = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;

    // Funció per renderitzar estrelles
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <div className="flex" aria-label={`Valoració: ${rating.toFixed(1)} de 5`}>
                {[...Array(fullStars)].map((_, i) => (
                    <FontAwesomeIcon
                        key={`full-${i}`}
                        icon={faStar}
                        className="text-yellow-400"
                        aria-label="Estrella plena"
                    />
                ))}
                {halfStar === 1 && (
                    <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400 opacity-50"
                        aria-label="Mitja estrella"
                    />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <FontAwesomeIcon
                        key={`empty-${i}`}
                        icon={faStar}
                        className="text-gray-300"
                        aria-label="Estrella buida"
                    />
                ))}
            </div>
        );
    };

    // Obtenir les 3 millors ressenyes
    const topReviews = company.reviews
        ? company.reviews.sort((a, b) => b.rate - a.rate).slice(0, 3)
        : [];

    return (
        <div className="min-h-screen bg-white">
            <Header theme={`bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white`} />

            {/* Capçalera amb gradient */}
            <section className="w-full py-12 px-6" style={{ background: gradient }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{company.name}</h1>
                        <p className="text-lg text-white/90">Informació detallada de l'empresa</p>
                    </div>
                    <Link
                        href={route('client.services.show', { service: serviceId })}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Tornar al servei
                    </Link>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Secció logo */}
                        <div className="lg:w-1/3 p-6 bg-gray-50 flex flex-col items-center">
                            <div className="w-full max-w-xs">
                                {company.logo ? (
                                    <img
                                        src={company.logo}
                                        alt={`${company.name} logo`}
                                        className="w-full h-auto rounded-lg object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="w-full h-64 flex items-center justify-center bg-white rounded-lg shadow-md">
                                        <FontAwesomeIcon
                                            icon={faBuilding}
                                            className="text-6xl"
                                            style={{ color: primaryColor }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Valoració destacada */}
                            {company.average_rating && (
                                <div className="mt-6 text-center">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Valoració mitjana</h3>
                                    <div className="flex justify-center items-center gap-2">
                                        {renderStars(company.average_rating)}
                                        <span className="text-xl font-bold ml-2" style={{ color: primaryColor }}>
                                            {company.average_rating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Secció informació */}
                        <div className="lg:w-2/3 p-8">
                            {/* Secció "Sobre nosaltres" */}
                            {company.description && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ borderColor: secondaryColor }}>
                                        Sobre nosaltres
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        {company.description}
                                    </p>
                                </div>
                            )}

                            {/* Detalls de contacte */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ borderColor: secondaryColor }}>
                                    Informació de contacte
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                                        <div className="flex items-start gap-3">
                                            <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                                className="mt-1 text-xl"
                                                style={{ color: secondaryColor }}
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">Adreça</p>
                                                <p className="text-gray-600">{company.address}</p>
                                                <p className="text-gray-600">{company.city}, {company.state} {company.zip_code}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {company.phone && (
                                        <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                    className="text-xl"
                                                    style={{ color: secondaryColor }}
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Telèfon</p>
                                                    <a
                                                        href={`tel:${company.phone}`}
                                                        className="text-gray-600 hover:text-[#01a0a6] transition-colors"
                                                    >
                                                        {company.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {company.email && (
                                        <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                    className="text-xl"
                                                    style={{ color: secondaryColor }}
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Correu electrònic</p>
                                                    <a
                                                        href={`mailto:${company.email}`}
                                                        className="text-gray-600 hover:text-[#01a0a6] transition-colors"
                                                    >
                                                        {company.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Secció "Millors ressenyes" */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ borderColor: secondaryColor }}>
                                    Millors Ressenyes
                                </h2>
                                {topReviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {topReviews.map((review, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    {renderStars(review.rate)}
                                                    <span className="text-gray-800 font-medium">
                                                        {review.rate.toFixed(1)}/5
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 mb-2">{review.comment}</p>
                                                {review.created_at && (
                                                    <p className="text-gray-500 text-sm">
                                                        {new Date(review.created_at).toLocaleDateString('ca-ES', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                                        <p className="text-gray-600">Encara no hi ha ressenyes disponibles.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CompanyInfo;
