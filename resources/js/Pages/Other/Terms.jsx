import React from "react";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import { Link } from "@inertiajs/react";

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />

            <main className="flex-1 py-16 px-6 lg:px-12 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-[#1f7275] mb-10">Termes i Condicions</h1>

                <div className="space-y-10 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Introducció</h2>
                        <p>Els presents termes i condicions regeixen l'ús del nostre lloc web i els serveis associats. En utilitzar el nostre lloc web, acceptes aquests termes i condicions. Si no estàs d'acord amb aquests termes, si us plau, no utilitzis els nostres serveis.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Acceptació dels Termes</h2>
                        <p>En utilitzar els serveis del nostre lloc web, accepts aquests termes i condicions. En cas que no estiguis d'acord amb qualsevol part d'aquests termes, no utilitzis els nostres serveis.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Serveis Proporcionats</h2>
                        <p>El nostre lloc web ofereix una sèrie de serveis, incloent-hi serveis de neteja domèstica, neteja d'oficines i altres serveis relacionats. Ens reservem el dret de modificar, suspendre o cancel·lar qualsevol servei en qualsevol moment sense previ avís.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Responsabilitats de l'usuari</h2>
                        <p>L'usuari es compromet a utilitzar els serveis de manera legal i no infrigir cap llei ni els drets de tercers. També es compromet a proporcionar informació verídica i completa quan utilitzi el nostre lloc web i els serveis associats.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Registre d'usuari i seguretat del compte</h2>
                        <p>Per accedir a certs serveis, pots ser requerit per registrar un compte. Ets responsable de mantenir la seguretat del teu compte, incloent la protecció de la contrasenya. Ens has d'informar immediatament sobre qualsevol ús no autoritzat del teu compte.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Termes de Pagament</h2>
                        <p>Els preus dels nostres serveis es publicaran a la nostra pàgina web. Els pagaments es realitzaran mitjançant els mètodes de pagament acceptats en el lloc web. Ens reservem el dret de modificar els preus en qualsevol moment, però els canvis no afectaran les comandes ja processades.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Privacitat i Protecció de Dades</h2>
                        <p>Com a part dels nostres serveis, recollim dades personals que són utilitzades de conformitat amb la nostra política de privacitat. Tots els usuaris tenen els drets sobre les seves dades personals tal com s'especifica a la nostra política de privacitat.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Limitació de Responsabilitat</h2>
                        <p>No ens fem responsables de danys indirectes, especials o consequencials derivats de l'ús dels nostres serveis. La nostra responsabilitat es limita a l'import pagat pels serveis contractats.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Terminació</h2>
                        <p>Ens reservem el dret de suspendre o cancel·lar el teu accés als serveis en qualsevol moment si incompleixes aquests termes i condicions. En cas de terminació, perdràs tots els drets d'accés als serveis i contingut associats.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Canvis als Termes</h2>
                        <p>Podem actualitzar aquests termes i condicions periòdicament. Quan es produeixin canvis, actualitzarem la data d'entrada en vigor d'aquesta pàgina. T'animem a revisar els termes de manera regular per estar informat sobre els canvis.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contacte</h2>
                        <p>Si tens qualsevol pregunta o dubte sobre aquests termes i condicions, pots contactar-nos.</p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Terms;
