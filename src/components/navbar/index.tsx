import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-lg font-semibold">
            Prueba tecnica
          </Link>
        </div>
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
