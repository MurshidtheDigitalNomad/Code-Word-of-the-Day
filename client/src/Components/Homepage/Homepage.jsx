import React from 'react';
import {Link} from 'react-router-dom';

const Homepage=()=>{
    return(
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-black via-[#020d34] to-[#011270] text-white font-sans px-4">
                <h1 className="text-3xl md:text-4xl font-bold font-techy text-center tracking-wide mb-6">
                EXPLORE THE<br />WORLD OF TECH
                </h1>

                <h2 className="text-4xl md:text-5xl text-center font-extrabold font-mokoto text-cyan-500 tracking-widest mb-12" data-text="ONE WORD AT A TIME..">
                ONE WORD AT A TIME...
                </h2>

            <div className="flex space-x-6">

            <Link to='login'><button className="border-2 font-roboto border-cyan-400 px-8 py-2 rounded-full text-white hover:bg-cyan-500 transition duration-300 shadow-lg hover:shadow-cyan-500/50">
                LOG IN
            </button></Link>

            <Link to='signup'><button className="border-2 font-roboto border-cyan-400 px-8 py-2 rounded-full text-white hover:bg-cyan-500 transition duration-300 shadow-lg hover:shadow-cyan-500/50">
                SIGN UP
            </button></Link>
            </div>
        </div>
    )
}

export default Homepage;