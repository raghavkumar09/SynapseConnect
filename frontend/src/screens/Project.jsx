import { useState } from 'react'
import { useLocation } from 'react-router-dom'

function Project() {
    const location = useLocation();

    const [isSiePannel, setIsSiePannel] = useState(false);

    console.log(location.state);
    return (
        <main className='h-screen w-screen flex'>
            <section className='relative left h-full min-w-80 bg-red-200 flex flex-col'>
                <header className='w-full bg-slate-200 flex justify-end p-2 px-4'>
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
                    <div className="crossButton w-full bg-slate-200 flex justify-end p-2 px-4">
                        <button className='p-2' onClick={() => setIsSiePannel(!isSiePannel)}>
                            <i className="ri-close-large-line"></i>
                        </button>
                    </div>
                    <div className='users flex gap-2 p-2'>
                        <div className="user flex gap-2 justify-start items-center bg-slate-300 rounded-md p-2 w-full hover:bg-slate-400 cursor-pointer">
                            <div className="avatar bg-slate-300 rounded-full flex justify-center items-center p-4 w-fit h-fit">
                                <i className="ri-user-3-line absolute"></i>
                            </div>
                            <h2>Username</h2>
                        </div>
                    </div>
                </div>
            </section>


            <section className='right'></section>
        </main>
    )
}

export default Project
