import "../styles/ProductDetail.css";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  useState,
  useContext
} from "react";

import {
  ProductContext
} from "../context/ProductContext";

import {
  CartContext
} from "../context/CartContext";

import {
  AuthContext
} from "../context/AuthContext";

import {
  NotificationContext
} from "../context/NotificationContext";

function ProductDetail() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {

    products

  } = useContext(

    ProductContext

  );

  const {

    addToCart,

    cartItems

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

  const [quantity, setQuantity] =
    useState(1);

  const product = products.find(

    item =>

      item.id === Number(id)

  );

  if (!product) {

    return (

      <div className="product-detail-container">

        <h2>

          Producto no encontrado

        </h2>

      </div>

    );

  }

  const productInCart =

    cartItems.find(

      item =>

        item.id === product.id

    );

  const quantityInCart =

    productInCart

      ? productInCart.quantity

      : 0;

  const availableStock =

    product.stock -

    quantityInCart;

  const priceNumber = Number(

    product.precio

      .replace("$", "")

      .replaceAll(".", "")

  );

  const subtotal =

    priceNumber *

    quantity;

  const handleAddToCart = () => {

    if (!currentUser) {

      showNotification(

        "⚠ Debe iniciar sesión para agregar productos al carrito",

        "warning"

      );

      navigate("/login");

      return;

    }

    if (availableStock <= 0) {

      showNotification(

        "No hay stock disponible para este producto.",

        "warning"

      );

      return;

    }

    if (quantity > availableStock) {

      showNotification(

        `Solo hay ${availableStock} unidades disponibles.`,

        "warning"

      );

      return;

    }

    addToCart(

      {

        id: product.id,

        nombre: product.nombre,

        precio: product.precio,

        icono: product.icono

      },

      quantity

    );

  };

  return (

    <div className="product-detail-container">

      <div className="product-detail-card">

        <div className="product-info">

          <div className="product-image-large">

            {product.icono}

          </div>

          <h2 className="product-name">

            {product.nombre}

          </h2>

          <p className="product-category">

            {product.categoria}

          </p>

          <p className="product-description">

            {product.descripcion}

          </p>

        </div>

        <div className="purchase-panel">

          <h3>

            Resumen de compra

          </h3>

          <p className="detail-price">

            {product.precio}

          </p>

          <p className="stock-available">

            Stock disponible:

            {" "}

            {availableStock}

          </p>

          <div className="quantity-selector">

            <button

              onClick={() =>

                quantity > 1 &&

                setQuantity(

                  quantity - 1

                )

              }

            >

              -

            </button>

            <span>

              {quantity}

            </span>

            <button

              onClick={() =>

                quantity < availableStock &&

                setQuantity(

                  quantity + 1

                )

              }

            >

              +

            </button>

          </div>

          <p className="quantity-label">

            Cantidad seleccionada:

            {" "}

            {quantity}

          </p>

          <p className="subtotal">

            Subtotal:

            {" "}

            $

            {subtotal.toLocaleString(

              "es-CL"

            )}

          </p>

          <button

            className="add-cart-button"

            disabled={

              availableStock === 0

            }

            onClick={

              handleAddToCart

            }

          >

            {

              availableStock === 0

                ? "Agotado"

                : "Agregar al carrito"

            }

          </button>

        </div>

      </div>

      <button

        className="back-button-detail"

        onClick={() =>

          navigate(-1)

        }

      >

        ← Volver

      </button>

    </div>

  );

}

export default ProductDetail;