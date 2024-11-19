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
            // Send login request
            const response = await axios.post('https://rest-api-key.vercel.app/api/auth/login', { email, password });
            const { token, role,name,image } = response.data;

            // Check if token and role are in the response
            if (!token || !role || !name || !image) {
                setError('Login response missing token or role. Please contact support.');
                return;
            }

            // Store token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('name', name);
            localStorage.setItem('image', image);

            // Navigate based on user role
            if (role === 'Teacher') {
                
                navigate('/teacher/dashboard');
            } else if (role === 'Coordinator') {
                navigate('/coordinator/dashboard');
            } else {
                setError('Role not recognized. Please contact support.');
            }
        } catch (err) {
            setError('Invalid email or password');
            toast.error('Invalid email or password'); // Display toast notification
        }
    };

    return (
        <div className="min-h-screen w-full inset-0 bg-cover bg-[#A7BEAE]">
            <div className="absolute top-2 left-4 md:left-10 mt-3 lg:left-14 pt-7">
                <img src={logo} alt="Logo" className="h-16 w-full" />
            </div>
            <div className="justify-center mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[50px] items-center">
                    <div className="text-center flex flex-col justify-center items-center">
                        <div className="mb-8">
                            <h1 className="text-[40px] lg:text-[55px] font-bold text-white mt-[120px]">
                                Hello, Teacher!
                            </h1>
                            <h2 className="text-[30px] lg:text-[40px] font-thin text-slate-200 mt-4">
                                Welcome to your <br /> Online Teacher’s Portal
                            </h2>
                        </div>
                        <img src={teacherImage} alt="Teacher Illustration" className="w-full max-w-lg h-auto mt-2" />
                    </div>
                    <div>
                        <div className="h-[746px] lg:h-[600px] max-w-full bg-white rounded-l-[56px] mt-[40px] p-20 flex flex-col items-center justify-center">
                            <div>
                                <h2 className="text-[30px] lg:text-[39px] text-gray-700 mb-6 font-bold text-center">Login</h2>
                                <form onSubmit={handleLogin}>
                                    <div className="mb-6">
                                        <label className="text-gray-700 w-[430px] font-medium text-[18px] flex items-center">
                                            <CiUser className="text-[#BB5042] mb-2 w-6 h-6 mr-2" />
                                            Email
                                        </label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            name="email"
                                            type="email"
                                            placeholder="Enter Email"
                                            className={`w-[480px] placeholder:text-sm max-w-lg mt-1 p-3 focus:border-[#BB5042] focus:outline-none border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                            required
                                        />
                                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-700 text-[18px] w-[430px] font-medium flex items-center">
                                            <CiLock className="text-[#BB5042] mb-2 w-6 h-6 mr-2" />
                                            Password
                                        </label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            name="password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className={`w-full placeholder:text-sm max-w-lg mt-1 p-3 focus:border-[#BB5042] focus:outline-none border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                            required
                                        />
                                         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                    </div>
                                    <div className="text-right">
                                        <Link to="/" className="text-[#0866FF]">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full max-w-lg mt-10 h-[60px] p-3 bg-[#BB5042] text-[20px] text-white rounded-lg flex justify-center items-center"
                                    >
                                        Login
                                    </button>
                                </form>
                                {/* Display error messages */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teacherlogin;
