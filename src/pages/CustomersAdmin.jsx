import {
  useContext
} from "react";

import AdminSidebar from "../components/AdminSidebar";

import {
  DataContext
} from "../context/DataContext";

import "../styles/CustomersAdmin.css";

function CustomersAdmin() {

  const {

    users,

    orders

  } = useContext(

    DataContext

  );

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <div className="customers-container">

          <h1>

            Administración de Clientes

          </h1>

          {

            users.length > 0 ?

            (

              <table className="customers-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Nombre</th>

                    <th>Correo</th>

                    <th>Pedidos</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    users.map(

                      (user, index) => {

                        const orderCount =

                          orders.filter(

                            order =>

                              order.cliente === user.email

                          ).length;

                        return (

                          <tr key={user.email}>

                            <td>

                              {index + 1}

                            </td>

                            <td>

                              {user.nombre}

                            </td>

                            <td>

                              {user.email}

                            </td>

                            <td>

                              {orderCount}

                            </td>

                          </tr>

                        );

                      }

                    )

                  }

                </tbody>

              </table>

            )

            :

            (

              <p>

                No existen clientes registrados.

              </p>

            )

          }

        </div>

      </main>

    </div>

  );

}

export default CustomersAdmin;