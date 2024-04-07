import React, { useState, useEffect } from "react";
import axios from "axios";
import { IProduct } from "../../interfaces/products";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CardProduct from "../../components/cardProduct";
import Pagination from "../../components/pagination";

interface IFormData {
  id?: string;
  imageUrl: string;
  name: string;
  price: number;
  description: string;
}

const Dashboard = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormData>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [_selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [editedProduct, _setEditedProduct] = useState<IFormData>({
    imageUrl: "",
    name: "",
    price: 0,
    description: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 6;
  const [_allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [_imageFile, setImageFile] = useState<File | null>(null);
  const [_selectedProductDetails, setSelectedProductDetails] =
    useState<IFormData | null>(null);
  const [selectedProductToUpdate, setSelectedProductToUpdate] =
    useState<IProduct | null>(null);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://prueba-tecnica-bradley-back.onrender.com/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de productos:", error);
    }
  };

  const onDelete = async (productId: string | null) => {
    try {
      if (!productId) {
        console.error("No se ha seleccionado ningún producto para eliminar");
        return;
      }

      const result = await Swal.fire({
        title: "¿Estás seguro de que deseas eliminar este producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://prueba-tecnica-bradley-back.onrender.com/products/delete/${productId}`
        );
        fetchProducts();
        Swal.fire("¡Producto eliminado!", "", "success");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      Swal.fire("¡Error!", "Hubo un problema al eliminar el producto", "error");
    }
  };

  const handleSidebarOptionClick = (option: string) => {
    setSelectedOption(option);
    setSelectedProductId(null);
    setSelectedProductDetails(null);
  };

  useEffect(() => {
    const areAllFieldsFilled = Object.values(editedProduct).every(
      (value) => value !== ""
    );
    setAllFieldsFilled(areAllFieldsFilled);
  }, [editedProduct]);

  useEffect(() => {
    setAllFieldsFilled(
      editedProduct.imageUrl !== "" &&
        editedProduct.name !== "" &&
        editedProduct.price !== 0 &&
        editedProduct.description !== ""
    );
  }, [
    editedProduct.imageUrl,
    editedProduct.name,
    editedProduct.price,
    editedProduct.description,
  ]);

  const handleCreateProduct = async (formData: IFormData) => {
    try {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", formData.imageUrl[0]);

      formDataCloudinary.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formDataCloudinary
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      const productWithImageUrl = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        imageUrl: imageUrl,
      };

      await axios.post(
        "https://prueba-tecnica-bradley-back.onrender.com/products/post",
        productWithImageUrl
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error: any) {
      console.error("Error al crear el producto:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Respuesta del servidor:", error.response.data);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
        } else {
          console.error("Error en la solicitud:", error.message);
        }
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!selectedProductToUpdate || !selectedProductToUpdate._id) {
        console.error("Producto no seleccionado para actualizar");
        return;
      }

      if (_imageFile) {
        const formDataCloudinary = new FormData();
        formDataCloudinary.append("file", _imageFile);

        formDataCloudinary.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          formDataCloudinary
        );

        const imageUrl = cloudinaryResponse.data.secure_url;

        const updatedProduct = {
          ...selectedProductToUpdate,
          imageUrl: imageUrl,
        };

        await axios.put(
          `https://prueba-tecnica-bradley-back.onrender.com/products/update/${selectedProductToUpdate._id}`,
          updatedProduct,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto actualizado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        const updatedProducts = products.map((product) =>
          product._id === selectedProductToUpdate._id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        navigate("/");
      } else {
        await axios.put(
          `https://prueba-tecnica-bradley-back.onrender.com/products/update/${selectedProductToUpdate._id}`,
          selectedProductToUpdate
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto actualizado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        const updatedProducts = products.map((product) =>
          product._id === selectedProductToUpdate._id
            ? selectedProductToUpdate
            : product
        );
        setProducts(updatedProducts);
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error al actualizar el producto:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Respuesta del servidor:", error.response.data);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
        } else {
          console.error("Error en la solicitud:", error.message);
        }
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts: IProduct[] = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardClick = async (productId: any) => {
    try {
      if (productId) {
        const productIdString = productId.toString();
        const response = await axios.get(
          `https://prueba-tecnica-bradley-back.onrender.com/products/${productIdString}`
        );
        setSelectedCardToDelete(productId);
        setSelectedProductToUpdate(response.data);
      } else {
        console.error("El productId es undefined");
      }
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
    }
  };

  const isSelected = (productId: string) => {
    return productId === selectedCardToDelete
      ? "rounded-xl border-4 border-blue-500 px-0 mx-0"
      : "";
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-1/6 bg-gray-800 p-4 flex flex-col justify-start">
        <ul>
          <li
            className="cursor-pointer text-white font-semibold my-4"
            onClick={() => handleSidebarOptionClick("create")}
          >
            Crear Producto
          </li>
          <li
            className="cursor-pointer text-white font-semibold my-4"
            onClick={() => handleSidebarOptionClick("update")}
          >
            Editar Producto
          </li>
          <li
            className="cursor-pointer text-white font-semibold my-4"
            onClick={() => handleSidebarOptionClick("delete")}
          >
            Eliminar Producto
          </li>
        </ul>
      </div>
      <div className="w-full sm:w-3/4 p-4">
        {selectedOption === "create" && (
          <form onSubmit={handleSubmit(handleCreateProduct)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imageFile"
              >
                Agregar imagen
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  {...register("imageUrl", {
                    required: "Este campo es obligatorio",
                  })}
                  onChange={(e) => {
                    handleFileInputChange(e);
                  }}
                />
                {errors.imageUrl && (
                  <p className="text-red-500 text-sm">
                    {errors.imageUrl.message}
                  </p>
                )}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-24 h-auto"
                  />
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre del producto
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "El nombre debe contener solo letras.",
                  },
                  maxLength: {
                    value: 30,
                    message: "El nombre debe tener un máximo de 30 caracteres.",
                  },
                })}
                className={`border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Precio
              </label>
              <input
                type="number"
                {...register("price", {
                  required: "Este campo es obligatorio",
                  min: {
                    value: 0.01,
                    message: "El precio debe ser mayor que cero.",
                  },
                  max: {
                    value: 9999999,
                    message: "El precio no puede exceder 7 dígitos",
                  },
                })}
                className={`border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Descripción
              </label>
              <input
                type="text"
                {...register("description", {
                  required: "Este campo es obligatorio",
                  maxLength: {
                    value: 45,
                    message: "La descripción debe tener máximo 45 caracteres",
                  },
                })}
                className={`border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className={"bg-blue-500 text-white rounded-md px-4 py-2"}
            >
              Crear Producto
            </button>
          </form>
        )}
        {selectedOption === "update" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4">
              {currentProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(product._id)}
                  className="cursor-pointer"
                >
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
            <div className="mt-4 text-center">
              <Pagination
                products={products}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                productsPerPage={productsPerPage}
              />
            </div>
            {selectedProductToUpdate && (
              <form className="my-32" onSubmit={handleUpdateProduct}>
                <div className="mb-4">
                  <h1 className="font-semibold text-gray-700 my-4">
                    {" "}
                    Acualizar producto
                  </h1>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={selectedProductToUpdate.name}
                    onChange={(e) =>
                      setSelectedProductToUpdate({
                        ...selectedProductToUpdate,
                        name: e.target.value,
                      })
                    }
                    className={`border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Precio
                  </label>
                  <input
                    type="number"
                    value={selectedProductToUpdate.price}
                    onChange={(e) =>
                      setSelectedProductToUpdate({
                        ...selectedProductToUpdate,
                        price: +e.target.value,
                      })
                    }
                    className={`border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={selectedProductToUpdate.description}
                    onChange={(e) =>
                      setSelectedProductToUpdate({
                        ...selectedProductToUpdate,
                        description: e.target.value,
                      })
                    }
                    className={`border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500`}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="imageFile"
                  >
                    Agregar imagen
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      {...register("imageUrl", {
                        required: "Este campo es obligatorio",
                      })}
                      onChange={(e) => {
                        handleFileInputChange(e);
                      }}
                    />
                    {errors.imageUrl && (
                      <p className="text-red-500 text-sm">
                        {errors.imageUrl.message}
                      </p>
                    )}
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 w-24 h-auto"
                      />
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className={`bg-blue-500 text-white rounded-md px-4 py-2`}
                >
                  Actualizar Producto
                </button>
              </form>
            )}
          </div>
        )}
        {selectedOption === "delete" && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {currentProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(product._id)}
                  className={`${isSelected(product._id)} cursor-pointer py-4`}
                >
                  <CardProduct
                    _id={product._id}
                    imageUrl={product.imageUrl}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                  />
                  <div className="text-center mt-3">
                    <button
                      className={
                        "bg-blue-500 text-white rounded-md px-4 py-2 mx-auto"
                      }
                      onClick={() => onDelete(product._id)}
                    >
                      Eliminar Producto
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Pagination
                  products={products}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  productsPerPage={productsPerPage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
