import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    const { companyData } = usePage().props;
    const companyInfo = companyData.company_details.info;
    const workers = companyData.company_details.workers;

    const handleAddWorker = () => {
        router.visit(route('workers.create'));
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                {/* Secció empresa */}
                <div className="bg-white p-6 rounded-lg shadow mb-4">
                    <h1 className="text-2xl font-bold mb-4">
                        Benvingut, {companyData.user_info.name}!
                    </h1>
                    <div className="space-y-2 mb-4">
                        <p>📌 Adreça: {companyInfo.address}</p>
                        <p>🏙 Ciutat: {companyInfo.city}</p>
                        <p>📞 Telèfon: {companyInfo.phone}</p>
                    </div>

                    {/* Botó per afegir treballador */}
                    <button
                        onClick={handleAddWorker}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        ➕ Afegir Treballador
                    </button>
                </div>

                {/* Secció treballadors */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Treballadors</h2>
                    {workers.length > 0 ? (
                        workers.map(worker => (
                            <div key={worker.id} className="mb-4 p-4 bg-gray-50 rounded">
                                <h3 className="font-medium">{worker.name}</h3>
                                <p>⏰ {worker.schedule}</p>
                                <p>📞 {worker.phone}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hi ha treballadors registrats</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
