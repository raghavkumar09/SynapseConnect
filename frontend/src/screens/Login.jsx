
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import axiosInstance from "@/config/axios";
import { LoginForm } from "../components/login-form"

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/users/login', { email, password });
            console.log("Login response:", response.data);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.error("Error logging in:", error.response);
            throw new Error(error.response.data.message);
        }
    };
    return (
        <main className='relative '>
            <div className="grid min-h-screen lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex flex-1 items-center justify-center ">
                        <div className="w-full max-w-xs">
                            <LoginForm
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
                <div className="relative hidden bg-muted lg:block dark:bg-white">
                    <img
                        src="/ai-chat.jpg"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover  "
                    />
                </div>
            </div>
        </main>
    )
}
