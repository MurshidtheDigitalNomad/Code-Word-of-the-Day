import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


const Login = () => {
    const [loginData, setLoginData]= useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, loginData);
            if (response.status === 200) {
                toast.success("Login successful!");

                localStorage.setItem('username', JSON.stringify(response.data.user.username));
                navigate(`/userPage/${response.data.user.username}`);
            } else {
                toast.error('Server issue, please try again later.');
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while logging in, please try again later.');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex justify-center items-center w-full">
                <form onSubmit={handleSubmit} className="relative bg-transparent p-8 rounded-2xl border-4 border-cyan-400 shadow-md w-[460px]  font-roboto flex flex-col items-center">
                    
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#070712] px-6 text-4xl font-bold font-techy text-[#06b6d4]">
                        Login
                    </span>
                    <div className="mb-8" />
                    <div className="mb-6 w-full flex flex-col items-center">
                        <label htmlFor="username" className="block text-white mb-2 w-full text-left">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            name="username"
                            value={loginData.username}
                            onChange={handleChange}
                            placeholder='Enter your username'
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-transparent"
                        />
                    </div>
                    <div className="mb-6 w-full flex flex-col items-center">
                        <label htmlFor="password" className="block text-white mb-2 w-full text-left">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                            placeholder='Enter your password'
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-transparent"
                        />
                    </div>
                   <div>
                   <button
                    className="mt-2 px-8 py-2 rounded-2xl border-2 border-cyan-400 text-white font-roboto font-semibold bg-[#020d34] hover:bg-cyan-500 hover:text-[#020d34] transition duration-300 shadow-lg hover:shadow-cyan-500/50">
                        Log In
                    </button>
                   </div>
                    <div className="mt-4 text-white font-roboto">
                        <p>Don't have an account?  <Link to="/signup" className="text-cyan-400 hover:underline">
                            Click here to sign up.
                       </Link>
                       </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;