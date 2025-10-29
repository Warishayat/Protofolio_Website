import React from 'react';

const skillsData = [
    {
        category: 'Web Development',
        icon: 'FaCode', 
        color: 'var(--primary-color)',
        skills: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5/CSS3', 'REST APIs', 'TypeScript', 'Streamlit']
    },
    {
        category: 'AI / Machine Learning',
        icon: 'FaBrain', 
        color: 'var(--accent-color)',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Generative Models', 'MLOps','AI-AGENTS','Langchain','Langgraph','Llamaindex']
    },
    {
        category: 'Databases & Backend',
        icon: 'FaDatabase', 
        color: 'var(--text-color)',
        skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'Authentication (JWT)', 'REST API Design']
    },
    {
        category: 'Cloud & DevOps',
        icon: 'FaServer', 
        color: 'var(--primary-color)',
        skills: [ 'Docker', 'Git/GitHub', 'CI/CD (e.g., Jenkins/GitHub Actions)', 'Linux']
    }
];

const SkillsSection = () => {
    const getIcon = (iconName, color) => {
        return (
            <div 
                className="w-12 h-12 flex items-center justify-center rounded-full text-white mb-4" 
                style={{ backgroundColor: color }}>
                <span className="font-bold text-lg">{iconName.charAt(2)}</span>
            </div>
        );
    };

    return (
        <section className="py-16 sm:py-24" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" 
                        style={{ color: 'var(--text-color)' }}>
                        My Technical Toolkit
                    </h2>
                    <p className="mt-4 text-xl" style={{ color: 'var(--text-color)', opacity: 0.85 }}>
                        A comprehensive set of technologies covering the full development cycle, from data science to deployment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillsData.map((skillGroup, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-2xl"
                            style={{ 
                                borderTop: `4px solid ${skillGroup.color}` 
                            }}>
                            
                            {getIcon(skillGroup.icon, skillGroup.color)}

                            <h3 className="text-2xl font-semibold mb-4" 
                                style={{ color: skillGroup.color }}>
                                {skillGroup.category}
                            </h3>

                            <ul className="space-y-2">
                                {skillGroup.skills.map((skill, skillIndex) => (
                                    <li 
                                        key={skillIndex} 
                                        className="flex items-center text-base"
                                        style={{ color: 'var(--text-color)' }}>
                                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--accent-color)' }}>
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;