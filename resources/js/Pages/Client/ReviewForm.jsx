import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import { route } from "ziggy-js";

const ReviewForm = ({ companyService, appointment, existingReview }) => {
    const [rating, setRating] = useState(existingReview ? existingReview.rate : 0);
    const [comment, setComment] = useState(existingReview ? existingReview.comment : '');
    const [errors, setErrors] = useState({});

    if (!companyService || !appointment) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />
                <div className="max-w-7xl mx-auto px-6 py-8 flex-grow">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <p className="text-red-600">Error: No s'ha trobat la informació necessària per crear la ressenya.</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = existingReview ? 'put' : 'post';
        const url = existingReview
            ? route('client.reviews.update', existingReview.id)
            : route('client.reviews.store');
        const rate = parseFloat(rating);

        Inertia[method](url, {
            company_service_id: companyService.id,
            appointment_id: appointment.id,
            rate: rate,
            comment: comment,
        }, {
            onSuccess: () => {
                Inertia.visit(route('client.appointments.index'));
            },
            onError: (errors) => {
                setErrors(errors);
                console.error('Errors en enviar ressenya:', errors);
            }
        });
    };

    // Renderitza estrelles amb suport per mitges puntuacions
    const renderStars = () => {
        return [1, 2, 3, 4, 5].map((star) => {
            const isFull = rating >= star;
            const isHalf = rating >= star - 0.5 && rating < star;

            return (
                <span key={star} className="relative w-6 h-6">
                    <FontAwesomeIcon
                        icon={isHalf ? faStarHalfAlt : faStar}
                        className={`cursor-pointer text-2xl transition-colors ${isFull || isHalf ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={() => setRating(isHalf ? star : star - 0.5)}
                    />
                </span>
            );
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />
            <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                        {existingReview ? 'Editar ressenya' : 'Afegir ressenya'}
                    </h1>
                    <Link
                        href={route('client.appointments.index')}
                        className="bg-white/90 text-[#1f7275] px-6 py-2 rounded-full shadow-md hover:bg-white transition-all flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Tornar a les cites
                    </Link>
                </div>
            </section>
            <div className="max-w-7xl mx-auto px-6 py-8 flex-grow">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Ressenya per {companyService.company?.name || 'Empresa no especificada'} - {companyService.service?.name || 'Servei no especificat'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Puntuació</label>
                            <div className="flex gap-2">{renderStars()}</div>
                            <p className="text-sm text-gray-600 mt-1">Puntuació: {rating} / 5</p>
                            {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Comentari</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f7275]"
                                rows="5"
                            ></textarea>
                            {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
                        </div>
                        <div className="flex justify-end gap-4">
                            <Link
                                href={route('client.appointments.index')}
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Cancel·lar
                            </Link>
                            <button
                                type="submit"
                                className="bg-[#1f7275] text-white px-6 py-2 rounded-lg hover:bg-[#01a0a6] transition-colors"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReviewForm;
