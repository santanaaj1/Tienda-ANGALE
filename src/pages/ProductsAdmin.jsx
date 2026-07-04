import {
  useContext
} from "react";

import {
  Link
} from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

import {
  ProductContext
} from "../context/ProductContext";

import {
  NotificationContext
} from "../context/NotificationContext";

import "../styles/ProductsAdmin.css";

function ProductsAdmin() {

  const {

    products,

    deleteProduct

  } = useContext(

    ProductContext

  );

  const {

    showNotification

  } = useContext(

    NotificationContext

  );

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(

      "¿Desea eliminar este producto?"

    );

    if (!confirmDelete) {

      return;

    }

    deleteProduct(id);

    showNotification(

      "🗑 Producto eliminado correctamente",

      "warning"

    );

  };

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <div className="admin-products-container">

          <h1>

            Administración de Productos

          </h1>

          {

            products.length > 0 ?

            (

              <table className="products-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Producto</th>

                    <th>Marca</th>

                    <th>Precio</th>

                    <th>Stock</th>

                    <th>Acciones</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    products.map(

                      product => (

                        <tr key={product.id}>

                          <td>

                            {product.id}

                          </td>

                          <td>

                            {product.nombre}

                          </td>

                          <td>

                            {product.marca}

                          </td>

                          <td>

                            {product.precio}

                          </td>

                          <td>

                            {product.stock}

                          </td>

                          <td>

                            <Link

                              to={

                                `/admin/products/edit/${product.id}`

                              }

                            >

                              <button className="edit-button">

                                Editar

                              </button>

                            </Link>

                            <button

                              className="delete-button"

                              onClick={() =>

                                handleDelete(

                                  product.id

                                )

                              }

                            >

                              Eliminar

                            </button>

                          </td>

                        </tr>

                      )

                    )

                  }

                </tbody>

              </table>

            )

            :

            (

              <h3>

                No existen productos registrados.

              </h3>

            )

          }

        </div>

      </main>

    </div>

  );

}

export default ProductsAdmin;