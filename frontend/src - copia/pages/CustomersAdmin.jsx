import {
  useEffect,
  useState
} from "react";

import AdminSidebar from "../components/AdminSidebar";

import {
  getUsers
} from "../services/authService";

import {
  getOrders
} from "../services/ordersService";

import "../styles/CustomersAdmin.css";

function CustomersAdmin() {

  const [

    users,

    setUsers

  ] = useState([]);

  const [

    orders,

    setOrders

  ] = useState([]);

  const [

    loading,

    setLoading

  ] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Obtener usuarios y pedidos
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const loadData = async () => {

      try {

        const [

          usersData,

          ordersData

        ] = await Promise.all([

          getUsers(),

          getOrders()

        ]);

        setUsers(usersData);

        setOrders(ordersData);

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);

  if (loading) {

    return (

      <div className="admin-layout">

        <AdminSidebar />

        <main className="admin-content">

          <h2>

            Cargando clientes...

          </h2>

        </main>

      </div>

    );

  }

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <div className="customers-container">

          <h1>

            Administración de Clientes

          </h1>

          {

            users.length > 0

            ?

            (

              <table className="customers-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Nombre</th>

                    <th>Correo</th>

                    <th>Rol</th>

                    <th>Pedidos</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    users.map(

                      user => {

                        const orderCount = orders.filter(

                          order =>

                            order.cliente === user.email

                        ).length;

                        return (

                          <tr key={user.id}>

                            <td>

                              {user.id}

                            </td>

                            <td>

                              {

                                `${user.nombre} ${user.apellido}`

                              }

                            </td>

                            <td>

                              {user.email}

                            </td>

                            <td>

                              {user.rol}

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