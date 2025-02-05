import { Waypoints } from "lucide-react"
import { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../context/user.context'
import { Dropdown } from "./dropdown";

function Header() {
    const { user } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="bg-gray-100 py-4 shadow-md fixed top-0 left-0 right-0 z-50 w-full text-black">
            <div className="container mx-auto flex justify-between items-center relative px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="flex items-center">
                    <NavLink to="/" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Waypoints className="size-4" />
                        </div>
                        SynapseConnect
                    </NavLink>
                </div>
                <div className="flex items-center">
                    {user ? (
                        <div className="relative">
                            <Dropdown
                                dropdownOpen={dropdownOpen}
                                setDropdownOpen={setDropdownOpen}
                                user={user}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center ">
                            {location.pathname !== '/login' && (
                                <NavLink
                                    to="/login"
                                    className="text-gray-900 hover:font-semibold bg-slate-400 px-5 py-2 rounded-md"
                                >
                                    Login
                                </NavLink>
                            )}
                            {location.pathname !== '/register' && (
                                <NavLink
                                    to="/register"
                                    className="text-gray-900 hover:font-semibold  bg-slate-400 px-5 py-2 rounded-md"
                                >
                                    Signup
                                </NavLink>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;