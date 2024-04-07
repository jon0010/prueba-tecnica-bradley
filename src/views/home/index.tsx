import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import { IProduct } from "../../interfaces/products";
import Pagination from "../../components/pagination";
import axios from "axios";
import CardProduct from "../../components/cardProduct";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 6;

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
    console.log("Búsqueda:", query);
  };

  const handleFilterChange = (option: "latest" | "oldest") => {
    console.log("Filtrado:", option);
  };

  const handleSortChange = (option: "asc" | "desc") => {
    console.log("Ordenamiento:", option);
  };

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts: IProduct[] = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="flex">
      <SideBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4">
          {currentProducts.map((product: IProduct, index: number) => (
            <div key={index}>
              <CardProduct
                _id={product._id}
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
                description={product.description}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Pagination
            products={products}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            productsPerPage={productsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
