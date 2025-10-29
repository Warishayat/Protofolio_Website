import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <section className="py-16 sm:py-24" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <Link to="/" className="inline-block mb-6 text-[--primary-color] hover:underline">
                        ← Back to Home
                    </Link>
                    
                    <h1 className="text-4xl font-extrabold mb-6" style={{ color: 'var(--primary-color)' }}>
                        Privacy Policy
                    </h1>
                    
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 mb-6">
                            Your privacy is important to us. This privacy policy explains what personal data we collect and how we use it.
                        </p>
                        
                        <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
                        <p className="mb-4">
                            We collect information you provide directly to us, such as when you contact us through our website forms.
                        </p>
                        
                        <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
                        <p className="mb-4">
                            We use the information we collect to respond to your inquiries and improve our services.
                        </p>
                        
                        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us through our contact page.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;