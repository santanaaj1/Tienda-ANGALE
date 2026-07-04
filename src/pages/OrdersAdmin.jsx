import {
  useContext
} from "react";

import AdminSidebar from "../components/AdminSidebar";

import {
  DataContext
} from "../context/DataContext";

import "../styles/OrdersAdmin.css";

function OrdersAdmin() {

  const {

    orders

  } = useContext(

    DataContext

  );

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <div className="orders-container">

          <h1>

            Administración de Pedidos

          </h1>

          {

            orders.length > 0 ?

            (

              <table className="orders-table">

                <thead>

                  <tr>

                    <th>Pedido</th>

                    <th>Cliente</th>

                    <th>Fecha</th>

                    <th>Total</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    orders.map(

                      order => (

                        <tr key={order.id}>

                          <td>

                            #{order.id}

                          </td>

                          <td>

                            {order.cliente}

                          </td>

                          <td>

                            {order.fecha}

                          </td>

                          <td>

                            $

                            {order.total.toLocaleString(

                              "es-CL"

                            )}

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

              <p>

                No existen pedidos registrados.

              </p>

            )

          }

        </div>

      </main>

    </div>

  );

}

export default OrdersAdmin;