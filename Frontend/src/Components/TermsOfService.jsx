import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <section className="py-16 sm:py-24" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <Link to="/" className="inline-block mb-6 text-[--primary-color] hover:underline">
                        ← Back to Home
                    </Link>
                    
                    <h1 className="text-4xl font-extrabold mb-6" style={{ color: 'var(--primary-color)' }}>
                        Terms of Service
                    </h1>
                    
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 mb-6">
                            Please read these terms of service carefully before using our website.
                        </p>
                        
                        <h2 className="text-2xl font-bold mt-8 mb-4">Acceptance of Terms</h2>
                        <p className="mb-4">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                        
                        <h2 className="text-2xl font-bold mt-8 mb-4">Use License</h2>
                        <p className="mb-4">
                            Permission is granted to temporarily view the materials on ProfSite IT's website for personal, non-commercial transitory viewing only.
                        </p>
                        
                        <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
                        <p>
                            If you have any questions about these Terms, please contact us.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TermsOfService;