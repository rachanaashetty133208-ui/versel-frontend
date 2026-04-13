import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{note.description}</p>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
          onClick={() => onEdit(note)}
        >
          <FaEdit /> Edit
        </button>

        <button
          className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition"
          onClick={() => deleteNote(note._id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
