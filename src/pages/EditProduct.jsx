import {
  useState,
  useContext,
  useEffect
} from "react";

import {
  useParams,
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

function EditProduct() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {

    products,

    updateProduct

  } = useContext(

    ProductContext

  );

  const {

    showNotification

  } = useContext(

    NotificationContext

  );

  const product = products.find(

    product =>

      product.id === Number(id)

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

  useEffect(() => {

    if (!product) {

      return;

    }

    setNombre(product.nombre);

    setDescripcion(product.descripcion);

    setPrecio(product.precio);

    setMarca(product.marca);

    setCategoria(product.categoria);

    setStock(product.stock);

  }, [product]);

  const handleSubmit = (event) => {

    event.preventDefault();

    const updatedProduct = {

      ...product,

      nombre,

      descripcion,

      precio,

      marca,

      categoria,

      stock: Number(stock)

    };

    updateProduct(

      updatedProduct

    );

    showNotification(

      "✓ Producto actualizado correctamente",

      "success"

    );

    navigate(

      "/admin/products"

    );

  };

  if (!product) {

    return (

      <div className="admin-layout">

        <AdminSidebar />

        <main className="admin-content">

          <h2>

            Producto no encontrado

          </h2>

        </main>

      </div>

    );

  }

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <div className="add-product-container">

          <h1>

            Editar Producto

          </h1>

          <form

            className="add-product-form"

            onSubmit={handleSubmit}

          >

            <input

              type="text"

              value={nombre}

              onChange={(event) =>

                setNombre(

                  event.target.value

                )

              }

              required

            />

            <textarea

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

              Actualizar producto

            </button>

          </form>

        </div>

      </main>

    </div>

  );

}

export default EditProduct;