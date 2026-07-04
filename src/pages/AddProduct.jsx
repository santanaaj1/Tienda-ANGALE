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
  NotificationContext
} from "../context/NotificationContext";

import "../styles/AddProduct.css";

function AddProduct() {

  const navigate = useNavigate();

  const {

    products,

    addProduct

  } = useContext(

    ProductContext

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

  const handleSubmit = (event) => {

    event.preventDefault();

    const newProduct = {

      id:

        products.length > 0

          ? Math.max(

              ...products.map(

                product => product.id

              )

            ) + 1

          : 1,

      nombre,

      descripcion,

      precio,

      marca,

      categoria,

      stock:

        Number(stock),

      icono: "📦"

    };

    addProduct(

      newProduct

    );

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

              type="text"

              placeholder="Precio"

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

              <option value="Apple">

                Apple

              </option>

              <option value="Samsung">

                Samsung

              </option>

              <option value="Xiaomi">

                Xiaomi

              </option>

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

              <option value="smartphones">

                Smartphones

              </option>

              <option value="laptops">

                Laptops

              </option>

              <option value="smartwatch">

                Smartwatch

              </option>

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