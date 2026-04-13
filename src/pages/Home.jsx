import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredNote, setFilteredNote] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNote(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:9000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, //  this is for middleware
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        // Wrap the request so frontend can read backend errors instead of failing silently
        "http://localhost:9000/api/note/add",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //  this is for middleware
          },
        },
      );
      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.error(error.response?.data || error.message); // Log the real backend/browser error to help debug future request failures
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        // Wrap the request so frontend can read backend errors instead of failing silently
        `http://localhost:9000/api/note/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //  this is for middleware
          },
        },
      );
      if (response.data.success) {
        fetchNotes();
        closeModal();
        setCurrentNote(null);
        toast.success("Note updated successfully!");
      }
    } catch (error) {
      console.error(error.response?.data || error.message); // Log the real backend/browser error to help debug future request failures
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        // Wrap the request so frontend can read backend errors instead of failing silently
        `http://localhost:9000/api/note/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //  this is for middleware
          },
        },
      );
      if (response.data.success) {
        fetchNotes();
        toast.success("Note deleted successfully!");
      }
    } catch (error) {
      console.error(error); // Log the real backend/browser error to help debug future request failures
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="pix-8 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNote.length > 0
          ? filteredNote.map((note) => (
              <NoteCard note={note} onEdit={onEdit} deleteNote={deleteNote} />
            ))
          : "Note not found"}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="fixed right-4 bottom-4 bg-blue-500 text-white font-bold p-4 rounded-full "
      >
        +
      </button>
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
