import React, { useState } from "react";
import CardProduct from "../cardProduct";
import { IProduct } from "../../interfaces/products";

interface PaginationProps {
  products: IProduct[];
}

const Pagination: React.FC<PaginationProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 6;

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts: IProduct[] = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-16">
        {currentProducts.map((product: IProduct, index: number) => (
          <div key={index}>
            {" "}
            <CardProduct
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        }).map((_, index: number) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
