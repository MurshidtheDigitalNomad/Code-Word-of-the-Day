import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import { MdSettingsVoice } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import axios from 'axios';
import CodetionaryModal from '../CodetionaryModal/CodetionaryModal';
import WordCard from '../TechStackWordModal.jsx/TSWordModal';

const generateNewCodeWord = () => {
    const startDate = new Date('2025-06-01');
    const today = new Date();
    const latestDate = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return latestDate;

};

const UserPage = () => {
    const [loading, setLoading] = useState(true);
    const [codeWord, setCodeWord] = useState(null);
    const [techStack, setTechStack] = useState([]);
    const [showTechStack, setShowTechStack] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen]= useState(false);
    const [wordCard, setWordCard] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setLoading(false);
        }, 5000);

        const fetchCodeWord = async ()=>{
            const index= generateNewCodeWord();
            console.log(index)
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/codeword/${index}`);
                if(response.status === 200){
                    setCodeWord(response.data);
                }else{
                    alert("Error fetching code word");
                }

            }catch(error){
                console.error(error);
                alert("An error occurred while fetching the code word");
            }
        }
        fetchCodeWord();

        return ()=> clearTimeout(timer)
    }, [])
    
    const techStackWords = async () =>{
        if (!showTechStack) {
            try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/codeword/techstack`);
                if (response.status === 200) {
                    console.log(response.data);
                    setTechStack(response.data);
                } else {
                    alert("Error fetching tech stack words");
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while fetching the tech stack words");
            }
        }
        setShowTechStack(!showTechStack);
    }

    useEffect(()=>{
        const handleTechStackSearch = async () => {
            if (searchInput.trim() === '') {
                setSearchResults([]);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/codeword/techstack/search?search=${searchInput}`);
                if (response.status === 200) {
                    setSearchResults(response.data);
                } else {
                    alert("Error fetching tech stack words");
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while searching the tech stack");
            }
        };

        const delayBounce = setTimeout(() => {
            handleTechStackSearch();
        }, 300);

        return () => clearTimeout(delayBounce);
    }, [searchInput]);

    const codetionarySubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/codeword/codetionary`, data);
            if (response.status === 201) {
                alert("Code word added successfully");
            } else {
                alert("Server issue while adding code word");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while adding the code word");
        }
    };

    function calculateTimeRemaining() {
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setHours(24, 0, 0, 0);
        const diff = endOfDay.getTime() - now.getTime();
        return diff > 0 ? diff : 0;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (milliseconds) => {
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center justify-center mt-6">
           
            <div className="w-full md:w-[800px] h-auto md:h-[600px] bg-transparent flex flex-col justify-between p-4 md:p-6">
                <div className="h-1/2 border-4 border-cyan-400 rounded-xl mb-4 md:mb-6 flex items-center justify-center">
                    {loading? (<h1 
                    className='text-cyan-400 text-center font-mokoto text-4xl animate-pulse'>
                         TODAY'S CODE WORD <br/>OF THE DAY IS...
                    </h1>) : (
                        <div className='flex flex-col items-center'>
                            <h1
                            className="text-cyan-400 text-center font-mokoto text-4xl mb-4">
                                {codeWord?.name}
                            </h1>
                            <p
                            className='text-white text-xl font-roboto text-center max-w-[500px] py-2'>
                            {codeWord?.meaning}
                            </p>
                            <div className='flex flex-wrap justify-center gap-2'>
                                {codeWord?.field && Array.isArray(codeWord.field) ? (
                                    codeWord.field.map((field, index) => (
                                        <p key={index} className='text-l font-roboto text-white mt-3 border-2 border-cyan-400 rounded-xl px-4 py-1'>
                                            {field} 
                                        </p>
                                    ))
                                ) : null}
                            </div>
                            <p className="text-white text-l font-roboto mt-4">
                                Time until next code word: {formatTime(timeRemaining)}
                            </p>
                        </div>
                    )}    
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                    
                    <div className="w-full md:w-1/2 lg:w-[384px] border-4 border-cyan-400 rounded-xl flex flex-col items-start p-4">
                        <div className='add-word flex items-center justify-between w-full h-13 bg-transparent rounded-lg border-2 border-white-400'>
                            <CiSquarePlus className='add-icon text-white ml-2 mr-2' />
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="py-2 font-roboto text-white hover:underline transition duration-300 shadow-lg hover:shadow-cyan-500/50 focus:outline-none w-full"
                            >Add a new code word..</button>
                            <CodetionaryModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onSubmit={codetionarySubmit}
                            />
                        </div>
                        <div>
                            <h1 className='text-center font-mokoto text-white mt-4'>ADD WORD TO YOUR CODETIONARY</h1>
                        </div>

                    </div>
                  
                    <div className="w-full md:w-1/2 lg:w-[384px] border-4 border-cyan-400 rounded-xl flex flex-col items-start p-4 overflow-hidden">
                        <div className='search-bar flex items-center justify-between w-full h-13 bg-transparent rounded-lg border-2 border-white-400'>
                            <IoIosSearch className='search-icon text-white ml-2 mr-2' />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search your tech stack..."
                                className="py-2 bg-transparent font-roboto text-white focus:outline-none w-full"
                            />
                            
                        </div>
                      
                        <div className='mt-4 '>
                            {!showTechStack ? (
                                    <button 
                                    onClick={techStackWords}
                                    className="text-l text-white font-mokoto hover:bg-cyan-500 hover:text-[#020d34] transition duration-300 shadow-lg hover:shadow-cyan-500/50"
                                    >
                                    REVIEW YOUR TECH STACK
                                    </button>
                                ) : (
                                    <div className="overflow-y-auto h-[200px] w-[320px] pr-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent hover:scrollbar-thumb-cyan-400">
                                        {searchInput && searchResults.length > 0 ? (
                                            searchResults.map((word, id) => (
                                                <div key={id} className="border border-cyan-500 pb-2 mb-2 mr-4 rounded-lg">
                                                    <button
                                                        onClick={() => setSelectedWord(word)}
                                                        className="text-white font-roboto font-bold text-l ml-2 mt-1">{word.name}</button>
                                                    {selectedWord === word && (
                                                        <WordCard
                                                            isOpen={selectedWord === word}
                                                            onClose={() => setSelectedWord(null)}
                                                            word={word}
                                                        />
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            techStack.map((word, id) => (
                                                <div key={id} className="border border-cyan-500 pb-2 mb-3 mr-4 rounded-lg">
                                                    <button
                                                        onClick={() => setSelectedWord(word)}
                                                        className="text-white font-roboto font-bold text-l ml-2 mt-1">{word.name}</button>
                                                    {selectedWord === word && (
                                                        <WordCard
                                                            isOpen={selectedWord === word}
                                                            onClose={() => setSelectedWord(null)}
                                                            word={word}
                                                        />
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;

