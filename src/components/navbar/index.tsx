// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/" className="text-white text-lg font-semibold">
            Logo
          </Link>
        </div>
        {/* Enlaces */}
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Inicio
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
