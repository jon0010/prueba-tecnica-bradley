import React from "react";
import { IProduct } from "../../interfaces/products";

const CardProduct: React.FC<IProduct> = ({
  imageUrl,
  name,
  price,
  description,
}) => {
  return (
    <div className="border-2 p-2 border-gray-600 bg-orange-200 relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      {" "}
      <div className="w-full bg-white p-2 rounded-xl">
        {" "}
        <img src={imageUrl} alt={name} className="w-28 mx-auto" />
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-bold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {name}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <p className="text-gray-800 font-semibold text-red-500">
          Precio: ${price}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
