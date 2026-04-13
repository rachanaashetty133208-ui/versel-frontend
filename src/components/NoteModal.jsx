import React, { useEffect, useState } from "react";

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };

  //------------------

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      {/* Modal Card */}
      <div className="bg-gradient-to-br from-white to-purple-50 w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {currentNote ? "Edit Your Note" : "✨ Add New Note"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition resize-none h-28"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-lg transition duration-300"
          >
            {currentNote ? "Edite Note" : "Add Note"}
          </button>
        </form>

        {/* Cancel */}
        <button
          onClick={closeModal}
          className="mt-4 w-full text-red-500 font-medium hover:text-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
