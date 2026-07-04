import {
  useMemo,
  useContext
} from "react";

import AdminSidebar from "../components/AdminSidebar";

import {
  ProductContext
} from "../context/ProductContext";

import {
  DataContext
} from "../context/DataContext";

import "../styles/AdminDashboard.css";

function AdminDashboard() {

  const {

    products

  } = useContext(

    ProductContext

  );

  const {

    users,

    orders

  } = useContext(

    DataContext

  );

  const totalSales = useMemo(() => {

    return orders.reduce(

      (total, order) =>

        total + order.total,

      0

    );

  }, [orders]);

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <h1 className="admin-title">

          Panel Administrador

        </h1>

        <div className="admin-cards">

          <div className="admin-card">

            <h2>

              Productos

            </h2>

            <small>

              Registrados

            </small>

            <p>

              {products.length}

            </p>

          </div>

          <div className="admin-card">

            <h2>

              Pedidos

            </h2>

            <small>

              Realizados

            </small>

            <p>

              {orders.length}

            </p>

          </div>

          <div className="admin-card">

            <h2>

              Clientes

            </h2>

            <small>

              Registrados

            </small>

            <p>

              {users.length}

            </p>

          </div>

          <div className="admin-card">

            <h2>

              Ventas

            </h2>

            <small>

              Acumuladas

            </small>

            <p>

              $

              {totalSales.toLocaleString(

                "es-CL"

              )}

            </p>

          </div>

        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;