import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Header from '@/Components/Header.jsx';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Edit({ worker }) {
    const { data, setData, put, processing, errors, setError, clearErrors } = useForm({
        name: worker.name,
        email: worker.email,
        phone: worker.phone || '',
        address: worker.address || '',
        schedule: worker.schedule || '',
    });

    // Validación del formato de schedule (HH:mm-HH:mm)
    const validateScheduleFormat = (value) => {
        if (!value) return true; // Campo vacío es válido
        const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar el formato de schedule
        if (!validateScheduleFormat(data.schedule)) {
            setError('schedule', 'El format de l\'horari ha de ser HH:mm-HH:mm (ex. 08:00-16:00)');
            return;
        } else {
            clearErrors('schedule'); // Limpiar el error si el formato es válido o el campo está vacío
        }

        // Enviar el formulario solo si no hay errores
        put(route('worker.update', worker.id));
    };

    // Validar schedule en cada cambio para mostrar el error inmediatamente
    const handleScheduleChange = (value) => {
        setData('schedule', value);
        if (value && !validateScheduleFormat(value)) {
            setError('schedule', 'El format de l\'horari ha de ser HH:mm-HH:mm (ex. 08:00-16:00)');
        } else {
            clearErrors('schedule');
        }
    };

    return (
        <div>
            <Header theme="bg-gradient-to-r from-[#600f0f] to-[#b81b1b] text-white" />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => window.history.back()}
                            className="text-[#9e2a2f] hover:text-[#600f0f] transition flex items-center"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Tornar enrere
                        </button>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">
                            Editar Treballador: {worker.name}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    required
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                    required
                                />
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telèfon</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                />
                                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adreça</label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                />
                                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horari</label>
                                <input
                                    type="text"
                                    value={data.schedule}
                                    onChange={(e) => handleScheduleChange(e.target.value)}
                                    placeholder="HH:mm-HH:mm (ex. 08:00-16:00)"
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#9e2a2f] focus:border-[#9e2a2f]"
                                />
                                {errors.schedule && <p className="text-red-600 text-sm mt-1">{errors.schedule}</p>}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 rounded-lg bg-[#9e2a2f] text-white font-semibold hover:bg-[#8a1e25] transition-all shadow-md hover:shadow-lg"
                                    disabled={processing || Object.keys(errors).length > 0}
                                >
                                    {processing ? 'Actualitzant...' : 'Actualitzar Treballador'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
