import {
  useEffect,
  useState
} from "react";

import AdminSidebar from "../components/AdminSidebar";

import {
  getOrders
} from "../services/ordersService";

import formatCurrency from "../utils/formatCurrency";

import "../styles/OrdersAdmin.css";

function OrdersAdmin() {

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
  | Obtener pedidos
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const loadOrders = async () => {

      try {

        const data = await getOrders();

        setOrders(data);

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    };

    loadOrders();

  }, []);

  if (loading) {

    return (

      <div className="admin-layout">

        <AdminSidebar />

        <main className="admin-content">

          <h2>

            Cargando pedidos...

          </h2>

        </main>

      </div>

    );

  }

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <div className="orders-container">

          <h1>

            Administración de Pedidos

          </h1>

          {

            orders.length > 0

            ?

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

                            {

                              new Date(order.fecha)

                                .toLocaleDateString(

                                  "es-CL"

                                )

                            }

                          </td>

                          <td>

                            {

                              formatCurrency(

                                Number(order.total)

                              )

                            }

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