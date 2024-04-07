import React from "react";
import { IProduct } from "../../interfaces/products";

const CardProduct: React.FC<IProduct> = ({
  imageUrl,
  name,
  price,
  description,
}) => {
  return (
    <div
      className="border-2 p-2 mx-2 md:mx-6 border-gray-600 bg-orange-200 flex flex-col rounded-xl bg-orange-200 text-gray-700 shadow-md"
      style={{ height: "320px" }}
    >
      <div className="w-full bg-white p-2 rounded-xl">
        <img src={imageUrl} alt={name} className="w-28 h-auto mx-auto" />
      </div>
      <div className="p-4">
        <h5 className="mb-2 block text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {name}
        </h5>
        <p className="block text-base font-normal leading-relaxed text-inherit antialiased">
          {description}
        </p>
      </div>
      <div className="p-4 pt-0">
        <p className="text-gray-800 font-semibold text-red-500">
          Precio: ${price}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
