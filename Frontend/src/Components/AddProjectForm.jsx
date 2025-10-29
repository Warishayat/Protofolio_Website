import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddProjectForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '', // Comma-separated string
        liveUrl: '', // New field
        githubUrl: '', // New field
    });
    const [imageFile, setImageFile] = useState(null); // State for the selected file
    const [isSubmitting, setIsSubmitting] = useState(false);

    const API_URL = 'https://protofolio-website-1.onrender.com/project/add';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Get the first file selected
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const loadingToastId = toast.loading('Adding new project...');

        const technologiesArray = formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0);
        
        // Create FormData object for multipart/form-data
        const dataToSend = new FormData();
        dataToSend.append('title', formData.title);
        dataToSend.append('description', formData.description);
        dataToSend.append('technologies', JSON.stringify(technologiesArray)); // Send as JSON string, backend parses it
        dataToSend.append('liveUrl', formData.liveUrl); // New field
        dataToSend.append('githubUrl', formData.githubUrl); // New field
        
        if (imageFile) {
            dataToSend.append('image', imageFile); // Append the image file
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
                },
                body: dataToSend, 
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success(data.message || `Project '${data.project.title}' added successfully!`, { id: loadingToastId });
                // Clear the form fields after successful submission
                setFormData({ 
                    title: '', 
                    description: '', 
                    technologies: '',
                    liveUrl: '',
                    githubUrl: '' 
                });
                setImageFile(null); // Clear the selected file
                
            } else {
                const errorMessage = data.message || 'Failed to add project. Please check inputs.';
                toast.error(errorMessage, { id: loadingToastId });
            }
        } catch (error) {
            console.error('Project Add Network Error:', error);
            toast.error('Could not connect to the server to add the project.', { id: loadingToastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>
                Add New Project
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                        Project Title *
                    </label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-[--primary-color] focus:border-[--primary-color]" 
                        style={{ border: '1px solid #d1d5db' }}
                    />
                </div>
                
                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                        Description *
                    </label>
                    <textarea 
                        name="description" 
                        id="description" 
                        rows="3" 
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-[--primary-color] focus:border-[--primary-color]"
                        style={{ border: '1px solid #d1d5db' }}
                    ></textarea>
                </div>

                {/* Technologies */}
                <div>
                    <label htmlFor="technologies" className="block text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                        Technologies (comma separated, e.g., React, Node.js, TensorFlow)
                    </label>
                    <input 
                        type="text" 
                        name="technologies" 
                        id="technologies" 
                        value={formData.technologies}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-[--primary-color] focus:border-[--primary-color]" 
                        placeholder="e.g., Python, PyTorch, Tailwind CSS"
                        style={{ border: '1px solid #d1d5db' }}
                    />
                </div>

                {/* Live URL */}
                <div>
                    <label htmlFor="liveUrl" className="block text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                        Live Project URL
                    </label>
                    <input 
                        type="url" 
                        name="liveUrl" 
                        id="liveUrl" 
                        value={formData.liveUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-[--primary-color] focus:border-[--primary-color]" 
                        placeholder="https://your-project.com"
                        style={{ border: '1px solid #d1d5db' }}
                    />
                </div>

                {/* GitHub URL */}
                <div>
                    <label htmlFor="githubUrl" className="block text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                        GitHub Repository URL
                    </label>
                    <input 
                        type="url" 
                        name="githubUrl" 
                        id="githubUrl" 
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-[--primary-color] focus:border-[--primary-color]" 
                        placeholder="https://github.com/username/repo"
                        style={{ border: '1px solid #d1d5db' }}
                    />
                </div>
                
                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                        Project Image
                    </label>
                    <input 
                        type="file" 
                        name="image" 
                        id="image" 
                        accept="image/*" // Only accept image files
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-full file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-[var(--light-primary)] file:text-[var(--primary-color)]
                                   hover:file:bg-[var(--primary-color)] hover:file:text-white transition-colors duration-200 cursor-pointer"
                    />
                    {imageFile && (
                        <p className="mt-2 text-sm text-gray-600">Selected file: {imageFile.name}</p>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 border border-transparent rounded-md shadow-lg text-white text-lg font-medium transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Project to Portfolio'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProjectForm;