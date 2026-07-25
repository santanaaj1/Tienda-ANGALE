import {

  useContext

} from "react";

import {

  Navigate

} from "react-router-dom";

import {

  AuthContext

} from "../context/AuthContext";

function PrivateRoute({ children }) {

  const {

    currentUser,

    loading

  } = useContext(AuthContext);

  // Esperar mientras se carga localStorage
  if (loading) {

    return null;

  }

  // Si no hay usuario, enviar al login
  if (!currentUser) {

    return <Navigate to="/login" />;

  }

  return children;

}

export default PrivateRoute;