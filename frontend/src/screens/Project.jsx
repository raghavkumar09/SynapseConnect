import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../config/axios';
import { socketConnectionInit, sendMessage, receiveMessage } from '../config/socket';
import { UserContext } from '../context/user.context';

function Project() {
    const location = useLocation();

    const [isSiePannel, setIsSiePannel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [project, setProject] = useState(location.state.project);
    const [messages, setMessages] = useState('');
    const messagesRef = useRef(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        if (isModalOpen) {
            const fetchUsers = async () => {
                try {
                    const response = await axiosInstance.get('/users/all');
                    const usersData = response.data.users;
                    setUsers(usersData);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };
            fetchUsers();
        }
    }, [isModalOpen]);

    const handleSendMessage = () => {
        if (messages.trim() !== '') {
            sendMessage('project-message', {
                message: messages,
                sender: user,  // to send only id from the user not sent the whole user object
            });
            console.log("messages", messages);
            appendOutgoingMessage(messages);
            setMessages('');
        }
    };

    useEffect(() => {
        socketConnectionInit(project._id);

        receiveMessage('project-message', data => {
            appendIncommingMessage(data);
        });

        const fetchProject = async () => {
            try {
                const response = await axiosInstance.get(`/projects/get-project/${location.state.project._id}`);
                const projectData = response.data.project;
                setProject(projectData);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        fetchProject();
    }, [location.state.project._id, project._id]);

    const appendIncommingMessage = (messageObj) => {
        console.log("messageObj", messageObj);
        if (messagesRef.current) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'incoming-message max-w-56 bg-amber-200 p-2 rounded-md flex flex-col gap-2 w-fit';
            messageDiv.innerHTML = `
                <p class='text-xs opacity-45'>${messageObj.sender.email}</p>
                <p class='text-sm'>${messageObj.message}</p>
            `;
            messagesRef.current.appendChild(messageDiv);
            scrollToBottom();
        } else {
            console.error("messagesRef.current is not available.");
        }
    };

    const appendOutgoingMessage = (message) => {
        console.log("appendOutgoingMessage", message);
        if (messagesRef.current) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'outgoing-message max-w-56 bg-amber-200 p-2 rounded-md flex flex-col gap-2 w-fit ml-auto';
            messageDiv.innerHTML = `
                <p class='text-xs opacity-45'>${user.email}</p>
                <p class='text-sm'>${message}</p>
            `;
            messagesRef.current.appendChild(messageDiv);
            scrollToBottom();
        } else {
            console.error("messagesRef.current is not available.");
        }
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter(id => id !== userId);
            } else {
                return [...prevSelected, userId];
            }
        });
    };

    const handleAddCollaborator = () => {
        const addCollaborators = async () => {
            try {
                await axiosInstance.put('/projects/add-user', {
                    projectId: location.state.project._id,
                    users: selectedUsers
                });
                setIsModalOpen(false);
            } catch (error) {
                console.error("Error adding collaborators:", error.response?.data || error);
            }
        };
        addCollaborators();
    };

    const scrollToBottom = () => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    };

    return (
        <main className='h-screen w-screen flex'>
            <section className='relative left h-full min-w-80 bg-red-200 flex flex-col'>
                <header className='w-full bg-slate-200 flex justify-between items-center p-2 px-4 absolute z-10 top-0'>
                    <button className='flex justify-center items-center gap-1' onClick={() => setIsModalOpen(true)}>
                        <i className="ri-user-add-line"></i>
                        <p className='text-xs'>Collaborator</p>
                    </button>
                    <button className='p-2' onClick={() => setIsSiePannel(!isSiePannel)}>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
                    <div ref={messagesRef} className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full no-scrollbar">
                    </div>
                    
                    <div className="inputArea flex w-full absolute bottom-0">
                        <input
                            value={messages}
                            onChange={(e) => setMessages(e.target.value)}
                            className='min-w-[85%] p-2 border-none outline-none'
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                            type="text" placeholder='Type a message' />
                        <button
                            onClick={handleSendMessage}
                            className='bg-slate-500 flex-grow'>
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`side-pannel absolute w-full h-full bg-slate-100 animate ease-in-out duration-500 ${isSiePannel ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="crossButton w-full bg-slate-200 flex justify-between items-center p-2 px-4">
                        <h1 className='font-semibold'>Collaborators</h1>
                        <button className='p-2' onClick={() => setIsSiePannel(!isSiePannel)}>
                            <i className="ri-close-large-line"></i>
                        </button>
                    </div>
                    <div className='users flex flex-col gap-2 p-2'>
                        {project.users && project.users.map((user) => (
                            <div key={user._id} className="user flex gap-2 justify-start items-center bg-slate-300 rounded-md p-2 w-full hover:bg-slate-400 cursor-pointer">
                                <div className="avatar bg-slate-300 rounded-full flex justify-center items-center p-4 w-fit h-fit">
                                    <i className="ri-user-3-line absolute"></i>
                                </div>
                                <h2>{user.email}</h2>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className='modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'
                    onClick={() => {
                        setIsModalOpen(false);
                        setSelectedUsers([]);
                    }}
                >
                    <div
                        className='bg-slate-900 text-white p-5 rounded shadow-md w-80 relative'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className='absolute top-3 right-3'
                            onClick={() => {
                                setIsModalOpen(false);
                                setSelectedUsers([]);
                            }}
                        >
                            <i className="ri-close-line"></i>
                        </button>
                        <h2 className='text-lg mb-4'>Select Users: {selectedUsers.length}</h2>
                        <div className='users-list max-h-60 overflow-y-auto'>
                            {users.map((user) => (
                                <div key={user._id} className="flex items-center gap-2 p-2">
                                    <input
                                        type="checkbox"
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
                                setSelectedUsers([]);
                                setIsModalOpen(false);
                            }}
                            disabled={selectedUsers.length === 0}
                            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 ${selectedUsers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
