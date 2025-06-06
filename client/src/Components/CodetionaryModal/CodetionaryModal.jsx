import React, { useState } from 'react';

export default function AddWordModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    meaning: '',
    field: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const fieldsArray = formData.field
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    const finalData = {
      name: formData.name,
      meaning: formData.meaning,
      field: fieldsArray,
    };

    onSubmit(finalData);
    onClose();
    setFormData({ name: '', meaning: '', field: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#020d34] border-4 border-cyan-400 rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold font-mokoto mb-4 text-center text-cyan-400">Add a Code Word</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="word-name" className="block font-medium font-roboto mb-1 text-white">Word Name</label>
            <input
              id="word-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-cyan-500 p-2 font-roboto rounded bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="word-meaning" className="block font-medium font-roboto mb-1 text-white">Meaning</label>
            <textarea
              id="word-meaning"
              value={formData.meaning}
              onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
              className="w-full border font-roboto border-cyan-500 p-2 rounded bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="word-field" className="block font-roboto font-medium mb-1 text-white">
              Fields <span className="text-sm text-gray-500">(comma-separated)</span>
            </label>
            <input
              id="word-field"
              type="text"
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
              className="w-full border font-roboto border-cyan-500 p-2 rounded bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-l font-roboto text-white mt-3 border-2 border-cyan-400 rounded-xl px-4 py-1 hover:bg-cyan-500 hover:text-[#020d34] transition duration-300 shadow-lg hover:shadow-cyan-500/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-l font-roboto text-white mt-3 border-2 border-cyan-400 rounded-xl px-4 py-1 hover:bg-cyan-500 hover:text-[#020d34] transition duration-300 shadow-lg hover:shadow-cyan-500/50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
