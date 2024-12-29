import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../config/axios';

function Project() {
    const location = useLocation();

    const [isSiePannel, setIsSiePannel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [project, setProject] = useState(location.state.project);

    useEffect(() => {
        if (isModalOpen) {
            const fetchUsers = async () => {
                try {
                    const response = await axiosInstance.get('/users/all');
                    const usersData = response.data.users;
                    console.log("Users Data: ", usersData);
                    setUsers(usersData);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };
            fetchUsers();
        }
    }, [isModalOpen]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axiosInstance.get(`/projects/get-project/${location.state.project._id}`);
                const projectData = response.data.project;
                console.log("Project Data: ", projectData);
                setProject(projectData);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        }
        fetchProject();
    }, [location.state.project._id]);

    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(userId)) {
                // If user is already selected, remove them
                return prevSelected.filter(id => id !== userId);
            } else {
                // Otherwise, add the user
                return [...prevSelected, userId];
            }
        });
    };

    console.log("projectId1: ", location.state.project._id);

    const handleAddCollaborator = () => {
        console.log("Selected Users: ", selectedUsers);
        // Add your logic to handle multiple collaborators
        const addCollaborators = async () => {
            try {
                const response = await axiosInstance.put('/projects/add-user', { projectId: location.state.project._id, users: selectedUsers });
                console.log(response.data);

                // Close the modal
                setIsModalOpen(false);
            } catch (error) {

                console.error("Error adding collaborators:", error.response.data);
            }
        }

        addCollaborators();
    };


    // console.log(location.state);
    return (
        <main className='h-screen w-screen flex'>
            <section className='relative left h-full min-w-80 bg-red-200 flex flex-col'>
                <header className='w-full bg-slate-200 flex justify-between items-center p-2 px-4'>
                    <button className='flex justify-center items-center gap-1' onClick={() => setIsModalOpen(true)}>
                        <i className="ri-user-add-line"></i>
                        <p className='text-xs'>Collaborater</p>
                    </button>
                    <button className='p-2' onClick={() => setIsSiePannel(!isSiePannel)}>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="conversation flex-grow flex flex-col">
                    <div className="message flex-grow p-2 flex flex-col gap-2">
                        <div className="incoming-message max-w-56 bg-amber-200 p-2 rounded-md flex flex-col gap-2 w-fit">
                            <p className='text-xs opacity-45 '>abcd@gmail.com</p>
                            <p className='text-sm'>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="outgoing-message max-w-56 bg-amber-200 p-2 rounded-md flex flex-col gap-2 w-fit ml-auto">
                            <p className='text-xs opacity-45 '>abcd@gmail.com</p>
                            <p className='text-sm'>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className="inputArea flex w-full ">
                        <input className='min-w-[85%] p-2 border-none outline-none' type="text" placeholder='Type a message' />
                        <button className=' bg-slate-500 flex-grow '>
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`side-pannel absolute  w-full h-full bg-slate-100 animate ease-in-out duration-500 ${isSiePannel ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="crossButton w-full bg-slate-200 flex justify-between items-center p-2 px-4">
                        <h1 className='font-semibold'>Collaborators</h1>
                        <button className='p-2' onClick={() => setIsSiePannel(!isSiePannel)}>
                            <i className="ri-close-large-line"></i>
                        </button>
                    </div>
                    <div className='users flex flex-col gap-2 p-2'>
                        {project.users && project.users.map(user=>{
                            return (
                                <div key={user._id}  className="user flex gap-2 justify-start items-center bg-slate-300 rounded-md p-2 w-full hover:bg-slate-400 cursor-pointer">
                            <div className="avatar bg-slate-300 rounded-full flex justify-center items-center p-4 w-fit h-fit">
                                <i className="ri-user-3-line absolute"></i>
                            </div>
                            <h2>{user.email}</h2>
                        </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className='modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'
                    onClick={() => {
                        setIsModalOpen(false);
                        setSelectedUsers([]); // Reset selected users on close
                    }}
                >
                    <div
                        className='bg-slate-900 text-white p-5 rounded shadow-md w-80 relative'
                        onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the backdrop
                    >
                        <button
                            className='absolute top-3 right-3'
                            onClick={() => {
                                setIsModalOpen(false);
                                setSelectedUsers([]); // Reset selected users on close
                            }}
                        >
                            <i className="ri-close-line"></i>
                        </button>
                        <h2 className='text-lg mb-4'>Select Users : {selectedUsers.length}</h2>
                        <div className='users-list max-h-60 overflow-y-auto'>
                            {users.map(user => (
                                <div key={user._id} className='flex items-center gap-2 p-2'>
                                    <input
                                        type='checkbox'
                                        checked={selectedUsers.includes(user._id)}
                                        onChange={() => handleUserSelect(user._id)}
                                    />
                                    <span>{user.email}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                handleAddCollaborator();
                                setSelectedUsers([]); // Reset selected users after adding collaborators
                                setIsModalOpen(false); // Close modal
                            }}
                            disabled={selectedUsers.length === 0}
                            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 
                ${selectedUsers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Add Collaborator
                        </button>
                    </div>
                </div>
            )}




            <section className='right'></section>
        </main>
    )
}

export default Project
