import React from 'react';
import { SlCalender } from "react-icons/sl";
import { useNavigate } from 'react-router';


const Navbar =()=>{
    const navigate = useNavigate();
    const username = JSON.parse(localStorage.getItem('username'));

    const handleLogout =()=>{
        navigate('/');
    }

    return(
        <div className='flex justify-between items-center pl-5 pr-5 pt-3 md:pl-10 md:pr-10 md:pt-5'>
            <div className='flex items-center text-cyan-400 font-mokoto'>
                <p>{'<>'} CODE WORD OF THE DAY {'</>'} </p>
            </div>
            <div className='flex flex-col md:flex-row gap-2 md:gap-4 text-white font-roboto'>
                <button 
                className="px-2 py-1 md:px-4 md:py-2 rounded-2xl border-2 border-cyan-400 text-sm text-white font-roboto font-semibold hover:bg-cyan-500 hover:text-[#020d34] transition duration-300 shadow-lg hover:shadow-cyan-500/50">Hello {username}</button>
                <button
                    className="px-2 py-1 md:px-4 md:py-2 rounded-2xl border-2 border-cyan-400 text-sm text-white font-roboto font-semibold hover:bg-cyan-500 hover:text-[#020d34] transition duration-300 shadow-lg hover:shadow-cyan-500/50" 
                    onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar;