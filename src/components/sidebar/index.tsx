import React, { useState, ChangeEvent } from "react";
import { SideBarProps } from "../../interfaces/sidebarProps";

const SideBar: React.FC<SideBarProps> = ({
  onSearch,
  onFilterChange,
  onSortChange,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOption, setFilterOption] = useState<"latest" | "oldest">(
    "latest"
  );
  const [sortOption, setSortOption] = useState<"asc" | "desc">("asc");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option: "latest" | "oldest" = e.target.value as "latest" | "oldest";
    setFilterOption(option);
    onFilterChange(option);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option: "asc" | "desc" = e.target.value as "asc" | "desc";
    setSortOption(option);
    onSortChange(option);
  };

  return (
    <div className="h-screen w-1/6 bg-gray-800 p-4 flex flex-col justify-start">
      <h1 className="text-xl text-white font-bold mb-4">Filtros y busqueda</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        className="w-full border-gray-300 rounded-md px-4 py-2 mb-4"
        placeholder="Buscar producto..."
      />
      <select
        value={filterOption}
        onChange={handleFilterChange}
        className="w-full border-gray-300 rounded-md px-4 py-2 mb-4"
      >
        <option value="latest">Últimos productos</option>
        <option value="oldest">Primeros productos</option>
      </select>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="w-full border-gray-300 rounded-md px-4 py-2"
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
};

export default SideBar;
