import { Link } from "react-router-dom";

import "../styles/NotFound.css";

function NotFound() {

  return (

    <div className="not-found-container">

      <h1>

        404

      </h1>

      <h2>

        Página no encontrada

      </h2>

      <p>

        La página que intentas visitar no existe.

      </p>

      <Link
        to="/"
      >

        <button>

          Volver al inicio

        </button>

      </Link>

    </div>

  );

}

export default NotFound;