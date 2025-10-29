import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            const loadingToastId = toast.loading('Loading project details...');
            try {
                const response = await fetch(`https://protofolio-website-1.onrender.com/project/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data.success && data.project) {
                    setProject(data.project);
                    toast.success('Project loaded!', { id: loadingToastId });
                } else {
                    throw new Error('Project not found');
                }

            } catch (err) {
                console.error('Project Fetch Error:', err);
                toast.error('Failed to load project details.', { id: loadingToastId });
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProject();
        }
    }, [id, navigate]);

    if (isLoading) {
        return (
            <section className="py-20 text-center" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="max-w-4xl mx-auto px-4">
                    <p className="text-xl" style={{ color: 'var(--text-color)' }}>Loading project details...</p>
                </div>
            </section>
        );
    }

    if (!project) {
        return (
            <section className="py-20 text-center" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-extrabold text-red-600">Project Not Found</h2>
                    <button 
                        onClick={() => navigate('/')}
                        className="mt-4 px-6 py-2 rounded-lg transition-colors duration-200"
                        style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}>
                        Back to Home
                    </button>
                </div>
            </section>
        );
    }

    const hasImage = project.image && project.image.startsWith('http');

    return (
        <section className="py-16 sm:py-24" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 rounded-lg transition-colors duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                    ← Back to Projects
                </button>

                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    {hasImage && (
                        <div className="h-80 w-full overflow-hidden">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    
                    <div className="p-8">
                        <h1 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--text-color)' }}>
                            {project.title}
                        </h1>
                        
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            {project.description}
                        </p>

                        {project.technologies && project.technologies.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary-color)' }}>
                                    Technologies Used:
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, index) => (
                                        <span 
                                            key={index} 
                                            className="px-4 py-2 text-sm font-medium rounded-full"
                                            style={{ backgroundColor: 'var(--light-primary)', color: 'var(--primary-color)' }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.projectLink && (
                            <div className="mt-8">
                                <a 
                                    href={project.projectLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-6 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 hover:opacity-90"
                                    style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}>
                                    View Live Project →
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetail;