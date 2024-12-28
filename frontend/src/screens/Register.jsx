import React, { useState , useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';
import { UserContext } from '../context/user.context';

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/users/register', { email, password });
            console.log(response.data);

            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="w-full max-w-md mx-auto p-4 bg-indigo-400 text-black rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Register</h2>
        <form
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;