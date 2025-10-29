import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="text-xl font-bold tracking-wider" 
                              style={{ color: 'var(--primary-color)' }}>
                            ProfSite-ai
                        </Link>
                        <p className="mt-4 text-[--text-color] opacity-70">
                            &copy; {currentYear} ProfSite IT. All rights reserved.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold" style={{ color: 'var(--primary-color)' }}>Quick Links</h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/" className="text-[--text-color] hover:text-[--primary-color] transition-colors duration-200">Home</Link>
                            </li>
                            <li>
                                <Link to="/projects" className="text-[--text-color] hover:text-[--primary-color] transition-colors duration-200">Projects</Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-[--text-color] hover:text-[--primary-color] transition-colors duration-200">Login</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold" style={{ color: 'var(--primary-color)' }}>Resources</h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="/resume.pdf" download className="text-[--text-color] hover:text-[--primary-color] transition-colors duration-200">Download Resume</a>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-[--text-color] hover:text-[--primary-color] transition-colors duration-200">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-[--text-color] hover:text-[--primary-color] transition-colors duration-200">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold" style={{ color: 'var(--primary-color)' }}>Connect</h4>
                        <div className="mt-4 space-y-2">
                            <Link to="/contact" className="text-[--text-color] block hover:text-[--primary-color] transition-colors duration-200">
                                Contact Us
                            </Link>
                            <div className="flex space-x-4 pt-2">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[--text-color] hover:text-[--accent-color] transition-colors duration-200">
                                    [LinkedIn]
                                </a>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[--text-color] hover:text-[--accent-color] transition-colors duration-200">
                                    [GitHub]
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
                    <p className="text-xs text-[--text-color] opacity-60">
                        Designed with creativity and code.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;