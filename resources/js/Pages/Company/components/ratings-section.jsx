"use client"

import {useState, useEffect} from "react"
import {StarIcon, ChatBubbleLeftIcon, CalendarIcon, WrenchScrewdriverIcon} from "@heroicons/react/24/outline"
import {StarIcon as StarIconSolid} from "@heroicons/react/24/solid"

export default function RatingsSection({company}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const clientReviews = company.clientReviews || []

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

        return (
            <>
                {Array.from({ length: fullStars }).map((_, i) => (
                    <StarIconSolid key={`full-${i}`} className="h-4 w-4 text-yellow-400" />
                ))}
                {hasHalfStar && (
                    <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <defs>
                            <linearGradient id="halfGrad">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#halfGrad)"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.232 3.772
                        h3.973c.969 0 1.371 1.24.588 1.81l-3.214 2.334
                        1.232 3.772c.3.921-.755 1.688-1.539 1.118L10 13.348
                        l-3.214 2.335c-.783.57-1.838-.197-1.539-1.118
                        l1.232-3.772-3.214-2.334c-.783-.57-.38-1.81.588-1.81
                        h3.973l1.232-3.772z"
                        />
                    </svg>
                )}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
                ))}
            </>
        )
    }


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("ca-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                    <StarIcon className="h-6 w-6 mr-2 text-[#9e2a2f]"/>
                    <h2 className="text-2xl font-bold text-gray-800">Valoracions de Clients</h2>
                </div>

                <div className="flex items-center bg-[#9e2a2f]/10 px-3 py-1.5 rounded-md">
                    <div className="flex items-center mr-2">{renderStars(company.stats.clientsRating)}
                    </div>
                    <span className="text-sm font-semibold text-[#9e2a2f]">{company.stats.clientsRating} / 5</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">Total de valoracions</h3>
                    <p className="text-2xl font-bold text-[#9e2a2f]">{company.stats.totalReviews}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">Valoracions positives</h3>
                    <p className="text-2xl font-bold text-green-600">{company.stats.positiveReviews}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">Valoracions negatives</h3>
                    <p className="text-2xl font-bold text-red-600">{company.stats.negativeReviews}</p>
                </div>
            </div>

            {clientReviews.length > 0 ? (
                <div className="space-y-6">
                    {clientReviews.map((review, index) => (
                        <div
                            key={review.id}
                            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-1 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{transitionDelay: `${index * 150}ms`}}
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">{review.clientName}</h3>
                                    <div className="flex items-center space-x-1 mb-2">{renderStars(review.rating)}</div>
                                </div>
                                <div className="mt-2 md:mt-0 flex items-center text-gray-500">
                                    <CalendarIcon className="h-4 w-4 mr-1"/>
                                    <span>{formatDate(review.date)}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-start">
                                    <ChatBubbleLeftIcon className="h-5 w-5 mr-2 text-[#9e2a2f] mt-1 flex-shrink-0"/>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center text-gray-700">
                                    <WrenchScrewdriverIcon className="h-5 w-5 mr-2 text-[#9e2a2f]"/>
                                    <span>Servei: {review.service || "Desconegut"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover:shadow-lg">
                    <div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 animate-pulse">
                        <StarIcon className="h-10 w-10 text-gray-400"/>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No hi ha valoracions encara</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Encara no tens valoracions de clients. Les valoracions apareixeran aquí quan els clients avaluïn
                        els teus
                        serveis.
                    </p>
                </div>
            )}
        </div>
    )
}
