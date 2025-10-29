import React from 'react';

// Define your career experiences here
const experienceData = [
    {
        id: 1,
        title: 'AI Engineer-Intern',
        company: 'Care Cloud',
        duration: 'july 2025 - August 2025',
        description: 'Led the development of scalable, data-driven applications, integrating cutting-edge Machine Learning models into production environments.',
        responsibilities: [
            'Designed and deployed a microservices architecture using Next.js and Node.js for high availability.',
            'Developed and optimized TensorFlow models for real-time inference, reducing latency by 30%.',
            'Design and develop the STT and TTS model using diffrent LLMS and services.',
            'Design and Develop the Chatbot Using LANGCHAIN,LANGGRAPH.'
        ]
    },
    {
        id: 2,
        title: 'Machine Learning Developer',
        company: 'Nerd-Flow',
        duration: 'March 2025 - june 2025',
        description: 'Focused on research and development of NLP and Computer Vision solutions for internal products.',
        responsibilities: [
            'Built custom text classification models using PyTorch and Hugging Face transformers.',
            'Collaborated with the backend team to transition Python-based models into production-ready APIs.',
            'Improved data pipeline efficiency for model training and feature engineering.'
        ]
    },
    {
        id: 3,
        title: 'AI-Engineer Intern',
        company: 'Artificizen',
        duration: 'jan 2025 - mar 2025',
        description: 'Began my career focusing on machine learning and Artifical Intelligence plus web development.',
        responsibilities: [
            'Developed responsive user interfaces using React and modern CSS techniques.',
            'Managed and optimized PostgreSQL databases for new application features.',
            'Participated in agile development cycles and code reviews.',
            'Design and develop the rag,multimodel rag, using agentic framework etc.'
        ]
    }
];

const ExperienceSection = () => {
    return (
        <section className="py-16 sm:py-24" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" 
                        style={{ color: 'var(--text-color)' }}>
                        Professional Experience
                    </h2>
                    <p className="mt-4 text-xl" style={{ color: 'var(--text-color)', opacity: 0.85 }}>
                        My journey in developing intelligent, full-stack solutions.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative pt-10">
                    {/* Vertical Divider Line */}
                    <div 
                        className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block" 
                        style={{ backgroundColor: 'var(--primary-color)', top: 0 }}>
                    </div>

                    {experienceData.map((job, index) => (
                        <div 
                            key={job.id} 
                            className={`mb-16 flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} w-full`}>
                            
                            <div className={`relative flex flex-col md:flex-row w-full md:w-1/2 ${index % 2 !== 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                                
                                {/* Timeline Dot (Visible on desktop only) */}
                                <div 
                                    className="hidden md:block absolute w-4 h-4 rounded-full border-4 z-10 top-0"
                                    style={{ 
                                        backgroundColor: 'var(--bg-color)', 
                                        borderColor: 'var(--accent-color)',
                                        left: index % 2 === 0 ? 'calc(100% + 4px)' : '-20px' 
                                    }}>
                                </div>
                                
                                {/* Job Card */}
                                <div 
                                    className={`bg-white p-6 rounded-xl shadow-2xl w-full transition-transform duration-300 hover:scale-[1.02]`}
                                    style={{ borderLeft: `4px solid ${index % 2 === 0 ? 'var(--accent-color)' : 'var(--primary-color)'}` }}>
                                    
                                    <h3 className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
                                        {job.title}
                                    </h3>
                                    <p className="text-lg font-semibold mt-1" style={{ color: 'var(--accent-color)' }}>
                                        {job.company}
                                    </p>
                                    <p className="text-sm italic mb-4 text-gray-500">
                                        {job.duration}
                                    </p>
                                    
                                    <p className="mb-4 text-gray-700">
                                        {job.description}
                                    </p>

                                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                                        Key Achievements/Responsibilities:
                                    </h4>
                                    <ul className="list-disc ml-5 space-y-1 text-gray-700">
                                        {job.responsibilities.map((resp, respIndex) => (
                                            <li key={respIndex}>{resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;