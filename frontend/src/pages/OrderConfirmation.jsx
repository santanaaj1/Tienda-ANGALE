import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "../styles/OrderConfirmation.css";

function OrderConfirmation() {

  const navigate = useNavigate();

  const [

    order,

    setOrder

  ] = useState(null);

  useEffect(() => {

    const savedOrder = JSON.parse(

      localStorage.getItem(

        "lastOrder"

      )

    );

    if (!savedOrder) {

      navigate("/");

      return;

    }

    setOrder(

      savedOrder

    );

  }, [

    navigate

  ]);

  if (!order) {

    return null;

  }

  const totalItems = order.items.reduce(

    (total, item) =>

      total + item.quantity,

    0

  );

  const handleHome = () => {

    navigate("/");

  };

  const handleProducts = () => {

    navigate("/search");

  };

  return (

    <div className="confirmation-container">

      <div className="confirmation-card">

        <h1>

          🎉 ¡Gracias por tu compra!

        </h1>

        <h2>

          Pedido #{order.id}

        </h2>

        <p>

          Hemos recibido tu pedido correctamente.

        </p>

        <p>

          Fecha: {order.fecha}

        </p>

        <p>

          Cliente: {order.cliente}

        </p>

        <div className="confirmation-summary">

          <h3>

            Resumen

          </h3>

          {

            order.items.map(

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

          <p>

            Total: $

            {

              order.total.toLocaleString(

                "es-CL"

              )

            }

          </p>

        </div>

        <div className="confirmation-buttons">

          <button

            className="home-button"

            onClick={handleHome}

          >

            Volver al inicio

          </button>

          <button

            className="products-button"

            onClick={handleProducts}

          >

            Ver productos

          </button>

        </div>

      </div>

    </div>

  );

}

export default OrderConfirmation;