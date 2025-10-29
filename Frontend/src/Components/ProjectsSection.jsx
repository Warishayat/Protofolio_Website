import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const loadingToastId = toast.loading('Fetching portfolio projects...');
            try {
                const response = await fetch('https://protofolio-website-1.onrender.com/project/all');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data.success && data.projects.length > 0) {
                    setProjects(data.projects);
                    toast.success('Projects loaded successfully!', { id: loadingToastId });
                } else {
                    setProjects([]);
                    toast('No projects found to display.', { id: loadingToastId, icon: '💡' });
                }

            } catch (err) {
                console.error('Project Fetch Error:', err);
                setError(err.message);
                toast.error('Failed to load projects. Check API connection or URL.', { id: loadingToastId });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleCardClick = (project) => {
        // If project has liveUrl, redirect to live website
        if (project.liveUrl) {
            window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
        } else {
            // If no liveUrl, navigate to project details page
            navigate(`/project/${project._id}`);
        }
    };

    const renderProjectCard = (project) => {
        const hasImage = project.image && project.image.startsWith('http');
        const hasLiveUrl = project.liveUrl;
        
        return (
            <div 
                key={project._id} 
                onClick={() => handleCardClick(project)}
                className="bg-white rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.03] flex flex-col cursor-pointer"
                style={{ borderTop: `4px solid var(--primary-color)` }}>
                <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                    {hasImage ? (
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-opacity duration-500" 
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-center p-4 text-gray-500" style={{ backgroundColor: 'var(--light-primary)' }}>
                            [Image Not Available]
                        </div>
                    )}
                    {/* Live URL Badge */}
                    {hasLiveUrl && (
                        <div className="absolute top-3 right-3">
                            <span className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                                🌐 Live
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
                        {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                        {project.description.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies && project.technologies.map((tech, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 text-xs font-medium rounded-full"
                                style={{ backgroundColor: 'var(--light-primary)', color: 'var(--primary-color)' }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <section className="py-20 text-center" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-xl" style={{ color: 'var(--text-color)' }}>Loading projects...</p>
                </div>
            </section>
        );
    }

    if (error || projects.length === 0) {
        return (
            <section className="py-20 text-center" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-extrabold" style={{ color: 'var(--text-color)' }}>Project Gallery</h2>
                    <p className="mt-4 text-xl text-red-600">
                        {error ? `Error: ${error}` : 'No projects are currently available to display.'}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 sm:py-24" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" 
                        style={{ color: 'var(--text-color)' }}>
                        Featured Projects
                    </h2>
                    <p className="mt-4 text-xl" style={{ color: 'var(--text-color)', opacity: 0.85 }}>
                        Highlighting my work in Full Stack Development, AI, and Machine Learning.
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        💡 Click on any project card to visit the live website
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map(renderProjectCard)}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;