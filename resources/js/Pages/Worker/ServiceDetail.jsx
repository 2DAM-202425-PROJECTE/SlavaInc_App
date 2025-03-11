import React from 'react';
import { usePage } from '@inertiajs/react';

const ServiceDetail = () => {
    const { service, date } = usePage().props;

    // Si date és null, mostra un missatge d'error o un valor per defecte
    if (!date) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Error: No s'ha trobat informació de la data.
                    </h1>
                </div>
            </div>
        );
    }

    // Converteix la data a un objecte Date vàlid
    const eventDate = date.date ? new Date(date.date) : null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Capçalera */}
            <section className="w-full bg-gradient-to-r from-[#7f1d1d] to-[#dc2626] py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Detalls del Servei
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Informació completa del servei assignat
                    </p>
                </div>
            </section>

            {/* Contingut principal */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Detalls del Servei: {service.name}
                    </h1>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Descripció</h2>
                            <p className="text-gray-600">{service.description}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Tipus de Servei</h2>
                            <p className="text-gray-600">{service.type}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Data i Hora</h2>
                            <p className="text-gray-600">
                                {eventDate ? eventDate.toLocaleString() : 'Data no disponible'}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Client</h2>
                            <p className="text-gray-600">Nom del client: {date.client?.name ?? 'Client no disponible'}</p>
                            <p className="text-gray-600">Telèfon: {date.client?.phone ?? 'Telèfon no disponible'}</p>
                            <p className="text-gray-600">Adreça: {date.client?.address ?? 'Adreça no disponible'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
