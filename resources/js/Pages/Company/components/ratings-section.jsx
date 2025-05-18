"use client"

import { useState, useEffect } from "react"
import { StarIcon, ChatBubbleLeftIcon, CalendarIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"

export default function RatingsSection({ company }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const clientReviews = company.clientReviews || []

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    // Function to render stars based on rating
    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, i) =>
            i < rating ? (
                <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
            ) : (
                <StarIcon key={i} className="h-5 w-5 text-gray-300" />
            ),
        )
    }

    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <StarIcon className="h-8 w-8 mr-3 text-[#9e2a2f]" />
                    Valoracions de Clients
                </h2>
                <div className="flex items-center bg-[#9e2a2f]/10 px-4 py-2 rounded-lg">
                    <div className="flex items-center mr-2">{renderStars(Math.round(company.stats.clientsRating))}</div>
                    <span className="font-bold text-[#9e2a2f]">{company.stats.clientsRating} / 5</span>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Total de valoracions</h3>
                    <p className="text-3xl font-bold text-[#9e2a2f]">{company.stats.totalReviews}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Valoracions positives</h3>
                    <p className="text-3xl font-bold text-green-600">{company.stats.positiveReviews}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Valoracions negatives</h3>
                    <p className="text-3xl font-bold text-red-600">{company.stats.negativeReviews}</p>
                </div>
            </div>

            {clientReviews.length > 0 ? (
                <div className="space-y-6">
                    {clientReviews.map((review, index) => (
                        <div
                            key={review.id}
                            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-1 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">{review.clientName}</h3>
                                    <div className="flex items-center space-x-1 mb-2">{renderStars(review.rating)}</div>
                                </div>
                                <div className="mt-2 md:mt-0 flex items-center text-gray-500">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    <span>{review.date}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-start">
                                    <ChatBubbleLeftIcon className="h-5 w-5 mr-2 text-[#9e2a2f] mt-1 flex-shrink-0" />
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center text-gray-700">
                                    <WrenchScrewdriverIcon className="h-5 w-5 mr-2 text-[#9e2a2f]" />
                                    <span>Servei: {review.service}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 animate-pulse">
                        <StarIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No hi ha valoracions encara</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Encara no tens valoracions de clients. Les valoracions apareixeran aquí quan els clients avaluïn els teus
                        serveis.
                    </p>
                </div>
            )}
        </div>
    )
}
