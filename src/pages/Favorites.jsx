import { useContext } from "react";

import { FavoritesContext } from "../context/FavoritesContext";

import ProductCard from "../components/ProductCard";

import "../styles/Favorites.css";

function Favorites() {

  const { favorites } =
    useContext(FavoritesContext);

  return (
    <div className="favorites-page">

      <h1>
        Mis favoritos
      </h1>

      {favorites.length > 0 ? (

        <div className="favorites-grid">

          {favorites.map((product) => (

            <ProductCard
              key={product.id}
              id={product.id}
              nombre={product.nombre}
              descripcion={product.descripcion}
              precio={product.precio}
              icono={product.icono}
              stock={product.stock}
            />

          ))}

        </div>

      ) : (

        <div className="favorites-empty">

          <h2>
            No tienes favoritos aún
          </h2>

          <p>
            Guarda productos como favoritos para
            encontrarlos fácilmente más tarde.
          </p>

        </div>

      )}

    </div>
  );
}

export default Favorites;