import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/pagination";
import { IProduct } from "../../interfaces/products";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [editedProduct, setEditedProduct] = useState<IFormData>({
    imageUrl: "",
    name: "",
    price: 0,
    description: "",
  });
  const [currentPage, _setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(5);
  const [_allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [_imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchProducts();
  }, []);

  const handleSidebarOptionClick = (option: string) => {
    setSelectedOption(option);
    setSelectedProductId(null);
  };

  const handleProductSelect = (productId: string | undefined) => {
    if (productId) {
      setSelectedProductId(productId);
      const selectedProduct = products.find(
        (product) => product.id === productId
      );
      if (selectedProduct) {
        setEditedProduct(selectedProduct);
      }
    }
  };

  const handleEditProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
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
      console.log("URL de la imagen cargada en Cloudinary:", imageUrl);

      const productWithImageUrl = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        imageUrl: imageUrl,
      };

      const createProductResponse = await axios.post(
        "https://prueba-tecnica-bradley-back.onrender.com/products/post",
        productWithImageUrl
      );

      console.log("Producto creado exitosamente:", createProductResponse.data);

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

  const handleUpdateProduct = async () => {
    if (!selectedProductId) return;

    try {
      await axios.put(
        `https://prueba-tecnica-bradley-back.onrender.com/products/update/${selectedProductId}`,
        editedProduct
      );
      console.log("Producto actualizado correctamente");
      const updatedProducts = products.map((product) =>
        product.id === selectedProductId ? editedProduct : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const onDelete = async () => {
    if (!selectedProductId) return;

    try {
      await axios.delete(
        `https://prueba-tecnica-bradley-back.onrender.com/products/delete/${selectedProductId}`
      );
      console.log("Producto eliminado correctamente");
      setSelectedProductId(null);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex">
      <div className="h-screen w-1/6 bg-gray-800 p-4 flex flex-col justify-start">
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
      <div className="w-3/4 p-4">
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
                    value: 100,
                    message: "La descripción debe tener máximo 100 caracteres",
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
          <div className="mx-auto">
            <h2>Editar Producto</h2>
            <Pagination products={products} />{" "}
            <ul>
              {currentProducts.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleProductSelect(product.id)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
            {selectedProductId && (
              <form onSubmit={handleUpdateProduct}>
                <div className="mb-4">
                  <label htmlFor="imageUrl">URL de la imagen</label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={editedProduct.imageUrl}
                    onChange={handleEditProductChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name">Nombre del producto</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleEditProductChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price">Precio</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleEditProductChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description">Descripción</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleEditProductChange}
                  />
                </div>
                <button type="submit">Actualizar Producto</button>
              </form>
            )}
          </div>
        )}
        {selectedOption === "delete" && (
          <div>
            <h2>Eliminar Producto</h2>
            <select
              value={selectedProductId || ""}
              onChange={(e) => handleProductSelect(e.target.value)}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <button onClick={onDelete} disabled={!selectedProductId}>
              Eliminar Producto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
