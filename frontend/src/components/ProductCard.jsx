import "../styles/ProductCard.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";

import formatCurrency from "../utils/formatCurrency";

function ProductCard({
  id,
  nombre,
  descripcion,
  precio,
  icono,
  image,
  stock
}) {

  const navigate = useNavigate();

  const {

    favorites,

    toggleFavorite

  } = useContext(

    FavoritesContext

  );

  const {

    addToCart,

    getQuantityInCart

  } = useContext(

    CartContext

  );

  const {

    currentUser

  } = useContext(

    AuthContext

  );

  const {

    showNotification

  } = useContext(

    NotificationContext

  );

  /*
  |--------------------------------------------------------------------------
  | Verificar si el producto es favorito
  |--------------------------------------------------------------------------
  */

  const isFavorite = favorites.some(

    favorite => favorite.producto_id === id

  );

  const quantityInCart =

    getQuantityInCart(id);

  const availableStock =

    stock - quantityInCart;

  /*
  |--------------------------------------------------------------------------
  | Agregar al carrito
  |--------------------------------------------------------------------------
  */

  const handleAddToCart = () => {

    if (!currentUser) {

      showNotification(

        "⚠ Debe iniciar sesión para agregar productos al carrito",

        "warning"

      );

      navigate("/login");

      return;

    }

    addToCart({

      id,

      nombre,

      precio,

      icono,

      image

    });

  };

  /*
  |--------------------------------------------------------------------------
  | Favoritos
  |--------------------------------------------------------------------------
  */

  const handleFavorite = () => {

    toggleFavorite(

      {

        id,

        nombre,

        descripcion,

        precio,

        icono,

        image,

        stock

      },

      currentUser,

      navigate

    );

  };

  return (

    <div className="product-card">

      <button

        type="button"

        className="favorite-button"

        onClick={handleFavorite}

      >

        {

          isFavorite

            ? "❤️"

            : "🤍"

        }

      </button>

      <Link

        to={`/product/${id}`}

        className="product-link"

      >

        <div className="product-image">

          {

            image ? (

              <img

                src={image}

                alt={nombre}

                className="product-image-file"

              />

            ) : (

              icono

            )

          }

        </div>

        <h3 className="product-title">

          {nombre}

        </h3>

        <p className="product-description">

          {descripcion}

        </p>

      </Link>

      <p className="product-price">

        {formatCurrency(precio)}

      </p>

      <p

        style={{

          marginBottom: "10px",

          fontSize: "14px"

        }}

      >

        Stock: {availableStock}

      </p>

      <button

        className="product-button"

        disabled={availableStock === 0}

        onClick={handleAddToCart}

      >

        {

          availableStock === 0

            ? "Agotado"

            : "Agregar al carrito"

        }

      </button>

    </div>

  );

}

export default ProductCard;