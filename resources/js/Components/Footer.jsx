const Footer = () => {
    return (
        <footer className="bg-black text-white w-full" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-16">
                <div className="button-container pr-16">
                    <button className="brutalist-button button-1">
                        <div className="openai-logo">
                            <img
                                src="/assets/logo_transparent.png"
                                alt="Logo"
                                className="openai-icon"
                                style={{ width: 'auto', height: '40px' }} // Ajusta la mida del logo
                            />
                        </div>
                        <div className="button-text">
                            <span>SLAVA Inc.</span>
                        </div>
                    </button>
                </div>

                <div className="hidden sm:block sm:bg-gray-500 sm:p-[0.5px] sm:rounded"></div>

                <div className="sm:mt-4 lg:mt-8 xl:flex xl:justify-between xl:items-center space-y-8 lg:space-y-0">
                    <div className="flex items-center justify-center">
                        <p className="text-xs leading-5 text-gray-400">&copy; 2024 Slava, Inc. Tots els drets reservats.</p>
                    </div>

                    <div className="flex justify-center gap-x-10">
                        <a href="https://www.facebook.com/profile.php?id=61569425117395" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">Facebook</span>
                            <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/_slava_inc/" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">Instagram</span>
                            <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="https://x.com/slava_inc_m13" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">X</span>
                            <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
