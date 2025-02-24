import React, { useState } from "react";

// Dades dels serveis (sense Oficines ni Industrial)
const servicesData = [
    {
        id: 1,
        name: "Neteja de Casa",
        description:
            "Neteja professional per la teva llar. Aquest servei és altament recomanat per la seva qualitat.",
        image:
            "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2018/06/limpieza-casa-cubo-fregona.jpg?tf=3840x",
        type: "casa",
        recommended: true,
    },
    {
        id: 2,
        name: "Neteja de Garatge",
        description: "Mantingues el teu garatge net i ordenat.",
        image:
            "https://limpiezasil.com/wp-content/uploads/2019/08/Limpieza-del-suelo.jpg",
        type: "garatge",
        recommended: false,
    },
    {
        id: 3,
        name: "Neteja de Cotxes",
        description:
            "Treu el millor del teu vehicle amb una neteja a fons.",
        image:
            "https://cdnwp.dealerk.com/8c54192f/uploads/sites/421/2022/11/resource6114e0ad86e55_kianovocarcom_como-limpiar-tu-coche-rapido-barato-y-con-un-resultado-espectacular.jpg",
        type: "cotxes",
        recommended: false,
    },
    {
        id: 4,
        name: "Neteja de Piscines",
        description:
            "Mantingues la teva piscina impecable i lluminosa.",
        image:
            "https://49d4bc374f.clvaw-cdnwnd.com/7fb7b3da9d31af8b3165321313d60f8c/200000476-2313623139/Limpieza%20de%20piscinas%2C%20Piscinas%20%C3%81lvarez.jpeg?ph=49d4bc374f",
        type: "piscina",
        recommended: false,
    },
];

// Opcions de filtre per serveis
const filterOptions = [
    { label: "Tots", value: "tots" },
    { label: "Casa", value: "casa" },
    { label: "Garatge", value: "garatge" },
    { label: "Cotxes", value: "cotxes" },
    { label: "Piscina", value: "piscina" },
];

// Dades d'empreses amb valoracions a Tortosa
const companiesData = [
    {
        id: 1,
        name: "Empresa Neteja Tortosa A",
        rating: 4.8,
        reviews: [
            "Excel·lent servei, molt professional.",
            "Molt recomanable per la seva rapidesa.",
        ],
        distance: 2,
    },
    {
        id: 2,
        name: "Empresa Neteja Tortosa B",
        rating: 4.6,
        reviews: [
            "Atenció excel·lent, resultats impecables.",
            "El millor servei a Tortosa.",
        ],
        distance: 5,
    },
    {
        id: 3,
        name: "Empresa Neteja Tortosa C",
        rating: 4.3,
        reviews: [
            "Serveis puntuals i de confiança.",
            "Amb millora, però recomanable.",
        ],
        distance: 8,
    },
    {
        id: 4,
        name: "Empresa Neteja Tortosa D",
        rating: 4.0,
        reviews: [
            "Qualitat acceptable, preu competitiu.",
        ],
        distance: 12,
    },
    {
        id: 5,
        name: "Empresa Neteja Tortosa E",
        rating: 3.8,
        reviews: [
            "Servei correcte, amb marge de millora.",
        ],
        distance: 15,
    },
];

// Component per mostrar la valoració amb estrelles
function StarRating({ rating }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <svg
                key={"full" + i}
                className="w-5 h-5 text-yellow-500 inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69z" />
            </svg>
        );
    }
    if (halfStar) {
        stars.push(
            <svg
                key="half"
                className="w-5 h-5 text-yellow-500 inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69z" />
            </svg>
        );
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <svg
                key={"empty" + i}
                className="w-5 h-5 text-gray-300 inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69z" />
            </svg>
        );
    }
    return <div className="flex">{stars}</div>;
}

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("tots");
    const [maxDistance, setMaxDistance] = useState(10);

    // Filtrar els serveis segons el filtre seleccionat i la cerca
    const filteredServices = servicesData.filter((service) => {
        const matchesFilter =
            selectedFilter === "tots" || service.type === selectedFilter;

        // Combina els camps en una sola cadena
        const combinedText = (
            service.name +
            " " +
            service.description +
            " " +
            service.type
        ).toLowerCase();

        // Tokenitza la cerca: es divideix en paraules i s'eliminen espais en blanc
        const searchTokens = searchQuery
            .toLowerCase()
            .split(" ")
            .filter((token) => token !== "");

        // Comprova que cada token aparegui en la cadena combinada
        const matchesSearch = searchTokens.every((token) =>
            combinedText.includes(token)
        );

        return matchesFilter && matchesSearch;
    });


    // Filtrar les empreses segons la distància
    const filteredCompanies = companiesData.filter(
        (company) => company.distance <= maxDistance
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner expansiu amb fons blau clar */}
            <section className="w-full bg-blue-100 p-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Slava Inc.</h1>
                    <p className="text-lg text-gray-600 mb-4">
                        Per mantindre un espai net i ordenat
                    </p>
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Cerca al teu netador ideal"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1f7275]"
                        />
                        <button className="absolute right-0 top-0 h-full px-4 bg-[#1f7275] hover:bg-[#01a0a6] text-white rounded-full flex items-center justify-center">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* Filtres de serveis */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setSelectedFilter(option.value)}
                                className={`px-4 py-2 rounded-full border ${
                                    selectedFilter === option.value
                                        ? "bg-[#1f7275] text-white border-[#1f7275]"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Layout principal: 2/3 per serveis i 1/3 per valoracions d'empreses */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* Secció de serveis (2/3 de l'espai) */}
                <section className="md:col-span-2">
                    <h2 className="text-2xl font-semibold mb-4">Quins serveis necesites?</h2>
                    {filteredServices.length === 0 ? (
                        <p className="text-gray-600">No s'han trobat serveis.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {filteredServices.map((service) => (
                                <div
                                    key={service.id}
                                    className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                                        service.recommended ? "border-4 border-[#1f7275]" : ""
                                    }`}
                                >
                                    <div className="relative">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        {service.recommended && (
                                            <span className="absolute top-2 left-2 bg-[#1f7275] text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Recomanat
                      </span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                                        <p className="text-gray-600 mb-4">{service.description}</p>
                                        <button className="bg-[#1f7275] hover:bg-[#01a0a6] text-white px-4 py-2 rounded">
                                            Contacta
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Secció de valoracions d'empreses */}
                <section className="md:col-span-1">
                    <h2 className="text-2xl font-semibold mb-4">Empreses a Tortosa</h2>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Filtra per distància:</span>
                            <div className="flex items-center">
                                <span className="mr-2">{maxDistance} km</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={maxDistance}
                                    onChange={(e) => setMaxDistance(Number(e.target.value))}
                                    className="w-32"
                                />
                            </div>
                        </div>
                        {filteredCompanies.length === 0 ? (
                            <p className="text-gray-600 text-sm">
                                No s'han trobat empreses dins de {maxDistance} km.
                            </p>
                        ) : (
                            filteredCompanies.map((company) => (
                                <div key={company.id} className="border-b pb-4 mb-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold">{company.name}</h3>
                                        <StarRating rating={company.rating} />
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Distància: {company.distance} km
                                    </p>
                                    <div className="mt-2 text-gray-700 text-sm">
                                        {company.reviews.slice(0, 2).map((review, idx) => (
                                            <p key={idx}>- {review}</p>
                                        ))}
                                    </div>
                                    <button className="mt-2 bg-[#1f7275] hover:bg-[#01a0a6] text-white px-4 py-2 rounded text-sm">
                                        Més Info
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
