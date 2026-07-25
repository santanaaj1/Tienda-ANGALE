import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

import {
  getOrderById
} from "../services/ordersService";

import formatCurrency from "../utils/formatCurrency";

import "../styles/OrderConfirmation.css";

function OrderConfirmation() {

  const navigate = useNavigate();

  const { id } = useParams();

  const {

    currentUser,

    loading

  } = useContext(

    AuthContext

  );

  const [

    order,

    setOrder

  ] = useState(null);

  const [

    isLoading,

    setIsLoading

  ] = useState(true);

  const [

    error,

    setError

  ] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Cargar pedido
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const loadOrder = async () => {

      try {

        const data = await getOrderById(

          id,

          currentUser.id

        );

        setOrder(data);

      }

      catch (error) {

        console.error(error);

        setError(

          "No fue posible cargar el pedido."

        );

      }

      finally {

        setIsLoading(false);

      }

    };

    if (loading) {

      return;

    }

    if (!currentUser) {

      navigate("/login");

      return;

    }

    loadOrder();

  }, [

    id,

    currentUser,

    loading,

    navigate

  ]);

  /*
  |--------------------------------------------------------------------------
  | Estados
  |--------------------------------------------------------------------------
  */

  if (isLoading) {

    return (

      <div className="confirmation-container">

        <div className="confirmation-card">

          <h2>

            Cargando pedido...

          </h2>

        </div>

      </div>

    );

  }

  if (error || !order) {

    return (

      <div className="confirmation-container">

        <div className="confirmation-card">

          <h2>

            Pedido no encontrado.

          </h2>

          <button

            className="home-button"

            onClick={() => navigate("/")}

          >

            Volver al inicio

          </button>

        </div>

      </div>

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Total artículos
  |--------------------------------------------------------------------------
  */

  const totalItems = order.items.reduce(

    (total, item) =>

      total + Number(item.quantity),

    0

  );

  /*
  |--------------------------------------------------------------------------
  | Navegación
  |--------------------------------------------------------------------------
  */

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

          Fecha: {

            new Date(order.fecha)

              .toLocaleDateString(

                "es-CL"

              )

          }

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

            Total: {

              formatCurrency(

                order.total

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