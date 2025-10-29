import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section 
            className="relative bg-white py-20 md:py-32 overflow-hidden" 
            style={{ 
                backgroundImage: `linear-gradient(to right, var(--light-primary) 0%, rgba(255,255,255,0.8) 50%, var(--bg-color) 100%)`
            }}>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    
                    {/* Welcome Text */}
                    <p className="text-lg font-semibold uppercase tracking-wider mb-4" 
                       style={{ color: 'var(--accent-color)' }}>
                        Welcome to My Portfolio
                    </p>
                    
                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight" 
                        style={{ color: 'var(--text-color)' }}>
                        I'm Waris Hayat,
                        <span className="block mt-2" style={{ color: 'var(--primary-color)' }}>
                            A Full Stack AI & ML Developer.
                        </span>
                    </h1>
                    
                    {/* Description */}
                    <p className="mt-8 text-lg sm:text-xl text-[--text-color] opacity-85 max-w-2xl mx-auto leading-relaxed">
                        Crafting intelligent, data-driven solutions from concept to deployment. I bridge the gap between complex AI/ML models and robust, user-friendly full-stack applications, delivering innovative products that scale.
                    </p>
                    
                    {/* Buttons */}
                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact"
                              className="px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-lg text-white transition-all duration-300 transform hover:scale-105"
                              style={{ backgroundColor: 'var(--accent-color)' }}>
                            Connect with Me
                        </Link>
                        
                        <Link to="/projects"
                              className="px-8 py-4 border-2 text-base font-medium rounded-md bg-white transition-all duration-300 transform hover:bg-[--light-primary]"
                              style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}>
                            Explore Projects
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;