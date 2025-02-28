import { Waypoints } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import axiosInstance from "@/config/axios";
import { LoginForm } from "../components/register-from"

export default function Register() {
    const [email, setEmail] = useState('');
    // const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/users/register', {
                payload: { email, password }
            });

            localStorage.setItem('token', response.data.token);
            setUser(response.data.data);
            
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="grid min-h-svh lg:grid-cols-2 ">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Waypoints className="size-4" />
                        </div>
                        SynapseConnect
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
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
    )
}
