import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";

import "../styles/Cart.css";

function Cart() {

  const navigate = useNavigate();

  const {
    currentUser
  } = useContext(AuthContext);

  const {
    showNotification
  } = useContext(NotificationContext);

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useContext(CartContext);

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

  const formattedTotal =
    "$" +
    totalAmount.toLocaleString("es-CL");

  const handleCheckout = () => {

    if (!currentUser) {

      showNotification(

        "⚠ Debe iniciar sesión para continuar con la compra",

        "warning"

      );

      navigate("/login");

      return;

    }

    navigate("/checkout");

  };

  return (

    <div className="cart-container">

      <h1 className="cart-title">

        Mi carrito

      </h1>

      <div className="cart-content">

        <div className="cart-products">

          {

            cartItems.length > 0 ? (

              cartItems.map((item) => {

                const subtotal =

                  Number(

                    item.precio
                      .replace("$", "")
                      .replaceAll(".", "")

                  ) * item.quantity;

                return (

                  <div
                    key={item.id}
                    className="cart-item"
                  >

                    <button
                      className="remove-item"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >

                      ✕

                    </button>

                    <div className="cart-image">

                      {item.icono}

                    </div>

                    <div className="cart-info">

                      <h3>

                        {item.nombre}

                      </h3>

                      <p className="cart-price">

                        {item.precio}

                      </p>

                      <div className="cart-quantity">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >

                          -

                        </button>

                        <span>

                          {item.quantity}

                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >

                          +

                        </button>

                      </div>

                      <p className="item-subtotal">

                        Subtotal: $

                        {subtotal.toLocaleString("es-CL")}

                      </p>

                    </div>

                  </div>

                );

              })

            ) : (

              <div className="empty-products">

                <h2>

                  Tu carrito está vacío

                </h2>

                <p>

                  Agrega productos para comenzar tu compra.

                </p>

              </div>

            )

          }

        </div>

        <div className="cart-summary">

          <h2>

            Resumen del pedido

          </h2>

          <p>

            Productos distintos:

            {" "}

            {cartItems.length}

          </p>

          <p>

            Artículos:

            {" "}

            {totalItems}

          </p>

          <h3>

            Total:

            {" "}

            {formattedTotal}

          </h3>

          <button

            className="checkout-button"

            disabled={cartItems.length === 0}

            onClick={handleCheckout}

          >

            Proceder a comprar

          </button>

          <button

            className="continue-button"

            onClick={() =>
              navigate("/")
            }

          >

            Continuar buscando

          </button>

        </div>

      </div>

    </div>

  );

}

export default Cart;