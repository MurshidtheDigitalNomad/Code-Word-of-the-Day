import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const SignUp=()=>{
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords do not match, please try again.");
            return;
        }

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signup`, formData);
            if(response.status === 200){
                toast.success("Account created successfully, please sign in.");

                localStorage.setItem('username', JSON.stringify(response.data.user.username));
                navigate(`/userPage/${response.data.user.username}`)
            }else{
                toast.error('Internal server error, please try again later.');
            }

        }catch(err){
            console.error(err);
            toast.error('An error occurred while creating the user, please try again later.');
        }
    
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex justify-center items-center w-full">
                <form onSubmit={handleSubmit} className="relative bg-transparent p-8 rounded-2xl border-4 border-cyan-400 shadow-md w-[460px]  font-roboto flex flex-col items-center">
                    
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#070712] px-6 text-4xl font-bold font-techy text-[#06b6d4]">
                        Sign Up
                    </span>
                    <div className="mb-8" />
                    <div className="mb-6 w-full flex flex-col items-center">
                        <label htmlFor="username" className="block text-white mb-2 w-full text-left">
                            Please enter your name:
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.name}
                            required
                            name="name"
                            placeholder='Enter your name'
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-transparent"
                            
                        />
                    </div>
                    <div className="mb-6 w-full flex flex-col items-center">
                        <label htmlFor="username" className="block text-white mb-2 w-full text-left">
                            Create your unique username:
                        </label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder='mastercoder16'
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-transparent"
                            
                        />
                    </div>
                    <div className="mb-6 w-full flex flex-col items-center">
                        <label htmlFor="password" className="block text-white mb-2 w-full text-left">
                            Create your password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password must be at least 8 characters long'
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-transparent"
                           
                        />
                    </div>
                    <div className="mb-6 w-full flex flex-col items-center">
                        <label htmlFor="password" className="block text-white mb-2 w-full text-left">
                            Confirm Password:
                        </label>
                        <input
                            type='password'
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Enter your password again'
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-transparent"
                           
                        />
                    </div>
                   <div>
                    <button
                    className="mt-2 px-8 py-2 rounded-2xl border-2 border-cyan-400 text-white font-roboto font-semibold bg-[#020d34] hover:bg-cyan-500 hover:text-[#020d34] transition duration-300 shadow-lg hover:shadow-cyan-500/50">
                        Sign In
                    </button>
                   </div>
                   <div className="mt-4 text-white font-roboto">
                       <p>Already have an account?  <Link to="/login" className="text-cyan-400 hover:underline">
                           Click here to log back in.
                      </Link>
                      </p>
                   </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
