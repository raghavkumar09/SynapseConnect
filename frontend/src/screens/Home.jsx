import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context'
import axiosInstance from '../config/axios';
import { useNavigate } from 'react-router-dom';

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
    <main>
      <div className="projects flex flex-wrap gap-3 p-5 items-center mx-auto">
        <button
          onClick={() => setIsModalOpen(true)}
          className="project p-4 border border-gray-500 rounded cursor-pointer hover:bg-gray-600">
          <i className="ri-link"></i>
          <span className="ml-2">New Project</span>
        </button>

        {projects.map((project) => (
          <div key={project._id}
            onClick={() => navigate(`/project`, { state: { project } })}
            className="project flex flex-col min-w-[200px] gap-4 p-4 border border-gray-500 rounded cursor-pointer hover:bg-gray-600 hover:text-white">
            <span className="ml-2">{project.name}</span>
            <div className="flex items-center">
              <p><small> <i className="ri-user-line"></i> Collaborators </small>:</p>
              <span className="ml-2">{project.users.length}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-cyan-950 text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button type="button" className=" rounded-md  focus:outline-none " onClick={() => setIsModalOpen(false)}>
                  <span className="sr-only">Close</span>
                  <i className="ri-close-fill"></i>
                </button>
              </div>
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium">Create Project</h3>
                  <div className="mt-2">
                    <form className="space-y-4" onSubmit={handleCreateProject}>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <div className="mt-1">
                          <input
                            onChange={(e) => setProjectName(e.target.value)}
                            value={projectName}
                            type="text" name="name" id="name" required className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 text-black outline-none" />
                        </div>
                      </div>
                      <div className="flex justify-between space-x-4">
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Create
                        </button>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Home
