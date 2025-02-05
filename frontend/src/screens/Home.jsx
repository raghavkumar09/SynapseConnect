import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context'
import axiosInstance from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { ProjectCard } from '@/components/create-project-card';

function Home() {

    const { user } = useContext(UserContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosInstance.get('/projects/all'); // await added here
                console.log(response.data.allUserProject);
                setProjects(response.data.allUserProject);
            } catch (error) {
                console.log("Error getting projects:", error);
            }
        };

        fetchProjects(); // Call the async function
    }, [user]);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        console.log({ projectName });

        try {
            const response = await axiosInstance.post('/projects/create', { name: projectName });
            console.log(response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error.response.data);
        }
    }


    return (
        <main className="bg-gray-100 h-screen dark:bg-[#09090b]">
            <header className=" h-16 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white">Collaborative Project Manager</h1>
            </header>
            <section className="p-5 flex justify-center">
                <div className="flex justify-center">
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-center">Create Projects</h2>
                        <div className="projects flex flex-wrap gap-3">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="project p-4 border border-gray-500 rounded cursor-pointer hover:bg-gray-600 flex items-center">
                                <i className="ri-link"></i>
                                <span className="ml-2 text-center">New Project</span>
                            </button>

                        </div>
                    </div>
                </div>
            </section>
            <section className="p-5 flex justify-center ">
                <div className="flex flex-col pt-6 ">
                    <h2 className="text-2xl font-bold mb-4 text-center">your Projects</h2>
                    <div className="projects grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                        {projects.map((project) => (
                            <div key={project._id}
                                 onClick={() => navigate(`/project`, { state: { project } })}
                                 className="project flex flex-col w-full md:w-[200px] justify-center gap-4 p-4 border border-gray-500 rounded cursor-pointer hover:bg-gray-600 hover:text-white">
                                <span className="ml-2">{project.name}</span>
                                <div className="flex items-center">
                                    <p><small> <i className="ri-user-line"></i> Collaborators </small>:</p>
                                    <span className="ml-2">{project.users.length}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-10" style={{ display: isModalOpen ? 'flex' : 'none' }}>
                    <div className="m-auto rounded-md p-4" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                        <ProjectCard
                            handleCreateProject={handleCreateProject}
                            setProjectName={setProjectName}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </div>
                </div>
            )}
        </main>
    )
}

export default Home
