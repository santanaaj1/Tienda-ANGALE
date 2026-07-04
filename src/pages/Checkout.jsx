import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  CartContext
} from "../context/CartContext";

import {
  AuthContext
} from "../context/AuthContext";

import {
  DataContext
} from "../context/DataContext";

import {
  ProductContext
} from "../context/ProductContext";

import {
  NotificationContext
} from "../context/NotificationContext";

import "../styles/Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const [orderCompleted, setOrderCompleted] =
    useState(false);

  const {

    cartItems,

    clearCart

  } = useContext(

    CartContext

  );

  const {

    currentUser

  } = useContext(

    AuthContext

  );

  const {

    orders,

    addOrder

  } = useContext(

    DataContext

  );

  const {

    products,

    updateStock

  } = useContext(

    ProductContext

  );

  const {

    showNotification

  } = useContext(

    NotificationContext

  );

  useEffect(() => {

    if (

      cartItems.length === 0 &&

      !orderCompleted

    ) {

      navigate("/cart");

    }

  }, [

    cartItems,

    navigate,

    orderCompleted

  ]);

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

        price * item.quantity;

    },

    0

  );

  const handlePlaceOrder = () => {

    // Validar stock antes de crear el pedido
    for (const item of cartItems) {

      const product = products.find(

        product =>

          product.id === item.id

      );

      if (!product || product.stock < item.quantity) {

        showNotification(

          `Stock insuficiente para ${item.nombre}`,

          "warning"

        );

        return;

      }

    }

    setOrderCompleted(true);

    const orderNumber = String(

      orders.length + 1

    ).padStart(

      3,

      "0"

    );

    const today = new Date()

      .toLocaleDateString(

        "es-CL"

      );

    const newOrder = {

      id: orderNumber,

      cliente: currentUser.email,

      fecha: today,

      items: cartItems,

      total: totalAmount

    };

    addOrder(

      newOrder

    );

    cartItems.forEach(

      item =>

        updateStock(

          item.id,

          item.quantity

        )

    );

    localStorage.setItem(

      "lastOrder",

      JSON.stringify(

        newOrder

      )

    );

    clearCart();

    navigate(

      "/order-confirmation"

    );

  };

  return (

    <div className="checkout-container">

      <h1 className="checkout-title">

        Finalizar compra

      </h1>

      <div className="checkout-content">

        <div className="checkout-form">

          <h2>

            Información del cliente

          </h2>

          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="Apellido" />
          <input type="email" placeholder="Correo electrónico" />
          <input type="text" placeholder="Teléfono" />

          <h2>

            Dirección de envío

          </h2>

          <input type="text" placeholder="Región" />
          <input type="text" placeholder="Ciudad" />
          <input type="text" placeholder="Dirección" />
          <input type="text" placeholder="Código postal" />

        </div>

        <div className="checkout-summary">

          <h2>

            Resumen del pedido

          </h2>

          {

            cartItems.map(

              item => (

                <div

                  key={item.id}

                  className="checkout-item"

                >

                  <span>

                    {item.nombre}

                  </span>

                  <span>

                    x{item.quantity}

                  </span>

                </div>

              )

            )

          }

          <p>

            Artículos: {totalItems}

          </p>

          <h3>

            Total: $

            {totalAmount.toLocaleString(

              "es-CL"

            )}

          </h3>

          <button

            className="place-order-button"

            onClick={

              handlePlaceOrder

            }

          >

            Finalizar compra

          </button>

        </div>

      </div>

    </div>

  );

}

export default Checkout;