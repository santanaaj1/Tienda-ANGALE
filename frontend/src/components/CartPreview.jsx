import { Link } from "react-router-dom";

import { useContext } from "react";

import { CartContext } from "../context/CartContext";

import "../styles/CartPreview.css";

function CartPreview({ onClose }) {

  const { cartItems } =
    useContext(CartContext);

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => {

      const price = Number(
        item.precio
          .replace("$", "")
          .replaceAll(".", "")
      );

      return total +
        (price * item.quantity);

    },
    0
  );

  return (

    <div className="cart-preview">

      <div className="cart-preview-header">

        <button
          className="cart-preview-close"
          onClick={onClose}
        >
          ✕
        </button>

        <h3>

          Resumen de carrito

        </h3>

      </div>

      <div className="cart-preview-content">

        {

          cartItems.length > 0 ?

          (

            cartItems.map((item) => (

              <div
                key={item.id}
                className="cart-preview-item"
              >

                <div className="cart-preview-icon">

                  {item.icono}

                </div>

                <div className="cart-preview-info">

                  <p className="cart-preview-name">

                    {item.nombre}

                  </p>

                  <p className="cart-preview-quantity">

                    Cantidad: {item.quantity}

                  </p>

                </div>

              </div>

            ))

          )

          :

          (

            <p className="empty-cart-message">

              Tu carrito está vacío

            </p>

          )

        }

      </div>

      {

        cartItems.length > 0 && (

          <div className="cart-preview-totals">

            <p>

              Productos: {cartItems.length}

            </p>

            <p>

              Artículos: {totalItems}

            </p>

            <h4>

              Total: $

              {totalAmount.toLocaleString("es-CL")}

            </h4>

          </div>

        )

      }

      <div className="cart-preview-footer">

        {

          cartItems.length > 0 ?

          (

            <Link

              to="/cart"

              className="cart-preview-button"

              onClick={onClose}

            >

              Ir a mi carrito

            </Link>

          )

          :

          (

            <button

              className="cart-preview-button"

              disabled

              style={{

                opacity: 0.5,

                cursor: "not-allowed"

              }}

            >

              Ir a mi carrito

            </button>

          )

        }

      </div>

    </div>

  );

}

export default CartPreview;