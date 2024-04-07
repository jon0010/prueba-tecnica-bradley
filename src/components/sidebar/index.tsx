import React, { useState } from "react";
import { SideBarProps } from "../../interfaces/sidebarProps";

const SideBar: React.FC<SideBarProps> = ({ onSearch, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("asc");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "asc" | "desc";
    setSortBy(value);
    onSortChange(value);
  };

  const handlePriceOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "asc" | "desc";
    setPriceOrder(value);
    onSortChange(value);
  };

  return (
    <div className="sm:flex sm:flex-col bg-gray-800 p-4 justify-start">
      <h1 className="text-xl text-white font-bold mb-4">Filtros y búsqueda</h1>
      <hr />
      <h2 className="text-white my-2">Búsqueda por nombre</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full border-gray-300 rounded-md px-4 py-2 mb-4"
        placeholder="Buscar producto..."
      />
      <hr />
      <h2 className="text-white my-2">Búsqueda por orden de creación</h2>
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="w-full border-gray-300 rounded-md px-4 py-2 mb-4"
      >
        <option value="asc">Últimos productos</option>
        <option value="desc">Primeros productos</option>
      </select>
      <hr />
      <h2 className="text-white my-2">Filtro por precio</h2>
      <select
        value={priceOrder}
        onChange={handlePriceOrderChange}
        className="w-full border-gray-300 rounded-md px-4 py-2"
      >
        <option value="asc">Más baratos</option>
        <option value="desc">Más caros</option>
      </select>
    </div>
  );
};

export default SideBar;
