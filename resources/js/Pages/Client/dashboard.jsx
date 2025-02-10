import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";

//Moidificar el imports amb el components adequats

export default function dashboard() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">
                <MainContent />
            </main>
            <Footer />
        </div>
    );
};
