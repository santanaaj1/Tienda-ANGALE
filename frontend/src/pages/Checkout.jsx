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
  ProductContext
} from "../context/ProductContext";

import {
  NotificationContext
} from "../context/NotificationContext";

import {
  createOrder
} from "../services/ordersService";

import formatCurrency from "../utils/formatCurrency";

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

    products

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

  /*
  |--------------------------------------------------------------------------
  | Cantidad de artículos
  |--------------------------------------------------------------------------
  */

  const totalItems = cartItems.reduce(

    (total, item) =>

      total + item.quantity,

    0

  );

  /*
  |--------------------------------------------------------------------------
  | Total del pedido
  |--------------------------------------------------------------------------
  */

  const totalAmount = cartItems.reduce(

    (total, item) =>

      total +

      (Number(item.precio) * item.quantity),

    0

  );

  /*
  |--------------------------------------------------------------------------
  | Finalizar compra
  |--------------------------------------------------------------------------
  */

  const handlePlaceOrder = async () => {

    try {

      // Validar stock mostrado en pantalla

      for (const item of cartItems) {

        const product = products.find(

          product =>

            product.id === item.id

        );

        if (

          !product ||

          product.stock < item.quantity

        ) {

          showNotification(

            `Stock insuficiente para ${item.nombre}`,

            "warning"

          );

          return;

        }

      }

      setOrderCompleted(true);

      const createdOrder = await createOrder(

        cartItems,

        totalAmount

      );

      clearCart();

      navigate(

        `/order-confirmation/${createdOrder.id}`

      );

    }

    catch (error) {

      console.error(error);

      showNotification(

        "No fue posible registrar el pedido.",

        "error"

      );

    }

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

          <input
            type="text"
            placeholder="Nombre"
          />

          <input
            type="text"
            placeholder="Apellido"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
          />

          <input
            type="text"
            placeholder="Teléfono"
          />

          <h2>

            Dirección de envío

          </h2>

          <input
            type="text"
            placeholder="Región"
          />

          <input
            type="text"
            placeholder="Ciudad"
          />

          <input
            type="text"
            placeholder="Dirección"
          />

          <input
            type="text"
            placeholder="Código postal"
          />

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

            Total: {formatCurrency(totalAmount)}

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