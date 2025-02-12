// resources/js/Pages/WorkerDashboard.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function WorkerDashboard() {
    return (
        <div>
            <Head>
                <title>Worker Dashboard</title>
            </Head>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-green-600">Benvingut, Treballador!</h1>
                <p className="mt-4 text-gray-700">
                    Aquest és el teu panell de control. Aquí pots gestionar les comandes dels clients, veure estadístiques i més.
                </p>
                <div className="mt-6">
                    <a
                        href="/profile"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Edita el teu perfil
                    </a>
                </div>
            </div>
        </div>
    );
}
