import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-gray-900 p-4 text-white flex justify-between items-center shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide text-purple-200 hover:text-white transition">
        <Link to="/">NoteApp</Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex items-center">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg mr-4 transition duration-300 shadow"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg mr-4 transition duration-300 shadow"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4 text-purple-200 font-medium">
              {user.name}
            </span>

            <button
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300 shadow"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
