import React from "react";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import { Link } from "@inertiajs/react";

const PoliticaPrivacitat = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header theme="bg-gradient-to-r from-[#1f7275] to-[#01a0a6] text-white" />

            <main className="flex-1 py-16 px-6 lg:px-12 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-[#1f7275] mb-10">Política de Privacitat</h1>

                <div className="space-y-10 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Introducció</h2>
                        <p>La teva privacitat és important per a nosaltres. Aquesta política de privacitat explica com recollim, utilitzem, compartim i protegim la teva informació personal quan utilitzes els nostres serveis.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Quina informació recollim?</h2>
                        <p>Recollim informació personal quan t'inscrius al nostre servei, omples formularis, et poses en contacte amb nosaltres o interactues amb la nostra pàgina web. Aquesta informació pot incloure, entre altres, el teu nom, adreça de correu electrònic i qualsevol altra informació necessària per a processar la teva sol·licitud.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Com utilitzem la teva informació?</h2>
                        <p>La informació que recollim s'utilitza per a proporcionar-te els nostres serveis, comunicar-nos amb tu, i millorar la nostra pàgina web. També podem utilitzar la teva informació per a enviar-te actualitzacions, ofertes o informació relacionada amb els nostres serveis que considerem que poden ser del teu interès.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Com compartim la teva informació?</h2>
                        <p>No compartim la teva informació personal amb tercers, excepte quan sigui necessari per a proporcionar-te els nostres serveis o quan sigui requerit per la llei. Podem utilitzar serveis de tercers per a processar les dades o per a la gestió dels nostres serveis, però aquests estan subjectes a acords de confidencialitat.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Com protegim la teva informació?</h2>
                        <p>Prèviament prenem mesures de seguretat adequades per protegir la teva informació personal. Això inclou l'ús de xifratge de dades, controls d'accés i altres mesures tècniques i físiques per evitar l'accés no autoritzat a les teves dades.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Ús de Cookies</h2>
                        <p>Utilitzem cookies per millorar l'experiència de l'usuari al nostre lloc web. Les cookies són petits fitxers que es guarden al teu dispositiu quan visites el nostre lloc web. Les cookies ens ajuden a personalitzar la teva experiència i a analitzar l'ús de la nostra pàgina.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Quins són els teus drets?</h2>
                        <p>Tens el dret d'accedir, rectificar o suprimir les teves dades personals en qualsevol moment. Si vols exercir aquests drets o tens qualsevol pregunta sobre la nostra política de privacitat, no dubtis a posar-te en contacte amb nosaltres a través de la nostra pàgina de contacte.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Canvis a aquesta política</h2>
                        <p>Podem actualitzar aquesta política de privacitat periòdicament. T'informarem de qualsevol canvi mitjançant una actualització de la data d'entrada en vigor al final d'aquesta pàgina.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contacte</h2>
                        <p>Si tens qualsevol pregunta sobre aquesta política de privacitat, si us plau, contacta'ns.</p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PoliticaPrivacitat;
