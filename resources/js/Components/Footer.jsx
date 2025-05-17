import { Link } from '@inertiajs/react';

const Footer = () => {
    return (
        <footer className="bg-black text-white w-full" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-16">
                <div className="button-container pr-16 mb-6">
                    <button className="brutalist-button button-1">
                        <div className="openai-logo">
                            <img
                                src="/assets/logo_transparent.png"
                                alt="Logo"
                                className="openai-icon"
                                style={{ width: 'auto', height: '40px' }}
                            />
                        </div>
                        <div className="button-text">
                            <span>SLAVA Inc.</span>
                        </div>
                    </button>
                </div>

                <div className="hidden sm:block sm:bg-gray-500 sm:p-[0.5px] sm:rounded"></div>

                <div className="sm:mt-4 lg:mt-8 w-full flex flex-col lg:flex-row items-center justify-between gap-y-4 text-center lg:text-left">
                    {/* Esquerra */}
                    <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                        <p className="text-xs leading-5 text-gray-400">&copy; 2024 Slava, Inc. Tots els drets reservats.</p>
                    </div>

                    {/* Centre */}
                    <div className="w-full lg:w-1/3 flex justify-center space-x-6">
                        <Link href={route('privacy')} className="text-xs text-gray-400 hover:underline">
                            Política de Privacitat
                        </Link>
                        <Link href={route('terms')} className="text-xs text-gray-400 hover:underline">
                            Termes i Condicions
                        </Link>
                    </div>

                    {/* Dreta */}
                    <div className="w-full lg:w-1/3 flex justify-center lg:justify-end gap-x-6">
                        <a href="https://www.facebook.com/profile.php?id=61569425117395" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">Facebook</span>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/_slava_inc/" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">Instagram</span>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.331 3.608 1.306.975.975 1.244 2.242 1.306 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.331 2.633-1.306 3.608-.975.975-2.242 1.244-3.608 1.306-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.331-3.608-1.306-.975-.975-1.244-2.242-1.306-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.331-2.633 1.306-3.608C4.514 2.494 5.781 2.225 7.147 2.163 8.413 2.105 8.793 2.093 12 2.093zm0 1.838c-3.172 0-3.554.012-4.805.07-1.057.05-1.635.229-2.017.38a3.41 3.41 0 0 0-1.232.801 3.41 3.41 0 0 0-.801 1.232c-.151.382-.33.96-.38 2.017-.058 1.251-.07 1.633-.07 4.805s.012 3.554.07 4.805c.05 1.057.229 1.635.38 2.017.17.435.416.823.801 1.232.409.385.797.631 1.232.801.382.151.96.33 2.017.38 1.251.058 1.633.07 4.805.07s3.554-.012 4.805-.07c1.057-.05 1.635-.229 2.017-.38a3.41 3.41 0 0 0 1.232-.801 3.41 3.41 0 0 0 .801-1.232c.151-.382.33-.96.38-2.017.058-1.251.07-1.633.07-4.805s-.012-3.554-.07-4.805c-.05-1.057-.229-1.635-.38-2.017a3.41 3.41 0 0 0-.801-1.232 3.41 3.41 0 0 0-1.232-.801c-.382-.151-.96-.33-2.017-.38-1.251-.058-1.633-.07-4.805-.07zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 1-2.882 0 1.44 1.44 0 0 1 2.882 0z" />
                            </svg>
                        </a>
                        <a href="https://x.com/slava_inc_m13" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">X</span>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
