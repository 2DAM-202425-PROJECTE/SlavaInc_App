// Worker/Edit.jsx
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ worker }) {
    const { data, setData, put, processing, errors } = useForm({
        name: worker.name,
        email: worker.email,
        phone: worker.phone,
        address: worker.address,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('worker.update', worker.id)); // Petició PUT per actualitzar
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-4 text-white">Editar Treballador</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telèfon</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            required
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Adreça</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            required
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-[#9e2a2f] text-white p-3 rounded-lg shadow-sm"
                            disabled={processing}
                        >
                            {processing ? 'Actualitzant...' : 'Actualitzar Treballador'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
