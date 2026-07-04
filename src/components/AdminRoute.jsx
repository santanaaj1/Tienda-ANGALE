import {

  useContext

} from "react";

import {

  Navigate

} from "react-router-dom";

import {

  AuthContext

} from "../context/AuthContext";

function AdminRoute({ children }) {

  const {

    currentUser,

    loading

  } = useContext(AuthContext);

  // Esperar mientras se carga localStorage
  if (loading) {

    return null;

  }

  // Sin sesión
  if (!currentUser) {

    return <Navigate to="/login" />;

  }

  // Usuario normal
  if (

    currentUser.role !== "admin"

  ) {

    return <Navigate to="/" />;

  }

  // Administrador
  return children;

}

export default AdminRoute;