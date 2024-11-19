import React, { useState } from 'react';
import logo from '../../assets/Teacher/logo1.png';
import teacherImage from '../../assets/Teacher/Teacherlogin.svg';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CiUser, CiLock } from 'react-icons/ci';

function Teacherlogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://rest-api-key.vercel.app/api/auth/login', { email, password });
            const { token, role, name, image } = response.data;

            if (!token || !role || !name || !image) {
                setError('Login response missing token or role. Please contact support.');
                return;
            }

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('name', name);
            localStorage.setItem('image', image);

            if (role === 'Teacher') {
                navigate('/teacher/dashboard');
            } else if (role === 'Coordinator') {
                navigate('/coordinator/dashboard');
            } else {
                setError('Role not recognized. Please contact support.');
            }
        } catch (err) {
            setError('Invalid email or password');
            toast.error('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#A7BEAE] flex flex-col items-center">
            <div className="absolute top-2 left-4 md:left-10 lg:left-14">
                <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mt-20 lg:mt-0 px-4 lg:px-0">
                <div className="text-center lg:text-left lg:w-1/2 flex flex-col items-center lg:items-start">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-10 lg:mt-20">
                        Hello, Teacher!
                    </h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-slate-200 mt-4">
                        Welcome to your <br /> Online Teacher’s Portal
                    </h2>
                    <img
                        src={teacherImage}
                        alt="Teacher Illustration"
                        className="w-10/12 max-w-md mt-6"
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-12 mx-auto w-full max-w-sm">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-700 text-center mb-6">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-6">
                                <label className="flex items-center text-gray-700 text-sm font-medium">
                                    <CiUser className="text-[#BB5042] w-6 h-6 mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full mt-2 p-3 border ${
                                        error ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:border-[#BB5042] focus:outline-none placeholder:text-sm`}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="flex items-center text-gray-700 text-sm font-medium">
                                    <CiLock className="text-[#BB5042] w-6 h-6 mr-2" />
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full mt-2 p-3 border ${
                                        error ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:border-[#BB5042] focus:outline-none placeholder:text-sm`}
                                    required
                                />
                            </div>
                            <div className="text-right">
                                <Link to="/" className="text-[#0866FF] text-sm">
                                    Forgot Password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-6 py-3 bg-[#BB5042] text-white rounded-lg font-medium text-lg"
                            >
                                Login
                            </button>
                        </form>
                        {error && <p className="text-red-500 text-center text-sm mt-4">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teacherlogin;
