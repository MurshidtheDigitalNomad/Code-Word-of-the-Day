import React from 'react';

const WordCard = ({ isOpen, onClose, word }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#020d34] border-4 border-cyan-400 rounded-xl p-8">
                <h2 className="text-cyan-400 font-mokoto text-3xl text-center mb-4">
                    {word.name}
                </h2>
                <p className="text-white font-roboto text-l mb-2">
                    <span className="font-bold">Meaning:</span> {word.meaning}
                </p>
                <div className="text-white font-roboto text-l mb-4">
                    <span className="font-bold mr-2">Field:</span>
                    {Array.isArray(word.field) ? (
                        word.field.map((field, index) => (
                            <span key={index}>
                                {field}
                                {index < word.field.length - 1 ? ', ' : ''}
                            </span>
                        ))
                    ) : (
                        word.field
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-2xl border-2 border-cyan-400 text-sm text-white font-roboto font-semibold hover:bg-cyan-500 hover:text-[#020d34] transition duration-300 shadow-lg hover:shadow-cyan-500/50"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default WordCard;
