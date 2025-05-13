import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('judge'); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password,
                role,
            });

            const { token, role: userRole } = response.data;
            console.log(response);
            localStorage.setItem('token', token);

            if (userRole === 'judge') {
                console.log("login success")
                navigate('/judge-dashboard');
            } else if (userRole === 'police') {
                navigate('/police-dashboard');
            } else if (userRole === 'jailor') {
                navigate('/jailor-dashboard');
            }
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center bg-black text-white h-screen p-10">
            <h1 className="text-3xl font-bold mb-8">Criminal Record Management</h1>

            <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium mb-2">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-700 text-white"
                    >
                        <option value="judge">Judge</option>
                        <option value="police">Police/CBI</option>
                        <option value="jailor">Jailor</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Log In
                </button>

                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
