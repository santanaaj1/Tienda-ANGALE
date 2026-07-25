import {
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import AdminSidebar from "../components/AdminSidebar";

import {
  ProductContext
} from "../context/ProductContext";

import {
  getUsers
} from "../services/authService";

import {
  getOrders
} from "../services/ordersService";

import formatCurrency from "../utils/formatCurrency";

import "../styles/AdminDashboard.css";

function AdminDashboard() {

  const {

    products

  } = useContext(

    ProductContext

  );

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

  /*
  |--------------------------------------------------------------------------
  | Total de ventas
  |--------------------------------------------------------------------------
  */

  const totalSales = useMemo(() => {

    return orders.reduce(

      (total, order) =>

        total + Number(order.total),

      0

    );

  }, [orders]);

  if (loading) {

    return (

      <div className="admin-layout">

        <AdminSidebar />

        <main className="admin-content">

          <h2>

            Cargando panel...

          </h2>

        </main>

      </div>

    );

  }

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

              {formatCurrency(totalSales)}

            </p>

          </div>

        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;