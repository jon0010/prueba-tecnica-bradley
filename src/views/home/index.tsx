import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import { IProduct } from "../../interfaces/products";
import Pagination from "../../components/pagination";
import axios from "axios";
import CardProduct from "../../components/cardProduct";

const Home = () => {
  const [originalProducts, setOriginalProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<IProduct[]>(
          "https://prueba-tecnica-bradley-back.onrender.com/products"
        );

        const productsWithCreatedAt = response.data.filter(
          (product) => product.createdAt
        );

        const sortedProducts = productsWithCreatedAt.sort((a, b) => {
          const dateA = new Date(a.createdAt || "");
          const dateB = new Date(b.createdAt || "");
          return dateB.getTime() - dateA.getTime();
        });

        setOriginalProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    const filteredProducts = originalProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filteredProducts);
  };

  const handleFilterChange = (option: "latest" | "oldest") => {
    const sortedProducts = filteredProducts.slice().sort((a, b) => {
      if (option === "latest") {
        return (
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
        );
      } else {
        return (
          new Date(a.createdAt || "").getTime() -
          new Date(b.createdAt || "").getTime()
        );
      }
    });

    setFilteredProducts(sortedProducts);
  };

  const handleSortChange = (option: "asc" | "desc") => {
    const sortedProducts = filteredProducts.slice().sort((a, b) => {
      if (option === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredProducts(sortedProducts);
  };

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts: IProduct[] = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="flex flex-col sm:flex-row">
      <SideBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      <div className="text-center sm:ml-4 mt-4">
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
        <div className="mt-4 mb-32">
          <Pagination
            products={filteredProducts}
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
