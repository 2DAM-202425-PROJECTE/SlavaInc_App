"use client"

import { usePage } from '@inertiajs/react'

export default function CompanyProfileAdmin() {
    const { company } = usePage().props

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">{company.info.name}</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Informació General</h2>
                <p><strong>Email:</strong> {company.info.email}</p>
                <p><strong>Telèfon:</strong> {company.info.phone}</p>
                <p><strong>Web:</strong> {company.info.website}</p>
                <p><strong>Adreça:</strong> {company.info.address}, {company.info.city}, {company.info.state}, {company.info.zip_code}</p>
                <p><strong>Descripció:</strong> {company.info.description}</p>
                <p><strong>Fundada l'any:</strong> {company.info.founded_year}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Estadístiques</h2>
                <p><strong>Treballadors:</strong> {company.stats.activeWorkers} actius de {company.stats.totalWorkers}</p>
                <p><strong>Serveis:</strong> {company.stats.activeServices} actius de {company.stats.totalServices}</p>
                <p><strong>Projectes en curs:</strong> {company.stats.ongoingProjects}</p>
                <p><strong>Valoració mitjana:</strong> {company.stats.clientsRating} / 5</p>
                <p><strong>Ingressos mensuals:</strong> {company.stats.monthlyIncome.toLocaleString()} €</p>
                <p><strong>Creixement anual:</strong> {company.stats.yearlyGrowth}%</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Treballadors</h2>
                <ul className="list-disc list-inside">
                    {company.workers.map(worker => (
                        <li key={worker.id}>
                            {worker.name} — {worker.position} — {worker.email}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Serveis</h2>
                <ul className="list-disc list-inside">
                    {company.services.map(service => (
                        <li key={service.id}>
                            {service.custom_name || service.name} — {service.price_per_unit} €/{service.unit}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Valoracions de Clients</h2>
                {company.clientReviews.map(review => (
                    <div key={review.id} className="border p-3 rounded mb-2">
                        <p className="font-bold">{review.clientName}</p>
                        <p>{review.comment}</p>
                        <p className="text-sm text-gray-500">{review.date} — {review.service}</p>
                    </div>
                ))}
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Pla de Subscripció</h2>
                {company.plans.map(plan => (
                    <div key={plan.id} className={`p-4 mb-4 rounded border ${plan.isActive ? 'border-green-500' : 'border-gray-300'}`}>
                        <p className="font-bold">{plan.name} - {plan.price}€/mes {plan.isActive && <span className="text-green-600">(Actiu)</span>}</p>
                        <ul className="list-disc list-inside text-sm">
                            {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        </div>
    )
}
