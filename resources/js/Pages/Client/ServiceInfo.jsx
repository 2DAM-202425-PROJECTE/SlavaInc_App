import React, { useState, useMemo, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBuilding, faMapMarkerAlt, faFilter, faSort, faEuroSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from 'use-debounce';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { router } from '@inertiajs/react';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import { route } from "ziggy-js";

const backgroundImages = {
    casa: '/images/casa.jpg',
    garatge: '/images/garatge.jpg',
    piscina: '/images/piscina.jpg',
    cotxe: '/images/cotxe.jpg',
    altres: '/images/altres.jpg'
};

const CompanyCard = ({ company, service, serviceType, inputValue, selectedSize }) => {
    const pivot = company.pivot || (company.services?.[0]?.pivot);

    if (!pivot) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                Error: Dades de l'empresa no disponibles
            </div>
        );
    }

    const getPriceEstimate = () => {
        if (['casa', 'garatge', 'altres'].includes(serviceType)) {
            return inputValue ? pivot.price_per_unit * inputValue : 0;
        } else {
            switch (selectedSize) {
                case 'petit': return pivot.min_price;
                case 'mitjà': return (pivot.min_price + pivot.max_price) / 2;
                case 'gran': return pivot.max_price;
                default: return 0;
            }
        }
    };

    const priceEstimate = getPriceEstimate();
    const isValid = ['casa', 'garatge', 'altres'].includes(serviceType)
        ? inputValue !== '' && inputValue > 0
        : !!selectedSize;

    const handleReserve = () => {
        if (service.id === 5) {
            router.get(route('client.quotes.create', {
                service: service.id,
                company: company.id
            }));
        } else {
            router.get(route('client.cita.show', {
                service: service.id,
                company: company.id,
                input_value: inputValue || '',
                selected_size: selectedSize || ''
            }));
        }
    };

    const renderRating = () => {
        if (!company.average_rating || company.average_rating === 0) {
            return (
                <p className="text-sm text-gray-600">Encara no hi ha ressenyes disponibles.</p>
            );
        }

        const rating = company.average_rating;
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <div className="flex items-center gap-2" aria-label={`Valoració: ${rating.toFixed(1)} de 5`}>
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
                        key="half"
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
                <span className="text-gray-800 font-medium">{rating.toFixed(1)}/5</span>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white rounded-lg">
                    {pivot.logo ? (
                        <img
                            src={pivot.logo}
                            alt={`Logotip de ${company.name}`}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    ) : (
                        <FontAwesomeIcon icon={faBuilding} className="text-xl" />
                    )}
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                        <Link
                            href={route('client.companies.show', {
                                company: company.id,
                                serviceId: service.id
                            })}
                        >
                            {company.name}
                        </Link>
                    </h2>
                    {renderRating()}
                    <div className="text-gray-600 mt-2 flex items-start gap-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 mt-1" />
                        <div>
                            <p>{company.address}</p>
                            <p>{company.city}, {company.state} {company.zip_code}</p>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <button
                        onClick={handleReserve}
                        className="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white px-6 py-2 rounded-lg hover:from-[#01a0a6] hover:to-[#1f7275] transition-all shadow-md"
                    >
                        {service.id === 5 ? "Sol·licitar pressupost" : "Reservar"}
                    </button>
                </div>
            </div>

            <div className="md:hidden mt-4">
                <div className="mb-4">
                    <button
                        onClick={handleReserve}
                        className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white px-6 py-2 rounded-lg hover:from-[#01a0a6] hover:to-[#1f7275] transition-all shadow-md"
                    >
                        {service.id === 5 ? "Sol·licitar pressupost" : "Reservar"}
                    </button>
                </div>
                {service.id !== 5 && (
                    <p className="text-gray-700">
                        Preu estimat: {isValid ? `${priceEstimate.toFixed(2)} €` : 'Selecciona una opció'}
                    </p>
                )}
            </div>

            <div className="hidden md:block text-right">
                {service.id !== 5 && (
                    <>
                        {(serviceType === 'casa' || serviceType === 'garatge' || serviceType === 'altres') ? (
                            <p className="text-gray-700">
                                <FontAwesomeIcon icon={faEuroSign} className="mr-2" />
                                {serviceType === 'altres' ?
                                    `Preu per ${company.pivot.unit}: ${company.pivot.price_per_unit} €` :
                                    `Preu per m²: ${company.pivot.price_per_unit} €`
                                }
                            </p>
                        ) : (
                            <p className="text-gray-700">
                                <FontAwesomeIcon icon={faEuroSign} className="mr-2" />
                                Rang: {company.pivot.min_price} € - {company.pivot.max_price} €
                            </p>
                        )}
                        <p className="text-gray-700">
                            Preu estimat: {isValid ? `${priceEstimate.toFixed(2)} €` : 'Selecciona una opció'}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

const FiltersSection = ({ cities, states, filters, onFilterChange, onClear, onSortChange, onPriceRangeChange, serviceType }) => {
    const isAltres = serviceType === 'altres';

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faFilter} className="text-[#1f7275]" />
                Filtres
            </h3>

            <div className="space-y-4">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                        Cerca empresa
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Cerca per nom o adreça..."
                        value={filters.search}
                        onChange={(e) => onFilterChange('search', e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">Ciutat</label>
                    <select
                        id="city"
                        value={filters.city}
                        onChange={(e) => onFilterChange('city', e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                    >
                        <option value="">Totes les ciutats</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">Regió</label>
                    <select
                        id="state"
                        value={filters.state}
                        onChange={(e) => onFilterChange('state', e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                    >
                        <option value="">Totes les regions</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                {!isAltres && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar per preu</label>
                            <select
                                value={filters.sort}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                            >
                                <option value="">Sense ordenació</option>
                                <option value="asc">Més barat</option>
                                <option value="desc">Més car</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rang de preus</label>
                            <Slider
                                range
                                min={0}
                                max={5000}
                                defaultValue={[filters.minPrice, filters.maxPrice]}
                                onChange={(value) => onPriceRangeChange(value)}
                                trackStyle={{ backgroundColor: '#1f7275' }}
                                handleStyle={{ borderColor: '#1f7275' }}
                            />
                            <div className="text-sm text-gray-600 mt-2">
                                {filters.minPrice} € - {filters.maxPrice} €
                            </div>
                        </div>
                    </>
                )}

                <button
                    onClick={onClear}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Netejar filtres
                </button>
            </div>
        </div>
    );
};

const useFilters = (userCity) => {
    const [filters, setFilters] = useState({
        search: '',
        city: userCity || '',
        state: '',
        sort: '',
        minPrice: 0,
        maxPrice: 5000,
    });

    const updateFilter = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            city: userCity || '',
            state: '',
            sort: '',
            minPrice: 0,
            maxPrice: 5000,
        });
    };

    return { filters, updateFilter, resetFilters };
};

const ServiceInfo = ({ service, companies, priceEstimate, impersonating_client = false }) => {
    const { props } = usePage();
    const { auth } = props;

    const initialInput = {
        casa: 100,
        garatge: 20,
        piscina: '',
        cotxe: '',
        altres: ''
    };

    const [inputValue, setInputValue] = useState(initialInput[service.type]);
    const [selectedSize, setSelectedSize] = useState('');
    const { filters, updateFilter, resetFilters } = useFilters(auth?.user?.city || '');
    const [debouncedSearch] = useDebounce(filters.search, 300);
    const [visibleItems, setVisibleItems] = useState(10);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setInputValue(initialInput[service.type]);
        setSelectedSize('');
    }, [service.type]);

    const companiesWithRatings = useMemo(() => {
        return companies.map(company => {
            const reviews = company.reviews || [];
            const avg = reviews.length ? reviews.reduce((sum, r) => sum + r.rate, 0) / reviews.length : 0;
            return { ...company, average_rating: avg };
        });
    }, [companies]);

    const cities = useMemo(() => [...new Set(companiesWithRatings.map(c => c.city))], [companiesWithRatings]);
    const states = useMemo(() => [...new Set(companiesWithRatings.map(c => c.state))], [companiesWithRatings]);

    const filteredCompanies = useMemo(() => {
        let result = companiesWithRatings.filter(company => {
            const matchesSearch = company.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                company.address.toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchesCity = filters.city ? company.city === filters.city : true;
            const matchesState = filters.state ? company.state === filters.state : true;

            let priceEstimate;
            if (['casa', 'garatge', 'altres'].includes(service.type)) {
                priceEstimate = company.pivot.price_per_unit * (inputValue || 0);
            } else {
                switch (selectedSize) {
                    case 'petit': priceEstimate = company.pivot.min_price; break;
                    case 'mitjà': priceEstimate = (company.pivot.min_price + company.pivot.max_price) / 2; break;
                    case 'gran': priceEstimate = company.pivot.max_price; break;
                    default: priceEstimate = 0;
                }
            }

            const matchesPrice = priceEstimate >= filters.minPrice && priceEstimate <= filters.maxPrice;
            return matchesSearch && matchesCity && matchesState && matchesPrice;
        });

        if (filters.sort) {
            result = result.sort((a, b) => {
                let priceA;
                let priceB;
                if (['casa', 'garatge', 'altres'].includes(service.type)) {
                    priceA = a.pivot.price_per_unit * (inputValue || 0);
                    priceB = b.pivot.price_per_unit * (inputValue || 0);
                } else {
                    priceA = selectedSize === 'petit' ? a.pivot.min_price :
                        selectedSize === 'mitjà' ? (a.pivot.min_price + a.pivot.max_price) / 2 :
                            selectedSize === 'gran' ? a.pivot.max_price : 0;
                    priceB = selectedSize === 'petit' ? b.pivot.min_price :
                        selectedSize === 'mitjà' ? (b.pivot.min_price + b.pivot.max_price) / 2 :
                            selectedSize === 'gran' ? b.pivot.max_price : 0;
                }
                return filters.sort === 'asc' ? priceA - priceB : priceB - priceA;
            });
        }

        return result;
    }, [companiesWithRatings, debouncedSearch, filters, inputValue, selectedSize, service.type]);

    const handleSort = (value) => {
        updateFilter('sort', value);
    };

    const handlePriceRangeChange = (value) => {
        updateFilter('minPrice', value[0]);
        updateFilter('maxPrice', value[1]);
    };

    const loadMore = () => {
        setVisibleItems(prev => prev + 10);
    };

    const backgroundImage = backgroundImages[service.type] || '/images/default.jpg';

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {!impersonating_client && (
                <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />
            )}            <main
                className="flex-grow"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
                role="main"
            >
                <section className="w-full bg-gradient-to-r from-[#1f7275] to-[#01a0a6] py-8 px-6 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            {service.type === 'altres' ? (
                                <>
                                    <h1 className="text-2xl font-bold text-white">{service.custom_name}</h1>
                                    {service.description && (
                                        <p className="text-white/90">{service.description}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <h1 className="text-2xl font-bold text-white">{service.name}</h1>
                                    <p className="text-lg text-white/90">Empreses disponibles per aquest servei</p>
                                </>
                            )}
                        </div>
                        <Link href="/dashboard"
                              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <FontAwesomeIcon icon={faArrowLeft}/>
                            Tornar als serveis
                        </Link>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="mb-6 flex items-center gap-4 bg-white/90 p-4 rounded-lg shadow-md">
                        {service.id !== 5 && ['casa', 'garatge', 'altres'].includes(service.type) ? (
                            <>
                                <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                {service.type === 'altres' ? 'Unitats' : 'Metres quadrats (m²)'}
                                </p>
                                <div className="w-32">
                                    <input
                                        type="number"
                                        value={inputValue}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '' || (!isNaN(value) && value >= 0)) {
                                                setInputValue(value === '' ? '' : Number(value));
                                            }
                                        }}
                                        min="0"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                                        placeholder={service.type === 'altres' ? 'Unitats' : 'm²'}
                                    />
                                </div>
                            </>
                        ) : (service.type === 'piscina' || service.type === 'cotxe') ? (
                            <>
                                <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                    Mida
                                </p>
                                <div className="w-32">
                                    <select
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#1f7275] focus:border-[#01a0a6] transition-all"
                                    >
                                        <option value="">Selecciona</option>
                                        <option value="petit">Petita</option>
                                        <option value="mitjà">Mitjana</option>
                                        <option value="gran">Gran</option>
                                    </select>
                                </div>
                            </>
                        ) : null}

                        <div className="h-8 w-px bg-gray-300"></div>

                        <div className="flex-1 text-right">
                            <p className="text-gray-700">
                                Mostrant {Math.min(visibleItems, filteredCompanies.length)} de {filteredCompanies.length} resultats
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden bg-white text-[#1f7275] px-4 py-2 rounded-lg mb-4 shadow-md"
                    >
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                        {showFilters ? 'Amagar filtres' : 'Mostrar filtres'}
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className={`${showFilters ? 'block' : 'hidden'} md:block md:col-span-1 sticky top-24 h-fit`}>
                            <FiltersSection
                                cities={cities}
                                states={states}
                                filters={filters}
                                onFilterChange={updateFilter}
                                onClear={resetFilters}
                                onSortChange={handleSort}
                                onPriceRangeChange={handlePriceRangeChange}
                                serviceType={service.type}
                            />
                        </div>

                        <div className="md:col-span-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                            <div className="grid grid-cols-1 gap-6">
                                {filteredCompanies.slice(0, visibleItems).map((company) => (
                                    <CompanyCard
                                        key={company.id}
                                        company={company}
                                        service={service}
                                        serviceType={service.type}
                                        inputValue={inputValue}
                                        selectedSize={selectedSize}
                                    />
                                ))}
                            </div>

                            {visibleItems < filteredCompanies.length && (
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={loadMore}
                                        className="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white px-6 py-3 rounded-lg hover:from-[#01a0a6] hover:to-[#1f7275] transition-all shadow-lg"
                                    >
                                        Carregar més
                                    </button>
                                </div>
                            )}

                            {filteredCompanies.length === 0 && (
                                <div className="text-center py-12 bg-white/90 p-6 rounded-lg shadow-md">
                                    <div className="text-4xl mb-4 text-gray-400">🏢</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        Cap empresa coincideix amb els filtres
                                    </h3>
                                    <p className="text-gray-600">
                                        Prova amb diferents criteris de cerca
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
            </main>
            <Footer />
        </div>
    );
};

export default ServiceInfo;
