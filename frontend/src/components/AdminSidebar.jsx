import {

  Link

} from "react-router-dom";

import {

  useContext

} from "react";

import {

  AuthContext

} from "../context/AuthContext";

import "../styles/AdminSidebar.css";

function AdminSidebar() {

  const {

    logout

  } = useContext(

    AuthContext

  );

  const handleLogout = () => {

    logout();

  };

  return (

    <aside className="admin-sidebar">

      <h2>

        Panel Administrador

      </h2>

      <nav>

        <Link to="/admin">

          Dashboard

        </Link>

        <Link to="/admin/products">

          Productos

        </Link>

        <Link to="/admin/products/add">

          Agregar Producto

        </Link>

        <Link to="/admin/orders">

          Pedidos

        </Link>

        <Link to="/admin/customers">

          Clientes

        </Link>

        <Link

          to="/"

          onClick={handleLogout}

        >

          Cerrar sesión

        </Link>

      </nav>

    </aside>

  );

}

export default AdminSidebar;