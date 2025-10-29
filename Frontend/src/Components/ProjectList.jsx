import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
// Assuming ProjectUpdateForm is a modal/form component for updates

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getAuthToken = () => localStorage.getItem('authToken');
    const fetchProjects = async () => {
        const API_URL = 'https://protofolio-website-1.onrender.com/project/all'; 
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.success) {
                setProjects(data.projects);
            }
        } catch (err) {
            toast.error("Failed to load projects for management.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);
    const handleDelete = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        const deleteToastId = toast.loading(`Deleting project ${projectId}...`);
        const DELETE_URL = `https://protofolio-website-1.onrender.com/project/${projectId}`; // Your DELETE route
        
        try {
            const response = await fetch(DELETE_URL, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`, // AUTH REQUIRED
                },
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success('Project deleted successfully!', { id: deleteToastId });
                fetchProjects(); // Refresh the list
            } else {
                toast.error(data.message || 'Deletion failed. Check authorization.', { id: deleteToastId });
            }
        } catch (error) {
            toast.error('Network error during deletion.', { id: deleteToastId });
        }
    };
    const handleUpdate = (project) => {
        toast.info(`Triggering update for project: ${project.title}. (You need a dedicated UpdateForm component/modal here)`, { duration: 4000 });
    };

    if (isLoading) return <p>Loading projects for management...</p>;

    return (
        <div>
            <h4 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>Manage Existing Projects ({projects.length})</h4>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {projects.map(project => (
                    <div key={project._id} className="p-4 border rounded-lg shadow flex justify-between items-center transition-shadow hover:shadow-md">
                        <span className="font-semibold">{project.title}</span>
                        <div className="space-x-2">
                            <button 
                                onClick={() => handleUpdate(project)} 
                                className="py-1 px-3 text-sm rounded-md text-white transition-colors"
                                style={{ backgroundColor: 'var(--primary-color)' }}>
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(project._id)} 
                                className="py-1 px-3 text-sm rounded-md bg-red-600 text-white transition-colors hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;