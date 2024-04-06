import React from "react";
import SideBar from "../../components/sidebar";
import { IProduct } from "../../interfaces/products";
import CardProduct from "../../components/cardProduct";
import Pagination from "../../components/pagination";

const Home = () => {
  const products: IProduct[] = [
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 1",
      price: 10.99,
      description: "Descripción del producto 1",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 2",
      price: 20.99,
      description: "Descripción del producto 2",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 3",
      price: 30.99,
      description: "Descripción del producto 3",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 4",
      price: 30.99,
      description: "Descripción del producto 4",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 5",
      price: 30.99,
      description: "Descripción del producto 5",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 6",
      price: 30.99,
      description: "Descripción del producto 6",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 7",
      price: 30.99,
      description: "Descripción del producto 7",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 8",
      price: 30.99,
      description: "Descripción del producto 8",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 9",
      price: 30.99,
      description: "Descripción del producto 9",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 10",
      price: 30.99,
      description: "Descripción del producto 10",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 11",
      price: 30.99,
      description: "Descripción del producto 11",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 12",
      price: 120.99,
      description: "Descripción del producto 12",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dkpotpaaf/image/upload/v1711389605/7790895000997_E01_gh5bfr.png",
      name: "Producto 12",
      price: 120.99,
      description: "Descripción del producto 12",
    },
  ];

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
// https://prueba-tecnica-bradley-back.onrender.com/products
