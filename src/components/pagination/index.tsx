import React from "react";

interface PaginationProps {
  products: any[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  productsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  products,
  currentPage,
  setCurrentPage,
  productsPerPage,
}) => {
  const totalPages: number = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {Array.from({ length: totalPages }).map((_, index: number) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
