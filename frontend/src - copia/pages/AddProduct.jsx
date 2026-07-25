import {
  useState,
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

import {
  ProductContext
} from "../context/ProductContext";

import {
  CategoryContext
} from "../context/CategoryContext";

import {
  BrandContext
} from "../context/BrandContext";

import {
  NotificationContext
} from "../context/NotificationContext";

import "../styles/AddProduct.css";

function AddProduct() {

  const navigate = useNavigate();

  const {
    addProduct
  } = useContext(
    ProductContext
  );

  const {
    categories
  } = useContext(
    CategoryContext
  );

  const {
    brands
  } = useContext(
    BrandContext
  );

  const {
    showNotification
  } = useContext(
    NotificationContext
  );

  const [nombre, setNombre] =
    useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [precio, setPrecio] =
    useState("");

  const [marca, setMarca] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  const [stock, setStock] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Guardar producto
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {

    event.preventDefault();

    const newProduct = {

      nombre,

      descripcion,

      precio: Number(precio),

      marca,

      categoria,

      stock: Number(stock),

      icono: "📦"

    };

    const success = await addProduct(
      newProduct
    );

    if (!success) {

      showNotification(

        "No fue posible agregar el producto.",

        "error"

      );

      return;

    }

    showNotification(

      "✓ Producto agregado correctamente",

      "success"

    );

    navigate(
      "/admin/products"
    );

  };

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <div className="add-product-container">

          <h1>

            Agregar Producto

          </h1>

          <form

            className="add-product-form"

            onSubmit={handleSubmit}

          >

            <input

              type="text"

              placeholder="Nombre"

              value={nombre}

              onChange={(event) =>

                setNombre(
                  event.target.value
                )

              }

              required

            />

            <textarea

              placeholder="Descripción"

              value={descripcion}

              onChange={(event) =>

                setDescripcion(
                  event.target.value
                )

              }

              required

            />

            <input

              type="number"

              placeholder="Precio"

              min="0"

              value={precio}

              onChange={(event) =>

                setPrecio(
                  event.target.value
                )

              }

              required

            />

            <select

              value={marca}

              onChange={(event) =>

                setMarca(
                  event.target.value
                )

              }

              required

            >

              <option value="">

                Seleccione una marca

              </option>

              {brands.map((brand) => (

                <option

                  key={brand.id}

                  value={brand.value}

                >

                  {brand.label}

                </option>

              ))}

            </select>

            <select

              value={categoria}

              onChange={(event) =>

                setCategoria(
                  event.target.value
                )

              }

              required

            >

              <option value="">

                Seleccione una categoría

              </option>

              {categories.map((category) => (

                <option

                  key={category.id}

                  value={category.value}

                >

                  {category.label}

                </option>

              ))}

            </select>

            <input

              type="number"

              placeholder="Stock"

              min="0"

              value={stock}

              onChange={(event) =>

                setStock(
                  event.target.value
                )

              }

              required

            />

            <button>

              Guardar producto

            </button>

          </form>

        </div>

      </main>

    </div>

  );

}

export default AddProduct;