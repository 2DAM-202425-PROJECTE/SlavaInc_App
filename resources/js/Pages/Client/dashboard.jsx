// resources/js/Pages/ClientDashboard.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ClientDashboard() {
    return (
        <div>
            <Head>
                <title>Client Dashboard</title>
            </Head>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-blue-600">Benvingut, Client!</h1>
                <p className="mt-4 text-gray-700">
                    Aquest és el teu panell de control. Aquí pots gestionar les teves comandes, veure els teus productes preferits i més.
                </p>
                <div className="mt-6">
                    <a
                        href="/profile"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Edita el teu perfil
                    </a>
                </div>
            </div>
        </div>
    );
}
