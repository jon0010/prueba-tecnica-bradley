import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import { IProduct } from "../../interfaces/products";
import Pagination from "../../components/pagination";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://prueba-tecnica-bradley-back.onrender.com/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    // Lógica para manejar la búsqueda
    console.log("Búsqueda:", query);
  };

  const handleFilterChange = (option: "latest" | "oldest") => {
    // Lógica para manejar el cambio de filtro
    console.log("Filtrado:", option);
  };

  const handleSortChange = (option: "asc" | "desc") => {
    // Lógica para manejar el cambio de ordenamiento
    console.log("Ordenamiento:", option);
  };

  return (
    <div className="flex">
      <SideBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className="flex-1 text-center">
        <div>
          <Pagination products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
